/* ============================================================
   The Great Convergence — interactions & chart rendering
   Data lives up top so it's easy to update from source reports.
   ============================================================ */

// 2025 Axalta North America breakdown, top six categories (the "wall")
const WALL_DATA = [
  { name: 'White',  value: 31, color: '#e9e6dd', tone: 'light' },
  { name: 'Gray',   value: 21, color: '#7c808a', tone: 'dark'  },
  { name: 'Black',  value: 19, color: '#1d1d22', tone: 'dark'  },
  { name: 'Blue',   value: 10, color: '#1e3a5f', tone: 'dark'  },
  { name: 'Silver', value:  8, color: '#b6b9bf', tone: 'light' },
  { name: 'Red',    value:  7, color: '#7c2d2d', tone: 'dark'  },
];
const REST_VALUE = 4; // green 2 + gold 1 + brown 1

// Grayscale share over time — plotted points in SVG coordinates.
// (Approximate pre-2000; see methodology A3.)
const CROSSOVER_POINTS = [
  [64, 220], [188, 192], [312, 151], [436, 116], [560, 100], [686, 88],
];

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- 1. Market-share wall ---- */
function renderWall() {
  const wall = document.getElementById('wall');
  if (!wall) return;

  const makeSegment = (name, value, color, tone, extraClass = '') => {
    const seg = document.createElement('div');
    seg.className = `seg ${tone} ${extraClass}`.trim();
    if (color) seg.style.background = color;
    seg.innerHTML = `<span class="pct">${value}</span><span class="nm">${name}</span>`;
    wall.appendChild(seg);
    // animate the width in after paint
    const target = value + '%';
    if (prefersReducedMotion) {
      seg.style.flexBasis = target;
    } else {
      requestAnimationFrame(() => setTimeout(() => { seg.style.flexBasis = target; }, 100));
    }
  };

  WALL_DATA.forEach(d => makeSegment(d.name, d.value, d.color, d.tone));
  makeSegment('rest', REST_VALUE, null, 'light', 'rest');
}

/* ---- 2. Crossover chart points ---- */
function renderCrossoverPoints() {
  const group = document.getElementById('gpts');
  if (!group) return;
  const NS = 'http://www.w3.org/2000/svg';
  CROSSOVER_POINTS.forEach(([x, y]) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
    c.setAttribute('r', 4.5);
    c.setAttribute('fill', 'var(--paper)');
    c.setAttribute('stroke', 'var(--ink)');
    c.setAttribute('stroke-width', '2.5');
    group.appendChild(c);
  });
}

/* ---- 3. Low-light toggle ---- */
function initLowLightToggle() {
  const row = document.getElementById('llrow');
  const btn = document.getElementById('lltoggle');
  const state = document.getElementById('llstate');
  if (!row || !btn || !state) return;

  const cells = [...row.children];
  const apply = night => {
    cells.forEach(cell => {
      cell.style.background = night ? cell.dataset.night : cell.dataset.day;
    });
    btn.textContent = night ? '← bring the light back' : 'dim the lights →';
    btn.classList.toggle('off', night);
    state.textContent = night ? 'low light' : 'daylight';
  };

  let night = false;
  apply(night);                       // initialise to daylight
  btn.addEventListener('click', () => { night = !night; apply(night); });
}

/* ---- 4. Scroll reveal for editorial sections ---- */
function initScrollReveal() {
  const sections = document.querySelectorAll('.section.reveal');
  if (!sections.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    sections.forEach(s => s.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  sections.forEach(s => io.observe(s));
}

/* ---- 5. Fixed section-index scrollspy ---- */
function initRailSpy() {
  const links = [...document.querySelectorAll('.rail a')];
  if (!links.length || !('IntersectionObserver' in window)) return;

  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = id => {
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { threshold: 0.5, rootMargin: '-15% 0px -60% 0px' });

  sections.forEach(s => io.observe(s));
}

/* ---- boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderWall();
  renderCrossoverPoints();
  initLowLightToggle();
  initScrollReveal();
  initRailSpy();
});
