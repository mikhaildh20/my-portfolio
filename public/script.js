document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.style.boxShadow = current > 12 ? 'rgba(0,0,0,0.10) 0 1px 0' : 'rgba(0,0,0,0.08) 0 1px 0';
}, { passive: true });

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function safeUrl(value = '#') {
  const text = String(value || '').trim();
  return text.startsWith('/') || text.startsWith('assets/') || text.startsWith('http://') || text.startsWith('https://') ? text : '#';
}

function numbered(value) {
  return String(value).padStart(2, '0');
}

function renderFocus(items = []) {
  const target = document.getElementById('focus-list');
  if (!target) return;
  target.innerHTML = items.map((item, index) => `
    <article class="focus-card ${['accent-blue', 'accent-pink', 'accent-red', ''][index % 4]}">
      <span>${numbered(index + 1)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>`).join('');
}

function renderTech(items = []) {
  const target = document.getElementById('tech-list');
  if (!target) return;
  target.innerHTML = items.map((item) => `<span>${escapeHtml(item.label)}</span>`).join('');
}

function renderExperience(items = []) {
  const target = document.getElementById('experience-list');
  if (!target) return;
  target.innerHTML = items.map((item) => `
    <article class="timeline-card">
      <div class="timeline-meta"><span>${escapeHtml(item.period)}</span><span>${escapeHtml(item.status)}</span></div>
      <h3>${escapeHtml(item.role)}</h3>
      <strong>${escapeHtml(item.company)}</strong>
      <small>${escapeHtml(item.location)}</small>
      <p>${escapeHtml(item.description)}</p>
    </article>`).join('');
}

function imageMarkup(path, alt) {
  const src = safeUrl(path);
  if (src === '#') return '<div class="media-placeholder">Preview</div>';
  return `<img src="${src}" alt="${escapeHtml(alt || 'Preview image')}" loading="lazy" />`;
}

function renderEducation(items = []) {
  const target = document.getElementById('education-list');
  if (!target) return;
  target.innerHTML = items.map((item) => `
    <article class="media-card">
      <div class="media-thumb">${imageMarkup(item.image_path, item.image_alt || item.school)}</div>
      <div class="media-body"><span class="eyebrow">${escapeHtml(item.year)}</span><h3>${escapeHtml(item.school)}</h3><p>${escapeHtml(item.description)}</p></div>
    </article>`).join('');
}

function renderCertifications(items = []) {
  const target = document.getElementById('certification-list');
  if (!target) return;
  target.innerHTML = items.map((item) => `
    <article class="media-card">
      <div class="media-thumb">${imageMarkup(item.image_path, item.image_alt || item.name)}</div>
      <div class="media-body"><span class="eyebrow">${escapeHtml(item.issuer)}</span><h3>${escapeHtml(item.name)}</h3>${item.pdf_path ? `<a class="btn secondary" href="${safeUrl(item.pdf_path)}" target="_blank" rel="noreferrer">Preview Certificate</a>` : ''}</div>
    </article>`).join('');
}

function renderProjects(items = []) {
  const target = document.getElementById('project-list');
  if (!target) return;
  target.innerHTML = items.map((item) => `
    <article class="project-showcase-card">
      <div class="project-image">${imageMarkup(item.image_path, item.image_alt || item.name)}</div>
      <div class="project-showcase-body"><span class="eyebrow">${escapeHtml(item.period)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p>${item.url ? `<a class="btn primary" href="${safeUrl(item.url)}" target="_blank" rel="noreferrer">Open Project</a>` : ''}</div>
    </article>`).join('');
}

function applyCollections(collections = {}) {
  renderFocus(collections.focusAreas || []);
  renderTech(collections.techItems || []);
  renderExperience(collections.experiences || []);
  renderEducation(collections.education || []);
  renderCertifications(collections.certifications || []);
  renderProjects(collections.projects || []);
}

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

  if (settings.site_title) document.title = settings.site_title;
  if (settings.meta_description) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', settings.meta_description);
  }
  applyCollections(settings.collections);
}

async function loadSettings() {
  try {
    const response = await fetch('api/settings', { headers: { Accept: 'application/json' } });
    if (!response.ok) return;
    const payload = await response.json();
    if (payload?.settings) applySettings(payload.settings);
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
