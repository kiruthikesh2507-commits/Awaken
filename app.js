/* ═══════════════════════════════════════════
   SOLO LEVELING SYSTEM — APPLICATION LOGIC
   ═══════════════════════════════════════════ */

'use strict';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const RANKS = [
  { name: 'E-Rank',    short: 'E',   min: 55,   max: 119  },
  { name: 'D-Rank',    short: 'D',   min: 120,  max: 219  },
  { name: 'C-Rank',    short: 'C',   min: 220,  max: 399  },
  { name: 'B-Rank',    short: 'B',   min: 400,  max: 699  },
  { name: 'A-Rank',    short: 'A',   min: 700,  max: 1299 },
  { name: 'S-Rank',    short: 'S',   min: 1300, max: 1699 },
  { name: 'SS-Rank',   short: 'SS',  min: 1700, max: 2099 },
  { name: 'SSS-Rank',  short: 'SSS', min: 2100, max: 2399 },
  { name: '???-Rank',  short: '?',   min: 2400, max: 2599 },
  { name: 'DEMI GOD',  short: '∞',   min: 2600, max: Infinity },
];

const STATS_LIST = [
  'Strength','Intelligence','Dexterity','Charisma','Stamina',
  'Discipline','Speed','Durability','Agility','Wisdom','Appearance'
];

const STAT_ICONS = {
  Strength:'⚔', Intelligence:'📚', Dexterity:'🎯', Charisma:'🗣',
  Stamina:'💪', Discipline:'🔒', Speed:'⚡', Durability:'🛡',
  Agility:'🌀', Wisdom:'👁', Appearance:'✦'
};

const STAT_COLORS = {
  Strength:'#ef4444', Intelligence:'#3b82f6', Dexterity:'#f59e0b',
  Charisma:'#ec4899', Stamina:'#22c55e', Discipline:'#dc1428',
  Speed:'#06b6d4', Durability:'#a855f7', Agility:'#84cc16',
  Wisdom:'#f97316', Appearance:'#e879f9'
};

const SHOP_ITEMS = [
  { id:'cheat_day', name:'Cheat Day Pass', icon:'🎫', effect:'Skip all quests for one day without penalties', cost:1000 },
  { id:'skip_quest', name:'Skip a Quest', icon:'⏭', effect:'Skip one daily quest without penalties', cost:350 },
  { id:'skip_day', name:'Skip a Day', icon:'📅', effect:'Skip an entire day without penalties', cost:1200 },
  { id:'half_day', name:'Half-Day Break', icon:'🌓', effect:'Complete only 4 daily quests instead of 8', cost:500 },
  { id:'second_chance', name:'Second Chance', icon:'🔄', effect:'Retry a failed quest without penalties', cost:600 },
  { id:'auto_complete', name:'Auto-Complete', icon:'⚡', effect:'Instantly complete one daily quest', cost:900 },
  { id:'rest_bonus', name:'Rest Bonus', icon:'💤', effect:'Take a full day off but gain 50% rewards', cost:950 },
  { id:'quest_delay', name:'Quest Delay', icon:'⏱', effect:'Postpone a quest until the next day', cost:400 },
  { id:'hard_work', name:'Hard Work Pass', icon:'🔥', effect:'Double quest rewards for one day', cost:1400 },
  { id:'swap_quest', name:'Swap Quest', icon:'🔁', effect:'Swap one daily quest for another', cost:300 },
  { id:'sp_skipper', name:'Special Quest Skipper', icon:'🎭', effect:'Skip a special quest without penalties', cost:1000 },
  { id:'easier_day', name:'Easier Day', icon:'🌤', effect:'Reduce difficulty of all quests for one day', cost:850 },
  { id:'lucky_pass', name:'Lucky Pass', icon:'🍀', effect:'Skip one random quest but earn 50% rewards', cost:700 },
  { id:'penalty_shield', name:'Penalty Shield', icon:'🛡', effect:'Prevent penalties from one failed quest', cost:1100 },
  { id:'task_booster', name:'Task Booster', icon:'✨', effect:'Double rewards of a single completed quest', cost:800 },
  { id:'overdrive', name:'Overdrive Mode', icon:'💥', effect:'Triple rewards for one day but with harder quests', cost:1800 },
  { id:'refresh_quests', name:'Refresh Quests', icon:'🔃', effect:'Reroll all daily quests once per day', cost:650 },
  { id:'reduced_effort', name:'Reduced Effort Pass', icon:'😌', effect:'Halve effort required for all quests today', cost:900 },
  { id:'sleep_in', name:'Sleep-In Pass', icon:'🌙', effect:'Start quests later without penalty', cost:250 },
  { id:'double_rp', name:'Double Rewards Pass', icon:'💎', effect:'Double all RP earned for one day', cost:1500 },
  { id:'bonus_chest_key', name:'Bonus Chest Key', icon:'🗝', effect:'Guarantee a Bonus Chest after completing daily quests', cost:1600 },
  { id:'mystery_token', name:'Mystery Reward Token', icon:'❓', effect:'Exchange for a random special reward', cost:1200 },
  { id:'rp_multiplier', name:'RP Multiplier', icon:'📈', effect:'Double RP earnings for one day', cost:1700 },
];

const CHEST_REWARDS = [
  { name:'RP Windfall', value:'+100 RP', type:'rp', amount:100 },
  { name:'RP Jackpot', value:'+250 RP', type:'rp', amount:250 },
  { name:'Stat Surge', value:'+3 to a random stat', type:'stat', amount:3 },
  { name:'Double Surge', value:'+5 to two random stats', type:'multi_stat', amount:5 },
  { name:'Temporary Multiplier', value:'2x RP next quest', type:'buff' },
  { name:'Quest Skip Token', value:'Skip 1 quest free', type:'item', itemId:'skip_quest' },
  { name:'Mystery Reward', value:'Surprise incoming', type:'mystery' },
  { name:'Bonus RP', value:'+75 RP', type:'rp', amount:75 },
];

// ─── STATE ────────────────────────────────────────────────────────────────────

let STATE = {
  hunter: null,
  stats: null,
  rp: 0,
  quests: [],
  inventory: [],
  streak: 0,
  lastQuestDate: null,
  rpTodayEarned: 0,
  statsTodayGained: 0,
  questsCompleted: 0,
  bonusChests: [],
  penaltyDays: 0,
  theme: 'dark',
  activeFilter: 'all',
  activeTab: 'dashboard',
};

// ─── INIT ─────────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  if (STATE.hunter) {
    runBootSequence(() => showApp());
  } else {
    runBootSequence(() => showOnboarding());
  }
  applyTheme(STATE.theme);
  registerSW();
});

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────

function runBootSequence(callback) {
  const bar = document.getElementById('bootBar');
  const status = document.getElementById('bootStatus');
  const msgs = [
    'INITIALIZING SYSTEM...', 'LOADING HUNTER DATABASE...',
    'CALIBRATING QUEST ENGINE...', 'CONNECTING TO THE SYSTEM...',
    'RANK ASSESSMENT LOADING...', 'SYSTEM READY.'
  ];
  let progress = 0;
  let msgIdx = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
    const newIdx = Math.floor((progress / 100) * msgs.length);
    if (newIdx !== msgIdx && newIdx < msgs.length) { msgIdx = newIdx; status.textContent = msgs[msgIdx]; }
    if (progress >= 100) { setTimeout(() => { showScreen('onboarding'); setTimeout(callback, 100); }, 500); }
  }, 120);
  showScreen('boot');
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');
}

function showApp() {
  showScreen('app');
  document.getElementById('screen-app').classList.add('active');
  syncUI();
  checkDailyReset();
  checkPenalty();
  renderShop();
  renderStats();
  renderRankTable();
}

function showOnboarding() {
  showScreen('onboarding');
  currentStep = 1;
  renderOnboardingStep(1);
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

let currentStep = 1;
let selectedTheme = 'dark';

window.selectTheme = function(theme) {
  selectedTheme = theme;
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === theme);
  });
  applyTheme(theme);
};

function renderOnboardingStep(step) {
  document.querySelectorAll('.onboard-step').forEach(s => s.classList.remove('active'));
  const el = document.querySelector(`.onboard-step[data-step="${step}"]`);
  if (el) el.classList.add('active');
  document.querySelectorAll('.step-dot').forEach(d => {
    const n = parseInt(d.dataset.step);
    d.classList.toggle('active', n === step);
    d.classList.toggle('done', n < step);
  });
  document.getElementById('btnBack').style.display = step > 1 ? 'block' : 'none';
  document.getElementById('btnNext').textContent = step === 4 ? 'BEGIN ▶' : 'NEXT ▶';
  if (step === 4) buildConfirmData();
}

function buildConfirmData() {
  const name = document.getElementById('ob-name').value || 'Unknown';
  const age = document.getElementById('ob-age').value || '—';
  const gender = document.getElementById('ob-gender').value || '—';
  const height = document.getElementById('ob-height').value || '—';
  const weight = document.getElementById('ob-weight').value || '—';
  const activity = document.querySelector('input[name="activity"]:checked')?.value || '—';
  const fitness = document.querySelector('input[name="fitness"]:checked')?.value || '—';
  const goals = [...document.querySelectorAll('input[name="goals"]:checked')].map(g => g.value).join(', ') || '—';
  const freetime = document.querySelector('input[name="freetime"]:checked')?.value || '—';
  const cd = document.getElementById('confirmData');
  cd.innerHTML = [
    ['NAME', name], ['AGE', age], ['GENDER', gender],
    ['HEIGHT', height + ' cm'], ['WEIGHT', weight + ' kg'],
    ['ACTIVITY', activity], ['FITNESS', fitness],
    ['GOALS', goals], ['DAILY TIME', freetime]
  ].map(([l, v]) => `<div class="confirm-row"><span class="confirm-row-label">${l}</span><span class="confirm-row-val">${v}</span></div>`).join('');
}

window.onboardNext = function() {
  if (!validateStep(currentStep)) return;
  if (currentStep === 4) { completeOnboarding(); return; }
  currentStep++;
  renderOnboardingStep(currentStep);
};

window.onboardBack = function() {
  if (currentStep > 1) { currentStep--; renderOnboardingStep(currentStep); }
};

function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById('ob-name').value.trim();
    if (!name) { showToast('Enter your Hunter Name', 'error'); return false; }
    if (!document.getElementById('ob-age').value) { showToast('Enter your age', 'error'); return false; }
    if (!document.getElementById('ob-gender').value) { showToast('Select your gender', 'error'); return false; }
  }
  if (step === 2) {
    if (!document.getElementById('ob-height').value) { showToast('Enter your height', 'error'); return false; }
    if (!document.getElementById('ob-weight').value) { showToast('Enter your weight', 'error'); return false; }
    if (!document.querySelector('input[name="activity"]:checked')) { showToast('Select activity level', 'error'); return false; }
    if (!document.querySelector('input[name="fitness"]:checked')) { showToast('Select fitness level', 'error'); return false; }
  }
  if (step === 3) {
    const goals = document.querySelectorAll('input[name="goals"]:checked');
    if (goals.length === 0) { showToast('Select at least one goal', 'error'); return false; }
    if (!document.querySelector('input[name="freetime"]:checked')) { showToast('Select daily free time', 'error'); return false; }
  }
  if (step === 4) {
    if (!document.getElementById('ob-accept').checked) { showToast('You must accept the System terms', 'error'); return false; }
  }
  return true;
}

function completeOnboarding() {
  const goals = [...document.querySelectorAll('input[name="goals"]:checked')].map(g => g.value);
  STATE.hunter = {
    name: document.getElementById('ob-name').value.trim(),
    age: document.getElementById('ob-age').value,
    gender: document.getElementById('ob-gender').value,
    height: document.getElementById('ob-height').value,
    weight: document.getElementById('ob-weight').value,
    activity: document.querySelector('input[name="activity"]:checked')?.value,
    fitness: document.querySelector('input[name="fitness"]:checked')?.value,
    goals: goals,
    freetime: document.querySelector('input[name="freetime"]:checked')?.value,
    wakeup: document.getElementById('ob-wakeup').value,
    sleep: document.getElementById('ob-sleep').value,
  };
  STATE.stats = {};
  STATS_LIST.forEach(s => STATE.stats[s] = 5);
  STATE.rp = 0; STATE.theme = selectedTheme;
  saveState(); applyTheme(selectedTheme);
  showApp();
}

// ─── THEME ────────────────────────────────────────────────────────────────────

function applyTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  document.body.classList.toggle('light-mode', theme === 'light');
  const themeColor = theme === 'dark' ? '#0a0a0a' : '#f5f5f5';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
}

window.toggleTheme = function() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  applyTheme(STATE.theme);
  saveState();
  document.querySelectorAll('.icon-btn').forEach(b => { if (b.textContent.trim() === '☀' || b.textContent.trim() === '🌙') b.textContent = STATE.theme === 'dark' ? '☀' : '🌙'; });
  showToast(STATE.theme === 'dark' ? 'DARK MODE ACTIVATED' : 'LIGHT MODE ACTIVATED');
};

// ─── TAB SYSTEM ───────────────────────────────────────────────────────────────

window.switchTab = function(tab) {
  STATE.activeTab = tab;
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const tc = document.getElementById('tab-' + tab);
  const nb = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
  if (tc) tc.classList.add('active');
  if (nb) nb.classList.add('active');
  if (tab === 'stats') { renderStats(); renderRankTable(); }
  if (tab === 'shop') { renderShop(); }
  if (tab === 'inventory') { renderInventory(); }
  if (tab === 'quests') { renderQuests(); }
};

// ─── QUEST GENERATION (AI) ────────────────────────────────────────────────────

async function generateDailyQuests() {
  const today = getTodayStr();
  if (STATE.lastQuestDate === today && STATE.quests.length > 0) {
    showToast('QUESTS ALREADY ASSIGNED FOR TODAY', 'error');
    return;
  }
  showLoadingModal('SYSTEM IS GENERATING YOUR MISSIONS...');
  try {
    const quests = await callAIForQuests();
    STATE.quests = quests;
    STATE.lastQuestDate = today;
    STATE.rpTodayEarned = 0;
    STATE.statsTodayGained = 0;
    STATE.questsCompleted = 0;
    saveState();
    closeModal();
    syncUI();
    renderQuests();
    switchTab('quests');
    showToast('MISSIONS ASSIGNED. BEGIN YOUR HUNT.', 'success');
  } catch(e) {
    closeModal();
    showToast('SYSTEM CONNECTION FAILED. RETRY.', 'error');
    console.error(e);
  }
}

async function callAIForQuests() {
  const h = STATE.hunter;
  const totalStats = getTotalStats();
  const rankName = getCurrentRank().name;
  const isChallengeDay = shouldAddChallengeQuest();

  const prompt = buildQuestPrompt(h, totalStats, rankName, isChallengeDay);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) throw new Error('API error: ' + response.status);
  const data = await response.json();
  const raw = data.content.map(c => c.text || '').join('');
  const clean = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);
  return parsed.quests;
}

function buildQuestPrompt(h, totalStats, rankName, isChallengeDay) {
  const activityMap = { sedentary:'Sedentary', light:'Light activity', moderate:'Moderate', active:'Very active', athlete:'Athlete-level' };
  const fitnessMap = { beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced' };
  const freetimeMap = { '30min':'under 30 minutes', '1hr':'about 1 hour', '2hr':'1-2 hours', '3hr+':'3+ hours' };
  const goalLabels = {
    lose_weight:'lose weight', build_muscle:'build muscle', study_more:'study and learn more',
    be_social:'improve social skills', discipline:'build discipline and habits',
    appearance:'improve appearance and grooming', mental_health:'improve mental clarity and wellness'
  };
  const goalsStr = (h.goals || []).map(g => goalLabels[g] || g).join(', ');
  const statStr = STATS_LIST.map(s => `${s}:${STATE.stats[s]}`).join(', ');

  return `You are the System from Solo Leveling — a cold, efficient, omniscient AI that assigns real-life improvement quests to hunters.

HUNTER PROFILE:
- Name: ${h.name}
- Age: ${h.age}, Gender: ${h.gender}
- Height: ${h.height}cm, Weight: ${h.weight}kg
- Activity Level: ${activityMap[h.activity] || h.activity}
- Fitness Level: ${fitnessMap[h.fitness] || h.fitness}
- Goals: ${goalsStr}
- Daily Free Time: ${freetimeMap[h.freetime] || h.freetime}
- Current Rank: ${rankName} (Total Stat Points: ${totalStats})
- Current Stats: ${statStr}

QUEST GENERATION RULES:
1. Generate exactly 8 daily quests, 1 special quest, 2 bonus quests${isChallengeDay ? ', and 1 challenging quest' : ''}.
2. Quests MUST be real-life actionable tasks calibrated to the hunter's actual fitness level and goals.
3. Quests scale in difficulty as hunter rank increases. Current rank is ${rankName}.
4. Each quest must target a specific stat from: ${STATS_LIST.join(', ')}.
5. Use a cold, commanding System voice for quest descriptions (no friendly tone).
6. Reward ranges: daily=10-50 RP + 1-5 stat, special=50-150 RP + 3-10 stat, bonus=40-120 RP + 2-8 stat${isChallengeDay ? ', challenging=150-500 RP + 10-25 stat' : ''}.
7. Map quests appropriately: fitness→Strength/Stamina/Speed/Durability, study→Intelligence/Wisdom, social→Charisma, discipline→Discipline, grooming/appearance→Appearance, movement→Agility/Dexterity.
8. Make quests specific and measurable (not vague). Include numbers/durations where possible.

Respond ONLY with valid JSON, no preamble, no markdown, exactly this structure:
{
  "quests": [
    {
      "id": "q1",
      "type": "daily",
      "name": "Quest name (max 6 words)",
      "description": "Cold system-voice description of exactly what to do. Be specific.",
      "stat": "StatName",
      "rp": 30,
      "statGain": 2,
      "completed": false
    }
  ]
}

Types: "daily" (×8), "special" (×1), "bonus" (×2)${isChallengeDay ? ', "challenging" (×1)' : ''}.`;
}

function shouldAddChallengeQuest() {
  const today = new Date().toDateString();
  const dayNum = Math.floor(new Date() / (1000 * 60 * 60 * 24));
  return dayNum % 2 === 0;
}

// ─── QUEST COMPLETION ─────────────────────────────────────────────────────────

window.completeQuest = function(questId) {
  const quest = STATE.quests.find(q => q.id === questId);
  if (!quest || quest.completed) return;
  quest.completed = true;

  let rpGain = quest.rp;
  let statGain = quest.statGain;

  // Apply active item effects
  if (STATE.activeEffects?.doubleRewards) { rpGain *= 2; statGain *= 2; }
  if (STATE.activeEffects?.taskBooster) { rpGain *= 2; statGain *= 2; STATE.activeEffects.taskBooster = false; }

  STATE.rp += rpGain;
  STATE.stats[quest.stat] = (STATE.stats[quest.stat] || 5) + statGain;
  STATE.rpTodayEarned += rpGain;
  STATE.statsTodayGained += statGain;
  STATE.questsCompleted++;

  // Check bonus chest (10% base chance, increases with rank)
  const chestChance = 0.10 + (getTotalStats() / 10000);
  let bonusChest = null;
  if (Math.random() < chestChance || STATE.activeEffects?.guaranteeChest) {
    bonusChest = generateBonusChest();
    STATE.bonusChests.push(bonusChest);
    if (STATE.activeEffects?.guaranteeChest) STATE.activeEffects.guaranteeChest = false;
  }

  saveState();
  syncUI();
  renderQuests();
  showQuestCompleteModal(quest, rpGain, statGain, bonusChest);
};

function generateBonusChest() {
  return { id: 'chest_' + Date.now(), reward: CHEST_REWARDS[Math.floor(Math.random() * CHEST_REWARDS.length)] };
}

window.openChest = function(chestId) {
  const idx = STATE.bonusChests.findIndex(c => c.id === chestId);
  if (idx === -1) return;
  const chest = STATE.bonusChests.splice(idx, 1)[0];
  const r = chest.reward;

  if (r.type === 'rp') { STATE.rp += r.amount; }
  else if (r.type === 'stat') {
    const stat = STATS_LIST[Math.floor(Math.random() * STATS_LIST.length)];
    STATE.stats[stat] = (STATE.stats[stat] || 5) + r.amount;
  }
  else if (r.type === 'multi_stat') {
    for (let i = 0; i < 2; i++) {
      const stat = STATS_LIST[Math.floor(Math.random() * STATS_LIST.length)];
      STATE.stats[stat] = (STATE.stats[stat] || 5) + r.amount;
    }
  }
  else if (r.type === 'item') {
    addToInventory(r.itemId, 1);
  }

  saveState(); syncUI();
  showChestModal(r);
};

// ─── SHOP ─────────────────────────────────────────────────────────────────────

function renderShop() {
  const grid = document.getElementById('shopGrid');
  document.getElementById('shopRP').textContent = STATE.rp;
  grid.innerHTML = SHOP_ITEMS.map(item => `
    <div class="shop-item">
      <div class="shop-item-icon">${item.icon}</div>
      <div class="shop-item-name">${item.name}</div>
      <div class="shop-item-effect">${item.effect}</div>
      <div class="shop-item-cost">
        <span class="shop-item-cost-icon">◆</span> ${item.cost}
      </div>
      <button class="btn-buy" onclick="purchaseItem('${item.id}')" ${STATE.rp < item.cost ? 'disabled' : ''}>
        ${STATE.rp >= item.cost ? 'PURCHASE' : 'INSUFFICIENT RP'}
      </button>
    </div>
  `).join('');
}

window.purchaseItem = function(itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  if (STATE.rp < item.cost) { showToast('INSUFFICIENT RP', 'error'); return; }
  STATE.rp -= item.cost;
  addToInventory(itemId, 1);
  saveState(); syncUI(); renderShop(); renderInventory();
  showToast(`${item.name} ACQUIRED`, 'gold');
};

// ─── INVENTORY ────────────────────────────────────────────────────────────────

function addToInventory(itemId, qty) {
  const existing = STATE.inventory.find(i => i.id === itemId);
  if (existing) existing.qty += qty;
  else STATE.inventory.push({ id: itemId, qty });
}

function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  if (!STATE.inventory.length) {
    grid.innerHTML = `<div class="empty-inventory"><div class="empty-icon">▣</div><div>NO ITEMS IN INVENTORY</div><div class="empty-sub">Purchase items from the Shop</div></div>`;
    return;
  }
  grid.innerHTML = STATE.inventory.map(inv => {
    const item = SHOP_ITEMS.find(i => i.id === inv.id);
    if (!item) return '';
    return `
      <div class="inv-item">
        <div class="inv-item-qty">${inv.qty}</div>
        <div class="inv-item-icon">${item.icon}</div>
        <div class="inv-item-name">${item.name}</div>
        <button class="btn-use-inv" onclick="useItem('${inv.id}')">USE</button>
      </div>
    `;
  }).join('');
}

window.useItem = function(itemId) {
  const invItem = STATE.inventory.find(i => i.id === itemId);
  if (!invItem || invItem.qty <= 0) return;
  const shopItem = SHOP_ITEMS.find(i => i.id === itemId);
  if (!shopItem) return;

  if (!STATE.activeEffects) STATE.activeEffects = {};

  switch(itemId) {
    case 'skip_quest': skipOneRandomQuest(); break;
    case 'cheat_day':
    case 'skip_day': skipAllQuests(); break;
    case 'half_day': activateHalfDay(); break;
    case 'double_rp':
    case 'rp_multiplier': STATE.activeEffects.doubleRewards = true; showToast('DOUBLE RP ACTIVATED'); break;
    case 'hard_work': STATE.activeEffects.doubleRewards = true; showToast('HARD WORK MODE: 2X REWARDS'); break;
    case 'task_booster': STATE.activeEffects.taskBooster = true; showToast('TASK BOOSTER READY'); break;
    case 'bonus_chest_key': STATE.activeEffects.guaranteeChest = true; showToast('NEXT QUEST GUARANTEES A CHEST', 'gold'); break;
    case 'refresh_quests': STATE.quests = []; STATE.lastQuestDate = null; generateDailyQuests(); break;
    case 'swap_quest': swapRandomQuest(); break;
    case 'auto_complete': autoCompleteOneQuest(); break;
    default: showToast(shopItem.name + ' ACTIVATED'); break;
  }

  invItem.qty--;
  if (invItem.qty <= 0) STATE.inventory = STATE.inventory.filter(i => i.id !== itemId);
  saveState(); renderInventory(); syncUI();
};

function skipOneRandomQuest() {
  const pending = STATE.quests.filter(q => !q.completed && q.type === 'daily');
  if (pending.length === 0) { showToast('NO PENDING QUESTS TO SKIP', 'error'); return; }
  const q = pending[0]; q.completed = true; q.skipped = true;
  saveState(); renderQuests(); showToast('QUEST SKIPPED');
}

function skipAllQuests() {
  STATE.quests.forEach(q => { q.completed = true; q.skipped = true; });
  saveState(); renderQuests(); showToast('ALL QUESTS SKIPPED FOR TODAY');
}

function activateHalfDay() {
  const daily = STATE.quests.filter(q => q.type === 'daily' && !q.completed);
  const toSkip = daily.slice(4);
  toSkip.forEach(q => { q.completed = true; q.skipped = true; });
  saveState(); renderQuests(); showToast('HALF-DAY ACTIVATED: 4 QUESTS REMAIN');
}

function swapRandomQuest() {
  const pending = STATE.quests.filter(q => !q.completed && q.type === 'daily');
  if (!pending.length) { showToast('NO QUESTS TO SWAP', 'error'); return; }
  pending[0].name = 'Swapped Quest';
  pending[0].description = 'Complete 10 minutes of focused breathing and meditation.';
  saveState(); renderQuests(); showToast('QUEST SWAPPED');
}

function autoCompleteOneQuest() {
  const pending = STATE.quests.filter(q => !q.completed);
  if (!pending.length) { showToast('ALL QUESTS DONE', 'success'); return; }
  completeQuest(pending[0].id);
  showToast('AUTO-COMPLETE USED');
}

// ─── STATS RENDERING ──────────────────────────────────────────────────────────

function renderStats() {
  const grid = document.getElementById('statsGrid');
  if (!STATE.stats) return;
  grid.innerHTML = STATS_LIST.map(stat => {
    const val = STATE.stats[stat] || 5;
    const maxForBar = Math.max(50, val + 20);
    const pct = Math.min(100, (val / maxForBar) * 100);
    return `
      <div class="stat-row">
        <div class="stat-name-col">
          <span style="color:${STAT_COLORS[stat]}">${STAT_ICONS[stat]}</span>
          <span class="stat-name"> ${stat}</span>
        </div>
        <div class="stat-bar-col">
          <div class="stat-bar-track">
            <div class="stat-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${STAT_COLORS[stat]}88,${STAT_COLORS[stat]})"></div>
          </div>
        </div>
        <div class="stat-val-col" style="color:${STAT_COLORS[stat]}">${val}</div>
      </div>`;
  }).join('');
}

function renderRankTable() {
  const total = getTotalStats();
  const rt = document.getElementById('rankTable');
  rt.innerHTML = RANKS.map(r => {
    const achieved = total >= r.max;
    const current = total >= r.min && total <= r.max;
    let cls = ''; let badge = '';
    if (current) { cls = 'current'; badge = '<span class="rank-status-badge current">CURRENT</span>'; }
    else if (achieved) { cls = 'achieved'; badge = '<span class="rank-status-badge achieved">✓</span>'; }
    else { badge = '<span class="rank-status-badge locked">LOCKED</span>'; }
    return `<div class="rank-row ${cls}">
      <span class="rank-name">${r.name}</span>
      <span class="rank-req">${r.min}+ pts</span>
      ${badge}
    </div>`;
  }).join('');
}

function renderMiniStats() {
  const grid = document.getElementById('miniStats');
  if (!STATE.stats) return;
  grid.innerHTML = STATS_LIST.map(s => `
    <div class="mini-stat-item">
      <span class="mini-stat-name">${STAT_ICONS[s]} ${s}</span>
      <span class="mini-stat-val">${STATE.stats[s] || 5}</span>
    </div>`).join('');
}

// ─── QUEST RENDERING ──────────────────────────────────────────────────────────

function renderQuests() {
  const list = document.getElementById('questList');
  const filter = STATE.activeFilter;
  if (!STATE.quests.length) {
    list.innerHTML = `<div class="no-quests"><div class="no-quest-icon">◈</div><div class="no-quest-text">NO MISSIONS ASSIGNED</div><div class="no-quest-sub">Return to STATUS and generate today's quests</div></div>`;
    return;
  }
  let filtered = STATE.quests;
  if (filter !== 'all') filtered = STATE.quests.filter(q => q.type === filter);
  if (!filtered.length) {
    list.innerHTML = `<div class="no-quests"><div class="no-quest-icon">◈</div><div class="no-quest-text">NO ${filter.toUpperCase()} QUESTS</div></div>`;
    return;
  }
  list.innerHTML = filtered.map(q => questCard(q)).join('');
  const now = new Date();
  document.getElementById('questDate').textContent = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }).toUpperCase();
}

function questCard(q) {
  const typeColors = { daily:'daily', special:'special', bonus:'bonus', challenging:'challenging' };
  const typeBadge = typeColors[q.type] || 'daily';
  const statColor = STAT_COLORS[q.stat] || 'var(--accent)';
  return `
    <div class="quest-card ${q.completed ? 'completed' : ''} ${q.type === 'challenging' ? 'challenging' : ''} ${q.type === 'special' ? 'special' : ''}">
      <div class="quest-type-bar ${q.type}"></div>
      <div class="quest-header-row">
        <span class="quest-type-badge ${typeBadge}">${q.type.toUpperCase()}</span>
        <div class="quest-rewards-mini">
          <span class="qr-rp">◆ ${q.rp} RP</span>
          <span class="qr-stat">+${q.statGain} ${q.stat}</span>
        </div>
      </div>
      <div class="quest-name">${q.name}</div>
      <div class="quest-desc">${q.description}</div>
      <div class="quest-stat-tag"><div class="stat-dot" style="background:${statColor}"></div>${STAT_ICONS[q.stat] || ''} ${q.stat}</div>
      <div class="quest-actions">
        <button class="btn-complete" onclick="completeQuest('${q.id}')" ${q.completed ? 'disabled' : ''}>
          ${q.completed ? (q.skipped ? '— SKIPPED' : '✓ COMPLETE') : 'MARK COMPLETE'}
        </button>
      </div>
    </div>`;
}

window.filterQuests = function(f) {
  STATE.activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderQuests();
};

// ─── RANK & STATS HELPERS ─────────────────────────────────────────────────────

function getTotalStats() {
  if (!STATE.stats) return 55;
  return Object.values(STATE.stats).reduce((a, b) => a + b, 0);
}

function getCurrentRank() {
  const total = getTotalStats();
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (total >= RANKS[i].min) return RANKS[i];
  }
  return RANKS[0];
}

function getNextRank() {
  const total = getTotalStats();
  for (let i = 0; i < RANKS.length; i++) {
    if (total < RANKS[i].min) return RANKS[i];
  }
  return null;
}

// ─── SYNC UI ──────────────────────────────────────────────────────────────────

function syncUI() {
  if (!STATE.hunter) return;
  const rank = getCurrentRank();
  const total = getTotalStats();
  const next = getNextRank();
  const name = STATE.hunter.name.toUpperCase();

  // Header
  document.getElementById('headerName').textContent = name;
  document.getElementById('headerRank').textContent = rank.short;
  document.getElementById('headerRankLabel').textContent = rank.name.toUpperCase();
  document.getElementById('headerRP').textContent = STATE.rp;
  document.getElementById('shopRP').textContent = STATE.rp;

  // Dashboard
  document.getElementById('dcRank').textContent = rank.name.toUpperCase();
  document.getElementById('dcName').textContent = name;
  document.getElementById('dcTotalStats').textContent = total;
  document.getElementById('dcRP').textContent = STATE.rp;
  document.getElementById('dcStreak').textContent = STATE.streak;

  // Rank progress
  document.getElementById('rpCurrentRank').textContent = rank.name.toUpperCase();
  if (next) {
    document.getElementById('rpNextRank').textContent = next.name.toUpperCase();
    const pct = ((total - rank.min) / (next.min - rank.min)) * 100;
    document.getElementById('rankBarFill').style.width = Math.min(100, pct) + '%';
    document.getElementById('rankProgressText').textContent = `${total} / ${next.min} stat points`;
  } else {
    document.getElementById('rpNextRank').textContent = 'MAX';
    document.getElementById('rankBarFill').style.width = '100%';
    document.getElementById('rankProgressText').textContent = `${total} — DEMI GOD ACHIEVED`;
  }

  // Mission summary
  const completed = STATE.quests.filter(q => q.completed && !q.skipped).length;
  document.getElementById('dcQuestDone').textContent = completed;
  document.getElementById('dcQuestTotal').textContent = STATE.quests.length;
  document.getElementById('dcRPToday').textContent = STATE.rpTodayEarned;
  document.getElementById('dcStatToday').textContent = STATE.statsTodayGained;

  // Mini stats
  renderMiniStats();

  // Settings
  document.getElementById('settingName').textContent = name;

  // Bonus chests
  const chestArea = document.getElementById('bonusChestArea');
  if (STATE.bonusChests.length > 0) {
    chestArea.style.display = 'block';
    document.getElementById('chestList').innerHTML = STATE.bonusChests.map(c => `
      <div class="chest-item" onclick="openChest('${c.id}')">
        <div class="chest-icon">⬡</div>
        <div class="chest-label">BONUS CHEST</div>
      </div>`).join('');
  } else {
    chestArea.style.display = 'none';
  }

  // Generate btn text
  const today = getTodayStr();
  if (STATE.lastQuestDate === today && STATE.quests.length > 0) {
    document.getElementById('btnGenerate').querySelector('.btn-gen-text').textContent = 'MISSIONS ASSIGNED TODAY';
    document.getElementById('btnGenerate').querySelector('.btn-gen-sub').textContent = 'Go to QUESTS tab to view missions';
  } else {
    document.getElementById('btnGenerate').querySelector('.btn-gen-text').textContent = 'GENERATE TODAY\'S QUESTS';
    document.getElementById('btnGenerate').querySelector('.btn-gen-sub').textContent = 'AI-powered mission assignment';
  }
}

// ─── DAILY RESET & PENALTY ────────────────────────────────────────────────────

function checkDailyReset() {
  const today = getTodayStr();
  if (STATE.lastQuestDate && STATE.lastQuestDate !== today) {
    // New day — check if any quests were completed yesterday
    const completedYesterday = STATE.quests.filter(q => q.completed && !q.skipped).length > 0;
    if (completedYesterday) {
      STATE.streak++;
      STATE.penaltyDays = 0;
    } else {
      STATE.penaltyDays++;
    }
    STATE.rpTodayEarned = 0;
    STATE.statsTodayGained = 0;
    STATE.questsCompleted = 0;
    saveState();
  }
}

function checkPenalty() {
  if (STATE.penaltyDays >= 2) {
    const rpLoss = Math.floor(STATE.rp * 0.15);
    STATE.rp = Math.max(0, STATE.rp - rpLoss);
    STATS_LIST.forEach(s => {
      STATE.stats[s] = Math.max(1, (STATE.stats[s] || 5) - 2);
    });
    STATE.penaltyDays = 0;
    saveState();
    showPenaltyModal(rpLoss);
  }
}

// ─── MODALS ───────────────────────────────────────────────────────────────────

function showQuestCompleteModal(quest, rp, stat, bonusChest) {
  document.getElementById('mqName').textContent = quest.name;
  document.getElementById('mqRP').textContent = '+' + rp + ' RP';
  document.getElementById('mqStat').textContent = '+' + stat;
  document.getElementById('mqStatType').textContent = quest.stat;
  const bonusEl = document.getElementById('mqBonus');
  bonusEl.style.display = bonusChest ? 'block' : 'none';
  showModal('modalQuestComplete');
}

function showChestModal(reward) {
  document.getElementById('chestRewardName').textContent = reward.name;
  document.getElementById('chestRewardVal').textContent = reward.value;
  showModal('modalChest');
}

function showLoadingModal(msg) {
  document.getElementById('loadingMsg').textContent = msg || 'Processing...';
  showModal('modalLoading');
}

function showPenaltyModal(rpLoss) {
  const details = document.getElementById('penaltyDetails');
  details.innerHTML = `
    <div class="reward-row"><span class="reward-label">RP LOST</span><span class="reward-val" style="color:var(--danger)">-${rpLoss}</span></div>
    <div class="reward-row"><span class="reward-label">ALL STATS</span><span class="reward-val" style="color:var(--danger)">-2 EACH</span></div>
  `;
  showModal('modalPenalty');
}

function showModal(id) {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById(id).classList.add('active');
}

window.closeModal = function() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
};

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

window.showSettings = function() { document.getElementById('settingsPanel').classList.add('open'); };
window.hideSettings = function() { document.getElementById('settingsPanel').classList.remove('open'); };

window.confirmReset = function() {
  if (confirm('RESET ALL PROGRESS? This cannot be undone.')) {
    localStorage.removeItem('soloLevelingState');
    location.reload();
  }
};

// ─── TOAST ────────────────────────────────────────────────────────────────────

function showToast(msg, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─── PERSISTENCE ─────────────────────────────────────────────────────────────

function saveState() {
  try { localStorage.setItem('soloLevelingState', JSON.stringify(STATE)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('soloLevelingState');
    if (raw) STATE = { ...STATE, ...JSON.parse(raw) };
  } catch(e) {}
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}
