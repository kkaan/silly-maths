/* ============================================================
   Character Sprites — Recurring inhabitants of Mathlandia
   Sprite sheet: assets/characters.png (553×1536)
   Table layout: characters in left column, 6 rows + header.
   Frame coords target the character art area of each cell.
   ============================================================ */

const CharacterSprites = {
  SRC: 'assets/characters.png',
  SHEET_W: 553,
  SHEET_H: 1536,

  img: null,
  ready: false,

  // --- Frame definitions (left column of each row) ---
  // Pixel coords may need fine-tuning against the actual sheet.
  frames: {
    sage:        { x: 5, y: 50,   w: 210, h: 235 },
    archie:      { x: 5, y: 295,  w: 210, h: 235 },
    buzz:        { x: 5, y: 545,  w: 210, h: 235 },
    nimbus:      { x: 5, y: 795,  w: 210, h: 235 },
    melody:      { x: 5, y: 1040, w: 210, h: 235 },
    nightingale: { x: 5, y: 1290, w: 210, h: 235 },
  },

  // ============================================================
  // PRELOAD
  // ============================================================
  preload() {
    return new Promise((resolve) => {
      CharacterSprites.img = new Image();
      CharacterSprites.img.onload = function () { CharacterSprites.ready = true; resolve(); };
      CharacterSprites.img.onerror = function () { resolve(); };
      CharacterSprites.img.src = CharacterSprites.SRC;
    });
  },

  // ============================================================
  // DOM SPRITE ELEMENT (for story panels)
  // charName must match a key in frames.
  // ============================================================
  createSprite(charName, displayW, displayH) {
    var frame = this.frames[charName];
    if (!frame) return null;
    if (typeof FluffySprites !== 'undefined' && FluffySprites.createSpriteElement) {
      return FluffySprites.createSpriteElement(this.SRC, this.SHEET_W, this.SHEET_H, frame, displayW, displayH);
    }
    // Fallback
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
