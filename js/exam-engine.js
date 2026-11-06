/* Sınav motoru: render, filtreleme, puanlama, F5 oturum koruma */
(function () {
  'use strict';
  var Store = window.PortalStorage;
  var $ = function (s) { return document.querySelector(s); };
  var LET = ['A', 'B', 'C', 'D', 'E'];
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var fmt = function (iso) { return new Date(iso).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }); };
  var pctClass = function (p) { return p >= 70 ? 'pct-good' : p >= 50 ? 'pct-mid' : 'pct-low'; };

  var course, Q = [], S;
  var mode = 'exam';        // 'exam' | 'review'
  var reviewFilter = 'all'; // 'all' | 'wrong'

  /* ---------- Başlatma ---------- */
  function init() {
    var id = new URLSearchParams(location.search).get('course');
    course = (window.COURSES_MANIFEST || []).filter(function (c) { return c.id === id; })[0];
    if (!course) return fail('Ders bulunamadı. Lütfen ana sayfadan bir ders seçin.');
    document.title = course.name + ' – Sınav';
    $('#courseName').textContent = course.name;

    var sc = document.createElement('script');
    sc.src = course.file;
    sc.onload = function () {
      var raw = (window.COURSE_DATA || {})[course.id];
      if (!raw || !raw.length) return fail('Bu dersin soru verisi boş veya hatalı.');
      Q = raw.map(function (q, i) { return { n: i + 1, cat: q.cat || 'Genel', q: q.q, o: q.o, a: q.a, e: q.e || '' }; });
      boot();
    };
    sc.onerror = function () { fail('Ders veri dosyası yüklenemedi: ' + esc(course.file)); };
    document.head.appendChild(sc);
  }

  function fail(msg) {
    $('#loading').classList.add('hidden');
    var e = $('#error'); e.classList.remove('hidden');
    e.innerHTML = '<h2>⚠️ ' + msg + '</h2><p><a class="btn btn-primary" href="index.html">Ana Sayfaya Dön</a></p>';
    $('#finishBtn').classList.add('hidden'); $('#historyBtn').classList.add('hidden');
  }

  function newSession() {
    return { attemptNo: Store.nextAttemptNo(course.id), answers: {}, current: 0, category: 'Tümü',
      feedback: Store.getPref('feedback', true), finished: false, result: null, startedAt: new Date().toISOString() };
  }

  function boot() {
    S = Store.getSession(course.id);
    if (!S || typeof S.answers !== 'object') S = newSession();
    // doğrulama
    Object.keys(S.answers).forEach(function (k) { if (!Q[k] || LET.indexOf(S.answers[k]) < 0) delete S.answers[k]; });
    if (!(S.current >= 0 && S.current < Q.length)) S.current = 0;
    if (course.categories.indexOf(S.category) < 0) S.category = 'Tümü';
    $('#loading').classList.add('hidden');
    bind();
    if (S.finished && S.result) showResult(); else showExam();
  }

  function save() { Store.saveSession(course.id, S); }

  /* ---------- Yardımcılar ---------- */
  function isWrong(i) { return S.answers[i] !== undefined && S.answers[i] !== Q[i].a; }
  function counts() {
    var c = 0, w = 0;
    Q.forEach(function (q, i) { if (S.answers[i] !== undefined) { if (S.answers[i] === q.a) c++; else w++; } });
    var b = Q.length - c - w;
    return { total: Q.length, correct: c, wrong: w, blank: b, percent: Q.length ? Math.round(c / Q.length * 100) : 0 };
  }
  function visible() {
    var list = [];
    Q.forEach(function (q, i) {
      if (S.category !== 'Tümü' && q.cat !== S.category) return;
      if (mode === 'review' && reviewFilter === 'wrong' && !isWrong(i)) return;
      list.push(i);
    });
    return list;
  }
  function revealed(i) { return mode === 'review' || (S.feedback && S.answers[i] !== undefined); }

  /* ---------- Görünümler ---------- */
  function showExam() {
    $('#resultView').classList.add('hidden');
    $('#examView').classList.remove('hidden');
    $('#paletteFab').classList.remove('hidden');
    $('#finishBtn').classList.toggle('hidden', mode === 'review');
    $('#feedbackToggle').checked = !!S.feedback;
    $('#feedbackToggle').disabled = mode === 'review';
    var v = visible();
    if (v.length && v.indexOf(S.current) < 0) S.current = v[0];
    renderAll();
  }

  function renderAll() {
    $('#attemptBadge').textContent = mode === 'review' ? '🔍 İnceleme (' + S.attemptNo + '. Deneme)' : S.attemptNo + '. Deneme';
    renderBanner(); renderPills(); renderStatus(); renderCard(); renderPalette();
  }

  function renderBanner() {
    var b = $('#banner');
    if (mode !== 'review') { b.classList.add('hidden'); return; }
    b.classList.remove('hidden');
    b.innerHTML = '<span>İnceleme Modu: ' + (reviewFilter === 'wrong' ? 'Sadece Yanlışlar' : 'Tüm Sorular') + '</span>' +
      '<button class="btn" id="backResult">← Sonuca Dön</button>';
    $('#backResult').onclick = function () { mode = 'exam'; showResult(); };
  }

  function renderPills() {
    var box = $('#pills');
    if (course.categories.length < 2) { box.innerHTML = ''; return; }
    box.innerHTML = course.categories.map(function (cat) {
      var n = cat === 'Tümü' ? Q.length : Q.filter(function (q) { return q.cat === cat; }).length;
      return '<button class="pill' + (cat === S.category ? ' active' : '') + '" data-cat="' + esc(cat) + '">' + esc(cat) + ' (' + n + ')</button>';
    }).join('');
    box.querySelectorAll('.pill').forEach(function (p) {
      p.onclick = function () {
        S.category = p.dataset.cat;
        var v = visible(); if (v.length) S.current = v[0];
        save(); renderAll();
      };
    });
  }

  function renderStatus() {
    var c = counts();
    $('#status').innerHTML =
      '<div>Toplam Soru<b>' + c.total + '</b></div>' +
      '<div class="ok">Doğru<b>' + c.correct + '</b></div>' +
      '<div class="bad">Yanlış<b>' + c.wrong + '</b></div>' +
      '<div>Boş<b>' + c.blank + '</b></div>' +
      '<div class="pc">Başarı<b>%' + c.percent + '</b></div>';
  }

  function renderCard() {
    var card = $('#qCard'), v = visible();
    if (!v.length) {
      card.innerHTML = '<div class="center-msg">' + (mode === 'review' ? '🎉 Bu filtrede gösterilecek soru yok.' : 'Soru bulunamadı.') + '</div>';
      return;
    }
    var i = S.current, q = Q[i], pos = v.indexOf(i), ans = S.answers[i], rev = revealed(i);
    var opts = q.o.map(function (txt, k) {
      var L = LET[k], cls = 'opt';
      if (rev) { if (L === q.a) cls += ' correct'; else if (L === ans) cls += ' wrong'; }
      else if (L === ans) cls += ' selected';
      return '<button class="' + cls + '" data-l="' + L + '"' + (mode === 'review' || (S.feedback && ans !== undefined) ? ' disabled' : '') + '><span class="l">' + L + '</span><span>' + esc(txt) + '</span></button>';
    }).join('');
    var exp = '';
    if (rev) {
      var head = ans === undefined ? '⚪ Boş bırakıldı. ' : (ans === q.a ? '✅ Doğru! ' : '❌ Yanlış. ');
      exp = '<div class="explain' + (ans === undefined ? ' none' : '') + '"><b>' + head + 'Doğru cevap: ' + q.a + '</b>' + (q.e ? '<br>' + esc(q.e) : '') + '</div>';
    }
    card.innerHTML =
      '<div class="q-head"><span class="q-num">Soru ' + q.n + '</span><span class="badge tag">' + esc(q.cat) + '</span>' +
      '<span style="margin-left:auto;color:var(--muted);font-size:.8rem">' + (pos + 1) + ' / ' + v.length + '</span></div>' +
      '<div class="q-text">' + esc(q.q) + '</div><div class="opts">' + opts + '</div>' + exp +
      (mode === 'exam' && counts().blank === 0 ? '<div class="banner" style="margin:1.1rem 0 0;background:#dcfce7;border-color:#86efac;color:#166534"><span>🎉 Tüm soruları cevapladınız!</span><button class="btn btn-primary" id="doneBtn">✓ Sınavı Bitir</button></div>' : '') +
      '<div class="q-actions"><div class="grp"><button class="btn" id="prevBtn"' + (pos === 0 ? ' disabled' : '') + '>← Önceki</button>' +
      '<button class="btn" id="nextBtn"' + (pos === v.length - 1 ? ' disabled' : '') + '>Sonraki →</button></div>' +
      (mode === 'review' ? '' : '<button class="btn" id="clearBtn"' + (ans === undefined ? ' disabled' : '') + '>↺ Boş Bırak / Seçimi Kaldır</button>') + '</div>';

    card.querySelectorAll('.opt').forEach(function (b) { b.onclick = function () { choose(b.dataset.l); }; });
    $('#prevBtn').onclick = function () { go(v[pos - 1]); };
    $('#nextBtn').onclick = function () { go(v[pos + 1]); };
    var db = $('#doneBtn'); if (db) db.onclick = askFinish;
    var cb = $('#clearBtn'); if (cb) cb.onclick = function () { delete S.answers[S.current]; save(); renderAll(); };
  }

  function renderPalette() {
    var v = visible();
    $('#pgrid').innerHTML = v.map(function (i) {
      var cls = 'pb', a = S.answers[i];
      if (mode === 'review') { if (a !== undefined) cls += a === Q[i].a ? ' correct' : ' wrong'; }
      else if (a !== undefined) cls += ' answered';
      if (i === S.current) cls += ' current';
      return '<button class="' + cls + '" data-i="' + i + '">' + Q[i].n + '</button>';
    }).join('');
    $('#pgrid').querySelectorAll('.pb').forEach(function (b) {
      b.onclick = function () { go(+b.dataset.i); document.body.classList.remove('palette-open'); };
    });
    $('#legend').innerHTML = mode === 'review'
      ? '<span><i style="background:var(--ok-l);border-color:var(--ok)"></i>Doğru</span><span><i style="background:var(--bad-l);border-color:var(--bad)"></i>Yanlış</span><span><i></i>Boş</span><span><i style="background:var(--primary);border-color:var(--primary)"></i>Aktif</span>'
      : '<span><i style="background:var(--primary-l);border-color:#a5b4fc"></i>Cevaplandı</span><span><i></i>Boş</span><span><i style="background:var(--primary);border-color:var(--primary)"></i>Aktif</span>';
  }

  /* ---------- Eylemler ---------- */
  function go(i) { if (i === undefined) return; S.current = i; save(); renderAll(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function choose(L) { if (mode === 'review') return;
    if (S.feedback && S.answers[S.current] !== undefined) return;
    S.answers[S.current] = L; save(); renderAll(); }

  function finish() {
    var c = counts();
    var attempt = { n: S.attemptNo, date: new Date().toISOString(), total: c.total, correct: c.correct, wrong: c.wrong, blank: c.blank, percent: c.percent };
    Store.addAttempt(course.id, attempt);
    S.finished = true; S.result = attempt; save();
    mode = 'exam'; showResult();
  }

  function showResult() {
    var r = S.result;
    $('#examView').classList.add('hidden');
    $('#paletteFab').classList.add('hidden');
    $('#finishBtn').classList.add('hidden');
    document.body.classList.remove('palette-open');
    $('#attemptBadge').textContent = r.n + '. Deneme – Tamamlandı';
    var rv = $('#resultView'); rv.classList.remove('hidden');
    rv.innerHTML = '<div class="card result"><h2>🏁 ' + r.n + '. Deneme Sonucu</h2><p style="color:var(--muted)">' + fmt(r.date) + '</p>' +
      '<div class="ring" style="--p:' + r.percent + '"><span>%' + r.percent + '</span></div>' +
      '<div class="res-stats"><div class="ok"><b style="color:var(--ok)">' + r.correct + '</b>Doğru</div>' +
      '<div><b style="color:var(--bad)">' + r.wrong + '</b>Yanlış</div><div><b>' + r.blank + '</b>Boş</div></div>' +
      '<div class="res-actions">' +
      '<button class="btn btn-primary btn-lg btn-block" id="nextAttempt">🔄 ' + (r.n + 1) + '. Denemeye Başla</button>' +
      '<button class="btn btn-block" id="revAll">🔍 Tüm Soruları İncele</button>' +
      '<button class="btn btn-block" id="revWrong">❌ Sadece Yanlışları İncele</button>' +
      '<a class="btn btn-block" href="index.html" style="justify-content:center">🏠 Ana Sayfa</a></div></div>';
    $('#nextAttempt').onclick = function () { Store.clearSession(course.id); S = newSession(); mode = 'exam'; save(); showExam(); window.scrollTo(0, 0); };
    $('#revAll').onclick = function () { startReview('all'); };
    $('#revWrong').onclick = function () { startReview('wrong'); };
  }

  function startReview(f) {
    mode = 'review'; reviewFilter = f; S.category = 'Tümü';
    var v = visible(); S.current = v.length ? v[0] : 0;
    showExam();
  }

  /* ---------- Modal ---------- */
  function modal(title, html, buttons) {
    var bd = document.createElement('div'); bd.className = 'backdrop';
    bd.innerHTML = '<div class="modal" role="dialog"><h3>' + title + '</h3><div>' + html + '</div><div class="actions"></div></div>';
    var close = function () { bd.remove(); document.removeEventListener('keydown', esc_); };
    var esc_ = function (e) { if (e.key === 'Escape') close(); };
    buttons.forEach(function (b) {
      var el = document.createElement('button'); el.className = 'btn ' + (b.cls || ''); el.textContent = b.label;
      el.onclick = function () { close(); if (b.fn) b.fn(); };
      bd.querySelector('.actions').appendChild(el);
    });
    bd.onclick = function (e) { if (e.target === bd) close(); };
    document.addEventListener('keydown', esc_);
    document.body.appendChild(bd);
  }

  function askFinish() {
    var c = counts();
    modal('Sınavı bitirmek istiyor musunuz?',
      '<p>' + c.total + ' sorudan <b>' + (c.total - c.blank) + '</b> tanesini cevapladınız, <b>' + c.blank + '</b> soru boş.</p><p>Sonuç ' + S.attemptNo + '. Deneme olarak kaydedilecek.</p>',
      [{ label: 'Vazgeç' }, { label: '✓ Evet, Bitir', cls: 'btn-primary', fn: finish }]);
  }

  function bind() {
    $('#feedbackToggle').onchange = function (e) { S.feedback = e.target.checked; Store.setPref('feedback', S.feedback); save(); renderAll(); };
    $('#finishBtn').onclick = askFinish;
    $('#historyBtn').onclick = function () {
      var h = Store.getHistory(course.id).slice().reverse();
      var best = h.length ? Math.max.apply(null, h.map(function (a) { return a.percent; })) : null;
      var html = h.length ? '<div class="table-wrap"><table><thead><tr><th>Deneme</th><th>Tarih</th><th>D/Y/B</th><th>Başarı</th></tr></thead><tbody>' +
        h.map(function (a) {
          return '<tr class="' + (a.percent === best ? 'best-row' : '') + '"><td>' + a.n + '. Deneme' + (a.percent === best ? ' 🏆' : '') + '</td><td>' + fmt(a.date) + '</td><td>' + a.correct + '/' + a.wrong + '/' + a.blank + '</td><td class="' + pctClass(a.percent) + '">%' + a.percent + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '<p class="empty">Bu derste henüz tamamlanmış deneme yok.</p>';
      modal('📊 Deneme Geçmişi – ' + esc(course.name), html, [{ label: 'Kapat', cls: 'btn-primary' }]);
    };
    $('#paletteFab').onclick = function () { document.body.classList.add('palette-open'); };
    $('#paletteClose').onclick = $('#overlay').onclick = function () { document.body.classList.remove('palette-open'); };
    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || document.querySelector('.backdrop') || $('#examView').classList.contains('hidden')) return;
      var v = visible(), pos = v.indexOf(S.current), k = e.key.toUpperCase();
      if (e.key === 'ArrowRight' && pos < v.length - 1) go(v[pos + 1]);
      else if (e.key === 'ArrowLeft' && pos > 0) go(v[pos - 1]);
      else if (LET.indexOf(k) >= 0 && v.length && LET.indexOf(k) < Q[S.current].o.length) choose(k);
    });
  }

  init();
})();
