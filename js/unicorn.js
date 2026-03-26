/* ============================================================
   Unicorn Canvas — Fluffy on the Rainbow Progress Bar
   ============================================================ */

const UnicornGame = {
  // --- Configuration ---
  TOTAL_STEPS: 10,
  ANIM_DURATION: 400,
  BOUNCE_DURATION: 300,
  CELEBRATE_DURATION: 1800,

  // --- State ---
  currentStep: 0,
  targetStep: 0,
  animationState: 'idle',   // idle | hopping | bouncing | celebrating
  emotion: 'neutral',       // neutral | happy
  animStartTime: 0,
  animFromStep: 0,
  sparkles: [],
  canvasEl: null,
  ctx: null,
  running: false,
  playerLevel: 1,
  scale: 1,
  w: 0,
  h: 0,

  // ============================================================
  // INIT
  // ============================================================
  init(canvas) {
    if (!canvas) return;
    this.canvasEl = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.running = true;
    this.updatePosition();
    requestAnimationFrame((t) => this.render(t));

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.resize()).observe(canvas);
    }
  },

  resize() {
    const canvas = this.canvasEl;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = rect.width;
    this.h = rect.height;
    this.scale = Math.min(this.w, this.h) / 60;
  },

  // Position the canvas element along the bar
  updatePosition() {
    if (!this.canvasEl) return;
    var pct = (this.currentStep / this.TOTAL_STEPS) * 100;
    // Map 0-100 to the fill range (which is 0-100% of the track)
    // correctInLevel is driven by renderStats, but fluffy steps independently
    this.canvasEl.style.left = pct + '%';
  },

  // ============================================================
  // PUBLIC API
  // ============================================================
  onCorrectAnswer() {
    if (this.animationState !== 'idle') return;
    this.animFromStep = this.currentStep;
    this.targetStep = Math.min(this.currentStep + 1, this.TOTAL_STEPS);
    this.animationState = 'hopping';
    this.emotion = 'happy';
    this.animStartTime = performance.now();
    this.addSparkles(4);
  },

  onWrongAnswer() {
    // Unicorn stays put — no sliding back
  },

  onLevelUp() {
    this.animFromStep = this.currentStep;
    this.currentStep = this.TOTAL_STEPS;
    this.targetStep = this.TOTAL_STEPS;
    this.animationState = 'celebrating';
    this.emotion = 'happy';
    this.animStartTime = performance.now();
    this.addSparkles(8);
    this.updatePosition();
  },

  setLevel(level) {
    this.playerLevel = level;
  },

  // ============================================================
  // SPARKLES
  // ============================================================
  addSparkles(count) {
    var cx = this.w / 2;
    var cy = this.h / 2;
    for (var i = 0; i < count; i++) {
      this.sparkles.push({
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 30,
        size: 2 + Math.random() * 4,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.03,
      });
    }
  },

  updateSparkles() {
    for (var i = this.sparkles.length - 1; i >= 0; i--) {
      this.sparkles[i].alpha -= this.sparkles[i].decay;
      this.sparkles[i].y -= 0.4;
      if (this.sparkles[i].alpha <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  },

  // ============================================================
  // EASING
  // ============================================================
  easeOutBack(t) {
    var c1 = 1.70158;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  // ============================================================
  // ANIMATED POSITION (vertical bounce on the small canvas)
  // ============================================================
  getAnimatedOffset(timestamp) {
    var elapsed = timestamp - this.animStartTime;

    if (this.animationState === 'idle') {
      var float = Math.sin(timestamp * 0.003) * 1.5;
      return { dy: float };
    }

    if (this.animationState === 'hopping') {
      var t = Math.min(elapsed / this.ANIM_DURATION, 1);
      var hopHeight = -8 * this.scale * Math.sin(t * Math.PI);

      if (t >= 1) {
        this.currentStep = this.targetStep;
        this.updatePosition();
        if (this.currentStep >= this.TOTAL_STEPS) {
          this.animationState = 'celebrating';
          this.animStartTime = timestamp;
          this.addSparkles(6);
        } else {
          this.animationState = 'bouncing';
          this.animStartTime = timestamp;
        }
      }
      return { dy: hopHeight };
    }

    if (this.animationState === 'bouncing') {
      var t = Math.min(elapsed / this.BOUNCE_DURATION, 1);
      var bounce = Math.sin(t * Math.PI * 3) * (1 - t) * 4;
      if (t >= 1) {
        this.animationState = 'idle';
        setTimeout(() => { this.emotion = 'neutral'; }, 500);
      }
      return { dy: bounce };
    }

    if (this.animationState === 'celebrating') {
      var t = Math.min(elapsed / this.CELEBRATE_DURATION, 1);
      var bounce = Math.sin(t * Math.PI * 6) * (1 - t) * 6;
      if (elapsed % 150 < 17) this.addSparkles(2);

      if (t >= 1) {
        this.currentStep = 0;
        this.targetStep = 0;
        this.animationState = 'idle';
        this.emotion = 'neutral';
        this.updatePosition();
      }
      return { dy: bounce };
    }

    return { dy: 0 };
  },

  // ============================================================
  // RENDER LOOP
  // ============================================================
  render(timestamp) {
    if (!this.running) return;
    var ctx = this.ctx;
    if (!ctx || this.w === 0) {
      requestAnimationFrame((t) => this.render(t));
      return;
    }
    ctx.clearRect(0, 0, this.w, this.h);

    var offset = this.getAnimatedOffset(timestamp);
    var cx = this.w / 2;
    var cy = this.h / 2 + offset.dy;

    this.drawUnicorn(ctx, cx, cy, this.scale, this.emotion);

    this.updateSparkles();
    this.drawSparkles(ctx);

    requestAnimationFrame((t) => this.render(t));
  },

  // ============================================================
  // DRAW: UNICORN (compact version for progress bar)
  // ============================================================
  drawUnicorn(ctx, x, y, scale, emotion) {
    var s = scale * 0.85;
    ctx.save();
    ctx.translate(x, y);

    // --- Body (white ellipse) ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, 0, 12 * s, 8 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F0C8D8';
    ctx.lineWidth = 0.8 * s;
    ctx.stroke();

    // --- Legs (4 tiny stubs) ---
    var legs = [
      { lx: -6, ly: 6 },
      { lx: -2, ly: 7 },
      { lx: 2,  ly: 7 },
      { lx: 6,  ly: 6 },
    ];
    legs.forEach(function(leg) {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F0C8D8';
      ctx.lineWidth = 0.5 * s;
      ctx.beginPath();
      ctx.rect(leg.lx * s - 1.5 * s, leg.ly * s, 3 * s, 5 * s);
      ctx.fill();
      ctx.stroke();
      // Hoof
      ctx.fillStyle = '#E8B4D8';
      ctx.beginPath();
      ctx.rect(leg.lx * s - 1.6 * s, leg.ly * s + 4 * s, 3.2 * s, 1.8 * s);
      ctx.fill();
    });

    // --- Neck ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(7 * s, -3 * s, 5 * s, 6 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // --- Head ---
    var headX = 10 * s;
    var headY = -7 * s;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX, headY, 6.5 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F0C8D8';
    ctx.lineWidth = 0.8 * s;
    ctx.stroke();

    // --- Ear ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(headX + 3 * s, headY - 5.5 * s, 1.8 * s, 3 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F0C8D8';
    ctx.lineWidth = 0.5 * s;
    ctx.stroke();
    ctx.fillStyle = '#FFD1DC';
    ctx.beginPath();
    ctx.ellipse(headX + 3 * s, headY - 5 * s, 1 * s, 1.8 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // --- Horn ---
    var hornGrad = ctx.createLinearGradient(headX, headY - 6 * s, headX, headY - 15 * s);
    hornGrad.addColorStop(0, '#FDE68A');
    hornGrad.addColorStop(1, '#FFC857');
    ctx.fillStyle = hornGrad;
    ctx.beginPath();
    ctx.moveTo(headX - 1.8 * s, headY - 5.5 * s);
    ctx.lineTo(headX + 1.8 * s, headY - 5.5 * s);
    ctx.lineTo(headX + 0.2 * s, headY - 14 * s);
    ctx.closePath();
    ctx.fill();

    // Horn stripes
    ctx.strokeStyle = '#F5A623';
    ctx.lineWidth = 0.5 * s;
    for (var i = 1; i <= 3; i++) {
      var t = i / 4;
      var hy = headY - 5.5 * s - t * 8.5 * s;
      var hw = 1.8 * s * (1 - t) + 0.2 * s;
      ctx.beginPath();
      ctx.moveTo(headX - hw, hy);
      ctx.lineTo(headX + hw, hy - 0.8 * s);
      ctx.stroke();
    }

    // --- Mane ---
    var maneColors = ['#FFB6C1', '#D8B4FE', '#88C8F7', '#A7F3D0', '#FDE68A'];
    maneColors.forEach(function(color, i) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4 * s;
      ctx.beginPath();
      var mx = headX - 4 * s + i * 0.3 * s;
      var my = headY - 1 * s + i * 2.5 * s;
      ctx.moveTo(mx, my);
      ctx.quadraticCurveTo(mx - 6 * s, my + 1.5 * s, mx - 3 * s, my + 4 * s);
      ctx.stroke();
    });

    // --- Tail ---
    var tailColors = ['#FFB6C1', '#D8B4FE', '#FDE68A', '#A7F3D0'];
    tailColors.forEach(function(color, i) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2 * s;
      ctx.beginPath();
      ctx.moveTo(-12 * s, -1 * s + i * 1.5 * s);
      ctx.quadraticCurveTo(
        -18 * s - i * 0.5 * s, -8 * s + i * 1 * s,
        -15 * s - i * 0.3 * s, -12 * s + i * 1.5 * s
      );
      ctx.stroke();
    });

    // --- Eyes ---
    if (emotion === 'happy') {
      ctx.strokeStyle = '#4A4A4A';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath();
      ctx.arc(headX - 2.5 * s, headY - 0.5 * s, 1.4 * s, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(headX + 2.5 * s, headY - 0.5 * s, 1.4 * s, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#4A4A4A';
      ctx.beginPath();
      ctx.arc(headX - 2.5 * s, headY - 0.5 * s, 1.2 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + 2.5 * s, headY - 0.5 * s, 1.2 * s, 0, Math.PI * 2);
      ctx.fill();
      // Shine
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(headX - 2 * s, headY - 1 * s, 0.5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + 3 * s, headY - 1 * s, 0.5 * s, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Mouth ---
    if (emotion === 'happy') {
      ctx.strokeStyle = '#FF85A2';
      ctx.lineWidth = 0.8 * s;
      ctx.beginPath();
      ctx.arc(headX, headY + 2.5 * s, 2 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#DDAABB';
      ctx.lineWidth = 0.6 * s;
      ctx.beginPath();
      ctx.moveTo(headX - 1 * s, headY + 2.5 * s);
      ctx.lineTo(headX + 1 * s, headY + 2.5 * s);
      ctx.stroke();
    }

    // --- Cheek blush ---
    ctx.fillStyle = 'rgba(255, 182, 193, 0.3)';
    ctx.beginPath();
    ctx.ellipse(headX - 4 * s, headY + 1.5 * s, 1.5 * s, 0.9 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(headX + 5 * s, headY + 1.5 * s, 1.5 * s, 0.9 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // ============================================================
  // DRAW: SPARKLES
  // ============================================================
  drawSparkles(ctx) {
    this.sparkles.forEach(function(sp) {
      UnicornGame.drawSingleSparkle(ctx, sp.x, sp.y, sp.size, sp.alpha);
    });
  },

  drawSingleSparkle(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#FDE68A';
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.3, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.3, y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x, y + size * 0.3);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y - size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
};
