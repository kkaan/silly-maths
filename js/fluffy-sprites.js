/* ============================================================
   Fluffy Sprites — Sprite sheet loader and frame helpers
   ============================================================ */

const FluffySprites = {
  HAPPY_SRC: 'assets/fluffy-sprite-happy-sm.png',
  GRUMPY_SRC: 'assets/fluffy-sprite-sm.png',

  // Sheet dimensions (compressed)
  HAPPY_W: 844, HAPPY_H: 460,
  GRUMPY_W: 844, GRUMPY_H: 460,

  happyImg: null,
  grumpyImg: null,
  ready: false,

  // --- Happy frames: 5 equal columns, content in top ~290px ---
  happy: {
    standing:    { x: 0,   y: 10, w: 169, h: 280 },
    trotting:    { x: 169, y: 10, w: 169, h: 280 },
    jumping:     { x: 338, y: 10, w: 169, h: 280 },
    waving:      { x: 507, y: 10, w: 169, h: 280 },
    celebrating: { x: 676, y: 10, w: 168, h: 280 },
  },

  // --- Grumpy frames: ~7 cols (121px) × 4 rows (115px) ---
  grumpy: {
    // Walking frames for idle animation cycling
    idle: [
      { x: 121, y: 115, w: 121, h: 115 },
      { x: 242, y: 115, w: 121, h: 115 },
      { x: 363, y: 115, w: 121, h: 115 },
    ],
    standing: { x: 0,   y: 115, w: 121, h: 115 },
    portrait: { x: 0,   y: 0,   w: 121, h: 115 },
    sitting:  { x: 0,   y: 230, w: 121, h: 115 },
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
