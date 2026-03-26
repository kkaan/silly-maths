/* ============================================================
   Fluffy Sprites — Sprite sheet loader and frame helpers
   ============================================================ */

const FluffySprites = {
  HAPPY_SRC: 'assets/fluffy-sprite-happy-sm.png',
  GRUMPY_SRC: 'assets/fluffy-sprite-sm.png',

  // Sheet dimensions
  HAPPY_W: 2331, HAPPY_H: 636,
  GRUMPY_W: 1012, GRUMPY_H: 620,

  happyImg: null,
  grumpyImg: null,
  ready: false,

  // --- Happy frames: 5 equal columns, single row ---
  happy: {
    standing:    { x: 0,    y: 0, w: 466, h: 636 },
    trotting:    { x: 466,  y: 0, w: 466, h: 636 },
    jumping:     { x: 932,  y: 0, w: 466, h: 636 },
    waving:      { x: 1398, y: 0, w: 466, h: 636 },
    celebrating: { x: 1864, y: 0, w: 467, h: 636 },
  },

  // --- Grumpy frames: 4 cols (253px) × 4 rows (155px) ---
  grumpy: {
    // Walking frames for idle animation cycling
    idle: [
      { x: 253, y: 155, w: 253, h: 155 },
      { x: 506, y: 155, w: 253, h: 155 },
      { x: 759, y: 155, w: 253, h: 155 },
    ],
    standing: { x: 0,   y: 155, w: 253, h: 155 },
    portrait: { x: 0,   y: 0,   w: 253, h: 155 },
    sitting:  { x: 0,   y: 310, w: 253, h: 155 },
  },

  // ============================================================
  // PRELOAD
  // ============================================================
  preload() {
    return new Promise((resolve) => {
      var loaded = 0;
      var total = 2;
      function check() { if (++loaded >= total) { FluffySprites.ready = true; resolve(); } }

      FluffySprites.happyImg = new Image();
      FluffySprites.happyImg.onload = check;
      FluffySprites.happyImg.onerror = check;
      FluffySprites.happyImg.src = FluffySprites.HAPPY_SRC;

      FluffySprites.grumpyImg = new Image();
      FluffySprites.grumpyImg.onload = check;
      FluffySprites.grumpyImg.onerror = check;
      FluffySprites.grumpyImg.src = FluffySprites.GRUMPY_SRC;
    });
  },

  // ============================================================
  // CANVAS DRAW HELPER
  // ============================================================
  drawFrame(ctx, img, frame, dx, dy, dw, dh) {
    if (!img || !img.complete) return;
    ctx.drawImage(img, frame.x, frame.y, frame.w, frame.h, dx, dy, dw, dh);
  },

  // ============================================================
  // DOM SPRITE ELEMENT (for story panels, overlays)
  // ============================================================
  createSpriteElement(sheetSrc, sheetW, sheetH, frame, displayW, displayH) {
    var div = document.createElement('div');
    var scaleX = displayW / frame.w;
    var scaleY = displayH / frame.h;
    div.style.width = displayW + 'px';
    div.style.height = displayH + 'px';
    div.style.backgroundImage = 'url(' + sheetSrc + ')';
    div.style.backgroundPosition = (-frame.x * scaleX) + 'px ' + (-frame.y * scaleY) + 'px';
    div.style.backgroundSize = (sheetW * scaleX) + 'px ' + (sheetH * scaleY) + 'px';
    div.style.backgroundRepeat = 'no-repeat';
    return div;
  },

  // Convenience: create a happy sprite element
  createHappySprite(frameName, displayW, displayH) {
    var frame = this.happy[frameName] || this.happy.standing;
    return this.createSpriteElement(this.HAPPY_SRC, this.HAPPY_W, this.HAPPY_H, frame, displayW, displayH);
  },

  // Convenience: create a grumpy sprite element
  createGrumpySprite(frameName, displayW, displayH) {
    var frame = this.grumpy[frameName] || this.grumpy.standing;
    return this.createSpriteElement(this.GRUMPY_SRC, this.GRUMPY_W, this.GRUMPY_H, frame, displayW, displayH);
  },
};
