/* Ana sayfa (Dashboard) mantığı */
(function () {
  'use strict';
  var S = window.PortalStorage;
  var courses = window.COURSES_MANIFEST || [];
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var pctClass = function (p) { return p >= 70 ? 'pct-good' : p >= 50 ? 'pct-mid' : 'pct-low'; };
  var fmt = function (iso) {
    return new Date(iso).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });
  };

  function renderCards() {
    var grid = $('#courseGrid');
    if (!courses.length) { grid.innerHTML = '<p class="empty">Kayıtlı ders bulunamadı.</p>'; return; }
    grid.innerHTML = courses.map(function (c) {
      var st = S.stats(c.id);
      var sess = S.getSession(c.id);
      var active = sess && !sess.finished && Object.keys(sess.answers || {}).length > 0;
      var cats = (c.categories || []).filter(function (x) { return x !== 'Tümü'; });
      if (!cats.length) cats = ['Genel'];
      return '<article class="card course-card">' +
        '<div class="tags">' + cats.map(function (t) { return '<span class="badge tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<h3>' + esc(c.name) + '</h3>' +
        '<div class="meta">' +
        '<div>Toplam Soru<b>' + c.questionCount + '</b></div>' +
        '<div>Tamamlanan<b>' + st.count + ' Deneme Yapıldı</b></div>' +
        '<div style="grid-column:span 2">En İyi Skor<b>' + (st.best === null ? '—' : '%' + st.best) + '</b></div>' +
        '</div>' +
        '<a class="btn btn-primary btn-block btn-lg" href="exam.html?course=' + encodeURIComponent(c.id) + '">' +
        (active ? '▶ Devam Et' : 'Sınava Başla') + '</a></article>';
    }).join('');
  }

  function renderSummary() {
    var all = S.getAllHistory();
    var rows = [];
    Object.keys(all).forEach(function (id) {
      var c = courses.filter(function (x) { return x.id === id; })[0];
      all[id].forEach(function (a) { rows.push({ course: c ? c.name : id, a: a }); });
    });
    rows.sort(function (x, y) { return new Date(y.a.date) - new Date(x.a.date); });
    var total = rows.length;
    var avg = total ? Math.round(rows.reduce(function (s, r) { return s + r.a.percent; }, 0) / total) : null;
    var best = total ? Math.max.apply(null, rows.map(function (r) { return r.a.percent; })) : null;
    $('#sTotal').textContent = total;
    $('#sCourses').textContent = courses.length;
    $('#sAvg').textContent = avg === null ? '—' : '%' + avg;
    $('#sBest').textContent = best === null ? '—' : '%' + best;

    var body = $('#recentBody');
    if (!total) { body.innerHTML = '<tr><td colspan="6" class="empty">Henüz tamamlanmış deneme yok.</td></tr>'; }
    else {
      body.innerHTML = rows.slice(0, 10).map(function (r) {
        return '<tr><td>' + esc(r.course) + '</td><td>' + r.a.n + '. Deneme</td><td>' + fmt(r.a.date) + '</td>' +
          '<td>' + r.a.correct + ' / ' + r.a.wrong + ' / ' + r.a.blank + '</td>' +
          '<td class="' + pctClass(r.a.percent) + '">%' + r.a.percent + '</td></tr>';
      }).join('');
    }
  }

  function render() { renderCards(); renderSummary(); }

  $('#resetBtn').addEventListener('click', function () {
    if (confirm('Tüm deneme geçmişi ve devam eden oturumlar silinecek. Emin misiniz?')) {
      S.clearAll();
      render();
    }
  });
  window.addEventListener('pageshow', render);
  render();
})();
