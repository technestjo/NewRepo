// ============================================================
// js/database.js - Ancient Scripts Letter Database (MongoDB API)
// ============================================================

const LetterDB = {
  SESSION_KEY: 'ancient_admin_session',
  lettersCache: [],

  // ──────────────────────────────────────────────
  // INITIALISE (Fetch from Server)
  // ──────────────────────────────────────────────
  async init() {
    try {
      const res = await fetch('/api/letters');
      if (res.ok) {
        this.lettersCache = await res.json();
      } else {
        console.error('Failed to fetch letters from API');
      }
    } catch (e) {
      console.error('API Error:', e);
    }
  },

  // ──────────────────────────────────────────────
  // CRUD
  // ──────────────────────────────────────────────
  getAll() {
    return this.lettersCache;
  },

  getById(id) {
    return this.lettersCache.find(l => l.id === parseInt(id));
  },

  async add(letter) {
    try {
      const res = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(letter)
      });
      if (res.ok) {
        const newLetter = await res.json();
        this.lettersCache.push(newLetter);
        return newLetter;
      }
    } catch (e) {
      console.error('Failed to add letter:', e);
    }
    return null;
  },

  async update(id, updates) {
    try {
      const res = await fetch(`/api/letters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updatedLetter = await res.json();
        const idx = this.lettersCache.findIndex(l => l.id === parseInt(id));
        if (idx !== -1) this.lettersCache[idx] = updatedLetter;
        return updatedLetter;
      }
    } catch (e) {
      console.error('Failed to update letter:', e);
    }
    return null;
  },

  async delete(id) {
    try {
      const res = await fetch(`/api/letters/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        this.lettersCache = this.lettersCache.filter(l => l.id !== parseInt(id));
      }
    } catch (e) {
      console.error('Failed to delete letter:', e);
    }
  },

  exportJSON() {
    const blob = new Blob([JSON.stringify(this.getAll(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'ancient_scripts.json'; a.click();
    URL.revokeObjectURL(url);
  },

  async importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data)) {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          await this.init(); // Refresh cache
          return true;
        }
      }
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
    return false;
  },

  // ──────────────────────────────────────────────
  // ADMIN AUTH
  // ──────────────────────────────────────────────
  isLoggedIn() {
    return sessionStorage.getItem(this.SESSION_KEY) === 'authenticated';
  },

  async login(username, password) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem(this.SESSION_KEY, 'authenticated');
        return true;
      }
    } catch (e) {
      console.error('Login error:', e);
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
};
