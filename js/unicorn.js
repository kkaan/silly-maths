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

    this.drawUnicorn(ctx, cx, cy, this.scale, this.emotion, timestamp);

    this.updateSparkles();
    this.drawSparkles(ctx);

    requestAnimationFrame((t) => this.render(t));
  },

  // ============================================================
  // DRAW: UNICORN (sprite-based)
  // ============================================================
  drawUnicorn(ctx, x, y, scale, emotion, timestamp) {
    if (!FluffySprites.ready) return;

    var img, frame;

    if (emotion === 'happy') {
      if (this.animationState === 'celebrating') {
        var idx = Math.floor(timestamp / 250) % 2;
        frame = idx === 0 ? FluffySprites.happy.jumping : FluffySprites.happy.celebrating;
      } else if (this.animationState === 'hopping') {
        frame = FluffySprites.happy.jumping;
      } else {
        frame = FluffySprites.happy.standing;
      }
      img = FluffySprites.happyImg;
    } else {
      if (this.animationState === 'idle') {
        var idleFrames = FluffySprites.grumpy.idle;
        var idx = Math.floor(timestamp / 250) % idleFrames.length;
        frame = idleFrames[idx];
      } else {
        frame = FluffySprites.grumpy.standing;
      }
      img = FluffySprites.grumpyImg;
    }

    // Fit sprite into canvas, centered at (x, y)
    var fitH = 50;
    var fitW = fitH * (frame.w / frame.h);
    FluffySprites.drawFrame(ctx, img, frame, x - fitW / 2, y - fitH / 2, fitW, fitH);
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
