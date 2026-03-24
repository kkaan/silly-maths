/* ============================================================
   Quiz Engine — Metric Conversion Practice
   ============================================================ */

// Callback arrays — external code pushes functions into these
const quizCallbacks = {
  onCorrect: [],
  onWrong: [],
};

// === DATA ===
const CONVERSIONS = [
  { from: 'km', to: 'm',  factor: 1000, category: 'length' },
  { from: 'm',  to: 'cm', factor: 100,  category: 'length' },
  { from: 'cm', to: 'mm', factor: 10,   category: 'length' },
  { from: 'kg', to: 'g',  factor: 1000, category: 'mass' },
  { from: 'g',  to: 'mg', factor: 1000, category: 'mass' },
  { from: 'L',  to: 'mL', factor: 1000, category: 'capacity' },
];

const UNIT_LADDERS = {
  length: [
    { unit: 'km', label: 'km' },
    { from: 'km', to: 'm', label: '\u00d71000' },
    { unit: 'm', label: 'm' },
    { from: 'm', to: 'cm', label: '\u00d7100' },
    { unit: 'cm', label: 'cm' },
    { from: 'cm', to: 'mm', label: '\u00d710' },
    { unit: 'mm', label: 'mm' },
  ],
  mass: [
    { unit: 'kg', label: 'kg' },
    { from: 'kg', to: 'g', label: '\u00d71000' },
    { unit: 'g', label: 'g' },
    { from: 'g', to: 'mg', label: '\u00d71000' },
    { unit: 'mg', label: 'mg' },
  ],
  capacity: [
    { unit: 'L', label: 'L' },
    { from: 'L', to: 'mL', label: '\u00d71000' },
    { unit: 'mL', label: 'mL' },
  ],
};

const CORRECT_MESSAGES = [
  'Amazing!', 'You nailed it!', 'Brilliant!', 'Super smart!',
  'Woohoo!', "You're on fire!", 'Math wizard!', 'Fantastic!',
  'Keep going!', 'Yes yes yes!', 'Spot on!', 'Superstar!',
];

const WRONG_MESSAGES = [
  "Brave try! Here's how it works:",
  "Ooh, so close! Let me show you:",
  "Not quite \u2014 but you're learning! Watch this:",
  "Great attempt! Check this out:",
  "Almost! Let's figure it out together:",
  "Nice try! Here's the trick:",
  "Hmm, tricky one! Here's the secret:",
];

// === STATE ===
const quizState = {
  currentQuestion: null,
  phase: 'asking', // 'asking' | 'feedback-correct' | 'feedback-wrong'
  stats: {
    attempts: 0,
    correct: 0,
    brave: 0,
    meterValue: 0,
    level: 1,
  },
  activeCategories: new Set(['length', 'mass', 'capacity']),
  history: [],
};

// === DOM REFS ===
const _q = (sel) => document.querySelector(sel);
let _card, _input, _goBtn, _encouragement, _animationArea, _particleContainer, _introHint;

function initQuizDOM() {
  _card = _q('#question-card');
  _input = _q('#answer-input');
  _goBtn = _q('#go-btn');
  _encouragement = _q('#encouragement');
  _animationArea = _q('#animation-area');
  _particleContainer = _q('#particle-container');
  _introHint = _q('#intro-hint');
}

// === QUESTION GENERATION ===
function generateQuestion() {
  const pool = CONVERSIONS.filter(c => quizState.activeCategories.has(c.category));
  if (pool.length === 0) return null;

  let conv;
  let tries = 0;
  do {
    conv = pool[Math.floor(Math.random() * pool.length)];
    tries++;
  } while (tries < 20 && isRecentRepeat(conv));

  const direction = Math.random() < 0.5 ? 'multiply' : 'divide';
  let value;
  if (direction === 'multiply') {
    value = pickMultiplyValue(conv.factor);
  } else {
    value = pickDivideValue(conv.factor);
  }

  const correctAnswer = direction === 'multiply'
    ? roundSafe(value * conv.factor)
    : roundSafe(value / conv.factor);

  const question = {
    value,
    fromUnit: direction === 'multiply' ? conv.from : conv.to,
    toUnit: direction === 'multiply' ? conv.to : conv.from,
    correctAnswer,
    conversionFactor: conv.factor,
    direction,
    category: conv.category,
    convKey: conv.from + conv.to,
  };

  quizState.history.push(question.convKey + direction);
  if (quizState.history.length > 3) quizState.history.shift();

  return question;
}

function isRecentRepeat(conv) {
  const key = conv.from + conv.to;
  return quizState.history.some(h => h.startsWith(key));
}

function pickMultiplyValue(factor) {
  const r = Math.random();
  if (r < 0.55) {
    return Math.floor(Math.random() * 9) + 1;
  } else if (r < 0.85) {
    return Math.floor(Math.random() * 9) + 0.5;
  } else {
    const base = Math.floor(Math.random() * 8) + 1;
    return base + (Math.random() < 0.5 ? 0.25 : 0.75);
  }
}

function pickDivideValue(factor) {
  const r = Math.random();
  if (r < 0.55) {
    return (Math.floor(Math.random() * 9) + 1) * factor;
  } else if (r < 0.85) {
    return roundSafe((Math.floor(Math.random() * 9) + 0.5) * factor);
  } else {
    return roundSafe((Math.floor(Math.random() * 8) + 1.25) * factor);
  }
}

function roundSafe(n) {
  return Math.round(n * 10000) / 10000;
}

// === RENDERING ===
function renderQuestion(q) {
  _q('#q-value').textContent = formatNumber(q.value);
  _q('#q-from-unit').textContent = q.fromUnit;
  _q('#q-to-unit').textContent = q.toUnit;
  _input.value = '';
  _input.placeholder = '?';
  focusInput();
}

function formatNumber(n) {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toString()).toString();
}

function renderStats() {
  _q('#attempts-count').textContent = quizState.stats.attempts;
  _q('#brave-count').textContent = quizState.stats.brave;
  _q('#correct-count').textContent = quizState.stats.correct;
  _q('#meter-fill').style.width = quizState.stats.meterValue + '%';
  _q('#level-badge').textContent = 'Lv ' + quizState.stats.level;
}

function pulseStat(id) {
  const el = _q(id);
  el.classList.remove('pulse');
  void el.offsetWidth;
  el.classList.add('pulse');
}

// === ANSWER HANDLING ===
function submitAnswer() {
  if (quizState.phase !== 'asking') return;

  const raw = _input.value.trim();
  if (raw === '') return;

  const userAnswer = parseFloat(raw);
  if (isNaN(userAnswer)) {
    _input.value = '';
    _input.placeholder = 'number!';
    return;
  }

  if (_introHint && _introHint.style.display !== 'none') {
    _introHint.style.display = 'none';
  }

  _card.classList.add('submitted');
  setTimeout(() => _card.classList.remove('submitted'), 250);

  quizState.stats.attempts++;
  pulseStat('#stat-attempts');

  const q = quizState.currentQuestion;
  if (isCorrect(userAnswer, q.correctAnswer)) {
    quizState.stats.correct++;
    quizState.stats.meterValue += 5;
    pulseStat('#stat-correct');
    showCorrectFeedback();
  } else {
    quizState.stats.brave++;
    quizState.stats.meterValue += 3;
    pulseStat('#stat-brave');
    showWrongFeedback(q, userAnswer);
  }

  renderStats();
  checkLevelUp();
}

function isCorrect(user, correct) {
  return Math.abs(user - correct) < 0.001;
}

// === FEEDBACK: CORRECT ===
function showCorrectFeedback() {
  quizState.phase = 'feedback-correct';
  _card.classList.add('correct');

  // Fire external callbacks
  quizCallbacks.onCorrect.forEach(fn => fn());

  const msg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  _encouragement.innerHTML = `<span class="encouragement-text correct-msg">${msg}</span>`;

  createParticleBurst();

  _input.disabled = true;
  _goBtn.disabled = true;

  setTimeout(() => {
    _card.classList.remove('correct');
    _encouragement.innerHTML = '';
    advanceToNext();
  }, 900);
}

// === FEEDBACK: WRONG ===
function showWrongFeedback(q, userAnswer) {
  quizState.phase = 'feedback-wrong';
  _card.classList.add('wrong');

  // Fire external callbacks
  quizCallbacks.onWrong.forEach(fn => fn());

  const msg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
  _encouragement.innerHTML = `<span class="encouragement-text wrong-msg">${msg}</span>`;

  _input.disabled = true;
  _goBtn.disabled = true;

  _animationArea.innerHTML = '';
  showDecimalSlider(q);
  showUnitLadder(q);

  setTimeout(() => {
    const btn = document.createElement('button');
    btn.className = 'next-btn';
    btn.textContent = "Got it! Next one \u2192";
    btn.addEventListener('click', () => {
      _card.classList.remove('wrong');
      _encouragement.innerHTML = '';
      _animationArea.innerHTML = '';
      advanceToNext();
    });
    _animationArea.appendChild(btn);
    btn.focus();
  }, 2200);
}

// === ADVANCE ===
function advanceToNext() {
  _input.disabled = false;
  _goBtn.disabled = false;
  _animationArea.innerHTML = '';
  _encouragement.innerHTML = '';
  _card.classList.remove('correct', 'wrong');
  quizState.phase = 'asking';
  quizState.currentQuestion = generateQuestion();
  if (quizState.currentQuestion) {
    renderQuestion(quizState.currentQuestion);
  }
}

function focusInput() {
  requestAnimationFrame(() => {
    _input.focus();
    _input.select();
  });
}

// === PARTICLES ===
function createParticleBurst() {
  const colors = ['#FFB6C1', '#D8B4FE', '#A7F3D0', '#FDE68A', '#FECACA', '#FF85A2'];
  const count = 12;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const angle = (2 * Math.PI / count) * i + (Math.random() - 0.5) * 0.5;
    const distance = 50 + Math.random() * 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    _particleContainer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
}

// === DECIMAL SLIDER ANIMATION ===
function showDecimalSlider(q) {
  const section = document.createElement('div');
  section.className = 'decimal-slider-section';

  const places = Math.round(Math.log10(q.conversionFactor));
  const isMultiply = q.direction === 'multiply';

  const label = document.createElement('div');
  label.className = 'slider-label';
  const arrowDir = isMultiply ? '\u2192' : '\u2190';
  label.innerHTML = `<span class="arrow-icon">${arrowDir}</span> ${isMultiply ? '\u00d7' : '\u00f7'}${q.conversionFactor}`;
  section.appendChild(label);

  const container = document.createElement('div');
  container.className = 'decimal-slider-container';

  const originalStr = formatForSlider(q.value, places, isMultiply);
  const origDigits = originalStr.replace('.', '').split('');
  const origDotIndex = originalStr.indexOf('.');
  const digitWidth = 34;

  const digitEls = [];
  origDigits.forEach((d) => {
    const span = document.createElement('span');
    span.className = 'slider-digit';
    span.textContent = d;
    digitEls.push(span);
  });

  const dotEl = document.createElement('span');
  dotEl.className = 'slider-dot';
  dotEl.textContent = '.';

  const allEls = [];
  for (let i = 0; i < origDigits.length; i++) {
    if (i === origDotIndex) allEls.push(dotEl);
    allEls.push(digitEls[i]);
  }
  if (origDotIndex === origDigits.length) allEls.push(dotEl);

  allEls.forEach(el => container.appendChild(el));
  section.appendChild(container);

  const shift = isMultiply ? places : -places;
  const pixelShift = shift * digitWidth;

  setTimeout(() => {
    dotEl.style.transform = `translateX(${pixelShift}px)`;
  }, 500);

  setTimeout(() => {
    const cleanResult = formatNumber(q.correctAnswer);
    const resultDisplay = document.createElement('div');
    resultDisplay.className = 'result-display';
    resultDisplay.textContent = `${formatNumber(q.value)} ${q.fromUnit} = ${cleanResult} ${q.toUnit}`;
    section.appendChild(resultDisplay);
  }, 1600);

  _animationArea.appendChild(section);
}

function formatForSlider(value, places, needsTrailingZeros) {
  let str = value.toString();
  if (!str.includes('.')) str += '.';
  const [intPart, decPart] = str.split('.');

  if (needsTrailingZeros) {
    const padded = decPart.padEnd(places, '0');
    return intPart + '.' + padded;
  } else {
    const needed = places - intPart.length + 1;
    const paddedInt = needed > 0 ? '0'.repeat(needed) + intPart : intPart;
    return paddedInt + '.' + (decPart || '0');
  }
}

// === UNIT LADDER ANIMATION ===
function showUnitLadder(q) {
  const ladderData = UNIT_LADDERS[q.category];
  if (!ladderData) return;

  const ladder = document.createElement('div');
  ladder.className = 'unit-ladder';

  ladderData.forEach(item => {
    if (item.unit) {
      const el = document.createElement('div');
      el.className = 'ladder-unit';
      el.textContent = item.label;
      if (item.unit === q.fromUnit) el.classList.add('active-from');
      if (item.unit === q.toUnit) el.classList.add('active-to');
      ladder.appendChild(el);
    } else {
      const arrow = document.createElement('div');
      arrow.className = 'ladder-arrow';
      arrow.textContent = '\u2195 ' + item.label;
      const isActive = (item.from === q.fromUnit && item.to === q.toUnit) ||
                       (item.to === q.fromUnit && item.from === q.toUnit);
      if (isActive) arrow.classList.add('active-arrow');
      ladder.appendChild(arrow);
    }
  });

  _animationArea.appendChild(ladder);
}

// === LEVEL UP ===
function checkLevelUp() {
  if (quizState.stats.meterValue >= 100) {
    quizState.stats.meterValue -= 100;
    quizState.stats.level++;
    renderStats();
    showLevelUp();
  }
}

function showLevelUp() {
  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';

  const text = document.createElement('div');
  text.className = 'level-up-text';
  text.textContent = 'LEVEL UP!';

  const num = document.createElement('div');
  num.className = 'level-up-number';
  num.textContent = 'Level ' + quizState.stats.level;

  overlay.appendChild(text);
  overlay.appendChild(num);

  const confettiColors = ['#FFB6C1', '#D8B4FE', '#A7F3D0', '#FDE68A', '#FF85A2', '#FECACA'];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'level-up-confetti';
    c.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.left = Math.random() * 100 + '%';
    c.style.top = '-20px';
    c.style.setProperty('--fall-distance', (200 + Math.random() * 400) + 'px');
    c.style.setProperty('--rotation', (360 + Math.random() * 720) + 'deg');
    c.style.animationDuration = (1 + Math.random() * 1.5) + 's';
    c.style.animationDelay = (Math.random() * 0.5) + 's';
    overlay.appendChild(c);
  }

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.animation = 'overlay-in 0.3s ease reverse';
    setTimeout(() => overlay.remove(), 300);
  }, 1800);
}

// === CATEGORY TOGGLES ===
function initCategoryToggles() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;

      if (btn.classList.contains('active')) {
        if (quizState.activeCategories.size <= 1) return;
        quizState.activeCategories.delete(cat);
        btn.classList.remove('active');
      } else {
        quizState.activeCategories.add(cat);
        btn.classList.add('active');
      }

      if (quizState.phase === 'asking') {
        quizState.currentQuestion = generateQuestion();
        if (quizState.currentQuestion) renderQuestion(quizState.currentQuestion);
      }
    });
  });
}

// === EVENT HANDLERS ===
function initQuizEvents() {
  _goBtn.addEventListener('click', () => {
    if (quizState.phase === 'asking') {
      submitAnswer();
    }
  });

  _input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (quizState.phase === 'asking') {
        submitAnswer();
      } else if (quizState.phase === 'feedback-wrong') {
        _card.classList.remove('wrong');
        _encouragement.innerHTML = '';
        _animationArea.innerHTML = '';
        advanceToNext();
      }
    }
  });
}

// === INIT ===
function initQuiz() {
  initQuizDOM();
  initQuizEvents();
  initCategoryToggles();

  quizState.currentQuestion = generateQuestion();
  if (quizState.currentQuestion) {
    renderQuestion(quizState.currentQuestion);
  }
  renderStats();
}
