/* DROP LINE — PCYES × Drop Dead · protótipo jogável (spike)
   Pseudo-3D estilo arcade 90 em Canvas 2D. Animação do robô a 8 fps, shape em degraus a 12 fps. */
(() => {
'use strict';

// ---------- constantes ----------
const PAL = { blue:'#3558A8', blue2:'#2B4889', yellow:'#F6BE27', red:'#E5141B', ink:'#111111',
  paper:'#F3EEE2', paper2:'#E4DAC4', paper3:'#D6CBB2' };
const C = { segL:200, roadW:700, rumble:3, camH:1000, fov:100, draw:240, lanes:[-0.62, 0, 0.62],
  g:4600, jumpV:1750, kickV:2700, railH:170, maxSpeed:7200, minSpeed:3600 };
C.camD = 1 / Math.tan((C.fov / 2) * Math.PI / 180);
C.playerZ = C.camH * C.camD;

const TRICKS = {
  left:  { n:'KICKFLIP', p:300, d:0.34, roll: 1, yaw:0 },
  right: { n:'HEELFLIP', p:300, d:0.34, roll:-1, yaw:0 },
  down:  { n:'SHOVE-IT', p:200, d:0.26, roll: 0, yaw:1 },
  up:    { n:'360 FLIP', p:800, d:0.50, roll: 1, yaw:2 },
};
const NOTAS = [[0,'POSER'],[8000,'AMADOR'],[20000,'CABULOSO'],[40000,'LENDA'],[65000,'DROP DEAD']];

// ---------- canvas ----------
const cv = document.getElementById('game');
const ctx = cv.getContext('2d');
let W = 720, H = 720, F = 360, HOR = 300, DPR = 1, isTouch = matchMedia('(pointer:coarse)').matches;
function resize() {
  const a = innerWidth / innerHeight;
  H = 720; W = Math.round(Math.min(1180, Math.max(400, H * a)));
  F = H / 2; HOR = Math.round(H * 0.40);
  DPR = Math.min(2, devicePixelRatio || 1);
  cv.width = W * DPR; cv.height = H * DPR;
  const s = Math.min(innerWidth / W, innerHeight / H) * (a > 1.2 ? 0.94 : 1);
  cv.style.width = W * s + 'px'; cv.style.height = H * s + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  buildSkyline();
}

// ---------- util ----------
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeIn = (a, b, t) => a + (b - a) * t * t;
const easeInOut = (a, b, t) => a + (b - a) * ((-Math.cos(t * Math.PI) / 2) + 0.5);
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function mk(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; }
function load(src) { return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; }); }

// ---------- assets ----------
const VER = Date.now(); // evita cache de sprites antigos durante o desenvolvimento
const SPR = { robo:{}, skate:{}, obj:{} }, UI = {};
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
    noise(0, .14, .35, 500, 2600, 3); noise(.14, .14, .3, 2600, 500, 3); }, // scratch de disco
  trick() { tone(784, 0, .08, 'square', .1); tone(1175, .07, .16, 'square', .1); tone(1568, .07, .16, 'triangle', .08); noise(0, .1, .3, 900, 3000, 2.5); },
  whoosh() { noise(0, .22, .35, 400, 2400, 1.2); },
  pop() { noise(0, .05, .4, 1800, 900, .8); },
  land() { noise(0, .09, .5, 220, 120, .7); tone(90, 0, .1, 'sine', .25, 50); },
};
function rate(r, ms) { MUS.playbackRate = r; if (ms) setTimeout(() => { MUS.playbackRate = dropT > 0 ? 1.06 : 1; }, ms); }
const canFilter = typeof ctx.filter === 'string';
function boilVariants(img) { // 3 versões levemente distorcidas → traço "tremendo"
  if (!canFilter) return [img, img, img];
  return [0, 1, 2].map(k => mk(img.width + 8, img.height + 8, (c) => { c.filter = `url(#boil${k})`; c.drawImage(img, 4, 4); }));
}
async function loadSet(dir, target) {
  const m = await fetch(`sprites/${dir}/manifest.json?v=${Date.now()}`, { cache: 'no-store' }).then(r => r.json()).catch(() => ({}));
  await Promise.all(Object.keys(m).map(async n => { const i = await load(`sprites/${dir}/${n}.webp?v=${VER}`); if (i) target[n] = boilVariants(i); }));
}

// ---------- sprites procedurais (moeda, produto placeholder, sol, retícula, xerox) ----------
let COIN, SUN, NOISE, PROD = {};
function inkJitter(c, pts, r, close) { c.beginPath(); pts.forEach(([x, y], i) => { const jx = x + (r() - .5) * 2, jy = y + (r() - .5) * 2; i ? c.lineTo(jx, jy) : c.moveTo(jx, jy); }); if (close) c.closePath(); }
function buildProcedural() {
  COIN = [0, 1, 2].map(k => mk(96, 96, (c) => { const r = rng(10 + k);
    c.fillStyle = PAL.ink; c.beginPath(); c.arc(50, 50, 42, 0, 7); c.fill();
    c.fillStyle = PAL.yellow; c.beginPath(); c.arc(47 + r(), 47 + r(), 38, 0, 7); c.fill();
    c.strokeStyle = PAL.ink; c.lineWidth = 3; c.setLineDash([4, 5]); c.beginPath(); c.arc(47, 47, 30, 0, 7); c.stroke(); c.setLineDash([]);
    c.fillStyle = PAL.ink; c.font = '900 44px Graduate'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('P', 48 + r() * 2, 50 + r() * 2);
    c.fillStyle = PAL.paper; c.globalAlpha = .7; c.fillRect(26, 24, 8, 14); }));
  SUN = mk(420, 420, (c) => { c.fillStyle = PAL.red; for (let y = 0; y < 420; y += 9) for (let x = (y / 9 % 2) * 4.5; x < 420; x += 9) {
    const d = Math.hypot(x - 210, y - 210); if (d < 205) { c.beginPath(); c.arc(x, y, 3.6 * (1 - d / 520), 0, 7); c.fill(); } } });
  NOISE = mk(256, 256, (c) => { const r = rng(99); for (let i = 0; i < 2600; i++) { c.fillStyle = r() < .7 ? 'rgba(17,17,17,.55)' : 'rgba(243,238,226,.8)';
    c.fillRect(r() * 256, r() * 256, r() * 2.2 + .4, r() * 2.2 + .4); } });
  const lab = { 'p-shape':'SHAPE', 'p-meia':'MEIA', 'p-teclado':'TECLADO', 'p-mouse':'MOUSE' };
  for (const k in lab) PROD[k] = [0, 1, 2].map(v => mk(200, 200, (c) => { const r = rng(v * 31 + k.length);
    c.fillStyle = PAL.ink; c.beginPath(); c.arc(104, 104, 90, 0, 7); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(100 + r(), 100 + r(), 88, 0, 7); c.fill();
    c.fillStyle = k === 'p-meia' ? PAL.red : k === 'p-mouse' ? PAL.yellow : PAL.blue; c.beginPath(); c.arc(100, 100, 74, 0, 7); c.fill();
    c.fillStyle = k === 'p-mouse' ? PAL.ink : PAL.paper; c.font = '30px "Permanent Marker"'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.save(); c.translate(100, 100); c.rotate(-.12); c.fillText(lab[k], 0, 2); c.restore(); }));
}

// murais (logos pichados nas paredes)
const MURAIS = ['pcyes', 'dd35', 'dropdead', 'pcyes-pixo'];
let MURAL = {}, frameNo = 0;
function drips(c, w, h, col, n, seed) { const r = rng(seed); c.strokeStyle = col; c.lineCap = 'round';
  for (let i = 0; i < n; i++) { const x = r() * w, y = h * (.55 + r() * .3); c.lineWidth = 2 + r() * 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 20 + r() * 70); c.stroke(); } }
function buildMurals() {
  MURAL.pcyes = mk(640, 260, (c, w, h) => { const r = rng(5);
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(12, 20); for (let x = 12; x < w - 12; x += 30) c.lineTo(x, 14 + r() * 12); c.lineTo(w - 10, h * .8); for (let x = w - 10; x > 12; x -= 30) c.lineTo(x, h * .8 - r() * 12); c.closePath(); c.fill();
    if (UI.pcyes) { const lw = w * .82, lh = lw * UI.pcyes.height / UI.pcyes.width; c.drawImage(UI.pcyes, (w - lw) / 2, h * .42 - lh / 2, lw, lh); }
    drips(c, w, h, PAL.red, 9, 3); });
  MURAL.dd35 = mk(760, 280, (c, w, h) => { c.font = '150px "Sedgwick Ave Display"'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
    c.lineWidth = 34; c.strokeStyle = PAL.ink; c.strokeText('DROP DEAD', w / 2 + 8, 118); c.lineWidth = 22; c.strokeStyle = PAL.yellow; c.strokeText('DROP DEAD', w / 2, 110);
    c.fillStyle = PAL.blue; c.fillText('DROP DEAD', w / 2, 110); c.font = '80px "Permanent Marker"'; c.fillStyle = PAL.red; c.fillText('35 ANOS', w * .66, 220); drips(c, w, h, PAL.blue, 7, 9); });
  MURAL.dropdead = mk(520, 340, (c, w, h) => {
    if (UI.dropdead) { const lw = w * .9, lh = lw * UI.dropdead.height / UI.dropdead.width; c.drawImage(UI.dropdead, (w - lw) / 2, (h - lh) / 2 - 20, lw, lh); }
    else { c.fillStyle = PAL.blue; c.beginPath(); c.ellipse(w / 2, h / 2 - 20, w * .46, h * .38, 0, 0, 7); c.fill(); c.fillStyle = PAL.yellow; c.beginPath(); c.ellipse(w / 2, h / 2 - 20, w * .42, h * .33, 0, 0, 7); c.fill();
      c.fillStyle = PAL.blue; c.font = '64px Graduate'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DROP DEAD', w / 2, h / 2 - 18); }
    drips(c, w, h, PAL.blue, 6, 4); });
  MURAL['pcyes-pixo'] = mk(700, 260, (c, w, h) => { c.font = '170px "Rubik Spray Paint"'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillStyle = PAL.ink; c.fillText('PCYES', w / 2 + 7, 112); c.fillStyle = PAL.red; c.fillText('PCYES', w / 2, 105);
    c.font = '54px "Permanent Marker"'; c.fillStyle = PAL.ink; c.fillText('× DROP DEAD', w * .62, 215); drips(c, w, h, PAL.red, 8, 11); });
}
function muralT(s, side, w) {
  const b = w.b; if (b.mf === frameNo) return b.mt; b.mf = frameNo; b.mt = null;
  const s0 = segs[s.i - w.k], last = s0 && segs[s0.i + w.len - 1], img = MURAL[b.mural];
  if (!img || !s0 || !last || s0.f !== frameNo || last.f !== frameNo || s0.p1.s.Z <= C.camD) return null;
  const sg = side === 'wallL' ? -1 : 1, lenW = w.len * C.segL;
  let u0 = .1, u1 = .9, mw = (u1 - u0) * lenW, mh = mw * img.height / img.width; const v0 = 1250 / b.h; let vr = mh / b.h;
  if (v0 + vr > .9) { vr = .9 - v0; mh = vr * b.h; mw = mh * img.width / img.height; const ur = mw / lenW / 2; u0 = .5 - ur; u1 = .5 + ur; }
  if (vr < .06) return null;
  const Q = (u, v) => { const f = u * w.len, j = Math.min(w.len - 1, Math.floor(f)), t = f - j, sj = segs[s0.i + j], A = sj.p1.s, B = sj.p2.s;
    return [lerp(A.x + sg * A.w * 1.62, B.x + sg * B.w * 1.62, t), lerp(A.y, B.y, t) - b.h * v * lerp(A.sc, B.sc, t) * F]; };
  const [o, xe, ye] = sg < 0 ? [Q(u0, v0 + vr), Q(u1, v0 + vr), Q(u0, v0)] : [Q(u1, v0 + vr), Q(u0, v0 + vr), Q(u1, v0)];
  return (b.mt = [(xe[0] - o[0]) / img.width, (xe[1] - o[1]) / img.width, (ye[0] - o[0]) / img.height, (ye[1] - o[1]) / img.height, o[0], o[1]]);
}

// skyline procedural, emendável, 2 camadas
let SKY_FAR, SKY_NEAR;
function skylineLayer(w, h, seed, near) {
  return mk(w, h, (c) => { const r = rng(seed); let x = -20;
    while (x < w) { const bw = 40 + r() * (near ? 120 : 80), bh = h * (near ? .35 + r() * .55 : .25 + r() * .5), y = h - bh;
      c.fillStyle = near ? (r() < .5 ? PAL.paper : PAL.blue) : PAL.blue; c.fillRect(x, y, bw, bh);
      c.strokeStyle = PAL.ink; c.lineWidth = near ? 2.5 : 1.5; c.strokeRect(x, y, bw, bh);
      if (near) { c.fillStyle = PAL.ink; for (let wy = y + 10; wy < h - 10; wy += 14) for (let wx = x + 6; wx < x + bw - 8; wx += 12) if (r() < .55) c.fillRect(wx, wy, 5, 7); }
      if (r() < .4) { c.strokeStyle = PAL.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x + bw * .5, y); c.lineTo(x + bw * .5, y - 18 - r() * 20); c.stroke(); }
      if (r() < .3) { c.fillStyle = PAL.paper2; c.fillRect(x + bw * .2, y - 12, 16, 12); c.strokeRect(x + bw * .2, y - 12, 16, 12); }
      if (near && r() < .7) { c.strokeStyle = PAL.ink; c.lineWidth = 2; for (let t = 0; t < 3; t++) { const tx = x + 6 + t * (bw / 3), ty = y + 8; c.beginPath();
        c.moveTo(tx, ty + 22); c.lineTo(tx + 2, ty); c.lineTo(tx + 8, ty + 10); c.lineTo(tx + 12, ty - 2); c.lineTo(tx + 12, ty + 22); c.stroke(); } }
      x += bw + (r() < .2 ? r() * 20 : -2); }
    // emenda: copia início no fim
    const img = c.getImageData(0, 0, 60, h); c.putImageData(img, w - 60, 0); });
}
function buildSkyline() { SKY_FAR = skylineLayer(1400, 260, 3, false); SKY_NEAR = skylineLayer(1600, 300, 8, true); }

// ---------- pista ----------
let segs = [], trackLen = 0;
const R = rng(2026);
function lastY() { return segs.length ? segs[segs.length - 1].p2.y : 0; }
function addSeg(curve, y) {
  const n = segs.length;
  segs.push({ i:n, curve, color: Math.floor(n / C.rumble) % 2,
    p1:{ x:0, y:lastY(), z:n * C.segL, s:{} }, p2:{ x:0, y, z:(n + 1) * C.segL, s:{} },
    spr:[], obs:[], items:[], rail:null, text:null, wallL:null, wallR:null, via:false, sky:null });
}
function road(enter, hold, leave, curve, dy) {
  const y0 = lastY(), y1 = y0 + dy * C.segL, tot = enter + hold + leave;
  for (let n = 0; n < enter; n++) addSeg(easeIn(0, curve, n / enter), easeInOut(y0, y1, n / tot));
  for (let n = 0; n < hold; n++) addSeg(curve, easeInOut(y0, y1, (enter + n) / tot));
  for (let n = 0; n < leave; n++) addSeg(easeInOut(curve, 0, n / leave), easeInOut(y0, y1, (enter + hold + n) / tot));
}
const ACTS = []; // {from, nome, sky}
function act(nome, sky, env = 'rua') { ACTS.push({ from: segs.length, nome, sky, env }); }

function buildTrack() {
  segs = []; ACTS.length = 0;
  act('LARGADA', PAL.yellow, 'elevado');
  road(10, 60, 10, 0, 0);
  road(30, 40, 30, 1.2, 0);
  road(20, 40, 20, 0, 4);
  road(30, 50, 30, -1.6, 0);
  act('LADEIRA', '#F6A927');
  road(40, 30, 10, 0, 14);          // sobe até a crista
  road(10, 20, 60, 0, -46);          // despenca
  road(30, 60, 30, 2.2, -10);
  road(30, 40, 30, -2.4, -14);
  act('VIADUTO', '#F08A2A');
  road(20, 90, 20, 0, -4);
  road(30, 50, 30, 1.6, 0);
  act('PRAÇA', '#E8582A', 'praca');
  road(20, 160, 20, 0, 0);
  road(30, 40, 30, -1.4, 6);
  road(20, 120, 20, 0, 0);
  act('CHEGADA', '#2B3F7A');
  road(30, 50, 30, 1.2, -6);
  road(10, 120, 10, 0, 0);
  trackLen = segs.length * C.segL;

  // prédios: blocos contínuos de cada lado, com becos
  segs.forEach(s => { let e = 'rua'; for (const a of ACTS) if (s.i >= a.from) e = a.env; s.env = e; });
  let muralN = 0;
  for (const side of ['wallL', 'wallR']) {
    let i = 0;
    while (i < segs.length) {
      if (segs[i].env !== 'rua') { i++; continue; }
      if (R() < .18) { i += 4 + Math.floor(R() * 6); continue; } // beco → vê a cidade
      let len = 6 + Math.floor(R() * 12), n = 0;
      while (n < len && i + n < segs.length && segs[i + n].env === 'rua') n++;
      len = n;
      const b = { h: 1600 + R() * 4200, blue: R() < .38, shutter: R() < .5, id: i, tags: [],
        mural: len >= 8 && R() < .6 ? MURAIS[(muralN++) % MURAIS.length] : null };
      for (let k = 0; k < len && i + k < segs.length; k++) {
        const t = []; const nTag = R() < .8 ? 1 + Math.floor(R() * 2) : 0;
        for (let q = 0; q < nTag; q++) t.push({ u: R() * .7, v: .55 + R() * .38, w: .2 + R() * .3, hh: .12 + R() * .14, red: R() < .18, seed: Math.floor(R() * 1e6) });
        segs[i + k][side] = { b, k, len, tags: t };
      }
      i += len;
    }
  }
  // viaduto
  const vStart = ACTS[2].from + 60;
  for (let k = 0; k < 6; k++) segs[vStart + k].via = k === 0 ? 'front' : 'under';

  // objetos de calçada
  for (let i = 8; i < segs.length - 10; i += 9) {
    const side = (i / 9) % 2 ? 1 : -1, e = segs[i].env;
    if (e === 'elevado') { segs[i].spr.push({ k: 'luminaria', x: side * 1.3, hw: 2600, flip: side > 0 }); continue; }
    if (e === 'praca') { segs[i].spr.push({ k: 'arvore', x: side * (1.45 + R() * .6), hw: 0 });
      if (R() < .55) segs[i + 4].spr.push({ k: ['orelhao', 'banca', 'arvore'][Math.floor(R() * 3)], x: -side * (1.5 + R() * .5), hw: 0 }); continue; }
    segs[i].spr.push({ k: 'poste', x: side * 1.22, hw: 2700, pole: true, side });
    if (R() < .35) segs[i + 4].spr.push({ k: ['orelhao', 'banca', 'arvore'][Math.floor(R() * 3)], x: -side * 1.42, hw: 0 });
    if (R() < .25) segs[i + 2].spr.push({ k: 'luminaria', x: side * 1.12, hw: 2600, flip: side > 0 });
  }
  const HW = { orelhao: 1100, banca: 1150, arvore: 2300, cone: 230, cavalete: 270, carrinho: 320, caixotes: 340, rampa: 300, buraco: 120 };
  segs.forEach(s => s.spr.forEach(p => { if (!p.hw) p.hw = HW[p.k]; }));

  // texto pichado no chão (tutorial)
  const T = isTouch ? ['ARRASTA ← →', 'TOCA PRA PULAR', 'NO AR: ARRASTA = MANOBRA'] : ['← →  TROCA FAIXA', 'ESPAÇO PRA PULAR', 'NO AR: ← → ↑ ↓ MANOBRA'];
  segs[22].text = T[0]; segs[60].text = T[1]; segs[110].text = T[2];
  segs[188].text = isTouch ? 'PULA NO CORRIMÃO' : 'PULA NO CORRIMÃO · ↓ = SLIDE';

  // obstáculos, moedas, rampas, corrimões, produtos
  const lane = () => Math.floor(R() * 3);
  const obs = (i, k, l, h) => segs[i].obs.push({ k, l, h, x: C.lanes[l] });
  const coinRow = (i, l, n, z = 0) => { for (let k = 0; k < n; k++) segs[i + k * 3].items.push({ k: 'coin', l, x: C.lanes[l], z, got: false }); };
  const coinArc = (i, l) => { for (let k = 0; k < 7; k++) { const t = k / 6; segs[i + k * 2].items.push({ k: 'coin', l, x: C.lanes[l], z: 4 * 300 * t * (1 - t) + 40, got: false }); } };

  coinRow(30, 1, 6); coinRow(70, 0, 5); obs(85, 'cone', 1, 200); coinArc(80, 1);
  for (let i = 140; i < ACTS[4].from - 30; i += 26 + Math.floor(R() * 18)) {
    const l = lane(), r = R();
    if (r < .45) { const k = ['cone', 'cavalete', 'carrinho', 'caixotes'][Math.floor(R() * 4)]; obs(i, k, l, { cone: 200, cavalete: 230, carrinho: 260, caixotes: 280 }[k]); coinArc(i - 6, l); }
    else if (r < .6) { obs(i, 'buraco', l, 1); coinRow(i - 9, (l + 1) % 3, 5); }
    else if (r < .75) { obs(i, 'rampa', l, -1); coinArc(i + 1, l); }
    else coinRow(i, l, 6);
  }
  // corrimão de tutorial (largada)
  for (let q = 180; q < 240; q++) { segs[q].obs = []; segs[q].items = []; }
  for (let q = 0; q < 26; q++) segs[200 + q].rail = { l: 1, x: C.lanes[1], first: q === 0, last: q === 25 };
  coinRow(202, 1, 8, C.railH + 60);
  // praça: corrimões
  const pr = ACTS[3].from;
  for (let k = 0; k < 4; k++) { const i = pr + 25 + k * 60, l = k % 3, len = 22 + Math.floor(R() * 10);
    for (let q = 0; q < len; q++) segs[i + q].rail = { l, x: C.lanes[l], first: q === 0, last: q === len - 1 };
    coinRow(i + 2, l, Math.floor(len / 3), C.railH + 60); }
  // produtos (um por ato)
  [['p-shape', ACTS[1].from - 20], ['p-meia', ACTS[2].from + 30], ['p-teclado', ACTS[3].from + 10], ['p-mouse', ACTS[4].from + 20]]
    .forEach(([k, i], n) => segs[i].items.push({ k, l: n % 3, x: C.lanes[n % 3], z: 90, got: false, prod: true }));
}
const segAt = z => segs[clamp(Math.floor(z / C.segL), 0, segs.length - 1)];

// ---------- estado ----------
let flyers = [], ROBO = { x: 0, y: 0, h: 100 };
let P, state = 'load', popups = [], parts = [], shake = 0, hitstop = 0, clock = 0, boilF = 0, dropT = 0, flash = 0, skyX = 0;
function reset() {
  buildTrack();
  P = { pos: 0, speed: 0, x: 0, lane: 1, air: 0, vz: 0, mode: 'ride', trick: null, trickEnd: -9, grab: false,
    pending: 0, mult: 0, groundT: 0, score: 0, coins: 0, bails: 0, prods: {}, curvaT: 0, curvaDir: 0, landT: 0,
    bailT: 0, pushT: 1.6, slide: false, lastTrickName: '', shown: {}, slotT: {}, glowT: 0 };
  flyers = [];
  popups = []; parts = []; dropT = 0; cv.classList.remove('drop');
}

// ---------- entrada ----------
const keys = {};
addEventListener('keydown', e => {
  const k = e.key; if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(k)) e.preventDefault();
  if (e.repeat) return; keys[k] = true;
  if (k === 'm' || k === 'M') { muted = !muted; MUS.muted = muted; if (!muted && state === 'play') music(true); return; }
  if (state !== 'play') { if (k === ' ' || k === 'Enter' || k === 'r' || k === 'R') start(); return; }
  if (k === 'ArrowLeft' || k === 'a' || k === 'A') input('left');
  else if (k === 'ArrowRight' || k === 'd' || k === 'D') input('right');
  else if (k === 'ArrowUp' || k === 'w' || k === 'W') input('up');
  else if (k === 'ArrowDown' || k === 's' || k === 'S') input('down');
  else if (k === ' ') input('jump');
});
addEventListener('keyup', e => { keys[e.key] = false; if (e.key === ' ' && P) P.grab = false; });
let tStart = null;
cv.addEventListener('click', () => { if (state === 'title' || state === 'end' || state === 'over') start(); });
cv.addEventListener('touchstart', e => { e.preventDefault(); const t = e.changedTouches[0]; tStart = { x: t.clientX, y: t.clientY, t: performance.now(), held: false };
  if (state !== 'play') { start(); tStart = null; } }, { passive: false });
cv.addEventListener('touchmove', e => { e.preventDefault(); if (!tStart) return; const t = e.changedTouches[0], dx = t.clientX - tStart.x, dy = t.clientY - tStart.y;
  if (Math.hypot(dx, dy) > 34 && !tStart.used) { tStart.used = true; swipe(dx, dy); } }, { passive: false });
cv.addEventListener('touchend', e => { e.preventDefault(); if (!tStart) return;
  if (!tStart.used && performance.now() - tStart.t < 260) input('jump'); P && (P.grab = false); tStart = null; }, { passive: false });
setInterval(() => { if (tStart && !tStart.used && P && P.mode === 'air' && performance.now() - tStart.t > 220) P.grab = true; }, 50);
function swipe(dx, dy) { if (Math.abs(dx) > Math.abs(dy)) input(dx < 0 ? 'left' : 'right'); else input(dy < 0 ? 'up' : 'down'); }

function input(a) {
  if (P.mode === 'bail') return;
  if (P.mode === 'ride') {
    if (a === 'left' && P.lane > 0) { P.lane--; P.curvaT = .28; P.curvaDir = -1; }
    else if (a === 'right' && P.lane < 2) { P.lane++; P.curvaT = .28; P.curvaDir = 1; }
    else if (a === 'up' || a === 'jump') ollie(C.jumpV);
  } else if (P.mode === 'air') {
    if (a === 'jump') { P.grab = true; return; }
    if (TRICKS[a] && !P.trick && !(P.takeoff > 0)) { P.trick = { ...TRICKS[a], t: 0 }; SFX.whoosh(); }
  } else if (P.mode === 'grind') {
    if (a === 'jump' || a === 'up') { P.mode = 'air'; P.vz = C.jumpV * .8; bank(false, true); }
    else if (a === 'down') { P.slide = !P.slide; }
    else if (a === 'left' && P.lane > 0) { P.lane--; P.mode = 'air'; P.vz = 600; }
    else if (a === 'right' && P.lane < 2) { P.lane++; P.mode = 'air'; P.vz = 600; }
  }
}
function ollie(v) { SFX.pop(); P.mode = 'air'; P.vz = v; P.air = Math.max(P.air, 1); P.trick = null; P.grab = false; P.takeoff = .12; }

// ---------- pontos ----------
function addLine(name, pts) { SFX.trick(); P.mult++; P.pending += pts; P.lastTrickName = name;
  popups.push(makePopup(name, '+' + pts, P.mult)); }
function bank(clean, keepLine) {
  if (!P.pending) return;
  if (keepLine) return; // linha continua (grind → pulo)
  const total = Math.round(P.pending * Math.max(1, P.mult) * (clean ? 1.5 : 1));
  P.score += total;
  if (P.mult > 1 || clean) popups.push(makePopup(clean ? 'LIMPO!' : 'LINHA', `${total}`, P.mult, true));
  P.pending = 0; P.mult = 0;
}
const FONTS = ['Graduate', '"Permanent Marker"', '"Rubik Spray Paint"', '"Sedgwick Ave Display"', 'Impact', 'Georgia'];
const CHIPS = [[PAL.paper, PAL.ink], [PAL.yellow, PAL.ink], [PAL.blue, PAL.paper], [PAL.ink, PAL.yellow], [PAL.red, PAL.paper], ['#fff', PAL.blue]];
function makePopup(word, sub, mult, big) {
  const r = rng(word.length * 77 + Math.floor(clock * 10)), size = big ? 46 : 38;
  const can = mk(word.length * size * .95 + 40, size * 2.6, (c) => {
    let x = 10;
    for (const ch of word) { if (ch === ' ') { x += size * .4; continue; }
      const f = FONTS[Math.floor(r() * FONTS.length)], [bg, fg] = CHIPS[Math.floor(r() * CHIPS.length)];
      c.font = `${size}px ${f}`; const w = c.measureText(ch).width + 10;
      c.save(); c.translate(x + w / 2, size * .75); c.rotate((r() - .5) * .3);
      c.fillStyle = PAL.ink; c.fillRect(-w / 2 + 3, -size * .62 + 3, w, size * 1.15);
      c.fillStyle = bg; c.fillRect(-w / 2, -size * .62, w, size * 1.15);
      c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch, 0, 2); c.restore(); x += w - 2; }
    c.font = `${size * .8}px "Sedgwick Ave Display"`; c.fillStyle = PAL.red; c.textBaseline = 'top';
    c.fillText(sub + (mult > 1 ? `  ×${mult}` : ''), 14, size * 1.5);
  });
  return { can, t: 0, life: big ? 1.6 : 1.1, x: W / 2 + (r() - .5) * W * .25, y: H * (big ? .30 : .38) };
}

// ---------- atualização ----------
function update(dt) {
  clock += dt;
  boilF = Math.floor(clock * 8) % 3;
  if (state !== 'play') return;
  if (hitstop > 0) { hitstop -= dt; return; }
  const prog = P.pos / trackLen;
  const seg = segAt(P.pos + C.playerZ);
  const slope = (seg.p2.y - seg.p1.y) / C.segL;
  let target = lerp(C.minSpeed, C.maxSpeed, clamp(prog * 1.6, 0, 1)) - slope * 2600;
  if (P.mode === 'bail') target = 1200;
  if (P.pushT > 0) { P.pushT -= dt; target = Math.min(target, 2600 + (1.6 - P.pushT) * 900); }
  P.speed = lerp(P.speed, target, clamp(dt * (P.mode === 'bail' ? 3 : 1.2), 0, 1));
  const oldZ = P.pos + C.playerZ;
  P.pos = Math.min(P.pos + P.speed * dt, trackLen - C.playerZ - C.segL * 2);
  const newZ = P.pos + C.playerZ;
  P.x = lerp(P.x, C.lanes[P.lane], clamp(dt * 13, 0, 1));
  skyX += seg.curve * P.speed * dt * 0.0018;
  if (P.curvaT > 0) P.curvaT -= dt;
  if (P.landT > 0) P.landT -= dt;
  if (P.takeoff > 0) P.takeoff -= dt;
  if (dropT > 0) { dropT -= dt; if (dropT <= 0) { cv.classList.remove('drop'); rate(1); } }

  // ar
  if (P.mode === 'air') {
    const prevAir = P.air;
    P.vz -= C.g * dt; P.air += P.vz * dt;
    if (P.trick) { P.trick.t += dt; if (P.trick.t >= P.trick.d) { addLine(P.trick.n, P.trick.p); P.trickEnd = clock; P.trick = null; } }
    else if (P.grab) { P.pending += dt * 260; P.grabT = (P.grabT || 0) + dt; if (P.grabT > .5 && !P.grabShown) { P.grabShown = true; addLine('GRAB', 100); } }
    if (seg.rail && Math.abs(P.x - seg.rail.x) < .22 && P.vz < 0 && prevAir >= C.railH - 10 && P.air < C.railH) {
      P.mode = 'grind'; P.air = C.railH; P.vz = 0; P.slide = false; P.trick && (P.trick = null); addLine('50-50', 150); shake = 4; }
    else if (P.air <= 0) land();
  } else if (P.mode === 'grind') {
    P.pending += dt * (P.slide ? 520 : 260);
    if (Math.floor(clock * 20) % 2) parts.push({ x: 0, y: 0, vx: (Math.random() - .5) * 260, vy: -Math.random() * 200, t: 0, life: .35, c: Math.random() < .5 ? PAL.yellow : PAL.red, spark: true });
    if (!seg.rail || Math.abs(P.x - seg.rail.x) > .22) { P.mode = 'air'; P.vz = 200; if (P.slide) addLine('BOARDSLIDE', 250); }
  } else if (P.mode === 'ride') {
    P.groundT += dt; if (P.groundT > 1.1) bank(false);
  } else if (P.mode === 'bail') {
    P.bailT += dt; if (P.bailT > 1.3) { P.mode = 'ride'; P.pushT = 1.2; if (P.bails >= 3) end(false); }
  }

  // colisões e itens (segmentos atravessados neste quadro)
  for (let z = Math.floor(oldZ / C.segL); z <= Math.floor(newZ / C.segL); z++) {
    const s = segs[z]; if (!s) continue;
    for (const o of s.obs) {
      if (o.done || Math.abs(P.x - o.x) > .3) continue;
      o.done = true;
      if (o.k === 'rampa') { if (P.mode === 'ride') { ollie(C.kickV); shake = 6; } continue; }
      if (o.k === 'buraco') { if (P.mode === 'ride') bail('BURACO!'); continue; }
      if (P.mode !== 'grind' && P.air < o.h) bail('BATEU!');
    }
    if (s.rail && s.rail.first && P.mode === 'ride' && Math.abs(P.x - s.rail.x) < .22) bail();
    for (const it of s.items) {
      if (it.got || Math.abs(P.x - it.x) > (it.prod ? .42 : .3) || Math.abs(P.air - it.z) > (it.prod ? 420 : 230)) continue;
      it.got = true;
      if (it.prod) { P.prods[it.k] = true; flash = .25; shake = 8; hitstop = .08; P.glowT = .5; SFX.prod(); celebrate(40);
        flyers.push({ k: it.k, t: 0, x: ROBO.x, y: ROBO.y - ROBO.h * .6 }); popups.push(makePopup('COLLAB!', it.k.slice(2).toUpperCase(), 0, true));
        if (Object.keys(P.prods).length === 4) { dropT = 10; cv.classList.add('drop'); rate(1.06); popups.push(makePopup('DROP MODE', '×2 · 10s', 0, true)); } }
      else { P.coins++; P.score += dropT > 0 ? 100 : 50; SFX.coin(); P.glowT = Math.max(P.glowT, .15); celebrate(6, true); }
    }
  }
  if (P.pos >= trackLen - C.playerZ - C.segL * 3) end(true);

  // efeitos
  popups.forEach(p => p.t += dt); popups = popups.filter(p => p.t < p.life);
  parts.forEach(p => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += (p.conf ? 700 : 900) * dt; if (p.conf) p.vx *= .97; }); parts = parts.filter(p => p.t < p.life);
  shake = Math.max(0, shake - dt * 30); flash = Math.max(0, flash - dt); P.glowT = Math.max(0, P.glowT - dt);
  for (const f of flyers) { f.t += dt; if (f.t >= .55 && !P.shown[f.k]) { P.shown[f.k] = true; P.slotT[f.k] = .3; SFX.trick(); } }
  flyers = flyers.filter(f => f.t < .55); for (const k in P.slotT) P.slotT[k] = Math.max(0, P.slotT[k] - dt);
}
function celebrate(n, small) { const cols = [PAL.yellow, PAL.blue, PAL.red, PAL.paper];
  for (let i = 0; i < n; i++) { const ang = Math.random() * Math.PI * 2, v = (small ? 160 : 380) + Math.random() * 300;
    parts.push({ x: 0, y: -ROBO.h * .55, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 200, t: 0, life: small ? .4 : .9, c: cols[i % 4], conf: true, rot: Math.random() * 6 }); }
  if (!small) parts.push({ ring: true, t: 0, life: .45, x: 0, y: -ROBO.h * .55, vx: 0, vy: 0, c: PAL.yellow }); }
function land() {
  P.air = 0; P.vz = 0; P.grab = false; P.grabT = 0; P.grabShown = false;
  if (P.trick) {
    const pr = P.trick.t / P.trick.d;
    if (pr >= .5) { addLine(P.trick.n + ' SUJO', Math.round(P.trick.p * .5)); P.trick = null; } // quase completou: passa
    else { bail('CAIU NO ' + P.trick.n); return; }
  }
  const clean = P.mult > 0 && clock - P.trickEnd < .16;
  P.mode = 'ride'; P.landT = .16; P.groundT = 0; shake = Math.max(shake, 5); SFX.land();
  if (P.mult > 0) { hitstop = .05; bank(clean); }
  for (let i = 0; i < 8; i++) parts.push({ x: 0, y: 0, vx: (Math.random() - .5) * 420, vy: -Math.random() * 160, t: 0, life: .4, c: PAL.ink });
}
function bail(why) {
  if (P.mode === 'bail' || QS.has('god')) return;
  P.mode = 'bail'; P.bailT = 0; P.bails++; P.trick = null; P.air = 0; P.vz = 0; P.pending = 0; P.mult = 0;
  hitstop = .12; shake = 14; flash = .15;
  popups.push(makePopup(why || 'TOMBO', `${3 - P.bails} restando`, 0, true));
  if (navigator.vibrate) navigator.vibrate(180);
  rate(.5, 520); // disco freando na mão
}
function end(ok) { if (state !== 'play') return; bank(false); state = ok ? 'end' : 'over'; cv.classList.remove('drop'); }
const QS = new URLSearchParams(location.search);
if (QS.has('god')) window.__P = () => P;
function start() { ac(); reset(); state = 'play'; if (QS.has('z')) { P.pos = +QS.get('z') * C.segL; P.pushT = 0; P.speed = 5000; } MUS.currentTime = 0; rate(1); music(true); }

// ---------- render ----------
function project(p, camX, camY, camZ) {
  const X = p.x - camX, Y = p.y - camY, Z = p.z - camZ, sc = C.camD / Z;
  p.s.Z = Z; p.s.sc = sc; p.s.x = W / 2 + sc * X * F; p.s.y = HOR - sc * Y * F; p.s.w = sc * C.roadW * F;
}
function poly(c, ...pts) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]); ctx.closePath(); ctx.fill(); }

function skyColor() {
  const prog = P ? P.pos / C.segL : 0; let c = ACTS[0] ? ACTS[0].sky : PAL.yellow;
  for (const a of ACTS) if (prog >= a.from - 30) c = a.sky; return c;
}
function drawSky() {
  ctx.fillStyle = skyColor(); ctx.fillRect(0, 0, W, H);
  const night = P && P.pos / C.segL > (ACTS[4] ? ACTS[4].from - 30 : 1e9);
  if (!night) ctx.drawImage(SUN, W * .5 - 150 - skyX * 20 % 60, HOR - 330, 300, 300);
  else { ctx.fillStyle = PAL.paper; ctx.beginPath(); ctx.arc(W * .7, HOR - 220, 34, 0, 7); ctx.fill(); }
  const tile = (img, f, y, h) => { const w = img.width * (h / img.height), off = ((-skyX * f) % w + w) % w; for (let x = off - w; x < W; x += w) ctx.drawImage(img, x, y, w, h); };
  tile(SKY_FAR, 30, HOR - 150, 160);
  const sk = (night && SPR.obj['skyline-noite']) || (ACTS[3] && P && P.pos / C.segL > ACTS[3].from - 30 && SPR.obj['skyline-tarde']) || SPR.obj.skyline;
  if (sk) tile(sk[boilF], 60, HOR - 175, 180);
  else tile(SKY_NEAR, 60, HOR - 120, 140);
}

function drawWall(s, side, a, b, near) {
  const w = s[side]; if (!w) return;
  const sg = side === 'wallL' ? -1 : 1, base = 1.62;
  const xa = a.x + sg * a.w * base, xb = b.x + sg * b.w * base;
  const ha = w.b.h * a.sc * F, hb = w.b.h * b.sc * F;
  const ya = a.y, yb = b.y, ta = ya - ha, tb = yb - hb;
  const col = w.b.blue ? (sg < 0 ? PAL.blue : PAL.blue2) : (sg < 0 ? PAL.paper : PAL.paper2);
  poly(col, xa, ya, xa, ta, xb, tb, xb, yb);
  const P2 = (u, v) => [lerp(xa, xb, u), lerp(lerp(ya, ta, v), lerp(yb, tb, v), u)];
  ctx.strokeStyle = PAL.ink;
  // contorno de topo e quina do prédio
  ctx.lineWidth = Math.max(1, a.sc * F * 14); ctx.beginPath(); ctx.moveTo(xa, ta); ctx.lineTo(xb, tb); ctx.stroke();
  if (w.k === 0) { ctx.beginPath(); ctx.moveTo(xb, yb); ctx.lineTo(xb, tb); ctx.stroke(); }
  if (w.k === w.len - 1) { ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xa, ta); ctx.stroke(); }
  if (!near) return;
  if (w.b.mural) { const t = muralT(s, side, w); if (t) { ctx.save(); ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xa, ta); ctx.lineTo(xb, tb); ctx.lineTo(xb, yb); ctx.closePath(); ctx.clip();
    ctx.transform(...t); ctx.drawImage(MURAL[w.b.mural], 0, 0); ctx.restore(); } }
  // porta de aço
  if (w.b.shutter) { const [x1, y1] = P2(0, .0), [x2, y2] = P2(1, 0);
    const v1 = 1100 / w.b.h; const [x3, y3] = P2(1, v1), [x4, y4] = P2(0, v1);
    poly(w.b.blue ? PAL.paper3 : PAL.blue, x1, y1, x2, y2, x3, y3, x4, y4);
    ctx.lineWidth = Math.max(.6, a.sc * F * 5);
    for (let v = .1; v < 1; v += .2) { const [p1x, p1y] = P2(0, v * v1), [p2x, p2y] = P2(1, v * v1); ctx.beginPath(); ctx.moveTo(p1x, p1y); ctx.lineTo(p2x, p2y); ctx.stroke(); } }
  // janelas
  ctx.fillStyle = PAL.ink;
  for (let v = 1600 / w.b.h; v < .92; v += 900 / w.b.h) {
    const [x1, y1] = P2(.25, v), [x2, y2] = P2(.7, v), [x3, y3] = P2(.7, v + 380 / w.b.h), [x4, y4] = P2(.25, v + 380 / w.b.h);
    poly(PAL.ink, x1, y1, x2, y2, x3, y3, x4, y4); }
  // pixação: letras altas e angulosas, com tremida a 8 fps
  ctx.lineWidth = Math.max(1, a.sc * F * 7); ctx.lineCap = 'round';
  for (const t of w.tags) { const r = rng(t.seed + boilF); ctx.strokeStyle = t.red ? PAL.red : PAL.ink; ctx.beginPath();
    const n = 4; for (let q = 0; q < n; q++) { const u0 = t.u + (q / n) * t.w, u1 = u0 + t.w / n * .7;
      const [ax, ay] = P2(u0, t.v), [bx, by] = P2(u0 + (r() - .5) * .02, t.v + t.hh), [cx, cy] = P2(u1, t.v + t.hh * (.6 + r() * .4)), [dx, dy] = P2(u1, t.v);
      ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx, cy); ctx.lineTo(dx, dy); }
    ctx.stroke(); }
}

function drawSegment(s, n) {
  const a = s.p1.s, b = s.p2.s;
  const visible = b.y < a.y;
  if (visible) {
    // calçada (até a parede) e chão além
    if (s.env === 'elevado') {
      ctx.fillStyle = s.color ? PAL.blue2 : '#26407A'; ctx.fillRect(0, b.y, W, a.y - b.y + 1);
      poly(s.color ? PAL.paper : PAL.paper2, a.x - a.w * 1.4, a.y, a.x + a.w * 1.4, a.y, b.x + b.w * 1.4, b.y, b.x - b.w * 1.4, b.y);
    } else if (s.env === 'praca') {
      ctx.fillStyle = Math.floor(s.i / 2) % 2 ? PAL.paper : '#EADFC6'; ctx.fillRect(0, b.y, W, a.y - b.y + 1);
    } else { ctx.fillStyle = s.via ? PAL.paper3 : (s.color ? PAL.paper : PAL.paper2); ctx.fillRect(0, b.y, W, a.y - b.y + 1); }
    const rw = 1.1;
    poly(s.color ? PAL.yellow : PAL.ink, a.x - a.w * rw, a.y, a.x - a.w, a.y, b.x - b.w, b.y, b.x - b.w * rw, b.y);
    poly(s.color ? PAL.yellow : PAL.ink, a.x + a.w * rw, a.y, a.x + a.w, a.y, b.x + b.w, b.y, b.x + b.w * rw, b.y);
    poly(s.via ? PAL.blue2 : (s.color ? PAL.blue : '#3253A0'), a.x - a.w, a.y, a.x + a.w, a.y, b.x + b.w, b.y, b.x - b.w, b.y);
    if (s.color) for (const l of [-1 / 3, 1 / 3]) { const la = a.w * .025, lb = b.w * .025;
      poly(PAL.paper, a.x + a.w * l * 1 - la, a.y, a.x + a.w * l + la, a.y, b.x + b.w * l + lb, b.y, b.x + b.w * l - lb, b.y); }
    if (s.text) drawRoadText(s, a);
  }
  if (s.env === 'elevado') for (const sg of [-1, 1]) { // mureta do elevado
    const xa = a.x + sg * a.w * 1.4, xb = b.x + sg * b.w * 1.4, ha = 230 * a.sc * F, hb = 230 * b.sc * F;
    poly(sg < 0 ? PAL.paper3 : '#C9BD9F', xa, a.y, xa, a.y - ha, xb, b.y - hb, xb, b.y);
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1, a.sc * F * 12); ctx.beginPath(); ctx.moveTo(xa, a.y - ha); ctx.lineTo(xb, b.y - hb); ctx.stroke();
    if (s.i % 3 === 0) { ctx.lineWidth = Math.max(1, a.sc * F * 5); ctx.beginPath(); ctx.moveTo(xa, a.y); ctx.lineTo(xa, a.y - ha); ctx.stroke(); } }
  drawWall(s, 'wallL', a, b, n < 110); drawWall(s, 'wallR', a, b, n < 110);
  if (s.via === 'front') drawViaduct(s, a);
  if (s.rail) drawRail(s, a, b);
  for (const p of s.spr) drawSprite(SPR.obj[p.k], a, p.x, p.hw, 0, p.flip, p);
  for (const o of s.obs) if (!(o.k === 'rampa' && false)) drawSprite(SPR.obj[o.k], a, o.x, { cone: 230, cavalete: 270, carrinho: 320, caixotes: 340, rampa: 300, buraco: 130 }[o.k], 0);
  for (const it of s.items) if (!it.got) {
    const bob = Math.sin(clock * 5 + s.i) * 18;
    if (it.prod) { const h = 340 * a.sc * F, sx = a.x + a.sc * it.x * C.roadW * F, sy = a.y - (it.z + bob) * a.sc * F - h / 2;
      if (h > 3) burst(sx, sy, h * (.95 + Math.sin(clock * 6) * .08), clock * .8);
      drawSprite(SPR.obj[it.k] || PROD[it.k], a, it.x, 340, it.z + bob, false, null, true);
      if (h > 3) sparkles(sx, sy, h * .75, s.i); }
    else { drawSprite(COIN, a, it.x, 120, it.z + bob * .5, false, null, true);
      if ((s.i + Math.floor(clock * 4)) % 5 === 0) { const h = 120 * a.sc * F; if (h > 6) sparkles(a.x + a.sc * it.x * C.roadW * F, a.y - (it.z + bob * .5) * a.sc * F - h * .6, h * .5, s.i); } }
  }
}
function star(x, y, r, n, rot) { ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const rr = i % 2 ? r * .55 : r, a = rot + i * Math.PI / n; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath(); }
function burst(x, y, r, rot) { // explosão de zine atrás do produto
  ctx.save(); ctx.globalAlpha = .9; ctx.fillStyle = PAL.ink; star(x + r * .04, y + r * .04, r * .78, 12, rot); ctx.fill();
  ctx.fillStyle = Math.floor(clock * 8) % 2 ? PAL.yellow : '#FFE27A'; star(x, y, r * .74, 12, rot); ctx.fill();
  ctx.fillStyle = PAL.paper; star(x, y, r * .42, 8, -rot * 1.5); ctx.fill(); ctx.restore(); }
function sparkles(x, y, r, seed) { const rr = rng(seed * 7 + Math.floor(clock * 8)); ctx.fillStyle = PAL.paper; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5;
  for (let i = 0; i < 4; i++) { const a = rr() * 7, d = r * (.55 + rr() * .5), s = r * (.06 + rr() * .07), px = x + Math.cos(a) * d, py = y + Math.sin(a) * d;
    ctx.beginPath(); ctx.moveTo(px, py - s * 2); ctx.lineTo(px + s * .45, py - s * .45); ctx.lineTo(px + s * 2, py); ctx.lineTo(px + s * .45, py + s * .45); ctx.lineTo(px, py + s * 2);
    ctx.lineTo(px - s * .45, py + s * .45); ctx.lineTo(px - s * 2, py); ctx.lineTo(px - s * .45, py - s * .45); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
const poleTops = { '-1': null, '1': null };
function drawSprite(v, a, x, hw, z, flip, meta, shadow) {
  if (!v) return; const img = v[boilF] || v;
  const h = hw * a.sc * F; if (h < 2) return;
  const w = h * img.width / img.height;
  const sx = a.x + a.sc * x * C.roadW * F, sy = a.y - z * a.sc * F;
  if (shadow && z > 30) { ctx.fillStyle = 'rgba(17,17,17,.22)'; ctx.beginPath(); ctx.ellipse(sx, a.y, w * .35, w * .08, 0, 0, 7); ctx.fill(); }
  ctx.save(); ctx.translate(sx, sy); if (flip) ctx.scale(-1, 1);
  ctx.drawImage(img, -w / 2, -h, w, h); ctx.restore();
  if (meta && meta.pole) { // fiação entre postes do mesmo lado
    const top = [sx, sy - h * .93], prev = poleTops[meta.side];
    if (prev) { ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.4;
      for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(top[0], top[1] + k * h * .03); ctx.quadraticCurveTo((top[0] + prev[0]) / 2, Math.max(top[1], prev[1]) + 30 + k * 8, prev[0], prev[1] + k * 3); ctx.stroke(); } }
    poleTops[meta.side] = top;
  }
}
function drawRail(s, a, b) {
  const xa = a.x + a.sc * s.rail.x * C.roadW * F, xb = b.x + b.sc * s.rail.x * C.roadW * F;
  const ya = a.y - C.railH * a.sc * F, yb = b.y - C.railH * b.sc * F;
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(2, a.sc * F * 50); ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke();
  ctx.strokeStyle = PAL.paper; ctx.lineWidth = Math.max(1, a.sc * F * 18); ctx.beginPath(); ctx.moveTo(xa, ya - a.sc * F * 12); ctx.lineTo(xb, yb - b.sc * F * 12); ctx.stroke();
  if (s.i % 4 === 0 || s.rail.first || s.rail.last) { ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.5, a.sc * F * 34); ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xa, a.y); ctx.stroke(); }
}
function drawViaduct(s, a) {
  const k = a.sc * F, xl = a.x - a.w * 1.62, xr = a.x + a.w * 1.62;
  if (SPR.obj.viaduto) { // arte gerada: viga em cima (~38% da altura), pilares embaixo
    const im = SPR.obj.viaduto[boilF], w = (xr - xl) * 1.45, h = w * im.height / im.width;
    ctx.drawImage(im, a.x - w / 2, a.y - h, w, h);
    const bt = a.y - h + h * .06, bb = a.y - h + h * .36, fs = (bb - bt) * .7;
    ctx.save(); ctx.translate(a.x, (bt + bb) / 2); ctx.rotate(-.025);
    ctx.font = `${fs}px "Sedgwick Ave Display"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = fs * .12; ctx.strokeStyle = PAL.yellow; ctx.strokeText('DROP DEAD 35', 0, 0);
    ctx.fillStyle = PAL.ink; ctx.fillText('DROP DEAD 35', 0, 0);
    ctx.font = `${fs * .4}px "Permanent Marker"`; ctx.fillStyle = PAL.red; ctx.fillText('× PCYES', w * .3, fs * .5); ctx.restore();
    return;
  }
  const yb = a.y - 1900 * k, yt = a.y - 2700 * k;
  ctx.fillStyle = PAL.paper3; ctx.fillRect(xl, yt, xr - xl, yb - yt);
  ctx.fillStyle = PAL.paper2; ctx.fillRect(xl - 300 * k, yb, 300 * k, a.y - yb); ctx.fillRect(xr, yb, 300 * k, a.y - yb);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.5, 16 * k);
  ctx.strokeRect(xl, yt, xr - xl, yb - yt); ctx.strokeRect(xl - 300 * k, yb, 300 * k, a.y - yb); ctx.strokeRect(xr, yb, 300 * k, a.y - yb);
  ctx.beginPath(); ctx.moveTo(xl, yt - 160 * k); ctx.lineTo(xr, yt - 160 * k); ctx.stroke();
  for (let x = xl; x < xr; x += 120 * k) { ctx.beginPath(); ctx.moveTo(x, yt); ctx.lineTo(x, yt - 160 * k); ctx.stroke(); }
  const fs = (yb - yt) * .62; ctx.save(); ctx.translate((xl + xr) / 2, (yt + yb) / 2 + fs * .05); ctx.rotate(-.03);
  ctx.font = `${fs}px "Sedgwick Ave Display"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineWidth = fs * .12; ctx.strokeStyle = PAL.yellow; ctx.strokeText('DROP DEAD 35', 0, 0);
  ctx.fillStyle = PAL.ink; ctx.fillText('DROP DEAD 35', 0, 0);
  ctx.font = `${fs * .38}px "Permanent Marker"`; ctx.fillStyle = PAL.red; ctx.fillText('× PCYES', (xr - xl) * .3, fs * .55); ctx.restore();
}
function drawRoadText(s, a) {
  const k = a.sc * F; if (k < .02) return;
  ctx.save(); ctx.translate(a.x, a.y - 30 * k); ctx.scale(1, .38);
  ctx.font = `${560 * k}px "Sedgwick Ave Display"`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
  ctx.fillStyle = PAL.paper; ctx.fillText(s.text, 0, 0); ctx.restore();
}

// ---- robô + shape ----
function roboFrame() {
  const f8 = Math.floor(clock * 8);
  if (P.mode === 'bail') return 'tombo' + clamp(1 + Math.floor(P.bailT * 6), 1, 6);
  if (P.mode === 'grind') return P.slide ? 'slide' + (1 + f8 % 2) : 'grind' + (1 + f8 % 3);
  if (P.mode === 'air') {
    if (P.takeoff > 0) return SPR.robo['lado-agachado'] ? 'lado-agachado' : 'ollie2';
    if (P.trick && P.trick.yaw === 2) return 'ollie3';
    if (P.grab) return 'grab';
    if (P.vz > 900) return 'ollie3'; if (P.vz > 200) return 'ollie4'; if (P.vz > -500) return 'ollie5'; return 'ollie4';
  }
  const L = SPR.robo.lado1; // postura de lado (v2), se existir
  if (P.landT > 0) return L ? 'lado-aterrissa' : 'ollie6';
  if (P.curvaT > 0) return L ? 'lado-curva' : 'curva';
  if (P.pushT > 0) return L ? (f8 % 4 < 2 ? 'lado-remada' : 'lado1') : 'remada' + (1 + f8 % 4);
  if (L) return Math.floor(clock * 4) % 2 ? 'lado2' : 'lado1';
  return f8 % 6 === 0 ? 'rolando' : 'rolando2';
}
function drawBoard(cx, cy, bw, t) {
  // t: {roll, yaw} já em degraus
  const roll = t.roll, yaw = t.yaw;
  const sideness = Math.abs(Math.sin(yaw));
  const bottom = Math.cos(roll) < 0;
  const back = SPR.skate[bottom ? 'tras-fundo' : 'tras-lixa'], side = SPR.skate.lateral;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(roll + (bottom ? Math.PI : 0));
  if (sideness > .5 && side) { const im = side[boilF], w = bw * 2.4, h = w * im.height / im.width; ctx.drawImage(im, -w / 2, -h * .5, w, h); }
  else if (back) { const im = back[boilF], w = bw * (1 - sideness * .4), h = w * im.height / im.width * .55; ctx.drawImage(im, -w / 2, -h * .62, w, h); }
  ctx.restore();
}
function drawPlayer() {
  const pk = 1 / C.camH;                    // escala na profundidade do jogador
  const feetY = HOR + C.camH * pk * F - 6;  // onde a rua encontra o jogador
  const px = W / 2 + (P.x - P.x * .6) * C.roadW * pk * F;
  const name = roboFrame(), v = SPR.robo[name] || SPR.robo.rolando2; if (!v) return;
  const img = v[boilF], RH = H * .34 * (img.height - 8) / 300, RW = RH * img.width / img.height;
  const lift = P.air * pk * F;
  const sh = shake ? [(Math.random() - .5) * shake, (Math.random() - .5) * shake] : [0, 0];
  ctx.save(); ctx.translate(sh[0], sh[1]);
  // sombra
  ctx.fillStyle = 'rgba(17,17,17,.28)'; ctx.beginPath(); ctx.ellipse(px, feetY + 4, RW * .42 * (1 - Math.min(.6, lift / 400)), 9, 0, 0, 7); ctx.fill();
  // shape
  if (P.mode !== 'bail' || P.bailT < .15) {
    let roll = 0, yaw = P.mode === 'grind' && P.slide ? Math.PI / 2 : 0, gap = 0;
    if (P.trick) { const p = Math.floor(P.trick.t * 12) / Math.max(1, Math.round(P.trick.d * 12)); // degraus a 12 fps
      roll = P.trick.roll * p * Math.PI * 2; yaw = P.trick.yaw * p * Math.PI; gap = Math.sin(p * Math.PI) * RH * .12; }
    const bw = RW * (name.startsWith('slide') ? .5 : .62);
    drawBoard(px, feetY - lift + gap, bw, { roll, yaw });
  }
  // robô
  ctx.translate(px, feetY - lift - 4);
  if ((name === 'curva' || name === 'lado-curva') && P.curvaDir < 0) ctx.scale(-1, 1);
  ctx.drawImage(img, -RW / 2, -RH, RW, RH);
  if (P.glowT > 0) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, P.glowT * 2.2); ctx.drawImage(img, -RW / 2, -RH, RW, RH);
    ctx.globalAlpha = Math.min(1, P.glowT * 1.2); ctx.drawImage(img, -RW / 2, -RH, RW, RH); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
  ctx.restore();
  ROBO.x = px; ROBO.y = feetY - lift; ROBO.h = RH;
  // faíscas / poeira
  for (const p of parts) { ctx.strokeStyle = p.c; ctx.fillStyle = p.c; ctx.globalAlpha = 1 - p.t / p.life;
    if (p.spark) { ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(px + p.x, feetY - lift + p.y); ctx.lineTo(px + p.x - p.vx * .03, feetY - lift + p.y - p.vy * .03); ctx.stroke(); }
    else if (p.conf) { ctx.save(); ctx.translate(px + p.x, feetY - lift + p.y); ctx.rotate(p.rot + p.t * 12); ctx.fillRect(-5, -3, 10, 6); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1; ctx.strokeRect(-5, -3, 10, 6); ctx.restore(); }
    else if (p.ring) { const r = 20 + p.t * 420; ctx.lineWidth = 10 * (1 - p.t / p.life); ctx.strokeStyle = PAL.yellow; ctx.beginPath(); ctx.arc(px + p.x, feetY - lift + p.y, r, 0, 7); ctx.stroke();
      ctx.lineWidth = 3 * (1 - p.t / p.life); ctx.strokeStyle = PAL.ink; ctx.beginPath(); ctx.arc(px + p.x, feetY - lift + p.y, r + 8, 0, 7); ctx.stroke(); }
    else ctx.fillRect(px + p.x, feetY + p.y, 4, 4); }
  ctx.globalAlpha = 1;
}

function drawSpeedLines() {
  const k = (P.speed - C.minSpeed) / (C.maxSpeed - C.minSpeed); if (k < .55) return;
  const r = rng(Math.floor(clock * 12)); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.globalAlpha = (k - .55) * 1.2;
  for (let i = 0; i < 10; i++) { const ang = r() * Math.PI * 2, r0 = Math.max(W, H) * (.45 + r() * .1), r1 = r0 + 60 + r() * 120;
    ctx.beginPath(); ctx.moveTo(W / 2 + Math.cos(ang) * r0, HOR + Math.sin(ang) * r0); ctx.lineTo(W / 2 + Math.cos(ang) * r1, HOR + Math.sin(ang) * r1); ctx.stroke(); }
  ctx.globalAlpha = 1;
}
function drawHUD() {
  ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  chip(String(P.score).padStart(6, '0'), '34px Graduate', 110, 38, PAL.paper, PAL.ink, -.03, 12, 5);
  chip(`${P.coins} PC POINTS`, '15px Graduate', 84, 86, PAL.yellow, PAL.ink, .02, 8, 3);
  ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  if (P.mult > 0) { ctx.textAlign = 'right'; ctx.font = '30px "Permanent Marker"'; ctx.fillStyle = PAL.red; ctx.strokeStyle = PAL.paper; ctx.lineWidth = 6;
    const t = `LINHA ×${P.mult}  ${Math.round(P.pending)}`; ctx.strokeText(t, W - 18, 16); ctx.fillText(t, W - 18, 16); }
  // tombos
  ctx.textAlign = 'right'; ctx.font = '26px "Rubik Spray Paint"'; ctx.fillStyle = PAL.red; ctx.fillText('✕'.repeat(P.bails) + '○'.repeat(Math.max(0, 3 - P.bails)), W - 18, 54);
  // produtos
  const ks = ['p-shape', 'p-meia', 'p-teclado', 'p-mouse'], sz = 54, gap = 12, x0 = W / 2 - (sz * 4 + gap * 3) / 2, y0 = H - sz - 14;
  ks.forEach((k, i) => { const x = x0 + i * (sz + gap);
    if (P.shown[k]) { const v = SPR.obj[k] || PROD[k]; const im = v[boilF], bump = 1 + (P.slotT[k] || 0) * 1.6; ctx.save(); ctx.translate(x + sz / 2, y0 + sz / 2); ctx.rotate((i - 1.5) * .08); ctx.scale(bump, bump); const f = sz / Math.max(im.width, im.height); ctx.drawImage(im, -im.width * f / 2, -im.height * f / 2, im.width * f, im.height * f); ctx.restore(); }
    else { ctx.setLineDash([5, 5]); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.strokeRect(x, y0, sz, sz); ctx.setLineDash([]); } });
  for (const f of flyers) { const i = ks.indexOf(f.k), tx = x0 + i * (sz + gap) + sz / 2, ty = y0 + sz / 2, t = f.t / .55, e = 1 - Math.pow(1 - t, 3);
    const x = lerp(f.x, tx, e), y = lerp(f.y, ty, e) - Math.sin(t * Math.PI) * 120, sc = lerp(2.4, 1, e), v = SPR.obj[f.k] || PROD[f.k], im = v[boilF], m = sz * sc / Math.max(im.width, im.height);
    ctx.save(); ctx.translate(x, y); ctx.rotate(t * Math.PI * 2); ctx.drawImage(im, -im.width * m / 2, -im.height * m / 2, im.width * m, im.height * m); ctx.restore(); }
  // ato
  const prog = P.pos / C.segL; const at = [...ACTS].reverse().find(a => prog >= a.from);
  if (at && prog - at.from < 70) { const al = Math.min(1, (70 - (prog - at.from)) / 20); ctx.globalAlpha = al; ctx.textAlign = 'center';
    ctx.font = '64px "Rubik Spray Paint"'; ctx.fillStyle = PAL.ink; ctx.fillText(at.nome, W / 2, H * .13); ctx.globalAlpha = 1; }
  // pop-ups
  for (const p of popups) { const t = p.t, s = t < .08 ? 1.6 - t / .08 * .6 : 1, a = t > p.life - .3 ? (p.life - t) / .3 : 1;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(p.x, p.y - Math.max(0, t - .5) * 60); ctx.scale(s, s);
    ctx.drawImage(p.can, -p.can.width / 2, -p.can.height / 2); ctx.restore(); }
}
function drawScreen(title, lines) {
  ctx.fillStyle = 'rgba(243,238,226,.9)'; ctx.fillRect(0, 0, W, H);
  ctx.drawImage(SUN, W / 2 - 160, H * .12, 320, 320);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `${Math.min(92, W / 6)}px "Sedgwick Ave Display"`; ctx.lineWidth = 10; ctx.strokeStyle = PAL.yellow; ctx.strokeText(title, W / 2, H * .3); ctx.fillStyle = PAL.ink; ctx.fillText(title, W / 2, H * .3);
  lines.forEach((l, i) => { ctx.font = i === 0 ? '30px Graduate' : '22px "Permanent Marker"'; ctx.fillStyle = i === 0 ? PAL.red : PAL.ink; ctx.fillText(l, W / 2, H * .46 + i * 40); });
}
// ---------- telas (título / fim) ----------
function chip(t, font, x, y, bg, fg, rot = 0, pad = 14, shadow = 5) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const m = ctx.measureText(t), w = m.width + pad * 2, h = (parseInt(font.match(/(\d+)px/)[1]) * 1.25) + pad;
  ctx.fillStyle = PAL.ink; ctx.fillRect(-w / 2 + shadow, -h / 2 + shadow, w, h);
  ctx.fillStyle = bg; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = fg; ctx.fillText(t, 0, 2); ctx.restore(); return w;
}
function tape(x, y, w, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(236,226,196,.88)'; ctx.fillRect(-w / 2, -11, w, 22);
  ctx.strokeStyle = 'rgba(17,17,17,.25)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(-w / 2, -11); ctx.lineTo(-w / 2, 11); ctx.moveTo(w / 2, -11); ctx.lineTo(w / 2, 11); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
function keycap(x, y, w, label) { ctx.fillStyle = PAL.ink; ctx.fillRect(x + 3, y + 4, w, 34); ctx.fillStyle = '#fff'; ctx.fillRect(x, y, w, 34);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.strokeRect(x, y, w, 34); ctx.fillStyle = PAL.ink; ctx.font = '18px Graduate'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x + w / 2, y + 18); }
function cover(img) { const s = Math.max(W / img.width, H / img.height), w = img.width * s, h = img.height * s; ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h); }
function dropDeadMark(x, y, h) { // logo oficial se existir em sprites/ui/dropdead.webp; senão, marca provisória
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
function drawTitle() {
  const img = UI.keyart || UI.capa; if (img) cover(img); else { ctx.fillStyle = PAL.yellow; ctx.fillRect(0, 0, W, H); }
  ctx.fillStyle = UI.keyart ? 'rgba(17,17,17,.04)' : 'rgba(17,17,17,.18)'; ctx.fillRect(0, 0, W, H);
  const portrait = W < H * .9, cx = portrait ? W / 2 : W * .25, k = portrait ? .78 : .9;
  lockup(cx, H * .13, k);
  // título
  ctx.save(); ctx.translate(cx, H * .33); ctx.rotate(-.06); const fs = Math.min(120, W * (portrait ? .2 : .1));
  ctx.font = `${fs}px "Sedgwick Ave Display"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round'; ctx.lineWidth = fs * .22; ctx.strokeStyle = PAL.ink; ctx.strokeText('DROP LINE', 8, 8);
  ctx.lineWidth = fs * .16; ctx.strokeStyle = PAL.yellow; ctx.strokeText('DROP LINE', 0, 0); ctx.fillStyle = PAL.ink; ctx.fillText('DROP LINE', 0, 0); ctx.restore();
  chip('35 ANOS DE DROP DEAD', `${Math.round(22 * k)}px Graduate`, cx, H * .45, PAL.blue, PAL.paper, .03);
  // botão
  const pulse = 1 + Math.sin(clock * 5) * .04; ctx.save(); ctx.translate(cx, H * .57); ctx.scale(pulse, pulse);
  chip(isTouch ? 'TOCA PRA JOGAR' : 'JOGAR ▶', `${Math.round(40 * k)}px Graduate`, 0, 0, PAL.yellow, PAL.ink, -.02, 26, 8); ctx.restore();
  if (!isTouch) chip('ou aperta ESPAÇO', '14px Graduate', cx, H * .57 + 58, PAL.ink, PAL.paper, 0, 8, 0);
  // cartão de controles
  const cw = portrait ? W - 40 : 330, ch = 190, cx2 = portrait ? 20 : cx - cw / 2, cy2 = H - ch - 28;
  ctx.save(); ctx.translate(cx2 + cw / 2, cy2 + ch / 2); ctx.rotate(.025); ctx.translate(-cw / 2, -ch / 2);
  ctx.fillStyle = PAL.ink; ctx.fillRect(6, 6, cw, ch); ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = PAL.red; ctx.font = '20px "Permanent Marker"'; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('COMO ANDAR', 18, 12);
  const rows = isTouch ? [['ARRASTA ↔', 'troca de faixa'], ['TOCA', 'pula'], ['ARRASTA NO AR', 'manobra'], ['SEGURA NO AR', 'grab']]
                       : [['← →', 'troca de faixa'], ['ESPAÇO', 'pula / segura = grab'], ['NO AR ← → ↑ ↓', 'manobras'], ['↓ NO CORRIMÃO', 'boardslide']];
  rows.forEach(([a, b], i) => { const y = 48 + i * 34; const kw = Math.max(46, a.length * 11 + 18); keycap(18, y, kw, a);
    ctx.fillStyle = PAL.ink; ctx.font = '15px Graduate'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(b, 30 + kw, y + 18); });
  ctx.restore(); tape(cx2 + cw / 2, cy2 - 4, 90, .06);
  chip(muted ? '♪ SOM DESLIGADO · M' : '♪ SOM LIGADO · M', '13px Graduate', 96, 24, PAL.ink, PAL.paper, 0, 8, 0);
}
function drawEnd() {
  const img = UI.keyart || UI.capa; if (img) cover(img); ctx.fillStyle = 'rgba(17,17,17,.55)'; ctx.fillRect(0, 0, W, H);
  const portrait = W < H * .9, cw = Math.min(W - 40, 460), ch = Math.min(H - 60, 600), x0 = W / 2 - cw / 2, y0 = H / 2 - ch / 2;
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(-.02); ctx.translate(-W / 2, -H / 2);
  ctx.fillStyle = PAL.ink; ctx.fillRect(x0 + 8, y0 + 8, cw, ch); ctx.fillStyle = PAL.paper; ctx.fillRect(x0, y0, cw, ch);
  ctx.fillStyle = PAL.yellow; ctx.fillRect(x0, y0, cw, 92); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(x0, y0, cw, ch);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.ink; ctx.font = '22px Graduate'; ctx.fillText(state === 'end' ? 'DROP LINE #35 · CHEGOU NA LOJA' : 'DROP LINE #35 · FIM DA LINHA', W / 2, y0 + 30);
  ctx.font = '44px "Sedgwick Ave Display"'; ctx.fillText(state === 'end' ? 'SESSÃO FECHADA' : 'TOMBOU FEIO', W / 2, y0 + 66);
  ctx.font = '86px Graduate'; ctx.fillText(String(P.score), W / 2, y0 + 170);
  ctx.font = '18px Graduate'; ctx.fillText(`PONTOS  ·  ${P.coins} PC POINTS`, W / 2, y0 + 222);
  // carimbo da nota
  ctx.save(); ctx.translate(W / 2, y0 + 300); ctx.rotate(-.12); ctx.strokeStyle = PAL.red; ctx.lineWidth = 6; ctx.font = '50px "Rubik Spray Paint"';
  const n = nota(P.score), nw = ctx.measureText(n).width + 40; ctx.strokeRect(-nw / 2, -36, nw, 72); ctx.fillStyle = PAL.red; ctx.fillText(n, 0, 2); ctx.restore();
  // produtos pegos
  const ks = ['p-shape', 'p-meia', 'p-teclado', 'p-mouse'], sz = 70, gx = W / 2 - (sz * 4 + 30) / 2;
  ks.forEach((k, i) => { const x = gx + i * (sz + 10), y = y0 + 380; const v = SPR.obj[k] || PROD[k];
    if (P.prods[k] && v) { const im = v[0], f = sz / Math.max(im.width, im.height); ctx.drawImage(im, x + (sz - im.width * f) / 2, y + (sz - im.height * f) / 2, im.width * f, im.height * f); }
    else { ctx.setLineDash([5, 5]); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(x, y, sz, sz); ctx.setLineDash([]); } });
  ctx.font = '15px Graduate'; ctx.fillStyle = PAL.ink; ctx.fillText(`${Object.keys(P.prods).length}/4 PRODUTOS DA COLLAB`, W / 2, y0 + 470);
  ctx.restore();
  const pulse = 1 + Math.sin(clock * 5) * .04; ctx.save(); ctx.translate(W / 2, y0 + ch - 50); ctx.scale(pulse, pulse);
  chip(isTouch ? 'TOCA PRA IR DE NOVO' : 'DE NOVO ▶', '30px Graduate', 0, 0, PAL.yellow, PAL.ink, .02, 22, 7); ctx.restore();
}
function nota(s) { let n = NOTAS[0][1]; for (const [v, t] of NOTAS) if (s >= v) n = t; return n; }

function render() {
  if (!SUN || !NOISE) { ctx.fillStyle = PAL.yellow; ctx.fillRect(0, 0, W, H); ctx.fillStyle = PAL.ink; ctx.font = '28px Graduate'; ctx.textAlign = 'center'; ctx.fillText('CARREGANDO...', W / 2, H / 2); return; }
  frameNo++;
  ctx.save();
  if (shake && state === 'play') ctx.translate((Math.random() - .5) * shake * .5, (Math.random() - .5) * shake * .5);
  drawSky();
  if (P) {
    const pos = P.pos, base = segAt(pos), pct = (pos % C.segL) / C.segL;
    const ps = segAt(pos + C.playerZ), pp = ((pos + C.playerZ) % C.segL) / C.segL;
    const pY = lerp(ps.p1.y, ps.p2.y, pp), camX = P.x * .6 * C.roadW;
    let x = 0, dx = -(base.curve * pct);
    const vis = [];
    for (let n = 0; n < C.draw; n++) {
      const s = segs[base.i + n]; if (!s) break;
      project(s.p1, camX - x, pY + C.camH, pos); project(s.p2, camX - x - dx, pY + C.camH, pos);
      x += dx; dx += s.curve; s.f = frameNo;
      if (s.p1.s.Z <= C.camD) continue;
      vis.push([s, n]);
    }
    poleTops['-1'] = poleTops['1'] = null;
    for (let i = vis.length - 1; i >= 0; i--) drawSegment(vis[i][0], vis[i][1]);
    if (state === 'play') { drawSpeedLines(); drawPlayer(); }
  }
  ctx.restore();
  // xerox por cima de tudo
  ctx.globalAlpha = .35; ctx.globalCompositeOperation = 'multiply';
  const ox = (boilF * 83) % 256, oy = (boilF * 57) % 256;
  for (let y = -oy; y < H; y += 256) for (let x = -ox; x < W; x += 256) ctx.drawImage(NOISE, x, y);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (flash > 0) { ctx.fillStyle = `rgba(255,255,255,${flash * 3})`; ctx.fillRect(0, 0, W, H); }
  if (state === 'play') drawHUD();
  else if (state === 'title') drawTitle();
  else if (state === 'end' || state === 'over') drawEnd();
  else if (state === 'load') drawScreen('...', ['carregando']);
}

// ---------- loop ----------
let last = performance.now();
function frame(now) {
  const dt = Math.min(1 / 30, (now - last) / 1000); last = now;
  requestAnimationFrame(frame);
  try { update(dt); render(); } catch (e) { if (!frame.err) { frame.err = 1; console.error(e); } }
}
document.addEventListener('visibilitychange', () => { last = performance.now(); music(!document.hidden && state === 'play'); });

(async function boot() {
  resize(); addEventListener('resize', resize);
  requestAnimationFrame(frame);
  await Promise.all(['40px Graduate', '40px "Permanent Marker"', '40px "Rubik Spray Paint"', '40px "Sedgwick Ave Display"'].map(f => document.fonts.load(f).catch(() => {})));
  buildProcedural(); buildSkyline();
  await Promise.all([loadSet('robo', SPR.robo), loadSet('skate', SPR.skate), loadSet('obj', SPR.obj),
    ...['capa', 'pcyes', 'dropdead', 'keyart'].map(async n => { const i = await load(`sprites/ui/${n}.webp`); if (i) UI[n] = i; })]);
  buildMurals();
  reset(); state = 'title';
})();
})();
