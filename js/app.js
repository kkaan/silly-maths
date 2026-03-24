/* ============================================================
   App — Orchestration & Wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize quiz
  initQuiz();

  // Initialize unicorn canvas
  const canvas = document.getElementById('unicorn-canvas');
  UnicornGame.init(canvas);

  // Wire quiz callbacks to unicorn
  quizCallbacks.onCorrect.push(() => UnicornGame.onCorrectAnswer());
  quizCallbacks.onWrong.push(() => UnicornGame.onWrongAnswer());

  // Initialize parallax
  initParallax();
});
