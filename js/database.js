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
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ancient_scripts_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
  },

  async seedDefaults() {
    try {
      // 🔒 Must send the admin secret header to authorize the database reset
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'x-admin-secret': 'seed-secret-2026' }
      });
      if (res.ok) {
        await this.init(); // Refresh cache
        return true;
      }
    } catch (e) {
      console.error('Failed to seed defaults:', e);
    }
    return false;
  },

  // ──────────────────────────────────────────────
  // ADMIN LOGS
  // ──────────────────────────────────────────────
  async getLogs() {
    try {
      const res = await fetch('/api/logs');
      if (res.ok) return await res.json();
    } catch (e) {
      console.error('Failed to fetch logs:', e);
    }
    return [];
  },

  // ──────────────────────────────────────────────
  // 🛡️ BACKUP & RECOVERY
  // ──────────────────────────────────────────────

  // List all backup snapshots (newest first)
  async getBackups() {
    try {
      const res = await fetch('/api/backups');
      if (res.ok) return await res.json();
    } catch (e) {
      console.error('Failed to fetch backups:', e);
    }
    return [];
  },

  // Restore the database to a saved snapshot
  async restoreBackup(backupId) {
    try {
      const res = await fetch(`/api/restore/${backupId}`, { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        await this.init(); // Refresh cache
        return result;
      }
    } catch (e) {
      console.error('Failed to restore backup:', e);
    }
    return null;
  },

  // Get soft-deleted letters (trash)
  async getDeletedLetters() {
    try {
      const res = await fetch('/api/letters/deleted');
      if (res.ok) return await res.json();
    } catch (e) {
      console.error('Failed to fetch deleted letters:', e);
    }
    return [];
  },

  // Recover a soft-deleted letter from trash
  async recoverLetter(id) {
    try {
      const res = await fetch(`/api/letters/${id}/recover`, { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          this.lettersCache.push(result.letter); // Add back to cache
        }
        return result;
      }
    } catch (e) {
      console.error('Failed to recover letter:', e);
    }
    return null;
  }
};
