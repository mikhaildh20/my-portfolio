document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.style.boxShadow = current > 12 ? 'rgba(0,0,0,0.10) 0 1px 0' : 'rgba(0,0,0,0.08) 0 1px 0';
}, { passive: true });

function applySettings(settings) {
  document.querySelectorAll('[data-setting]').forEach((element) => {
    const key = element.dataset.setting;
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      element.textContent = settings[key];
    }
  });

  document.querySelectorAll('[data-setting-href]').forEach((element) => {
    const key = element.dataset.settingHref;
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      element.setAttribute('href', settings[key]);
    }
  });

  document.querySelectorAll('[data-setting-src]').forEach((element) => {
    const key = element.dataset.settingSrc;
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      element.style.display = '';
      element.setAttribute('src', settings[key]);
    }
  });

  document.querySelectorAll('[data-setting-mailto]').forEach((element) => {
    const key = element.dataset.settingMailto;
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      element.setAttribute('href', `mailto:${settings[key]}`);
    }
  });

  if (settings.site_title) {
    document.title = settings.site_title;
  }

  if (settings.meta_description) {
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', settings.meta_description);
  }
}

async function loadSettings() {
  try {
    const response = await fetch('api/settings', { headers: { Accept: 'application/json' } });
    if (!response.ok) return;
    const payload = await response.json();
    if (payload?.settings) {
      applySettings(payload.settings);
    }
  } catch (error) {
    console.warn('Using static portfolio content because settings API is unavailable.', error);
  }
}

const portrait = document.querySelector('.portrait-frame img');
if (portrait) {
  portrait.addEventListener('error', () => {
    portrait.style.display = 'none';
  });
}

loadSettings();
