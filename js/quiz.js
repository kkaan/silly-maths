/* ============================================================
   Quiz Engine — Metric Conversion Practice
   ============================================================ */

// Callback arrays — external code pushes functions into these
const quizCallbacks = {
  onCorrect: [],
  onWrong: [],
  onSkittle: [],
  onLevelUp: [],
};

// === TIERED CONVERSION DATA ===
const CONVERSION_TIERS = [
  {
    minLevel: 1,
    conversions: [
      { from: 'km', to: 'm',  factor: 1000, category: 'length' },
      { from: 'm',  to: 'cm', factor: 100,  category: 'length' },
      { from: 'cm', to: 'mm', factor: 10,   category: 'length' },
      { from: 'kg', to: 'g',  factor: 1000, category: 'mass' },
      { from: 'g',  to: 'mg', factor: 1000, category: 'mass' },
      { from: 'L',  to: 'mL', factor: 1000, category: 'capacity' },
    ],
  },
  {
    minLevel: 3,
    conversions: [
      { from: 'km', to: 'cm', factor: 100000,  category: 'length' },
      { from: 'km', to: 'mm', factor: 1000000, category: 'length' },
      { from: 'm',  to: 'mm', factor: 1000,    category: 'length' },
      { from: 'kg', to: 'mg', factor: 1000000, category: 'mass' },
    ],
  },
  {
    minLevel: 6,
    conversions: [
      { from: 'm\u00b2',  to: 'cm\u00b2', factor: 10000,   category: 'area', smallOnly: true },
      { from: 'cm\u00b2', to: 'mm\u00b2', factor: 100,     category: 'area', smallOnly: true },
      { from: 'km\u00b2', to: 'm\u00b2',  factor: 1000000, category: 'area', smallOnly: true },
    ],
  },
  {
    minLevel: 10,
    conversions: [
      { from: 'km/h', to: 'm/h',   factor: 1000, category: 'rates' },
      { from: 'km/min', to: 'km/h', factor: 60,   category: 'rates' },
      { from: 'm/s',  to: 'km/h',  factor: 3.6,   category: 'rates' },
      { from: '$',    to: 'cents',  factor: 100,   category: 'money', moneyStyle: true },
    ],
  },
];

// Fraction/decimal/percentage data (levels 20+)
const FRACTION_DATA = [
  { fraction: '1/2',   decimal: 0.5,   percent: 50 },
  { fraction: '1/4',   decimal: 0.25,  percent: 25 },
  { fraction: '3/4',   decimal: 0.75,  percent: 75 },
  { fraction: '1/5',   decimal: 0.2,   percent: 20 },
  { fraction: '2/5',   decimal: 0.4,   percent: 40 },
  { fraction: '3/5',   decimal: 0.6,   percent: 60 },
  { fraction: '4/5',   decimal: 0.8,   percent: 80 },
  { fraction: '1/8',   decimal: 0.125, percent: 12.5 },
  { fraction: '3/8',   decimal: 0.375, percent: 37.5 },
  { fraction: '5/8',   decimal: 0.625, percent: 62.5 },
  { fraction: '7/8',   decimal: 0.875, percent: 87.5 },
  { fraction: '1/10',  decimal: 0.1,   percent: 10 },
  { fraction: '3/10',  decimal: 0.3,   percent: 30 },
  { fraction: '7/10',  decimal: 0.7,   percent: 70 },
  { fraction: '9/10',  decimal: 0.9,   percent: 90 },
  { fraction: '1/20',  decimal: 0.05,  percent: 5 },
  { fraction: '3/20',  decimal: 0.15,  percent: 15 },
  { fraction: '1/25',  decimal: 0.04,  percent: 4 },
  { fraction: '1/100', decimal: 0.01,  percent: 1 },
];

const FRACTION_DIRECTIONS = [
  { from: 'fraction', to: 'decimal' },
  { from: 'fraction', to: 'percent' },
  { from: 'decimal',  to: 'percent' },
  { from: 'percent',  to: 'decimal' },
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
  area: [
    { unit: 'km\u00b2', label: 'km\u00b2' },
    { from: 'km\u00b2', to: 'm\u00b2', label: '\u00d71,000,000' },
    { unit: 'm\u00b2', label: 'm\u00b2' },
    { from: 'm\u00b2', to: 'cm\u00b2', label: '\u00d710,000' },
    { unit: 'cm\u00b2', label: 'cm\u00b2' },
    { from: 'cm\u00b2', to: 'mm\u00b2', label: '\u00d7100' },
    { unit: 'mm\u00b2', label: 'mm\u00b2' },
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
    skittles: 0,
  },
  activeCategories: new Set(['length', 'mass', 'capacity']),
  history: [],
};

// === PERSISTENCE ===
function saveStats() {
  FirebaseSync.saveStats(quizState.stats);
}

async function loadStats() {
  const saved = await FirebaseSync.loadStats();
  if (saved) {
    quizState.stats.attempts = saved.attempts || 0;
    quizState.stats.correct = saved.correct || 0;
    quizState.stats.brave = saved.brave || 0;
    quizState.stats.meterValue = saved.meterValue || 0;
    quizState.stats.level = saved.level || 1;
    quizState.stats.skittles = saved.skittles || 0;
  }
}

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
function getAvailableConversions() {
  const level = quizState.stats.level;
  const pool = [];
  let newestTierMin = 1;

  for (const tier of CONVERSION_TIERS) {
    if (level >= tier.minLevel) {
      const filtered = tier.conversions.filter(c => quizState.activeCategories.has(c.category));
      pool.push(...filtered);
      if (tier.minLevel > newestTierMin && filtered.length > 0) {
        newestTierMin = tier.minLevel;
      }
    }
  }

  return { pool, newestTierMin };
}

function generateQuestion() {
  const level = quizState.stats.level;

  // Levels 20+: 40% chance of fraction question if numbers category active
  if (level >= 20 && quizState.activeCategories.has('numbers') && Math.random() < 0.4) {
    return generateFractionQuestion();
  }

  const { pool, newestTierMin } = getAvailableConversions();
  if (pool.length === 0) {
    // Fallback: try fraction question if available
    if (level >= 20 && quizState.activeCategories.has('numbers')) {
      return generateFractionQuestion();
    }
    return null;
  }

  // Weight newer conversions higher (~40% newest tier, 60% all others)
  let conv;
  let tries = 0;
  do {
    if (newestTierMin > 1 && Math.random() < 0.4) {
      const newestPool = pool.filter(c => {
        const tier = CONVERSION_TIERS.find(t => t.conversions.includes(c));
        return tier && tier.minLevel === newestTierMin;
      });
      if (newestPool.length > 0) {
        conv = newestPool[Math.floor(Math.random() * newestPool.length)];
      } else {
        conv = pool[Math.floor(Math.random() * pool.length)];
      }
    } else {
      conv = pool[Math.floor(Math.random() * pool.length)];
    }
    tries++;
  } while (tries < 20 && isRecentRepeat(conv));

  // Pick direction
  const direction = Math.random() < 0.5 ? 'multiply' : 'divide';

  // Pick value
  let value;
  if (conv.smallOnly) {
    value = Math.floor(Math.random() * 5) + 1;
    if (direction === 'divide') {
      value = value * conv.factor;
    }
  } else if (conv.moneyStyle) {
    value = pickMoneyValue(direction, conv.factor);
  } else if (conv.factor === 3.6) {
    value = pickRateValue36(direction);
  } else if (conv.factor === 60) {
    value = pickRate60Value(direction);
  } else if (direction === 'multiply') {
    value = pickMultiplyValue(conv.factor);
  } else {
    value = pickDivideValue(conv.factor);
  }

  const correctAnswer = direction === 'multiply'
    ? roundSafe(value * conv.factor)
    : roundSafe(value / conv.factor);

  const question = {
    type: 'conversion',
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

function generateFractionQuestion() {
  const data = FRACTION_DATA[Math.floor(Math.random() * FRACTION_DATA.length)];
  const dir = FRACTION_DIRECTIONS[Math.floor(Math.random() * FRACTION_DIRECTIONS.length)];

  let displayValue, fromUnit, toUnit, correctAnswer, answerIsFraction;

  if (dir.from === 'fraction' && dir.to === 'decimal') {
    displayValue = data.fraction;
    fromUnit = '';
    toUnit = '';
    correctAnswer = data.decimal;
    answerIsFraction = false;
  } else if (dir.from === 'fraction' && dir.to === 'percent') {
    displayValue = data.fraction;
    fromUnit = '';
    toUnit = '%';
    correctAnswer = data.percent;
    answerIsFraction = false;
  } else if (dir.from === 'decimal' && dir.to === 'percent') {
    displayValue = formatNumber(data.decimal);
    fromUnit = '';
    toUnit = '%';
    correctAnswer = data.percent;
    answerIsFraction = false;
  } else if (dir.from === 'percent' && dir.to === 'decimal') {
    displayValue = formatNumber(data.percent);
    fromUnit = '%';
    toUnit = '';
    correctAnswer = data.decimal;
    answerIsFraction = false;
  }

  return {
    type: 'fraction',
    value: displayValue,
    fromUnit,
    toUnit,
    correctAnswer,
    answerIsFraction,
    fractionAnswer: data.fraction,
    category: 'numbers',
    convKey: 'frac' + dir.from + dir.to,
    direction: dir.from + '->' + dir.to,
    conversionFactor: null,
  };
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

function pickMoneyValue(direction, factor) {
  // Realistic dollar amounts
  const dollars = [0.5, 1, 1.25, 1.50, 1.75, 2, 2.50, 3, 3.50, 4.25, 5, 7.50, 10, 10.20, 15, 20];
  if (direction === 'multiply') {
    return dollars[Math.floor(Math.random() * dollars.length)];
  } else {
    return dollars[Math.floor(Math.random() * dollars.length)] * factor;
  }
}

function pickRateValue36(direction) {
  // m/s ↔ km/h — pick values that give clean results with factor 3.6
  if (direction === 'multiply') {
    // m/s values: multiples of 5 give clean km/h (5 m/s = 18 km/h)
    return [5, 10, 15, 20, 25, 30, 50, 100][Math.floor(Math.random() * 8)];
  } else {
    // km/h values that divide cleanly by 3.6
    return [18, 36, 54, 72, 90, 108, 180, 360][Math.floor(Math.random() * 8)];
  }
}

function pickRate60Value(direction) {
  // km/min ↔ km/h — factor 60
  if (direction === 'multiply') {
    // km/min values: small numbers × 60 = clean km/h
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Math.floor(Math.random() * 10)];
  } else {
    // km/h values that divide cleanly by 60
    return [60, 120, 180, 240, 300, 360, 420, 480, 540, 600][Math.floor(Math.random() * 10)];
  }
}

function roundSafe(n) {
  return Math.round(n * 10000) / 10000;
}

// === RENDERING ===
function renderQuestion(q) {
  _q('#q-value').textContent = q.type === 'conversion' ? formatNumber(q.value) : q.value;
  _q('#q-from-unit').textContent = q.fromUnit;
  _q('#q-to-unit').textContent = q.toUnit;
  _input.value = '';
  _input.placeholder = '?';
  // Use text input for fraction questions so mobile keyboard has "/"
  _input.inputMode = (q.type === 'fraction' && q.answerIsFraction) ? 'text' : 'decimal';
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
  _q('#meter-fill').style.width = Math.min((quizState.stats.meterValue / 30) * 100, 100) + '%';
  _q('#level-badge').textContent = 'Lv ' + quizState.stats.level;
  const skittleEl = _q('#skittle-count');
  if (skittleEl) skittleEl.textContent = quizState.stats.skittles;
}

function pulseStat(id) {
  const el = _q(id);
  el.classList.remove('pulse');
  void el.offsetWidth;
  el.classList.add('pulse');
}

// === CATEGORY BUTTONS — show/hide based on level ===
function updateCategoryButtons() {
  const level = quizState.stats.level;
  const show = (cat) => {
    const btn = document.querySelector(`[data-cat="${cat}"]`);
    if (btn && btn.style.display === 'none') {
      btn.style.display = '';
      quizState.activeCategories.add(cat);
      btn.classList.add('active');
    }
  };
  if (level >= 6) show('area');
  if (level >= 10) { show('rates'); show('money'); }
  if (level >= 20) show('numbers');

  // Show earned milestone items
  const earnedContainer = _q('#earned-items');
  if (earnedContainer) {
    if (level >= 10) {
      earnedContainer.style.display = '';
      _q('#earned-wand').style.display = '';
    }
    if (level >= 20) _q('#earned-tiara').style.display = '';
    if (level >= 30) _q('#earned-scepter').style.display = '';
  }
}

// === ANSWER HANDLING ===
function submitAnswer() {
  if (quizState.phase !== 'asking') return;

  const raw = _input.value.trim();
  if (raw === '') return;

  const q = quizState.currentQuestion;

  // Parse answer — support fraction input like "3/4"
  let userAnswer;
  if (raw.includes('/')) {
    const parts = raw.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        userAnswer = num / den;
      }
    }
  }
  if (userAnswer === undefined) {
    userAnswer = parseFloat(raw);
  }

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

  if (isCorrect(userAnswer, q.correctAnswer)) {
    quizState.stats.correct++;
    quizState.stats.meterValue += 5;
    pulseStat('#stat-correct');
    showCorrectFeedback(quizState.stats.correct % 2 === 0);
  } else {
    quizState.stats.brave++;
    quizState.stats.meterValue += 3;
    pulseStat('#stat-brave');
    showWrongFeedback(q, userAnswer);
  }

  // Skittle check (points-based: every 30 points)
  if (quizState.stats.meterValue >= 30) {
    quizState.stats.meterValue -= 30;
    quizState.stats.skittles++;
    pulseStat('#stat-skittles');
    quizCallbacks.onSkittle.forEach(fn => fn(quizState.stats.skittles));
  }

  renderStats();
  checkLevelUp();
  saveStats();
}

function isCorrect(user, correct) {
  return Math.abs(user - correct) < 0.001;
}

// === FEEDBACK: CORRECT ===
function showCorrectFeedback(triggerUnicornHop) {
  quizState.phase = 'feedback-correct';
  _card.classList.add('correct');

  // Fire unicorn hop only every 2 correct answers (10 hops per 20 correct = 1 level)
  if (triggerUnicornHop) {
    quizCallbacks.onCorrect.forEach(fn => fn());
  }

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

  const msg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
  _encouragement.innerHTML = `<span class="encouragement-text wrong-msg">${msg}</span>`;

  _input.disabled = true;
  _goBtn.disabled = true;

  _animationArea.innerHTML = '';

  if (q.type === 'conversion' && q.conversionFactor) {
    showDecimalSlider(q);
    showUnitLadder(q);
  } else if (q.type === 'fraction') {
    showFractionHelp(q);
  }

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

// === FRACTION HELP (wrong answer feedback) ===
function showFractionHelp(q) {
  const display = document.createElement('div');
  display.className = 'result-display';
  display.style.animationDelay = '0.5s';

  let text = q.value + ' ' + q.fromUnit + ' = ' + formatNumber(q.correctAnswer) + ' ' + q.toUnit;
  display.textContent = text.trim();

  _animationArea.appendChild(display);
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

// === SKITTLE FANFARE ===
function showSkittleFanfare(count) {
  const badge = document.createElement('div');
  badge.className = 'skittle-fanfare';
  badge.innerHTML = '\u{1F36C} Skittle! x' + count;
  _card.appendChild(badge);

  // Rainbow particle burst
  const skittleColors = ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#B10DC9'];
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const angle = (2 * Math.PI / 16) * i + (Math.random() - 0.5) * 0.5;
    const distance = 60 + Math.random() * 50;
    particle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
    particle.style.backgroundColor = skittleColors[i % skittleColors.length];
    _particleContainer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }

  setTimeout(() => badge.remove(), 1800);
}

// === DECIMAL SLIDER ANIMATION ===
function showDecimalSlider(q) {
  const section = document.createElement('div');
  section.className = 'decimal-slider-section';

  const places = Math.round(Math.log10(q.conversionFactor));
  if (isNaN(places) || places <= 0) return; // skip for non-power-of-10 factors
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
const MILESTONES = {
  10: { emoji: '\u{1FA84}', tier: 'wand',    title: 'Fairy Apprentice!',    message: 'You earned the magic wand! You may now practice fairy magic!', duration: 3000, confetti: 40 },
  20: { emoji: '\u{1F451}', tier: 'tiara',   title: 'Fairy Princess!',      message: 'All the unicorns love you! Even Fluffy bows in admiration!', duration: 3500, confetti: 45 },
  30: { emoji: '\u{1F3C6}', tier: 'scepter', title: 'Sovereign Princess\nof all the Lands!', message: "Fluffy celebrates with an all-you-can-eat ice cream buffet!", duration: 4000, confetti: 50 },
};

function checkLevelUp() {
  if (quizState.stats.correct > 0 && quizState.stats.correct % 20 === 0) {
    quizState.stats.level++;
    renderStats();
    saveStats();
    updateCategoryButtons();

    const level = quizState.stats.level;
    if (MILESTONES[level]) {
      showMilestoneOverlay(level);
    } else {
      showLevelUp();
    }
    quizCallbacks.onLevelUp.forEach(fn => fn(level));

    // Chain: overlay → flavour picker → story beat
    const overlayDelay = MILESTONES[level] ? MILESTONES[level].duration + 500 : 2300;
    setTimeout(() => {
      showFlavourPicker(() => {
        if (typeof showStoryBeat === 'function' && STORY_BEATS && STORY_BEATS[level]) {
          showStoryBeat(level);
        }
      });
    }, overlayDelay);
  }
}

function showLevelUp() {
  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';

  const iceCream = document.createElement('div');
  iceCream.className = 'level-up-icecream';
  iceCream.textContent = '\u{1F366}';

  const text = document.createElement('div');
  text.className = 'level-up-text';
  text.textContent = 'LEVEL UP!';

  const fluffy = document.createElement('div');
  fluffy.className = 'level-up-fluffy';
  fluffy.textContent = 'Fluffy got the ice cream!';

  const num = document.createElement('div');
  num.className = 'level-up-number';
  num.textContent = 'Level ' + quizState.stats.level;

  overlay.appendChild(iceCream);
  overlay.appendChild(text);
  overlay.appendChild(fluffy);
  overlay.appendChild(num);

  addConfetti(overlay, 30);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.animation = 'overlay-in 0.3s ease reverse';
    setTimeout(() => overlay.remove(), 300);
  }, 1800);
}

function showMilestoneOverlay(level) {
  const m = MILESTONES[level];
  const overlay = document.createElement('div');
  overlay.className = 'milestone-overlay tier-' + m.tier;

  const item = document.createElement('div');
  item.className = 'milestone-item';
  item.textContent = m.emoji;

  const title = document.createElement('div');
  title.className = 'milestone-title';
  title.textContent = m.title;

  const msg = document.createElement('div');
  msg.className = 'milestone-message';
  msg.textContent = m.message;

  const num = document.createElement('div');
  num.className = 'milestone-level';
  num.textContent = 'Level ' + level;

  overlay.appendChild(item);
  overlay.appendChild(title);
  overlay.appendChild(msg);
  overlay.appendChild(num);

  addConfetti(overlay, m.confetti);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.animation = 'overlay-in 0.4s ease reverse';
    setTimeout(() => overlay.remove(), 400);
  }, m.duration);
}


function addConfetti(container, count) {
  const colors = ['#FFB6C1', '#D8B4FE', '#A7F3D0', '#FDE68A', '#FF85A2', '#FECACA', '#FFD700', '#88C8F7'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'level-up-confetti';
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.left = Math.random() * 100 + '%';
    c.style.top = '-20px';
    c.style.setProperty('--fall-distance', (200 + Math.random() * 400) + 'px');
    c.style.setProperty('--rotation', (360 + Math.random() * 720) + 'deg');
    c.style.animationDuration = (1 + Math.random() * 1.5) + 's';
    c.style.animationDelay = (Math.random() * 0.5) + 's';
    container.appendChild(c);
  }
}

// === FLAVOUR PICKER ===
const ICE_CREAM_FLAVOURS = [
  { name: 'Salted Caramel', color: '#D4A76A' },
  { name: 'Fairy Floss',    color: '#FFB6D9' },
  { name: 'Chocolate',      color: '#8B5E3C' },
  { name: 'Passionfruit Sorbet', color: '#FFD166' },
  { name: 'Vanilla',        color: '#FFF5E1' },
  { name: 'Chocolate Mint', color: '#98D4BB' },
  { name: 'Dulce de Leche', color: '#C8956C' },
];

function showFlavourPicker(onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'flavour-overlay';

  const panel = document.createElement('div');
  panel.className = 'flavour-panel';

  const emoji = document.createElement('div');
  emoji.className = 'flavour-emoji';
  emoji.textContent = '\u{1F366}';

  const heading = document.createElement('div');
  heading.className = 'flavour-heading';
  heading.textContent = 'Fluffy wants to share! Pick a flavour:';

  const grid = document.createElement('div');
  grid.className = 'flavour-grid';

  ICE_CREAM_FLAVOURS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'flavour-btn';
    btn.textContent = f.name;
    btn.style.backgroundColor = f.color;
    // Dark text for light colours, white for dark
    const brightness = parseInt(f.color.slice(1, 3), 16) * 0.299 +
                       parseInt(f.color.slice(3, 5), 16) * 0.587 +
                       parseInt(f.color.slice(5, 7), 16) * 0.114;
    btn.style.color = brightness > 150 ? '#4A4A4A' : '#FFFFFF';

    btn.addEventListener('click', () => {
      grid.querySelectorAll('.flavour-btn').forEach(b => b.disabled = true);
      btn.classList.add('flavour-selected');

      heading.innerHTML = '\u{1F984} Fluffy LOVED the ' + f.name + '!';
      heading.classList.add('flavour-result');

      setTimeout(() => {
        overlay.style.animation = 'overlay-in 0.3s ease reverse';
        setTimeout(() => {
          overlay.remove();
          if (onDone) onDone();
        }, 300);
      }, 1200);
    });

    grid.appendChild(btn);
  });

  panel.appendChild(emoji);
  panel.appendChild(heading);
  panel.appendChild(grid);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
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
async function initQuiz() {
  initQuizDOM();
  initQuizEvents();
  initCategoryToggles();
  await loadStats();
  updateCategoryButtons();

  quizState.currentQuestion = generateQuestion();
  if (quizState.currentQuestion) {
    renderQuestion(quizState.currentQuestion);
  }
  renderStats();

  // Show intro story for new players
  if (quizState.stats.level === 1 && quizState.stats.attempts === 0) {
    if (typeof showStoryBeat === 'function') {
      setTimeout(() => showStoryBeat(1), 500);
    }
  }
}
