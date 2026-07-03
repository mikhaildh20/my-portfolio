document.getElementById('year').textContent = new Date().getFullYear();

const liveClock = document.getElementById('live-clock');
function updateLiveClock() {
  if (!liveClock) return;
  const now = new Date();
  const stamp = now.toLocaleString('en-GB', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).replace(',', '');
  liveClock.textContent = stamp;
  liveClock.dateTime = now.toISOString();
}
updateLiveClock();
setInterval(updateLiveClock, 1000);

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeaderState() {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function safeUrl(value = '#') {
  const text = String(value || '').trim();
  return text.startsWith('#') || text.startsWith('/') || text.startsWith('assets/') || text.startsWith('http://') || text.startsWith('https://') ? text : '#';
}

function numbered(value) {
  return String(value).padStart(2, '0');
}

function renderFocus(items = []) {
  const target = document.getElementById('focus-list');
  if (!target) return;
  target.innerHTML = items.map((item, index) => `
    <article class="focus-card ${['accent-blue', 'accent-cyan', 'accent-slate', 'accent-green'][index % 4]}">
      <span>${numbered(index + 1)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>`).join('');
}

function renderTech(items = []) {
  const target = document.getElementById('tech-list');
  if (!target) return;
  target.innerHTML = items.map((item, index) => `<span style="--i:${index}">${escapeHtml(item.label)}</span>`).join('');
}

function renderExperience(items = []) {
  const target = document.getElementById('experience-list');
  if (!target) return;
  target.innerHTML = items.map((item) => {
    const meta = [item.period, item.status]
      .filter((value) => String(value || '').trim() !== '')
      .map((value) => `<span>${escapeHtml(value)}</span>`)
      .join('');
    const location = String(item.location || '').trim()
      ? `<small>${escapeHtml(item.location)}</small>`
      : '';
    const description = String(item.description || '').trim()
      ? `<p>${escapeHtml(item.description)}</p>`
      : '';

    return `
      <article class="timeline-card">
        ${meta ? `<div class="timeline-meta">${meta}</div>` : ''}
        <h3>${escapeHtml(item.role)}</h3>
        <strong>${escapeHtml(item.company)}</strong>
        ${location}
        ${description}
      </article>`;
  }).join('');
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

function applyCollections(collections = {}) {
  renderFocus(collections.focusAreas || []);
  renderTech(collections.techItems || []);
  renderExperience(collections.experiences || []);
  renderEducation(collections.education || []);
  renderCertifications(collections.certifications || []);
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
      element.setAttribute('href', safeUrl(settings[key]));
    }
  });

  document.querySelectorAll('[data-setting-src]').forEach((element) => {
    const key = element.dataset.settingSrc;
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      element.style.display = '';
      element.setAttribute('src', safeUrl(settings[key]));
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

// Scroll reveal for static and dynamic sections.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -46px 0px' });

function observeReveals(root = document) {
  root.querySelectorAll('.section-shell:not(.hero), .project-panel, .focus-card, .timeline-card, .media-card').forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });
}

const contentObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) observeReveals(node);
    });
  });
});

['focus-list', 'experience-list', 'education-list', 'certification-list'].forEach(id => {
  const el = document.getElementById(id);
  if (el) contentObserver.observe(el, { childList: true });
});

function setupActiveNavigation() {
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.18, 0.32, 0.5], rootMargin: '-18% 0px -58% 0px' });

  sections.forEach(section => observer.observe(section));
}

function setupResponsiveCursor() {
  if (!supportsFinePointer || prefersReducedMotion) return;
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;

  const move = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    document.body.classList.add('cursor-ready');
  };

  const animate = () => {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerover', (event) => {
    document.body.classList.toggle('cursor-hover', Boolean(event.target.closest('a, button, .focus-card, .timeline-card, .media-card, .profile-card, .project-panel, .tag-cloud span')));
  });
  animate();
}

function setupTouchPulse() {
  if (supportsFinePointer || prefersReducedMotion) return;
  window.addEventListener('pointerdown', (event) => {
    const pulse = document.createElement('span');
    pulse.className = 'touch-pulse';
    pulse.style.left = `${event.clientX}px`;
    pulse.style.top = `${event.clientY}px`;
    document.body.appendChild(pulse);
    pulse.addEventListener('animationend', () => pulse.remove(), { once: true });
  }, { passive: true });
}

function setupTiltCards() {
  if (!supportsFinePointer || prefersReducedMotion) return;
  document.querySelectorAll('[data-tilt-card]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--ry', `${x * 5}deg`);
      card.style.setProperty('--rx', `${y * -5}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });
}

function setupScrollGraphic() {
  if (prefersReducedMotion) return;
  const graphic = document.querySelector('.hero-graphic');
  if (!graphic) return;
  window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / 600, 1);
    graphic.style.transform = `translate3d(0, ${progress * 34}px, 0) scale(${1 - progress * 0.035})`;
    graphic.style.opacity = String(0.88 - progress * 0.36);
  }, { passive: true });
}

loadSettings().then(() => observeReveals());
observeReveals();
setupActiveNavigation();
setupResponsiveCursor();
setupTouchPulse();
setupScrollGraphic();
setupTiltCards();
