/* Popüler Kültür ve Medya - Ders Notları & Özet (soru içermez)
   Metinlerde **kalın** ve *italik* işaretleri desteklenir. */
const POPULER_KULTUR_DATA = {
  courseId: "populer-kultur",
  courseName: "Popüler Kültür ve Medya",
  badge: "Ders Notları & Özet",
  totalTopics: 10,
  topics: [
    {
      id: 1,
      title: "Elisabeth Noelle-Neumann – Suskunluk Sarmalı Kuramı",
      theorists: ["Elisabeth Noelle-Neumann"],
      coreLabel: "Kuramın Özü",
      coreConcept: "Bireyler toplumdan dışlanma, tecrit edilme ve yalnız kalma korkusu nedeniyle çevrelerindeki baskın fikir iklimini sürekli gözlemler; kendi fikirlerinin azınlıkta kaldığını hissettiklerinde suskun kalmayı tercih ederler.",
      subsections: [
        {
          subtitle: "İletişim Süreci ve Geri Bildirim Eksikliği",
          content: "Geleneksel kitle iletişiminde **kaynak → mesaj → kanal → alıcı** döngüsünde anlık geri bildirim kısıtlıyken, sosyal medyada geri bildirim anında ve kitlesel bir lince dönüşebilir."
        },
        {
          subtitle: "Algoritmik Kutuplaşma ve İptal Kültürü",
          content: "Sosyal medyadaki \"yankı odaları\" (echo chambers) çoğunluk sesini yapay biçimde büyüterek azınlıkta kalan bireyin otosansür uygulamasını hızlandırır. X veya Instagram'da yükselen bir ahlaki linç ya da boykot dalgasında birey, \"linç edilme / iptal edilme\" korkusuyla sessizleşir; böylece algoritmalar suskunluk sarmalını derinleştirir."
        }
      ]
    },
    {
      id: 2,
      title: "Popüler Kültür ile İdeoloji Arasındaki İlişki",
      theorists: ["Helvétius", "Terry Eagleton", "Louis Althusser", "Pierre Bourdieu"],
      coreLabel: "İdeolojinin Tanımı ve Çıkar İlişkisi",
      coreConcept: "İdeoloji tarafsız bir fikir dünyası değildir; **bireyin bağlı olduğu toplumsal sınıf veya statüye göre belirlenen ve tüm yargıları yönlendiren çıkar ilişkisidir**. Helvétius’un belirttiği gibi, *insanın neye inandığını neyin işine geldiği (çıkarı) belirler*.",
      subsections: [
        {
          subtitle: "Terry Eagleton’ın İdeoloji Tanımları",
          ordered: true,
          bullets: [
            "Belli bir toplumsal sınıfa ait fikirler kümesi.",
            "Egemen bir siyasi iktidarı meşrulaştırmaya hizmet eden fikirler kümesi.",
            "Siyasi erk tarafından meşrulaştırılmak istenen düşünceye hizmet eden bir araç."
          ]
        },
        {
          subtitle: "Louis Althusser ve Devletin İdeolojik Aygıtları (DİA)",
          content: "Althusser'e göre kapitalist sistem varlığını sadece kaba güce dayanan **Devletin Baskı Aygıtları** (ordu, polis, mahkemeler) ile sürdüremez; asıl süreklilik zorla değil, **rızayla çalışan Devletin İdeolojik Aygıtları** (medya, eğitim, aile) üzerinden sağlanır.",
          note: "**Çağırma (İnterpellation):** Althusser’in polisin sokakta *\"Hey, sen!\"* diye seslenip kişiyi özne kılması gibi, günümüz dijital medyası da algoritmalarla *\"Sana Özel\", \"Keşfet\", \"Senin İçin Seçtiklerimiz\"* diyerek bireyi bir tüketim öznesi olarak çağırır."
        },
        {
          subtitle: "Yaşam Tarzı ve Tüketim Örneği",
          example: "Pierre Bourdieu’nün **sembolik sermaye** kavramı üzerinden Nusret (Salt Bae) olgusu tam bir ideolojik tüketim örneğidir. Tüketici orada besin maddesi olan eti değil; zenginlik, ayrıcalık ve \"başarılı birey\" mitini satın alarak sisteme eklemlenir."
        }
      ]
    },
    {
      id: 3,
      title: "Popüler Kültür, Kitle Kültürü ve Yüksek Kültür Farklılıkları",
      theorists: ["Raymond Williams"],
      coreLabel: "Temel Çerçeve",
      coreConcept: "Kültürel hiyerarşiler üretim biçimleri ve toplumsal katmanlara göre **yüksek kültür**, **kitle kültürü** ve **popüler kültür** olarak ayrılır.",
      subsections: [
        {
          subtitle: "Kültürel Ayrımlar",
          bullets: [
            "**Yüksek Kültür:** Belli bir elit zümreye ait, estetik yetkinlik, eğitim ve entelektüel çaba gerektiren (opera, klasik edebiyat vb.) kültür alanı.",
            "**Kitle Kültürü:** Sanayi Devrimi sonrası kitle iletişim araçlarıyla sermaye tarafından yukarıdan aşağıya üretilen, standart, ticari meta kültürü.",
            "**Popüler Kültür:** Raymond Williams’ın vurguladığı gibi halkın gündelik pratiklerinden doğan, benimsenen ve yaşanan alandır. Popüler kültür, kitle iletişim araçlarıyla yayıldığında kitle kültürünün tüketim kodlarıyla iç içe geçer."
          ]
        },
        {
          subtitle: "Dijital Medyanın Etkisi",
          content: "Dijitalleşme yüksek kültür ile kitle kültürü arasındaki sınırları eritmiştir. Klasik bir sanat eseri veya opera aryası TikTok’ta 15 saniyelik bir meme veya fon müziği haline gelerek kitleleştirilir; kitleler pasif alıcı olmaktan çıkıp kendi mikro topluluklarını kurarak içeriği dönüştürür."
        }
      ]
    },
    {
      id: 4,
      title: "Adorno ve Horkheimer – Kültür Endüstrisi ve Standartlaşma",
      isExamFocus: true,
      theorists: ["Theodor Adorno", "Max Horkheimer", "Hans Magnus Enzensberger"],
      coreLabel: "Kültür Endüstrisi ve Bilinç Endüstrisi Kavramı",
      coreConcept: "Frankfurt Okulu düşünürleri Adorno ve Horkheimer’a göre kültür artık fabrikasyon bir meta (emtia) haline gelmiştir. Hans Magnus Enzensberger’in **Bilinç Endüstrisi** kavramıyla paralel olarak medya; zihni özgürleştirmek yerine kitlelerin bilincini denetleyen, mevcut sosyo-ekonomik sisteme rıza üreten endüstriyel bir çarktır.",
      subsections: [
        {
          subtitle: "Standartlaşma (Şablonlaşma)",
          content: "Kârı maksimize etmek ve risk almamak için kültür ürünleri hep aynı kalıpla üretilir; değişen yalnızca ambalajdır. Bireye \"özgürce seçtiği\" yanılsaması (**sahte bireysellik**) verilir."
        },
        {
          subtitle: "Dijital Medya Örneği",
          bullets: [
            "Netflix dizilerinin kurgusal ritmi, karakter şablonları ve izleyiciyi ekranda tutma algoritmaları fabrikasyon bir standardizasyonun sonucudur.",
            "*Wednesday* dizisindeki dans sahnesinin TikTok formatına ve viral algoritmalara uygun olarak tasarlanması, milyonlarca insanın aynı şablonu taklit etmesini sağlayarak Adorno'nun işaret ettiği tektipleşmeyi dijital çağda yeniden üretmiştir."
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Walter Lippmann – Stereotip Kavramı ve Rızanın İmalatı",
      theorists: ["Walter Lippmann"],
      coreLabel: "Stereotip (Kalıpyargı) Nedir?",
      coreConcept: "Lippmann’a göre dış dünya fazlasıyla karmaşık ve büyüktür. İnsan zihni bu karmaşayı doğrudan kavrayamadığı için basitleştirilmiş zihinsel şablonlara, yani **\"zihnimizdeki resimlere\" (stereotiplere)** sığınır. Stereotipler insana **tanıdık, normal ve güvenilir olanın cazibesini hissettirir**.",
      subsections: [
        {
          subtitle: "Rızanın Üretimi (Manufacture of Consent)",
          content: "Lippmann, kitlelerin rasyonel ve aydınlanmış kararlar alamayacağını savunur. Bu nedenle toplumsal düzen için kararları bir **\"uzmanlar sınıfı\"** almalı; kitleler ise medya, semboller ve stereotipler yoluyla yönlendirilerek rızaları üretilmelidir."
        },
        {
          subtitle: "Popüler Kültürdeki Rolü",
          example: "Dizilerdeki karakterler (örneğin *Emily in Paris* dizisindeki karikatürize Fransız tiplemeleri ya da yerli dizilerdeki \"saf köylü / acımasız holding patronu\" rolleri) bu stereotipleri besler. Düşünce tembelliği yaratarak toplumsal kimlikleri kalıplara hapseder."
        }
      ]
    },
    {
      id: 6,
      title: "Kültürel Çalışmalar Yaklaşımı ve Raymond Williams – \"Kültür Sıradandır\"",
      theorists: ["Raymond Williams"],
      coreLabel: "Yaklaşımın Temeli",
      coreConcept: "Frankfurt Okulu'nun kitleleri \"pasif kurban\" gören elitist bakışına karşı çıkar. Kültürün sadece operada, sarayda ya da yüksek sanatta değil; işçi sınıfının yaşam biçiminde, sokakta, bakkalda, yani gündelik hayatın her anında olduğunu savunur. **Kültür sıradandır**.",
      subsections: [
        {
          subtitle: "Gündelik Yaşamla İlişki",
          content: "Popüler kültür bir dayatma alanı olduğu kadar halkın anlam ürettiği ve egemen kültürü kendine göre dönüştürdüğü bir deneyim alanıdır. Sabah kahve ritüelleri, sokak modası veya sosyal medyadaki gündelik paylaşımlar, bireyin kimliğini inşa ettiği canlı kültürel pratiklerdir."
        }
      ]
    },
    {
      id: 7,
      title: "Sanayi Devrimi, Kitle İletişim Araçları ve Kitle Kültürü",
      coreLabel: "Sanayi Devrimi'nin Rolü",
      coreConcept: "Sanayi Devrimi ile geleneksel cemaat bağlarından kopup kentlere göç eden insanlar atomize olmuş \"kitleleri\" meydana getirdi. Çalışma saati ile \"boş zaman\" birbirinden ayrıldı.",
      subsections: [
        {
          subtitle: "Kitle İletişim Araçları ve Sermaye",
          content: "19. yüzyıl sonlarından itibaren radyo, sinema ve basın birer endüstri olarak örgütlenip sermayenin denetimine girdi. İletişim araçları, kitlelerin boş zamanını tüketimle doldurmak için tasarlandı."
        },
        {
          subtitle: "Kitle Kültürü vs. Popüler Kültür",
          bullets: [
            "**Kitle Kültürü:** Pazar için yukarıdan aşağıya üretilen, metalaşmış ticari kültürdür.",
            "**Popüler Kültür:** Kitle kültürü ürünlerini malzeme olarak kullansa bile, halkın bunu gündelik yaşamında nasıl yorumladığı ve pratik ettiğiyle (aşağıdan yukarıya katılım potansiyeliyle) ilgilidir."
          ]
        }
      ]
    },
    {
      id: 8,
      title: "Gustave Le Bon – Kitle Psikolojisi Yaklaşımı",
      theorists: ["Gustave Le Bon"],
      coreLabel: "Kitle Psikolojisinin Temel Unsurları",
      coreConcept: "Le Bon’a göre birey kalabalığın içine girdiği anda akılcı, rasyonel iradesini kaybeder; ilkel ve bilinçdışı bir **\"kolektif ruh\"** kazanır.",
      subsections: [
        {
          subtitle: "Üç Temel Unsur",
          ordered: true,
          bullets: [
            "*Sayısal üstünlüğün verdiği güçlü hissetme ve sorumsuzluk.*",
            "*Bulaşıcılık (duyguların hızla kitleye yayılması).*",
            "*Telkine açık hale gelme ve kendi kimliğinden farklı karakterlere bürünme.*"
          ]
        },
        {
          subtitle: "Popüler Kültür ve Medyadaki Karşılığı",
          content: "Kitle iletişim araçları ve sosyal medya, fiziksel olarak yan yana gelmeyen insanları ortak bir psikolojik kitleye çevirir. Sosyal medyadaki \"trend topic\" lümpenleşmesi, linç kampanyaları ve viral histeri dalgaları, Le Bon'un tarif ettiği telkine açık kitle ruhunun dijital izdüşümüdür."
        }
      ]
    },
    {
      id: 9,
      title: "ABD Eleştirel Ekonomi Politik Yaklaşımı ve Liberalizmin Eleştirisi",
      theorists: ["Adam Smith (Eleştirilen)"],
      coreLabel: "Liberalizmin 5 İlkesi ve Piyasa Miti",
      coreConcept: "Liberalizm; **sınırlı devlet**, **özel mülkiyet**, **bireycilik**, **serbest piyasa (Laissez-faire)** ve Adam Smith'in **\"Görünmez El\"** metaforu (bireysel çıkarın kendiliğinden toplumsal refah yaratacağı inancı) üzerine kuruludur. Bu modele göre medyanın toplumsal görevi toplumu bilgilendirmek, kamuoyu oluşturmak ve tarafsız gözetim (dördüncü kuvvet) yapmaktır.",
      subsections: [
        {
          subtitle: "Eleştirel Ekonomi Politiğin Cevabı",
          content: "Medya tarafsız veya kamusal bir alan değildir; büyük sermaye tekellerinin elinde bir kâr mekanizmasıdır.",
          bullets: [
            "Piyasadaki \"görünmez el\", medyada tekelci sermayenin çıkarına hizmet eder."
          ]
        },
        {
          subtitle: "İzleyicinin Meta Olması",
          content: "Medya izleyiciye içerik satmaz; **izleyiciyi bir meta olarak reklamverenlere satar**. Popüler kültür ürünleri ve diziler, kapitalist düzene itiraz etmeyecek, tüketmeye odaklı \"performans özneleri\" inşa etmek için araçsallaştırılır."
        }
      ]
    },
    {
      id: 10,
      title: "Antonio Gramsci – Hegemonya ve Toplumsal Rıza",
      theorists: ["Antonio Gramsci", "Louis Althusser"],
      coreLabel: "Hegemonya Kavramı",
      coreConcept: "Gramsci'ye göre egemen sınıf egemenliğini sadece zor, ordu ve polisle sürdüremez; yönetilenlerin rızasını kazanarak meşruiyet üretmek zorundadır. Hegemonya, egemen sınıfın dünya görüşünün bütün topluma \"doğal\", \"sağduyu\" (common sense) ve tek alternatif gibi kabul ettirilmesidir.",
      subsections: [
        {
          subtitle: "Althusser ile Tamamlayıcılığı",
          content: "Bu rıza üretimi, Althusser’in işaret ettiği **Devletin İdeolojik Aygıtları** (özellikle medya ve eğitim) aracılığıyla gündelik hayatın kılcallarına işlenir."
        },
        {
          subtitle: "Popüler Kültürün Rolü",
          example: "Popüler kültür metinleri mevcut güç dengelerini doğallaştırır. Örneğin *Kuş Uçuşu* gibi dizilerde rekabet, hırs, sınıfsal eşitsizlikler ve kurumsal sömürü \"dünyanın kaçınılmaz doğası\" gibi sunulur. İzleyici sisteme dair yapısal bir sorgulamaya girişmeden bu değerleri rızayla içselleştirir."
        }
      ]
    }
  ]
};
window.POPULER_KULTUR_DATA = POPULER_KULTUR_DATA;
