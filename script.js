/* KPIs (contador simples) */
const els = [...document.querySelectorAll('[data-kpi]')];
let started = false;

const io = new IntersectionObserver(entries => {
  if (started) return;
  entries.forEach(e => {
    if (e.isIntersecting) {
      started = true;
      els.forEach(el => {
        const tgt = +el.dataset.kpi;
        let n = 0;
        const step = Math.max(1, Math.floor(tgt / 80));
        const it = setInterval(() => {
          n += step;
          el.textContent = n >= tgt ? tgt : n;
          if (n >= tgt) clearInterval(it);
        }, 18);
      });
    }
  });
}, { threshold: .2 });

els.forEach(el => io.observe(el));

/* Comparadores Antes/Depois */
document.querySelectorAll('[data-compare]').forEach(wrap => {
  const after  = wrap.querySelector('.after');
  const range  = wrap.querySelector('input[type=range]');
  const handle = wrap.querySelector('.c-handle');

  const sync = v => { after.style.clipPath = `inset(0 0 0 ${v}%)`; handle.style.left = v + '%'; };
  sync(50);

  range.addEventListener('input', e => sync(e.target.value));

  wrap.addEventListener('pointerdown', e => {
    const r = wrap.getBoundingClientRect();
    const v = ((e.clientX - r.left) / r.width) * 100;
    range.value = Math.max(0, Math.min(100, v));
    sync(range.value);
  });
});
(function(){
  const carousel = document.getElementById('baCarousel');
  const track    = document.getElementById('baTrack');
  const slides   = Array.from(track.querySelectorAll('.ba-slide'));
  const dotsBox  = document.getElementById('baDots');
  const dots     = Array.from(dotsBox.querySelectorAll('.dot'));

  const INTERVAL = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ba-slide-interval')) || 5600;

  let index = 0;
  let timer = null;

  function setActive(i){
    index = (i + slides.length) % slides.length;

    // move a faixa
    track.style.transform = `translateX(-${index * 100}%)`;

    // atualiza slides e ARIA
    slides.forEach((s, idx) => {
      const active = idx === index;
      s.classList.toggle('active', active);
      s.setAttribute('aria-hidden', String(!active));
    });

    // dots
    dots.forEach((d, idx)=> d.classList.toggle('active', idx === index));
    dots.forEach((d, idx)=> d.setAttribute('aria-selected', idx === index ? 'true' : 'false'));
  }

  function next(){ setActive(index + 1); }

  function start(){
    stop();
    timer = setInterval(next, INTERVAL);
  }
  function stop(){
    if(timer) clearInterval(timer);
    timer = null;
  }

  // dots click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { setActive(i); start(); });
  });

  // pausa no hover
  carousel.addEventListener('mouseenter', () => { carousel.classList.add('paused'); stop(); });
  carousel.addEventListener('mouseleave', () => { carousel.classList.remove('paused'); start(); });

  // inicia
  setActive(0);
  start();
})();
/* ===== Parallax de scroll para os cards de Serviços ===== */
(() => {
  const section = document.querySelector('#servicos');
  if (!section) return;
  const cards = section.querySelectorAll('.card');
  if (!cards.length) return;

  // defina velocidades diferentes por card (suave)
  cards.forEach((c, i) => {
    const speed = (i % 4 - 1.5) * 0.06; // -0.09 .. +0.09
    c.style.setProperty('--speed', speed.toFixed(3));
  });

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const center = window.innerHeight * 0.5;
    cards.forEach((c) => {
      const s = parseFloat(getComputedStyle(c).getPropertyValue('--speed')) || 0.06;
      // deslocamento proporcional à distância do centro da viewport
      const y = (rect.top - center) * s * -0.35;
      c.style.setProperty('--ty', `${y.toFixed(1)}px`);
    });
  };

  // roda no início e em scroll/resize
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ===== Tilt sutil no mouse (opcional, liga/desliga) ===== */
  // Para ativar, adicione data-tilt="on" na <div class="services"> no HTML
  const grid = section.querySelector('.services');
  if (grid && grid.dataset.tilt === 'on') {
    const onMove = (e) => {
      const r = grid.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (dy * -3).toFixed(2) + 'deg';
      const ry = (dx * 3).toFixed(2) + 'deg';
      cards.forEach((c) => {
        c.style.setProperty('--rx', rx);
        c.style.setProperty('--ry', ry);
      });
    };
    const reset = () => {
      cards.forEach((c) => {
        c.style.setProperty('--rx', '0deg');
        c.style.setProperty('--ry', '0deg');
      });
    };
    grid.addEventListener('mousemove', onMove);
    grid.addEventListener('mouseleave', reset);
  }
})();
/* ===== Parallax de scroll para os cards de Serviços ===== */
(() => {
  const section = document.querySelector('#servicos');
  if (!section) return;
  const cards = section.querySelectorAll('.card');
  if (!cards.length) return;

  // defina velocidades diferentes por card (suave)
  cards.forEach((c, i) => {
    const speed = (i % 4 - 1.5) * 0.06; // -0.09 .. +0.09
    c.style.setProperty('--speed', speed.toFixed(3));
  });

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const center = window.innerHeight * 0.5;
    cards.forEach((c) => {
      const s = parseFloat(getComputedStyle(c).getPropertyValue('--speed')) || 0.06;
      // deslocamento proporcional à distância do centro da viewport
      const y = (rect.top - center) * s * -0.35;
      c.style.setProperty('--ty', `${y.toFixed(1)}px`);
    });
  };

  // roda no início e em scroll/resize
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ===== Tilt sutil no mouse (opcional, liga/desliga) ===== */
  // Para ativar, adicione data-tilt="on" na <div class="services"> no HTML
  const grid = section.querySelector('.services');
  if (grid && grid.dataset.tilt === 'on') {
    const onMove = (e) => {
      const r = grid.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (dy * -3).toFixed(2) + 'deg';
      const ry = (dx * 3).toFixed(2) + 'deg';
      cards.forEach((c) => {
        c.style.setProperty('--rx', rx);
        c.style.setProperty('--ry', ry);
      });
    };
    const reset = () => {
      cards.forEach((c) => {
        c.style.setProperty('--rx', '0deg');
        c.style.setProperty('--ry', '0deg');
      });
    };
    grid.addEventListener('mousemove', onMove);
    grid.addEventListener('mouseleave', reset);
  }
})();
/* ===== Fade-in robusto ===== */
(function(){
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const targets = $$('.fade-in');
  if (!targets.length) {
    console.warn('[fade-in] Nenhum elemento .fade-in encontrado.');
    return;
  }

  const reveal = el => {
    if (!el.classList.contains('visible')) {
      el.classList.add('visible');
    }
  };

  // Ativa imediatamente os que já estão visíveis ao carregar
  const checkInView = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > vh * 0.1) reveal(el);
    });
  };
  checkInView();

  // Tenta com IntersectionObserver
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          reveal(e.target);
          obs.unobserve(e.target); // anima só uma vez
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
  } else {
    // Fallback por scroll/resize
    const onScroll = () => {
      checkInView();
      // opcional: remover listeners quando tudo estiver revelado
      if ($$('.fade-in:not(.visible)').length === 0) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  // Debug opcional: segure Alt e clique para forçar revelar
  document.addEventListener('click', (e) => {
    if (e.altKey) targets.forEach(reveal);
  });
})();
/* ===== Modal WhatsApp com abas ===== */
(() => {
  const BTN = document.getElementById('btn-agendar');
  const MODAL = document.getElementById('waModal');
  const CLOSES = MODAL?.querySelectorAll('[data-close] , .modal__close');

  if(!BTN || !MODAL) return;

  // Números (EDI TE AQUI)
  const NUM = {
    gurupi:  '5563999999999', // <-- coloque o número de Gurupi
    palmas:  '5563998888888'  // <-- coloque o número de Palmas
  };

  const msgBase = 'Olá, doutor(a)! Gostaria de agendar uma consulta. Vim pelo site.';
  const enc = encodeURIComponent;

  // Preenche links
  const setLinks = () => {
    // Gurupi
    document.getElementById('wa-gurupi-consulta').href = `https://wa.me/${63984580312}?text=${enc(msgBase)}`;
    document.getElementById('wa-gurupi-duvidas').href  = `https://wa.me/${63984580312}?text=${enc('Olá! Tenho algumas dúvidas sobre os procedimentos. Vim pelo site.')}`;

    // Palmas
    document.getElementById('wa-palmas-consulta').href = `https://wa.me/${63984417394}?text=${enc(msgBase)}`;
    document.getElementById('wa-palmas-duvidas').href  = `https://wa.me/${63984417394}?text=${enc('Olá! Tenho algumas dúvidas sobre os procedimentos. Vim pelo site.')}`;
  };
  setLinks();

  // Abrir/fechar modal
  const open = () => { MODAL.hidden = false; MODAL.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
  const close = () => { MODAL.hidden = true; MODAL.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };

  BTN.addEventListener('click', open);
  CLOSES.forEach(el => el.addEventListener('click', close));
  window.addEventListener('keydown', e => { if(e.key === 'Escape' && !MODAL.hidden) close(); });

  // Tabs
  const tabBtns = [document.getElementById('tab-gurupi-btn'), document.getElementById('tab-palmas-btn')];
  const panels  = [document.getElementById('tab-gurupi'),    document.getElementById('tab-palmas')];

  tabBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
      panels.forEach(p => p.classList.remove('is-active'));
      btn.classList.add('is-active'); btn.setAttribute('aria-selected','true');
      panels[i].classList.add('is-active');
    });
  });

  // Estado inicial
  tabBtns[0].click();
})();
// ===== Mobile menu =====
(() => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav');
  if(!btn || !nav) return;

  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  const toggle = (open) => {
    const isOpen = open ?? (btn.getAttribute('aria-expanded') !== 'true');
    btn.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('open', isOpen);
  };

  btn.addEventListener('click', () => toggle());

  // fecha ao clicar fora ou ESC
  window.addEventListener('keydown', e => { if(e.key === 'Escape') toggle(false); });
  document.addEventListener('click', (e) => {
    if(!nav.classList.contains('open')) return;
    const inside = nav.contains(e.target) || btn.contains(e.target);
    if(!inside) toggle(false);
  });

  // **NAVEGAÇÃO MOBILE COM FECHAMENTO + SCROLL SUAVE**
  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(!target) return;

      if (isMobile()) {
        e.preventDefault();         // evita o salto padrão
        toggle(false);              // fecha o menu
        // rola suavemente; o CSS já compensa o header via scroll-margin-top
        target.scrollIntoView({ behavior:'smooth', block:'start' });
      }
      // no desktop deixa o comportamento padrão
    });
  });
})();