/* ============================================================
   Firebase Sync — Cross-device score persistence
   ============================================================ */

const FirebaseSync = {
  db: null,
  username: null,

  init() {
    firebase.initializeApp({
      apiKey: "AIzaSyAzjGLeQI6SU_bFWrtW_UANHjoXOHp8yvQ",
      authDomain: "unicorn-maths.firebaseapp.com",
      databaseURL: "https://unicorn-maths-default-rtdb.firebaseio.com",
      projectId: "unicorn-maths",
      storageBucket: "unicorn-maths.firebasestorage.app",
      messagingSenderId: "438085862284",
      appId: "1:438085862284:web:67870921e7abc8f6b94ca9",
    });
    this.db = firebase.database();
  },

  // Sanitize username for use as a Firebase key
  toKey(name) {
    return name.toLowerCase().replace(/[.#$\[\]/]/g, '_').trim();
  },

  setUsername(name) {
    this.username = this.toKey(name);
    try {
      localStorage.setItem('silly-unicorn-username', name);
    } catch (_) {}
  },

  getSavedUsername() {
    try {
      return localStorage.getItem('silly-unicorn-username') || null;
    } catch (_) {
      return null;
    }
  },

  async loadStats() {
    if (!this.db || !this.username) return null;
    try {
      const snapshot = await this.db.ref('users/' + this.username + '/stats').once('value');
      return snapshot.val();
    } catch (_) {
      return null;
    }
  },

  saveStats(stats) {
    if (!this.db || !this.username) return;
    try {
      this.db.ref('users/' + this.username + '/stats').set(stats);
    } catch (_) {}
  },
};
