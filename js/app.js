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

    // Initialize quiz (loads stats from Firebase)
    initQuiz().then(() => {
      // Initialize unicorn canvas
      const canvas = document.getElementById('unicorn-canvas');
      UnicornGame.init(canvas);

      // Wire quiz callbacks to unicorn
      quizCallbacks.onCorrect.push(() => UnicornGame.onCorrectAnswer());
      quizCallbacks.onWrong.push(() => UnicornGame.onWrongAnswer());

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
