// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ARROW = '→';

// Image with gradient fallback (used for covers & gallery)
function media(p, cls = 'project__media', src = `images/projects/${p.id}.jpg`, alt = `${p.title} screenshot`) {
  const [h1, h2] = p.colors || [];
  return `<div class="${cls}" data-fallback="${esc(p.title.split(' ')[0])}" style="--h1:${h1};--h2:${h2}">
    <img src="${src}" alt="${esc(alt)}" loading="lazy" onerror="this.parentElement.classList.add('is-empty');this.remove()" />
  </div>`;
}
const tags = (list = [], max = 99) => `<ul class="tags">${list.slice(0, max).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
const badge = (p) => (p.badge ? ` <span class="badge">${esc(p.badge)}</span>` : '');
const detailUrl = (p) => `project.html?id=${encodeURIComponent(p.id)}`;
const GH_ICON = '<svg class="gh" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>';

// ---------- Shared photo gallery + lightbox ----------
// items: [{ src, caption }]. Renders a masonry grid; call mountLightbox(items, title) after inserting it.
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
function galleryHTML(items, title, word = 'photo') {
  if (!items.length) return '';
  return `<section class="d-gallery" id="gallery">
    <div class="d-gallery__head">
      <p class="kicker">Gallery · ${plural(items.length, word)}</p>
      <div class="strip__btns">
        <button type="button" class="strip__nav strip__prev" aria-label="Scroll gallery left">‹</button>
        <button type="button" class="strip__nav strip__next" aria-label="Scroll gallery right">›</button>
      </div>
    </div>
    <div class="masonry" tabindex="0" aria-label="${esc(title)} gallery, scroll sideways">${items.map((it, n) => `
      <figure class="masonry__item">
        <button type="button" class="masonry__btn" data-lb="${n}" aria-label="Open ${word} ${n + 1}${it.caption ? ': ' + esc(it.caption) : ''}">
          <img src="${it.src}" alt="${esc(it.caption || `${title} ${word} ${n + 1}`)}" loading="lazy" />
        </button>
        ${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ''}
      </figure>`).join('')}</div></section>
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="${esc(title)} ${word}s" hidden>
      <button type="button" class="lightbox__close" aria-label="Close">×</button>
      <button type="button" class="lightbox__nav lightbox__prev" aria-label="Previous">‹</button>
      <figure><img alt="" /><figcaption></figcaption></figure>
      <button type="button" class="lightbox__nav lightbox__next" aria-label="Next">›</button>
    </div>`;
}
function mountLightbox(items, title) {
  // Horizontal strip: arrow buttons scroll ~80% of the visible width; fade/arrows update at the ends.
  const strip = $('.masonry');
  if (strip) {
    const prevB = $('.strip__prev'), nextB = $('.strip__next');
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth - 2;
      if (prevB) prevB.disabled = strip.scrollLeft <= 2;
      if (nextB) nextB.disabled = strip.scrollLeft >= max;
      strip.classList.toggle('is-end', strip.scrollLeft >= max);
      if (prevB && nextB && max <= 0) prevB.parentElement.style.visibility = 'hidden';
      else if (prevB) prevB.parentElement.style.visibility = '';
    };
    const by = (dir) => strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: 'smooth' });
    prevB && prevB.addEventListener('click', () => by(-1));
    nextB && nextB.addEventListener('click', () => by(1));
    strip.addEventListener('scroll', update, { passive: true });
    $$('img', strip).forEach((im) => im.addEventListener('load', update));
    window.addEventListener('resize', update);
    update();
  }
  const lb = $('#lightbox');
  if (!lb || !items.length) return;
  const lbImg = $('img', lb), lbCap = $('figcaption', lb);
  let cur = 0, opener = null;
  const show = (n) => {
    cur = (n + items.length) % items.length;
    const it = items[cur];
    lbImg.src = it.src;
    lbImg.alt = it.caption || `${title} ${cur + 1}`;
    lbCap.textContent = `${it.caption ? it.caption + ' · ' : ''}${cur + 1} / ${items.length}`;
  };
  const open = (n, btn) => { opener = btn; show(n); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.lightbox__close', lb).focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; if (opener) opener.focus(); };
  $$('[data-lb]').forEach((b) => b.addEventListener('click', () => open(+b.dataset.lb, b)));
  $('.lightbox__close', lb).addEventListener('click', close);
  $('.lightbox__prev', lb).addEventListener('click', () => show(cur - 1));
  $('.lightbox__next', lb).addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
}

// ---------- Home: project cards ----------
const grid = $('#projects');
if (grid && typeof PROJECTS !== 'undefined') {
  grid.innerHTML = PROJECTS.map((p) => `
    <article class="project ${p.feature ? 'project--feature' : ''} reveal" data-cat="${p.category}">
      ${media(p)}
      <div class="project__body">
        <p class="project__meta">${esc(p.year)} · ${esc(p.place)} · ${esc(p.role)}</p>
        <h3><a class="project__title" href="${detailUrl(p)}">${esc(p.title)}</a>${badge(p)}</h3>
        <p>${esc(p.summary)}</p>
        ${p.feature && p.cardDetail ? `<p>${p.cardDetail}</p>` : ''}
        ${tags(p.stack, p.feature ? 6 : 4)}
        <div class="project__actions">
          <a class="link" href="${detailUrl(p)}">View details ${ARROW}</a>
          ${p.links && p.links[0] ? `<a class="link link--ext" href="${p.links[0].url}" target="_blank" rel="noopener">${esc(p.links[0].label)} ↗</a>` : ''}
          ${p.github ? `<a class="link link--ext" href="${p.github}" target="_blank" rel="noopener">${GH_ICON} GitHub</a>` : ''}
        </div>
      </div>
    </article>`).join('');
}

// ---------- Project detail page ----------
const detail = $('#project-detail');
if (detail && typeof PROJECTS !== 'undefined') {
  const id = new URLSearchParams(location.search).get('id');
  const i = PROJECTS.findIndex((p) => p.id === id);
  if (i === -1) {
    detail.innerHTML = `<div class="container notfound"><h1>Project not found</h1><p class="lead">That project doesn't exist or has moved.</p><a class="btn" href="index.html#work">Back to all work</a></div>`;
  } else {
    const p = PROJECTS[i];
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.title} — Kok Jun Qi`;
    const shots = (p.gallery || []).map((g) => (typeof g === 'string' ? { src: g, caption: '' } : g));
    const facts = [['Year', p.year], ['Where', p.place], ['My role', p.role], ['Team', p.team]].filter(([, v]) => v);

    detail.innerHTML = `
      <section class="d-hero">
        <div class="hero__glow" aria-hidden="true"></div>
        <div class="container">
          <a class="back" href="index.html#work">← All work</a>
          <p class="kicker">${esc(p.category === 'data' ? 'Data & AI' : p.category === 'design' ? 'Design & Media' : p.category === 'mobile' ? 'Mobile' : 'Web')}${p.badge ? ' · ' + esc(p.badge) : ''}</p>
          <h1>${esc(p.title)}</h1>
          <p class="lead">${esc(p.summary)}</p>
          ${p.links?.length || p.linkNote || p.github ? `<div class="hero__cta">
            ${(p.links || []).map((l, n) => `<a class="btn ${n ? 'btn--ghost' : ''}" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}
            ${p.github ? `<a class="btn ${p.links?.length ? 'btn--ghost' : ''}" href="${p.github}" target="_blank" rel="noopener">${GH_ICON} View code on GitHub</a>` : ''}
            ${p.linkNote ? `<span class="link--soon">${esc(p.linkNote)}</span>` : ''}
          </div>` : ''}
        </div>
      </section>

      <div class="container">
        ${media(p, 'd-cover reveal')}

        <div class="d-grid">
          <aside class="d-facts reveal">
            <dl>${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
            <p class="kicker">Built with</p>
            ${tags(p.stack)}
            ${shots.length ? `<a class="btn btn--small d-facts__btn" href="#gallery">See ${plural(shots.length, 'screenshot')} ↓</a>` : ''}
          </aside>

          <div class="d-body">
            ${p.stats ? `<dl class="d-stats reveal">${p.stats.map((s) => `<div><dt>${esc(s.value)}</dt><dd>${esc(s.label)}</dd></div>`).join('')}</dl>` : ''}
            ${p.problem ? `<section class="reveal"><p class="kicker">The problem</p><p>${esc(p.problem)}</p></section>` : ''}
            ${p.solution ? `<section class="reveal"><p class="kicker">The solution</p><p>${esc(p.solution)}</p></section>` : ''}
            ${p.contributions?.length ? `<section class="reveal"><p class="kicker">What I did</p><ul class="d-list">${p.contributions.map((c) => `<li>${c}</li>`).join('')}</ul></section>` : ''}
            ${p.learned ? `<section class="reveal"><p class="kicker">What I learned</p><blockquote>${esc(p.learned)}</blockquote></section>` : ''}
            ${p.note ? `<p class="d-note reveal">${esc(p.note)}</p>` : ''}
          </div>
        </div>

        ${galleryHTML(shots, p.title, 'screenshot')}

        <nav class="d-nav" aria-label="More projects">
          <a href="${detailUrl(prev)}"><span>← Previous</span><strong>${esc(prev.title)}</strong></a>
          <a href="${detailUrl(next)}" class="d-nav__next"><span>Next →</span><strong>${esc(next.title)}</strong></a>
        </nav>
      </div>`;
    mountLightbox(shots, p.title);
  }
}

// ---------- Volunteering: home cards ----------
const volUrl = (v) => `volunteer.html?id=${encodeURIComponent(v.id)}`;
const volPhotos = (v) => Array.from({ length: v.photos || 0 }, (_, i) => `images/volunteer/${v.id}/${String(i + 1).padStart(2, '0')}.jpg`);
const volCards = $('#vol-cards');
if (volCards && typeof VOLUNTEER !== 'undefined') {
  volCards.innerHTML = VOLUNTEER.map((v) => `
    <article class="vol__card reveal">
      <a href="${volUrl(v)}" class="vol__link" aria-label="${esc(v.title)}: view details and photos"></a>
      ${media(v, 'vol__img', `images/volunteer/${v.id}.jpg`, `${v.title} photo`)}
      <p class="project__meta">${esc(v.since)}${v.photos ? ` · ${v.photos} photo${v.photos > 1 ? 's' : ''}` : ''}</p>
      <h3>${esc(v.title)}</h3>
      <p>${esc(v.summary)}</p>
      <span class="link vol__more">View details &amp; photos ${ARROW}</span>
    </article>`).join('');
}

// ---------- Volunteering: detail page ----------
const volDetail = $('#volunteer-detail');
if (volDetail && typeof VOLUNTEER !== 'undefined') {
  const id = new URLSearchParams(location.search).get('id');
  const i = VOLUNTEER.findIndex((v) => v.id === id);
  if (i === -1) {
    volDetail.innerHTML = `<div class="container notfound"><h1>Not found</h1><a class="btn" href="index.html#journey">Back to my journey</a></div>`;
  } else {
    const v = VOLUNTEER[i];
    const prev = VOLUNTEER[(i - 1 + VOLUNTEER.length) % VOLUNTEER.length];
    const next = VOLUNTEER[(i + 1) % VOLUNTEER.length];
    const photos = volPhotos(v);
    const cap = (n) => (v.captions && v.captions[n]) || '';
    const items = photos.map((src, n) => ({ src, caption: cap(n) }));
    document.title = `${v.title} — Kok Jun Qi`;
    volDetail.innerHTML = `
      <section class="d-hero">
        <div class="hero__glow" aria-hidden="true"></div>
        <div class="container">
          <a class="back" href="index.html#journey">← Beyond the code</a>
          <p class="kicker">Volunteering · ${esc(v.since)}</p>
          <h1>${esc(v.title)}</h1>
          <p class="lead">${esc(v.summary)}</p>
        </div>
      </section>
      <div class="container">
        ${media(v, 'd-cover reveal', `images/volunteer/${v.id}.jpg`, `${v.title} photo`)}
        <div class="d-grid">
          <aside class="d-facts reveal">
            <dl>
              <div><dt>When</dt><dd>${esc(v.since)}</dd></div>
              <div><dt>With</dt><dd>${esc(v.org)}</dd></div>
              <div><dt>Photos</dt><dd>${photos.length}</dd></div>
            </dl>
            ${photos.length ? `<a class="btn btn--small" href="#gallery">See the photos ↓</a>` : ''}
          </aside>
          <div class="d-body">
            <section class="reveal"><p class="kicker">My experience</p>${v.story.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
            ${v.learned && v.learned.length ? `<section class="reveal"><p class="kicker">What it taught me</p><ul class="d-list">${v.learned.map((l) => `<li>${l}</li>`).join('')}</ul></section>` : ''}
            ${v.next ? `<section class="reveal"><p class="kicker">What's next</p><blockquote>${esc(v.next)}</blockquote></section>` : ''}
          </div>
        </div>
        ${galleryHTML(items, v.title, 'photo')}
        <nav class="d-nav" aria-label="More volunteering">
          <a href="${volUrl(prev)}"><span>← Previous</span><strong>${esc(prev.title)}</strong></a>
          <a href="${volUrl(next)}" class="d-nav__next"><span>Next →</span><strong>${esc(next.title)}</strong></a>
        </nav>
      </div>`;
    mountLightbox(items, v.title);
  }
}

// ---------- Achievements page ----------
const achDetail = $('#achievements-detail');
if (achDetail && typeof ACHIEVEMENTS !== 'undefined') {
  const a = ACHIEVEMENTS;
  const items = a.certificates.map((caption, n) => ({ src: `images/achievements/${String(n + 1).padStart(2, '0')}.jpg`, caption }));
  achDetail.innerHTML = `
    <section class="d-hero">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="container">
        <a class="back" href="index.html#journey">← Beyond the code</a>
        <p class="kicker">Achievements · 2018 – 2023</p>
        <h1>${esc(a.title)}</h1>
        <p class="lead">${esc(a.summary)}</p>
      </div>
    </section>
    <div class="container">
      ${media({ title: 'Achievements', colors: ['#f59e0b', '#8b7bff'] }, 'd-cover reveal', 'images/achievements.jpg', 'Award certificates')}
      <div class="d-grid">
        <aside class="d-facts reveal">
          <dl>
            <div><dt>Awards</dt><dd>12, every year from 2018 to 2023</dd></div>
            <div><dt>Schools</dt><dd>Sembawang Secondary · ITE College Central</dd></div>
            <div><dt>Certificates</dt><dd>${items.length} photos</dd></div>
          </dl>
          <a class="btn btn--small" href="#gallery">See the certificates ↓</a>
        </aside>
        <div class="d-body">
          <section class="reveal"><p class="kicker">My story</p>${a.story.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
          <section class="reveal"><p class="kicker">Awards</p>
            <ul class="awards awards--page">${a.awards.map((w) => `<li><span>${esc(w.years || '★')}</span><div><strong>${esc(w.name)}</strong><small>${esc(w.detail)}</small></div></li>`).join('')}</ul>
          </section>
          <section class="reveal"><p class="kicker">Certifications</p><ul class="certs">${a.certifications.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></section>
        </div>
      </div>
      ${galleryHTML(items, 'Certificate', 'certificate')}
    </div>`;
  mountLightbox(items, 'Certificate');
}

// ---------- Footer year ----------
$$('.js-year').forEach((el) => (el.textContent = new Date().getFullYear()));

// ---------- Nav ----------
const nav = $('#nav');
const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = $('.nav__toggle');
const links = $('#nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((el) => io.observe(el));

// ---------- Active nav link (home) ----------
const navLinks = $$('.nav__links a[href^="#"]');
if (navLinks.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => spy.observe(s));
}

// ---------- Project filters ----------
const chips = $$('.chip');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    $$('.project').forEach((p) => {
      const show = f === 'all' || p.dataset.cat === f;
      p.classList.toggle('is-hidden', !show);
      if (show) p.classList.add('is-visible');
    });
  });
});

// ---------- Contact form -> email app ----------
const form = $('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:kokjunqi@gmail.com?subject=${subject}&body=${body}`;
  });
}
