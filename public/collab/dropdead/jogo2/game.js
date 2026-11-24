/* DROP SESSION — PCYES × Drop Dead · jogo 2 (half-pipe visto de lado, sessão de 60 s)
   Canvas 2D. Lógica a 60 fps; personagem troca de quadro a 8 fps e a rotação do shape anda em degraus
   a 12 fps (animação "antiga", de propósito). Arte final vem de sprites/ (tools/fatiar.py); enquanto
   não existe, usa os quadros do jogo 1 e cenário procedural no mesmo traço de zine. */
(() => {
'use strict';

// ---------- constantes ----------
const PAL = { blue:'#3558A8', blue2:'#2B4889', yellow:'#F6BE27', red:'#E5141B', ink:'#111111',
  paper:'#F3EEE2', paper2:'#E4DAC4', paper3:'#D6CBB2', night:'#1D2758', night2:'#161E47', night3:'#0F1535', street:'#191E38' };
// half-pipe analítico: fundo plano (±F0) + duas transições circulares (raio R) até a vertical + V de vert
const G = { F0:240, R:330, V:46, B:34, DECK:170, RAIL:86 };
G.T = G.R * Math.PI / 2; G.S2 = G.F0 + G.T; G.SMAX = G.S2 + G.V;
G.YC = G.B + G.R + G.V; G.XC = G.F0 + G.R; G.XE = G.XC + G.DECK;
const PH = { g:2500, mu:26, k:.000034, pump:1600, pumpBad:420, vmax:2700, airMin:110, push:300, drop:820 };
const ROBO_H = 250, BOARD_L = 140, SESSION = 60, METER_FULL = 5000;

const FLIPS = { L:{ n:'KICKFLIP', p:400, d:.38, roll:1, yaw:0 }, R:{ n:'HEELFLIP', p:400, d:.38, roll:-1, yaw:0 },
  D:{ n:'VARIAL', p:300, d:.32, roll:0, yaw:1 }, U:{ n:'360 FLIP', p:900, d:.5, roll:1, yaw:2 } };
FLIPS.N = FLIPS.L;
const GRABS = { L:{ n:'INDY', k:'indy' }, R:{ n:'MELON', k:'melon' }, U:{ n:'METHOD', k:'method' }, D:{ n:'STALEFISH', k:'stalefish' } };
GRABS.N = GRABS.L;
const SPINS = [null, ['540', 1000], ['900', 2500], ['1260', 4500]]; // giro extra de 360 em 360 (o aéreo normal já é um 180)
const NOTAS = [[0, 'POSER'], [4000, 'AMADOR'], [12000, 'CABULOSO'], [25000, 'LENDA'], [45000, 'DROP DEAD']];
const MISSOES = [
  { k:'m540', t:'FAÇA UM 540' },
  { k:'mdrop', t:'PEGUE OS 4 PRODUTOS' },
  { k:'mgrab', t:'3 GRABS SEGUIDOS' },
];
const CUPOM = 'DROPDEAD35'; // PLACEHOLDER: código provisório — trocar pelo cupom real antes de publicar

// ---------- canvas ----------
const cv = document.getElementById('game'), ctx = cv.getContext('2d');
const QS = new URLSearchParams(location.search);
const isTouch = matchMedia('(pointer:coarse)').matches || QS.has('touch');
let W = 1180, H = 720, DPR = 1, GY = 620, Z0 = .72;
const cam = { x:0, y:0, z:.72, ready:false }; let gy = 620; // gy = linha do chão na tela (desce quando a câmera sobe)
function resize() {
  const a = innerWidth / innerHeight;
  H = 720; W = Math.round(Math.min(1180, Math.max(400, H * a)));
  DPR = Math.min(2, devicePixelRatio || 1);
  cv.width = W * DPR; cv.height = H * DPR;
  const s = Math.min(innerWidth / W, innerHeight / H) * (a > 1.2 ? .94 : 1);
  cv.style.width = W * s + 'px'; cv.style.height = H * s + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  GY = Math.round(H * (isTouch ? .76 : .87)); gy = GY + cam.y * cam.z;
  Z0 = clamp(Math.min(W / 1320, (GY - 60) / (G.YC + G.RAIL + 110)), .44, .8);
  if (!cam.ready) cam.z = Z0;
}

// ---------- util ----------
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = t => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function mk(w, h, fn) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); fn(c.getContext('2d'), c.width, c.height); return c; }
const LOADP = { n:0, d:0 };
function load(src) { LOADP.n++; return new Promise(r => { const i = new Image(); const ok = v => { LOADP.d++; r(v); }; i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; }); }
const VER = Date.now(); // evita cache de sprites antigos durante o desenvolvimento

// ---------- áudio ----------
const MUS = new Audio('../musica/jogo.mp3'); MUS.loop = true; MUS.volume = .55;
MUS.preservesPitch = false; MUS.mozPreservesPitch = false; MUS.webkitPreservesPitch = false;
let muted = false;
function music(on) { if (on && !muted) MUS.play().catch(() => {}); else MUS.pause(); }
let AC = null;
function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume(); return AC; }
function tone(f, t0, dur, type = 'square', vol = .1, f2) { const a = ac(); if (!a || muted) return; const t = a.currentTime + t0, o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + .02); }
function noise(t0, dur, vol, f0, f1, q = 1) { const a = ac(); if (!a || muted) return; const t = a.currentTime + t0, n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; const src = a.createBufferSource(), bp = a.createBiquadFilter(), g = a.createGain(); src.buffer = buf;
  bp.type = 'bandpass'; bp.Q.value = q; bp.frequency.setValueAtTime(f0, t); if (f1) bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); src.connect(bp).connect(g).connect(a.destination); src.start(t); }
const SFX = {
  coin() { tone(988, 0, .07, 'square', .06); tone(1319, .06, .2, 'square', .06); },
  prod() { tone(110, 0, .25, 'sine', .4, 55); [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, i * .05, .2, 'square', .11)); tone(2093, .3, .35, 'triangle', .08);
    noise(0, .14, .35, 500, 2600, 3); noise(.14, .14, .3, 2600, 500, 3); },
  trick() { tone(784, 0, .08, 'square', .1); tone(1175, .07, .16, 'square', .1); tone(1568, .07, .16, 'triangle', .08); noise(0, .1, .3, 900, 3000, 2.5); },
  whoosh() { noise(0, .22, .35, 400, 2400, 1.2); },
  pop() { noise(0, .05, .4, 1800, 900, .8); },
  land() { noise(0, .09, .5, 220, 120, .7); tone(90, 0, .1, 'sine', .25, 50); },
  pump() { tone(70, 0, .12, 'sine', .3, 140); },
  grind() { noise(0, .07, .12, 3200, 4200, 4); },
  cheer() { noise(0, 1.1, .16, 700, 1400, .6); noise(.1, .9, .1, 1600, 2400, .8); },
  tick() { tone(1760, 0, .04, 'square', .05); },
};
function rate(r, ms) { MUS.playbackRate = r; if (ms) setTimeout(() => { MUS.playbackRate = dropT > 0 ? 1.06 : 1; }, ms); }

// ---------- traço tremendo ----------
const canFilter = typeof ctx.filter === 'string';
function boilVariants(img) { // 3 versões levemente distorcidas → traço "tremendo" (trocadas a 8 fps)
  if (!canFilter) return [img, img, img];
  return [0, 1, 2].map(k => mk(img.width + 8, img.height + 8, (c) => { c.filter = `url(#boil${k})`; c.drawImage(img, 4, 4); }));
}

// ---------- sprites ----------
// jogo 2 (arte final, se já fatiada) e jogo 1 (placeholder)
const S2 = { robo:{}, skate:{}, cenario:{}, ui:{}, adesivos:{} }, M2 = {};
const S1 = { robo:{}, skate:{}, obj:{} }, UI = {}, RAW = {};
async function loadSet(base, dir, target, man, only) {
  const m = await fetch(`${base}/${dir}/manifest.json?v=${VER}`, { cache:'no-store' }).then(r => r.ok ? r.json() : {}).catch(() => ({}));
  if (man) man[dir] = m;
  const names = Object.keys(m).filter(n => !only || only.includes(n));
  await Promise.all(names.map(async n => { const i = await load(`${base}/${dir}/${n}.webp?v=${VER}`); if (i) { RAW[dir + '/' + n] = i; target[n] = boilVariants(i); } }));
}
const J1_ROBO = ['lado1', 'lado2', 'lado-agachado', 'lado-aterrissa', 'lado-curva', 'lado-remada', 'ollie3', 'ollie4', 'ollie5', 'grab',
  'tombo1', 'tombo2', 'tombo3', 'tombo4', 'tombo5', 'tombo6'];
// quadro lógico → placeholder do jogo 1 (vista 3/4 de costas; serve até a arte de lado chegar)
const FB = { 'base-rodando':'lado1', 'base-rodando2':'lado2', 'base-agachado':'lado-agachado', 'base-estica':'lado2', 'base-aterrissa':'lado-aterrissa',
  'base-remada':'lado-remada', 'ar-ollie':'ollie3', 'ar-neutro':'ollie4', 'ar-flip':'ollie3', 'ar-giro-costas':'ollie5', 'ar-giro-frente':'ollie4',
  'ar-comemora':'ollie3', 'borda-rock':'lado-curva', 'borda-grind1':'lado-curva', 'borda-grind2':'lado-curva', 'borda-nose':'lado-curva',
  'borda-tail':'lado-curva', 'borda-dropin':'lado-agachado' };
function frameOf(name) { // → { v, board, man } ; board = o quadro já traz o shape desenhado
  if (S2.robo[name]) return { v:S2.robo[name], board:/^(grab-|borda-|rf)/.test(name), man:(M2.robo || {})[name] };
  if (name === 'base-rodando2' && S2.robo['base-rodando']) return frameOf('base-rodando');
  if (name === 'base-remada' && S2.robo['base-estica']) return frameOf('base-estica');
  if (/^tombo/.test(name)) { const n = +name.slice(5); const k = n < 4 ? 'base-tombo1' : 'base-tombo2'; if (S2.robo[k]) return frameOf(k); return { v:S1.robo[name] }; }
  if (/^grab-/.test(name)) return { v:S1.robo.grab };
  if (/^rf/.test(name)) return { v:S1.robo.ollie4 };
  return { v:S1.robo[FB[name] || 'lado1'] || S1.robo.lado1 };
}

// ---------- arte procedural (cenário, adesivos, letras, céu) ----------
let NOISE, MOON, BAND, STARS = [], LAYERS = {}, HP, DECKCROWD = [], STICK = {}, LETTER = {}, PUMPRING;
function star(c, x, y, r, n, rot, inner = .55) { c.beginPath(); for (let i = 0; i < n * 2; i++) { const rr = i % 2 ? r * inner : r, a = rot + i * Math.PI / n; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); }
function wob(c, pts, r, close, amp = 2.2) { c.beginPath(); pts.forEach(([x, y], i) => { const jx = x + (r() - .5) * amp, jy = y + (r() - .5) * amp; i ? c.lineTo(jx, jy) : c.moveTo(jx, jy); }); if (close) c.closePath(); }
function inkRect(c, x, y, w, h, fill, lw, r) { c.fillStyle = fill; wob(c, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], r, true, lw * .6); c.fill(); c.strokeStyle = PAL.ink; c.lineWidth = lw; c.lineJoin = 'round'; c.stroke(); }
function halftone(c, x0, y0, w, h, col, step, fn) { c.fillStyle = col; for (let y = y0; y < y0 + h; y += step) for (let x = x0 + ((y - y0) / step % 2) * step / 2; x < x0 + w; x += step) { const r = fn(x, y); if (r > .3) { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); } } }
function tag(c, x, y, w, h, col, r, lw) { // pixação: letras altas e angulosas
  c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); const n = 3 + Math.floor(r() * 3);
  for (let q = 0; q < n; q++) { const u0 = x + q / n * w, u1 = u0 + w / n * .72;
    c.moveTo(u0, y + h); c.lineTo(u0 + (r() - .5) * 4, y); c.lineTo(u1, y + h * (.3 + r() * .4)); c.lineTo(u1, y + h); }
  c.moveTo(x - 4, y + h + 6); c.lineTo(x + w + 6, y + h + 2); c.stroke(); }
function drips(c, x0, w, y, col, n, r) { c.strokeStyle = col; c.lineCap = 'round'; for (let i = 0; i < n; i++) { const x = x0 + r() * w; c.lineWidth = 2 + r() * 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 10 + r() * 40); c.stroke(); } }
function nightTint(c, w, h, a = .5) { c.save(); c.globalCompositeOperation = 'source-atop'; c.fillStyle = `rgba(22,30,71,${a})`; c.fillRect(0, 0, w, h); c.restore(); }
function glowDots(c, x, y, r, col = PAL.yellow) { halftone(c, x - r, y - r, r * 2, r * 2, col, 7, (px, py) => { const d = Math.hypot(px - x, py - y) / r; return d < 1 ? 3.2 * (1 - d) : 0; }); }

function buildProcedural() {
  NOISE = mk(256, 256, (c) => { const r = rng(99); for (let i = 0; i < 2600; i++) { c.fillStyle = r() < .7 ? 'rgba(17,17,17,.55)' : 'rgba(243,238,226,.8)';
    c.fillRect(r() * 256, r() * 256, r() * 2.2 + .4, r() * 2.2 + .4); } });
  MOON = mk(360, 360, (c) => { // lua de retícula: miolo chapado + pontos que somem pra fora
    const r = rng(4);
    halftone(c, 0, 0, 360, 360, PAL.paper, 9, (x, y) => { const d = Math.hypot(x - 180, y - 180); return d < 172 ? (d < 112 ? 4.6 : 4.6 * (1 - (d - 112) / 64)) : 0; });
    c.fillStyle = PAL.paper; c.beginPath(); c.arc(180, 180, 108, 0, 7); c.fill();
    c.fillStyle = PAL.paper3; for (let i = 0; i < 7; i++) { const a = r() * 7, d = r() * 70, rr = 8 + r() * 18; c.beginPath(); c.arc(180 + Math.cos(a) * d, 180 + Math.sin(a) * d, rr, 0, 7); c.fill(); }
    halftone(c, 60, 60, 240, 240, PAL.blue, 6, (x, y) => { const d = Math.hypot(x - 205, y - 200); return Math.hypot(x - 180, y - 180) < 106 && d > 70 ? 1.6 * Math.min(1, (d - 70) / 40) : 0; });
    c.strokeStyle = PAL.ink; c.lineWidth = 4; wob(c, Array.from({ length:40 }, (_, i) => [180 + Math.cos(i / 40 * 6.283) * 110, 180 + Math.sin(i / 40 * 6.283) * 110]), r, true, 3); c.stroke(); });
  BAND = mk(512, 64, (c) => halftone(c, 0, 0, 512, 64, PAL.night2, 8, (x, y) => 4.6 * (1 - y / 64)));
  const r = rng(77); STARS = [];
  for (let i = 0; i < 190; i++) STARS.push({ x:(r() - .5) * 4200, y:260 + Math.pow(r(), .8) * 3000, s:2 + r() * 5, k:r() < .25, ph:Math.floor(r() * 3) });
  PUMPRING = mk(160, 160, (c) => { c.strokeStyle = PAL.yellow; c.lineWidth = 10; c.beginPath(); c.arc(80, 80, 60, 0, 7); c.stroke(); c.strokeStyle = PAL.ink; c.lineWidth = 3; c.beginPath(); c.arc(80, 80, 68, 0, 7); c.stroke(); });
  buildStickers(); buildLetters();
}

// adesivos (chuva do DROP 35) — recortados com borda branca
const STICK_KINDS = ['estrela', 'caveira', 'raio', 'chama', 'coroa', 'olho', 'coracao', 'roda'];
function dieCut(c, path, fill) { c.lineJoin = 'round'; path(); c.lineWidth = 16; c.strokeStyle = PAL.ink; c.stroke(); c.lineWidth = 11; c.strokeStyle = '#fff'; c.stroke(); c.fillStyle = fill; c.fill(); c.lineWidth = 3; c.strokeStyle = PAL.ink; c.stroke(); }
function buildStickers() {
  const P = (c, k) => {
    const T = (fn) => () => { c.beginPath(); fn(); };
    switch (k) {
      case 'estrela': dieCut(c, T(() => { star(c, 48, 50, 34, 5, -Math.PI / 2, .45); }), PAL.yellow); break;
      case 'caveira': dieCut(c, T(() => { c.arc(48, 42, 28, Math.PI * .8, Math.PI * 2.2); c.lineTo(66, 76); c.lineTo(30, 76); c.closePath(); }), PAL.paper);
        c.fillStyle = PAL.ink; c.beginPath(); c.arc(38, 44, 8, 0, 7); c.arc(58, 44, 8, 0, 7); c.fill(); c.fillRect(44, 56, 3, 14); c.fillRect(50, 56, 3, 14); break;
      case 'raio': dieCut(c, T(() => { c.moveTo(56, 8); c.lineTo(24, 54); c.lineTo(46, 54); c.lineTo(36, 90); c.lineTo(72, 40); c.lineTo(50, 40); c.closePath(); }), PAL.yellow); break;
      case 'chama': dieCut(c, T(() => { c.moveTo(48, 90); c.bezierCurveTo(14, 86, 16, 50, 34, 30); c.bezierCurveTo(34, 44, 42, 48, 44, 40); c.bezierCurveTo(46, 24, 56, 14, 60, 6); c.bezierCurveTo(64, 30, 84, 46, 78, 70); c.bezierCurveTo(74, 86, 60, 90, 48, 90); }), PAL.red);
        c.fillStyle = PAL.yellow; c.beginPath(); c.moveTo(48, 84); c.bezierCurveTo(34, 80, 36, 62, 46, 52); c.bezierCurveTo(50, 62, 64, 66, 60, 76); c.closePath(); c.fill(); break;
      case 'coroa': dieCut(c, T(() => { c.moveTo(14, 72); c.lineTo(10, 28); c.lineTo(32, 48); c.lineTo(48, 16); c.lineTo(64, 48); c.lineTo(86, 28); c.lineTo(82, 72); c.closePath(); }), PAL.yellow);
        c.fillStyle = PAL.red; c.beginPath(); c.arc(48, 60, 6, 0, 7); c.fill(); break;
      case 'olho': dieCut(c, T(() => { c.moveTo(8, 50); c.quadraticCurveTo(48, 6, 88, 50); c.quadraticCurveTo(48, 94, 8, 50); }), PAL.paper);
        c.fillStyle = PAL.blue; c.beginPath(); c.arc(48, 50, 17, 0, 7); c.fill(); c.fillStyle = PAL.ink; c.beginPath(); c.arc(48, 50, 8, 0, 7); c.fill(); break;
      case 'coracao': dieCut(c, T(() => { c.moveTo(48, 86); c.bezierCurveTo(6, 56, 8, 18, 30, 18); c.bezierCurveTo(42, 18, 48, 30, 48, 34); c.bezierCurveTo(48, 30, 54, 18, 66, 18); c.bezierCurveTo(88, 18, 90, 56, 48, 86); }), PAL.red); break;
      case 'roda': dieCut(c, T(() => { c.arc(48, 50, 34, 0, 7); }), PAL.red);
        c.fillStyle = PAL.paper; c.beginPath(); c.arc(48, 50, 13, 0, 7); c.fill(); c.strokeStyle = PAL.ink; c.lineWidth = 3; c.stroke(); break;
    }
  };
  for (const k of STICK_KINDS) STICK[k] = boilVariants(mk(96, 100, (c) => P(c, k)));
}
const PRODS = [ // produtos da collab (mesmos do jogo 1): aparece um por vez, cada um mais alto — o último só com muito embalo
  { k:'p-meia', n:'MEIA', side:1, h:200 }, { k:'p-mouse', n:'MOUSE', side:-1, h:450 },
  { k:'p-shape', n:'SHAPE', side:1, h:700 }, { k:'p-teclado', n:'TECLADO', side:-1, h:980 }];
const prodXY = it => [it.side * (G.XC + 10), G.YC + it.h];
const LETRAS = [ // (antigo) letras D-R-O-P — trocadas pelos produtos
  { c:'D', side:-1, h:210, col:PAL.yellow }, { c:'R', side:1, h:390, col:PAL.red },
  { c:'O', side:-1, h:590, col:PAL.blue }, { c:'P', side:1, h:820, col:PAL.yellow }];
function buildLetters() {
  for (const L of LETRAS) LETTER[L.c] = boilVariants(mk(170, 170, (c) => {
    c.font = '130px "Rubik Spray Paint"'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
    c.lineWidth = 34; c.strokeStyle = PAL.ink; c.strokeText(L.c, 87, 92); c.lineWidth = 26; c.strokeStyle = '#fff'; c.strokeText(L.c, 85, 90);
    c.fillStyle = L.col; c.fillText(L.c, 85, 90); c.lineWidth = 3; c.strokeStyle = PAL.ink; c.strokeText(L.c, 85, 90); }));
}

// ---- camadas do cenário (mundo: px; base = chão) ----
function buildSkyline() { // cidade lá longe com janelas acesas
  const w = 4200, h = 620;
  return mk(w, h, (c) => { const r = rng(31); let x = 0;
    while (x < w) { const bw = 70 + r() * 150, bh = 170 + r() * 420, y = h - bh;
      inkRect(c, x, y, bw, bh, r() < .5 ? PAL.night2 : PAL.blue2, 3, r);
      if (r() < .35) { c.strokeStyle = PAL.ink; c.lineWidth = 3; c.beginPath(); c.moveTo(x + bw * .5, y); c.lineTo(x + bw * .5, y - 30 - r() * 50); c.stroke(); c.fillStyle = PAL.red; c.beginPath(); c.arc(x + bw * .5, y - 30, 4, 0, 7); c.fill(); }
      if (r() < .3) inkRect(c, x + bw * .2, y - 22, 26, 22, PAL.night3, 2, r);
      for (let wy = y + 14; wy < h - 20; wy += 22) for (let wx = x + 10; wx < x + bw - 16; wx += 18) { const q = r(); if (q < .22) { c.fillStyle = q < .04 ? PAL.paper : PAL.yellow; c.fillRect(wx, wy, 8, 11); } }
      x += bw + (r() < .3 ? r() * 30 : -4); }
  });
}
function buildOverpass() { // viaduto de concreto com pixação
  const w = 3800, h = 470, top = 120, bot = 196;
  return mk(w, h, (c) => { const r = rng(12);
    for (let px = 140; px < w; px += 560) { inkRect(c, px, bot, 74, h - bot, PAL.paper3, 4, r);
      halftone(c, px + 40, bot, 34, h - bot, PAL.ink, 7, () => 1.5); tag(c, px + 6, h - 120, 60, 40, r() < .5 ? PAL.red : PAL.ink, r, 3); }
    inkRect(c, -10, top, w + 20, bot - top, PAL.paper3, 5, r);
    halftone(c, 0, bot - 26, w, 26, PAL.ink, 7, (x, y) => 2.2 * ((y - (bot - 26)) / 26));
    c.strokeStyle = PAL.ink; c.lineWidth = 3; c.beginPath(); c.moveTo(0, top - 36); c.lineTo(w, top - 36); c.stroke();
    for (let x = 0; x < w; x += 46) { c.beginPath(); c.moveTo(x, top - 36); c.lineTo(x, top); c.stroke(); }
    const words = ['DROP DEAD 35', 'PCYES', 'SKT', 'DD35', 'ZN', 'DROP DEAD'];
    for (let x = 60, i = 0; x < w - 200; x += 260 + r() * 260, i++) {
      if (i % 3 === 0) { const t = words[i % words.length]; c.save(); c.translate(x + 140, (top + bot) / 2 + 4); c.rotate((r() - .5) * .06);
        c.font = `${i % 2 ? 54 : 46}px ${i % 2 ? '"Rubik Spray Paint"' : '"Sedgwick Ave Display"'}`; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.lineWidth = 8; c.strokeStyle = i % 6 === 0 ? PAL.yellow : PAL.paper; c.strokeText(t, 0, 0); c.fillStyle = i % 6 === 0 ? PAL.ink : PAL.red; c.fillText(t, 0, 0); c.restore();
        drips(c, x + 40, 200, bot - 6, i % 2 ? PAL.red : PAL.ink, 4, r); }
      else tag(c, x, top + 14, 120 + r() * 80, 46, r() < .25 ? PAL.red : PAL.ink, r, 4);
    }
    nightTint(c, w, h, .55);
  });
}
function lamp(c, x, h, r, dir) { // poste de luz amarelo
  c.strokeStyle = PAL.ink; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, h); c.lineTo(x, h - 360); c.quadraticCurveTo(x, h - 390, x + dir * 60, h - 392); c.stroke();
  return [x + dir * 66, h - 384]; }
function buildShop() { // loja Drop Dead com luz quente, prédios vizinhos, postes e fiação
  const w = 3000, h = 640, cx = w / 2, gy = h - 4;
  const lit = []; // coisas que brilham: desenhadas depois do tom noturno
  const can = mk(w, h, (c) => { const r = rng(55);
    // vizinho esquerdo: prédio azul, porta de aço, lambe-lambes
    inkRect(c, cx - 1500, gy - 560, 1060, 560, PAL.blue2, 5, r);
    for (let wy = gy - 520; wy < gy - 230; wy += 86) for (let wx = cx - 1440; wx < cx - 520; wx += 92) { inkRect(c, wx, wy, 46, 58, PAL.night3, 3, r); if (r() < .35) lit.push(['win', wx, wy, 46, 58]); }
    inkRect(c, cx - 1000, gy - 190, 300, 190, PAL.paper3, 4, r);
    c.strokeStyle = PAL.ink; c.lineWidth = 2.5; for (let y = gy - 175; y < gy; y += 15) { c.beginPath(); c.moveTo(cx - 1000, y); c.lineTo(cx - 700, y); c.stroke(); }
    tag(c, cx - 980, gy - 150, 250, 70, PAL.red, r, 6);
    for (let i = 0; i < 6; i++) { const px = cx - 660 + i * 34 + r() * 8, py = gy - 220 + r() * 30; c.save(); c.translate(px, py); c.rotate((r() - .5) * .2);
      inkRect(c, 0, 0, 30, 42, [PAL.paper, PAL.yellow, PAL.red, PAL.paper][i % 4], 2, r); c.fillStyle = PAL.ink; c.fillRect(5, 8, 20, 4); c.fillRect(5, 16, 14, 3); c.restore(); }
    // vizinho direito: sobrado creme com janelas e pixação no topo
    inkRect(c, cx + 440, gy - 470, 1060, 470, PAL.paper2, 5, r);
    for (let wy = gy - 420; wy < gy - 140; wy += 110) for (let wx = cx + 500; wx < cx + 1440; wx += 120) { inkRect(c, wx, wy, 60, 74, PAL.night3, 3, r); if (r() < .3) lit.push(['win', wx, wy, 60, 74]); }
    for (let x = cx + 470; x < cx + 1420; x += 170 + r() * 90) tag(c, x, gy - 466 + 10, 110, 40, r() < .3 ? PAL.red : PAL.ink, r, 4);
    inkRect(c, cx + 1100, gy - 120, 260, 120, PAL.blue, 4, r);
    // a loja
    inkRect(c, cx - 440, gy - 430, 880, 430, PAL.paper, 6, r);
    inkRect(c, cx - 440, gy - 120, 880, 120, PAL.blue, 5, r);
    halftone(c, cx - 440, gy - 430, 880, 60, PAL.ink, 8, (x, y) => 2 * (1 - (y - (gy - 430)) / 60));
    // letreiro
    inkRect(c, cx - 330, gy - 410, 660, 104, PAL.ink, 5, r);
    inkRect(c, cx - 318, gy - 400, 636, 84, PAL.blue, 3, r);
    // toldo listrado
    for (let i = 0; i < 18; i++) { const x0 = cx - 430 + i * 48; c.fillStyle = i % 2 ? PAL.red : PAL.paper; c.beginPath(); c.moveTo(x0, gy - 300); c.lineTo(x0 + 48, gy - 300); c.lineTo(x0 + 52, gy - 256); c.arc(x0 + 26, gy - 256, 24, 0, Math.PI); c.closePath(); c.fill(); }
    c.strokeStyle = PAL.ink; c.lineWidth = 5; c.beginPath(); c.moveTo(cx - 432, gy - 300); c.lineTo(cx + 432, gy - 300); c.stroke();
    // vitrines + porta (acesas depois)
    lit.push(['shop', cx]);
    // postes de luz e de fiação
    lit.push(['lamp', ...lamp(c, cx - 560, gy, r, 1)]); lit.push(['lamp', ...lamp(c, cx + 560, gy, r, -1)]);
    const poles = [cx - 1250, cx - 880, cx + 900, cx + 1300];
    for (const p of poles) { c.strokeStyle = PAL.ink; c.lineWidth = 14; c.beginPath(); c.moveTo(p, gy); c.lineTo(p, gy - 600); c.stroke();
      c.lineWidth = 6; c.beginPath(); c.moveTo(p - 44, gy - 570); c.lineTo(p + 44, gy - 570); c.moveTo(p - 30, gy - 540); c.lineTo(p + 30, gy - 540); c.stroke(); }
    c.lineWidth = 2.5; for (let i = 0; i < poles.length - 1; i++) for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(poles[i] - 40 + k * 30, gy - 570 + (k % 2) * 30); c.quadraticCurveTo((poles[i] + poles[i + 1]) / 2, gy - 470 + k * 22, poles[i + 1] - 40 + k * 30, gy - 570 + (k % 2) * 30); c.stroke(); }
    // calçada
    inkRect(c, -10, gy - 14, w + 20, 18, PAL.paper3, 3, r);
    nightTint(c, w, h, .42);
    // —— luz ——
    for (const L of lit) {
      if (L[0] === 'win') { c.fillStyle = PAL.yellow; c.fillRect(L[1] + 5, L[2] + 5, L[3] - 10, L[4] - 10); c.fillStyle = PAL.ink; c.fillRect(L[1] + L[3] / 2 - 1.5, L[2] + 5, 3, L[4] - 10); }
      if (L[0] === 'lamp') { glowDots(c, L[1], L[2] + 10, 120); c.fillStyle = PAL.ink; c.beginPath(); c.ellipse(L[1], L[2] - 4, 30, 12, 0, 0, 7); c.fill();
        c.fillStyle = '#FFE58A'; c.beginPath(); c.ellipse(L[1], L[2] + 6, 22, 8, 0, 0, 7); c.fill(); }
      if (L[0] === 'shop') {
        halftone(c, cx - 420, gy - 16, 840, 16, PAL.yellow, 6, (x) => 2.6 * (1 - Math.abs(x - cx) / 420));
        // vitrines
        for (const sg of [-1, 1]) { const x0 = sg < 0 ? cx - 400 : cx + 110;
          inkRect(c, x0, gy - 240, 290, 200, PAL.yellow, 6, r);
          const cols = [PAL.red, PAL.blue, PAL.ink, PAL.paper, PAL.blue, PAL.red];
          for (let i = 0; i < 6; i++) { const dx = x0 + 22 + i * 44, dy = gy - 224 + (i % 2) * 10; c.save(); c.translate(dx + 15, dy + 70); c.rotate((i - 2.5) * .04);
            c.fillStyle = cols[i]; c.strokeStyle = PAL.ink; c.lineWidth = 3; c.beginPath(); c.roundRect(-15, -70, 30, 140, 15); c.fill(); c.stroke();
            c.fillStyle = i % 2 ? PAL.yellow : PAL.paper; c.beginPath(); i % 3 === 0 ? star(c, 0, -10, 11, 5, -1.57) : c.arc(0, -6, 8, 0, 7); c.fill(); c.restore(); }
          c.strokeStyle = PAL.ink; c.lineWidth = 4; c.beginPath(); c.moveTo(x0, gy - 140); c.lineTo(x0 + 290, gy - 140); c.stroke();
          c.fillStyle = 'rgba(243,238,226,.5)'; c.beginPath(); c.moveTo(x0 + 20, gy - 230); c.lineTo(x0 + 60, gy - 230); c.lineTo(x0 + 20, gy - 160); c.fill(); }
        // porta aberta com luz
        inkRect(c, cx - 76, gy - 250, 152, 250, '#FFE58A', 6, r);
        c.fillStyle = PAL.yellow; c.fillRect(cx - 62, gy - 236, 124, 236);
        c.fillStyle = PAL.ink; c.beginPath(); c.ellipse(cx + 8, gy - 150, 15, 18, 0, 0, 7); c.fill(); c.fillRect(cx - 10, gy - 134, 36, 100); // cliente lá dentro
        c.strokeStyle = PAL.ink; c.lineWidth = 4; c.strokeRect(cx - 62, gy - 236, 124, 236);
        // letreiro: texto
        c.save(); c.translate(cx, gy - 360); c.rotate(-.015); c.font = '62px Graduate'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = PAL.ink; c.fillText('DROP DEAD', 4, 4); c.fillStyle = PAL.yellow; c.fillText('DROP DEAD', 0, 0); c.restore();
        c.font = '18px Graduate'; c.fillStyle = PAL.paper; c.textAlign = 'center'; c.fillText('SKATE SHOP', cx, gy - 318 + 6);
        // luzinhas do letreiro
        for (let i = 0; i < 14; i++) { c.fillStyle = i % 2 ? PAL.yellow : PAL.paper; c.beginPath(); c.arc(cx - 312 + i * 48, gy - 420, 5, 0, 7); c.fill(); }
      }
    }
  });
  return can;
}
function person(c, x, base, hh, r, up, kind) { // silhueta de plateia em nanquim com pitadas de cor
  const head = hh * .13, sh = base - hh + head * 2.2, jump = up ? -hh * .04 : 0;
  c.save(); c.translate(0, jump);
  c.fillStyle = PAL.ink; c.strokeStyle = PAL.ink; c.lineCap = 'round';
  // tronco
  c.beginPath(); c.roundRect(x - hh * .16, sh, hh * .32, hh * .62, hh * .08); c.fill();
  if (kind.shirt) { c.fillStyle = kind.shirt; c.beginPath(); c.roundRect(x - hh * .12, sh + hh * .06, hh * .24, hh * .22, 3); c.fill(); }
  // cabeça
  c.fillStyle = PAL.ink; c.beginPath(); c.arc(x, sh - head * .9, head, 0, 7); c.fill();
  if (kind.cap) { c.fillStyle = kind.cap; c.beginPath(); c.arc(x, sh - head * 1.05, head * 1.02, Math.PI, 0); c.fill(); c.fillRect(x - head * (kind.dir > 0 ? 0 : 1.7), sh - head * 1.1, head * 1.7, head * .3); }
  // braços
  c.strokeStyle = PAL.ink; c.lineWidth = hh * .07;
  for (const sg of [-1, 1]) { c.beginPath(); c.moveTo(x + sg * hh * .13, sh + hh * .05);
    if (up) { c.lineTo(x + sg * hh * .24, sh - hh * .14); c.lineTo(x + sg * hh * .2, sh - hh * .3); }
    else if (kind.phone && sg > 0) { c.lineTo(x + hh * .2, sh + hh * .16); c.lineTo(x + hh * .1, sh - hh * .04); }
    else { c.lineTo(x + sg * hh * .2, sh + hh * .3); c.lineTo(x + sg * hh * .19, sh + hh * .46); }
    c.stroke(); }
  if (kind.phone) { const px = up ? x + hh * .2 : x + hh * .1, py = up ? sh - hh * .38 : sh - hh * .14; c.fillStyle = PAL.ink; c.fillRect(px - 7, py - 10, 14, 20); c.fillStyle = PAL.yellow; c.fillRect(px - 5, py - 8, 10, 15); }
  if (kind.board) { c.save(); c.translate(x - hh * .26, sh + hh * .3); c.rotate(-.08); c.fillStyle = kind.board; c.strokeStyle = PAL.ink; c.lineWidth = 3; c.beginPath(); c.roundRect(-8, -hh * .34, 16, hh * .7, 8); c.fill(); c.stroke(); c.restore(); }
  c.restore();
}
function crowdRow(w, h, seed, n, frame, scale = 1) {
  return mk(w, h, (c) => { const r = rng(seed); let x = 20;
    while (x < w - 20) { const kid = r() < .2, hh = (kid ? 100 + r() * 20 : 140 + r() * 40) * scale;
      const kind = { cap:r() < .45 ? [PAL.red, PAL.blue, PAL.yellow][Math.floor(r() * 3)] : null, shirt:r() < .4 ? [PAL.yellow, PAL.red, PAL.paper, PAL.blue][Math.floor(r() * 4)] : null,
        phone:r() < .3, board:r() < .15 ? [PAL.red, PAL.blue, PAL.yellow][Math.floor(r() * 3)] : null, dir:r() < .5 ? -1 : 1 };
      const up = frame === 1 && r() < .8; person(c, x, h, hh, r, up, kind); x += (28 + r() * 34) * scale; if (r() < .1) x += 40 * scale; }
  });
}

// ---- half-pipe ----
// perfil da arte: a superfície onde a roda encosta é o traço de cima da madeira (alfa da halfpipe.webp).
// HPK = unidades de mundo por pixel da arte; a arte é desenhada na proporção original.
const HPK = .8; let PROF = null, HPIMG = null;
function buildProfile(img) {
  const w = img.width, h = img.height, d = mk(w, h, c => c.drawImage(img, 0, 0)).getContext('2d').getImageData(0, 0, w, h).data;
  const A = (x, y) => d[(y * w + x) * 4 + 3] > 128, cx = w >> 1;
  let fy = 0; while (fy < h - 1 && !A(cx, fy)) fy++; // fundo plano no meio
  const scan = (y, sg) => { let x = cx; while (x > 0 && x < w - 1 && !A(x, y)) x += sg; return x; };
  const pts = []; let prev = null;
  for (let y = fy - 2; y > 0; y -= 2) { const xl = scan(y, -1), xr = scan(y, 1), dx = (xr - xl) / 2;
    if (prev != null && dx - prev > 14) break; // passou da borda (pulou pro corrimão)
    pts.push([dx, y]); prev = dx; }
  // fundo plano: do meio até onde a curva começa
  const f0 = pts[0][0]; const raw = [[0, fy]]; for (let x = 4; x < f0; x += 4) raw.push([x, fy]); raw.push(...pts);
  // suaviza (média móvel) e passa pra mundo: x a partir do centro, y a partir da base da arte
  const sm = raw.map((p, i) => { let sx = 0, sy = 0, n = 0; for (let j = Math.max(0, i - 3); j <= Math.min(raw.length - 1, i + 3); j++) { sx += raw[j][0]; sy += raw[j][1]; n++; } return i === 0 ? p : [sx / n, sy / n]; });
  const X = [], Y = [], S = [], Aa = []; let acc = 0;
  sm.forEach(([px, py], i) => { const x = px * HPK, y = (h - py) * HPK; if (i) acc += Math.hypot(x - X[i - 1], y - Y[i - 1]); X.push(x); Y.push(y); S.push(acc); });
  for (let i = 0; i < X.length; i++) { const a = Math.max(0, i - 2), b = Math.min(X.length - 1, i + 2); Aa.push(clamp(Math.atan2(Y[b] - Y[a], X[b] - X[a]), 0, Math.PI / 2)); }
  Aa[0] = 0;
  PROF = { X, Y, S, A:Aa };
  G.B = Y[0]; G.F0 = f0 * HPK; G.SMAX = acc; G.S2 = acc; G.YC = Y[Y.length - 1]; G.XC = X[X.length - 1];
  G.XE = w / 2 * HPK - 30; G.DECK = G.XE - G.XC; G.RAIL = h * HPK - G.YC; // corrimão já vem na arte
  HPIMG = { w:w * HPK, h:h * HPK };
}
function geo(s) { // ponto na pista pelo comprimento de arco s (0 = meio); a = ângulo da tangente (sentido +s)
  const sg = s < 0 ? -1 : 1, u = Math.abs(s); let x, y, a;
  if (PROF) { const S = PROF.S; let lo = 0, hi = S.length - 1; const q = Math.min(u, S[hi]);
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (S[m] <= q) lo = m; else hi = m; }
    const t = S[hi] > S[lo] ? (q - S[lo]) / (S[hi] - S[lo]) : 0;
    x = lerp(PROF.X[lo], PROF.X[hi], t); y = lerp(PROF.Y[lo], PROF.Y[hi], t); a = lerp(PROF.A[lo], PROF.A[hi], t);
    return { x:sg * x, y, a:sg * a }; }
  if (u <= G.F0) { x = u; y = G.B; a = 0; }
  else if (u <= G.S2) { const th = (u - G.F0) / G.R; x = G.F0 + G.R * Math.sin(th); y = G.B + G.R - G.R * Math.cos(th); a = th; }
  else { x = G.XC; y = G.B + G.R + (u - G.S2); a = Math.PI / 2; }
  return { x:sg * x, y, a:sg * a };
}
const HP_RES = 1.5, HP_X0 = -G.XE - 30, HP_W = (G.XE + 30) * 2, HP_H = G.YC + G.RAIL + 24;
function buildHalfpipe() {
  const K = HP_RES, X = x => (x - HP_X0) * K, Y = y => (HP_H - y) * K;
  return mk(HP_W * K, HP_H * K, (c, cw, ch) => { const r = rng(35);
    // silhueta lateral (chapa de compensado) sob a curva
    const prof = []; for (let s = -G.SMAX; s <= G.SMAX; s += 6) { const g = geo(s); prof.push([X(g.x), Y(g.y)]); }
    const body = () => { c.beginPath(); c.moveTo(X(-G.XC), Y(0)); prof.forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(X(G.XC), Y(0)); c.closePath(); };
    // estrutura dos decks (aberta, com vigas)
    for (const sg of [-1, 1]) { const xa = sg * G.XC, xb = sg * (G.XE - 10);
      c.strokeStyle = PAL.ink; c.lineCap = 'round';
      for (const px of [xb, sg * (G.XC + G.DECK * .5)]) { c.lineWidth = 12 * K; c.beginPath(); c.moveTo(X(px), Y(0)); c.lineTo(X(px), Y(G.YC)); c.stroke();
        c.strokeStyle = PAL.paper3; c.lineWidth = 6 * K; c.beginPath(); c.moveTo(X(px), Y(4)); c.lineTo(X(px), Y(G.YC - 4)); c.stroke(); c.strokeStyle = PAL.ink; }
      c.lineWidth = 6 * K; c.beginPath(); c.moveTo(X(xa), Y(G.YC * .15)); c.lineTo(X(xb), Y(G.YC * .62)); c.moveTo(X(xa), Y(G.YC * .62)); c.lineTo(X(xb), Y(G.YC * .15));
      c.moveTo(X(xa), Y(G.YC * .62)); c.lineTo(X(xb), Y(G.YC * .62)); c.stroke(); }
    body(); c.fillStyle = PAL.paper2; c.fill();
    c.save(); body(); c.clip();
    halftone(c, 0, 0, cw, ch, PAL.yellow, 9 * K, (x, y) => 2.6 * K); // madeira: chapado + retícula amarela
    halftone(c, 0, ch * .55, cw, ch * .45, PAL.ink, 7 * K, (x, y) => 1.9 * K * ((y - ch * .55) / (ch * .45))); // sombra no pé
    // emendas das chapas e parafusos
    c.strokeStyle = PAL.ink; c.lineWidth = 2.5 * K;
    for (let x = -G.XC + 120; x < G.XC; x += 122) { c.beginPath(); c.moveTo(X(x), Y(0)); c.lineTo(X(x), Y(G.YC + 20)); c.stroke();
      c.fillStyle = PAL.ink; for (let y = 20; y < G.YC; y += 42) { c.beginPath(); c.arc(X(x - 8), Y(y), 2.2 * K, 0, 7); c.arc(X(x + 8), Y(y + 21), 2.2 * K, 0, 7); c.fill(); } }
    c.beginPath(); c.moveTo(X(-G.XC), Y(G.B + 120)); c.lineTo(X(G.XC), Y(G.B + 120)); c.stroke();
    // adesivos e pixo na lateral
    const stick = [['PCYES', PAL.red, PAL.paper], ['DD35', PAL.yellow, PAL.ink], ['SKATE', PAL.blue, PAL.paper], ['×', PAL.paper, PAL.red], ['DROP', PAL.ink, PAL.yellow], ['35', PAL.red, PAL.yellow]];
    for (let i = 0; i < 14; i++) { const x = -G.XC + 60 + r() * (G.XC * 2 - 120), y = 12 + r() * 120;
      const gx = Math.abs(x); let maxY = G.B - 4; if (gx > G.F0) { const th = Math.asin(Math.min(1, (gx - G.F0) / G.R)); maxY = G.B + G.R - G.R * Math.cos(th) - 18; }
      if (y > maxY - 10) continue; const [t, bg, fg] = stick[i % stick.length];
      c.save(); c.translate(X(x), Y(y)); c.rotate((r() - .5) * .5);
      if (i % 4 === 3) { c.fillStyle = '#fff'; c.strokeStyle = PAL.ink; c.lineWidth = 3 * K; c.beginPath(); c.arc(0, 0, 18 * K, 0, 7); c.fill(); c.stroke(); c.fillStyle = bg; c.beginPath(); c.arc(0, 0, 13 * K, 0, 7); c.fill(); }
      else { c.font = `${16 * K}px Graduate`; const tw = c.measureText(t).width + 14 * K, th2 = 26 * K;
        c.fillStyle = PAL.ink; c.fillRect(-tw / 2 + 3 * K, -th2 / 2 + 3 * K, tw, th2); c.fillStyle = bg; c.fillRect(-tw / 2, -th2 / 2, tw, th2);
        c.strokeStyle = PAL.ink; c.lineWidth = 2 * K; c.strokeRect(-tw / 2, -th2 / 2, tw, th2); c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, 0, 1 * K); }
      c.restore(); }
    for (let i = 0; i < 7; i++) { const x = -G.XC + 80 + r() * (G.XC * 2 - 300); const gx = Math.abs(x); let maxY = G.B - 8; if (gx > G.F0) { const th = Math.asin(Math.min(1, (gx - G.F0) / G.R)); maxY = G.B + G.R - G.R * Math.cos(th) - 20; }
      if (maxY < 70) continue; tag(c, X(x), Y(Math.min(maxY, 60 + r() * 80)), 90 * K, 34 * K, r() < .3 ? PAL.red : PAL.ink, r, 3.5 * K); }
    c.restore();
    // superfície de andar: camadas (masonite azul + nanquim)
    const surf = (lw, col, off) => { c.strokeStyle = col; c.lineWidth = lw * K; c.lineJoin = 'round'; c.beginPath(); prof.forEach(([x, y], i) => { const s = -G.SMAX + i * 6, g = geo(s), nx = -Math.sin(g.a), ny = Math.cos(g.a);
      const px = x - nx * off * K, py = y + ny * off * K; i ? c.lineTo(px, py) : c.moveTo(px, py); }); c.stroke(); };
    surf(16, PAL.ink, 7); surf(8, PAL.blue, 6); surf(5, PAL.ink, 0);
    body(); c.strokeStyle = PAL.ink; c.lineWidth = 5 * K; c.stroke();
    // decks, coping e grade
    for (const sg of [-1, 1]) {
      const x0 = sg < 0 ? -G.XE : G.XC; inkRect(c, X(x0), Y(G.YC), G.DECK * K, 16 * K, PAL.paper3, 4 * K, r);
      c.fillStyle = PAL.ink; for (let x = 10; x < G.DECK; x += 24) c.fillRect(X(x0 + x), Y(G.YC) + 2 * K, 2 * K, 12 * K);
      // grade no fundo do deck
      const rx = sg * (G.XE - 12); c.strokeStyle = PAL.ink; c.lineWidth = 6 * K; c.beginPath(); c.moveTo(X(rx), Y(G.YC)); c.lineTo(X(rx), Y(G.YC + G.RAIL));
      c.moveTo(X(rx - sg * 60), Y(G.YC)); c.lineTo(X(rx - sg * 60), Y(G.YC + G.RAIL)); c.stroke();
      c.lineWidth = 8 * K; c.beginPath(); c.moveTo(X(rx + sg * 4), Y(G.YC + G.RAIL)); c.lineTo(X(rx - sg * 86), Y(G.YC + G.RAIL)); c.stroke();
      c.strokeStyle = PAL.paper; c.lineWidth = 3 * K; c.beginPath(); c.moveTo(X(rx), Y(G.YC + G.RAIL + 1)); c.lineTo(X(rx - sg * 82), Y(G.YC + G.RAIL + 1)); c.stroke();
      c.strokeStyle = PAL.ink; c.lineWidth = 4 * K; c.beginPath(); c.moveTo(X(rx), Y(G.YC + G.RAIL * .5)); c.lineTo(X(rx - sg * 60), Y(G.YC + G.RAIL * .5)); c.stroke();
      // coping (cano de metal)
      c.fillStyle = PAL.ink; c.beginPath(); c.arc(X(sg * (G.XC - 2)), Y(G.YC + 2), 12 * K, 0, 7); c.fill();
      c.fillStyle = PAL.paper; c.beginPath(); c.arc(X(sg * (G.XC - 2)), Y(G.YC + 2), 8 * K, 0, 7); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(X(sg * (G.XC - 2)) - 3 * K, Y(G.YC + 2) - 3 * K, 3 * K, 0, 7); c.fill();
    }
    // chão de rua sob a pista
    c.strokeStyle = PAL.ink; c.lineWidth = 6 * K; c.beginPath(); c.moveTo(0, Y(0)); c.lineTo(cw, Y(0)); c.stroke();
  });
}
function buildDeckCrowd() {
  return [0, 1].map(f => [-1, 1].map(sg => boilVariants(crowdRow(170, 190, sg < 0 ? 701 : 707, 3, f, .82))));
}
function buildLayers() {
  LAYERS.city = { img:boilVariants(buildSkyline()), d:.78, w:4200, h:620 };
  LAYERS.via = { img:boilVariants(buildOverpass()), d:.55, w:3800, h:470 };
  LAYERS.shop = { img:boilVariants(buildShop()), d:.3, w:3000, h:640 };
  LAYERS.crowd = { img:[0, 1].map(f => boilVariants(crowdRow(3400, 230, 404, 0, f, .95))), d:.12, w:3400, h:230 };
  HP = boilVariants(buildHalfpipe());
  DECKCROWD = buildDeckCrowd();
}

// ---------- estado ----------
let P, state = 'load', popups = [], parts = [], rain = [], tags = [], shake = 0, hitstop = 0, clock = 0, boilF = 0, dropT = 0, flash = 0, cheerT = 0, meter = 0, endT = 0;
let MISS = {}; try { MISS = JSON.parse(localStorage.getItem('dropsession-missoes') || '{}') || {}; } catch (e) {}
let BEST = 0; try { BEST = +localStorage.getItem('dropsession-best') || 0; } catch (e) {}
const T0 = +QS.get('t') || SESSION;
function reset() {
  P = { mode:'ride', s:-G.SMAX + 1, v:PH.drop, nose:1, time:T0, score:0, line:[], pending:0, crouch:false, landT:0, pushT:0, dropinT:.4,
    descT:0, pumpT:0, wasTrans:true, pumps:0, grabStreak:0, airGrab:false, letters:{}, prod:0, prodT:0, bails:0, best540:false, tut:0, airs:0, lastTick:SESSION + 1,
    x:0, y:0, vy:0, t:0, T:1, side:1, nose0:1, spin:0, spinV:0, flip:null, grab:null, rf:null, buf:null, glowT:0, bailT:0, angD:0, angTick:-1, newMiss:{} };
  popups = []; parts = []; rain = []; tags = []; dropT = 0; cheerT = 0; meter = QS.has('meter') ? 1 : 0; endT = 0;
  cam.x = -G.XC * .3; cam.y = 0;
}

// ---------- entrada (teclado + botões de toque, multi-toque) ----------
const KEYMAP = { ArrowLeft:'L', a:'L', A:'L', ArrowRight:'R', d:'R', D:'R', ArrowUp:'U', w:'U', W:'U', ArrowDown:'D', s:'D', S:'D',
  z:'A', Z:'A', j:'A', J:'A', x:'B', X:'B', k:'B', K:'B' };
const keyH = {}, touchH = {};
const held = b => !!(keyH[b] || touchH[b]);
addEventListener('keydown', e => {
  const k = e.key; if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(k)) e.preventDefault();
  if (e.repeat) return;
  if (k === 'm' || k === 'M') { toggleMute(); return; }
  if (k === 'f' || k === 'F') { toggleFS(); return; }
  if (state !== 'play') { if ((k === ' ' || k === 'Enter') && (state === 'title' || endT > .8)) start(); return; }
  const b = KEYMAP[k]; if (!b) return; const was = held(b); keyH[b] = true; if (!was) press(b);
});
addEventListener('keyup', e => { const b = KEYMAP[e.key]; if (!b) return; keyH[b] = false; if (!held(b)) release(b); });
addEventListener('blur', () => { for (const b in keyH) keyH[b] = false; for (const b in touchH) touchH[b] = 0; });

let HIT = [], HOVER = null, TB = [];
function canvasXY(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; }
function hitAt(x, y) { return state === 'play' ? null : HIT.find(q => x >= q.x && x <= q.x + q.w && y >= q.y && y <= q.y + q.h); }
function uiAct(h) { if (!h) return; if (h.act === 'start' && (state === 'title' || endT > .8)) start(); else if (h.act === 'mute') toggleMute(); }
cv.addEventListener('mousemove', e => { const h = hitAt(...canvasXY(e)); HOVER = h ? h.act : null; cv.style.cursor = h ? 'pointer' : 'default'; });
cv.addEventListener('mouseleave', () => { HOVER = null; });
cv.addEventListener('click', e => { const h = hitAt(...canvasXY(e)); uiAct(h); cv.style.cursor = 'default'; HOVER = null; });
const touchOf = {};
function btnAt(x, y) { let best = null, bd = 1e9; for (const b of TB) { const d = Math.hypot(x - b.x, y - b.y); if (d < b.r * 1.35 && d < bd) { bd = d; best = b.id; } } return best; }
function tDown(b) { if (!b) return; const was = held(b); touchH[b] = (touchH[b] || 0) + 1; if (!was) press(b); }
function tUp(b) { if (!b) return; touchH[b] = Math.max(0, (touchH[b] || 0) - 1); if (!held(b)) release(b); }
cv.addEventListener('touchstart', e => { e.preventDefault(); ac();
  for (const t of e.changedTouches) { const [x, y] = canvasXY(t);
    if (state !== 'play') { const h = hitAt(x, y); if (h && h.act === 'mute') toggleMute(); else if (state === 'title' || endT > .8) start(); return; }
    const b = btnAt(x, y); touchOf[t.identifier] = b; tDown(b); } }, { passive:false });
cv.addEventListener('touchmove', e => { e.preventDefault(); if (state !== 'play') return;
  for (const t of e.changedTouches) { const b = btnAt(...canvasXY(t)), o = touchOf[t.identifier];
    if (b !== o && !(o && 'AB'.includes(o))) { tUp(o); tDown(b); touchOf[t.identifier] = b; } } }, { passive:false });
const tEnd = e => { e.preventDefault(); for (const t of e.changedTouches) { tUp(touchOf[t.identifier]); delete touchOf[t.identifier]; } };
cv.addEventListener('touchend', tEnd, { passive:false }); cv.addEventListener('touchcancel', tEnd, { passive:false });

let lastDir = { b:'N', t:0 }; // seta apertada há pouco também vale (tolerância de 200 ms)
function dirHeld() { const h = held('U') ? 'U' : held('D') ? 'D' : held('L') ? 'L' : held('R') ? 'R' : 'N'; return h !== 'N' ? h : clock - lastDir.t < .2 ? lastDir.b : 'N'; }
function press(b) {
  if (state !== 'play' || !P) return;
  if (b === 'A' || b === 'B') {
    if (P.mode === 'lip' && b === 'A') { dropIn(); return; }
    if (!P.buf) P.buf = { A:false, B:false, t:.09 };
    P.buf[b] = true; return;
  }
  if ('UDLR'.includes(b)) lastDir = { b, t:clock };
  if (b === 'U') tryLip();
  if ((b === 'L' || b === 'R') && P.mode === 'ride' && Math.abs(P.s) < G.F0 + 30 && Math.abs(P.v) < 380 && P.pushT <= 0) { // remada no plano
    const d = b === 'L' ? -1 : 1; P.v += d * PH.push; P.pushT = .35; SFX.pop(); }
}
function release(b) { if (b === 'B' && P && P.grab) endGrab(); }

// ---------- pontos / popups ----------
const FONTS = ['Graduate', '"Permanent Marker"', '"Rubik Spray Paint"', '"Sedgwick Ave Display"', 'Impact', 'Georgia'];
const CHIPS = [[PAL.paper, PAL.ink], [PAL.yellow, PAL.ink], [PAL.blue, PAL.paper], [PAL.ink, PAL.yellow], [PAL.red, PAL.paper], ['#fff', PAL.blue]];
function makePopup(word, sub, mult, big, y) { // bilhete de sequestro: cada letra recortada de um lugar
  const r = rng(word.length * 77 + Math.floor(clock * 10)), size = big ? 46 : 34;
  const can = mk(word.length * size * .95 + 50, size * 2.6, (c) => {
    let x = 10;
    for (const ch of word) { if (ch === ' ') { x += size * .4; continue; }
      const f = FONTS[Math.floor(r() * FONTS.length)], [bg, fg] = CHIPS[Math.floor(r() * CHIPS.length)];
      c.font = `${size}px ${f}`; const w = c.measureText(ch).width + 10;
      c.save(); c.translate(x + w / 2, size * .75); c.rotate((r() - .5) * .3);
      c.fillStyle = PAL.ink; c.fillRect(-w / 2 + 3, -size * .62 + 3, w, size * 1.15);
      c.fillStyle = bg; c.fillRect(-w / 2, -size * .62, w, size * 1.15);
      c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch, 0, 2); c.restore(); x += w - 2; }
    if (sub) { c.font = `${size * .8}px "Sedgwick Ave Display"`; c.lineWidth = 5; c.strokeStyle = PAL.paper; c.fillStyle = PAL.red; c.textBaseline = 'top';
      const t = sub + (mult > 1 ? `  ×${mult}` : ''); c.strokeText(t, 14, size * 1.5); c.fillText(t, 14, size * 1.5); }
  });
  return { can, t:0, life:big ? 1.7 : 1.1, x:W / 2 + (r() - .5) * W * .3, y:y || H * (big ? .26 : .34 + r() * .06) };
}
function pop(word, sub, mult, big, y) { popups.push(makePopup(word, sub, mult, big, y)); if (popups.length > 6) popups.shift(); }
function addTrick(name, pts) { SFX.trick(); P.line.push(name); P.pending += pts; pop(name, '+' + pts, P.line.length); }
function bank(sujo) {
  if (!P.line.length && P.pending < 1) return 0;
  const mult = Math.max(1, P.line.length), x2 = dropT > 0 ? 2 : 1;
  const total = Math.round(P.pending * mult * (sujo ? .5 : 1) * x2);
  P.score += total; meter = Math.min(1, meter + total / METER_FULL);
  if (mult > 1 || sujo || total >= 600) pop(sujo ? 'SUJO' : mult > 2 ? 'COMBÃO' : mult > 1 ? 'COMBO' : 'LIMPO', `${total}${x2 > 1 ? ' (×2)' : ''}`, mult, true);
  if (total >= 1500) cheer();
  P.line = []; P.pending = 0; return total;
}
function cheer() { cheerT = 1.6; SFX.cheer(); }
function missao(k) {
  if (P.newMiss[k] || MISS[k]) { if (!MISS[k]) MISS[k] = true; return; }
  P.newMiss[k] = true; MISS[k] = true; try { localStorage.setItem('dropsession-missoes', JSON.stringify(MISS)); } catch (e) {}
  const m = MISSOES.find(q => q.k === k); pop('MISSÃO!', m.t, 0, true, H * .18); SFX.prod(); flash = .2; cheer(); P.score += 1000;
}
const allMiss = () => MISSOES.every(m => MISS[m.k]);

// ---------- física ----------
function update(dt) {
  clock += dt; boilF = Math.floor(clock * 8) % 3;
  if (state === 'end') endT += dt;
  if (state !== 'play') return;
  if (window.__pause) { updCam(dt); return; } // só debug (?dbg)
  if (hitstop > 0) { hitstop -= dt; return; }
  P.time -= dt;
  if (P.time <= 10 && P.time > 0 && Math.ceil(P.time) < P.lastTick) { P.lastTick = Math.ceil(P.time); SFX.tick(); }
  if (dropT > 0) { dropT -= dt; if (Math.random() < dt * 22) spawnSticker(); if (dropT <= 0) rate(1); }
  if (cheerT > 0) cheerT -= dt;
  if (P.landT > 0) P.landT -= dt; if (P.pushT > 0) P.pushT -= dt; if (P.dropinT > 0) P.dropinT -= dt; if (P.glowT > 0) P.glowT -= dt;
  P.tut += dt; P.prodT += dt;

  // buffer A/B (dá 90 ms pra apertar os dois juntos ou a direção)
  if (P.buf) { P.buf.t -= dt; if (P.buf.t <= 0 || (P.buf.A && P.buf.B)) { const b = P.buf; P.buf = null; resolveAB(b); } }

  if (P.mode === 'ride') ground(dt);
  else if (P.mode === 'air') air(dt);
  else if (P.mode === 'lip') lip(dt);
  else if (P.mode === 'bail') bailUpd(dt);

  if (P.time <= 0 && (P.mode === 'ride' || P.mode === 'bail' || P.time < -4)) { if (P.mode === 'lip') dropIn(); end(); }

  // efeitos
  popups.forEach(p => p.t += dt); popups = popups.filter(p => p.t < p.life);
  tags.forEach(p => p.t += dt); tags = tags.filter(p => p.t < p.life);
  parts.forEach(p => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy -= (p.conf ? 700 : 900) * dt; if (p.conf) p.vx *= .97; }); parts = parts.filter(p => p.t < p.life);
  rain.forEach(p => { p.t += dt; p.y += p.vy * dt; p.x += Math.sin(p.t * 3 + p.ph) * 40 * dt; p.rot += p.vr * dt; }); rain = rain.filter(p => p.y < H + 80);
  shake = Math.max(0, shake - dt * 30); flash = Math.max(0, flash - dt);
  updCam(dt);
}
function ground(dt) {
  const g = geo(P.s), sn = Math.sin(g.a), vs = Math.sign(P.v);
  let acc = -PH.g * sn - vs * (PH.mu + PH.k * P.v * P.v);
  const onTrans = Math.abs(P.s) > G.F0 + 2, dh = P.v * sn; // dh = velocidade vertical
  P.crouch = held('D');
  if (onTrans && dh < -30) { P.descT += dt; if (P.crouch) { P.pumpT += dt; acc += vs * PH.pump * Math.abs(sn); } }
  else if (onTrans && dh > 30) { if (P.crouch) acc -= vs * PH.pumpBad * Math.abs(sn); P.descT = 0; P.pumpT = 0; }
  if (!onTrans && P.wasTrans && P.descT > .1) { if (P.pumpT / P.descT > .55) goodPump(); P.descT = 0; P.pumpT = 0; }
  P.wasTrans = onTrans;
  P.v = clamp(P.v + acc * dt, -PH.vmax, PH.vmax);
  if (Math.abs(P.v) > 25 && Math.sign(P.v) !== P.nose) P.nose = Math.sign(P.v); // kickturn: sempre de frente
  P.s += P.v * dt;
  if (Math.abs(P.s) >= G.SMAX) { const sg = Math.sign(P.s);
    if (P.v * sg > PH.airMin) launch(sg); else { P.s = sg * G.SMAX; P.v = 0; } }
  if (Math.abs(P.s) > G.SMAX - 90 && Math.abs(P.v) < 520) P.lipWin = .25; else P.lipWin = Math.max(0, (P.lipWin || 0) - dt);
  if (Math.abs(P.v) < 1 && Math.abs(P.s) < G.F0) P.v = 0;
  if (held('U') && P.dropinT <= 0) tryLip(); // ↑ segurado também vale (não precisa acertar o instante)
}
function goodPump() {
  P.pumps++; SFX.pump(); const g = geo(P.s);
  parts.push({ ring:true, x:g.x, y:g.y, vx:0, vy:0, t:0, life:.35 });
  if (P.pumps <= 3) tags.push({ txt:'PUMP!', x:g.x, y:g.y + ROBO_H * 1.25, t:0, life:.9 });
}
function launch(sg) {
  P.mode = 'air'; P.side = sg; P.vy = Math.abs(P.v); P.y = G.YC; P.x = sg * G.XC; P.t = 0; P.T = 2 * P.vy / PH.g;
  P.nose0 = P.nose; P.spin = 0; P.spinV = 0; P.flip = null; P.grab = null; P.rf = null; P.airGrab = false; P.flips = 0; P.airs++;
  SFX.pop();
  if (P.airs === 1) tags.push({ txt:isTouch ? 'A/B + SETA!' : 'Z/X + SETA!', x:sg * G.XC, y:G.YC + 260, t:0, life:1.4 });
}
function air(dt) {
  P.t += dt; P.vy -= PH.g * dt; P.y += P.vy * dt;
  P.x = P.side * (G.XC + 22 * Math.sin(Math.PI * clamp(P.t / P.T, 0, 1)));
  // giro (← → segurado), com ajuda pra fechar em múltiplos de 180
  const d = (held('R') ? 1 : 0) - (held('L') ? 1 : 0);
  if (d && !P.rf) P.spinV = clamp(P.spinV + d * 3400 * dt, -800, 800);
  else { const tgt = Math.round((P.spin + P.spinV * .12) / 360) * 360, e = tgt - P.spin;
    P.spinV = Math.abs(e) < 3 ? 0 : Math.sign(e) * Math.min(Math.abs(e) * 9, 620); }
  P.spin += P.spinV * dt;
  if (P.flip) { P.flip.t += dt; if (P.flip.t >= P.flip.d) { addTrick(P.flip.n, P.flip.p); P.flip = null; P.flips++; } }
  if (P.grab) { P.grab.t += dt; if (P.grab.t > .15) { P.pending += 320 * dt; if (!P.grab.named) { P.grab.named = true; addTrick(P.grab.n, 150); P.airGrab = true; } } }
  if (P.rf) { P.rf.t += dt; P.glowT = .3; if (P.rf.t >= P.rf.d) { addTrick('ROBÔ FLIP', 3000); P.rf = null; celebrate(36); flash = .2; shake = 10; } }
  // produtos (um por vez)
  const c = bodyPoint(), it = PRODS[P.prod];
  if (it && P.prodT > .35) { const [lx, ly] = prodXY(it);
    if (Math.hypot(c[0] - lx, c[1] - ly) < 100) { P.prod++; P.prodT = 0; const pts = 400 * P.prod; P.score += pts; meter = Math.min(1, meter + .12);
      SFX.prod(); flash = .12; celebrate(26, false, lx, ly); pop(it.n + '!', `+${pts}  ${P.prod}/4`, 0, true, H * .36);
      if (P.prod === PRODS.length) { missao('mdrop'); meter = 1; } } }
  if (held('U') && !held('B')) tryLip();
  if (P.mode === 'air' && P.vy < 0 && P.y <= G.YC) land();
}
function bodyPoint() { const a = airAngle(), nx = -Math.sin(a), ny = Math.cos(a); return [P.x + nx * ROBO_H * .55, P.y + ny * ROBO_H * .55]; }
function airAngle() { const k = Math.sin(Math.PI * clamp(P.t / P.T, 0, 1)); let a = P.side * Math.PI / 2 * (1 - .62 * k); if (P.rf) a += -P.side * Math.PI * 2 * sstep(P.rf.t / P.rf.d); return a; }
function resolveAB(b) {
  const dir = dirHeld();
  if (b.A && b.B) { special(dir); return; }
  if (P.mode !== 'air' || P.rf) return;
  if (b.A && !P.flip && !P.grab) { const f = FLIPS[dir]; P.flip = { ...f, t:0 }; SFX.whoosh(); }
  else if (b.B && !P.grab && !P.flip && held('B')) { const g = GRABS[dir]; P.grab = { ...g, t:0 }; }
  else if (b.B && !P.grab && !P.flip) { const g = GRABS[dir]; P.grab = { ...g, t:0, tap:true }; } // toque rápido: grab curtinho
}
function endGrab() { if (!P.grab) return; if (P.grab.tap && P.grab.t < .3) return; P.grab = null; }
function special(dir) {
  if (meter < 1) { tags.push({ txt:'MEDIDOR VAZIO', x:robotXY()[0], y:robotXY()[1] + ROBO_H * 1.3, t:0, life:.8 }); return; }
  if (dir === 'D') { // DROP 35: chuva de adesivos, pontos ×2 por 8 s
    meter = 0; dropT = 8; rate(1.06); pop('DROP 35', '×2 · 8s', 0, true, H * .2); SFX.prod(); flash = .25; cheer();
    for (let i = 0; i < 40; i++) spawnSticker(true); return; }
  if (P.mode === 'air') { // ROBÔ FLIP: mortal pra trás com o shape colado, olhos acesos
    meter = 0; P.flip = null; P.grab = null; P.rf = { t:0, d:.9 }; P.glowT = 1; SFX.whoosh(); SFX.prod(); flash = .15; }
  else tags.push({ txt:'NO AR!', x:robotXY()[0], y:robotXY()[1] + ROBO_H * 1.3, t:0, life:.8 });
}
function spawnSticker(burst) { rain.push({ k:STICK_KINDS[Math.floor(Math.random() * 8)], x:Math.random() * W, y:burst ? -40 - Math.random() * H * .6 : -60,
  vy:160 + Math.random() * 200, rot:Math.random() * 6, vr:(Math.random() - .5) * 5, ph:Math.random() * 6, t:0, s:.5 + Math.random() * .4 }); }
function land() {
  P.y = G.YC; let sujo = false, why = null;
  if (P.flip) { const pr = P.flip.t / P.flip.d; if (pr < .5) why = 'CAIU NO ' + P.flip.n; else { sujo = true; addTrick(P.flip.n, Math.round(P.flip.p * .5)); P.flip = null; } }
  if (P.rf) { const pr = P.rf.t / P.rf.d; if (pr < .8) why = 'ROBÔ FLIP PELA METADE'; else { sujo = true; addTrick('ROBÔ FLIP', 1500); P.rf = null; } }
  const rem = ((P.spin % 360) + 360) % 360, off = Math.min(rem, 360 - rem);
  if (off > 110) why = why || 'GIRO TORTO';
  else if (off > 55) sujo = true;
  if (why) { bail(why); return; }
  const turns = Math.round(Math.abs(P.spin) / 360);
  if (turns >= 1) { const sp = SPINS[Math.min(turns, SPINS.length - 1)]; addTrick(sp[0], sp[1]); missao('m540'); }
  P.grab = null;
  P.mode = 'ride'; P.s = P.side * (G.SMAX - 1); P.v = -P.side * Math.min(PH.vmax, Math.abs(P.vy) * .97);
  P.nose = -P.side; // volta sempre de frente pra rampa
  P.landT = .2; shake = Math.max(shake, 4); SFX.land();
  if (P.line.length) { hitstop = .04; bank(sujo); }
  if (P.airGrab) { P.grabStreak++; if (P.grabStreak >= 3) missao('mgrab'); } else P.grabStreak = 0;
  for (let i = 0; i < 8; i++) parts.push({ x:P.x, y:P.y, vx:(Math.random() - .5) * 300, vy:Math.random() * 200 - 100, t:0, life:.35, c:PAL.ink });
}
function tryLip() {
  const nearTop = P.mode === 'ride' && P.lipWin > 0 && Math.abs(P.s) > G.SMAX - 90;
  const smallAir = P.mode === 'air' && P.vy < 0 && P.y - G.YC < 90 && !P.flip && !P.rf;
  if (!nearTop && !smallAir) return;
  const side = P.mode === 'air' ? P.side : Math.sign(P.s), sp = P.mode === 'air' ? Math.abs(P.vy) : Math.abs(P.v);
  P.mode = 'lip'; P.side = side; P.lipT = 0; P.needle = (Math.random() - .5) * .3; P.needleV = 0; P.grab = null;
  P.lipKind = sp < 200 ? 'STALL' : '50-50'; P.nose = -side; P.lipNamed = false; SFX.land(); shake = 3;
}
function lip(dt) {
  P.lipT += dt;
  const inst = 1 + P.lipT * .45;
  P.needleV += ((Math.random() - .5) * 7 * inst + P.needle * 2.6) * dt;
  const d = (held('R') ? 1 : 0) - (held('L') ? 1 : 0); P.needleV += d * 5.2 * dt; P.needleV *= .985;
  P.needle += P.needleV * dt;
  const ok = Math.abs(P.needle) < .35;
  if (ok) P.pending += (P.lipKind === '50-50' ? 300 : 200) * dt;
  if (!P.lipNamed && P.lipT > .25) { P.lipNamed = true; addTrick(P.lipKind === '50-50' ? '50-50 NA BORDA' : 'STALL', 150); }
  if (P.lipKind === '50-50' && Math.floor(clock * 20) % 2) { parts.push({ x:P.side * G.XC, y:G.YC + 6, vx:(Math.random() - .5) * 260, vy:Math.random() * 220, t:0, life:.3, c:Math.random() < .5 ? PAL.yellow : PAL.red, spark:true }); if (Math.random() < .25) SFX.grind(); }
  if (Math.abs(P.needle) > 1) bail('CAIU DA BORDA');
}
function dropIn() {
  P.mode = 'ride'; P.s = P.side * (G.SMAX - 2); P.v = -P.side * PH.drop * .7; P.nose = -P.side; P.dropinT = .3; P.landT = .1;
  bank(false); SFX.pop();
}
function bail(why) {
  if (QS.has('god')) { tags.push({ txt:'(god) ' + why, x:P.x, y:G.YC + 200, t:0, life:1 }); P.flip = null; P.rf = null; P.spin = Math.round(P.spin / 180) * 180; if (P.mode === 'air') { land(); } else dropIn(); return; }
  const wasAir = P.mode === 'air';
  P.mode = 'bail'; P.bailT = 0; P.bails++; P.flip = null; P.grab = null; P.rf = null; P.line = []; P.pending = 0; P.grabStreak = 0;
  if (wasAir || Math.abs(P.s) >= G.SMAX - 3) { P.s = P.side * (G.SMAX - 1); P.v = -P.side * Math.min(900, Math.abs(P.vy || 0) * .4 + 120); }
  hitstop = .12; shake = 14; flash = .15;
  pop(why || 'TOMBO', 'TOMBO', 0, true);
  if (navigator.vibrate) navigator.vibrate(160);
  rate(.5, 520); // disco freando na mão
}
function bailUpd(dt) {
  P.bailT += dt;
  const g = geo(P.s); P.v += (-PH.g * Math.sin(g.a) - Math.sign(P.v) * 900) * dt; P.s = clamp(P.s + P.v * dt, -G.SMAX, G.SMAX);
  if (P.bailT > 1.5) { // volta pro deck mais perto e dropa de novo
    const side = P.s < 0 ? -1 : 1; P.side = side; P.mode = 'ride'; P.s = side * (G.SMAX - 1); P.v = -side * PH.drop; P.nose = -side; P.dropinT = .4; flash = .12; }
}
function celebrate(n, small, x, y) { const cols = [PAL.yellow, PAL.blue, PAL.red, PAL.paper]; const [cx, cy] = x != null ? [x, y] : bodyPoint();
  for (let i = 0; i < n; i++) { const ang = Math.random() * Math.PI * 2, v = (small ? 160 : 380) + Math.random() * 300;
    parts.push({ x:cx, y:cy, vx:Math.cos(ang) * v, vy:Math.sin(ang) * v + 200, t:0, life:small ? .45 : .9, c:cols[i % 4], conf:true, rot:Math.random() * 6 }); } }
function end() { if (state !== 'play') return; bank(false); if (P.score > BEST) { BEST = P.score; P.record = true; try { localStorage.setItem('dropsession-best', BEST); } catch (e) {} }
  state = 'end'; endT = 0; rate(1); dropT = 0; rain = []; }
if (QS.has('god') || QS.has('dbg')) { window.__P = () => P; window.__S = () => ({ state, cam, meter, MISS, dropT }); window.__G = () => G; window.__PH = PH; }
function start() { ac(); reset(); state = 'play'; MUS.currentTime = 0; rate(1); music(true); for (const b in touchH) touchH[b] = 0; }

// ---------- câmera ----------
function robotXY() { if (P.mode === 'air') return [P.x, P.y]; if (P.mode === 'lip') return [P.side * G.XC, G.YC]; const g = geo(P.s); return [g.x, g.y]; }
function updCam(dt) {
  const [rx, ry] = robotXY(), top = ry + ROBO_H * 1.25;
  // abre até um limite (robô nunca vira um pontinho) e daí em diante sobe junto
  const zt = clamp(Math.min(Z0, (GY - 96) / Math.max(1, top)), Z0 * .8, Z0);
  cam.z += (zt - cam.z) * clamp(dt * (zt < cam.z ? 5 : 2.2), 0, 1);
  const yt = Math.max(0, top - (GY - 96) / cam.z);
  cam.y += (yt - cam.y) * clamp(dt * 9, 0, 1);
  gy = GY + cam.y * cam.z;
  const lim = Math.max(0, G.XE + 40 - (W / 2) / cam.z);
  const tx = clamp(rx * (lim > 200 ? .85 : .4), -lim, lim);
  cam.x += (tx - cam.x) * clamp(dt * 3, 0, 1);
}
const SX = x => W / 2 + (x - cam.x) * cam.z, SY = y => gy - y * cam.z;
const layerS = d => Z0 * Math.pow(cam.z / Z0, 1 - d);

// ---------- render ----------
function drawSky() {
  const s = layerS(.86), gy = GY + cam.y * cam.z * .3; // céu sobe devagar (paralaxe), sem mostrar a emenda
  ctx.fillStyle = PAL.night; ctx.fillRect(0, 0, W, H);
  if (S2.cenario['ceu-alto']) { const im = S2.cenario['ceu-alto'][boilF], w = 1500 * s * 1.6, h = w * im.height / im.width; ctx.drawImage(im, W / 2 - cam.x * .1 * s - w / 2, gy - h * .98, w, h); }
  else {
    for (const [Y, col] of [[900, PAL.night2], [1900, PAL.night3]]) { const y = gy - Y * s, bh = 70 * s * 2;
      if (y < 0) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, Math.max(0, y)); }
      else { ctx.fillStyle = col; ctx.fillRect(0, 0, W, y); for (let x = 0; x < W; x += 512 * s * 1.2) ctx.drawImage(BAND, x, y, 512 * s * 1.2 + 1, bh); } }
    // estrelas: cruzinhas de nanquim/papel
    for (const st of STARS) { const x = W / 2 + (st.x - cam.x * .12) * s, y = gy - st.y * s; if (x < -10 || x > W + 10 || y < -10 || y > gy - 120 * s) continue;
      const tw = (boilF + st.ph) % 3 === 0 ? 1.35 : 1, r = st.s * tw * Math.max(.7, s * 1.1);
      ctx.strokeStyle = st.k ? PAL.yellow : PAL.paper; ctx.lineWidth = st.k ? 2 : 1.6; ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke();
      if (st.k) { ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - r * .5, y - r * .5); ctx.lineTo(x + r * .5, y + r * .5); ctx.moveTo(x + r * .5, y - r * .5); ctx.lineTo(x - r * .5, y + r * .5); ctx.stroke(); } }
    const mr = 300 * s, mx = W / 2 + (520 - cam.x * .1) * s, my = gy - 760 * s; ctx.drawImage(MOON, mx - mr / 2, my - mr / 2, mr, mr);
  }
}
function drawLayer(L, frame) {
  const s = layerS(L.d), img = (frame != null ? L.img[frame] : L.img)[boilF], w = L.w * s, h = L.h * s;
  const x = W / 2 + (0 - cam.x * (1 - L.d)) * s - w / 2; ctx.drawImage(img, x, gy - h + 4 * s, w + 8 * s * (img.width - L.w) / L.w, h + 8 * s);
}
function drawScene() {
  drawSky();
  if (S2.cenario['fundo-loja']) { const im = S2.cenario['fundo-loja'][boilF], s = layerS(.4), w = 2400 * s, h = w * im.height / im.width;
    ctx.drawImage(im, W / 2 - cam.x * .6 * s - w / 2, gy - h * .96, w, h); }
  else { drawLayer(LAYERS.city); drawLayer(LAYERS.via); drawLayer(LAYERS.shop); }
  // rua
  ctx.fillStyle = PAL.street; ctx.fillRect(0, gy - 2, W, H - gy + 2);
  ctx.fillStyle = 'rgba(243,238,226,.08)'; for (let x = ((-cam.x * cam.z) % 40 + 40) % 40 - 40; x < W; x += 40) ctx.fillRect(x, gy + 10 * cam.z + 6, 20, 3);
  const cf = cheerT > 0 ? Math.floor(clock * 8) % 2 : 0;
  if (!S2.cenario.plateia1) drawLayer(LAYERS.crowd, cf);
  // half-pipe
  const z = cam.z;
  if (S2.cenario.halfpipe && HPIMG) { const im = S2.cenario.halfpipe[boilF], pad = 4 * HPK; ctx.drawImage(im, SX(-HPIMG.w / 2 - pad), SY(HPIMG.h + pad), (HPIMG.w + pad * 2) * z, (HPIMG.h + pad * 2) * z); }
  else { const im = HP[boilF]; ctx.drawImage(im, SX(HP_X0) - 4 * z / HP_RES, SY(HP_H) - 4 * z / HP_RES, im.width / HP_RES * z, im.height / HP_RES * z); }
  // plateia nos decks
  for (const [i, sg] of [[0, -1], [1, 1]]) { const im = DECKCROWD[cf][i][boilF], w = 170 * z, h = 190 * z; ctx.drawImage(im, SX(sg * (G.XE - 95)) - w / 2, SY(G.YC + 8) - h, w, h); }
  // produto da vez: explosão de zine atrás, facho de luz e quique
  const it = P && state === 'play' && PRODS[P.prod];
  if (it && S1.obj[it.k]) { const [wx, wy] = prodXY(it), ap = clamp(P.prodT / .35, 0, 1), sc = sstep(ap) * (1 + .25 * Math.sin(ap * Math.PI));
    const bob = Math.sin(clock * 3) * 12, x = SX(wx), y = SY(wy + bob), r = 95 * z * sc;
    ctx.save(); ctx.globalAlpha = .22 * ap; ctx.fillStyle = PAL.yellow; ctx.beginPath(); ctx.moveTo(x - r * .35, y); ctx.lineTo(x + r * .35, y); ctx.lineTo(x + r * 1.1, SY(G.YC)); ctx.lineTo(x - r * 1.1, SY(G.YC)); ctx.closePath(); ctx.fill(); ctx.restore();
    const rot = clock * .6, st = (rr, n, ro, col) => { ctx.fillStyle = col; star(ctx, x, y, rr, n, ro, .55); ctx.fill(); };
    st(r * 1.02, 12, rot, PAL.ink); st(r * .96, 12, rot, Math.floor(clock * 8) % 2 ? PAL.yellow : '#FFE27A'); st(r * .55, 8, -rot * 1.5, PAL.paper);
    const im = S1.obj[it.k][boilF], m = r * 1.5 / Math.max(im.width, im.height);
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(clock * 2) * .12); ctx.drawImage(im, -im.width * m / 2, -im.height * m / 2, im.width * m, im.height * m); ctx.restore();
    if (y < 70) { const ax = clamp(x, 40, W - 40); chip('▲ ' + it.n, '15px Graduate', ax, 86, PAL.yellow, PAL.ink, Math.sin(clock * 6) * .05, 8, 4); } // tá lá em cima
  }
}

// ---- robô + shape ----
function riderPose() {
  // devolve { x, y, ang, nose, yaw, frame, roll, byaw, gap }
  const f8 = Math.floor(clock * 8);
  if (P.mode === 'air') {
    const yaw = Math.PI * sstep((P.t / P.T - .2) / .6) + P.spin * Math.PI / 180;
    let frame = 'ar-neutro', roll = 0, byaw = 0, gap = 0;
    if (P.rf) frame = 'rf' + clamp(1 + Math.floor(P.rf.t / P.rf.d * 6), 1, 6);
    else if (P.grab) frame = 'grab-' + P.grab.k;
    else if (P.flip) { frame = 'ar-flip'; const pr = Math.floor(P.flip.t * 12) / Math.max(1, Math.round(P.flip.d * 12)); roll = P.flip.roll * pr * Math.PI * 2; byaw = P.flip.yaw * pr * Math.PI; gap = Math.sin(pr * Math.PI) * 26; }
    else if (P.t < .12) frame = 'ar-ollie';
    else if (P.vy < -200 && P.t / P.T > .75 && P.line.length) frame = 'ar-comemora';
    return { x:P.x, y:P.y, ang:airAngle(), nose:P.nose0, yaw, frame, roll, byaw, gap };
  }
  if (P.mode === 'lip') return { x:P.side * (G.XC + 4), y:G.YC + 12, ang:P.needle * .25, nose:P.nose, yaw:0,
    frame:P.lipKind === '50-50' ? (f8 % 2 ? 'borda-grind1' : 'borda-grind2') : 'borda-rock', roll:0, byaw:0, gap:0 };
  const g = geo(P.s);
  if (P.mode === 'bail') return { x:g.x, y:g.y, ang:g.a, nose:P.nose, yaw:0, frame:'tombo' + clamp(1 + Math.floor(P.bailT * 5), 1, 6), roll:0, byaw:0, gap:0, noBoard:P.bailT > .12 };
  let frame = Math.floor(clock * 4) % 2 ? 'base-rodando' : 'base-rodando2';
  if (P.dropinT > 0) frame = 'borda-dropin';
  else if (P.landT > 0) frame = 'base-aterrissa';
  else if (P.crouch) frame = 'base-agachado';
  else if (P.pushT > 0) frame = 'base-remada';
  else if (Math.abs(P.s) > G.F0 && P.v * Math.sin(g.a) > 200) frame = 'base-estica';
  return { x:g.x, y:g.y, ang:g.a, nose:P.nose, yaw:0, frame, roll:0, byaw:0, gap:0 };
}
function drawBoard(roll, yawK, bl) { // shape no referencial local (rodas em y=0, eixo x = comprimento)
  const kf = S2.skate.kf1;
  ctx.save(); ctx.scale(yawK, 1);
  if (kf) { const i = ((Math.round(roll / (Math.PI * 2) * 8) % 8) + 8) % 8, im = S2.skate['kf' + (i + 1)][boilF], h = bl * im.height / im.width; ctx.drawImage(im, -bl / 2, -h, bl, h); }
  else { const Lv = S1.skate.lateral, Bv = S1.skate['fundo-plano']; if (!Lv) { ctx.restore(); return; }
    const c = Math.cos(roll), sn = Math.sin(roll), im = Lv[boilF], h = bl * im.height / im.width;
    if (Math.abs(c) >= Math.abs(sn) * .8) { ctx.translate(0, -h / 2); ctx.scale(1, c >= 0 ? 1 : -1); ctx.drawImage(im, -bl / 2, -h / 2, bl, h); }
    else if (Bv) { const ib = Bv[boilF], t = bl * ib.width / ib.height * Math.max(.28, Math.abs(sn)); ctx.translate(0, -h / 2); ctx.rotate(-Math.PI / 2); ctx.scale(1, sn > 0 ? 1 : -1); ctx.drawImage(ib, -t / 2, -bl / 2, t, bl); } }
  ctx.restore();
}
function drawFrontCrowd() { // plateia em primeiro plano, só cabeças e braços na beira de baixo
  const v = S2.cenario[cheerT > 0 && Math.floor(clock * 8) % 2 ? 'plateia2' : 'plateia1']; if (!v) return;
  const im = v[boilF], w = W * 1.15, h = w * im.height / im.width, y = H - h * .42 + (cheerT > 0 ? -8 : 0);
  ctx.drawImage(im, (W - w) / 2 - (cam.x || 0) * .05, y, w, h);
  ctx.fillStyle = 'rgba(17,17,17,.38)'; ctx.fillRect(0, y, W, H - y); }
function drawRider() {
  const p = riderPose(), z = cam.z;
  // ângulo exibido em degraus de 12 fps
  const tick = Math.floor(clock * 12); if (tick !== P.angTick) { P.angTick = tick; P.angD = p.ang; }
  const ang = Math.abs(P.angD - p.ang) > 1.2 ? p.ang : P.angD;
  const cy = Math.cos(p.yaw), syw = Math.sin(p.yaw), sideOn = Math.abs(cy) < .42 && P.mode === 'air' && !P.grab && !P.rf;
  const face = p.nose * (cy >= 0 ? 1 : -1);
  let frame = p.frame; if (sideOn) frame = syw * p.nose > 0 ? 'ar-giro-costas' : 'ar-giro-frente';
  const F = frameOf(frame), v = F.v;
  const bl = BOARD_L, bh = 21, feet = bh * .78;
  ctx.save(); ctx.translate(SX(p.x), SY(p.y)); ctx.scale(z, z); ctx.rotate(-ang);
  // sombra/rodas: faíscas e partículas no mundo, desenhadas fora
  if (!F.board && !p.noBoard) { ctx.save(); ctx.translate(0, p.gap); const yk = Math.cos(p.byaw) * (Math.abs(cy) < .2 ? .2 * Math.sign(cy || 1) : cy); drawBoard(p.roll, p.nose * (Math.abs(yk) < .15 ? .15 * Math.sign(yk || 1) : yk), bl); ctx.restore(); }
  if (v) {
    const img = v[boilF], RH = ROBO_H * (img.height - 8) / 300, RW = RH * img.width / img.height;
    ctx.save(); ctx.scale(face, 1);
    let ox = -RW / 2, oy = -RH - (F.board ? 0 : feet);
    if (F.man && F.man.length >= 4) { const k = RH / (img.height - 8); ox = -(F.man[2] + 4) * k; oy = -(F.man[3] + 4) * k; }
    if (/^tombo/.test(frame) && !F.man) oy = -RH * .92;
    ctx.drawImage(img, ox, oy, RW, RH);
    if (P.glowT > 0 || dropT > 0) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = P.glowT > 0 ? .55 : .2; ctx.drawImage(img, ox, oy, RW, RH); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
    if (P.glowT > 0 || P.rf) eyes(ox + RW * .5, oy + RH * .1, RH);
    ctx.restore();
  }
  ctx.restore();
}
function eyes(x, y, rh) { // olhos acesos do ROBÔ FLIP: raios de nanquim vermelho, em degraus
  const r = rh * .07, rot = Math.floor(clock * 12) * .3;
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = PAL.red; ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let i = 0; i < 10; i++) { const a = rot + i * Math.PI / 5, r0 = r * 1.6, r1 = r * (i % 2 ? 3.2 : 4.4); ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.stroke(); }
  ctx.fillStyle = PAL.red; ctx.beginPath(); ctx.arc(-r * .9, 0, r, 0, 7); ctx.arc(r * .9, 0, r, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-r * .9, 0, r * .4, 0, 7); ctx.arc(r * .9, 0, r * .4, 0, 7); ctx.fill(); ctx.restore();
}
function drawFX() {
  const z = cam.z;
  for (const p of parts) { const x = SX(p.x), y = SY(p.y), al = 1 - p.t / p.life; ctx.globalAlpha = al;
    if (p.ring) { const s = (.6 + p.t / p.life * 1.4) * z * 1.2; ctx.drawImage(PUMPRING, x - 80 * s, y - 80 * s, 160 * s, 160 * s); }
    else if (p.spark) { ctx.strokeStyle = p.c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - p.vx * .03 * z, y + p.vy * .03 * z); ctx.stroke(); }
    else if (p.conf) { ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.t * 12); ctx.fillStyle = p.c; ctx.fillRect(-6, -4, 12, 8); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.strokeRect(-6, -4, 12, 8); ctx.restore(); }
    else { ctx.fillStyle = p.c || PAL.ink; ctx.fillRect(x - 2, y - 2, 5, 5); } }
  ctx.globalAlpha = 1;
  for (const t of tags) { const a = t.t > t.life - .25 ? (t.life - t.t) / .25 : 1, s = t.t < .08 ? 1.4 - t.t / .08 * .4 : 1; ctx.globalAlpha = a;
    chip(t.txt, `${Math.round(18 * s)}px Graduate`, SX(t.x), SY(t.y) - t.t * 30, PAL.yellow, PAL.ink, -.06, 7, 3); }
  ctx.globalAlpha = 1;
}

// ---------- HUD ----------
function chip(t, font, x, y, bg, fg, rot = 0, pad = 14, shadow = 5) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const m = ctx.measureText(t), w = m.width + pad * 2, h = (parseInt(font.match(/(\d+)px/)[1]) * 1.25) + pad;
  ctx.fillStyle = PAL.ink; ctx.fillRect(-w / 2 + shadow, -h / 2 + shadow, w, h);
  ctx.fillStyle = bg; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = fg; ctx.fillText(t, 0, 2); ctx.restore(); return { w, h };
}
function tape(x, y, w, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(236,226,196,.88)'; ctx.fillRect(-w / 2, -11, w, 22);
  ctx.strokeStyle = 'rgba(17,17,17,.25)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(-w / 2, -11); ctx.lineTo(-w / 2, 11); ctx.moveTo(w / 2, -11); ctx.lineTo(w / 2, 11); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
function keycap(x, y, w, label) {
  ctx.fillStyle = PAL.ink; ctx.fillRect(x + 2, y + 3, w, 32);
  ctx.fillStyle = PAL.paper3; ctx.fillRect(x, y, w, 30); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.strokeRect(x, y, w, 30);
  ctx.fillStyle = '#fff'; ctx.fillRect(x + 4, y + 3, w - 8, 20); ctx.lineWidth = 1.5; ctx.strokeRect(x + 4, y + 3, w - 8, 20);
  ctx.fillStyle = PAL.ink; ctx.font = '13px Graduate'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x + w / 2, y + 13); }
function scribble(x0, y, x1, seed, col = PAL.ink, lw = 3) { // risco de caneta em zigue-zague
  const r = rng(seed); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x0, y + (r() - .5) * 4);
  for (let x = x0; x < x1; x += 14) { ctx.lineTo(x + 7, y - 4 + (r() - .5) * 3); ctx.lineTo(x + 14, y + 3 + (r() - .5) * 3); } ctx.stroke(); }
function checkmark(x, y, s, col = PAL.red) { ctx.strokeStyle = col; ctx.lineWidth = s * .22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s * .45, y); ctx.lineTo(x - s * .1, y + s * .4); ctx.lineTo(x + s * .6, y - s * .55); ctx.stroke(); }
function missionCard(x, y, w, compact, rot = .025, inGame = true) {
  const lh = compact ? 22 : 30, h = 34 + lh * 3 + 8, fs = compact ? 12 : 14;
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot); ctx.translate(-w / 2, -h / 2);
  const ui = S2.ui.cartela;
  if (ui) ctx.drawImage(ui[boilF], -6, -6, w + 12, h + 12);
  else { ctx.fillStyle = PAL.ink; ctx.fillRect(5, 5, w, h); ctx.fillStyle = PAL.paper; ctx.beginPath(); ctx.moveTo(0, 0); for (let i = 0; i <= 10; i++) ctx.lineTo(w * i / 10, (i % 2) * 3); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.strokeStyle = 'rgba(53,88,168,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(8, 34 + lh * (i + 1) - 4); ctx.lineTo(w - 8, 34 + lh * (i + 1) - 4); ctx.stroke(); } }
  ctx.fillStyle = PAL.red; ctx.font = `${compact ? 13 : 15}px "Permanent Marker"`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('MISSÕES DA SESSÃO', 10, 17);
  MISSOES.forEach((m, i) => { const yy = 34 + lh * i + lh / 2, done = MISS[m.k];
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(10, yy - 7, 14, 14);
    ctx.fillStyle = PAL.ink; ctx.font = `${fs}px Graduate`; ctx.textAlign = 'left';
    let label = m.t; if (m.k === 'mgrab' && !done && inGame && P) label += ` (${Math.min(3, P.grabStreak)}/3)`;
    if (m.k === 'mdrop' && !done && inGame && P) label += ` (${P.prod}/4)`;
    ctx.fillText(label, 32, yy + 1);
    if (done) { const tw = ctx.measureText(label).width; if (S2.ui.risco) ctx.drawImage(S2.ui.risco[boilF], 28, yy - 10, Math.min(w - 36, tw + 30), 20); else scribble(28, yy, Math.min(w - 10, 40 + tw + 0), i * 9 + 3);
      if (S2.ui.check) ctx.drawImage(S2.ui.check[boilF], 6, yy - 14, 26, 26); else checkmark(17, yy, 16); } });
  ctx.restore(); tape(x + w - 26, y + 2, 56, .45);
  return h;
}
function sprayCan(x, y, w, k) { // medidor DROP: lata de spray deitada
  const h = 30, full = k >= 1, blink = full && Math.floor(clock * 6) % 2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.03);
  ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.roundRect(4, 4, w, h, 8); ctx.fill();
  ctx.fillStyle = PAL.paper; ctx.beginPath(); ctx.roundRect(0, 0, w, h, 8); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.roundRect(0, 0, w, h, 8); ctx.clip();
  ctx.fillStyle = full ? (blink ? PAL.yellow : PAL.red) : PAL.red; ctx.fillRect(0, 0, (w - 2) * clamp(k, 0, 1), h);
  ctx.fillStyle = 'rgba(17,17,17,.35)'; for (let yy = 4; yy < h; yy += 6) for (let xx = (yy / 6 % 2) * 3; xx < (w - 2) * k; xx += 6) ctx.fillRect(xx, yy, 1.6, 1.6);
  ctx.restore();
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(0, 0, w, h, 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w * .22, 0); ctx.lineTo(w * .22, h); ctx.stroke();
  // ombro, válvula e bico
  ctx.fillStyle = PAL.paper3; ctx.beginPath(); ctx.moveTo(w, 4); ctx.quadraticCurveTo(w + 16, 6, w + 18, h / 2); ctx.quadraticCurveTo(w + 16, h - 6, w, h - 4); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = PAL.ink; ctx.fillRect(w + 17, h / 2 - 7, 12, 14); ctx.fillStyle = PAL.red; ctx.fillRect(w + 20, h / 2 - 4, 6, 8);
  ctx.fillStyle = PAL.ink; ctx.font = '15px Graduate'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('DROP', w * .11, h / 2 + 1);
  if (full) { const r = rng(Math.floor(clock * 12)); ctx.fillStyle = PAL.red; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(w + 34 + r() * 30, h / 2 + (r() - .5) * 26, 1.5 + r() * 2.5, 0, 7); ctx.fill(); } }
  ctx.restore();
  if (full) chip(isTouch ? 'A+B  ▲ ROBÔ FLIP · ▼ DROP 35' : 'Z+X  ↑ ROBÔ FLIP · ↓ DROP 35', '12px Graduate', x + w / 2 + 20, y + h + 22, PAL.yellow, PAL.ink, .02, 6, 3);
}
function stopwatch(x, y, t) {
  const r = 34, low = t <= 10, bl = low && Math.floor(clock * 4) % 2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.05);
  ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(4, 4, r + 6, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, r + 6, 0, 7); ctx.fill(); // borda de adesivo
  ctx.fillStyle = PAL.ink; ctx.fillRect(-7, -r - 16, 14, 10); ctx.fillRect(-12, -r - 20, 24, 6);
  ctx.fillStyle = bl ? PAL.red : PAL.yellow; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.stroke();
  const k = clamp(t / SESSION, 0, 1); ctx.fillStyle = 'rgba(17,17,17,.18)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r - 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - k)); ctx.closePath(); ctx.fill();
  const tt = Math.max(0, Math.ceil(t)); ctx.fillStyle = bl ? PAL.paper : PAL.ink; ctx.font = '24px Graduate'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(`${Math.floor(tt / 60)}:${String(tt % 60).padStart(2, '0')}`, 0, 2); ctx.restore();
}
function balanceBar() {
  const [rx, ry] = robotXY(), x = SX(rx), y = SY(ry + ROBO_H * 1.45), w = 170;
  ctx.save(); ctx.translate(x, Math.max(70, y));
  ctx.fillStyle = PAL.ink; ctx.fillRect(-w / 2 + 4, -10, w, 22); ctx.fillStyle = PAL.paper; ctx.fillRect(-w / 2, -14, w, 22);
  ctx.fillStyle = PAL.yellow; ctx.fillRect(-w * .35 / 2 * 2 / 2 - w * .0875, -14, w * .35, 22);
  ctx.fillStyle = PAL.red; ctx.fillRect(-w / 2, -14, 16, 22); ctx.fillRect(w / 2 - 16, -14, 16, 22);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -14, w, 22);
  const nx = clamp(P.needle, -1.05, 1.05) * (w / 2 - 6); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(nx, 10); ctx.lineTo(nx - 8, 22); ctx.lineTo(nx + 8, 22); ctx.closePath(); ctx.fill(); ctx.fillRect(nx - 2, -18, 4, 30);
  ctx.font = '13px Graduate'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.paper; ctx.fillText(isTouch ? '◄ ► EQUILIBRA · A VOLTA' : '← → EQUILIBRA · Z VOLTA', 0, 34); ctx.restore();
}
function drawHUD() {
  const portrait = W < 640;
  // placar
  ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  chip(String(P.score).padStart(6, '0'), '32px Graduate', 104, 34, PAL.paper, PAL.ink, -.03, 12, 5);
  if (P.line.length) { ctx.font = '22px "Permanent Marker"'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineWidth = 6; ctx.strokeStyle = PAL.ink;
    const t = `${P.line.length > 1 ? 'COMBO ×' + P.line.length + '  ' : ''}${Math.round(P.pending)}`; ctx.strokeText(t, 22, 78); ctx.fillStyle = PAL.yellow; ctx.fillText(t, 22, 78); }
  sprayCan(22, portrait ? 98 : 100, portrait ? 140 : 170, meter);
  if (dropT > 0) chip(`×2 · ${Math.ceil(dropT)}s`, '16px Graduate', portrait ? 220 : 270, 115, PAL.red, PAL.paper, .06, 6, 3);
  // cronômetro
  stopwatch(portrait ? W - 52 : W / 2, portrait ? 50 : 52, P.time);
  // cartela de missões
  if (portrait) missionCard(14, 162, W - 28, true, .012); else missionCard(W - 330, 18, 312, false);
  // equilíbrio na borda
  if (P.mode === 'lip') balanceBar();
  // tutorial
  const tip = P.tut < 9 && P.pumps < 2 ? (isTouch ? 'SEGURA ▼ NA DESCIDA = BOMBA' : 'SEGURA ↓ NA DESCIDA = BOMBA')
    : P.airs > 0 && P.airs < 4 && P.score < 600 ? (isTouch ? 'NO AR: A + SETA = FLIP · B + SETA = GRAB' : 'NO AR: Z + SETA = FLIP · X + SETA = GRAB · ← → GIRA') : null;
  if (tip) chip(tip, `${portrait ? 12 : 15}px Graduate`, W / 2, isTouch ? GY + 22 : H - 30, PAL.yellow, PAL.ink, -.015, 8, 4);
  // pop-ups
  for (const p of popups) { const t = p.t, s = t < .08 ? 1.6 - t / .08 * .6 : 1, a = t > p.life - .3 ? (p.life - t) / .3 : 1, k = Math.min(1, (W - 20) / p.can.width);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(p.x, p.y - Math.max(0, t - .5) * 60); ctx.scale(s * k, s * k); ctx.drawImage(p.can, -p.can.width / 2, -p.can.height / 2); ctx.restore(); }
  // chuva de adesivos
  for (const q of rain) { const v = (S2.adesivos[q.k] || STICK[q.k])[boilF], s = q.s * 70 / Math.max(v.width, v.height) * (H / 720);
    ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.drawImage(v, -v.width * s / 2, -v.height * s / 2, v.width * s, v.height * s); ctx.restore(); }
  if (isTouch) drawTouch();
}
function drawTouch() { // botões de zine: ◄ ► ▲ ▼ à esquerda, A B à direita
  const portrait = W < 640, r = portrait ? 34 : 38, cy = H - (portrait ? 92 : 96), cx = portrait ? 104 : 130, d = r * 1.75;
  TB = [{ id:'L', x:cx - d, y:cy, r, l:'◄' }, { id:'R', x:cx + d, y:cy, r, l:'►' }, { id:'U', x:cx, y:cy - d * .95, r, l:'▲' }, { id:'D', x:cx, y:cy + d * .62, r:r * .92, l:'▼' },
    { id:'B', x:W - (portrait ? 150 : 190), y:cy + 14, r:r * 1.15, l:'B', s:'GRAB' }, { id:'A', x:W - (portrait ? 62 : 80), y:cy - 30, r:r * 1.15, l:'A', s:'FLIP' }];
  for (const b of TB) { const on = held(b.id);
    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.id === 'A' ? .06 : b.id === 'B' ? -.06 : 0);
    ctx.globalAlpha = .92; ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(on ? 2 : 5, on ? 2 : 5, b.r, 0, 7); ctx.fill();
    ctx.fillStyle = on ? PAL.yellow : 'AB'.includes(b.id) ? (b.id === 'A' ? PAL.red : PAL.blue) : PAL.paper;
    ctx.beginPath(); ctx.arc(on ? 2 : 0, on ? 2 : 0, b.r, 0, 7); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.stroke();
    ctx.globalAlpha = 1; ctx.fillStyle = on || !'AB'.includes(b.id) ? PAL.ink : PAL.paper; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `${b.s ? r * .8 : r * .7}px ${b.s ? '"Rubik Spray Paint"' : 'Graduate'}`; ctx.fillText(b.l, on ? 2 : 0, (on ? 2 : 0) - (b.s ? 5 : 0));
    if (b.s) { ctx.font = '11px Graduate'; ctx.fillText(b.s, on ? 2 : 0, (on ? 2 : 0) + r * .5); }
    ctx.restore(); }
}

// ---------- telas ----------
function hit(x, y, w, h, act) { HIT.push({ x:x - w / 2, y:y - h / 2, w, h, act }); }
function button(label, x, y, size, act) {
  const hov = HOVER === act, sc = hov ? 1.08 : 1 + Math.sin(clock * 5) * .025;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate(hov ? 0 : -.025);
  ctx.font = `${size}px Graduate`; const w = ctx.measureText(label).width + size * 1.7, h = size * 1.9;
  if (hov) { ctx.fillStyle = PAL.ink; star(ctx, 4, 4, w * .5, 14, clock * .6); ctx.fill(); ctx.fillStyle = PAL.red; star(ctx, 0, 0, w * .48, 14, clock * .6); ctx.fill(); }
  ctx.fillStyle = PAL.ink; ctx.fillRect(-w / 2 + 8, -h / 2 + 8, w, h);
  ctx.fillStyle = hov ? '#fff' : PAL.yellow; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, 3);
  ctx.restore(); hit(x, y, w * sc + 8, h * sc + 8, act);
}
function toggleMute() { muted = !muted; MUS.muted = muted; if (!muted && state === 'play') music(true); }
function cover(img) { const s = Math.max(W / img.width, H / img.height), w = img.width * s, h = img.height * s; ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h); }
function dropDeadMark(x, y, h) {
  if (UI.dropdead) { const w = h * UI.dropdead.width / UI.dropdead.height; ctx.drawImage(UI.dropdead, x, y - h / 2, w, h); return w; }
  const w = h * 1.6; ctx.save(); ctx.translate(x + w / 2, y); ctx.fillStyle = PAL.blue; ctx.beginPath(); ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, 7); ctx.fill();
  ctx.fillStyle = PAL.yellow; ctx.beginPath(); ctx.ellipse(0, 0, w / 2 - 5, h / 2 - 5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = PAL.blue; ctx.font = `${h * .26}px Graduate`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('DROP DEAD', 0, 2); ctx.restore(); return w;
}
function lockup(cx, y, scale) { // PCYES × DROP DEAD numa tira de papel com fita
  const lh = 46 * scale, pw = UI.pcyes ? lh * UI.pcyes.width / UI.pcyes.height : 160, dw = lh * 1.9 * 1.6, gap = 34 * scale, tw = pw + gap + dw + 60 * scale;
  ctx.save(); ctx.translate(cx, y); ctx.rotate(-.035);
  ctx.fillStyle = PAL.ink; ctx.fillRect(-tw / 2 + 6, -lh * 1.1 + 6, tw, lh * 2.2); ctx.fillStyle = PAL.paper; ctx.fillRect(-tw / 2, -lh * 1.1, tw, lh * 2.2);
  let x = -tw / 2 + 30 * scale;
  if (UI.pcyes) ctx.drawImage(UI.pcyes, x, -lh / 2, pw, lh); x += pw;
  ctx.fillStyle = PAL.ink; ctx.font = `${30 * scale}px "Permanent Marker"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('×', x + gap / 2, 2); x += gap;
  dropDeadMark(x, 0, lh * 1.9);
  ctx.restore(); tape(cx - tw / 2 + 20, y - lh * 1.1, 70 * scale, -.5); tape(cx + tw / 2 - 20, y + lh * 1.0, 70 * scale, -.4);
}
function titleArt() { return (S2.ui.keyart2 && S2.ui.keyart2[0]) || UI.keyart; }
function drawTitle() {
  const img = titleArt(); if (img) cover(img); else { ctx.fillStyle = PAL.night; ctx.fillRect(0, 0, W, H); }
  ctx.fillStyle = 'rgba(22,30,71,.35)'; ctx.fillRect(0, 0, W, H);
  const portrait = W < H * .9, cx = portrait ? W / 2 : W * .27, k = portrait ? .74 : .9;
  lockup(cx, H * .1, k);
  ctx.save(); ctx.translate(cx, H * .27); ctx.rotate(-.06); const fs = Math.min(104, W * (portrait ? .17 : .09));
  ctx.font = `${fs}px "Sedgwick Ave Display"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  for (const [t, dy] of [['DROP', -fs * .42], ['SESSION', fs * .5]]) {
    ctx.lineWidth = fs * .22; ctx.strokeStyle = PAL.ink; ctx.strokeText(t, 8, dy + 8);
    ctx.lineWidth = fs * .16; ctx.strokeStyle = PAL.yellow; ctx.strokeText(t, 0, dy); ctx.fillStyle = PAL.ink; ctx.fillText(t, 0, dy); }
  ctx.restore();
  chip('JOGO 2 · HALF-PIPE · 60 SEGUNDOS', `${Math.round(17 * k)}px Graduate`, cx, H * .405, PAL.blue, PAL.paper, .03);
  button(isTouch ? 'TOCA PRA DROPAR' : 'DROPAR  ▶', cx, H * .52, Math.round(38 * k), 'start');
  if (BEST > 0) chip(`MELHOR SESSÃO · ${BEST}`, '14px Graduate', cx, H * .52 + 62, PAL.ink, PAL.yellow, -.02, 8, 0);
  // cartão de controles
  const cw = portrait ? W - 36 : 372, rows = isTouch
    ? [['▼', 'segura na descida: bombeia'], ['A + SETA', 'no ar: flips'], ['B + SETA', 'no ar: grabs'], ['◄ ►', 'segura no ar: gira'], ['▲', 'devagar na borda: stall']]
    : [['↓ / S', 'segura na descida: bombeia'], ['Z + SETA', 'no ar: flips (ou J)'], ['X + SETA', 'no ar: grabs (ou K)'], ['← →', 'segura no ar: gira 180/360/540'], ['↑', 'devagar na borda: stall']];
  const rh = portrait ? 32 : 36, ch = 44 + rows.length * rh + 40, x0 = portrait ? 18 : cx - cw / 2, y0 = H - ch - (portrait ? 16 : 20);
  ctx.save(); ctx.translate(x0 + cw / 2, y0 + ch / 2); ctx.rotate(.018); ctx.translate(-cw / 2, -ch / 2);
  ctx.fillStyle = PAL.ink; ctx.fillRect(7, 7, cw, ch); ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, cw, ch); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(0, 0, cw, ch);
  rows.forEach(([a, b], i) => { const y = 30 + i * rh, kw = Math.max(46, a.length * 10 + 20); keycap(16, y, kw, a);
    ctx.fillStyle = PAL.ink; ctx.font = `${portrait ? 12 : 13}px Graduate`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(b.toUpperCase(), 28 + kw, y + 15); });
  ctx.fillStyle = PAL.red; ctx.font = `${portrait ? 11 : 13}px Graduate`; ctx.textAlign = 'center';
  ctx.fillText(isTouch ? 'MEDIDOR CHEIO: A+B ▲ ROBÔ FLIP · A+B ▼ DROP 35' : 'MEDIDOR CHEIO: Z+X ↑ ROBÔ FLIP · Z+X ↓ DROP 35', cw / 2, ch - 30);
  ctx.fillStyle = PAL.blue; ctx.fillText(isTouch ? 'PEGUE OS 4 PRODUTOS NO AR' : 'F = TELA CHEIA  ·  M = SOM', cw / 2, ch - 12);
  ctx.restore();
  ctx.save(); ctx.translate(x0 + 92, y0 + 4); ctx.rotate(-.05); ctx.fillStyle = PAL.ink; ctx.fillRect(-72, -14, 150, 30); ctx.fillStyle = PAL.red; ctx.fillRect(-76, -18, 150, 30);
  ctx.fillStyle = PAL.paper; ctx.font = '18px "Permanent Marker"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('COMO ANDAR', -1, -2); ctx.restore();
  tape(x0 + cw - 30, y0 + 6, 70, .5);
  if (!portrait) missionCard(W - 352, H - 190, 320, false, -.03, false);
  const hovM = HOVER === 'mute'; const m = chip(muted ? '♪ SOM: OFF' : '♪ SOM: ON', '14px Graduate', portrait ? W - 70 : 70, portrait ? H * .19 : 26, hovM ? PAL.yellow : PAL.ink, hovM ? PAL.ink : PAL.paper, 0, 9, hovM ? 3 : 0);
  hit(portrait ? W - 70 : 70, portrait ? H * .19 : 26, m.w, m.h, 'mute');
}
function nota(s) { let n = NOTAS[0][1]; for (const [v, t] of NOTAS) if (s >= v) n = t; return n; }
function drawEnd() {
  const img = titleArt(); if (img) cover(img); ctx.fillStyle = 'rgba(17,17,17,.6)'; ctx.fillRect(0, 0, W, H);
  const cw = Math.min(W - 32, 470), ch = Math.min(H - 40, 650), x0 = W / 2 - cw / 2, y0 = H / 2 - ch / 2, cx = W / 2;
  ctx.save(); ctx.translate(cx, H / 2); ctx.rotate(-.02); ctx.translate(-cx, -H / 2);
  ctx.fillStyle = PAL.ink; ctx.fillRect(x0 + 8, y0 + 8, cw, ch); ctx.fillStyle = PAL.paper; ctx.fillRect(x0, y0, cw, ch);
  ctx.fillStyle = PAL.blue; ctx.fillRect(x0, y0, cw, 92); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(x0, y0, cw, ch);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.paper; ctx.font = '19px Graduate'; ctx.fillText('DROP SESSION #35 · FIM DOS 60 s', cx, y0 + 28);
  ctx.font = '42px "Sedgwick Ave Display"'; ctx.fillStyle = PAL.yellow; ctx.fillText('SESSÃO FECHADA', cx, y0 + 64);
  ctx.fillStyle = PAL.ink; ctx.font = '80px Graduate'; ctx.fillText(String(P.score), cx, y0 + 156);
  ctx.font = '15px Graduate'; ctx.fillText(`PONTOS  ·  MELHOR: ${BEST}`, cx, y0 + 204);
  // carimbo da nota
  ctx.save(); ctx.translate(cx, y0 + 268); ctx.rotate(-.12); ctx.strokeStyle = PAL.red; ctx.lineWidth = 6; ctx.font = '46px "Rubik Spray Paint"';
  const n = nota(P.score), nw = ctx.measureText(n).width + 40; ctx.strokeRect(-nw / 2, -34, nw, 68); ctx.lineWidth = 2; ctx.strokeRect(-nw / 2 + 6, -28, nw - 12, 56); ctx.fillStyle = PAL.red; ctx.fillText(n, 0, 2); ctx.restore();
  ctx.restore();
  missionCard(x0 + 20, y0 + 322, cw - 40, cw < 420, -.01, false);
  if (allMiss()) { // cupom adesivo
    ctx.save(); ctx.translate(cx + cw * .18, y0 + 470); ctx.rotate(.08);
    ctx.fillStyle = PAL.ink; star(ctx, 5, 5, 74, 16, 0, .86); ctx.fill(); ctx.fillStyle = '#fff'; star(ctx, 0, 0, 74, 16, 0, .86); ctx.fill();
    ctx.fillStyle = PAL.yellow; ctx.beginPath(); ctx.arc(0, 0, 58, 0, 7); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.stroke();
    ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.arc(0, 0, 50, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '13px Graduate'; ctx.fillText('CUPOM LIBERADO', 0, -22);
    ctx.font = '17px Graduate'; ctx.fillStyle = PAL.red; ctx.fillText(CUPOM, 0, 2); ctx.font = '11px Graduate'; ctx.fillStyle = PAL.ink; ctx.fillText('NA DROP DEAD', 0, 24);
    ctx.restore();
    ctx.fillStyle = PAL.ink; ctx.font = '15px "Permanent Marker"'; ctx.textAlign = 'left'; ctx.fillText('CARTELA', x0 + 28, y0 + 452); ctx.fillText('COMPLETA!', x0 + 28, y0 + 474);
  } else { const f = MISSOES.filter(m => !MISS[m.k]).length; ctx.fillStyle = PAL.ink; ctx.font = '15px Graduate'; ctx.textAlign = 'center';
    ctx.fillText(`FALTA${f > 1 ? 'M' : ''} ${f} MISS${f > 1 ? 'ÕES' : 'ÃO'} PRO CUPOM`, cx, y0 + 470); }
  button(isTouch ? 'TOCA PRA IR DE NOVO' : 'DE NOVO  ▶', cx, y0 + ch - 54, 28, 'start');
  if (P.record && P.score > 0) chip('NOVO RECORDE!', '16px Graduate', cx + cw * .32, y0 + 118, PAL.red, PAL.paper, .15, 8, 4);
}
const FRASES = ['ENCERANDO O COPING', 'PARAFUSANDO O HALF-PIPE', 'APERTANDO OS TRUCKS', 'CHAMANDO A PLATEIA',
  'ACENDENDO OS POSTES', 'ACORDANDO O ROBÔ', 'COLANDO OS ADESIVOS', 'ABRINDO A DROP DEAD'];
function drawLoading() {
  ctx.fillStyle = PAL.yellow; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H * .4;
  ctx.fillStyle = PAL.red;
  for (let y = -180; y <= 180; y += 12) for (let x = -180; x <= 180; x += 12) { const d = Math.hypot(x, y); if (d < 180) { ctx.beginPath(); ctx.arc(cx + x, cy + y, 4.6 * (1 - d / 250), 0, 7); ctx.fill(); } }
  const t = Math.floor(clock * 12) / 12, cyc = (t % 1.2) / 1.2, inAir = cyc < .74, k = inAir ? cyc / .74 : 0;
  const air = inAir ? Math.sin(k * Math.PI) : 0, flip = inAir ? k * Math.PI * 2 : 0, bw = Math.min(330, W * .62);
  const by = cy + 40 - air * 130, Lv = S1.skate.lateral, Bv = S1.skate['fundo-plano'];
  ctx.fillStyle = 'rgba(17,17,17,.3)'; ctx.beginPath(); ctx.ellipse(cx, cy + 112, bw * .42 * (1 - air * .5), 10, 0, 0, 7); ctx.fill();
  if (Lv && Bv) { const c = Math.cos(flip), sn = Math.sin(flip);
    ctx.save(); ctx.translate(cx, by); ctx.rotate(-air * .18 + (inAir ? 0 : Math.sin(clock * 3) * .02));
    if (Math.abs(c) >= Math.abs(sn) * .8) { const im = Lv[boilF], h = bw * im.height / im.width; ctx.scale(1, c >= 0 ? 1 : -1); ctx.drawImage(im, -bw / 2, -h / 2, bw, h); }
    else { const im = Bv[boilF], h = bw * im.width / im.height * Math.max(.25, Math.abs(sn)); ctx.rotate(-Math.PI / 2); ctx.scale(1, sn > 0 ? 1 : -1); ctx.drawImage(im, -h / 2, -bw / 2, h, bw); }
    ctx.restore(); }
  const word = 'CARREGANDO', size = 34; let x = cx - word.length * size * .43;
  [...word].forEach((ch, i) => { const [bg, fg] = CHIPS[(i * 3 + Math.floor(clock * 2)) % CHIPS.length], f = FONTS[i % 4], dy = -Math.abs(Math.sin(clock * 6 - i * .55)) * 12;
    ctx.save(); ctx.translate(x, H * .66 + dy); ctx.rotate(((i * 37) % 11 - 5) * .025); ctx.font = `${size}px ${f}`;
    ctx.fillStyle = PAL.ink; ctx.fillRect(-size * .38 + 3, -size * .62 + 3, size * .76, size * 1.15); ctx.fillStyle = bg; ctx.fillRect(-size * .38, -size * .62, size * .76, size * 1.15);
    ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ch, 0, 2); ctx.restore(); x += size * .86; });
  const p = LOADP.n ? LOADP.d / LOADP.n : 0, bw2 = Math.min(440, W - 60), bx = cx - bw2 / 2, byy = H * .76;
  ctx.fillStyle = PAL.ink; ctx.fillRect(bx + 5, byy + 5, bw2, 30); ctx.fillStyle = PAL.paper; ctx.fillRect(bx, byy, bw2, 30);
  ctx.fillStyle = PAL.ink; ctx.fillRect(bx, byy, bw2 * p, 30);
  const r = rng(7); ctx.fillStyle = 'rgba(243,238,226,.55)'; for (let i = 0; i < bw2 * p / 2; i++) ctx.fillRect(bx + r() * bw2 * p, byy + r() * 30, 1.5, 1.5);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(bx, byy, bw2, 30);
  ctx.fillStyle = PAL.ink; ctx.font = '16px Graduate'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText(`${FRASES[Math.floor(clock / 1.3) % FRASES.length]}…  ${Math.round(p * 100)}%`, cx, byy + 44);
}
function render() {
  if (state === 'load' || !HP) { drawLoading(); return; }
  HIT = [];
  ctx.save();
  if (shake && state === 'play') ctx.translate((Math.random() - .5) * shake * .5, (Math.random() - .5) * shake * .5);
  if (state === 'play' || state === 'end') { drawScene(); if (state === 'play') { drawRider(); drawFX(); } drawFrontCrowd(); }
  ctx.restore();
  ctx.globalAlpha = .3; ctx.globalCompositeOperation = 'multiply';
  const ox = (boilF * 83) % 256, oy = (boilF * 57) % 256;
  for (let y = -oy; y < H; y += 256) for (let x = -ox; x < W; x += 256) ctx.drawImage(NOISE, x, y);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (flash > 0) { ctx.fillStyle = `rgba(255,255,255,${flash * 3})`; ctx.fillRect(0, 0, W, H); }
  if (state === 'play') drawHUD();
  else if (state === 'title') drawTitle();
  else if (state === 'end') drawEnd();
}

// ---------- loop ----------
let last = performance.now();
function frame(now) {
  const dt = Math.max(0, Math.min(1 / 30, (now - last) / 1000)); last = now;
  requestAnimationFrame(frame);
  try { update(dt); render(); } catch (e) { if (!frame.err) { frame.err = 1; console.error(e); } }
}
document.addEventListener('visibilitychange', () => { last = performance.now(); music(!document.hidden && state === 'play'); });

// ---------- tela cheia ----------
const fsBtn = document.getElementById('fs');
function toggleFS() { const d = document, el = d.documentElement;
  if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
  else if (el.requestFullscreen || el.webkitRequestFullscreen) (el.requestFullscreen || el.webkitRequestFullscreen).call(el); }
if (fsBtn) { fsBtn.addEventListener('click', e => { e.stopPropagation(); toggleFS(); fsBtn.blur(); });
  if (!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)) fsBtn.style.display = 'none'; }
['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => {
  if (fsBtn) fsBtn.textContent = (document.fullscreenElement || document.webkitFullscreenElement) ? '✕ SAIR' : '⛶ TELA CHEIA'; resize(); }));

(async function boot() {
  resize(); addEventListener('resize', resize);
  requestAnimationFrame(frame);
  await Promise.all(['40px Graduate', '40px "Permanent Marker"', '40px "Rubik Spray Paint"', '40px "Sedgwick Ave Display"'].map(f => document.fonts.load(f).catch(() => {})));
  await loadSet('sprites/j1', 'skate', S1.skate, null, ['lateral', 'fundo-plano']); // a tela de carregamento usa o shape
  await Promise.all([
    loadSet('sprites/j1', 'robo', S1.robo, null, J1_ROBO),
    loadSet('sprites/j1', 'obj', S1.obj, null),
    ...Object.keys(S2).map(d => loadSet('sprites', d, S2[d], M2)),
    ...['pcyes', 'dropdead'].map(async n => { const i = await load(`sprites/j1/ui/${n}.webp?v=${VER}`); if (i) UI[n] = i; }),
  ]);
  if (!S2.ui.keyart2) UI.keyart = await load(`sprites/j1/ui/keyart.webp?v=${VER}`); // só se a capa do jogo 2 faltar
  if (RAW['cenario/halfpipe']) { buildProfile(RAW['cenario/halfpipe']); resize(); }
  buildProcedural();
  await new Promise(r => setTimeout(r, 0));
  buildLayers();
  reset(); cam.ready = true; state = 'title';
  if (QS.has('auto')) start();
})();
})();
