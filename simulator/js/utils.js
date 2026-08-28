// Utility functions
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
