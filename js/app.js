/* ============================================================
   App — Orchestration & Wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  FirebaseSync.init();

  const overlay = document.getElementById('username-overlay');
  const usernameInput = document.getElementById('username-input');
  const usernameGo = document.getElementById('username-go');

  // Check if we have a saved username
  const saved = FirebaseSync.getSavedUsername();
  if (saved) {
    usernameInput.value = saved;
  }

  function startGame() {
    const name = usernameInput.value.trim();
    if (!name) {
      usernameInput.focus();
      usernameInput.placeholder = 'Type your name!';
      return;
    }

    FirebaseSync.setUsername(name);
    overlay.classList.add('hidden');

    // Initialize quiz (loads stats from Firebase), then preload sprites
    initQuiz().then(() => {
      return FluffySprites.preload();
    }).then(() => {
      // Initialize unicorn canvas
      const canvas = document.getElementById('unicorn-canvas');
      UnicornGame.init(canvas);

      // Sync unicorn with current level (for collected items display)
      UnicornGame.setLevel(quizState.stats.level);

      // Wire quiz callbacks
      quizCallbacks.onCorrect.push(() => UnicornGame.onCorrectAnswer());
      quizCallbacks.onSkittle.push((count) => showSkittleFanfare(count));
      quizCallbacks.onLevelUp.push((level) => {
        UnicornGame.onLevelUp();
        UnicornGame.setLevel(level);
      });

      // Initialize parallax
      initParallax();
    });
  }

  usernameGo.addEventListener('click', startGame);
  usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startGame();
  });

  usernameInput.focus();
});
