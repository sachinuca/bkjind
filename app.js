// ==============================================================================
// BRAHMA KUMARIS JIND - MOBILE-FIRST GLASSMORPHIC SPIRITUAL PORTAL ENGINE
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
    { id: 1, title: '7-Day Foundation Course in Raja Yoga', date_str: 'Daily & Online', time_str: '7:00 AM - 8:30 AM', venue: 'Brahma Kumaris Center, Jind', description: 'Understand soul, Supreme Soul Shiva, and master positive thinking.' },
    { id: 2, title: 'World Peace Meditation Hour', date_str: 'Every 3rd Sunday', time_str: '6:30 PM - 7:30 PM', venue: 'Global Centers & Live Stream', description: 'Radiating peaceful vibrations to heal humanity and nature.' },
    { id: 3, title: 'Stress-Free Living Weekend Retreat', date_str: 'Upcoming Weekend', time_str: '10:00 AM - 4:00 PM', venue: 'Brahma Kumaris Center, Jind', description: 'Recharge your inner battery with guided meditations and quiet time.' }
  ],
  settings: {
    site_title: 'Brahma Kumaris Jind',
    site_tagline: 'World Transformation through Self Transformation',
    youtube_url: 'https://www.youtube.com/@BrahmaKumaris',
    instagram_url: 'https://www.instagram.com/brahmakumaris',
    facebook_url: 'https://www.facebook.com/brahmakumaris',
    contact_email: 'jind@brahmakumaris.org',
    contact_phone: '+91 98765 43210',
    center_address: 'Brahma Kumaris Center, Jind, Haryana, India'
  }
};

// ==============================================================================
// 3. Client-Side SPA Router
// ==============================================================================
window.handleNav = function(e, path) {
  if (e) e.preventDefault();
  navigateTo(path);
};

function navigateTo(path) {
  if (!path || path === '/' || path === '') path = '/home';
  if (!path.startsWith('/')) path = '/' + path;

  window.history.pushState({ path: path }, '', path);
  applyRoute(path);
}

function applyRoute(path) {
  state.currentRoute = path;

  // Hide all pages
  document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));

  // Update desktop nav highlights
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-path') === path) {
      link.className = 'nav-link px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-500/15 text-amber-900 border border-amber-500/20';
    } else {
      link.className = 'nav-link px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white/60';
    }
  });

  // Update mobile bottom dock active states
  document.querySelectorAll('.mobile-tab').forEach(tab => {
    const tabPath = tab.getAttribute('data-path');
    if (tabPath === path) {
      tab.classList.remove('text-slate-500');
      tab.classList.add('text-amber-800', 'font-extrabold');
    } else {
      tab.classList.remove('text-amber-800', 'font-extrabold');
      tab.classList.add('text-slate-500');
    }
  });

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

  if (window.lucide) window.lucide.createIcons();

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

window.addEventListener('popstate', () => {
  const path = window.location.pathname || '/home';
  applyRoute(path);
});

// ==============================================================================
// 4. Initial Loading & Data Fetching from Supabase
// ==============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  await fetchSupabaseData();
  renderExhibitions();
  renderArtGallery();
  renderEvents();
  applySettingsToUI();
  setupForms();

  const initialPath = window.location.pathname || '/home';
  applyRoute(initialPath);
});

async function fetchSupabaseData() {
  if (!supabaseClient) return;

  try {
    const { data: setts } = await supabaseClient.from('site_settings').select('*');
    if (setts && setts.length > 0) {
      setts.forEach(s => {
        state.settings[s.key] = s.value;
        if (s.key === 'admin_password') state.adminPassword = s.value;
      });
      applySettingsToUI();
    }

    const { data: exhibs } = await supabaseClient.from('exhibitions').select('*').order('order_num', { ascending: true });
    if (exhibs && exhibs.length > 0) {
      state.exhibitions = exhibs;
      renderExhibitions();
    }

    const { data: gallery } = await supabaseClient.from('gallery_items').select('*').order('id', { ascending: false });
    if (gallery && gallery.length > 0) {
      state.galleryItems = gallery;
      renderArtGallery();
    }

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
  if (s.youtube_url) document.getElementById('linkYouTube').href = s.youtube_url;
  if (s.instagram_url) document.getElementById('linkInstagram').href = s.instagram_url;
  if (s.facebook_url) document.getElementById('linkFacebook').href = s.facebook_url;
  if (s.center_address) document.getElementById('aboutAddress').textContent = s.center_address;
  if (s.contact_email || s.contact_phone) {
    document.getElementById('aboutContact').innerHTML = `Email: ${s.contact_email || ''}<br>Phone: ${s.contact_phone || ''}`;
  }
}

// ==============================================================================
// 5. 10 Sacred Exhibition Panels & Mobile Audio Guide (No Cutoffs, Full Glass)
// ==============================================================================
function renderExhibitions() {
  const grid = document.getElementById('exhibitionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.exhibitions.forEach((exhibit, index) => {
    const card = document.createElement('div');
    card.className = 'glass-card rounded-3xl overflow-hidden transition active:scale-[0.99] flex flex-col justify-between';

    card.innerHTML = `
      <!-- Card Image & Header -->
      <div class="relative w-full h-52 sm:h-64 overflow-hidden bg-slate-950 cursor-pointer" onclick="openExhibitModalByIndex(${index})">
        <img src="${exhibit.image_url}" alt="${exhibit.title_en}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        <span class="absolute top-3 left-3 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-md">
          Sacred Exhibit ${exhibit.order_num || (index + 1)} of 10
        </span>
        <div class="absolute bottom-3 left-3.5 right-3.5 text-white">
          <h3 class="font-extrabold text-base sm:text-lg leading-snug">${exhibit.title_en}</h3>
          <p class="text-xs text-amber-200 font-bold mt-1 hindi-safe-text leading-relaxed">${exhibit.title_hi}</p>
        </div>
      </div>

      <!-- Card Body (Full unclipped description & 1-tap audio button) -->
      <div class="p-4 sm:p-5 space-y-3">
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed cursor-pointer hindi-safe-text" onclick="openExhibitModalByIndex(${index})">
          ${exhibit.desc_en}
        </p>

        <!-- Direct Actions Row -->
        <div class="pt-2 border-t border-amber-200/50 flex items-center justify-between gap-2">
          <button onclick="openExhibitModalByIndex(${index})" class="text-xs font-extrabold text-amber-800 hover:text-amber-900 flex items-center gap-1 active:scale-95 transition">
            <span>Read Details (हिन्दी / EN)</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>

          <!-- 1-Tap Listen Audio Button -->
          <button onclick="quickPlayExhibitAudio(event, ${index})" class="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-xs shadow-md shadow-red-600/25 flex items-center gap-1.5 shrink-0 active:scale-95 transition">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
            <span>Listen</span>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

window.openExhibitModalByIndex = function(index) {
  openExhibitModal(state.exhibitions[index]);
};

window.quickPlayExhibitAudio = function(e, index) {
  if (e) e.stopPropagation();
  state.currentExhibit = state.exhibitions[index];
  playAudioGuide();
};

window.openExhibitModal = function(exhibit) {
  state.currentExhibit = exhibit;
  state.exhibitLang = 'en';

  const modal = document.getElementById('exhibitModal');
  document.getElementById('modalImg').src = exhibit.image_url;
  document.getElementById('modalOrderTag').textContent = `Exhibit ${exhibit.order_num || 1} of 10`;

  updateExhibitModalLanguage();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeExhibitModal = function() {
  document.getElementById('exhibitModal').classList.add('hidden');
  document.body.style.overflow = '';
};

window.reopenCurrentExhibitModal = function() {
  if (state.currentExhibit) {
    openExhibitModal(state.currentExhibit);
  }
};

window.switchExhibitLang = function(lang) {
  state.exhibitLang = lang;

  const btnEn = document.getElementById('langBtnEn');
  const btnHi = document.getElementById('langBtnHi');

  if (lang === 'en') {
    btnEn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white';
    btnHi.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900';
  } else {
    btnHi.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white';
    btnEn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900';
  }

  updateExhibitModalLanguage();

  if (state.isSpeaking) {
    playAudioGuide();
  }
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

// Audio Guide Narration
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

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.88; // Meditative, clear pace
    utterance.pitch = 1.0;

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

    window.speechSynthesis.speak(utterance);
  } else {
    alert('Audio synthesis is not supported on this browser.');
  }
}

window.stopAudioGuide = function() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (state.audioElement) {
    state.audioElement.pause();
    state.audioElement = null;
  }
  state.isSpeaking = false;
  updateAudioUI(false);
};

function updateAudioUI(isPlaying) {
  const listenBtn = document.getElementById('listenBtn');
  const listenText = document.getElementById('listenText');
  const miniPlayer = document.getElementById('mobileMiniPlayer');
  const miniImg = document.getElementById('miniPlayerImg');
  const miniTitle = document.getElementById('miniPlayerTitle');
  const miniPlayIcon = document.getElementById('miniPlayIcon');

  if (isPlaying) {
    if (listenText) listenText.textContent = 'Pause Audio Guide';
    if (listenBtn) listenBtn.className = 'flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5';
    
    if (miniPlayer && state.currentExhibit) {
      miniImg.src = state.currentExhibit.image_url;
      miniTitle.textContent = state.exhibitLang === 'hi' ? state.currentExhibit.title_hi : state.currentExhibit.title_en;
      miniPlayer.classList.remove('hidden');
      miniPlayer.classList.add('flex');
      if (miniPlayIcon) miniPlayIcon.setAttribute('data-lucide', 'pause');
    }
  } else {
    if (listenText) listenText.textContent = 'Listen Audio Guide';
    if (listenBtn) listenBtn.className = 'flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5';
    
    if (miniPlayer) {
      miniPlayer.classList.add('hidden');
      miniPlayer.classList.remove('flex');
    }
  }

  if (window.lucide) window.lucide.createIcons();
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
    card.className = 'glass-card rounded-3xl overflow-hidden';

    card.innerHTML = `
      <div class="h-44 overflow-hidden bg-slate-900">
        <img src="${item.image_url}" alt="${item.title}" class="w-full h-full object-cover">
      </div>
      <div class="p-4 space-y-1">
        <span class="text-2xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20">
          ${item.category || 'Spiritual Art'}
        </span>
        <h4 class="font-extrabold text-sm text-slate-900 mt-1">${item.title}</h4>
        <p class="text-xs text-slate-500 leading-normal">${item.description || ''}</p>
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
    card.className = 'glass-card rounded-3xl p-4 sm:p-5 space-y-2';

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-2xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/20">Free Admission</span>
        <span class="text-2xs text-slate-500 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${ev.time_str || ''}</span>
      </div>
      <h3 class="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">${ev.title}</h3>
      <p class="text-xs text-amber-900 font-bold flex items-center gap-1">
        <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-700"></i> ${ev.venue} &bull; ${ev.date_str}
      </p>
      <p class="text-xs text-slate-600 leading-relaxed">${ev.description || ''}</p>
    `;
    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

// ==============================================================================
// 7. Form Handlers (Save Responses to Supabase PostgreSQL)
// ==============================================================================
function setupForms() {
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
        topic: document.getElementById('evTopic').value,
        message: document.getElementById('evMessage').value.trim() || 'Mobile enrollment.'
      };

      try {
        if (supabaseClient) {
          await supabaseClient.from('responses').insert([payload]);
        }
        alert('🙏 Om Shanti! Your registration has been saved in database. We will contact you on WhatsApp.');
        evForm.reset();
      } catch (err) {
        alert('🙏 Registration recorded!');
      } finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>Submit Registration to Center</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

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
// 8. Admin CMS Control Panel
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
      btn.className = 'admin-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white shrink-0';
    } else {
      btn.className = 'admin-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border shrink-0';
    }
  });

  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));
  const target = document.getElementById('tab-' + tabName);
  if (target) target.classList.remove('hidden');

  if (tabName === 'responses') fetchAdminResponses();
};

function loadAdminData() {
  const s = state.settings;
  document.getElementById('setSiteTitle').value = s.site_title || '';
  document.getElementById('setYoutube').value = s.youtube_url || '';
  document.getElementById('setInstagram').value = s.instagram_url || '';
  document.getElementById('setEmail').value = s.contact_email || '';

  renderAdminExhibits();
  renderAdminGallery();
  renderAdminEvents();
  setupAdminForms();
}

function setupAdminForms() {
  const settingsForm = document.getElementById('saveSettingsForm');
  settingsForm.onsubmit = async (e) => {
    e.preventDefault();
    state.settings.site_title = document.getElementById('setSiteTitle').value.trim();
    state.settings.youtube_url = document.getElementById('setYoutube').value.trim();
    state.settings.instagram_url = document.getElementById('setInstagram').value.trim();
    state.settings.contact_email = document.getElementById('setEmail').value.trim();

    if (supabaseClient) {
      for (const [key, val] of Object.entries(state.settings)) {
        await supabaseClient.from('site_settings').upsert({ key, value: val });
      }
    }
    applySettingsToUI();
    alert('Settings saved to database!');
  };

  const artForm = document.getElementById('addGalleryItemForm');
  artForm.onsubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      title: document.getElementById('artTitle').value.trim(),
      category: 'Spiritual Art',
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
    alert('Artwork added!');
  };

  const evForm = document.getElementById('addEventForm');
  evForm.onsubmit = async (e) => {
    e.preventDefault();
    const newEv = {
      title: document.getElementById('newEventTitle').value.trim(),
      date_str: document.getElementById('newEventDate').value.trim(),
      venue: document.getElementById('newEventVenue').value.trim()
    };

    if (supabaseClient) {
      await supabaseClient.from('events').insert([newEv]);
    }
    state.events.unshift(newEv);
    renderEvents();
    renderAdminEvents();
    evForm.reset();
    alert('Event added!');
  };
}

function renderAdminExhibits() {
  const container = document.getElementById('adminExhibitsList');
  container.innerHTML = '';

  state.exhibitions.forEach((ex, idx) => {
    const item = document.createElement('div');
    item.className = 'p-3 rounded-2xl border border-slate-200 bg-white/70 space-y-2 text-xs';

    item.innerHTML = `
      <div class="font-bold">Exhibit ${ex.order_num || (idx + 1)}: ${ex.title_en}</div>
      <input type="text" value="${ex.title_en}" onchange="updateExhibitField(${idx}, 'title_en', this.value)" class="w-full p-2.5 border rounded-xl bg-white" placeholder="Title (English)">
      <input type="text" value="${ex.title_hi}" onchange="updateExhibitField(${idx}, 'title_hi', this.value)" class="w-full p-2.5 border rounded-xl bg-white" placeholder="Title (Hindi)">
      <input type="url" value="${ex.image_url}" onchange="updateExhibitField(${idx}, 'image_url', this.value)" class="w-full p-2.5 border rounded-xl bg-white" placeholder="Image URL">
      <textarea rows="2" onchange="updateExhibitField(${idx}, 'desc_en', this.value)" class="w-full p-2.5 border rounded-xl bg-white" placeholder="Description (English)">${ex.desc_en}</textarea>
      <textarea rows="2" onchange="updateExhibitField(${idx}, 'desc_hi', this.value)" class="w-full p-2.5 border rounded-xl bg-white" placeholder="Description (Hindi)">${ex.desc_hi}</textarea>
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
    card.className = 'p-2.5 bg-white/70 border rounded-2xl flex items-center justify-between text-xs';
    card.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${item.image_url}" class="w-10 h-10 object-cover rounded-xl">
        <span class="font-bold">${item.title}</span>
      </div>
      <button onclick="deleteGalleryItem(${idx})" class="text-red-600 font-bold">Delete</button>
    `;
    container.appendChild(card);
  });
}

window.deleteGalleryItem = async function(idx) {
  const item = state.galleryItems[idx];
  if (confirm('Delete artwork?')) {
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
    card.className = 'p-2.5 bg-white/70 border rounded-2xl flex items-center justify-between text-xs';
    card.innerHTML = `
      <div>
        <p class="font-bold">${ev.title}</p>
        <p class="text-slate-400 text-2xs">${ev.date_str}</p>
      </div>
      <button onclick="deleteEventItem(${idx})" class="text-red-600 font-bold">Delete</button>
    `;
    container.appendChild(card);
  });
}

window.deleteEventItem = async function(idx) {
  const item = state.events[idx];
  if (confirm('Delete event?')) {
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
  container.innerHTML = '<div class="text-center py-4 text-xs text-slate-400">Loading responses...</div>';

  if (!supabaseClient) return;

  try {
    const { data } = await supabaseClient.from('responses').select('*').order('created_at', { ascending: false });
    if (!data || data.length === 0) {
      container.innerHTML = '<div class="text-center py-4 text-xs text-slate-400">No responses recorded yet.</div>';
      return;
    }

    container.innerHTML = '';
    data.forEach(r => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-white/70 border rounded-2xl text-xs space-y-1';
      card.innerHTML = `
        <div class="flex justify-between font-bold">
          <span>${r.name} (${r.phone || 'No phone'})</span>
          <span class="text-2xs text-slate-400">${new Date(r.created_at).toLocaleDateString()}</span>
        </div>
        <p class="text-amber-800 font-semibold">${r.topic || 'General'}</p>
        <p class="text-slate-600">${r.message}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<div class="text-xs text-red-500">Failed to load responses.</div>';
  }
}
