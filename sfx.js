/* ═══════════════════════════════════════════════════════════════
   AWAKEN SYSTEM — SFX & ANIMATION ENGINE
   All sounds generated via Web Audio API (zero external files)
   All animations via Canvas + CSS (zero external libraries)
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── AUDIO CONTEXT ────────────────────────────────────────────────────────────

let _audioCtx = null;
let _sfxEnabled = true;

function getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  // Resume if suspended (browser autoplay policy)
  if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// Unlock audio on first user interaction
document.addEventListener('touchstart', getAudioCtx, { once: true });
document.addEventListener('click', getAudioCtx, { once: true });

// ─── CORE SOUND PRIMITIVES ────────────────────────────────────────────────────

function playTone(freq, type, duration, volume, delay = 0, fadeOut = true) {
  const ctx = getAudioCtx();
  if (!ctx || !_sfxEnabled) return;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  if (fadeOut) gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.05);
}

function playNoise(duration, volume, filterFreq = 800, delay = 0) {
  const ctx = getAudioCtx();
  if (!ctx || !_sfxEnabled) return;
  const bufSize = ctx.sampleRate * duration;
  const buffer  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data    = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = filterFreq;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime + delay);
}

// ─── SOUND LIBRARY ────────────────────────────────────────────────────────────

const SFX = {

  // Subtle UI tap — button press
  tap() {
    playTone(440, 'sine', 0.06, 0.08);
    playTone(600, 'sine', 0.04, 0.05, 0.02);
  },

  // Quest complete — satisfying chime sequence
  questComplete() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => playTone(f, 'sine', 0.25, 0.18, i * 0.1));
    playNoise(0.08, 0.04, 1200, 0.0);
  },

  // Rank up — epic orchestral hit
  rankUp() {
    // Power chord stab
    [220, 277, 330, 440].forEach((f, i) => {
      playTone(f, 'sawtooth', 0.6, 0.12, 0);
    });
    // Rising sweep
    const ctx = getAudioCtx();
    if (ctx && _sfxEnabled) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime + 0.05);
      osc.stop(ctx.currentTime + 0.65);
    }
    // Triumphant fanfare notes
    const fanfare = [523, 659, 784, 1047, 1319];
    fanfare.forEach((f, i) => playTone(f, 'triangle', 0.4, 0.22, 0.55 + i * 0.1));
    playNoise(0.15, 0.06, 600, 0.05);
  },

  // Badge / achievement unlock — flip reveal sound
  badgeUnlock() {
    playTone(880, 'sine', 0.12, 0.15, 0.0);
    playTone(1100, 'sine', 0.12, 0.15, 0.08);
    playTone(1320, 'sine', 0.18, 0.18, 0.16);
    playTone(1760, 'sine', 0.3, 0.20, 0.26);
    playNoise(0.1, 0.05, 2000, 0.25);
  },

  // Streak milestone — power up ascending
  streakMilestone() {
    const scale = [261, 329, 392, 523, 659, 784, 1047];
    scale.forEach((f, i) => playTone(f, 'triangle', 0.15, 0.14, i * 0.07));
    playNoise(0.12, 0.05, 900, 0.0);
  },

  // Purchase / shop buy — coin sound
  purchase() {
    playTone(1047, 'sine', 0.08, 0.15, 0.0);
    playTone(1319, 'sine', 0.08, 0.15, 0.06);
    playTone(1568, 'sine', 0.12, 0.18, 0.12);
  },

  // Error / failed — low buzz
  error() {
    playTone(180, 'sawtooth', 0.15, 0.18, 0.0);
    playTone(160, 'sawtooth', 0.15, 0.15, 0.1);
    playNoise(0.12, 0.08, 200, 0.0);
  },

  // Chest open — magical shimmer
  chestOpen() {
    const magic = [659, 784, 988, 1175, 1319, 1568];
    magic.forEach((f, i) => {
      playTone(f, 'sine', 0.2, 0.12, i * 0.06);
      playTone(f * 1.5, 'sine', 0.1, 0.06, i * 0.06 + 0.03);
    });
    playNoise(0.2, 0.06, 3000, 0.1);
  },

  // Dungeon gate open — dark rumble + whoosh
  dungeonOpen() {
    playTone(80, 'sawtooth', 0.4, 0.2, 0.0);
    playTone(60, 'sawtooth', 0.4, 0.18, 0.1);
    playNoise(0.3, 0.12, 300, 0.0);
    // Whoosh
    const ctx = getAudioCtx();
    if (ctx && _sfxEnabled) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.7);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
      osc.start(ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.8);
    }
  },

  // Penalty — ominous drone
  penalty() {
    playTone(110, 'sawtooth', 0.8, 0.2, 0.0);
    playTone(98,  'sawtooth', 0.8, 0.18, 0.05);
    playNoise(0.5, 0.1, 150, 0.0);
    // Three ominous pulses
    [0.3, 0.55, 0.8].forEach(d => {
      playTone(130, 'square', 0.12, 0.12, d);
    });
  },

  // Stat gain — ascending pop
  statGain() {
    playTone(660, 'sine', 0.08, 0.12, 0.0);
    playTone(880, 'sine', 0.08, 0.14, 0.06);
  },

  // Boot complete — system online
  bootComplete() {
    const seq = [261, 329, 392, 523];
    seq.forEach((f, i) => playTone(f, 'square', 0.15, 0.1, i * 0.12));
    playTone(1047, 'sine', 0.4, 0.2, 0.55);
    playNoise(0.08, 0.04, 1500, 0.55);
  },

  // Daily login — welcome chime
  dailyLogin() {
    playTone(523, 'sine', 0.2, 0.14, 0.0);
    playTone(659, 'sine', 0.2, 0.14, 0.12);
    playTone(784, 'sine', 0.3, 0.16, 0.24);
  },
};

window.SFX = SFX;

// Toggle SFX on/off
window.toggleSFX = function() {
  _sfxEnabled = !_sfxEnabled;
  if (typeof STATE !== 'undefined') {
    STATE.sfxEnabled = _sfxEnabled;
    if (typeof saveState === 'function') saveState();
  }
  const btn = document.getElementById('sfxToggleBtn');
  if (btn) btn.textContent = _sfxEnabled ? '🔊 ON' : '🔇 OFF';
  if (_sfxEnabled) SFX.tap();
};

// Load saved SFX preference
window.addEventListener('DOMContentLoaded', () => {
  try {
    const raw = localStorage.getItem('awakenState');
    if (raw) {
      const s = JSON.parse(raw);
      if (s.sfxEnabled === false) _sfxEnabled = false;
    }
  } catch(e) {}
  const btn = document.getElementById('sfxToggleBtn');
  if (btn) btn.textContent = _sfxEnabled ? '🔊 ON' : '🔇 OFF';
});


// ═══════════════════════════════════════════════════════════════
// ANIMATION ENGINE
// ═══════════════════════════════════════════════════════════════

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────

function getParticleCanvas() {
  let c = document.getElementById('awakenParticleCanvas');
  if (!c) {
    c = document.createElement('canvas');
    c.id = 'awakenParticleCanvas';
    c.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      pointer-events:none;z-index:9999;
    `;
    document.body.appendChild(c);
  }
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  return c;
}

// ─── QUEST COMPLETE PARTICLES ─────────────────────────────────────────────────

window.animQuestComplete = function(originEl) {
  const canvas = getParticleCanvas();
  const ctx    = canvas.getContext('2d');

  // Origin point from element or center
  let ox = canvas.width / 2, oy = canvas.height / 2;
  if (originEl) {
    const r = originEl.getBoundingClientRect();
    ox = r.left + r.width / 2;
    oy = r.top  + r.height / 2;
  }

  const colors  = ['#dc1428','#ff4444','#ff8800','#ffcc00','#ffffff','#ff2255'];
  const particles = Array.from({ length: 60 }, () => ({
    x: ox, y: oy,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.7) * 14,
    life: 1,
    decay: 0.018 + Math.random() * 0.02,
    size: 3 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.3,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.97;
      p.life -= p.decay;
      p.rot  += p.rotSpeed;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      ctx.restore();
    }
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(draw);

  // Flash overlay
  flashScreen('#dc142830', 180);
};

// ─── RANK UP CINEMATIC ────────────────────────────────────────────────────────

window.animRankUp = function(rankName) {
  const old = document.getElementById('rankUpOverlay');
  if (old) old.remove();

  const _ruShort = rankName.replace('-Rank','').replace('-rank','');
  const _ruImgSrc = (typeof RANK_BADGES !== 'undefined' && RANK_BADGES[_ruShort]) || '';

  const PAL = {
    'E':  {glow:'170,95,50',  a:'#b06030'}, 'D': {glow:'195,195,210',a:'#c8c8d8'},
    'C':  {glow:'205,165,20', a:'#d4a818'}, 'B': {glow:'55,95,235',  a:'#4070ee'},
    'A':  {glow:'165,45,235', a:'#b040f0'}, 'S': {glow:'210,210,228',a:'#dcdce8'},
    'SS': {glow:'220,16,38',  a:'#dc1026'}, 'SSS':{glow:'185,0,22',  a:'#bb0016'},
    'X':  {glow:'125,0,16',   a:'#7a0010'}, 'Z': {glow:'70,0,10',    a:'#3e0008'},
  };
  const LORE = {
    'E':'The system has acknowledged your existence.',
    'D':'Your potential has been recognized.',
    'C':'You are no longer ordinary.',
    'B':'Few reach this level. You are one of them.',
    'A':'The gap between you and the weak grows vast.',
    'S':'You stand where legends are born.',
    'SS':'Power that bends reality itself.',
    'SSS':'The system trembles at your presence.',
    'X':'Beyond all known classifications.',
    'Z':'You have transcended. There is nothing above.',
  };
  const pal = PAL[_ruShort] || PAL['S'];
  const lore = LORE[_ruShort] || '';

  if (!document.getElementById('rankup-styles')) {
    const st = document.createElement('style');
    st.id = 'rankup-styles';
    st.textContent = `
      @keyframes ru-badge-in {
        0%  { transform:scale(.04) rotate(-20deg); opacity:0; filter:brightness(4) blur(6px); }
        55% { transform:scale(1.2) rotate(6deg);  opacity:1; filter:brightness(2.5) blur(0); }
        72% { transform:scale(.92) rotate(-3deg); filter:brightness(1.4); }
        100%{ transform:scale(1) rotate(0); filter:brightness(1); }
      }
      @keyframes ru-badge-float {
        0%,100%{ transform:translateY(0) scale(1) rotate(0deg); }
        25%    { transform:translateY(-5px) scale(1.012) rotate(.5deg); }
        75%    { transform:translateY(4px) scale(.989) rotate(-.5deg); }
      }
      @keyframes ru-text-in {
        0%  { opacity:0; transform:translateY(18px) scaleX(.8) skewX(-4deg); }
        100%{ opacity:1; transform:translateY(0) scaleX(1) skewX(0); }
      }
      @keyframes ru-label-in {
        0%  { opacity:0; transform:scaleX(0); }
        100%{ opacity:1; transform:scaleX(1); }
      }
      @keyframes ru-tap-pulse {
        0%,100%{ opacity:.3; } 50%{ opacity:.65; }
      }
      @keyframes ru-scan-move {
        0%  { transform:translateY(-100%); }
        100%{ transform:translateY(100vh); }
      }
    `;
    document.head.appendChild(st);
  }

  const overlay = document.createElement('div');
  overlay.id = 'rankUpOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:10000;
    background:#000;overflow:hidden;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    font-family:'Rajdhani',sans-serif;cursor:pointer;
  `;

  overlay.innerHTML = `
    <canvas id="ru-bg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;"></canvas>
    <canvas id="ru-fg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:6;"></canvas>
    <div style="position:absolute;inset:0;z-index:2;pointer-events:none;
      background:repeating-linear-gradient(180deg,transparent 0,transparent 2px,rgba(0,0,0,.32) 2px,rgba(0,0,0,.32) 3px);"></div>
    <div id="ru-flash" style="position:absolute;inset:0;z-index:10;background:#fff;opacity:0;pointer-events:none;"></div>
    <div id="ru-red"   style="position:absolute;inset:0;z-index:9;background:#200003;opacity:0;pointer-events:none;transition:opacity .9s;"></div>
    <div id="ru-sweeps" style="position:absolute;inset:0;z-index:3;overflow:hidden;pointer-events:none;"></div>
    <div id="ru-glitch" style="position:absolute;inset:0;z-index:7;pointer-events:none;"></div>

    <div style="position:relative;z-index:5;display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem;">

      <div id="ru-eyerow" style="display:flex;align-items:center;gap:10px;margin-bottom:1.4rem;
        opacity:0;transform:scaleX(0);transition:opacity .45s,transform .5s cubic-bezier(.16,1,.3,1);">
        <div style="height:1px;width:55px;background:linear-gradient(to left,${pal.a},transparent);"></div>
        <div style="font-family:'Orbitron',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.5em;
          color:${pal.a};white-space:nowrap;">◆ ${rankName.toUpperCase()} ACHIEVED ◆</div>
        <div style="height:1px;width:55px;background:linear-gradient(to right,${pal.a},transparent);"></div>
      </div>

      <div id="ru-badge" style="position:relative;width:160px;height:160px;
        opacity:0;transform:scale(.04) rotate(-20deg);
        transition:transform .7s cubic-bezier(.34,1.56,.64,1),opacity .2s,filter .45s;">
        ${_ruImgSrc
          ? `<img src="${_ruImgSrc}" style="width:160px;height:160px;object-fit:contain;display:block;position:relative;z-index:2;" alt="${rankName}">`
          : `<div style="width:160px;height:160px;background:linear-gradient(135deg,${pal.a},#1a0003);
              clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);
              display:flex;align-items:center;justify-content:center;">
              <span style="font-family:'Orbitron',sans-serif;font-size:2.2rem;font-weight:900;color:#fff;">${_ruShort}</span>
            </div>`}
        <div style="position:absolute;inset:-22px;border-radius:50%;
          background:radial-gradient(ellipse at center,rgba(${pal.glow},.2) 0%,transparent 70%);
          box-shadow:0 0 50px 12px rgba(${pal.glow},.1);
          opacity:0;transition:opacity .7s;" id="ru-aura"></div>
      </div>

      <div id="ru-rname" style="font-family:'Orbitron',sans-serif;font-size:clamp(1.7rem,5vw,2.4rem);
        font-weight:900;color:#fff;letter-spacing:.2em;text-transform:uppercase;
        margin-top:1.4rem;opacity:0;
        transform:translateY(18px) scaleX(.8) skewX(-4deg);
        transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1);">
        ${rankName.toUpperCase()}
      </div>

      <div id="ru-div" style="display:flex;align-items:center;gap:8px;margin-top:.85rem;width:0;overflow:hidden;transition:width .6s ease;white-space:nowrap;">
        <div style="height:1px;flex:1;background:linear-gradient(to right,transparent,${pal.a});"></div>
        <div style="width:4px;height:4px;background:${pal.a};transform:rotate(45deg);flex-shrink:0;"></div>
        <div style="height:1px;flex:1;background:linear-gradient(to left,transparent,${pal.a});"></div>
      </div>

      <div id="ru-lore" style="font-family:'Rajdhani',sans-serif;font-size:.65rem;
        color:rgba(255,255,255,.2);letter-spacing:.16em;text-transform:uppercase;
        max-width:270px;margin-top:.65rem;opacity:0;transition:opacity .7s;line-height:1.9;">
        ${lore}
      </div>

      <div id="ru-tap" style="margin-top:2rem;opacity:0;transition:opacity .5s;
        display:flex;align-items:center;gap:8px;font-size:.55rem;letter-spacing:.28em;
        color:rgba(220,20,40,.35);animation:ru-tap-pulse 1.6s 2.4s ease-in-out infinite;">
        <div style="height:1px;width:18px;background:rgba(220,20,40,.25);"></div>
        TAP TO CONTINUE
        <div style="height:1px;width:18px;background:rgba(220,20,40,.25);"></div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  function oq(id){ return overlay.querySelector('#'+id); }

  // ── SEQUENCE ──
  // t0 flash
  const fl = oq('ru-flash');
  fl.style.opacity = '1';
  setTimeout(()=>{ fl.style.transition='opacity .5s'; fl.style.opacity='0'; }, 40);

  // t80 red pulse
  setTimeout(()=>{
    const rf = oq('ru-red'); rf.style.opacity='.55';
    setTimeout(()=>{ rf.style.opacity='0'; },80);
  },80);

  // t120 tendrils
  setTimeout(()=>{ _ruAura(oq('ru-bg'), pal); },120);

  // t200 glitch
  setTimeout(()=>{ _ruGlitch(oq('ru-glitch'), pal, 2); },200);
  setTimeout(()=>{ _ruGlitch(oq('ru-glitch'), pal, 1); },290);

  // t260 sweeps
  setTimeout(()=>{
    const sb = oq('ru-sweeps');
    [{y:15,w:52,d:.06},{y:30,w:38,d:.12},{y:46,w:65,d:.05},{y:63,w:32,d:.09},{y:79,w:48,d:.03}]
    .forEach(l=>{
      const div=document.createElement('div');
      div.style.cssText=`position:absolute;top:${l.y}%;left:0;height:1px;width:0;
        background:linear-gradient(to right,transparent,rgba(${pal.glow},.55) 40%,rgba(${pal.glow},.2));
        transition:width .38s ${l.d}s cubic-bezier(.16,1,.3,1);`;
      sb.appendChild(div);
      requestAnimationFrame(()=>setTimeout(()=>{ div.style.width=l.w+'%'; },16));
    });
  },260);

  // t400 badge in
  setTimeout(()=>{
    const bw = oq('ru-badge');
    bw.style.opacity='1';
    bw.style.transform='scale(1.2) rotate(6deg)';
    bw.style.filter=`brightness(2.5) drop-shadow(0 0 35px rgba(${pal.glow},1))`;
    setTimeout(()=>{
      bw.style.transform='scale(.92) rotate(-3deg)';
      bw.style.filter=`brightness(1.4) drop-shadow(0 0 20px rgba(${pal.glow},.9))`;
      setTimeout(()=>{
        bw.style.transition='transform .2s ease,filter .3s';
        bw.style.transform='scale(1) rotate(0)';
        bw.style.filter=`brightness(1) drop-shadow(0 0 14px rgba(${pal.glow},.7))`;
        const aura = oq('ru-aura'); if(aura) aura.style.opacity='1';
        _ruGlitch(oq('ru-glitch'), pal, 3);
        _ruRings(oq('ru-fg'), pal);
        // Float loop
        let ft=0;
        function floatTick(){
          ft+=.016;
          const y=Math.sin(ft)*4.5, s=1+Math.sin(ft*.65)*.013, r=Math.sin(ft*.38)*.55;
          const gw=9+Math.sin(ft)*5;
          bw.style.transform=`translateY(${y}px) scale(${s}) rotate(${r}deg)`;
          bw.style.filter=`brightness(1) drop-shadow(0 0 ${gw}px rgba(${pal.glow},.72))`;
          if(overlay.parentNode) requestAnimationFrame(floatTick);
        }
        floatTick();
      },160);
    },300);
  },400);

  setTimeout(()=>{ const e=oq('ru-eyerow'); e.style.opacity='1'; e.style.transform='scaleX(1)'; },900);

  setTimeout(()=>{
    const r=oq('ru-rname');
    r.style.opacity='1'; r.style.transform='translateY(0) scaleX(1) skewX(0)';
    r.style.textShadow=`0 0 22px rgba(${pal.glow},.85),0 0 60px rgba(${pal.glow},.3)`;
    setTimeout(()=>_ruGlitch(oq('ru-glitch'),pal,2),55);
  },1150);

  setTimeout(()=>{
    oq('ru-div').style.width='230px';
    setTimeout(()=>{ oq('ru-lore').style.opacity='1'; },200);
    setTimeout(()=>{ oq('ru-tap').style.opacity='1'; },480);
  },1600);

  // Dismiss
  function dismiss(){
    overlay.style.transition='opacity .45s';
    overlay.style.opacity='0';
    setTimeout(()=>{ if(overlay.parentNode) overlay.remove(); },480);
  }
  overlay.addEventListener('click', dismiss);
  setTimeout(dismiss, 6500);
};

function _ruAura(cv, pal){
  if(!cv) return;
  const W=cv.offsetWidth||window.innerWidth, H=cv.offsetHeight||window.innerHeight;
  cv.width=W; cv.height=H;
  const ctx=cv.getContext('2d');
  const strands=Array.from({length:20},()=>({
    x:W*.2+Math.random()*W*.6, y:H, pts:[],
    spd:1.4+Math.random()*2.6, drift:(Math.random()-.5)*.55,
    life:1, decay:.005+Math.random()*.007, lw:.35+Math.random()*.9,
  }));
  function tick(){
    ctx.clearRect(0,0,W,H); let alive=false;
    strands.forEach(s=>{
      if(s.life<=0)return;
      s.y-=s.spd; s.x+=s.drift+(Math.random()-.5)*.65;
      s.pts.push({x:s.x,y:s.y}); if(s.pts.length>30)s.pts.shift();
      s.life-=s.decay; if(s.pts.length<2)return; alive=true;
      ctx.save(); ctx.globalAlpha=Math.max(0,s.life*.48);
      ctx.strokeStyle=`rgba(${pal.glow},1)`; ctx.lineWidth=s.lw; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(s.pts[0].x,s.pts[0].y);
      for(let i=1;i<s.pts.length;i++)ctx.lineTo(s.pts[i].x,s.pts[i].y);
      ctx.stroke(); ctx.restore();
    });
    if(alive&&cv.parentNode)requestAnimationFrame(tick); else ctx.clearRect(0,0,W,H);
  }
  requestAnimationFrame(tick);
}

function _ruRings(cv, pal){
  if(!cv) return;
  const W=cv.offsetWidth||window.innerWidth, H=cv.offsetHeight||window.innerHeight;
  cv.width=W; cv.height=H;
  const ctx=cv.getContext('2d'), cx=W/2, cy=H/2, MR=Math.hypot(cx,cy);
  const rings=[{r:0,max:MR*1.6,a:.7,spd:14},{r:-18,max:MR*1.3,a:.45,spd:11},{r:-42,max:MR,a:.28,spd:8},{r:-68,max:MR*.72,a:.16,spd:6}];
  function draw(){
    ctx.clearRect(0,0,W,H); let alive=false;
    rings.forEach(r=>{
      if(r.r<0){r.r+=r.spd;return;}
      r.r+=r.spd; const p=Math.min(1,r.r/r.max),a=r.a*(1-p); if(a<=0)return; alive=true;
      ctx.beginPath(); ctx.arc(cx,cy,r.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${pal.glow},${a.toFixed(3)})`; ctx.lineWidth=Math.max(.3,1.6*(1-p)); ctx.stroke();
    });
    if(alive&&cv.parentNode)requestAnimationFrame(draw); else ctx.clearRect(0,0,W,H);
  }
  requestAnimationFrame(draw);
}

function _ruGlitch(el, pal, count){
  if(!el)return;
  for(let i=0;i<count;i++){
    const s=document.createElement('div');
    const top=5+Math.random()*85, h=1+Math.random()*5, dx=(Math.random()-.5)*24, op=.1+Math.random()*.18;
    s.style.cssText=`position:absolute;left:0;right:0;top:${top}%;height:${h}px;background:rgba(${pal.glow},${op});transform:translateX(${dx}px);pointer-events:none;`;
    el.appendChild(s); setTimeout(()=>s.remove(), 50+Math.random()*55);
  }
}


// ─── BADGE UNLOCK FLIP ────────────────────────────────────────────────────────

window.animBadgeUnlock = function(badgeName, badgeIcon, tier) {
  const tierColors = {
    bronze: '#cd7f32', silver: '#c0c0c0', gold: '#fbbf24',
    platinum: '#e5e4e2', diamond: '#b9f2ff'
  };
  const color = tierColors[tier] || '#dc1428';

  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotateY(90deg) scale(0.5);
    width:200px;padding:1.5rem;
    background:linear-gradient(135deg,#1a1a1a,#0d0d0d);
    border:2px solid ${color};
    border-radius:12px;
    box-shadow:0 0 40px ${color}66,0 0 80px ${color}33;
    z-index:10001;text-align:center;
    font-family:'Rajdhani',sans-serif;
    transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1),opacity 0.4s;
    opacity:0;
  `;
  el.innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:0.5rem;">${badgeIcon}</div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;color:${color};margin-bottom:0.3rem;">BADGE UNLOCKED</div>
    <div style="font-size:1rem;font-weight:700;color:#fff;letter-spacing:0.1em;">${badgeName}</div>
    <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);margin-top:0.3rem;letter-spacing:0.15em;">${tier.toUpperCase()}</div>
  `;
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = 'translate(-50%,-50%) rotateY(0deg) scale(1)';
    el.style.opacity = '1';
  });

  setTimeout(() => {
    el.style.transform = 'translate(-50%,-50%) rotateY(90deg) scale(0.5)';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 450);
  }, 2200);
};

// ─── SCREEN FLASH ─────────────────────────────────────────────────────────────

function flashScreen(color, duration) {
  const f = document.createElement('div');
  f.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:${color};pointer-events:none;
    z-index:9998;opacity:1;
    transition:opacity ${duration}ms ease-out;
  `;
  document.body.appendChild(f);
  requestAnimationFrame(() => {
    f.style.opacity = '0';
    setTimeout(() => f.remove(), duration + 50);
  });
}

window.flashScreen = flashScreen;

// ─── XP / RANK BAR PULSE ──────────────────────────────────────────────────────

window.animXPPulse = function() {
  const bar = document.getElementById('rankBarFill');
  if (!bar) return;
  bar.style.transition = 'none';
  bar.style.boxShadow = '0 0 18px #dc1428, 0 0 36px #dc142888';
  bar.style.filter = 'brightness(1.5)';
  setTimeout(() => {
    bar.style.transition = 'box-shadow 0.6s, filter 0.6s';
    bar.style.boxShadow = '';
    bar.style.filter = '';
  }, 350);
};

// ─── STAT NUMBER COUNT-UP ─────────────────────────────────────────────────────

window.animStatCountUp = function() {
  const statRows = document.querySelectorAll('.stat-val-col');
  statRows.forEach(el => {
    const target = parseInt(el.textContent) || 0;
    const start  = Math.max(0, target - 8);
    let current  = start;
    const step   = () => {
      current = Math.min(target, current + 1);
      el.textContent = current;
      if (current < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

// ─── BUTTON PRESS FEEDBACK ────────────────────────────────────────────────────

window.animButtonPress = function(btn) {
  if (!btn) return;
  btn.style.transition = 'transform 0.08s, filter 0.08s';
  btn.style.transform  = 'scale(0.94)';
  btn.style.filter     = 'brightness(1.3)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
    btn.style.filter    = '';
  }, 100);
};

// ─── CHEST OPEN SHIMMER ───────────────────────────────────────────────────────

window.animChestOpen = function(chestEl) {
  if (!chestEl) return;
  let frame = 0;
  const colors = ['#ffcc00','#ff8800','#dc1428','#ffffff','#ffcc00'];
  const id = setInterval(() => {
    chestEl.style.textShadow = `0 0 20px ${colors[frame % colors.length]}`;
    chestEl.style.transform  = `scale(${1 + Math.sin(frame * 0.8) * 0.12}) rotate(${Math.sin(frame * 1.2) * 8}deg)`;
    frame++;
    if (frame > 18) {
      clearInterval(id);
      chestEl.style.textShadow = '';
      chestEl.style.transform  = '';
    }
  }, 40);
};

// ─── PENALTY SHAKE ────────────────────────────────────────────────────────────

window.animPenaltyShake = function() {
  const app = document.getElementById('screen-app');
  if (!app) return;
  let f = 0;
  const id = setInterval(() => {
    app.style.transform = `translateX(${Math.sin(f * 2.5) * (8 - f * 0.5)}px)`;
    f++;
    if (f > 14) { clearInterval(id); app.style.transform = ''; }
  }, 40);
  flashScreen('rgba(220,20,40,0.15)', 600);
};

// ─── DAILY LOGIN WELCOME ──────────────────────────────────────────────────────

window.animDailyLogin = function(hunterName) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;top:0;left:0;width:100%;
    background:linear-gradient(90deg,#0a0a0a,#1a0005,#0a0a0a);
    border-bottom:1px solid #dc1428;
    padding:0.9rem 1.5rem;
    z-index:9997;
    font-family:'Share Tech Mono',monospace;
    font-size:0.75rem;letter-spacing:0.15em;color:#dc1428;
    transform:translateY(-100%);
    transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    display:flex;align-items:center;gap:0.75rem;
  `;
  el.innerHTML = `
    <span style="font-size:1rem;">⚔</span>
    <span>WELCOME BACK, ${hunterName.toUpperCase()} — SYSTEM ONLINE</span>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.style.transform = 'translateY(0)');
  setTimeout(() => {
    el.style.transition = 'transform 0.35s ease-in';
    el.style.transform  = 'translateY(-100%)';
    setTimeout(() => el.remove(), 400);
  }, 2800);
};

// ─── BOOT SCREEN PULSE ────────────────────────────────────────────────────────

window.animBootPulse = function() {
  const bar = document.getElementById('bootBar');
  if (!bar) return;
  bar.style.boxShadow = '0 0 12px #dc1428, 0 0 24px #dc142855';
};

// ─── QUEST CARD APPEAR ────────────────────────────────────────────────────────

window.animQuestCardsIn = function() {
  const cards = document.querySelectorAll('.quest-card');
  cards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = `opacity 0.3s ${i * 0.05}s, transform 0.3s ${i * 0.05}s`;
    requestAnimationFrame(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    });
  });
};

// ─── HOOK INTO APP EVENTS ─────────────────────────────────────────────────────

// Store previous rank to detect rank-up
let _prevRankName = null;

window.addEventListener('DOMContentLoaded', () => {
  // Patch button clicks for tap sound + press animation
  document.addEventListener('click', e => {
    const btn = e.target.closest('button, .btn-complete, .nav-btn, .filter-btn, .chest-item');
    if (btn) {
      SFX.tap();
      animButtonPress(btn);
    }
    const chest = e.target.closest('.chest-item');
    if (chest) {
      SFX.chestOpen();
      animChestOpen(chest.querySelector('.chest-icon'));
    }
  });

  // Boot bar pulse
  animBootPulse();
});

// Called by app.js after full load
window.onAwakenAppReady = function(hunterName) {
  SFX.bootComplete();
  setTimeout(() => animDailyLogin(hunterName), 600);
};

// Called after quest complete
window.onQuestCompleted = function(btn) {
  SFX.questComplete();
  animQuestComplete(btn);
  animXPPulse();
};

// Called after rank changes
window.onRankChanged = function(newRankName) {
  if (_prevRankName && _prevRankName !== newRankName) {
    SFX.rankUp();
    setTimeout(() => animRankUp(newRankName), 200);
  }
  _prevRankName = newRankName;
};

// Called when badge unlocked
window.onBadgeUnlocked = function(name, icon, tier) {
  SFX.badgeUnlock();
  setTimeout(() => animBadgeUnlock(name, icon, tier), 300);
};

// Called on penalty
window.onPenalty = function() {
  SFX.penalty();
  animPenaltyShake();
};

// Called when purchase made
window.onPurchase = function() {
  SFX.purchase();
};

// Called when chest opened
window.onChestOpened = function() {
  SFX.chestOpen();
};

// Called when quests rendered
window.onQuestsRendered = function() {
  setTimeout(animQuestCardsIn, 50);
};

// Called when stats tab opened
window.onStatsOpened = function() {
  setTimeout(animStatCountUp, 200);
};
