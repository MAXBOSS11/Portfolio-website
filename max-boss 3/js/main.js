/* Max Boss – Portfolio · main.js (keine Bibliotheken) */
window.MB_OK = true;
(() => {
"use strict";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;
const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const L = o => o == null ? "" : typeof o === "string" ? o : `<span class="de">${o.de}</span><span class="en">${o.en ?? o.de}</span>`;
const isEN = () => root.dataset.lang === "en";
const fileName = s => { try { return decodeURI(s).split("/").pop(); } catch (e) { return s.split("/").pop(); } };
const stem = s => (s || "").replace(/\.[^.]+$/, "").toLowerCase();
const URL_ = s => encodeURI(s);
const P = typeof PROJEKTE !== "undefined" ? PROJEKTE : [];
const byKey = Object.fromEntries(P.map(p => [p.key, p]));
let dots = null;

/* ---------- 1. Sprache ---------- */
function applyLang(l) {
  root.dataset.lang = l; root.lang = l; store.set("lang", l);
  $$(".lang [data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
  const t = document.body.dataset[l === "en" ? "titleEn" : "titleDe"];
  if (t) document.title = t;
  $$("[data-ph-de]").forEach(el => { el.placeholder = el.dataset[l === "en" ? "phEn" : "phDe"]; });
  requestAnimationFrame(fitAll);
}
$$(".lang [data-lang]").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.lang)));

/* ---------- 2. Hell / Dunkel ---------- */
function applyTheme(t) {
  root.dataset.theme = t; store.set("theme", t);
  $$(".theme").forEach(b => b.setAttribute("aria-pressed", String(t === "dark")));
  const meta = $('meta[name="theme-color"]'); if (meta) meta.content = t === "dark" ? "#0d0d0d" : "#f4f4f2";
  if (dots) dots.recolor();
}
$$(".theme").forEach(b => b.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark")));

/* ---------- 3. Telefonnummer ausblenden, solange Platzhalter ---------- */
$$("[data-tel]").forEach(a => { if (/X/.test(a.textContent)) { const r = a.closest("[data-tel-row]"); if (r) r.hidden = true; } });

/* ---------- 4. Ordner auslesen ---------- */
const IMG_RE = /\.(jpe?g|png|webp|gif|avif)$/i;
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
const folderCache = {};
function listFolder(ordner) {
  if (!ordner) return Promise.resolve([]);
  if (folderCache[ordner]) return folderCache[ordner];
  return folderCache[ordner] = (async () => {
    if (location.protocol.startsWith("http")) {
      // a) Hostpoint: dateien.php
      try {
        const r = await fetch("dateien.php?ordner=" + encodeURIComponent(ordner), { cache: "no-store" });
        if (r.ok) {
          const j = JSON.parse(await r.text());
          if (Array.isArray(j) && j.length) return j.filter(f => IMG_RE.test(f)).sort(natural).map(f => `img/${ordner}/${f}`);
        }
      } catch (e) {}
      // b) Live Server: Ordner-Übersicht
      try {
        const r = await fetch(`img/${ordner}/`, { cache: "no-store" });
        if (r.ok) {
          const html = await r.text(), set = new Set();
          for (const m of html.matchAll(/href\s*=\s*["']([^"'#?]+)["']/gi)) {
            let n; try { n = decodeURIComponent(m[1].split("/").filter(Boolean).pop() || ""); } catch (e) { continue; }
            if (IMG_RE.test(n)) set.add(n);
          }
          if (set.size) return [...set].sort(natural).map(f => `img/${ordner}/${f}`);
        }
      } catch (e) {}
    }
    // c) Notfall-Liste aus data.js
    const b = (typeof BEKANNT !== "undefined" && BEKANNT[ordner]) || [];
    return b.map(f => `img/${ordner}/${f}`);
  })();
}
function captionFor(src) {
  if (typeof BILDTEXTE === "undefined") return null;
  const fn = fileName(src).toLowerCase();
  const k = Object.keys(BILDTEXTE).sort((a, b) => b.length - a.length).find(k => fn.startsWith(k.toLowerCase()));
  return k ? BILDTEXTE[k] : null;
}

/* ---------- 5. Einblenden + Zähler ---------- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  $$(".count", e.target).concat(e.target.matches(".count") ? [e.target] : []).forEach(countUp);
  io.unobserve(e.target);
}), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }) : null;
function observe(el) { io ? io.observe(el) : el.classList.add("in"); }
function countUp(el) {
  if (el.dataset.done) return; el.dataset.done = 1;
  const to = +el.dataset.to || 0, suf = el.dataset.suffix || "";
  if (REDUCE) { el.textContent = to + suf; return; }
  const t0 = performance.now(), D = 1500;
  (function step(now) {
    const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(to * e) + suf;
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
if (io) $$(".count").forEach(el => { el.textContent = "0" + (el.dataset.suffix || ""); });

/* ---------- 6. Schrift auf Breite einpassen ---------- */
function fitAll() {
  $$(".fit").forEach(sp => {
    const box = sp.parentElement, cs = getComputedStyle(box);
    sp.style.fontSize = "";
    const fs = parseFloat(getComputedStyle(sp).fontSize);
    const w = sp.getBoundingClientRect().width;
    const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (w > 0 && avail > 0) sp.style.fontSize = (fs * avail / w * 0.995) + "px";
  });
}
$$(".split").forEach(el => {
  const txt = el.textContent;
  el.innerHTML = [...txt].map((c, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("");
});
function rise() { $$(".big").forEach(b => b.classList.add("rise")); }

/* ---------- 7. Punkte im Hintergrund (weichen der Maus aus) ---------- */
function Dots() {
  const c = document.createElement("canvas");
  c.id = "dots"; c.setAttribute("aria-hidden", "true");
  document.body.prepend(c);
  const x = c.getContext("2d");
  const m = { x: -1e4, y: -1e4 }, GAP = 30, R = 120;
  let w = 0, h = 0, pts = [], col = "rgba(0,0,0,.15)", raf = 0;
  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = [];
    for (let yy = GAP / 2; yy < h; yy += GAP) for (let xx = GAP / 2; xx < w; xx += GAP) pts.push({ bx: xx, by: yy, x: xx, y: yy });
    kick();
  }
  function recolor() { col = getComputedStyle(root).getPropertyValue("--dot").trim() || col; kick(); }
  function frame() {
    raf = 0; x.clearRect(0, 0, w, h); x.fillStyle = col;
    let moving = false;
    for (const p of pts) {
      let tx = p.bx, ty = p.by;
      const dx = p.bx - m.x, dy = p.by - m.y, d2 = dx * dx + dy * dy;
      if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 26; tx += dx / d * f; ty += dy / d * f; }
      p.x += (tx - p.x) * 0.14; p.y += (ty - p.y) * 0.14;
      if (Math.abs(tx - p.x) > 0.05 || Math.abs(ty - p.y) > 0.05) moving = true;
      x.fillRect(p.x - 0.8, p.y - 0.8, 1.6, 1.6);
    }
    if (moving) kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  build(); recolor();
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 120); });
  if (FINE && !REDUCE) {
    addEventListener("pointermove", e => { m.x = e.clientX; m.y = e.clientY; kick(); }, { passive: true });
    document.addEventListener("pointerleave", () => { m.x = m.y = -1e4; kick(); });
  }
  return { recolor };
}

/* ---------- 8. Kacheln + Liste ---------- */
const VIEW = { de: "Ansehen", en: "View" };
function tileHTML(p) {
  const cover = p.videos
    ? `<video muted loop playsinline autoplay preload="metadata" src="${URL_(VIDEOS[0] || "")}" aria-hidden="true"></video>`
    : `<img src="${URL_(`img/${p.ordner}/${p.cover || ""}`)}" alt="" loading="lazy" decoding="async">`;
  return `<li class="slot io" data-key="${p.key}"><a class="tile" href="kategorie.html?k=${p.key}">
    <span class="tile-head"><span class="tile-name">${L(p.titel)}</span><span class="tile-desc">${L(p.kurz)}</span></span>
    <span class="tile-cover" data-fit="${p.fit || "cover"}">${cover}<span class="shine" aria-hidden="true"></span></span>
    <span class="tile-foot"><span>${L(p.kat)}</span><span class="tile-cta">${L(VIEW)} <i aria-hidden="true">↗</i></span></span>
  </a></li>`;
}
async function fixCover(img, p) {
  img.dataset.fixed = "1";
  const list = await listFolder(p.ordner);
  const s = stem(p.cover);
  const hit = list.find(f => stem(fileName(f)).startsWith(s)) || list[0];
  if (hit && URL_(hit) !== img.getAttribute("src")) img.src = URL_(hit);
  else img.closest(".tile-cover").classList.add("empty");
}
function initTiles(box) {
  box.innerHTML = P.map(tileHTML).join("");
  $$(".slot", box).forEach(slot => {
    const p = byKey[slot.dataset.key], tile = $(".tile", slot), cover = $(".tile-cover", slot);
    const img = $("img", cover), vid = $("video", cover);
    if (img) img.addEventListener("error", () => img.dataset.fixed ? cover.classList.add("empty") : fixCover(img, p));
    if (vid) { vid.addEventListener("error", () => cover.classList.add("empty")); vid.play && vid.play().catch(() => {}); }
    observe(slot);
    if (!FINE) return;
    let timer = null, hovering = false, orig = null;
    tile.addEventListener("pointermove", e => {
      const r = cover.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      cover.style.setProperty("--ry", (px * 7).toFixed(2) + "deg");
      cover.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg");
      cover.style.setProperty("--mx", ((px + 0.5) * 100).toFixed(1) + "%");
      cover.style.setProperty("--my", ((py + 0.5) * 100).toFixed(1) + "%");
    });
    tile.addEventListener("pointerenter", async () => {
      hovering = true;
      if (!img || REDUCE) return;
      orig = orig || img.getAttribute("src");
      const list = (await listFolder(p.ordner)).slice(0, 8).map(URL_);
      if (!hovering || list.length < 2) return;
      const ready = [orig];
list.forEach(s => { const im = new Image(); im.onload = () => { if (!ready.includes(s)) ready.push(s); }; im.src = s; });
let i = 0;
clearInterval(timer);
timer = setInterval(() => {
  if (!hovering || ready.length < 2) return;
  i = (i + 1) % ready.length;
  img.src = ready[i];
}, 900);

    });
    tile.addEventListener("pointerleave", () => {
      hovering = false; clearInterval(timer); timer = null;
      cover.style.setProperty("--rx", "0deg"); cover.style.setProperty("--ry", "0deg");
      if (img && orig) img.src = orig;
    });
  });
}
function initRows(box, skipKey) {
  const list = P.filter(p => p.key !== skipKey);
  box.innerHTML = list.map((p, i) => `<li class="io"><a class="row" href="kategorie.html?k=${p.key}" data-key="${p.key}">
    <span class="row-n">${String(i + 1).padStart(2, "0")}</span>
    <span class="row-t">${L(p.titel)}</span>
    <span class="row-d">${L(p.kurz)}</span>
    <span class="row-v">${L(VIEW)} →</span></a></li>`).join("");
  $$("li", box).forEach(observe);
  if (!FINE || REDUCE) return;
  let peek = $(".peek");
  if (!peek) { peek = document.createElement("img"); peek.className = "peek"; peek.alt = ""; peek.setAttribute("aria-hidden", "true"); document.body.append(peek); }
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const loop = () => { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; peek.style.left = cx + "px"; peek.style.top = cy + "px"; raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : 0; };
  $$(".row", box).forEach(a => {
    const p = byKey[a.dataset.key];
    if (p.videos) return;
    a.addEventListener("pointerenter", e => { peek.src = URL_(`img/${p.ordner}/${p.cover}`); cx = tx = e.clientX; cy = ty = e.clientY; peek.classList.add("on"); });
    a.addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
    a.addEventListener("pointerleave", () => peek.classList.remove("on"));
  });
}

/* ---------- 9. Lightbox (Bildtext erscheint nur hier) ---------- */
let lb = null, lbItems = [], lbI = 0, lbBack = null;
function buildLB() {
  lb = document.createElement("div");
  lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Bild");
  lb.innerHTML = `<button type="button" class="pill icon lb-x" aria-label="Schliessen">✕</button>
    <button type="button" class="pill icon lb-prev" aria-label="Zurück">←</button>
    <figure class="lb-fig"><img alt=""><figcaption class="lb-cap" hidden></figcaption></figure>
    <button type="button" class="pill icon lb-next" aria-label="Weiter">→</button>
    <span class="lb-n label"></span>`;
  document.body.append(lb);
  $(".lb-x", lb).addEventListener("click", closeLB);
  $(".lb-prev", lb).addEventListener("click", () => showLB(lbI - 1));
  $(".lb-next", lb).addEventListener("click", () => showLB(lbI + 1));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb-fig")) closeLB(); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowRight") showLB(lbI + 1);
    if (e.key === "ArrowLeft") showLB(lbI - 1);
  });
  let sx = null;
  lb.addEventListener("pointerdown", e => { sx = e.clientX; });
  lb.addEventListener("pointerup", e => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) showLB(lbI + (dx < 0 ? 1 : -1)); });
}
function openLB(items, start) {
  if (!lb) buildLB();
  lbItems = items; lbBack = document.activeElement;
  showLB(items.indexOf(start));
  lb.classList.add("open"); document.body.classList.add("noscroll");
  $(".lb-x", lb).focus();
}
function showLB(i) {
  if (!lbItems.length) return;
  lbI = (i + lbItems.length) % lbItems.length;
  const src = lbItems[lbI].dataset.src, img = $(".lb-fig img", lb), cap = $(".lb-cap", lb), c = captionFor(src);
  img.src = URL_(src); img.alt = $("img", lbItems[lbI]).alt;
  cap.innerHTML = c ? L(c) : ""; cap.hidden = !c;
  $(".lb-n", lb).textContent = String(lbI + 1).padStart(2, "0") + " / " + String(lbItems.length).padStart(2, "0");
  const multi = lbItems.length > 1;
  $(".lb-prev", lb).hidden = !multi; $(".lb-next", lb).hidden = !multi;
}
function closeLB() { lb.classList.remove("open"); document.body.classList.remove("noscroll"); if (lbBack) lbBack.focus(); }

/* ---------- 10. Kategorie-Seite ---------- */
function dhash(img) {
  const c = document.createElement("canvas"); c.width = 9; c.height = 8;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0, 9, 8);
  const d = x.getImageData(0, 0, 9, 8).data, g = i => d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114;
  const bits = []; let r = 0, gg = 0, b = 0;
  for (let i = 0; i < 72; i++) { r += d[i * 4]; gg += d[i * 4 + 1]; b += d[i * 4 + 2]; }
  for (let y = 0; y < 8; y++) for (let xx = 0; xx < 8; xx++) bits.push(g(y * 9 + xx) > g(y * 9 + xx + 1) ? 1 : 0);
  return { bits, col: [r / 72, gg / 72, b / 72], ar: img.naturalWidth / img.naturalHeight };
}
function sameImage(a, b) {
  const ham = a.bits.reduce((s, v, i) => s + (v !== b.bits[i]), 0);
  const dc = Math.hypot(a.col[0] - b.col[0], a.col[1] - b.col[1], a.col[2] - b.col[2]);
  return ham <= 4 && dc < 14 && Math.abs(a.ar - b.ar) < 0.03;
}
async function initCategory() {
  const k = new URLSearchParams(location.search).get("k"), p = byKey[k];
  if (!p) { location.replace("projekte.html"); return; }
  $("#cat-label").innerHTML = L(p.kat);
  $("#cat-title").innerHTML = L(p.titel);
  $("#cat-text").innerHTML = `<div class="de">${p.text.de.map(t => `<p>${t}</p>`).join("")}</div><div class="en">${p.text.en.map(t => `<p>${t}</p>`).join("")}</div>`;
  document.body.dataset.titleDe = `${p.titel.de} – Max Boss`;
  document.body.dataset.titleEn = `${p.titel.en} – Max Boss`;
  applyLang(root.dataset.lang);
  const box = $("#gallery");
  if (p.videos) {
    $("#cat-hint").hidden = true;
    box.className = "vids";
    VIDEOS.forEach(src => {
      const v = document.createElement("video");
      v.src = URL_(src); v.controls = true; v.playsInline = true; v.preload = "metadata"; v.className = "io";
      v.addEventListener("error", () => v.remove());
      box.append(v); observe(v);
    });
    if (!VIDEOS.length) $("#cat-empty").hidden = false;
    return;
  }
  let list = await listFolder(p.ordner);
  const ci = list.findIndex(f => stem(fileName(f)).startsWith(stem(p.cover)));
  if (ci > 0) list.unshift(list.splice(ci, 1)[0]);
  if (!list.length) { $("#cat-empty").hidden = false; $("#cat-hint").hidden = true; return; }
  const seen = [];
  list.forEach((src, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "g-item io"; b.dataset.src = src;
    const c = captionFor(src);
    const img = new Image();
    img.alt = c ? c.de : `${p.titel.de} – Foto von Max Boss`;
    img.decoding = "async"; img.loading = i < 6 ? "eager" : "lazy";
    img.addEventListener("error", () => { b.remove(); if (!$(".g-item", box)) $("#cat-empty").hidden = false; });
    if (p.dedupe) img.addEventListener("load", () => {
      try { const h = dhash(img); if (seen.some(o => sameImage(o, h))) b.remove(); else seen.push(h); } catch (e) {}
    });
    img.src = URL_(src);
    b.append(img); box.append(b); observe(b);
  });
  box.addEventListener("click", e => { const b = e.target.closest(".g-item"); if (b) openLB($$(".g-item", box), b); });
}

/* ---------- 11. Kontaktformular → E-Mail-Programm ---------- */
function initForm(form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim(), msg = form.msg.value.trim(), thema = form.thema.value;
    const err = $("#form-err");
    if (!name || !msg) { err.hidden = false; (name ? form.msg : form.name).focus(); return; }
    err.hidden = true;
    const subject = `Anfrage: ${thema} – ${name}`;
    const body = `Hallo Max\n\n${msg}\n\nViele Grüsse\n${name}`;
    location.href = `mailto:maxx.boss@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* ---------- 12. Intro: Chrom-Terminal ---------- */
function Liquid(canvas) {
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `precision mediump float;
uniform vec2 u_r;uniform float u_t;uniform vec2 u_m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_r;vec2 p=uv*2.1;float t=u_t*.11;
 vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,1.3)-t));
 vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*.7+u_m*.5),fbm(p+3.*q+vec2(8.3,2.8)-t*.5));
 float f=fbm(p+2.4*w);
 vec3 dark=vec3(.085,.09,.13),navy=vec3(.16,.17,.29),pale=vec3(.86,.88,.94);
 vec3 col=mix(dark,navy,smoothstep(.15,.9,uv.x*.7+w.x*.5));
 col=mix(col,pale,smoothstep(.5,1.,(1.-uv.y)*.65+f*.55-.1));
 float r1=exp(-pow((f-.565)*30.,2.)),r2=exp(-pow((f-.535)*30.,2.)),r3=exp(-pow((f-.60)*32.,2.));
 col+=vec3(1.,.62,.25)*r1*.9+vec3(.95,.25,.32)*r2*.45+vec3(.35,.7,1.)*r3*.75;
 col=mix(col,vec3(1.,.99,.96),smoothstep(.6,.7,f));
 col=mix(col,vec3(1.,.93,.5),smoothstep(.72,.78,f)*.55);
 col*=mix(.72,1.,smoothstep(0.,.55,distance(uv,vec2(.12,.9))));
 gl_FragColor=vec4(col,1.);}`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; };
  const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, "u_r"), uT = gl.getUniformLocation(pr, "u_t"), uM = gl.getUniformLocation(pr, "u_m");
  const mouse = [0, 0], sm = [0, 0];
  const onMove = e => { mouse[0] = e.clientX / innerWidth - 0.5; mouse[1] = 0.5 - e.clientY / innerHeight; };
  addEventListener("pointermove", onMove, { passive: true });
  let raf = 0, dead = false; const t0 = performance.now();
  function frame(now) {
    if (dead) return;
    const dpr = Math.min(devicePixelRatio || 1, 1.5), W = Math.round(canvas.clientWidth * dpr), H = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; gl.viewport(0, 0, W, H); }
    sm[0] += (mouse[0] - sm[0]) * 0.05; sm[1] += (mouse[1] - sm[1]) * 0.05;
    gl.uniform2f(uR, W, H); gl.uniform1f(uT, (now - t0) / 1000 + 8); gl.uniform2f(uM, sm[0], sm[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return { stop() { dead = true; cancelAnimationFrame(raf); removeEventListener("pointermove", onMove); const x = gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext(); } };
}
function runIntro() {
  const en = isEN();
  const ov = document.createElement("div");
  ov.className = "intro"; ov.setAttribute("role", "status"); ov.setAttribute("aria-label", en ? "Portfolio is loading" : "Portfolio lädt");
  ov.innerHTML = `<div class="term"><canvas></canvas><div class="term-ui"><div class="term-dots"><i></i><i></i><i></i></div><div class="term-lines"></div></div></div>
    <div class="load"><span class="load-pct">000%</span><span class="bar"><i></i></span><span class="load-lbl">${en ? "Loading portfolio" : "Portfolio lädt"}</span></div>
    <button type="button" class="skip">${en ? "Skip" : "Überspringen"} →</button>`;
  document.body.append(ov);
  const liq = Liquid($("canvas", ov));
  if (!liq) $(".term", ov).classList.add("nogl");
  const lines = $(".term-lines", ov), bar = $(".bar i", ov), pct = $(".load-pct", ov);
  const ok = n => `<span class="ok">✓</span> ${n} <span class="t-mut">${en ? "ready" : "bereit"}</span>`;
  const CMD = "npx start @maxboss";
  const steps = [
    { at: 120, html: `<span class="t-mut">max@boss ~ zsh</span>` },
    { at: 750, type: CMD },
    { at: 2050, html: ok("Canon EOS R7") },
    { at: 2400, html: ok("DJI Mini 2") },
    { at: 2750, html: ok("DJI RS 4 Mini") },
    { at: 3100, html: ok("GoPro HERO12") },
    { at: 3500, html: `<span class="t-hi">→ ${en ? "All set. Welcome!" : "Alles bereit. Willkommen!"}</span>` }
  ];
  const END = 4100;
  let finished = false, typedEl = null;
  const t0 = performance.now();
  function addLine(html) {
    $$(".caret", lines).forEach(c => c.remove());
    const d = document.createElement("div"); d.className = "t-line"; d.innerHTML = html + '<span class="caret"></span>';
    lines.append(d); return d;
  }
  function tick(now) {
    if (finished) return;
    const el = now - t0;
    steps.forEach(s => {
      if (s.done || el < s.at) return;
      if (s.type) {
        if (!s.el) { s.el = addLine(`<span class="t-mut">~ $</span> <span class="typed"></span>`); typedEl = $(".typed", s.el); }
        const n = Math.min(s.type.length, Math.floor((el - s.at) / 55));
        typedEl.textContent = s.type.slice(0, n);
        if (n >= s.type.length) s.done = true;
      } else { addLine(s.html); s.done = true; }
    });
    const k = Math.min(1, el / END), e = 1 - Math.pow(1 - k, 2);
    bar.style.transform = `scaleX(${e})`;
    pct.textContent = String(Math.round(e * 100)).padStart(3, "0") + "%";
    if (el >= END + 300) return done();
    requestAnimationFrame(tick);
  }
  function done() {
    if (finished) return; finished = true;
    bar.style.transform = "scaleX(1)"; pct.textContent = "100%";
    try { sessionStorage.setItem("mb_intro", "1"); } catch (e) {}
    ov.classList.add("out");
    setTimeout(() => { root.classList.remove("intro-play"); fitAll(); rise(); ov.classList.add("gone"); }, 420);
    setTimeout(() => { if (liq) liq.stop(); ov.remove(); }, 1200);
    removeEventListener("keydown", onKey);
  }
  const onKey = e => { if (["Escape", "Enter", " "].includes(e.key)) { e.preventDefault(); done(); } };
  addEventListener("keydown", onKey);
  ov.addEventListener("click", done);
  setTimeout(done, 8000);
  requestAnimationFrame(tick);
}

/* ---------- 13. Start ---------- */
try { dots = Dots(); } catch (e) {}
applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
applyLang(root.dataset.lang === "en" ? "en" : "de");
const tiles = $("#tiles"); if (tiles) initTiles(tiles);
const cat = $("#cat");
const rows = $("#rows"); if (rows) initRows(rows, cat ? new URLSearchParams(location.search).get("k") : null);
if (cat) initCategory();
const form = $("#mailform"); if (form) initForm(form);
$$(".io").forEach(observe);
fitAll();
addEventListener("load", fitAll);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(fitAll, 100); });
if (root.classList.contains("intro-play")) {
  if (REDUCE) { root.classList.remove("intro-play"); rise(); } else runIntro();
} else rise();
})();
