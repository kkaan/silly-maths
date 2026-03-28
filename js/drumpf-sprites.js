/* ============================================================
   Drumpf Sprites — Sprite sheet loader and frame helpers
   ============================================================ */

const DrumpfSprites = {
  SRC: 'assets/drumf-sprite.png',
  SHEET_W: 1024,
  SHEET_H: 1536,

  img: null,
  ready: false,

  // --- Frame definitions (4-col × 7-row grid, ~256×219 per cell) ---
  // Pixel coords may need fine-tuning against the actual sheet.
  frames: {
    portrait:  { x: 0,   y: 0,   w: 256, h: 219 },
    standing:  { x: 256, y: 0,   w: 256, h: 219 },
    pointing:  { x: 256, y: 219, w: 256, h: 219 },
    casting:   { x: 512, y: 219, w: 256, h: 219 },
    laughing:  { x: 768, y: 438, w: 256, h: 219 },
    defeated:  { x: 768, y: 876, w: 256, h: 219 },
    tornado:   { x: 0,   y: 1095, w: 256, h: 219 },
    skull:     { x: 512, y: 1314, w: 256, h: 219 },
    crystal:   { x: 768, y: 1314, w: 256, h: 219 },
  },

  // ============================================================
  // PRELOAD
  // ============================================================
  preload() {
    return new Promise((resolve) => {
      DrumpfSprites.img = new Image();
      DrumpfSprites.img.onload = function () { DrumpfSprites.ready = true; resolve(); };
      DrumpfSprites.img.onerror = function () { resolve(); }; // graceful degrade
      DrumpfSprites.img.src = DrumpfSprites.SRC;
    });
  },

  // ============================================================
  // DOM SPRITE ELEMENT (for story panels)
  // Reuses FluffySprites.createSpriteElement when available.
  // ============================================================
  createSprite(frameName, displayW, displayH) {
    var frame = this.frames[frameName] || this.frames.portrait;
    if (typeof FluffySprites !== 'undefined' && FluffySprites.createSpriteElement) {
      return FluffySprites.createSpriteElement(this.SRC, this.SHEET_W, this.SHEET_H, frame, displayW, displayH);
    }
    // Fallback: inline version of the same logic
    var div = document.createElement('div');
    var scaleX = displayW / frame.w;
    var scaleY = displayH / frame.h;
    div.style.width = displayW + 'px';
    div.style.height = displayH + 'px';
    div.style.backgroundImage = 'url(' + this.SRC + ')';
    div.style.backgroundPosition = (-frame.x * scaleX) + 'px ' + (-frame.y * scaleY) + 'px';
    div.style.backgroundSize = (this.SHEET_W * scaleX) + 'px ' + (this.SHEET_H * scaleY) + 'px';
    div.style.backgroundRepeat = 'no-repeat';
    return div;
  },
};
