/* ═══════════════════════════════════════════
   JAIME CHARFUELAN PORTFOLIO — MAIN JS
   ═══════════════════════════════════════════ */

'use strict';

// ── INTRO ANIMATION ────────────────────────
// Dismiss the overlay after ~2.8s (matches the CSS grid animation)
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('done');
      // Remove from DOM after transition ends so it never blocks clicks
      overlay.addEventListener('animationend', () => {
        overlay.style.display = 'none';
      }, { once: true });
    }, 2800);
  }
});

// ── CUSTOM CURSOR (only if elements exist) ──
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = -999, mouseY = -999;
let ringX  = -999, ringY  = -999;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

if (cursorRing) {
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
}

// ── PARTICLE CANVAS BACKGROUND ────────────
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const VIOLET = [109, 40, 217];
  const TEAL   = [13, 148, 136];
  const GRAY   = [75, 85, 99];

  const particles = Array.from({ length: 100 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.4 + 0.2,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    c:  Math.random() < 0.35 ? VIOLET : Math.random() < 0.5 ? TEAL : GRAY,
    a:  Math.random() * 0.5 + 0.1
  }));

  function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 120) {
          const alpha = (1 - d / 120) * 0.1;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(109,40,217,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const d  = Math.hypot(dx, dy);
      if (d < 110) {
        p.vx += (dx / d) * 0.07;
        p.vy += (dy / d) * 0.07;
      }
      p.vx *= 0.995; p.vy *= 0.995;
      p.x  += p.vx;  p.y  += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`;
      ctx.fill();
    });

    requestAnimationFrame(drawCanvas);
  }
  drawCanvas();
}

// ── SCROLL REVEAL ─────────────────────────
const revealEls = document.querySelectorAll('.reveal-up');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

revealEls.forEach(el => revealObs.observe(el));

// ── SKILL CARD MOUSE GLOW ─────────────────
document.querySelectorAll('.sk-card, .c-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ── PARTICLE BURST (CV buttons) ───────────
const BURST_COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#14b8a6', '#6d28d9', '#ffffff'];

function spawnBurst(cx, cy) {
  const container = document.getElementById('particles-burst');
  if (!container) return;
  const count = 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'burst-particle';

    const color    = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    const angle    = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const distance = 60 + Math.random() * 80;
    const size     = 4 + Math.random() * 6;
    const dur      = 0.5 + Math.random() * 0.4;

    p.style.cssText = `
      left: ${cx}px;
      top:  ${cy}px;
      width:  ${size}px;
      height: ${size}px;
      background: ${color};
      box-shadow: 0 0 6px ${color};
      transition: transform ${dur}s cubic-bezier(0,0,0.2,1), opacity ${dur}s ease;
    `;
    container.appendChild(p);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
        p.style.opacity = '0';
      });
    });

    setTimeout(() => p.remove(), (dur + 0.1) * 1000);
  }
}

// ── DOWNLOAD CV ───────────────────────────
function downloadCV() {
  const btns = document.querySelectorAll('#cv-download-btn, .btn-cv-large, #cv-nav-btn');
  btns.forEach(btn => {
    const r  = btn.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    spawnBurst(cx, cy);
    btn.classList.add('firing');
    setTimeout(() => btn.classList.remove('firing'), 300);
  });

  const link = document.createElement('a');
  link.href     = 'CV_Jaime_Charfuelan.pdf';
  link.download = 'CV_Jaime_Charfuelan.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.downloadCV = downloadCV;

// ── ANIMATED COUNTER ──────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  if (isNaN(target)) return;
  let current = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(interval);
  }, 30);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

// ── HERO NAME WAVE ANIMATION ──────────────
const nameChars = document.querySelectorAll('.hero-name-wrap .name-char');

nameChars.forEach((char, i) => {
  char.style.opacity   = '0';
  char.style.transform = 'translateY(40px)';
  char.style.transition = `opacity 0.6s ease ${0.6 + i * 0.05}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.6 + i * 0.05}s`;

  setTimeout(() => {
    char.style.opacity   = '1';
    char.style.transform = 'translateY(0)';
  }, 100);
});

// ── NAV ACTIVE HIGHLIGHT ──────────────────
const sections  = document.querySelectorAll('section[id]');
const dockLinks = document.querySelectorAll('.dock-item');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  dockLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + current;
    link.style.color      = active ? 'var(--violet4)' : '';
    link.style.background = active ? 'rgba(139,92,246,0.12)' : '';
  });

  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    heroGlow.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
}, { passive: true });

// ── PROJECT BLOCK HOVER TILT ──────────────
document.querySelectorAll('.proj-block').forEach(block => {
  block.addEventListener('mousemove', (e) => {
    const rect = block.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / rect.width;
    const dy   = (e.clientY - cy) / rect.height;
    block.style.transform = `perspective(800px) rotateX(${-dy * 1.5}deg) rotateY(${dx * 1.5}deg)`;
  });

  block.addEventListener('mouseleave', () => {
    block.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    block.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  });
});

// ── SCROLL EXPANSION FOR PROJECT MEDIA ───
const mediaWraps = document.querySelectorAll('.proj-media-wrap');

const mediaObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease, border-color 0.3s';
      e.target.style.opacity    = '1';
      e.target.style.transform  = 'scaleX(1)';
    } else {
      e.target.style.opacity   = '0.4';
      e.target.style.transform = 'scaleX(0.96)';
    }
  });
}, { threshold: 0.2 });

mediaWraps.forEach(wrap => {
  wrap.style.opacity   = '0.4';
  wrap.style.transform = 'scaleX(0.96)';
  mediaObs.observe(wrap);
});

// ── VIDEO PLAY/PAUSE ON HOVER ──────────────
document.querySelectorAll('.proj-video').forEach(video => {
  const wrap = video.closest('.proj-media-wrap');
  if (!wrap) return;
  wrap.addEventListener('mouseenter', () => {
    if (video.src) video.play().catch(() => {});
  });
});

// ── TYPEWRITER EFFECT FOR HERO DESC ──────
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
  const text = heroDesc.textContent.trim();
  heroDesc.textContent = '';
  heroDesc.style.opacity = '1';

  let i = 0;
  function typeNext() {
    if (i < text.length) {
      heroDesc.textContent += text[i++];
      setTimeout(typeNext, 22 + Math.random() * 20);
    }
  }
  setTimeout(typeNext, 1500);
}

// ── CONTACT CARD HOVER PARTICLES ──────────
document.querySelectorAll('.c-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    for (let i = 0; i < 6; i++) {
      const p     = document.createElement('div');
      p.className = 'burst-particle';
      const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 20 + Math.random() * 30;
      const size  = 2 + Math.random() * 3;
      p.style.cssText = `
        left: ${cx}px; top: ${cy}px;
        width: ${size}px; height: ${size}px;
        background: ${color};
        transition: transform 0.4s ease, opacity 0.4s ease;
      `;
      document.getElementById('particles-burst').appendChild(p);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          p.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`;
          p.style.opacity   = '0';
        });
      });
      setTimeout(() => p.remove(), 500);
    }
  });
});

// ── NAV COMPACT ON SCROLL INTO PROJECTS ───
const navDock = document.getElementById('nav-dock');
const projectsSection = document.getElementById('projects');

if (navDock && projectsSection) {
  function updateNavCompact() {
    const projectsTop = projectsSection.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY >= projectsTop - 80) {
      navDock.classList.add('nav-compact');
    } else {
      navDock.classList.remove('nav-compact');
    }
  }
  // Check on scroll
  window.addEventListener('scroll', updateNavCompact, { passive: true });
  // Check on load too
  updateNavCompact();
}

// ── VIDEO AUTOPLAY FIX ─────────────────────
// Force play all project videos and mark as loaded to hide placeholder
document.querySelectorAll('.proj-video').forEach(video => {
  // Ensure required attributes
  video.muted   = true;
  video.loop    = true;
  video.autoplay = true;
  video.setAttribute('playsinline', '');

  function tryPlay() {
    video.play().then(() => {
      video.classList.add('loaded');
    }).catch(() => {
      // Retry once after a short delay (needed for file:// protocol)
      setTimeout(() => {
        video.play().then(() => video.classList.add('loaded')).catch(() => {});
      }, 500);
    });
  }

  if (video.readyState >= 3) {
    tryPlay();
  } else {
    video.addEventListener('canplaythrough', tryPlay, { once: true });
    video.addEventListener('loadeddata', tryPlay, { once: true });
  }
});

// ── INITIAL HERO REVEALS ───────────────────
setTimeout(() => {
  document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
}, 200);
