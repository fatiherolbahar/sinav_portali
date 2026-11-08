/*
 * Ders kayıt defteri. Yeni ders eklemek için:
 *  1) data/ yeni-ders.js dosyası oluşturun (window.COURSE_DATA['id'] = [...] biçiminde)
 *  2) Aşağıya bir kayıt ekleyin. HTML/JS değişikliği gerekmez.
 */
window.COURSES_MANIFEST = [
  {
    id: 'ofis',
    name: 'Temel Bilgi Teknolojileri (Ofis)',
    questionCount: 49,
    categories: ['Tümü', 'Word', 'Excel'],
    file: 'data/ofis.js'
  },
  {
    id: 'sistem-analizi',
    name: 'Sistem Analizi ve Tasarımı (84 Soru)',
    questionCount: 84,
    categories: ['Tümü'],
    file: 'data/sistem-analizi.js'
  },
  {
    id: 'populer-kultur',
    name: 'Popüler Kültür ve Medya',
    type: 'reading',
    topicCount: 10,
    questionCount: 0,
    categories: ['Okuma Modülü'],
    file: 'data/populer-kultur.js'
  }
];
