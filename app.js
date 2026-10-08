import { features, roles, faqs } from './content.js?v=20261008-arcade-art';

const $ = (selector, root = document) => root?.querySelector(selector);
const $$ = (selector, root = document) => [...(root?.querySelectorAll(selector) || [])];
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const icon = (name) => `<span class="icon icon-${name}" aria-hidden="true"></span>`;
const setText = (selector, value) => { const element = $(selector); if (element) element.textContent = value; };
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const desktopMotion = matchMedia('(min-width: 821px)');
let motionPreference = null;
try { motionPreference = localStorage.getItem('leyi-marketing-motion'); } catch { /* Storage is optional. */ }
let motionEnabled = !reducedMotion.matches && motionPreference !== 'off';

function replayEntrance(element) {
  if (!element) return;
  element.classList.remove('swapping');
  if (!motionEnabled) return;
  void element.offsetWidth;
  element.classList.add('swapping');
}

function setImage(selector, src, alt, animate = false) {
  const image = $(selector);
  if (!image) return;
  image.alt = alt;
  if (image.getAttribute('src') === src) return;
  image.src = src;
  if (animate) replayEntrance(image);
}

function tabKeyIndex(event, index, count) {
  const keys = { ArrowRight: (index + 1) % count, ArrowLeft: (index - 1 + count) % count, Home: 0, End: count - 1 };
  if (!Object.hasOwn(keys, event.key)) return null;
  event.preventDefault();
  return keys[event.key];
}

// Screenshots preserve the actual local workbench pages and their recorded status.
const productViewport = $('#product-viewport');
const productFocus = $('.product-focus');
function setProductFocus(mode = 'full') {
  const focus = ['full', 'conversation', 'results'].includes(mode) ? mode : 'full';
  if (productViewport) productViewport.dataset.focus = focus;
  $$('.product-focus button[data-focus]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.focus === focus));
  });
  setText('#product-focus-note', focus === 'full'
    ? '可在当前页面放大查看对话和成果。'
    : `当前聚焦${focus === 'conversation' ? '对话' : '成果'}区域，仅放大原始截图；选择「全貌」可恢复。`);
}
productFocus?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-focus]');
  if (button) setProductFocus(button.dataset.focus);
});

let featureIndex = 0;
const featureTabs = $('.feature-tabs');
if (featureTabs) {
  featureTabs.innerHTML = features.map((feature, index) => `<button class="feature-tab" id="tab-${escape(feature.id)}" role="tab" aria-selected="${index === 0}" aria-controls="product-panel" tabindex="${index === 0 ? 0 : -1}" data-feature="${index}"><span class="tab-number">${String(index + 1).padStart(2, '0')}</span>${escape(feature.title)}<small>${escape(feature.summary)}</small></button>`).join('');
}

function selectFeature(index, focus = false) {
  if (!features.length) return;
  const previousIndex = featureIndex;
  featureIndex = (index + features.length) % features.length;
  const feature = features[featureIndex];
  const buttons = $$('.feature-tab');
  buttons.forEach((button, i) => {
    button.setAttribute('aria-selected', String(i === featureIndex));
    button.tabIndex = i === featureIndex ? 0 : -1;
  });
  $('#product-panel')?.setAttribute('aria-labelledby', `tab-${feature.id}`);
  const panel = $('#feature-info');
  if (panel) {
    panel.setAttribute('aria-labelledby', `tab-${feature.id}`);
    panel.innerHTML = `<div class="feature-story"><span class="feature-kicker">${escape(feature.kicker)}</span><h3>${feature.heading.split('\n').map(escape).join('<br>')}</h3></div><div class="feature-benefit"><p>${escape(feature.description)}</p><ul class="feature-bullets">${feature.bullets.map((bullet) => `<li>${icon('check')}${escape(bullet)}</li>`).join('')}</ul></div>`;
  }
  setText('#product-screen-title', feature.screen.title);
  setText('#product-screen-caption', feature.screen.caption);
  setText('#product-screen-date', feature.screen.date);
  setText('#product-screen-index', `${String(featureIndex + 1).padStart(2, '0')} / ${String(features.length).padStart(2, '0')}`);
  const productImage = $('#product-image');
  if (productImage) {
    productImage.width = feature.screen.width;
    productImage.height = feature.screen.height;
  }
  setImage('#product-image', feature.screen.image, feature.screen.alt);
  setProductFocus('full');
  replayEntrance(panel);
  if (previousIndex !== featureIndex) replayEntrance(productViewport);
  if (focus) buttons[featureIndex]?.focus({ preventScroll: true });
}
featureTabs?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-feature]');
  if (button) selectFeature(Number(button.dataset.feature));
});
featureTabs?.addEventListener('keydown', (event) => {
  const index = tabKeyIndex(event, featureIndex, features.length);
  if (index !== null) selectFeature(index, true);
});
selectFeature(0);

const worlds = [
  {
    id: 'starport', title: '星港边界', english: 'BEYOND THE STARPORT',
    image: 'assets/arcade-starport.webp',
    alt: '科幻游戏概念：小机器人探索方块星港，巨大的粉色星门与黄色航道延伸向太空',
    description: '把远方的星港，变成可以走进去的目的地。围绕第三人称探索，串联角色操作、关卡动线与清晰的目标反馈。',
    tags: ['第三人称', '科幻场景', '关卡动线', '角色反馈'],
  },
  {
    id: 'islands', title: '浮岛物语', english: 'A WORLD ABOVE THE CLOUDS',
    image: 'assets/arcade-islands.webp',
    alt: '风格化冒险游戏概念：小机器人跃入云海浮岛，方块瀑布与粉色跳台连接探索路径',
    description: '给想象一点轻盈的颜色。从浮空岛的场景搭建，到资源组合、可交互物件与界面提示，让小世界拥有完整的游玩节奏。',
    tags: ['风格化世界', '场景搭建', '资源整合', '界面交互'],
  },
  {
    id: 'ruins', title: '遗迹回响', english: 'ECHOES OF THE ANCIENTS',
    image: 'assets/arcade-ruins.webp',
    alt: '探索游戏概念：方块遗迹悬浮在云海中，黄色机关指引小机器人走向粉色能量门',
    description: '在沉睡的石殿里，让光成为玩家的向导。从空间节奏、环境氛围到机关反馈，把探索的每一步连接起来。',
    tags: ['探索冒险', '环境叙事', '光照氛围', '机关交互'],
  },
];
let showcaseIndex = 0;
const showcaseTabs = $('.showcase-tabs');
if (showcaseTabs) {
  showcaseTabs.innerHTML = worlds.map((world, index) => `<button class="showcase-tab" id="world-tab-${world.id}" data-world="${index}" role="tab" aria-controls="showcase-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}"><img class="showcase-thumb" src="${world.image}" alt="" loading="lazy"><span class="showcase-tab-copy"><small>${world.english}</small><strong>${world.title}</strong></span><span class="showcase-tab-index">0${index + 1}</span></button>`).join('');
}

function selectWorld(index, focus = false) {
  const next = (index + worlds.length) % worlds.length;
  const changed = showcaseIndex !== next;
  showcaseIndex = next;
  const world = worlds[next];
  const buttons = $$('.showcase-tab');
  buttons.forEach((button, i) => {
    button.setAttribute('aria-selected', String(i === next));
    button.tabIndex = i === next ? 0 : -1;
  });
  $('#showcase-panel')?.setAttribute('aria-labelledby', `world-tab-${world.id}`);
  setText('#showcase-title', world.title);
  setText('#showcase-description', world.description);
  setText('#showcase-index', `0${next + 1} / 0${worlds.length}`);
  const tags = $('#showcase-tags');
  if (tags) tags.innerHTML = world.tags.map((tag) => `<span>${escape(tag)}</span>`).join('');
  setImage('#showcase-image', world.image, world.alt);
  if (changed) {
    replayEntrance($('.showcase-stage') || $('#showcase-image'));
    replayEntrance($('.showcase-caption') || $('#showcase-description'));
  }
  if (focus) buttons[next]?.focus();
}
showcaseTabs?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-world]');
  if (button) selectWorld(Number(button.dataset.world));
});
showcaseTabs?.addEventListener('keydown', (event) => {
  const index = tabKeyIndex(event, showcaseIndex, worlds.length);
  if (index !== null) selectWorld(index, true);
});
$('#showcase-prev')?.addEventListener('click', () => selectWorld(showcaseIndex - 1));
$('#showcase-next')?.addEventListener('click', () => selectWorld(showcaseIndex + 1));
selectWorld(0);
const warmImages = () => worlds.forEach(({ image }) => { const preload = new Image(); preload.src = image; });
if ('requestIdleCallback' in window) requestIdleCallback(warmImages, { timeout: 1800 });
else setTimeout(warmImages, 800);

const roleEnglish = ['GAME DESIGN', 'GAMEPLAY CODE', 'UNITY ENGINE', 'INTERFACE', 'QUALITY CHECK'];
const roleButtons = $('.role-buttons');
const compactTeam = matchMedia('(max-width: 820px)');
let roleIndex = 0;
if (roleButtons) {
  roleButtons.innerHTML = roles.map((role, index) => `<button type="button" class="role-node" id="role-tab-${escape(role.id)}" data-role="${index}" role="tab" aria-controls="role-detail" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}"><span class="role-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="role-label"><strong>${escape(role.name)}</strong><small>${roleEnglish[index]}</small></span>${icon('arrow')}</button>`).join('');
}
function selectRole(index, focus = false) {
  roleIndex = (index + roles.length) % roles.length;
  const role = roles[roleIndex];
  setText('#role-tag', `${String(roleIndex + 1).padStart(2, '0')} / ${role.tag}`);
  setText('#role-name', role.name);
  setText('#role-description', role.description);
  setText('#role-output', role.output);
  $('#role-detail')?.setAttribute('aria-labelledby', `role-tab-${role.id}`);
  const buttons = $$('.role-node');
  buttons.forEach((button, i) => {
    button.setAttribute('aria-selected', String(i === roleIndex));
    button.tabIndex = i === roleIndex ? 0 : -1;
  });
  replayEntrance($('#role-detail'));
  if (focus) buttons[roleIndex]?.focus({ preventScroll: true });
}
roleButtons?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-role]');
  if (button) selectRole(Number(button.dataset.role));
});
roleButtons?.addEventListener('keydown', (event) => {
  const previous = compactTeam.matches ? 'ArrowLeft' : 'ArrowUp';
  const next = compactTeam.matches ? 'ArrowRight' : 'ArrowDown';
  const targets = { [previous]: roleIndex - 1, [next]: roleIndex + 1, Home: 0, End: roles.length - 1 };
  if (!Object.hasOwn(targets, event.key)) return;
  event.preventDefault();
  selectRole(targets[event.key], true);
});
function updateRoleOrientation() { roleButtons?.setAttribute('aria-orientation', compactTeam.matches ? 'horizontal' : 'vertical'); }
compactTeam.addEventListener('change', updateRoleOrientation);
updateRoleOrientation();
selectRole(0);

const faqList = $('.faq-list');
if (faqList) faqList.innerHTML = faqs.map((faq, index) => `<article class="faq-item"><span class="faq-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><div><h3>${escape(faq.question)}</h3><p>${escape(faq.answer)}</p></div></article>`).join('');

const menuButton = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '展开导航');
  mobileNav.hidden = true;
}
menuButton?.addEventListener('click', () => {
  if (!mobileNav) return;
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? '展开导航' : '收起导航');
  mobileNav.hidden = expanded;
});
$$('a', mobileNav).forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileNav && !mobileNav.hidden) { closeMenu(); menuButton?.focus(); }
});
document.addEventListener('click', (event) => {
  if (mobileNav && !mobileNav.hidden && !mobileNav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});
desktopMotion.addEventListener('change', (event) => { if (event.matches) closeMenu(); scheduleFrame(true); });

const hero = $('.hero');
const heroArt = $('.hero-art');
const heroCopy = $('.hero-copy');
const worldsSection = $('.world-section');
const worldFrame = $('.world-frame');
const worldCopy = $('.world-copy');
const tiltScenes = $$('.tilt-scene');
const magneticButtons = $$('.magnetic');
const readingProgress = $('.reading-progress');
const chapterLinks = $$('.hero-chapters a[href^="#"]');
const trackedSections = [hero, worldsSection].filter(Boolean);
const inView = new Set();
let frame = 0;
let scrollDirty = true;
let pointerDirty = false;
let heroPointer = { x: 0, y: 0, lightX: 70, lightY: 45 };
const tiltPointers = new Map();

function scheduleFrame(updateScroll = false) {
  scrollDirty ||= updateScroll;
  if (!frame && !document.hidden) frame = requestAnimationFrame(renderFrame);
}

function renderFrame() {
  frame = 0;
  if (scrollDirty) updateScrollEffects();
  if (pointerDirty) updatePointerEffects();
  scrollDirty = false;
  pointerDirty = false;
}

function updateScrollEffects() {
  const viewport = innerHeight;
  $('.site-header')?.classList.toggle('scrolled', scrollY > 40);
  const range = document.documentElement.scrollHeight - viewport;
  if (readingProgress) readingProgress.style.transform = `scaleX(${range > 0 ? clamp(scrollY / range) : 0})`;

  if (hero && (inView.has(hero) || scrollY < hero.offsetHeight)) {
    const progress = clamp(scrollY / Math.max(hero.offsetHeight, 1));
    heroArt?.style.setProperty('--hero-scale', motionEnabled ? (1.04 + progress * .08).toFixed(4) : '1.04');
    heroCopy?.style.setProperty('--hero-copy-y', motionEnabled && desktopMotion.matches ? `${(Math.min(scrollY, hero.offsetHeight) * .15).toFixed(1)}px` : '0px');
  }

  if (worldsSection && worldFrame && (inView.has(worldsSection) || !motionEnabled)) {
    const rect = worldsSection.getBoundingClientRect();
    const raw = clamp((viewport * .82 - rect.top) / Math.max(viewport * .88, 1));
    const progress = motionEnabled && desktopMotion.matches ? raw * raw * (3 - 2 * raw) : 1;
    const copyProgress = motionEnabled && desktopMotion.matches ? clamp((progress - .23) / .62) : 1;
    const values = { '--world-inset': `${((1 - progress) * 16).toFixed(3)}%`, '--world-scale': (1.15 - progress * .15).toFixed(4), '--world-copy-opacity': copyProgress.toFixed(3), '--world-copy-y': `${((1 - copyProgress) * 35).toFixed(2)}px` };
    [worldsSection, worldFrame, worldCopy].filter(Boolean).forEach((element) => {
      Object.entries(values).forEach(([name, value]) => element.style.setProperty(name, value));
    });
  }

  let activeChapter = chapterLinks[0];
  for (const link of chapterLinks) {
    const section = $(link.getAttribute('href'));
    if (section && section.getBoundingClientRect().top < viewport * .5) activeChapter = link;
  }
  chapterLinks.forEach((link) => {
    const active = link === activeChapter;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function pointerAllowed() { return motionEnabled && finePointer.matches; }
function updatePointerEffects() {
  heroArt?.style.setProperty('--parallax-x', `${heroPointer.x.toFixed(2)}px`);
  heroArt?.style.setProperty('--parallax-y', `${heroPointer.y.toFixed(2)}px`);
  hero?.style.setProperty('--pointer-x', `${heroPointer.lightX.toFixed(2)}%`);
  hero?.style.setProperty('--pointer-y', `${heroPointer.lightY.toFixed(2)}%`);
  tiltPointers.forEach((position, element) => {
    element.style.setProperty('--tilt-x', `${position.x.toFixed(3)}deg`);
    element.style.setProperty('--tilt-y', `${position.y.toFixed(3)}deg`);
    element.style.setProperty('--glare-x', `${position.glareX.toFixed(2)}%`);
    element.style.setProperty('--glare-y', `${position.glareY.toFixed(2)}%`);
  });
}
function resetPointerEffects() {
  heroPointer = { x: 0, y: 0, lightX: 70, lightY: 45 };
  tiltScenes.forEach((element) => tiltPointers.set(element, { x: 0, y: 0, glareX: 50, glareY: 50 }));
  magneticButtons.forEach((button) => { button.style.transform = ''; });
  pointerDirty = true;
  scheduleFrame();
}
hero?.addEventListener('pointermove', (event) => {
  if (!pointerAllowed()) return;
  const rect = hero.getBoundingClientRect();
  const x = clamp((event.clientX - rect.left) / rect.width);
  const y = clamp((event.clientY - rect.top) / rect.height);
  heroPointer = { x: (x - .5) * -36, y: (y - .5) * -24, lightX: x * 100, lightY: y * 100 };
  pointerDirty = true;
  scheduleFrame();
});
hero?.addEventListener('pointerleave', () => {
  heroPointer = { x: 0, y: 0, lightX: 70, lightY: 45 };
  pointerDirty = true;
  scheduleFrame();
});
tiltScenes.forEach((element) => {
  element.addEventListener('pointermove', (event) => {
    if (!pointerAllowed()) return;
    const rect = element.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width);
    const y = clamp((event.clientY - rect.top) / rect.height);
    tiltPointers.set(element, { x: (.5 - y) * 4, y: (x - .5) * 4, glareX: x * 100, glareY: y * 100 });
    pointerDirty = true;
    scheduleFrame();
  });
  element.addEventListener('pointerleave', () => {
    tiltPointers.set(element, { x: 0, y: 0, glareX: 50, glareY: 50 });
    pointerDirty = true;
    scheduleFrame();
  });
});
magneticButtons.forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    if (!pointerAllowed()) return;
    const rect = button.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left - rect.width / 2) * .08, -5, 5);
    const y = clamp((event.clientY - rect.top - rect.height / 2) * .12, -5, 5);
    button.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
  });
  button.addEventListener('pointerleave', () => { button.style.transform = ''; });
});
finePointer.addEventListener('change', () => { if (!finePointer.matches) resetPointerEffects(); });

const relevanceObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) inView.add(entry.target);
    else inView.delete(entry.target);
  }
  scheduleFrame(true);
}, { rootMargin: '120px 0px' });
trackedSections.forEach((element) => relevanceObserver.observe(element));
addEventListener('scroll', () => scheduleFrame(true), { passive: true });
addEventListener('resize', () => scheduleFrame(true), { passive: true });

// Reveal content once. A missing observer or disabled motion never hides useful content.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .06, rootMargin: '0px 0px 20px 0px' });
$$('.reveal').forEach((element) => revealObserver.observe(element));
document.documentElement.classList.add('motion-ready');

const canvas = $('#ember-field');
const context = canvas?.getContext('2d');
let canvasWidth = 0, canvasHeight = 0, canvasFrame = 0, canvasVisible = false;
let sceneTime = 0, previousFrameTime = 0, lastDraw = 0;
const embers = Array.from({ length: 48 }, (_, index) => ({
  x: Math.random(), y: Math.random(), size: .6 + Math.random() * 1.4,
  speed: .007 + Math.random() * .012, phase: index * 1.37,
}));
function resizeCanvas() {
  if (!canvas || !hero || !context) return;
  canvasWidth = hero.clientWidth;
  canvasHeight = hero.clientHeight;
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(canvasWidth * ratio);
  canvas.height = Math.round(canvasHeight * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  if (motionEnabled && canvasVisible && !document.hidden) drawEmbers();
}
function drawEmbers() {
  if (!context) return;
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  if (!motionEnabled) return;
  for (const ember of embers) {
    const progress = ((ember.y - sceneTime * ember.speed) % 1 + 1) % 1;
    const x = (ember.x + Math.sin(sceneTime * .23 + ember.phase) * .013) * canvasWidth;
    const y = progress * canvasHeight;
    const edge = Math.min(progress * 8, (1 - progress) * 8, 1);
    const opacity = (.2 + (Math.sin(sceneTime * .5 + ember.phase) + 1) * .16) * edge;
    context.fillStyle = `rgba(169, 197, 255, ${opacity.toFixed(3)})`;
    context.beginPath();
    context.arc(x, y, ember.size, 0, Math.PI * 2);
    context.fill();
  }
}
function animateEmbers(time) {
  if (previousFrameTime) sceneTime += Math.min(time - previousFrameTime, 60) / 1000;
  previousFrameTime = time;
  if (time - lastDraw >= 32) { drawEmbers(); lastDraw = time; }
  canvasFrame = requestAnimationFrame(animateEmbers);
}
function syncCanvas() {
  cancelAnimationFrame(canvasFrame);
  canvasFrame = 0;
  previousFrameTime = 0;
  if (context && motionEnabled && canvasVisible && !document.hidden) canvasFrame = requestAnimationFrame(animateEmbers);
  else context?.clearRect(0, 0, canvasWidth, canvasHeight);
}
if (hero && canvas) {
  new ResizeObserver(resizeCanvas).observe(hero);
  new IntersectionObserver((entries) => {
    canvasVisible = entries[0].isIntersecting;
    if (!canvasVisible) resetPointerEffects();
    syncCanvas();
  }).observe(hero);
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(frame); frame = 0; resetPointerEffects(); }
  else scheduleFrame(true);
  syncCanvas();
});

function applyMotionPreference() {
  document.documentElement.classList.toggle('motion-off', !motionEnabled);
  const button = $('.motion-toggle');
  const label = reducedMotion.matches ? '动效已关闭（系统减少动态效果）' : motionEnabled ? '关闭动效' : '开启动效';
  if (button) {
    button.disabled = reducedMotion.matches;
    button.setAttribute('aria-pressed', String(!motionEnabled));
    button.setAttribute('aria-label', label);
    button.title = label;
  }
  if (!motionEnabled) {
    resetPointerEffects();
    $$('.swapping').forEach((element) => element.classList.remove('swapping'));
    $$('.reveal').forEach((element) => element.classList.add('is-visible'));
  }
  scheduleFrame(true);
  syncCanvas();
}
$('.motion-toggle')?.addEventListener('click', () => {
  if (reducedMotion.matches) return;
  motionEnabled = !motionEnabled;
  motionPreference = motionEnabled ? 'on' : 'off';
  try { localStorage.setItem('leyi-marketing-motion', motionPreference); } catch { /* Storage is optional. */ }
  applyMotionPreference();
});
reducedMotion.addEventListener('change', () => {
  motionEnabled = !reducedMotion.matches && motionPreference !== 'off';
  applyMotionPreference();
});
applyMotionPreference();
scheduleFrame(true);
