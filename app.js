// Supabase Configuration
const SUPABASE_URL = 'https://pqwapzibbbdurdkjismr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd2FwemliYmJkdXJka2ppc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjA5NTIsImV4cCI6MjEwNzYzNjk1Mn0.H9Vn3tIWuAR-pq4kgccsjrNMh1j0NBVKzxBx-El0JZQ';

// Initialize Supabase Client
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// State
let selectedRating = 5;
let currentFilter = 'all';
let mediaItems = [];

// Fallback demo media in case tables haven't been created yet
const fallbackMedia = [
  {
    id: 'demo-audio-1',
    type: 'audio',
    title: 'Acoustic Soundscape (Demo Audio)',
    description: 'Dynamic audio file hosted via cloud CDN, loaded directly by your static website.',
    media_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'demo-video-1',
    type: 'video',
    title: 'Open Source Showcase (Demo Video)',
    description: 'Embedded video player dynamically pulled from your database records.',
    media_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  initRatingPicker();
  checkDatabaseConnection();
  loadMedia();
  loadResponses();
  setupAdminModal();
  setupForms();
});

// Check Database Connection
async function checkDatabaseConnection() {
  const statusText = document.getElementById('dbStatusText');
  const banner = document.getElementById('dbStatusBanner');

  if (!supabaseClient) {
    statusText.textContent = 'Supabase SDK not loaded.';
    return;
  }

  try {
    const { data, error } = await supabaseClient.from('responses').select('id').limit(1);
    if (error && error.code === '42P01') {
      // Table does not exist yet
      statusText.innerHTML = 'Supabase Connected! <strong>Note:</strong> Run SQL setup to create tables.';
      banner.className = 'mt-8 max-w-md mx-auto p-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300';
    } else if (error) {
      statusText.textContent = 'Connected to Supabase (' + (error.message || 'Ready') + ')';
    } else {
      statusText.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1"></span> Supabase Connected & Tables Active!';
      banner.className = 'mt-8 max-w-md mx-auto p-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300';
    }
  } catch (err) {
    statusText.textContent = 'Supabase API reachable!';
  }
}

// Rating Picker
function initRatingPicker() {
  const buttons = document.querySelectorAll('.star-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.getAttribute('data-val'));
      document.getElementById('ratingValue').textContent = `${selectedRating} / 5`;
      updateStarUI();
    });
  });
}

function updateStarUI() {
  const buttons = document.querySelectorAll('.star-btn');
  buttons.forEach(btn => {
    const val = parseInt(btn.getAttribute('data-val'));
    if (val <= selectedRating) {
      btn.className = 'star-btn text-amber-400';
    } else {
      btn.className = 'star-btn text-slate-300 dark:text-slate-700';
    }
  });
}

// Media Filtering
window.filterMedia = function(type) {
  currentFilter = type;
  document.querySelectorAll('.media-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === type) {
      btn.className = 'media-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white';
    } else {
      btn.className = 'media-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700';
    }
  });
  renderMedia();
};

// Load Media from Supabase
async function loadMedia() {
  try {
    const { data, error } = await supabaseClient.from('media_items').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      mediaItems = data;
    } else {
      mediaItems = fallbackMedia;
    }
  } catch (e) {
    mediaItems = fallbackMedia;
  }
  renderMedia();
}

// Render Media Items
function renderMedia() {
  const grid = document.getElementById('mediaGrid');
  grid.innerHTML = '';

  const filtered = currentFilter === 'all' ? mediaItems : mediaItems.filter(m => m.type === currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400 text-sm">No ${currentFilter} items found. Use "Manage Content" to add one!</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition';

    let mediaEmbed = '';
    if (item.type === 'audio') {
      mediaEmbed = `
        <div class="bg-indigo-50/60 dark:bg-indigo-950/40 rounded-xl p-4 mb-4 flex flex-col items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-600/30">
            <i data-lucide="headphones" class="w-6 h-6"></i>
          </div>
          <audio controls class="w-full h-9">
            <source src="${item.media_url}" type="audio/mpeg">
            Your browser does not support audio element.
          </audio>
        </div>
      `;
    } else if (item.type === 'video') {
      let videoSrc = item.media_url;
      // Convert standard YouTube watch link to embed format if needed
      if (videoSrc.includes('watch?v=')) {
        videoSrc = videoSrc.replace('watch?v=', 'embed/');
      } else if (videoSrc.includes('youtu.be/')) {
        videoSrc = videoSrc.replace('youtu.be/', 'www.youtube.com/embed/');
      }

      if (videoSrc.includes('youtube.com') || videoSrc.includes('vimeo.com')) {
        mediaEmbed = `
          <div class="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950">
            <iframe class="absolute inset-0 w-full h-full" src="${videoSrc}" title="${item.title}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
        `;
      } else {
        mediaEmbed = `
          <div class="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950">
            <video controls class="w-full h-full object-cover">
              <source src="${videoSrc}">
            </video>
          </div>
        `;
      }
    }

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${item.type === 'audio' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}">
            ${item.type}
          </span>
        </div>
        ${mediaEmbed}
        <h3 class="font-bold text-base mb-1">${escapeHtml(item.title)}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${escapeHtml(item.description || 'Dynamic media content.')}</p>
      </div>
    `;

    grid.appendChild(card);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Load Stored Responses from Supabase
async function loadResponses() {
  const container = document.getElementById('responsesList');
  container.innerHTML = '<div class="p-6 text-center text-slate-400 text-sm">Fetching responses from Supabase...</div>';

  try {
    const { data, error } = await supabaseClient
      .from('responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <i data-lucide="inbox" class="w-8 h-8 text-slate-300 mx-auto mb-2"></i>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">No responses recorded yet</p>
          <p class="text-xs text-slate-400 mt-1">Be the first to submit a message on the left!</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs';

      const stars = '★'.repeat(item.rating || 5) + '☆'.repeat(5 - (item.rating || 5));
      const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

      card.innerHTML = `
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-slate-800 dark:text-slate-200">${escapeHtml(item.name)}</span>
            <span class="text-2xs text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${escapeHtml(item.category || 'General')}</span>
          </div>
          <span class="text-xs font-medium text-amber-500">${stars}</span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-normal mb-2">${escapeHtml(item.message)}</p>
        <div class="text-2xs text-xs text-slate-400 flex items-center gap-1">
          <i data-lucide="clock" class="w-3 h-3"></i>
          ${dateStr}
        </div>
      `;
      container.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    container.innerHTML = `<div class="p-4 text-center text-xs text-rose-500">Could not load responses. Check database connection.</div>`;
  }
}

// Form Handlers
function setupForms() {
  const form = document.getElementById('responseForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Saving to database...`;
    if (window.lucide) window.lucide.createIcons();

    const payload = {
      name: document.getElementById('respName').value.trim(),
      email: document.getElementById('respEmail').value.trim() || null,
      category: document.getElementById('respCategory').value,
      rating: selectedRating,
      message: document.getElementById('respMessage').value.trim()
    };

    try {
      const { data, error } = await supabaseClient.from('responses').insert([payload]);
      if (error) {
        throw error;
      }
      form.reset();
      selectedRating = 5;
      updateStarUI();
      alert('🎉 Response durably stored in Supabase!');
      loadResponses();
    } catch (err) {
      console.error(err);
      alert('Error saving response: ' + (err.message || 'Make sure the responses table exists in Supabase!'));
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>Save to Supabase</span>`;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Add media form
  const mediaForm = document.getElementById('addMediaForm');
  mediaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('saveMediaBtn');
    btn.disabled = true;

    const payload = {
      type: document.getElementById('newMediaType').value,
      title: document.getElementById('newMediaTitle').value.trim(),
      media_url: document.getElementById('newMediaUrl').value.trim(),
      description: document.getElementById('newMediaDesc').value.trim()
    };

    try {
      const { error } = await supabaseClient.from('media_items').insert([payload]);
      if (error) throw error;
      alert('Media added successfully!');
      mediaForm.reset();
      closeAdminModal();
      loadMedia();
    } catch (err) {
      console.error(err);
      alert('Error saving media: ' + (err.message || 'Check Supabase table!'));
    } finally {
      btn.disabled = false;
    }
  });
}

// Admin Modal Management
function setupAdminModal() {
  document.getElementById('adminBtn').addEventListener('click', () => {
    document.getElementById('adminModal').classList.remove('hidden');
    document.getElementById('adminPinStep').classList.remove('hidden');
    document.getElementById('adminActionsStep').classList.add('hidden');
    document.getElementById('adminPinInput').value = '';
    document.getElementById('pinError').classList.add('hidden');
  });
}

window.closeAdminModal = function() {
  document.getElementById('adminModal').classList.add('hidden');
};

window.verifyPin = function() {
  const pin = document.getElementById('adminPinInput').value.trim();
  if (pin === '1234') {
    document.getElementById('adminPinStep').classList.add('hidden');
    document.getElementById('adminActionsStep').classList.remove('hidden');
  } else {
    document.getElementById('pinError').classList.remove('hidden');
  }
};

// Utilities
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
