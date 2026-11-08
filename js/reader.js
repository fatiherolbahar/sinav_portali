/* Okuma modülü: notları listeleme, içindekiler, arama ve ilerleme çubuğu */
(function () {
  'use strict';
  function start() {
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var params = new URLSearchParams(location.search);
  var courseId = params.get('course') || 'populer-kultur';
  var manifest = (window.COURSES_MANIFEST || []).filter(function (c) { return c.id === courseId && c.type === 'reading'; })[0];
  var DATA = window.POPULER_KULTUR_DATA;

  if (!manifest || !DATA || DATA.courseId !== courseId) {
    $('#notes').innerHTML = '<p class="empty">Ders notu bulunamadı. <a href="index.html" style="color:var(--primary)">Ders seçimine dön</a></p>';
    return;
  }

  // Anahtar kavramlar (indigo rozet) - konu metninde geçenler otomatik eşlenir
  var CONCEPTS = ['Suskunluk Sarmalı', 'Yankı Odası', 'İptal Kültürü', 'İdeoloji', 'Çağırma', 'Sembolik Sermaye',
    'Standartlaşma', 'Kültür Endüstrisi', 'Sahte Bireysellik', 'Bilinç Endüstrisi', 'Stereotip', 'Rızanın Üretimi',
    'Kültür Sıradandır', 'Atomize Kitle', 'Kolektif Ruh', 'Bulaşıcılık', 'Telkin', 'Görünmez El', 'Hegemonya',
    'Sağduyu', 'Toplumsal Rıza', 'Kitle Kültürü', 'Yüksek Kültür', 'Popüler Kültür'];
  var CONCEPT_ALIAS = {
    'Suskunluk Sarmalı': /suskunluk sarmal/i, 'Yankı Odası': /yankı odaları|echo chamber/i, 'İptal Kültürü': /iptal edil|iptal kültürü/i,
    'İdeoloji': /ideoloji/i, 'Çağırma': /çağırma|interpellation/i, 'Sembolik Sermaye': /sembolik sermaye/i,
    'Standartlaşma': /standartlaşma|standardizasyon/i, 'Kültür Endüstrisi': /kültür endüstrisi/i, 'Sahte Bireysellik': /sahte bireysellik/i,
    'Bilinç Endüstrisi': /bilinç endüstrisi/i, 'Stereotip': /stereotip/i, 'Rızanın Üretimi': /rızanın (üretimi|imalatı)|manufacture of consent/i,
    'Kültür Sıradandır': /kültür sıradandır/i, 'Atomize Kitle': /atomize/i, 'Kolektif Ruh': /kolektif ruh/i,
    'Bulaşıcılık': /bulaşıcılık/i, 'Telkin': /telkin/i, 'Görünmez El': /görünmez el/i, 'Hegemonya': /hegemonya/i,
    'Sağduyu': /sağduyu/i, 'Toplumsal Rıza': /toplumsal rıza|rızayla|rızasını/i, 'Kitle Kültürü': /kitle kültürü/i,
    'Yüksek Kültür': /yüksek kültür/i, 'Popüler Kültür': /popüler kültür/i
  };

  // **kalın** ve *italik* işaretlerini biçimlendirir
  function fmt(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function topicText(t) {
    var parts = [t.title, t.coreConcept || ''];
    (t.subsections || []).forEach(function (s) {
      parts.push(s.subtitle, s.content || '', s.note || '', s.example || '', (s.bullets || []).join(' '));
    });
    return parts.join(' ').replace(/\*/g, '');
  }
  function conceptsOf(t) {
    var txt = topicText(t);
    return CONCEPTS.filter(function (c) { return CONCEPT_ALIAS[c].test(txt); }).slice(0, 6);
  }

  function renderSub(s) {
    var h = '<div class="sub"><h4>' + esc(s.subtitle) + '</h4>';
    if (s.content) h += '<p>' + fmt(s.content) + '</p>';
    if (s.bullets) { var tag = s.ordered ? 'ol' : 'ul'; h += '<' + tag + '>' + s.bullets.map(function (b) { return '<li>' + fmt(b) + '</li>'; }).join('') + '</' + tag + '>'; }
    if (s.note) h += '<div class="callout callout-note"><span class="callout-label">💡 Anahtar Not</span>' + fmt(s.note) + '</div>';
    if (s.example) h += '<div class="callout callout-example"><span class="callout-label">🎬 Popüler Kültür Örneği</span>' + fmt(s.example) + '</div>';
    return h + '</div>';
  }

  function renderTopic(t) {
    var h = '<article class="card note-card' + (t.isExamFocus ? ' is-focus' : '') + '" id="topic-' + t.id + '" data-id="' + t.id + '">';
    if (t.isExamFocus) h += '<span class="focus-badge">🎯 Sınavın Odak Sorusu</span>';
    h += '<div class="note-head"><span class="note-num">' + t.id + '</span><h2>' + esc(t.title) + '</h2></div>';
    var badges = (t.theorists || []).map(function (n) { return '<span class="pill pill-theorist">👤 ' + esc(n) + '</span>'; }).join('') +
      conceptsOf(t).map(function (c) { return '<span class="pill pill-concept"># ' + esc(c) + '</span>'; }).join('');
    if (badges) h += '<div class="pills">' + badges + '</div>';
    h += '<div class="core"><span class="core-label">' + esc(t.coreLabel || 'Temel Kavram') + '</span><p>' + fmt(t.coreConcept) + '</p></div>';
    h += (t.subsections || []).map(renderSub).join('');
    return h + '</article>';
  }

  // Sayfa iskeleti
  document.title = DATA.courseName + ' – ' + DATA.badge;
  $('#courseName').textContent = DATA.courseName;
  $('#topicBadge').textContent = DATA.totalTopics + ' Konu Başlığı';
  $('#notes').innerHTML = DATA.topics.map(renderTopic).join('');
  $('#tocList').innerHTML = DATA.topics.map(function (t) {
    return '<a href="#topic-' + t.id + '" data-id="' + t.id + '"><span class="toc-num">' + t.id + '</span><span class="toc-text">' + esc(t.title) +
      (t.isExamFocus ? ' 🎯' : '') + '</span></a>';
  }).join('');

  // İçindekiler: yumuşak kaydırma + mobil çekmece
  var toc = $('#toc'), backdrop = $('#tocBackdrop'), toggle = $('#tocToggle');
  function setDrawer(open) {
    toc.classList.toggle('open', open);
    backdrop.classList.toggle('show', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function () { setDrawer(!toc.classList.contains('open')); });
  backdrop.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
  $('#tocList').addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    e.preventDefault();
    var el = document.getElementById('topic-' + a.getAttribute('data-id'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setDrawer(false);
  });

  // Okuma ilerleme çubuğu + aktif başlık
  var bar = $('#progressBar');
  var cards = [].slice.call(document.querySelectorAll('.note-card'));
  var links = [].slice.call(document.querySelectorAll('#tocList a'));
  var ticking = false;
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + '%';
    var activeId = null;
    cards.forEach(function (c) {
      if (!c.classList.contains('hidden') && c.getBoundingClientRect().top <= 140) activeId = c.getAttribute('data-id');
    });
    links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-id') === activeId); });
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Canlı arama
  var input = $('#searchInput'), countEl = $('#searchCount'), noRes = $('#noResult');
  var norm = function (s) { return s.toLocaleLowerCase('tr-TR'); };
  var texts = {};
  DATA.topics.forEach(function (t) { texts[t.id] = norm(topicText(t) + ' ' + (t.theorists || []).join(' ')); });
  var originals = cards.map(function (c) { return c.innerHTML; });

  function clearMarks(card, idx) { card.innerHTML = originals[idx]; }
  function highlight(card, q) {
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'giu');
    var walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) { if (n.nodeValue.trim()) nodes.push(n); }
    nodes.forEach(function (node) {
      var v = node.nodeValue;
      var lower = norm(v), ql = norm(q), pos = 0, idx, out = null;
      if (lower.length !== v.length) return; // uzunluğu değişen karakter durumunda güvenli çık
      while ((idx = lower.indexOf(ql, pos)) !== -1) {
        out = out || document.createDocumentFragment();
        out.appendChild(document.createTextNode(v.slice(pos, idx)));
        var m = document.createElement('mark'); m.textContent = v.slice(idx, idx + q.length); out.appendChild(m);
        pos = idx + q.length;
      }
      if (out) { out.appendChild(document.createTextNode(v.slice(pos))); node.parentNode.replaceChild(out, node); }
    });
  }

  function search() {
    var q = norm(input.value.trim());
    var hits = 0, first = null;
    cards.forEach(function (card, i) {
      var id = card.getAttribute('data-id');
      clearMarks(card, i);
      var match = !q || texts[id].indexOf(q) !== -1;
      card.classList.toggle('hidden', !match);
      if (match && q) { hits++; highlight(card, input.value.trim()); if (!first) first = card; }
      if (!q) hits++;
    });
    links.forEach(function (l) { l.classList.toggle('dim', !!q && texts[l.getAttribute('data-id')].indexOf(q) === -1); });
    countEl.textContent = q ? hits + ' sonuç' : '';
    noRes.classList.toggle('hidden', hits > 0);
    onScroll();
    return first;
  }
  var timer;
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(search, 120); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { var f = search(); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
  }

  // Ders verisini manifest'teki dosya yolundan yükle, sonra sayfayı kur
  var cid = new URLSearchParams(location.search).get('course') || 'populer-kultur';
  var m = (window.COURSES_MANIFEST || []).filter(function (c) { return c.id === cid && c.type === 'reading'; })[0];
  if (window.POPULER_KULTUR_DATA || !m) { start(); return; }
  var sc = document.createElement('script');
  sc.src = m.file;
  sc.onload = start;
  sc.onerror = function () { start(); };
  document.head.appendChild(sc);
})();
