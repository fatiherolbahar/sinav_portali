/* localStorage yönetim modülü: deneme geçmişi, aktif oturum, tercihler */
(function (w) {
  'use strict';
  var HIST = 'sp_history_v1';
  var SESS = 'sp_session_v1_';
  var PREF = 'sp_pref_v1';

  function read(key, def) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch (e) { return def; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }

  var PortalStorage = {
    /* { courseId: [attempt, ...] } */
    getAllHistory: function () { return read(HIST, {}); },
    getHistory: function (courseId) { return this.getAllHistory()[courseId] || []; },
    nextAttemptNo: function (courseId) {
      var h = this.getHistory(courseId);
      return h.reduce(function (m, a) { return Math.max(m, a.n); }, 0) + 1;
    },
    addAttempt: function (courseId, attempt) {
      var all = this.getAllHistory();
      (all[courseId] = all[courseId] || []).push(attempt);
      return write(HIST, all);
    },
    stats: function (courseId) {
      var h = this.getHistory(courseId);
      return {
        count: h.length,
        best: h.length ? Math.max.apply(null, h.map(function (a) { return a.percent; })) : null
      };
    },

    /* Aktif oturum (F5 koruması) */
    getSession: function (courseId) { return read(SESS + courseId, null); },
    saveSession: function (courseId, s) { return write(SESS + courseId, s); },
    clearSession: function (courseId) { try { localStorage.removeItem(SESS + courseId); } catch (e) {} },

    /* Tercihler */
    getPref: function (k, def) { var p = read(PREF, {}); return k in p ? p[k] : def; },
    setPref: function (k, v) { var p = read(PREF, {}); p[k] = v; write(PREF, p); },

    /* Tüm portal verisini sil */
    clearAll: function () {
      try {
        Object.keys(localStorage).filter(function (k) { return k.indexOf('sp_') === 0; })
          .forEach(function (k) { localStorage.removeItem(k); });
      } catch (e) {}
    }
  };
  w.PortalStorage = PortalStorage;
})(window);
