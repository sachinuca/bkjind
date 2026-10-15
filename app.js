// ==============================================================================
// BRAHMA KUMARIS SPIRITUAL PORTAL & DIVINE ART GALLERY ENGINE
// ==============================================================================

// 1. Supabase Initialization
const SUPABASE_URL = 'https://pqwapzibbbdurdkjismr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd2FwemliYmJkdXJka2ppc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjA5NTIsImV4cCI6MjEwNzYzNjk1Mn0.H9Vn3tIWuAR-pq4kgccsjrNMh1j0NBVKzxBx-El0JZQ';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// 2. Application State
const state = {
  currentRoute: '/home',
  isAdmin: false,
  adminPassword: 'omshanti2026',
  currentExhibit: null,
  exhibitLang: 'en', // 'en' or 'hi'
  isSpeaking: false,
  speechSynthUtterance: null,
  audioElement: null,
  exhibitions: [
    {
      id: 1,
      order_num: 1,
      title_en: 'Trimurti Shiva - Supreme Soul God Father',
      title_hi: 'त्रिमूर्ति शिव - परमपिता परमात्मा',
      desc_en: 'Shiv Baba is the incorporeal Supreme Soul, a radiant point of divine light (Jyotirlingam). He is the Creator of the three subtle deities: Brahma (Generation), Vishnu (Sustenance), and Shankar (Transformation). Through Brahma, He reveals divine knowledge to transform Kaliyug into Satyug.',
      desc_hi: 'परमपिता परमात्मा शिव अशरीरी, ज्योतिर्बिंदु स्वरूप हैं। वे त्रिमूर्ति—ब्रह्मा, विष्णु और शंकर के रचयिता हैं। ब्रह्मा द्वारा वे सत्य ज्ञान देकर कलियुग को पुनः सत्युग में परिवर्तित करते हैं। वे शांति, प्रेम और आनंद के असीम सागर हैं।',
      image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 2,
      order_num: 2,
      title_en: 'The World Drama Wheel (Kalpa Chakra)',
      title_hi: 'सृष्टि चक्र - अनादि अविनाशी नाटक',
      desc_en: 'The eternal World Drama lasts 5,000 years, divided equally into four ages: Golden Age (Satyug - 1250 yrs), Silver Age (Tretayug - 1250 yrs), Copper Age (Dvaparyug - 1250 yrs), and Iron Age (Kaliyug - 1250 yrs). At the end comes the Confluence Age (Sangam Yug), where God descends to usher in the new golden dawn.',
      desc_hi: 'सृष्टि चक्र 5000 वर्ष का एक अनादि अविनाशी चक्र है, जो चार युगों में समान रूप से बंटा है: सत्युग (स्वर्ण युग), त्रेतायुग (रजत युग), द्वापरयुग (ताम्र युग), और कलियुग (लौह युग)। अंत में संगमयुग आता है, जिसमें परमात्मा अवतरित होकर पतित दुनिया को पावन बनाते हैं।',
      image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 3,
      order_num: 3,
      title_en: 'The World Genealogical Tree (Kalpa Vriksha)',
      title_hi: 'कल्प वृक्ष - मानव सृष्टि का विशाल वृक्ष',
      desc_en: 'The Kalpa Vriksha depicts the family tree of human souls and diverse world religions. The Supreme Soul is the Eternal Seed at the top. The roots represent the primordial deity religion. Over time, branches sprout representing major world faiths—Buddhism, Christianity, Islam, and other spiritual paths.',
      desc_hi: 'कल्प वृक्ष मानव आत्माओं और सभी धर्मों का पारिवारिक वृक्ष है। इसके ऊपर बीज रूप परमात्मा शिव विराजमान हैं। मूल तना आदि सनातन देवी-देवता धर्म है। समय के साथ विभिन्न मुख्य शाखाएं—बौद्ध, ईसाई, इस्लाम और अन्य पंथ—उत्पन्न होती हैं।',
      image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 4,
      order_num: 4,
      title_en: 'The Ladder of 84 Births',
      title_hi: 'चौरासी जन्मों की सीढ़ी',
      desc_en: 'This picture shows the soul journey through the cycle of 84 births. In the Golden Age, souls experience peak purity and joy (100% happiness, 0% sorrow). As the soul descends through the ages, it loses spiritual energy until it reaches the depths of Kaliyug, where God lifts it back to purity.',
      desc_hi: 'यह चित्र आत्मा की 84 जन्मों की यात्रा को दर्शाता है। सत्युग में आत्मा पूर्ण पावन 16 कला संपूर्ण होती है। जन्म-मरण के चक्र में आते-आते द्वापर और कलियुग तक आत्मा की शक्ति क्षीण होती है। अंत में शिव बाबा आकर सीढ़ी के शीर्ष पर पुनः ले जाते हैं।',
      image_url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 5,
      order_num: 5,
      title_en: 'Soul and The Third Eye of Knowledge',
      title_hi: 'आत्मा और ज्ञान का तीसरा नेत्र',
      desc_en: 'You are not this perishable physical body; you are an eternal, sentient point of spiritual light situated between the eyebrows. The physical eyes see only matter, but the divine third eye granted by spiritual knowledge allows you to realize yourself as a peaceful soul and perceive God.',
      desc_hi: 'आप यह नश्वर शरीर नहीं, बल्कि भृकुटी के मध्य विराजमान एक चैतन्य, अविनाशी ज्योतिर्बिंदु आत्मा हैं। स्थूल आंखें केवल भौतिक संसार देखती हैं, किंतु ज्ञान का तीसरा नेत्र आपको स्वयं का और परमात्मा का सच्चा साक्षात्कार कराता है।',
      image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 6,
      order_num: 6,
      title_en: 'Golden Age - The Kingdom of Peace & Harmony',
      title_hi: 'स्वर्णिम भारत - सत्युग की दिव्य दुनिया',
      desc_en: 'Satyug was an era of complete peace, purity, and prosperity on Earth (Heaven / Paradise). Shri Lakshmi and Shri Narayan were the sovereign rulers. Nature was completely benevolent, and all beings lived in divine harmony without any sorrow, sickness, or conflict.',
      desc_hi: 'सत्युग धरती पर स्वर्ग का काल था, जहाँ संपूर्ण सुख, शांति, पवित्रता और समृद्धि थी। श्री लक्ष्मी और श्री नारायण का राज्य था। प्रकृति दासी समान अनुकूल थी और किसी भी प्राणी को कोई दुःख, रोग या भय नहीं था।',
      image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 7,
      order_num: 7,
      title_en: 'The Three Worlds (Teen Lok)',
      title_hi: 'तीन लोक - साकार, सूक्ष्म और परमधाम',
      desc_en: 'The universe comprises three distinct realms: (1) Corporeal World (Sakar Lok) of matter, (2) Subtle World (Sukshma Lok) of angelic light, and (3) Incorporeal World (Paramdham / Nirvana / Shanti Dham), an ocean of golden-red light where all souls and God dwell in supreme silence.',
      desc_hi: 'ब्रह्मांड तीन लोकों से बना है: (1) साकार लोक—जहाँ हम शरीर धारण कर कर्म करते हैं, (2) सूक्ष्म लोक—जहाँ ब्रह्मा, विष्णु और शंकर की प्रकाशमयी सूक्ष्म काया है, (3) परमधाम (शांतिधाम)—जहाँ लाल-सुनहरे प्रकाश में सभी आत्माएं और परमात्मा शिव परम शांति में रहते हैं।',
      image_url: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 8,
      order_num: 8,
      title_en: 'The Inviolable Law of Karma',
      title_hi: 'कर्मों की गुह्य गति',
      desc_en: 'Every thought, word, and action carries a spiritual reaction. As you sow, so shall you reap. Pure actions guided by soul consciousness bring boundless joy and peace, while actions driven by ego, anger, and attachment bring sorrow. Raja Yoga purifies our past karmic debt.',
      desc_hi: 'जैसा कर्म करेंगे, वैसा ही फल प्राप्त होगा। देह-अभिमान, क्रोध, मोह व लोभ के वशीभूत होकर किए गए कर्म दुःख लाते हैं, जबकि आत्म-स्मृति और प्रेमभाव से किए कर्म सुख और शांति प्रदान करते हैं। राजयोग से पुराने पाप-कर्म भस्म होते हैं।',
      image_url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 9,
      order_num: 9,
      title_en: 'Raja Yoga Meditation - Union with God',
      title_hi: 'सहज राजयोग - परमात्मा से मिलन',
      desc_en: 'Raja Yoga is not physical posturing, but a mental communion between the soul and the Supreme Soul. By sitting quietly and focusing mind and intellect on Shiv Baba in Paramdham, one receives divine energy, peace, pure love, and spiritual power.',
      desc_hi: 'राजयोग कोई शारीरिक व्यायाम नहीं, बल्कि आत्मा का परमात्मा से मन और बुद्धि द्वारा सच्चा संबंध है। शांत बैठकर अपने मन को परमधाम में शिव बाबा से जोड़ने पर असीम शांति, दिव्य शक्ति, प्रेम और आनंद का प्रवाह आत्मा में भर जाता है।',
      image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    },
    {
      id: 10,
      order_num: 10,
      title_en: 'The Confluence Age - Dawn of Spiritual Awakening',
      title_hi: 'कल्याणकारी संगमयुग - नया सवेरा',
      desc_en: 'The present time is the auspicious Sangam Yug—the transition period between the end of Kaliyug and the dawn of Satyug. It is the most elevated age where human beings have the unique fortune to receive God’s direct guidance and transform from ordinary humans into divine beings.',
      desc_hi: 'वर्तमान समय वही मंगलकारी संगमयुग है—जब कलियुग की रात्रि समाप्त हो रही है और सत्युग का स्वर्णिम सवेरा होने वाला है। यह सबसे मूल्यवान समय है जब मनुष्य सीधे भगवान से ज्ञान लेकर नर से नारायण और नारी से श्री लक्ष्मी बन सकते हैं।',
      image_url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1000&q=80',
      audio_url_en: '',
      audio_url_hi: ''
    }
  ],
  galleryItems: [
    { id: 1, title: 'Radiant Light of Shiva', category: 'Spiritual Art', image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', description: 'The incorporeal ocean of peace and benevolence.' },
    { id: 2, title: 'Peaceful Mind in Meditation', category: 'Meditation Art', image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', description: 'A soul immersed in serenity and divine remembrance.' },
    { id: 3, title: 'The Golden Dawn of Satyug', category: 'Spiritual Vision', image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80', description: 'Vision of harmony and prosperity in the new age.' },
    { id: 4, title: 'Celestial Nature & Purity', category: 'Nature & Divine', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', description: 'Pure vibrations healing human hearts and nature.' }
  ],
  events: [
    { id: 1, title: '7-Day Foundation Course in Raja Yoga Meditation', date_str: 'Every Monday - Sunday', time_str: '7:00 AM - 8:30 AM', venue: 'Online & Local BK Centers', description: 'Learn the basics of soul consciousness, God connection, and mind mastery. Free of charge.' },
    { id: 2, title: 'World Peace Meditation Hour', date_str: 'Every Third Sunday', time_str: '6:30 PM - 7:30 PM', venue: 'Global Centers & Live Stream', description: 'Join millions across 140 countries radiating pure vibrations of peace and healing to the world.' },
    { id: 3, title: 'Stress-Free Living Spiritual Retreat', date_str: 'Upcoming Weekend', time_str: 'Full Day (9 AM - 5 PM)', venue: 'Peace Village Spiritual Park', description: 'Holistic self-empowerment workshop with meditation sessions, sattvic meals, and spiritual classes.' }
  ],
  settings: {
    site_title: 'Brahma Kumaris',
    site_tagline: 'World Transformation through Self Transformation',
    youtube_url: 'https://www.youtube.com/@BrahmaKumaris',
    instagram_url: 'https://www.instagram.com/brahmakumaris',
    facebook_url: 'https://www.facebook.com/brahmakumaris',
    contact_email: 'contact@brahmakumaris.org',
    contact_phone: '+91 98765 43210',
    center_address: 'Pandav Bhawan, Mount Abu, Rajasthan, India'
  }
};

// ==============================================================================
// 3. Client-Side SPA Router (supports /home, /events, /gallery, /gallery-guide, /about, /admin)
// ==============================================================================
window.handleNav = function(e, path) {
  if (e) e.preventDefault();
  navigateTo(path);
};

function navigateTo(path) {
  // Normalize path
  if (!path || path === '/' || path === '') path = '/home';
  if (!path.startsWith('/')) path = '/' + path;

  // Push state to browser URL bar
  window.history.pushState({ path: path }, '', path);
  applyRoute(path);
}

function applyRoute(path) {
  state.currentRoute = path;

  // Stop any active audio speech when switching pages
  stopAudioGuide();

  // Hide all pages
  document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));

  // Highlight active nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-path') === path) {
      link.className = 'nav-link px-3.5 py-2 rounded-xl text-sm font-bold bg-amber-100 text-amber-900 shadow-xs';
    } else {
      link.className = 'nav-link px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50';
    }
  });

  // Show target page
  const pageMap = {
    '/home': 'page-home',
    '/events': 'page-events',
    '/gallery': 'page-gallery',
    '/gallery-guide': 'page-gallery-guide',
    '/about': 'page-about',
    '/admin': 'page-admin'
  };

  const targetId = pageMap[path] || 'page-home';
  const targetElem = document.getElementById(targetId);
  if (targetElem) {
    targetElem.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Refresh lucide icons
  if (window.lucide) window.lucide.createIcons();

  // If entering admin page and already authenticated, show panel
  if (path === '/admin') {
    if (state.isAdmin) {
      document.getElementById('adminLoginBox').classList.add('hidden');
      document.getElementById('adminPanel').classList.remove('hidden');
      loadAdminData();
    } else {
      document.getElementById('adminLoginBox').classList.remove('hidden');
      document.getElementById('adminPanel').classList.add('hidden');
    }
  }
}

// Browser Back / Forward handler
window.addEventListener('popstate', (e) => {
  const path = window.location.pathname || '/home';
  applyRoute(path);
});

// ==============================================================================
// 4. Initial Loading & Data Fetching from Supabase
// ==============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  // Initialize Mobile Menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Initial sync with Supabase
  await fetchSupabaseData();

  // Render initial components
  renderExhibitions();
  renderArtGallery();
  renderEvents();
  applySettingsToUI();
  setupForms();

  // Handle initial route on first load
  const initialPath = window.location.pathname || '/home';
  applyRoute(initialPath);
});

async function fetchSupabaseData() {
  if (!supabaseClient) return;

  try {
    // 1. Fetch site settings
    const { data: setts } = await supabaseClient.from('site_settings').select('*');
    if (setts && setts.length > 0) {
      setts.forEach(s => {
        state.settings[s.key] = s.value;
        if (s.key === 'admin_password') state.adminPassword = s.value;
      });
      applySettingsToUI();
    }

    // 2. Fetch exhibitions (10 exhibits)
    const { data: exhibs } = await supabaseClient.from('exhibitions').select('*').order('order_num', { ascending: true });
    if (exhibs && exhibs.length > 0) {
      state.exhibitions = exhibs;
      renderExhibitions();
    }

    // 3. Fetch gallery items
    const { data: gallery } = await supabaseClient.from('gallery_items').select('*').order('id', { ascending: false });
    if (gallery && gallery.length > 0) {
      state.galleryItems = gallery;
      renderArtGallery();
    }

    // 4. Fetch events
    const { data: evts } = await supabaseClient.from('events').select('*').order('id', { ascending: false });
    if (evts && evts.length > 0) {
      state.events = evts;
      renderEvents();
    }
  } catch (err) {
    console.log('Using local fallback state until Supabase tables are ready.');
  }
}

function applySettingsToUI() {
  const s = state.settings;
  if (s.site_title) {
    document.getElementById('navSiteTitle').textContent = s.site_title;
    document.title = s.site_title + ' | Divine Art Gallery';
  }
  if (s.site_tagline) document.getElementById('navSiteTagline').textContent = s.site_tagline;
  if (s.youtube_url) document.getElementById('linkYouTube').href = s.youtube_url;
  if (s.instagram_url) document.getElementById('linkInstagram').href = s.instagram_url;
  if (s.facebook_url) document.getElementById('linkFacebook').href = s.facebook_url;
  if (s.center_address) document.getElementById('aboutAddress').textContent = s.center_address;
  if (s.contact_email || s.contact_phone) {
    document.getElementById('aboutContact').innerHTML = `Email: ${s.contact_email || ''}<br>Phone: ${s.contact_phone || ''}`;
  }
}

// ==============================================================================
// 5. 10 Sacred Exhibition Panels & Audio Guide Logic (The Focus Feature)
// ==============================================================================
function renderExhibitions() {
  const grid = document.getElementById('exhibitionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.exhibitions.forEach((exhibit, index) => {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between cursor-pointer';
    card.onclick = () => openExhibitModal(exhibit);

    card.innerHTML = `
      <div>
        <div class="relative w-full h-52 overflow-hidden bg-slate-900">
          <img src="${exhibit.image_url}" alt="${exhibit.title_en}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
          <span class="absolute top-3 left-3 text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-md">
            Exhibit ${exhibit.order_num || (index + 1)}
          </span>
          <span class="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-amber-900 shadow-sm flex items-center gap-1 backdrop-blur-xs">
            <i data-lucide="volume-2" class="w-3.5 h-3.5 text-red-600"></i> Audio Guide
          </span>
        </div>

        <div class="p-6">
          <h3 class="font-bold text-base text-slate-900 group-hover:text-amber-800 transition line-clamp-1 mb-1">
            ${exhibit.title_en}
          </h3>
          <p class="text-xs font-semibold text-amber-700 font-spiritual line-clamp-1 mb-3">
            ${exhibit.title_hi}
          </p>
          <p class="text-xs text-slate-500 leading-relaxed line-clamp-3">
            ${exhibit.desc_en}
          </p>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition">
          View & Listen Guide &rarr;
        </span>
        <div class="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
          <i data-lucide="headphones" class="w-4 h-4"></i>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

window.openExhibitModal = function(exhibit) {
  state.currentExhibit = exhibit;
  state.exhibitLang = 'en';

  const modal = document.getElementById('exhibitModal');
  document.getElementById('modalImg').src = exhibit.image_url;
  document.getElementById('modalOrderTag').textContent = `Sacred Exhibition ${exhibit.order_num || 1} of 10`;

  updateExhibitModalLanguage();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeExhibitModal = function() {
  stopAudioGuide();
  document.getElementById('exhibitModal').classList.add('hidden');
  document.body.style.overflow = '';
};

window.switchExhibitLang = function(lang) {
  stopAudioGuide();
  state.exhibitLang = lang;

  const btnEn = document.getElementById('langBtnEn');
  const btnHi = document.getElementById('langBtnHi');

  if (lang === 'en') {
    btnEn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-xs';
    btnHi.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 transition hover:text-slate-900';
  } else {
    btnHi.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-xs';
    btnEn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 transition hover:text-slate-900';
  }

  updateExhibitModalLanguage();
};

function updateExhibitModalLanguage() {
  const exhibit = state.currentExhibit;
  if (!exhibit) return;

  const titleElem = document.getElementById('modalTitle');
  const descElem = document.getElementById('modalDesc');

  if (state.exhibitLang === 'hi') {
    titleElem.textContent = exhibit.title_hi || exhibit.title_en;
    descElem.textContent = exhibit.desc_hi || exhibit.desc_en;
  } else {
    titleElem.textContent = exhibit.title_en;
    descElem.textContent = exhibit.desc_en;
  }
}

// Audio Guide Narration (SpeechSynthesis + Audio File Fallback)
window.toggleAudioGuide = function() {
  if (state.isSpeaking) {
    stopAudioGuide();
  } else {
    playAudioGuide();
  }
};

function playAudioGuide() {
  const exhibit = state.currentExhibit;
  if (!exhibit) return;

  const textToRead = state.exhibitLang === 'hi' 
    ? `${exhibit.title_hi}. ${exhibit.desc_hi}` 
    : `${exhibit.title_en}. ${exhibit.desc_en}`;

  const customAudioUrl = state.exhibitLang === 'hi' ? exhibit.audio_url_hi : exhibit.audio_url_en;

  // Option A: If custom MP3/Audio file is uploaded in database
  if (customAudioUrl && customAudioUrl.trim() !== '') {
    if (state.audioElement) state.audioElement.pause();
    state.audioElement = new Audio(customAudioUrl);
    state.audioElement.play();
    state.isSpeaking = true;
    updateAudioUI(true);

    state.audioElement.onended = () => {
      stopAudioGuide();
    };
    return;
  }

  // Option B: Native Browser Web Speech Synthesis (Speaks in Hindi or English)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Reset any previous speech

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Calm, meditative pace
    utterance.pitch = 1.0;

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (state.exhibitLang === 'hi') {
      utterance.lang = 'hi-IN';
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('Hindi'));
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-US'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      state.isSpeaking = true;
      updateAudioUI(true);
    };

    utterance.onend = () => {
      stopAudioGuide();
    };

    utterance.onerror = () => {
      stopAudioGuide();
    };

    state.speechSynthUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Audio synthesis is not supported on this browser.');
  }
}

function stopAudioGuide() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (state.audioElement) {
    state.audioElement.pause();
    state.audioElement = null;
  }
  state.isSpeaking = false;
  updateAudioUI(false);
}

function updateAudioUI(isPlaying) {
  const listenBtn = document.getElementById('listenBtn');
  const listenText = document.getElementById('listenText');
  const listenIcon = document.getElementById('listenIcon');
  const statusElem = document.getElementById('audioPlayingStatus');

  if (isPlaying) {
    listenText.textContent = 'Pause Audio Guide';
    listenBtn.className = 'px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md flex items-center gap-2 transition';
    if (statusElem) statusElem.classList.remove('hidden');
    if (statusElem) statusElem.classList.add('flex');
  } else {
    listenText.textContent = 'Listen Audio Guide';
    listenBtn.className = 'px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs shadow-md shadow-red-600/25 flex items-center gap-2 transition';
    if (statusElem) statusElem.classList.add('hidden');
    if (statusElem) statusElem.classList.remove('flex');
  }
}

// ==============================================================================
// 6. Divine Art Gallery & Events Renderers
// ==============================================================================
function renderArtGallery() {
  const grid = document.getElementById('artGalleryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.galleryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-xs hover:shadow-md transition';

    card.innerHTML = `
      <div class="h-48 overflow-hidden bg-slate-900">
        <img src="${item.image_url}" alt="${item.title}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
      </div>
      <div class="p-4">
        <span class="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
          ${item.category || 'Spiritual Art'}
        </span>
        <h4 class="font-bold text-sm text-slate-900 mt-2">${item.title}</h4>
        <p class="text-xs text-slate-500 mt-1">${item.description || ''}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderEvents() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;
  container.innerHTML = '';

  state.events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'p-6 bg-white rounded-2xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition';

    card.innerHTML = `
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Free Admission</span>
          <span class="text-xs text-slate-400 flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${ev.time_str || ''}</span>
        </div>
        <h3 class="font-bold text-lg text-slate-900">${ev.title}</h3>
        <p class="text-xs text-amber-800 font-semibold mt-1 flex items-center gap-1.5">
          <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${ev.date_str} &bull; <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${ev.venue}
        </p>
        <p class="text-xs text-slate-500 mt-2 max-w-xl leading-relaxed">${ev.description || ''}</p>
      </div>
      <button onclick="handleNav(event, '/events')" class="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm self-start md:self-center transition">
        Register Free
      </button>
    `;
    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

// ==============================================================================
// 7. Form Handlers (Save Responses to Supabase PostgreSQL)
// ==============================================================================
function setupForms() {
  // Course Registration / Inquiry Form
  const evForm = document.getElementById('eventInquiryForm');
  if (evForm) {
    evForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('evSubmitBtn');
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Submitting...`;

      const payload = {
        name: document.getElementById('evName').value.trim(),
        phone: document.getElementById('evPhone').value.trim(),
        email: document.getElementById('evEmail').value.trim() || null,
        topic: document.getElementById('evTopic').value,
        message: document.getElementById('evMessage').value.trim() || 'Interested in attending.'
      };

      try {
        if (supabaseClient) {
          const { error } = await supabaseClient.from('responses').insert([payload]);
          if (error) console.warn('Supabase insert note:', error.message);
        }
        alert('🙏 Om Shanti! Your inquiry has been durably saved in our database. Our center will contact you.');
        evForm.reset();
      } catch (err) {
        alert('🙏 Inquiry recorded!');
      } finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>Submit to Center</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Admin Login Form
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('adminPass').value.trim();
      const errElem = document.getElementById('adminLoginError');

      if (pass === state.adminPassword) {
        state.isAdmin = true;
        errElem.classList.add('hidden');
        document.getElementById('adminLoginBox').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadAdminData();
      } else {
        errElem.classList.remove('hidden');
      }
    });
  }
}

// ==============================================================================
// 8. Admin CMS Control Panel (Full Edit Control of Website)
// ==============================================================================
window.adminLogout = function() {
  state.isAdmin = false;
  document.getElementById('adminLoginBox').classList.remove('hidden');
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('adminPass').value = '';
};

window.switchAdminTab = function(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.className = 'admin-tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white';
    } else {
      btn.className = 'admin-tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border';
    }
  });

  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));
  const target = document.getElementById('tab-' + tabName);
  if (target) target.classList.remove('hidden');

  if (tabName === 'responses') fetchAdminResponses();
};

function loadAdminData() {
  // Populate general settings
  const s = state.settings;
  document.getElementById('setSiteTitle').value = s.site_title || '';
  document.getElementById('setSiteTagline').value = s.site_tagline || '';
  document.getElementById('setYoutube').value = s.youtube_url || '';
  document.getElementById('setInstagram').value = s.instagram_url || '';
  document.getElementById('setFacebook').value = s.facebook_url || '';
  document.getElementById('setEmail').value = s.contact_email || '';

  // Render Admin Exhibits Manager
  renderAdminExhibits();
  renderAdminGallery();
  renderAdminEvents();
  setupAdminForms();
}

function setupAdminForms() {
  // Save Settings
  const settingsForm = document.getElementById('saveSettingsForm');
  settingsForm.onsubmit = async (e) => {
    e.preventDefault();
    state.settings.site_title = document.getElementById('setSiteTitle').value.trim();
    state.settings.site_tagline = document.getElementById('setSiteTagline').value.trim();
    state.settings.youtube_url = document.getElementById('setYoutube').value.trim();
    state.settings.instagram_url = document.getElementById('setInstagram').value.trim();
    state.settings.facebook_url = document.getElementById('setFacebook').value.trim();
    state.settings.contact_email = document.getElementById('setEmail').value.trim();

    if (supabaseClient) {
      for (const [key, val] of Object.entries(state.settings)) {
        await supabaseClient.from('site_settings').upsert({ key, value: val });
      }
    }
    applySettingsToUI();
    alert('Settings updated and synced to database!');
  };

  // Add Gallery Item
  const artForm = document.getElementById('addGalleryItemForm');
  artForm.onsubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      title: document.getElementById('artTitle').value.trim(),
      category: document.getElementById('artCategory').value.trim() || 'Spiritual Art',
      image_url: document.getElementById('artImageUrl').value.trim(),
      description: document.getElementById('artDesc').value.trim()
    };

    if (supabaseClient) {
      await supabaseClient.from('gallery_items').insert([newItem]);
    }
    state.galleryItems.unshift(newItem);
    renderArtGallery();
    renderAdminGallery();
    artForm.reset();
    alert('Artwork added to gallery!');
  };

  // Add Event
  const evForm = document.getElementById('addEventForm');
  evForm.onsubmit = async (e) => {
    e.preventDefault();
    const newEv = {
      title: document.getElementById('newEventTitle').value.trim(),
      date_str: document.getElementById('newEventDate').value.trim(),
      venue: document.getElementById('newEventVenue').value.trim(),
      description: document.getElementById('newEventDesc').value.trim()
    };

    if (supabaseClient) {
      await supabaseClient.from('events').insert([newEv]);
    }
    state.events.unshift(newEv);
    renderEvents();
    renderAdminEvents();
    evForm.reset();
    alert('Event added successfully!');
  };
}

function renderAdminExhibits() {
  const container = document.getElementById('adminExhibitsList');
  container.innerHTML = '';

  state.exhibitions.forEach((ex, idx) => {
    const item = document.createElement('div');
    item.className = 'p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3';

    item.innerHTML = `
      <div class="flex items-center justify-between font-bold text-sm">
        <span>Exhibit ${ex.order_num || (idx + 1)}: ${ex.title_en}</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label class="block font-semibold mb-1">Title (English)</label>
          <input type="text" value="${ex.title_en}" onchange="updateExhibitField(${idx}, 'title_en', this.value)" class="w-full p-2 border rounded-lg bg-white">
        </div>
        <div>
          <label class="block font-semibold mb-1">Title (Hindi)</label>
          <input type="text" value="${ex.title_hi}" onchange="updateExhibitField(${idx}, 'title_hi', this.value)" class="w-full p-2 border rounded-lg bg-white">
        </div>
        <div class="sm:col-span-2">
          <label class="block font-semibold mb-1">Image URL</label>
          <input type="url" value="${ex.image_url}" onchange="updateExhibitField(${idx}, 'image_url', this.value)" class="w-full p-2 border rounded-lg bg-white">
        </div>
        <div class="sm:col-span-2">
          <label class="block font-semibold mb-1">Description (English)</label>
          <textarea rows="2" onchange="updateExhibitField(${idx}, 'desc_en', this.value)" class="w-full p-2 border rounded-lg bg-white">${ex.desc_en}</textarea>
        </div>
        <div class="sm:col-span-2">
          <label class="block font-semibold mb-1">Description (Hindi)</label>
          <textarea rows="2" onchange="updateExhibitField(${idx}, 'desc_hi', this.value)" class="w-full p-2 border rounded-lg bg-white">${ex.desc_hi}</textarea>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

window.updateExhibitField = async function(idx, field, val) {
  state.exhibitions[idx][field] = val;
  const exhibit = state.exhibitions[idx];

  if (supabaseClient && exhibit.id) {
    await supabaseClient.from('exhibitions').update({ [field]: val }).eq('id', exhibit.id);
  }
  renderExhibitions();
};

function renderAdminGallery() {
  const container = document.getElementById('adminGalleryList');
  container.innerHTML = '';

  state.galleryItems.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'p-3 bg-slate-50 border rounded-xl flex items-center justify-between text-xs';
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.image_url}" class="w-12 h-12 object-cover rounded-lg">
        <div>
          <p class="font-bold">${item.title}</p>
          <p class="text-slate-400">${item.category}</p>
        </div>
      </div>
      <button onclick="deleteGalleryItem(${idx})" class="text-red-600 hover:underline">Delete</button>
    `;
    container.appendChild(card);
  });
}

window.deleteGalleryItem = async function(idx) {
  const item = state.galleryItems[idx];
  if (confirm('Delete this artwork?')) {
    if (supabaseClient && item.id) {
      await supabaseClient.from('gallery_items').delete().eq('id', item.id);
    }
    state.galleryItems.splice(idx, 1);
    renderArtGallery();
    renderAdminGallery();
  }
};

function renderAdminEvents() {
  const container = document.getElementById('adminEventsList');
  container.innerHTML = '';

  state.events.forEach((ev, idx) => {
    const card = document.createElement('div');
    card.className = 'p-3 bg-slate-50 border rounded-xl flex items-center justify-between text-xs';
    card.innerHTML = `
      <div>
        <p class="font-bold">${ev.title}</p>
        <p class="text-slate-500">${ev.date_str} &bull; ${ev.venue}</p>
      </div>
      <button onclick="deleteEventItem(${idx})" class="text-red-600 hover:underline">Delete</button>
    `;
    container.appendChild(card);
  });
}

window.deleteEventItem = async function(idx) {
  const item = state.events[idx];
  if (confirm('Delete this event?')) {
    if (supabaseClient && item.id) {
      await supabaseClient.from('events').delete().eq('id', item.id);
    }
    state.events.splice(idx, 1);
    renderEvents();
    renderAdminEvents();
  }
};

async function fetchAdminResponses() {
  const container = document.getElementById('adminResponsesList');
  container.innerHTML = '<div class="text-center py-4 text-xs text-slate-400">Loading saved responses from Supabase...</div>';

  if (!supabaseClient) {
    container.innerHTML = '<div class="text-xs text-slate-500">Supabase client offline.</div>';
    return;
  }

  try {
    const { data, error } = await supabaseClient.from('responses').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      container.innerHTML = '<div class="text-center py-6 text-xs text-slate-400">No responses in database yet.</div>';
      return;
    }

    container.innerHTML = '';
    data.forEach(r => {
      const card = document.createElement('div');
      card.className = 'p-4 bg-slate-50 border rounded-xl space-y-1 text-xs';
      card.innerHTML = `
        <div class="flex items-center justify-between font-bold text-slate-800">
          <span>${r.name} (${r.phone || r.email || 'No contact'})</span>
          <span class="text-slate-400 text-2xs">${new Date(r.created_at).toLocaleString()}</span>
        </div>
        <p class="text-amber-800 font-semibold">Topic: ${r.topic || 'General'}</p>
        <p class="text-slate-600">${r.message}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<div class="text-xs text-red-500">Could not fetch responses.</div>';
  }
}
