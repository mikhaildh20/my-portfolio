document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.style.boxShadow = current > 12 ? 'rgba(0,0,0,0.10) 0 1px 0' : 'rgba(0,0,0,0.08) 0 1px 0';
}, { passive: true });

const portrait = document.querySelector('.portrait-frame img');
if (portrait) {
  portrait.addEventListener('error', () => {
    portrait.style.display = 'none';
  });
}
