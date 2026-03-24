/* ============================================================
   Unicorn Canvas — Rainbow Climbing Animation
   ============================================================ */

const UnicornGame = {
  // --- Configuration ---
  TOTAL_STEPS: 10,
  ANIM_DURATION: 600,
  BOUNCE_DURATION: 400,
  WOBBLE_DURATION: 500,
  CELEBRATE_DURATION: 2400,

  // --- State ---
  currentStep: 0,
  targetStep: 0,
  animationState: 'idle',   // idle | hopping | sliding | bouncing | wobbling | celebrating
  emotion: 'neutral',       // neutral | happy | sad
  animStartTime: 0,
  animFromStep: 0,
  sparkles: [],
  canvasEl: null,
  ctx: null,
  running: false,

  // --- Geometry (recomputed on resize) ---
  w: 0,
  h: 0,
  stepPositions: [],
  // Rainbow drawn as a quadratic bezier curve
  curveP0: { x: 0, y: 0 },  // start (bottom-left)
  curveP1: { x: 0, y: 0 },  // control point (top-center)
  curveP2: { x: 0, y: 0 },  // end (top-right)
  scale: 1,

  // ============================================================
  // INIT
  // ============================================================
  init(canvas) {
    if (!canvas) return;
    this.canvasEl = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.running = true;
    requestAnimationFrame((t) => this.render(t));

    // ResizeObserver for responsive canvas
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
    this.scale = Math.min(this.w, this.h) / 400;

    // Define the rainbow curve: bottom-left → top → upper-right
    const pad = 30 * this.scale;
    this.curveP0 = { x: pad + 10, y: this.h - pad };                          // bottom-left
    this.curveP1 = { x: this.w * 0.2, y: -this.h * 0.15 };                   // control (above canvas for nice curve)
    this.curveP2 = { x: this.w - pad - 10, y: pad + 20 * this.scale };       // upper-right

    this.computeStepPositions();
  },

  // Sample points along the quadratic bezier curve
  computeStepPositions() {
    this.stepPositions = [];
    for (let i = 0; i <= this.TOTAL_STEPS; i++) {
      const t = i / this.TOTAL_STEPS;
      this.stepPositions.push(this.getPointOnCurve(t));
    }
  },

  // Quadratic bezier: B(t) = (1-t)^2*P0 + 2*(1-t)*t*P1 + t^2*P2
  getPointOnCurve(t) {
    const mt = 1 - t;
    return {
      x: mt * mt * this.curveP0.x + 2 * mt * t * this.curveP1.x + t * t * this.curveP2.x,
      y: mt * mt * this.curveP0.y + 2 * mt * t * this.curveP1.y + t * t * this.curveP2.y,
    };
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
    this.addSparkles(6);
  },

  onWrongAnswer() {
    if (this.animationState !== 'idle') return;
    this.animFromStep = this.currentStep;
    this.targetStep = Math.max(this.currentStep - 1, 0);
    this.animationState = 'sliding';
    this.emotion = 'sad';
    this.animStartTime = performance.now();
  },

  // ============================================================
  // SPARKLES
  // ============================================================
  addSparkles(count) {
    const pos = this.stepPositions[this.targetStep] || this.stepPositions[this.currentStep];
    if (!pos) return;
    for (let i = 0; i < (count || 4); i++) {
      this.sparkles.push({
        x: pos.x + (Math.random() - 0.5) * 40 * this.scale,
        y: pos.y + (Math.random() - 0.5) * 40 * this.scale,
        size: (4 + Math.random() * 8) * this.scale,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
      });
    }
  },

  updateSparkles() {
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      this.sparkles[i].alpha -= this.sparkles[i].decay;
      this.sparkles[i].y -= 0.5;
      if (this.sparkles[i].alpha <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  },

  // ============================================================
  // EASING
  // ============================================================
  easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },

  // ============================================================
  // ANIMATED POSITION
  // ============================================================
  getAnimatedPosition(timestamp) {
    const elapsed = timestamp - this.animStartTime;

    if (this.animationState === 'idle') {
      const pos = this.stepPositions[this.currentStep];
      if (!pos) return { x: this.w / 2, y: this.h / 2, rot: 0 };
      const float = Math.sin(timestamp * 0.002) * 2.5;
      return { x: pos.x, y: pos.y + float, rot: 0 };
    }

    if (this.animationState === 'hopping') {
      const t = Math.min(elapsed / this.ANIM_DURATION, 1);
      const eased = this.easeOutBack(t);
      const fromPos = this.stepPositions[this.animFromStep];
      const toPos = this.stepPositions[this.targetStep];
      if (!fromPos || !toPos) return { x: this.w / 2, y: this.h / 2, rot: 0 };
      const x = fromPos.x + (toPos.x - fromPos.x) * eased;
      const y = fromPos.y + (toPos.y - fromPos.y) * eased;
      const hopHeight = -25 * this.scale * Math.sin(t * Math.PI);

      if (t >= 1) {
        this.currentStep = this.targetStep;
        if (this.currentStep >= this.TOTAL_STEPS) {
          this.animationState = 'celebrating';
          this.animStartTime = timestamp;
          this.addSparkles(12);
        } else {
          this.animationState = 'bouncing';
          this.animStartTime = timestamp;
        }
      }
      return { x, y: y + hopHeight, rot: 0 };
    }

    if (this.animationState === 'sliding') {
      const t = Math.min(elapsed / this.ANIM_DURATION, 1);
      const eased = this.easeInOutCubic(t);
      const fromPos = this.stepPositions[this.animFromStep];
      const toPos = this.stepPositions[this.targetStep];
      if (!fromPos || !toPos) return { x: this.w / 2, y: this.h / 2, rot: 0 };
      const x = fromPos.x + (toPos.x - fromPos.x) * eased;
      const y = fromPos.y + (toPos.y - fromPos.y) * eased;

      if (t >= 1) {
        this.currentStep = this.targetStep;
        this.animationState = 'wobbling';
        this.animStartTime = timestamp;
      }
      return { x, y, rot: 0 };
    }

    if (this.animationState === 'bouncing') {
      const t = Math.min(elapsed / this.BOUNCE_DURATION, 1);
      const bounce = Math.sin(t * Math.PI * 3) * (1 - t) * 8 * this.scale;
      const pos = this.stepPositions[this.currentStep];
      if (!pos) return { x: this.w / 2, y: this.h / 2, rot: 0 };
      if (t >= 1) {
        this.animationState = 'idle';
        setTimeout(() => { this.emotion = 'neutral'; }, 600);
      }
      return { x: pos.x, y: pos.y + bounce, rot: 0 };
    }

    if (this.animationState === 'wobbling') {
      const t = Math.min(elapsed / this.WOBBLE_DURATION, 1);
      const wobble = Math.sin(t * Math.PI * 4) * (1 - t) * 5 * this.scale;
      const pos = this.stepPositions[this.currentStep];
      if (!pos) return { x: this.w / 2, y: this.h / 2, rot: 0 };
      if (t >= 1) {
        this.animationState = 'idle';
        setTimeout(() => { this.emotion = 'neutral'; }, 800);
      }
      return { x: pos.x + wobble, y: pos.y, rot: wobble * 0.02 };
    }

    if (this.animationState === 'celebrating') {
      const t = Math.min(elapsed / this.CELEBRATE_DURATION, 1);
      const pos = this.stepPositions[this.TOTAL_STEPS];
      if (!pos) return { x: this.w / 2, y: this.h / 2, rot: 0 };
      const bounce = Math.sin(t * Math.PI * 8) * (1 - t) * 14 * this.scale;
      if (elapsed % 120 < 17) this.addSparkles(3);

      if (t >= 1) {
        this.currentStep = 0;
        this.targetStep = 0;
        this.animationState = 'idle';
        this.emotion = 'neutral';
      }
      return { x: pos.x, y: pos.y + bounce, rot: 0 };
    }

    const pos = this.stepPositions[this.currentStep] || { x: this.w / 2, y: this.h / 2 };
    return { x: pos.x, y: pos.y, rot: 0 };
  },

  // ============================================================
  // RENDER LOOP
  // ============================================================
  render(timestamp) {
    if (!this.running) return;
    const ctx = this.ctx;
    if (!ctx || this.w === 0) {
      requestAnimationFrame((t) => this.render(t));
      return;
    }
    ctx.clearRect(0, 0, this.w, this.h);

    this.drawRainbow(ctx);
    this.drawStepMarkers(ctx);
    this.drawIceCream(ctx);

    const pos = this.getAnimatedPosition(timestamp);
    this.drawUnicorn(ctx, pos.x, pos.y, this.scale, this.emotion, pos.rot);

    this.updateSparkles();
    this.drawSparkles(ctx);

    requestAnimationFrame((t) => this.render(t));
  },

  // ============================================================
  // DRAW: RAINBOW
  // ============================================================
  drawRainbow(ctx) {
    const colors = [
      '#FF8A9E', // rose
      '#FFB07A', // peach
      '#FFDE7A', // yellow
      '#A8E6CF', // mint
      '#88C8F7', // sky blue
      '#C4A8F7', // lavender
      '#F7A8D8', // pink
    ];

    const bandSpacing = 5 * this.scale;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    colors.forEach((color, i) => {
      const offset = (i - 3) * bandSpacing; // spread bands around the center curve
      ctx.beginPath();
      // Offset the control points perpendicular to the curve
      // For a simple approximation, offset Y of each point
      ctx.moveTo(this.curveP0.x, this.curveP0.y + offset);
      ctx.quadraticCurveTo(
        this.curveP1.x, this.curveP1.y + offset,
        this.curveP2.x, this.curveP2.y + offset
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = 4 * this.scale + 2;
      ctx.stroke();
    });
  },

  // ============================================================
  // DRAW: STEP MARKERS
  // ============================================================
  drawStepMarkers(ctx) {
    const markerColors = ['#FFD1DC', '#E8D1FF', '#D1F0FF'];
    this.stepPositions.forEach((pos, i) => {
      if (i === this.TOTAL_STEPS) return; // Ice cream goes here

      const isCurrent = i === this.currentStep && this.animationState === 'idle';
      const radius = isCurrent ? 5 * this.scale : 3 * this.scale;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isCurrent ? '#FFB6C1' : markerColors[i % markerColors.length];
      ctx.fill();

      if (isCurrent) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 3 * this.scale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 182, 193, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  },

  // ============================================================
  // DRAW: ICE CREAM
  // ============================================================
  drawIceCream(ctx) {
    const topPos = this.stepPositions[this.TOTAL_STEPS];
    if (!topPos) return;
    const x = topPos.x;
    const y = topPos.y;
    const s = this.scale * 1.3;

    ctx.save();

    // Cone
    ctx.fillStyle = '#F4C87A';
    ctx.beginPath();
    ctx.moveTo(x - 8 * s, y + 2 * s);
    ctx.lineTo(x + 8 * s, y + 2 * s);
    ctx.lineTo(x, y + 22 * s);
    ctx.closePath();
    ctx.fill();

    // Waffle lines
    ctx.strokeStyle = '#D4A860';
    ctx.lineWidth = 0.7 * s;
    for (let i = 1; i < 4; i++) {
      const t = i / 4;
      const lx = 8 * s * (1 - t);
      const ly = y + 2 * s + 20 * s * t;
      ctx.beginPath();
      ctx.moveTo(x - lx, ly);
      ctx.lineTo(x + lx, ly);
      ctx.stroke();
    }

    // Scoops
    const scoopColors = ['#FFB6C1', '#D8B4FE', '#A7F3D0'];
    const scoopOffsets = [
      { dx: -6 * s, dy: -3 * s },
      { dx:  6 * s, dy: -3 * s },
      { dx:  0,     dy: -12 * s },
    ];
    scoopOffsets.forEach((off, i) => {
      ctx.beginPath();
      ctx.arc(x + off.dx, y + off.dy, 7.5 * s, 0, Math.PI * 2);
      ctx.fillStyle = scoopColors[i];
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Cherry
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(x, y - 18 * s, 3 * s, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.moveTo(x, y - 21 * s);
    ctx.quadraticCurveTo(x + 3 * s, y - 25 * s, x + 1.5 * s, y - 27 * s);
    ctx.stroke();

    // Shine on cherry
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(x - 1 * s, y - 19 * s, 1 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // ============================================================
  // DRAW: UNICORN
  // ============================================================
  drawUnicorn(ctx, x, y, scale, emotion, rotation) {
    const s = scale * 1.05;
    ctx.save();
    ctx.translate(x, y);
    if (rotation) ctx.rotate(rotation);

    // --- Shadow ---
    ctx.fillStyle = 'rgba(200, 150, 180, 0.15)';
    ctx.beginPath();
    ctx.ellipse(0, 18 * s, 16 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Body (white ellipse) ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18 * s, 12 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F0C8D8';
    ctx.lineWidth = 1.2 * s;
    ctx.stroke();

    // --- Legs (4 simple rectangles) ---
    const legKick = emotion === 'happy' ? 0.12 : 0;
    const legs = [
      { lx: -9, ly: 9, kick: -legKick },
      { lx: -3, ly: 10, kick: 0 },
      { lx: 3,  ly: 10, kick: 0 },
      { lx: 9,  ly: 9, kick: legKick },
    ];
    legs.forEach(leg => {
      ctx.save();
      ctx.translate(leg.lx * s, leg.ly * s);
      ctx.rotate(leg.kick);
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F0C8D8';
      ctx.lineWidth = 0.8 * s;
      ctx.beginPath();
      ctx.rect(-2 * s, 0, 4 * s, 8 * s);
      ctx.fill();
      ctx.stroke();
      // Hoof
      ctx.fillStyle = '#E8B4D8';
      ctx.beginPath();
      ctx.rect(-2.2 * s, 7 * s, 4.4 * s, 2.5 * s);
      ctx.fill();
      ctx.restore();
    });

    // --- Neck ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(10 * s, -5 * s, 7 * s, 9 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // --- Head ---
    const headX = 14 * s;
    const headY = -11 * s;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX, headY, 9.5 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F0C8D8';
    ctx.lineWidth = 1.2 * s;
    ctx.stroke();

    // --- Ear ---
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(headX + 4 * s, headY - 8.5 * s, 2.5 * s, 4.5 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F0C8D8';
    ctx.lineWidth = 0.8 * s;
    ctx.stroke();
    // Inner ear
    ctx.fillStyle = '#FFD1DC';
    ctx.beginPath();
    ctx.ellipse(headX + 4 * s, headY - 8 * s, 1.5 * s, 2.8 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // --- Horn ---
    const hornGrad = ctx.createLinearGradient(headX, headY - 10 * s, headX, headY - 24 * s);
    hornGrad.addColorStop(0, '#FDE68A');
    hornGrad.addColorStop(1, '#FFC857');
    ctx.fillStyle = hornGrad;
    ctx.beginPath();
    ctx.moveTo(headX - 2.5 * s, headY - 8.5 * s);
    ctx.lineTo(headX + 2.5 * s, headY - 8.5 * s);
    ctx.lineTo(headX + 0.3 * s, headY - 22 * s);
    ctx.closePath();
    ctx.fill();

    // Horn stripes
    ctx.strokeStyle = '#F5A623';
    ctx.lineWidth = 0.7 * s;
    for (let i = 1; i <= 3; i++) {
      const t = i / 4;
      const hy = headY - 8.5 * s - t * 13.5 * s;
      const hw = 2.5 * s * (1 - t) + 0.3 * s;
      ctx.beginPath();
      ctx.moveTo(headX - hw, hy);
      ctx.lineTo(headX + hw, hy - 1.2 * s);
      ctx.stroke();
    }

    // --- Mane ---
    const maneColors = ['#FFB6C1', '#D8B4FE', '#88C8F7', '#A7F3D0', '#FDE68A'];
    maneColors.forEach((color, i) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      const mx = headX - 6 * s + i * 0.4 * s;
      const my = headY - 2 * s + i * 4 * s;
      ctx.moveTo(mx, my);
      ctx.quadraticCurveTo(mx - 9 * s, my + 2.5 * s, mx - 5 * s, my + 6 * s);
      ctx.stroke();
    });

    // --- Tail ---
    const tailColors = ['#FFB6C1', '#D8B4FE', '#FDE68A', '#A7F3D0'];
    tailColors.forEach((color, i) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8 * s;
      ctx.beginPath();
      ctx.moveTo(-18 * s, -2 * s + i * 2 * s);
      ctx.quadraticCurveTo(
        -28 * s - i * 0.8 * s, -13 * s + i * 1.5 * s,
        -23 * s - i * 0.4 * s, -18 * s + i * 2.5 * s
      );
      ctx.stroke();
    });

    // --- Eyes ---
    if (emotion === 'happy') {
      ctx.strokeStyle = '#4A4A4A';
      ctx.lineWidth = 1.3 * s;
      // Happy ^_^ arc eyes
      ctx.beginPath();
      ctx.arc(headX - 3.5 * s, headY - 0.5 * s, 2 * s, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(headX + 3.5 * s, headY - 0.5 * s, 2 * s, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    } else if (emotion === 'sad') {
      ctx.fillStyle = '#4A4A4A';
      ctx.beginPath();
      ctx.arc(headX - 3.5 * s, headY - 0.5 * s, 1.3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + 3.5 * s, headY - 0.5 * s, 1.3 * s, 0, Math.PI * 2);
      ctx.fill();
      // Tear
      ctx.fillStyle = '#88C8F7';
      ctx.beginPath();
      ctx.ellipse(headX - 3.5 * s, headY + 3.5 * s, 1.2 * s, 1.8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Neutral — dots with shine
      ctx.fillStyle = '#4A4A4A';
      ctx.beginPath();
      ctx.arc(headX - 3.5 * s, headY - 0.5 * s, 1.7 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + 3.5 * s, headY - 0.5 * s, 1.7 * s, 0, Math.PI * 2);
      ctx.fill();
      // Shine
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(headX - 2.8 * s, headY - 1.5 * s, 0.7 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + 4.2 * s, headY - 1.5 * s, 0.7 * s, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Mouth ---
    if (emotion === 'happy') {
      ctx.strokeStyle = '#FF85A2';
      ctx.lineWidth = 1.1 * s;
      ctx.beginPath();
      ctx.arc(headX, headY + 3.5 * s, 3 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    } else if (emotion === 'sad') {
      ctx.strokeStyle = '#FF85A2';
      ctx.lineWidth = 1.1 * s;
      ctx.beginPath();
      ctx.arc(headX, headY + 7 * s, 2.5 * s, 1.15 * Math.PI, 1.85 * Math.PI);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#DDAABB';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath();
      ctx.moveTo(headX - 1.5 * s, headY + 3.5 * s);
      ctx.lineTo(headX + 1.5 * s, headY + 3.5 * s);
      ctx.stroke();
    }

    // --- Cheek blush ---
    ctx.fillStyle = 'rgba(255, 182, 193, 0.3)';
    ctx.beginPath();
    ctx.ellipse(headX - 6 * s, headY + 2 * s, 2.2 * s, 1.3 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(headX + 7 * s, headY + 2 * s, 2.2 * s, 1.3 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // ============================================================
  // DRAW: SPARKLES
  // ============================================================
  drawSparkles(ctx) {
    this.sparkles.forEach(sp => {
      this.drawSingleSparkle(ctx, sp.x, sp.y, sp.size, sp.alpha);
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
