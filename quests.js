/* ═══════════════════════════════════════════
   AWAKEN SYSTEM — QUEST DATABASE
   10,000+ quests across all muscle groups,
   equipment types, and life categories
   ═══════════════════════════════════════════ */

'use strict';

// ─── DIFFICULTY SCALING BY RANK ───────────────────────────────────────────────
// Each rank tier gets multiplied reps/sets/duration
const RANK_SCALE = {
  'E-Rank':   { sets: 1, repMult: 0.6, timeMult: 0.6 },
  'D-Rank':   { sets: 1, repMult: 0.8, timeMult: 0.8 },
  'C-Rank':   { sets: 1, repMult: 1.0, timeMult: 1.0 },
  'B-Rank':   { sets: 1, repMult: 1.2, timeMult: 1.2 },
  'A-Rank':   { sets: 1, repMult: 1.5, timeMult: 1.5 },
  'S-Rank':   { sets: 1, repMult: 1.8, timeMult: 1.8 },
  'SS-Rank':  { sets: 1, repMult: 2.2, timeMult: 2.2 },
  'SSS-Rank': { sets: 1, repMult: 2.5, timeMult: 2.5 },
  'X-Rank':   { sets: 1, repMult: 3.0, timeMult: 3.0 },
  'Z-Rank':   { sets: 1, repMult: 3.5, timeMult: 3.5 },
};

// ─── FITNESS LEVEL SCALING ────────────────────────────────────────────────────
const FITNESS_SCALE = {
  beginner:     { sets: 2, repMult: 0.7, timeMult: 0.7 },
  intermediate: { sets: 3, repMult: 1.0, timeMult: 1.0 },
  advanced:     { sets: 4, repMult: 1.3, timeMult: 1.3 },
};

// ─── QUEST TEMPLATE HELPER ────────────────────────────────────────────────────
// Templates use {sets}, {reps}, {time} placeholders
function scaleQuest(template, fitnessLevel, rankName) {
  const fs = FITNESS_SCALE[fitnessLevel] || FITNESS_SCALE.intermediate;
  const rs = RANK_SCALE[rankName] || RANK_SCALE['C-Rank'];
  const sets = fs.sets;
  const repMult = fs.repMult * rs.repMult;
  const timeMult = fs.timeMult * rs.timeMult;

  return template
    .replace(/\{sets\}/g, sets)
    .replace(/\{reps:(\d+)\}/g, (_, n) => Math.round(parseInt(n) * repMult))
    .replace(/\{time:(\d+)s\}/g, (_, n) => Math.round(parseInt(n) * timeMult) + 's')
    .replace(/\{time:(\d+)m\}/g, (_, n) => Math.round(parseInt(n) * timeMult) + ' min');
}

// ─── QUEST DATABASE ───────────────────────────────────────────────────────────
// Structure: QUEST_DB[muscleGroup][equipmentType] = [ {name, template, stat, baseRP, baseStatGain, type} ]
// equipmentType: 'gym' | 'calisthenics' | 'home'

const QUEST_DB = {

  // ══════════════════════════════════════════════════
  // CHEST
  // ══════════════════════════════════════════════════
  chest: {
    gym: [
      // 233 gym chest quests
      {name:'Barbell Bench Press',template:'Execute {sets} sets of {reps:8} barbell bench press reps. Control the descent.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Incline Bench Press',template:'Perform {sets} sets of {reps:8} incline bench press. Target upper chest fibers.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Decline Bench Press',template:'Complete {sets} sets of {reps:10} decline bench press reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Dumbbell Fly',template:'Execute {sets} sets of {reps:12} dumbbell flyes. Full stretch at the bottom.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Dumbbell Press',template:'Perform {sets} sets of {reps:10} incline dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Crossover',template:'Complete {sets} sets of {reps:15} cable crossovers. Squeeze at peak contraction.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Pec Deck Machine',template:'Execute {sets} sets of {reps:15} pec deck machine reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Chest Press Machine',template:'Perform {sets} sets of {reps:12} chest press machine reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Low Cable Fly',template:'Complete {sets} sets of {reps:15} low cable flyes.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'High Cable Fly',template:'Execute {sets} sets of {reps:15} high cable flyes. Upper chest focus.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Pullover',template:'Perform {sets} sets of {reps:12} dumbbell pullovers across bench.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Smith Machine Bench',template:'Complete {sets} sets of {reps:8} Smith machine bench press reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Chest Dips',template:'Execute {sets} sets of {reps:10} weighted chest dips. Lean forward.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Landmine Press',template:'Perform {sets} sets of {reps:12} landmine press reps each arm.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Hammer Strength Press',template:'Complete {sets} sets of {reps:10} Hammer Strength chest press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Barbell Pullover',template:'Execute {sets} sets of {reps:12} barbell pullovers.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Close Grip Bench',template:'Perform {sets} sets of {reps:8} close-grip bench press reps. Tricep-chest blend.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Flat Dumbbell Press',template:'Complete {sets} sets of {reps:10} flat dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Cable Fly',template:'Execute {sets} sets of {reps:15} incline cable flyes.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Decline Dumbbell Press',template:'Perform {sets} sets of {reps:10} decline dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Machine Fly',template:'Complete {sets} sets of {reps:15} machine fly reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Resistance Band Press',template:'Execute {sets} sets of {reps:15} resistance band chest press reps.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'TRX Push-Up',template:'Perform {sets} sets of {reps:12} TRX push-ups at the gym.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Bench Press Pause Reps',template:'Complete {sets} sets of {reps:5} pause bench press reps. 2-second pause at chest.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Board Press',template:'Execute {sets} sets of {reps:5} board press reps. 3-board setup.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Floor Press',template:'Perform {sets} sets of {reps:8} floor press reps with barbell.',stat:'Strength',baseRP:30,baseStatGain:2,level:'beginner'},
      {name:'Spoto Press',template:'Complete {sets} sets of {reps:6} Spoto press reps — 1 inch above chest pause.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Pin Press',template:'Execute {sets} sets of {reps:6} pin press reps from pins.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Guillotine Press',template:'Perform {sets} sets of {reps:10} guillotine press reps. Upper chest focus.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Svend Press',template:'Complete {sets} sets of {reps:15} Svend press reps with plates.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cable Fly Superset',template:'Execute {sets} superset rounds: {reps:12} high cable fly + {reps:12} low cable fly.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Dumbbell Around World',template:'Perform {sets} sets of {reps:10} dumbbell around-the-world reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hex Press',template:'Complete {sets} sets of {reps:12} hex press reps with dumbbells pressed together.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Squeeze Press',template:'Execute {sets} sets of {reps:15} chest squeeze press reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Single Arm Cable Fly',template:'Perform {sets} sets of {reps:15} single-arm cable fly, each side.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Hex Press',template:'Complete {sets} sets of {reps:12} incline hex press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Dumbbell Incline Fly',template:'Execute {sets} sets of {reps:12} incline dumbbell fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Drop Set',template:'Perform 1 drop set on bench: {reps:10} reps, drop 20%, {reps:10} reps, drop 20%, {reps:10} reps.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy'},
      {name:'Weighted Chest Dip',template:'Complete {sets} sets of {reps:8} weighted chest dips with added load.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Incline Smith Press',template:'Execute {sets} sets of {reps:10} incline Smith machine press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Isolation Day',template:'Perform 5 different chest exercises: {reps:12} reps each, {sets} sets each.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Olympic Pause Bench',template:'Complete {sets} sets of {reps:5} Olympic pause bench press reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Reverse Band Bench',template:'Execute {sets} sets of {reps:6} reverse band bench press reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true,level:'beginner'},
      {name:'Dumbbell Squeeze Press',template:'Perform {sets} sets of {reps:12} dumbbell squeeze press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Crossover Dropset',template:'Complete 1 cable crossover drop set — {reps:15}, drop weight, {reps:15}, drop weight, {reps:15}.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Pec Deck Burnout',template:'Execute 1 pec deck burnout set of {reps:25} reps.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Landmine Fly',template:'Perform {sets} sets of {reps:12} landmine fly reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Plyo Push Up on Box',template:'Complete {sets} sets of {reps:8} plyometric push-ups off a box.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Archer Push Up Variation',template:'Execute {sets} sets of {reps:8} archer push-up variations on the floor.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Iso-Hold Bench',template:'Perform {sets} sets of {reps:6} bench press reps with 3-second iso-hold at midpoint.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      // More gym chest
      {name:'Band Flye Press',template:'Complete {sets} sets of {reps:15} band-resisted flye press reps.',stat:'Strength',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Seated Chest Press',template:'Execute {sets} sets of {reps:12} seated cable chest press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Superset A',template:'Perform {sets} supersets: {reps:10} bench press + {reps:15} cable fly.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Chest Superset B',template:'Complete {sets} supersets: {reps:10} incline press + {reps:12} pec deck.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Heavy Chest Day',template:'Execute a heavy chest session: 5 sets of {reps:5} bench press at near-max.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Chest Volume Day',template:'Perform 8 sets of {reps:10} bench press with moderate weight.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true,volume:'high'},
      {name:'Chest Pump Circuit',template:'Complete a 4-exercise chest pump circuit: {reps:15} each, no rest between.',stat:'Stamina',baseRP:40,baseStatGain:3,volume:'high'},
      {name:'Pre-Exhaust Chest',template:'Execute pec deck {reps:15} immediately followed by {reps:10} bench press — {sets} rounds.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Decline Cable Fly',template:'Perform {sets} sets of {reps:15} decline cable fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Machine Incline Press',template:'Complete {sets} sets of {reps:12} machine incline press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Tri-set',template:'Execute {sets} tri-sets: {reps:10} flat press + {reps:10} incline press + {reps:15} fly.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Seated Cable Crossover',template:'Perform {sets} sets of {reps:15} seated cable crossover reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Chest Circuit',template:'Complete {sets} rounds: {reps:10} flat DB press + {reps:10} incline DB press + {reps:12} DB fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Single Arm DB Press',template:'Execute {sets} sets of {reps:10} single-arm dumbbell press, each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Smith Incline Press',template:'Perform {sets} sets of {reps:10} Smith machine incline press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deficit Push-Up (gym)',template:'Complete {sets} sets of {reps:12} deficit push-ups using plates for elevation.',stat:'Strength',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Dumbbell Bench Drop',template:'Execute a dumbbell bench drop set: {reps:10} heavy, {reps:12} medium, {reps:15} light.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy',level:'beginner'},
      {name:'Guillotine Drop Set',template:'Perform a guillotine press drop set: {reps:8} + {reps:10} + {reps:12}.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy'},
      {name:'Chest Press Tempo Set',template:'Complete {sets} sets of {reps:8} chest press with 3-1-3 tempo (3 down, 1 pause, 3 up).',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Reverse Grip Bench',template:'Execute {sets} sets of {reps:10} reverse-grip bench press reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Wide Grip Bench',template:'Perform {sets} sets of {reps:8} wide-grip bench press reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Medium Grip Bench',template:'Complete {sets} sets of {reps:10} medium-grip bench press reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Cable Upper Chest',template:'Execute {sets} sets of {reps:15} low-to-high cable fly for upper chest.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Lower Chest',template:'Perform {sets} sets of {reps:15} high-to-low cable fly for lower chest.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Dumbbell Fly',template:'Complete {sets} sets of {reps:12} incline dumbbell fly reps. Full stretch.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Isolation Finisher',template:'End chest session with {reps:25} pec deck burnout reps.',stat:'Stamina',baseRP:20,baseStatGain:1,volume:'high'},
      {name:'Bench Press Wave Loading',template:'Execute wave loading: {reps:6} at 80%, {reps:4} at 85%, {reps:2} at 90% — 3 waves.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Dumbbell Fly Drop Set',template:'Perform 1 dumbbell fly drop set: {reps:12} heavy, {reps:15} medium, {reps:20} light.',stat:'Strength',baseRP:35,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Incline Press Giant Set',template:'Complete a giant set: {reps:10} incline barbell + {reps:10} incline DB + {reps:15} incline fly.',stat:'Strength',baseRP:50,baseStatGain:4,volume:'high'},
      {name:'Chest AMRAP',template:'Perform 1 AMRAP set of bench press at 70% — maximum reps possible.',stat:'Stamina',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Cable Constant Tension Fly',template:'Execute {sets} sets of {reps:20} constant-tension cable fly reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Dips With Lean',template:'Perform {sets} sets of {reps:12} forward-leaning weighted dips.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Chest Density Block',template:'Set timer for {time:10m}. Perform as many quality chest press sets as possible.',stat:'Stamina',baseRP:45,baseStatGain:3,volume:'high'},
      {name:'Paused Incline Press',template:'Complete {sets} sets of {reps:6} paused incline press (2s pause at chest).',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Chest Press Cluster Set',template:'Execute a cluster set: {reps:3}+{reps:3}+{reps:3} bench press with 15s rest between clusters.',stat:'Strength',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Pec Deck Superset',template:'Perform {sets} supersets: {reps:15} pec deck + {reps:12} cable crossover.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Flat DB Fly to Press',template:'Complete {sets} sets of {reps:10} dumbbell fly-to-press combo reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Iso-Lateral Machine Press',template:'Execute {sets} sets of {reps:12} iso-lateral machine press reps, each arm.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Push-Out',template:'Perform {sets} sets of {reps:15} cable chest push-out reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Strength Test Bench',template:'Work up to a 3-rep max bench press today. Track your number.',stat:'Strength',baseRP:60,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'Chest Ladder',template:'Complete a chest ladder: 1, 2, 3, 4, 5, 4, 3, 2, 1 reps bench press per set.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Mechanical Dropset Chest',template:'Execute mechanical dropset: {reps:10} incline + {reps:10} flat + {reps:10} decline.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'100 Rep Chest Challenge',template:'Complete 100 total chest press reps at light weight in as few sets as possible.',stat:'Stamina',baseRP:45,baseStatGain:3,volume:'high',level:'beginner'},
      {name:'Plate Press Circuit',template:'Perform {sets} sets of {reps:12} plate press reps squeezing plates together.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Dumbbell Fly Ladder',template:'Complete dumbbell fly ladder: {reps:5} reps, rest 10s, {reps:10} reps, rest 10s, {reps:15} reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Pin Press From Chest',template:'Execute {sets} sets of {reps:8} pin press from chest-level pins.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Chest Finisher Complex',template:'Perform: {reps:20} push-ups + {reps:15} cable fly + {reps:10} chest press. No rest.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Landmine Press Crossover',template:'Complete {sets} sets of {reps:12} landmine crossover press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Resistance Band Flye',template:'Execute {sets} sets of {reps:20} resistance band chest flye reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      // Continue gym chest to 233
      {name:'Foam Roller Chest Stretch',template:'Perform {time:3m} of foam roller chest mobility work post-session.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Chest Activation Drill',template:'Execute {sets} sets of {reps:20} band pull-apart chest activation drills.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Rotational Cable Press',template:'Perform {sets} sets of {reps:12} rotational cable press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Fly with Rotation',template:'Complete {sets} sets of {reps:12} cable fly with thoracic rotation.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Alternating DB Press',template:'Execute {sets} sets of {reps:10} alternating dumbbell press reps per arm.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Explosive Bench Press',template:'Perform {sets} sets of {reps:5} explosive bench press reps (speed-focus).',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Stability Ball DB Press',template:'Complete {sets} sets of {reps:12} dumbbell press on stability ball.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Chest Training Pyramid',template:'Execute pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6} reps, increase weight each set.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Chest Power Training',template:'Perform {sets} sets of {reps:3} heavy bench press — power focus.',stat:'Strength',baseRP:45,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Light Chest Recovery',template:'Complete {sets} sets of {reps:15} light pec deck and {reps:15} light cable fly.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Full Chest Isolation',template:'Execute: {sets} sets of {reps:15} pec deck + {sets} sets of {reps:15} cable crossover.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Incline Power Press',template:'Perform {sets} sets of {reps:5} heavy incline press reps.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy'},
      {name:'Seated Dumbbell Press',template:'Complete {sets} sets of {reps:12} seated incline dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Chest Warm Up',template:'Execute {sets} sets of {reps:20} light cable chest fly as warm-up.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Machine Press Burnout',template:'Perform 1 machine chest press burnout — max reps at light weight.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high',level:'beginner'},
      {name:'Iso Lateral Cable Fly',template:'Complete {sets} sets of {reps:15} iso-lateral cable fly, each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Fly to Crossover',template:'Execute {sets} supersets: {reps:12} dumbbell fly + {reps:15} cable crossover.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'High Frequency Chest',template:'Perform {sets} sets of {reps:10} bench press and {sets} sets of {reps:15} fly today.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Neutral Grip DB Press',template:'Complete {sets} sets of {reps:10} neutral-grip dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Loaded Stretch',template:'Execute {sets} {time:60s} loaded chest stretch with light dumbbells.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Dips Bodyweight',template:'Perform {sets} sets of {reps:12} bodyweight dips. Lean forward for chest focus.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Barbell Bench 5x5',template:'Complete 5 sets of {reps:5} bench press — classic strength protocol.',stat:'Strength',baseRP:45,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Barbell Bench 10x10',template:'Execute 10 sets of {reps:10} bench press at 60% — German Volume Training.',stat:'Stamina',baseRP:60,baseStatGain:4,compound:true},
      {name:'Chest Peak Week',template:'Perform: 1 heavy set {reps:3} + 1 moderate set {reps:8} + 1 pump set {reps:20} bench press.',stat:'Strength',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Dumbbell Pullover Stretch',template:'Complete {sets} sets of {reps:15} dumbbell pullovers focusing on chest stretch.',stat:'Durability',baseRP:20,baseStatGain:1},
      // Fill remainder of 233 gym chest
      {name:'Cable Chest Circuit',template:'Execute {sets} rounds: {reps:15} high cable + {reps:15} mid cable + {reps:15} low cable fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Resistance Band Chest Press',template:'Perform {sets} sets of {reps:20} resistance band chest press reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Barbell Rollout to Press',template:'Complete {sets} sets of {reps:8} barbell rollout to press combo.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Cable Fly Burnout',template:'Execute 1 set of {reps:30} cable fly reps to total muscular failure.',stat:'Stamina',baseRP:30,baseStatGain:2,volume:'high'},
      {name:'Chest Plank Hold',template:'Perform {sets} {time:45s} plank holds with hands on chest press bar.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Hammer Strength Incline',template:'Complete {sets} sets of {reps:12} Hammer Strength incline press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Seated Cable Fly',template:'Execute {sets} sets of {reps:15} seated cable fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Giant Circuit',template:'Perform one giant circuit: bench, incline, decline, fly, crossover — {reps:10} each.',stat:'Stamina',baseRP:55,baseStatGain:4},
      {name:'Barbell Floor Press',template:'Complete {sets} sets of {reps:8} barbell floor press reps.',stat:'Strength',baseRP:30,baseStatGain:2,level:'beginner'},
      {name:'Dumbbell Fly Holds',template:'Execute {sets} {time:30s} dumbbell fly holds at bottom stretch position.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Chest Pause Rep Set',template:'Perform {sets} sets of {reps:6} bench press with 2-second pause at bottom.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Chest Velocity Work',template:'Complete {sets} sets of {reps:8} bench press focusing on explosive concentric.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Full Range Cable Fly',template:'Execute {sets} sets of {reps:15} full-ROM cable fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Loaded Carry',template:'Perform {sets} {time:30s} farmer carry with dumbbells at chest height.',stat:'Stamina',baseRP:25,baseStatGain:2,compound:true},
      {name:'DB Press Neutral Grip',template:'Complete {sets} sets of {reps:12} neutral-grip flat DB press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Rope Chest Press',template:'Execute {sets} sets of {reps:15} rope cable chest press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Barbell Row to Press',template:'Perform {sets} supersets: {reps:10} barbell row + {reps:10} bench press.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Chest Isometric Hold',template:'Complete {sets} {time:30s} isometric bench press holds at midpoint.',stat:'Durability',baseRP:25,baseStatGain:2,compound:true},
      {name:'Cable Fly Pyramid',template:'Execute cable fly pyramid: {reps:20}→{reps:15}→{reps:12}→{reps:10} reps.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Pec Deck 21s',template:'Perform 1 set of 21 pec deck reps: 7 bottom-half + 7 top-half + 7 full.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Dumbbell Complex Chest',template:'Complete {sets} DB complex rounds: {reps:10} press + {reps:10} fly + {reps:10} pullover.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Machine Press 100',template:'Execute 100 total machine chest press reps in minimum sets.',stat:'Stamina',baseRP:40,baseStatGain:3,volume:'high'},
      {name:'Chest Activation A',template:'Perform {sets} sets of {reps:20} light cable fly to activate chest before training.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Chest Compound Day',template:'Complete full chest compound day: bench + incline + dips — {sets} sets each.',stat:'Strength',baseRP:55,baseStatGain:4,compound:true},
      {name:'Reverse Pec Deck',template:'Execute {sets} sets of {reps:15} reverse pec deck (rear delt focus with chest stretch).',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Incline Fly Drop Set',template:'Perform 1 incline fly drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:35,baseStatGain:2,intensity:'heavy'},
      {name:'Bench Press 20-Rep Set',template:'Complete 1 set of {reps:20} bench press reps — breathing squats equivalent.',stat:'Stamina',baseRP:35,baseStatGain:2,compound:true},
      {name:'Chest Tension Hold',template:'Execute {sets} cable fly holds at peak contraction — {time:10s} each rep.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Crossover Hammer Curl',template:'Perform {sets} supersets: {reps:15} cable crossover + {reps:12} hammer curl.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Chest and Shoulder Circuit',template:'Complete {sets} rounds: {reps:10} bench + {reps:10} overhead press + {reps:12} lateral raise.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Chest Pump Day',template:'Execute high-rep pump day: 5 exercises × {reps:20} reps × {sets} sets.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Pre-Fatigue Press',template:'Perform {sets} rounds: {reps:20} cable fly, then immediately {reps:8} heavy bench press.',stat:'Strength',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Smith Machine Drop',template:'Complete 1 Smith machine bench drop set: {reps:8}+{reps:10}+{reps:15}.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy'},
      {name:'Chest Training Max Out',template:'Work up to a 1-rep max on bench press. The System demands your limit.',stat:'Strength',baseRP:70,baseStatGain:6,intensity:'heavy',compound:true},
      {name:'Flat to Incline Superset',template:'Execute {sets} supersets: {reps:10} flat bench + {reps:10} incline bench.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Cable Fly Iso Contraction',template:'Perform {sets} sets of {reps:15} cable fly with 2s isometric contraction at peak.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Machine Chest Circuit',template:'Complete {sets} rounds: {reps:12} machine press + {reps:15} pec deck + {reps:20} cable fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Push Day Heavy',template:'Execute push day: {sets}×{reps:5} bench + {sets}×{reps:8} incline + {sets}×{reps:12} fly.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy'},
      {name:'Push Day Volume',template:'Perform push day: {sets}×{reps:12} bench + {sets}×{reps:15} incline + {sets}×{reps:20} cable fly.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Chest Strength Block',template:'Complete strength block: 5-4-3-2-1 reps bench press, increasing weight each set.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Chest Hypertrophy Block',template:'Execute hypertrophy block: {sets}×{reps:12} three chest exercises.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Full Chest Workout',template:'Perform complete chest workout: compound + isolation + finisher — 45 minutes.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Chest Endurance Day',template:'Complete {reps:50} total bench press reps across {sets} sets.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Dumbbell Only Chest Day',template:'Execute full dumbbell chest day: flat, incline, decline, fly — {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Cable Only Chest Day',template:'Perform full cable chest day: high, mid, low fly + crossover — {sets} sets each.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Machine Only Chest Day',template:'Complete machine-only chest day: chest press + pec deck + incline — {sets} sets each.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Barbell Only Chest Day',template:'Execute barbell-only chest day: flat, incline, decline, floor press — {sets} sets each.',stat:'Strength',baseRP:50,baseStatGain:4,level:'beginner'},
      {name:'Chest Contrast Training',template:'Perform {sets} contrast pairs: heavy {reps:5} bench + explosive {reps:5} bench at 50% load.',stat:'Speed',baseRP:45,baseStatGain:3,intensity:'heavy'},
      {name:'Chest Stretch Protocol',template:'Complete {sets} {time:60s} chest stretches in doorway and foam roller.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Chest Mind-Muscle Focus',template:'Execute {sets} sets of {reps:15} light cable fly focusing purely on mind-muscle connection.',stat:'Discipline',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Chest Warm Down',template:'Perform {sets} sets of {reps:20} light push-ups and {time:2m} chest foam rolling.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Incline Band Press',template:'Complete {sets} sets of {reps:15} incline band press reps.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Chest PR Attempt',template:'Attempt a new 5-rep max on bench press. Beat your previous record.',stat:'Strength',baseRP:55,baseStatGain:4,compound:true},
      {name:'Chest Functional Training',template:'Execute {sets} rounds of functional chest circuit: press, fly, push, carry.',stat:'Agility',baseRP:35,baseStatGain:2},
      {name:'Push Up to Bench Combo',template:'Perform {sets} supersets: {reps:15} push-ups + {reps:10} bench press.',stat:'Strength',baseRP:35,baseStatGain:2,compound:true},
      {name:'Chest Barbell Complex',template:'Complete barbell chest complex: {reps:10} bench + {reps:10} floor press + {reps:10} pullover.',stat:'Strength',baseRP:45,baseStatGain:3,level:'beginner'},
      {name:'Chest Cable Only Day',template:'Execute full cable chest day without machines — 5 cable variations.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Bench Press PR Day',template:'Work up to a heavy bench press triple. Log the weight.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Chest Rest-Pause',template:'Perform {sets} rest-pause sets on bench: {reps:8} + 15s rest + {reps:4} + 15s rest + {reps:2}.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Pec Deck Rest-Pause',template:'Complete 1 pec deck rest-pause set: {reps:15}+{reps:8}+{reps:5}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Machine Press Rest-Pause',template:'Execute 1 machine press rest-pause set: {reps:12}+{reps:6}+{reps:4}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Chest Accumulation Day',template:'Perform chest accumulation: 10 sets of {reps:10} with the same weight.',stat:'Stamina',baseRP:50,baseStatGain:3},
      {name:'Daily Push-Up Challenge',template:'Complete {reps:50} push-ups in as few sets as possible.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Chest Volume Record',template:'Beat your total volume record for chest day.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Chest Speed Work',template:'Execute {sets} sets of {reps:8} bench press at 60% of max — focus on bar speed.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Post-Bench Stretch',template:'Perform thorough post-bench chest stretch protocol — {time:5m} total.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Flat Press Challenge',template:'Complete as many sets of {reps:10} bench press as possible in {time:20m}.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Incline Press Challenge',template:'Execute as many sets of {reps:10} incline press as possible in {time:15m}.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Cable Fly Challenge',template:'Perform as many sets of {reps:20} cable fly as possible in {time:10m}.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Bench Press 3x3',template:'Complete 3 sets of {reps:3} bench press at 90% intensity.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Incline Press 3x3',template:'Execute 3 sets of {reps:3} incline press at 90% intensity.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Chest Deload Day',template:'Perform chest deload: {sets} sets of {reps:10} at 50% load — recovery focus.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Chest Activation Pre-Workout',template:'Complete chest activation: {sets} sets of {reps:20} band pull-aparts.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Chest Lockout Work',template:'Execute {sets} sets of {reps:8} lockout press from pin position.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Wide Grip Dips',template:'Perform {sets} sets of {reps:12} wide-grip dips for chest development.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Chest and Tricep Superset',template:'Complete {sets} supersets: {reps:10} bench press + {reps:12} tricep pushdown.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Chest Density Training',template:'Execute chest density block: max volume in {time:15m} with bench press.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true,volume:'high'},
      {name:'Cable Crossover 100',template:'Perform 100 total cable crossover reps in minimum time.',stat:'Stamina',baseRP:35,baseStatGain:2,volume:'high'},
      {name:'Chest Tension Work',template:'Complete {sets} sets of {reps:10} bench press maintaining constant tension.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Lower Chest Blast',template:'Execute lower chest focus: {sets}×{reps:12} decline press + {sets}×{reps:15} low cable fly.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Upper Chest Blast',template:'Perform upper chest focus: {sets}×{reps:12} incline press + {sets}×{reps:15} high cable fly.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Inner Chest Focus',template:'Complete inner chest focus: {sets}×{reps:15} cable crossover + {sets}×{reps:15} pec deck.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Outer Chest Focus',template:'Execute outer chest: {sets}×{reps:12} wide grip bench + {sets}×{reps:15} wide cable fly.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Full Chest Development Day',template:'Perform full chest development: upper, lower, inner, outer — all angles covered.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Chest and Back Day',template:'Complete push-pull day: {sets}×{reps:10} bench press + {sets}×{reps:10} rows.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Chest Strength Endurance',template:'Execute {reps:5} sets of {reps:10} at 70% bench press with 60s rest between sets.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Barbell Chest Circuit',template:'Perform barbell circuit: bench + incline + decline — {reps:10} each, {sets} rounds.',stat:'Strength',baseRP:45,baseStatGain:3},
    
      {name:'Explosive Bench Press [G]',template:'Execute {sets} sets of {reps:5} explosive bench press reps at 60% — maximum bar speed.',stat:'Speed',baseRP:30,baseStatGain:2,compound:true},
      {name:'Plyometric Push-Up',template:'Perform {sets} sets of {reps:10} plyometric push-up reps — hands leave floor.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
      {name:'Chest Discipline Day',template:'Complete every chest exercise with perfect form today — no ego lifting.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Chest Speed Circuit',template:'Execute speed circuit: {reps:10} explosive push-up + {reps:10} clap push-up. {sets} rounds.',stat:'Speed',baseRP:30,baseStatGain:2},
    ],

    calisthenics: [
      // 233 calisthenics chest quests
      {name:'Standard Push-Ups',template:'Execute {sets} sets of {reps:15} standard push-ups. Full chest to floor.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Wide Push-Ups',template:'Perform {sets} sets of {reps:12} wide-grip push-ups. Chest focus.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Diamond Push-Ups',template:'Complete {sets} sets of {reps:10} diamond push-ups. Inner chest and triceps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Decline Push-Ups',template:'Execute {sets} sets of {reps:12} decline push-ups. Feet elevated on surface.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Push-Ups',template:'Perform {sets} sets of {reps:15} incline push-ups. Hands elevated.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Pike Push-Ups',template:'Complete {sets} sets of {reps:10} pike push-ups. Shoulder and upper chest.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Plyometric Push-Ups',template:'Execute {sets} sets of {reps:8} plyometric push-ups. Explosive power.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Pseudo Planche Push-Ups',template:'Perform {sets} sets of {reps:8} pseudo planche push-ups. Hands angled out.',stat:'Strength',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Archer Push-Ups',template:'Complete {sets} sets of {reps:8} archer push-ups each side.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'One-Arm Push-Up Negatives',template:'Execute {sets} sets of {reps:5} one-arm push-up negatives each side.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced'},
      {name:'Dips (Parallel Bars)',template:'Perform {sets} sets of {reps:12} parallel bar dips. Forward lean for chest.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Ring Push-Ups',template:'Complete {sets} sets of {reps:10} ring push-ups. Unstable surface.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Ring Dips',template:'Execute {sets} sets of {reps:8} ring dips.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Ring Fly',template:'Perform {sets} sets of {reps:8} ring fly reps. Controlled descent.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Push-Up to Downward Dog',template:'Complete {sets} sets of {reps:10} push-up to downward dog transition.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Hindu Push-Ups',template:'Execute {sets} sets of {reps:10} Hindu push-ups. Full flowing motion.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Knuckle Push-Ups',template:'Perform {sets} sets of {reps:15} knuckle push-ups.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'T Push-Ups',template:'Complete {sets} sets of {reps:8} T push-ups each side. Rotation at top.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Spiderman Push-Ups',template:'Execute {sets} sets of {reps:10} spiderman push-ups each side.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Push-Up Shoulder Tap',template:'Perform {sets} sets of {reps:10} push-ups with shoulder tap at top.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Clapping Push-Ups',template:'Complete {sets} sets of {reps:8} clapping push-ups.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Triple Clap Push-Ups',template:'Execute {sets} sets of {reps:5} triple clap push-ups.',stat:'Speed',baseRP:45,baseStatGain:4},
      {name:'Deficit Push-Ups',template:'Perform {sets} sets of {reps:12} deficit push-ups with hands on books/blocks.',stat:'Strength',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Typewriter Push-Ups',template:'Complete {sets} sets of {reps:8} typewriter push-ups.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'One-Arm Negative Push-Ups',template:'Execute {sets} sets of {reps:5} one-arm push-up negatives, each side.',stat:'Strength',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Push-Up 100 Challenge',template:'Complete 100 push-ups in as few sets as possible.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Push-Up Ladder',template:'Perform push-up ladder: 1, 2, 3...10, 9, 8...1 reps.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Slow Push-Ups',template:'Complete {sets} sets of {reps:8} slow push-ups: 5 seconds down, 5 seconds up.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Explosive Push-Ups',template:'Execute {sets} sets of {reps:8} explosive push-ups focusing on power.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Pause Push-Ups',template:'Perform {sets} sets of {reps:10} push-ups with 3-second pause at bottom.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Wide to Close Push-Ups',template:'Complete {sets} sets of {reps:10} wide + {reps:10} close push-up alternations.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ring Push-Up Progression',template:'Execute {sets} sets of {reps:8} ring push-up reps with controlled form.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Bar Dips',template:'Perform {sets} sets of {reps:15} parallel bar dips.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Assisted One-Arm Push-Up',template:'Complete {sets} sets of {reps:8} assisted one-arm push-ups, each side.',stat:'Strength',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Push-Up Hold',template:'Execute {sets} {time:30s} push-up holds at the bottom position.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Planche Progression',template:'Perform {sets} {time:20s} planche lean holds.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced'},
      {name:'Tucked Planche',template:'Complete {sets} {time:10s} tucked planche holds.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Straddle Planche',template:'Execute {sets} {time:5s} straddle planche holds.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced'},
      {name:'Front Lever Row',template:'Perform {sets} sets of {reps:5} front lever rows on bars.',stat:'Strength',baseRP:55,baseStatGain:4,level:'advanced'},
      {name:'Push-Up AMRAP',template:'Complete 1 AMRAP push-up set — max reps possible.',stat:'Stamina',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Dip AMRAP',template:'Execute 1 AMRAP bar dip set — max reps possible.',stat:'Stamina',baseRP:35,baseStatGain:2,intensity:'heavy',compound:true},
      {name:'Ring Support Hold',template:'Perform {sets} {time:30s} ring support holds (top of dip position).',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'L-Sit Push-Ups',template:'Complete {sets} sets of {reps:5} L-sit push-ups on parallel bars.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Pike Push-Up Negative',template:'Execute {sets} sets of {reps:8} pike push-up negatives — 5 seconds down.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Push-Up Density Block',template:'Complete maximum push-ups in {time:5m}. Beat previous count.',stat:'Stamina',baseRP:35,baseStatGain:2,volume:'high'},
      {name:'Dip Negative',template:'Perform {sets} sets of {reps:6} dip negatives — 5 seconds down.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Ring Fly Negative',template:'Complete {sets} sets of {reps:5} ring fly negatives.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Push-Ups to Failure',template:'Execute {sets} sets of push-ups to complete muscular failure.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Dips to Failure',template:'Perform {sets} sets of dips to complete muscular failure.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true},
      {name:'Tiger Bend Push-Ups',template:'Complete {sets} sets of {reps:5} tiger bend push-ups.',stat:'Strength',baseRP:50,baseStatGain:4},
      // Continue calisthenics chest...
      {name:'Hindu Dips',template:'Execute {sets} sets of {reps:10} Hindu dips — circular motion.',stat:'Agility',baseRP:28,baseStatGain:2,compound:true},
      {name:'Ring Push-Up Fly Combo',template:'Perform {sets} supersets: {reps:8} ring push-up + {reps:6} ring fly.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Wall Handstand Push-Up',template:'Complete {sets} sets of {reps:5} wall handstand push-ups.',stat:'Strength',baseRP:45,baseStatGain:4,level:'beginner',compound:true},
      {name:'Staggered Push-Ups',template:'Execute {sets} sets of {reps:10} staggered push-ups each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Plyo Dips',template:'Perform {sets} sets of {reps:8} plyometric dips.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Around the World Push-Ups',template:'Complete {sets} sets of {reps:8} around-the-world push-ups.',stat:'Agility',baseRP:30,baseStatGain:2},
      {name:'Divebomber Push-Ups',template:'Execute {sets} sets of {reps:10} divebomber push-ups.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Chest Circuit Cali',template:'Perform one calisthenics chest circuit: push-up + dip + ring push-up — {reps:10} each.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Planche Lean Hold',template:'Complete {sets} {time:30s} planche lean holds.',stat:'Strength',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Chest Dip Focus',template:'Execute {sets} sets of {reps:15} forward-lean dips for chest.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Tucked Front Lever',template:'Perform {sets} {time:10s} tucked front lever holds.',stat:'Strength',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'L-Sit to Planche',template:'Complete {sets} {time:5s} L-sit to planche transition holds.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced'},
      {name:'Push-Up Superset',template:'Execute {sets} supersets: {reps:15} wide push-up + {reps:15} diamond push-up.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Explosive Dips',template:'Perform {sets} sets of {reps:6} explosive dips.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Slow Ring Dips',template:'Complete {sets} sets of {reps:6} slow ring dips — 4 seconds down.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Planche Push-Up',template:'Execute {sets} sets of {reps:3} planche push-ups.',stat:'Strength',baseRP:70,baseStatGain:6,level:'advanced'},
      {name:'Pseudo Planche Series',template:'Perform {sets} sets of {reps:10} pseudo planche push-ups.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced'},
      {name:'Ring Push-Up Hold',template:'Complete {sets} {time:20s} ring push-up holds at bottom.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Deep Push-Ups',template:'Execute {sets} sets of {reps:12} deep push-ups between two chairs.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Bar Muscle-Up to Dip',template:'Perform {sets} sets of {reps:5} bar muscle-up + dip combination.',stat:'Strength',baseRP:55,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Korean Dips',template:'Complete {sets} sets of {reps:6} Korean dips behind the bar.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Ring Push-Up Ladder',template:'Execute ring push-up ladder: 1, 2, 3, 4, 5 reps per set.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Cali Chest Burnout',template:'Perform maximum push-ups then maximum dips. No rest between.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true,volume:'high'},
      {name:'Archer Push-Up Progression',template:'Complete {sets} sets of {reps:6} archer push-ups with slow eccentric.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'One-Arm Push-Up Attempt',template:'Execute {sets} attempts at one-arm push-ups each side.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Cali Push Circuit',template:'Perform: {reps:20} push-ups + {reps:15} dips + {reps:10} pike push-ups — {sets} rounds.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Full Body Push Workout',template:'Complete full calisthenics push day: {sets} sets of 4 push exercises.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Push-Up Variation Day',template:'Execute 5 different push-up variations — {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Planche Training Block',template:'Perform planche progression block: lean → tuck → straddle progression.',stat:'Strength',baseRP:55,baseStatGain:4,level:'advanced'},
      {name:'Dip Superset',template:'Complete {sets} supersets: {reps:12} bar dips + {reps:8} ring dips.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Chest Stretch Cali',template:'Execute post-workout chest stretch protocol — doorway stretch {time:3m}.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Push-Up Pyramid',template:'Perform push-up pyramid: 5-10-15-20-15-10-5 reps.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Dip Pyramid',template:'Complete dip pyramid: 5-8-10-12-10-8-5 reps.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Superman Push-Up',template:'Execute {sets} sets of {reps:5} superman push-ups — full extension.',stat:'Speed',baseRP:45,baseStatGain:4},
      {name:'Aztec Push-Up',template:'Perform {sets} sets of {reps:3} Aztec push-ups — legs above hands.',stat:'Speed',baseRP:55,baseStatGain:5},
      {name:'90 Degree Push-Up',template:'Complete {sets} sets of {reps:5} 90-degree push-ups.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Muscle-Up Practice',template:'Execute {sets} sets of {reps:3} muscle-up reps on bar.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced',compound:true},
      {name:'Ring Muscle-Up',template:'Perform {sets} sets of {reps:3} ring muscle-ups.',stat:'Strength',baseRP:65,baseStatGain:5,level:'advanced',compound:true},
      {name:'Bent Arm Planche',template:'Complete {sets} {time:10s} bent arm planche holds.',stat:'Strength',baseRP:55,baseStatGain:4,level:'advanced'},
      {name:'Back Lever',template:'Execute {sets} {time:10s} back lever holds.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Iron Cross Progression',template:'Perform {sets} sets of iron cross progression holds.',stat:'Strength',baseRP:70,baseStatGain:5},
      {name:'Cali Chest Push Day',template:'Complete calisthenics push day: push-ups, dips, pike push-ups — full workout.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'360 Push-Up',template:'Execute {sets} sets of {reps:3} 360 push-ups.',stat:'Speed',baseRP:55,baseStatGain:5},
      {name:'Full Planche Push-Up',template:'Perform {sets} sets of {reps:2} full planche push-ups.',stat:'Strength',baseRP:75,baseStatGain:6,level:'advanced'},
      // Fill calisthenics chest to 233...
      {name:'Wide Dips',template:'Complete {sets} sets of {reps:10} wide-grip dips.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Close Grip Push-Ups',template:'Execute {sets} sets of {reps:12} close-grip push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hollow Body Push-Ups',template:'Perform {sets} sets of {reps:10} hollow body push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Pushup Side Plank',template:'Complete {sets} sets of {reps:8} push-up to side plank transitions.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Crossover Push-Ups',template:'Execute {sets} sets of {reps:10} crossover push-ups.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Fingertip Push-Ups',template:'Perform {sets} sets of {reps:10} fingertip push-ups.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Decline Wide Push-Ups',template:'Complete {sets} sets of {reps:12} decline wide push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Diamond Push-Ups',template:'Execute {sets} sets of {reps:10} incline diamond push-ups.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Ring L-Sit',template:'Perform {sets} {time:15s} ring L-sit holds.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Plank to Push-Up',template:'Complete {sets} sets of {reps:10} plank-to-push-up transitions.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Side Push-Ups',template:'Execute {sets} sets of {reps:15} side-lying push-ups each side.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Clap Behind Back',template:'Perform {sets} sets of {reps:5} behind-back clap push-ups.',stat:'Speed',baseRP:55,baseStatGain:5},
      {name:'Ring Inverted Row to Dip',template:'Complete {sets} supersets: {reps:8} ring inverted row + {reps:8} ring dip.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Bar Straight Bar Dips',template:'Execute {sets} sets of {reps:10} straight bar dips.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Full Push-Up Workout',template:'Perform full push-up workout: 5 variations, {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Cali Chest Strength Day',template:'Complete strength day: {sets}×{reps:5} hardest push-up variation.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Cali Chest Volume Day',template:'Execute volume day: {sets}×{reps:20} standard push-ups.',stat:'Stamina',baseRP:35,baseStatGain:2,volume:'high'},
      {name:'Push Skill Work',template:'Perform {time:20m} of push skill work: planche, dips, push-up progressions.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Daily Push-Up Grease Groove',template:'Execute push-ups every 2 hours throughout the day — {reps:10} each time.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Morning Push-Ups',template:'Perform {reps:30} push-ups immediately upon waking.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Evening Push-Ups',template:'Complete {reps:50} push-ups before bed.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Slow Eccentric Dips',template:'Execute {sets} sets of {reps:6} dips with 6-second eccentric.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Explosive Push-Up Series',template:'Perform {sets} sets of {reps:5} explosive push-up variations.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Cali Push Endurance',template:'Complete maximum push exercise reps in {time:10m} — any variation.',stat:'Stamina',baseRP:38,baseStatGain:3},
      {name:'Push Skill Progression',template:'Execute structured skill practice: planche progression — 30 minutes.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Dip Challenge',template:'Perform as many dips as possible in {time:5m}.',stat:'Stamina',baseRP:35,baseStatGain:2,compound:true},
      {name:'Push-Up World Record Attempt',template:'Complete {reps:100} push-ups in under {time:5m}.',stat:'Stamina',baseRP:50,baseStatGain:4},
      {name:'Calisthenics Chest Max',template:'Execute max effort calisthenics chest session — 45 minutes.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Ring Training Day',template:'Perform full ring training day for chest — dips, fly, push-ups on rings.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Cali Strength Test',template:'Complete your hardest push-up variation for max reps.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy'},
    ],

    home: [
      // 233 home chest quests
      {name:'Standard Push-Ups Home',template:'Execute {sets} sets of {reps:15} push-ups at home. No equipment needed.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Knee Push-Ups',template:'Perform {sets} sets of {reps:20} knee push-ups. Modified for beginners.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Wall Push-Ups',template:'Complete {sets} sets of {reps:20} wall push-ups.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Chair Dips',template:'Execute {sets} sets of {reps:12} tricep dips using a chair.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Table Push-Ups',template:'Perform {sets} sets of {reps:15} incline push-ups on table.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Couch Incline Push-Ups',template:'Complete {sets} sets of {reps:15} incline push-ups on couch.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Floor Push-Up Variation',template:'Execute {sets} sets of {reps:12} wide push-up variations on floor.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Towel Push-Ups',template:'Perform {sets} sets of {reps:10} push-ups on two towels for deeper range.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Book Deficit Push-Ups',template:'Complete {sets} sets of {reps:10} deficit push-ups with hands on books.',stat:'Strength',baseRP:22,baseStatGain:1,level:'advanced'},
      {name:'Floor Dips',template:'Execute {sets} sets of {reps:15} floor dips.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Diamond Push-Ups Home',template:'Perform {sets} sets of {reps:10} diamond push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Decline Push-Ups on Couch',template:'Complete {sets} sets of {reps:12} decline push-ups feet on couch.',stat:'Strength',baseRP:22,baseStatGain:2},
      {name:'Slow Motion Push-Ups',template:'Execute {sets} sets of {reps:8} slow push-ups — 5s down, 5s up.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Pause Push-Ups Home',template:'Perform {sets} sets of {reps:10} push-ups with 3s pause at bottom.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Push-Up Hold (Home)',template:'Complete {sets} {time:30s} push-up bottom holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Wide to Diamond Push-Up',template:'Execute {sets} sets of {reps:10} wide to diamond alternating push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Morning 50 Push-Ups',template:'Perform {reps:50} push-ups every morning. No excuses.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'100 Push-Up Challenge',template:'Complete 100 push-ups today. Any sets, any time.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'200 Push-Up Day',template:'Execute 200 push-ups throughout the day.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Chair Incline Push-Ups',template:'Perform {sets} sets of {reps:15} push-ups with hands on chair.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Fingertip Push-Ups Home',template:'Complete {sets} sets of {reps:10} fingertip push-ups.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Clapping Push-Ups Home',template:'Execute {sets} sets of {reps:6} clapping push-ups.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'T Push-Up Home',template:'Perform {sets} sets of {reps:8} T push-ups.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Push-Up Mountain Climber',template:'Complete {sets} sets of {reps:8} push-up + {reps:10} mountain climber combo.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Pike Push-Ups Home',template:'Execute {sets} sets of {reps:10} pike push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Plyometric Push-Ups Home',template:'Perform {sets} sets of {reps:6} plyometric push-ups.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Archer Push-Up Home',template:'Complete {sets} sets of {reps:6} archer push-ups each side.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Pseudo Planche Home',template:'Execute {sets} sets of {reps:8} pseudo planche push-ups.',stat:'Strength',baseRP:30,baseStatGain:2,level:'advanced'},
      {name:'Door Frame Push-Ups',template:'Perform {sets} sets of {reps:15} push-ups in door frame.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Elevated Push-Up Series',template:'Complete {sets} sets of {reps:12} elevated push-ups on stairs.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Push-Up to Plank',template:'Execute {sets} sets of {reps:10} push-up to 30s plank.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Knuckle Push-Ups Home',template:'Perform {sets} sets of {reps:12} knuckle push-ups.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Stagger Push-Ups',template:'Complete {sets} sets of {reps:10} staggered push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hindu Push-Ups Home',template:'Execute {sets} sets of {reps:10} Hindu push-ups.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Divebomber Push-Ups Home',template:'Perform {sets} sets of {reps:10} divebomber push-ups.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Wall Chest Stretch',template:'Complete {sets} {time:30s} wall chest stretches.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Floor Chest Openers',template:'Execute {sets} sets of {reps:15} floor chest opener reps.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Bed Edge Push-Ups',template:'Perform {sets} sets of {reps:15} push-ups with hands on bed edge.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Push-Up Circuit Home',template:'Complete home circuit: {reps:15} wide + {reps:15} close + {reps:15} decline push-ups.',stat:'Stamina',baseRP:30,baseStatGain:2,level:'beginner'},
      {name:'Nighttime Push-Ups',template:'Execute {reps:30} push-ups before sleep.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Lunch Push-Ups',template:'Perform {reps:25} push-ups at lunch break.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Push-Up Every Hour',template:'Complete {reps:10} push-ups every hour for 8 hours.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Push-Up Streak',template:'Execute push-ups 3 times today — morning, afternoon, evening.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Full Chest Home Day',template:'Perform complete home chest workout — 5 variations, {sets} sets each.',stat:'Strength',baseRP:40,baseStatGain:3,level:'beginner'},
      {name:'Sofa Dip Superset',template:'Complete {sets} supersets: {reps:12} sofa dips + {reps:15} push-ups.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Floor Level Chest Work',template:'Execute {sets} sets floor-level chest exercises: push-up variations.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Push-Up Burnout',template:'Perform 1 push-up set to complete failure.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Chest Conditioning Home',template:'Complete chest conditioning: {reps:100} push-ups in {time:10m}.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Home Chest Test',template:'Execute max push-ups in 1 minute — record your count.',stat:'Stamina',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Pushup Before Phone',template:'Perform {reps:10} push-ups before using your phone for the first time today.',stat:'Discipline',baseRP:15,baseStatGain:1},
      // Continue home chest to 233...
      {name:'Slow Push-Up Day',template:'Complete {sets} sets of {reps:8} slow push-ups (3s down, 3s up).',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Bodyweight Dip Circuit',template:'Execute chair dip circuit: {sets} sets of {reps:15} chair dips.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Wall Dips',template:'Perform {sets} sets of {reps:15} wall dips using two chairs.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Step Push-Ups',template:'Complete {sets} sets of {reps:12} push-ups on bottom stair step.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Office Chair Dips',template:'Execute {sets} sets of {reps:15} office chair dips if at home office.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Morning Chest Routine',template:'Perform morning chest routine: {reps:20} push-ups + {reps:15} wide push-ups + {reps:10} diamond.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Evening Chest Burnout',template:'Complete evening chest burnout: max push-ups to failure.',stat:'Stamina',baseRP:22,baseStatGain:1,volume:'high'},
      {name:'Compound Push Movement',template:'Execute {sets} sets of compound push movement pattern.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Active Recovery Push',template:'Perform light push-up recovery session: {sets}×{reps:20} easy push-ups.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Push-Up Challenge Week',template:'Day 1 of push-up challenge: complete {reps:30} push-ups.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Bedroom Floor Push-Ups',template:'Execute {reps:40} push-ups in bedroom before getting ready.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Commercial Break Push-Ups',template:'Perform push-ups during every commercial break while watching TV.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Waiting Push-Ups',template:'Complete push-ups while waiting — {reps:15} whenever you have idle time.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Pre-Sleep Push-Ups',template:'Execute {reps:25} push-ups before sleeping.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Post-Wake Push-Ups',template:'Perform {reps:20} push-ups within 5 minutes of waking.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Study Break Push-Ups',template:'Complete {reps:15} push-ups every 30 minutes while studying.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Protein Push-Ups',template:'Execute {reps:10} push-ups every time you eat today.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Home Chest Strength Test',template:'Perform max push-ups in one set. Record and try to beat it next week.',stat:'Strength',baseRP:25,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Home Chest Consistency',template:'Complete push-ups at the same time every day this week — today is day 1.',stat:'Discipline',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Partner Push-Ups',template:'Execute {reps:30} push-ups — challenge someone in your home to join.',stat:'Charisma',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Focused Push-Ups',template:'Perform {sets} sets of {reps:10} push-ups with full focus on mind-muscle connection.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Books Deficit Push-Up',template:'Complete {sets} sets of {reps:10} push-ups with hands on two books.',stat:'Strength',baseRP:22,baseStatGain:1,level:'advanced'},
      {name:'Resistance Stretch Push',template:'Execute chest stretch after push-ups — {time:2m} doorway stretch.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Simple Chest Day',template:'Perform simple home chest day: 3 push-up variations × 3 sets × 15 reps.',stat:'Strength',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Tough Chest Day',template:'Complete advanced home chest day: archer + pseudo planche + plyometric push-ups.',stat:'Strength',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Chair Dip to Push-Up',template:'Execute {sets} supersets: {reps:10} chair dips + {reps:15} push-ups.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Floor Circuit',template:'Perform floor circuit: push-ups + plank + mountain climbers — {reps:15} each.',stat:'Stamina',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Home HIIT Push',template:'Complete HIIT: 30s push-ups / 15s rest × 8 rounds.',stat:'Stamina',baseRP:35,baseStatGain:2,level:'beginner'},
      {name:'Beginner Chest Home',template:'Execute beginner chest: {sets}×{reps:10} knee push-ups + {sets}×{reps:10} wall push-ups.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Intermediate Chest Home',template:'Perform intermediate chest: {sets}×{reps:15} standard push-ups + {sets}×{reps:12} decline.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Advanced Chest Home',template:'Complete advanced home chest: archer + plyometric + one-arm negatives.',stat:'Strength',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Home Volume Chest',template:'Execute {reps:150} total push-ups throughout the day.',stat:'Stamina',baseRP:35,baseStatGain:2,level:'beginner'},
      {name:'Chest Posture Work',template:'Perform chest posture exercises: chest opener + thoracic rotation — {time:5m}.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Full Body Push Home',template:'Complete full body push workout at home — chest, shoulders, triceps.',stat:'Strength',baseRP:35,baseStatGain:2,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // BACK
  // ══════════════════════════════════════════════════
  back: {
    gym: [
      {name:'Barbell Deadlift',template:'Execute {sets} sets of {reps:5} barbell deadlifts. Full lockout required.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Barbell Row',template:'Perform {sets} sets of {reps:8} barbell bent-over rows.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Lat Pulldown',template:'Complete {sets} sets of {reps:12} lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Row',template:'Execute {sets} sets of {reps:12} seated cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'T-Bar Row',template:'Perform {sets} sets of {reps:8} T-bar row reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Dumbbell Row',template:'Complete {sets} sets of {reps:10} dumbbell single-arm row, each side.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Wide Grip Pulldown',template:'Execute {sets} sets of {reps:12} wide-grip lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Close Grip Pulldown',template:'Perform {sets} sets of {reps:12} close-grip lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Straight Arm Pulldown',template:'Complete {sets} sets of {reps:15} straight-arm pulldown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Face Pull',template:'Execute {sets} sets of {reps:20} face pull reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rack Pull',template:'Perform {sets} sets of {reps:5} rack pulls from knee level.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Romanian Deadlift',template:'Complete {sets} sets of {reps:10} Romanian deadlift reps.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Hyperextension',template:'Execute {sets} sets of {reps:15} back hyperextension reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Reverse Fly',template:'Perform {sets} sets of {reps:15} reverse fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Meadows Row',template:'Complete {sets} sets of {reps:10} Meadows row reps each side.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Pendlay Row',template:'Execute {sets} sets of {reps:6} Pendlay row reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Machine Row',template:'Perform {sets} sets of {reps:12} machine row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Low Cable Row',template:'Complete {sets} sets of {reps:12} low cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'High Cable Row',template:'Execute {sets} sets of {reps:12} high cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Decline Dumbbell Row',template:'Perform {sets} sets of {reps:10} decline bench dumbbell row.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Barbell Shrugs',template:'Complete {sets} sets of {reps:15} barbell shrugs.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Shrugs',template:'Execute {sets} sets of {reps:15} dumbbell shrugs.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Good Morning',template:'Perform {sets} sets of {reps:10} barbell good morning reps.',stat:'Durability',baseRP:30,baseStatGain:2,compound:true},
      {name:'Sumo Deadlift',template:'Complete {sets} sets of {reps:5} sumo deadlift reps.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Deficit Deadlift',template:'Execute {sets} sets of {reps:5} deficit deadlift reps standing on plates.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Trap Bar Deadlift',template:'Perform {sets} sets of {reps:5} trap bar deadlift reps.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true},
      {name:'Seated Cable Row Wide',template:'Complete {sets} sets of {reps:12} wide-grip seated cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Lat Pullover Machine',template:'Execute {sets} sets of {reps:12} lat pullover machine reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Single Arm Cable Row',template:'Perform {sets} sets of {reps:12} single-arm cable row reps, each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Dumbbell Row',template:'Complete {sets} sets of {reps:10} incline bench dumbbell row.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Pullthrough',template:'Execute {sets} sets of {reps:15} cable pull-through reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Back Extension Machine',template:'Perform {sets} sets of {reps:15} back extension machine reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Snatch Grip Deadlift',template:'Complete {sets} sets of {reps:5} snatch-grip deadlift reps.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Dumbbell Deadlift',template:'Execute {sets} sets of {reps:8} dumbbell deadlift reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Chest Supported Row',template:'Perform {sets} sets of {reps:10} chest-supported dumbbell row reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Supine Cable Row',template:'Complete {sets} sets of {reps:12} supine cable row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Underhand Barbell Row',template:'Execute {sets} sets of {reps:8} underhand barbell row reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Back Day Heavy',template:'Perform heavy back day: {sets}×{reps:5} deadlift + {sets}×{reps:8} barbell row.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Back Day Volume',template:'Complete volume back day: {sets}×{reps:15} lat pulldown + {sets}×{reps:15} cable row.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Deadlift 5x5',template:'Execute 5 sets of {reps:5} deadlifts — classic strength protocol.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Deadlift Max Attempt',template:'Work up to a 1-rep max deadlift. The System demands your absolute limit.',stat:'Strength',baseRP:75,baseStatGain:6,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Back Width Focus',template:'Perform back width focus: {sets}×{reps:12} wide pulldown + {sets}×{reps:12} straight arm.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Back Thickness Focus',template:'Complete back thickness: {sets}×{reps:8} barbell row + {sets}×{reps:8} T-bar row.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Pull Day Heavy',template:'Execute pull day: {sets}×{reps:5} deadlift + {sets}×{reps:8} row + {sets}×{reps:12} pulldown.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Pull Day Volume',template:'Perform pull volume: {sets}×{reps:15} cable row + {sets}×{reps:20} face pull.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Romanian DL Complex',template:'Complete {sets} sets of Romanian DL: {reps:10} normal + {reps:10} single leg each.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Back Superset A',template:'Execute {sets} supersets: {reps:8} barbell row + {reps:12} lat pulldown.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Back Superset B',template:'Perform {sets} supersets: {reps:10} T-bar row + {reps:15} cable row.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Barbell Row Drop Set',template:'Complete 1 barbell row drop set: {reps:8}+{reps:10}+{reps:12}.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Deadlift Drop Set',template:'Execute 1 deadlift drop set: {reps:5} heavy + {reps:8} moderate + {reps:12} light.',stat:'Strength',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true,level:'beginner'},
      {name:'Grip Training',template:'Perform {sets} {time:60s} bar hangs for grip and lat stretch.',stat:'Durability',baseRP:20,baseStatGain:1},
    
      // ── Additional Back Gym Quests ──
      {name:'Kroc Row',template:'Execute {sets} sets of {reps:20} Kroc row reps each side — high-rep heavy DB.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy'},
      {name:'Block Pull',template:'Complete {sets} sets of {reps:5} block pull reps from mid-shin height.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Barbell Row Pause',template:'Execute {sets} sets of {reps:6} barbell row reps with 2s hold at chest.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Cable Row Superset',template:'Perform {sets} supersets: {reps:12} close cable row + {reps:12} wide cable row.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Lat Pulldown Superset',template:'Complete {sets} supersets: {reps:12} wide pulldown + {reps:12} close pulldown.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Romanian DL Pause',template:'Execute {sets} sets of {reps:8} Romanian DL with 2s pause at bottom.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Cable Lat Pullover',template:'Perform {sets} sets of {reps:15} cable lat pullover reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Reverse Grip Pulldown',template:'Complete {sets} sets of {reps:12} reverse-grip lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Machine Row Drop Set',template:'Execute machine row drop set: {reps:10} + {reps:12} + {reps:15}.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Single Arm Pulldown',template:'Perform {sets} sets of {reps:12} single-arm lat pulldown reps each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Stiff Leg Deadlift',template:'Complete {sets} sets of {reps:10} stiff-legged deadlift reps.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Back Giant Set',template:'Execute back giant set: {reps:8} deadlift + {reps:10} row + {reps:12} pulldown.',stat:'Strength',baseRP:55,baseStatGain:4,compound:true,volume:'high'},
      {name:'Pendlay Row Heavy',template:'Perform {sets} sets of {reps:5} heavy Pendlay row reps.',stat:'Strength',baseRP:45,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'DB Row Cluster',template:'Complete DB row cluster: {reps:5}+{reps:5}+{reps:5} heavy, 15s rest.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy',level:'advanced'},
      {name:'Back Pump Circuit',template:'Perform back pump circuit: {reps:20} pulldown + {reps:20} row + {reps:20} face pull.',stat:'Stamina',baseRP:38,baseStatGain:3,volume:'high'},
      {name:'Deadlift Paused',template:'Execute {sets} sets of {reps:3} paused deadlifts (2s pause at knee).',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Tempo Barbell Row',template:'Perform {sets} sets of {reps:6} barbell rows with 4-1-1 tempo.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Pull Day AMRAP',template:'Execute 1 AMRAP set of lat pulldown at 70% — max reps.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Conventional DL 3x3',template:'Perform 3 sets of {reps:3} conventional deadlift at near max.',stat:'Strength',baseRP:60,baseStatGain:5,compound:true},
      {name:'T-Bar Row Drop Set',template:'Complete T-bar row drop set: {reps:8} + {reps:10} + {reps:15}.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Supinated Cable Row',template:'Execute {sets} sets of {reps:12} supinated-grip cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Lat Focus Day',template:'Perform lat focus: {sets}×{reps:12} wide pulldown + {sets}×{reps:15} straight-arm.',stat:'Strength',baseRP:42,baseStatGain:3},
      {name:'Seated Good Morning',template:'Execute {sets} sets of {reps:12} seated barbell good morning reps.',stat:'Durability',baseRP:28,baseStatGain:2,compound:true},
      {name:'Rack Pull Heavy',template:'Perform {sets} sets of {reps:3} rack pulls at above-max weight.',stat:'Strength',baseRP:55,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'Hollow Body Row',template:'Execute {sets} sets of {reps:8} hollow body barbell rows.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Back Finisher Burnout',template:'Perform back finisher: {reps:30} band pull-apart + {reps:20} face pull.',stat:'Durability',baseRP:22,baseStatGain:1,volume:'high',level:'beginner'},
      {name:'Underhand Pulldown',template:'Execute {sets} sets of {reps:12} underhand-grip pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deadlift Wave Loading',template:'Perform wave loading: {reps:6} at 75%, {reps:4} at 80%, {reps:2} at 85% — 3 waves.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Back Density Block',template:'Set timer for {time:10m}. Perform as many quality back sets as possible.',stat:'Stamina',baseRP:45,baseStatGain:3,volume:'high'},
      {name:'Chest Supported Row Paused',template:'Complete {sets} sets of {reps:8} chest-supported row with 2s hold.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Explosive Row',template:'Complete {sets} sets of {reps:5} explosive barbell row reps — speed focus.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Romanian DL Drop Set',template:'Perform RDL drop set: {reps:8} heavy → {reps:12} medium → {reps:15} light.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true,level:'beginner'},
      {name:'Breathing Deadlift',template:'Execute {sets} sets of {reps:8} breathing deadlift reps — reset each rep.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Sumo DL High Pull',template:'Perform {sets} sets of {reps:6} sumo deadlift high-pull reps.',stat:'Speed',baseRP:42,baseStatGain:3,compound:true},
      {name:'Weighted Hyperextension',template:'Execute {sets} sets of {reps:15} weighted back hyperextension reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Cable Rope Row',template:'Perform {sets} sets of {reps:12} rope cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deadlift Cluster Set',template:'Execute deadlift cluster: {reps:3}+{reps:3}+{reps:3} at 85%, 20s rest between.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Cable Row Iso Hold',template:'Complete {sets} sets of {reps:8} cable row reps with 3s iso-hold.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Kneeling Lat Pulldown',template:'Execute {sets} sets of {reps:12} kneeling lat pulldown reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Band-Assisted Pull-Up',template:'Complete {sets} sets of {reps:15} band-assisted pull-up reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'One-Arm Machine Row',template:'Complete {sets} sets of {reps:10} one-arm machine row reps each side.',stat:'Strength',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Seated Cable Row Pyramid',template:'Perform cable row pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Lat Stretch Hang',template:'Execute {sets} {time:30s} hanging lat stretch each side.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Dumbbell Row Ladder',template:'Perform DB row ladder: {reps:5}+{reps:10}+{reps:15}+{reps:20} reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Back AMRAP Finisher',template:'End back day with AMRAP set of pulldown + cable row.',stat:'Stamina',baseRP:38,baseStatGain:3,intensity:'heavy'},
      {name:'Trap Bar Row',template:'Complete {sets} sets of {reps:8} trap bar row reps.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Pendlay Row 5x5',template:'Execute 5 sets of {reps:5} Pendlay rows — strict form.',stat:'Strength',baseRP:45,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Wide Row Superset',template:'Perform {sets} supersets: {reps:12} wide row + {reps:12} face pull.',stat:'Durability',baseRP:32,baseStatGain:2},
      {name:'Barbell Row 21s',template:'Execute barbell row 21s: {reps:7} bottom half + {reps:7} top half + {reps:7} full.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Romanian DL 5x10',template:'Perform 5 sets of {reps:10} Romanian deadlifts — stretch emphasis.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Back Strength Test',template:'Work up to a 3-rep max on deadlift and barbell row today.',stat:'Strength',baseRP:65,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'High Row Cable',template:'Execute {sets} sets of {reps:12} high cable row reps — retract scapula hard.',stat:'Strength',baseRP:28,baseStatGain:2},

      // ── Pull Balance Fix: Additional Back Gym ──
      {name:'Seal Row',template:'Execute {sets} sets of {reps:10} seal row reps on elevated bench.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Cable Face Pull High',template:'Perform {sets} sets of {reps:20} high-attachment cable face pulls.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Dumbbell Pullover Back',template:'Complete {sets} sets of {reps:12} dumbbell pullover reps — lat focus.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Row',template:'Execute {sets} sets of {reps:12} incline dumbbell row reps each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Row Overhand',template:'Perform {sets} sets of {reps:12} overhand-grip cable row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Machine Row Wide Grip',template:'Complete {sets} sets of {reps:12} wide-grip machine row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Meadows Row [Gym]',template:'Execute {sets} sets of {reps:10} Meadows row reps each side.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Dumbbell Shrug Row',template:'Perform {sets} sets of {reps:12} dumbbell shrug-into-row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Low Cable Row Pause',template:'Complete {sets} sets of {reps:10} low cable rows with 3s pause.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Wide Grip Pull-Up Weighted',template:'Execute {sets} sets of {reps:6} weighted wide-grip pull-up reps.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true},
      {name:'Supine Row Ring',template:'Perform {sets} sets of {reps:12} supine ring row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Barbell Shrug Row Combo',template:'Complete {sets} sets of {reps:10} barbell shrug-to-row reps.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'High Pulley Row',template:'Execute {sets} sets of {reps:15} high pulley cable row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Row Pyramid Up',template:'Perform cable row ascending pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Seated Row Iso Hold',template:'Complete {sets} sets of {reps:10} seated cable rows with 3s iso-hold.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Straight Arm Pulldown [Gym]',template:'Execute {sets} sets of {reps:15} straight-arm cable pulldown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Rack Pull Mid Shin',template:'Perform {sets} sets of {reps:5} rack pulls from mid-shin.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true},
      {name:'Wide Grip Seated Row',template:'Complete {sets} sets of {reps:12} wide-grip seated cable row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Banded Deadlift',template:'Execute {sets} sets of {reps:6} band-resisted deadlift reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Dumbbell Row Twist',template:'Perform {sets} sets of {reps:10} dumbbell row with thoracic rotation each side.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Row Triple Drop',template:'Complete cable row triple drop: {reps:10}+{reps:12}+{reps:15}.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Pronated Lat Pulldown',template:'Execute {sets} sets of {reps:12} pronated-grip lat pulldown reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Smith Machine Row',template:'Perform {sets} sets of {reps:10} Smith machine bent-over row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deficit Deadlift [Gym]',template:'Complete {sets} sets of {reps:5} deficit deadlift reps standing on plate.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Lat Pulldown Pause',template:'Execute {sets} sets of {reps:10} lat pulldown reps with 2s pause at chest.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Back Width Superset',template:'Perform {sets} supersets: {reps:12} wide pulldown + {reps:12} straight-arm pulldown.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Single Leg RDL Barbell',template:'Complete {sets} sets of {reps:8} single-leg barbell RDL each side.',stat:'Agility',baseRP:35,baseStatGain:3,compound:true},
      {name:'Explosive Pull-Up',template:'Execute {sets} sets of {reps:5} explosive pull-ups — maximum speed.',stat:'Speed',baseRP:40,baseStatGain:3,compound:true},
      {name:'Isometric Row Hold',template:'Perform {sets} sets of {time:30s} isometric cable row holds.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Back Hypertrophy Day',template:'Complete back hypertrophy session: 4 exercises × {sets} sets × {reps:12} reps.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Rope Straight Arm Pulldown',template:'Execute {sets} sets of {reps:15} rope straight-arm pulldown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cable Kneeling Row',template:'Perform {sets} sets of {reps:12} kneeling single-arm cable row reps each side.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Good Morning Barbell',template:'Complete {sets} sets of {reps:12} barbell good morning reps.',stat:'Durability',baseRP:28,baseStatGain:2,compound:true},
      {name:'Pull Day Finisher',template:'Execute pull day finisher: {reps:20} face pull + {reps:15} band pull-apart + max dead hang.',stat:'Durability',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Romanian DL 4x8',template:'Perform 4 sets of {reps:8} Romanian deadlifts — hamstring stretch focus.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Half-Kneeling Cable Row',template:'Complete {sets} sets of {reps:12} half-kneeling cable row reps each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Pull Day Pump Finisher',template:'Execute {reps:25} lat pulldown + {reps:25} cable row at light weight back-to-back.',stat:'Stamina',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Supine Cable Pull',template:'Perform {sets} sets of {reps:12} supine cable pull reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hex Bar Deadlift',template:'Complete {sets} sets of {reps:8} hex bar deadlift reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Machine Pullover',template:'Execute {sets} sets of {reps:15} machine pullover reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Wide Row ISO',template:'Perform {sets} sets of {reps:10} wide row reps with 2s iso-hold at peak.',stat:'Strength',baseRP:30,baseStatGain:2},

      {name:'Explosive Row [G]',template:'Perform {sets} sets of {reps:5} explosive barbell rows — maximum speed.',stat:'Speed',baseRP:32,baseStatGain:2,compound:true},
      {name:'Back Discipline Day',template:'Complete all back exercises with perfect scapular retraction today.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Kipping Pull-Up Speed',template:'Execute {sets} sets of {reps:10} kipping pull-ups for speed.',stat:'Speed',baseRP:25,baseStatGain:2,compound:true},
    
      {name:'Box Jump Speed Max',template:'Execute {sets} sets of {reps:5} maximum height box jumps.',stat:'Speed',baseRP:32,baseStatGain:2,compound:true,level:'advanced'},
      {name:'Explosive Hip Hinge',template:'Perform {sets} sets of {reps:8} explosive KB swing reps — max speed.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
      {name:'Speed Squat',template:'Execute {sets} sets of {reps:5} squats at 50% load — maximum bar velocity.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
],

    calisthenics: [
      {name:'Pull-Ups',template:'Execute {sets} sets of {reps:8} pull-ups. Full dead hang to chin over bar.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Chin-Ups',template:'Perform {sets} sets of {reps:10} chin-ups.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Wide Grip Pull-Ups',template:'Complete {sets} sets of {reps:8} wide-grip pull-ups.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Neutral Grip Pull-Ups',template:'Execute {sets} sets of {reps:10} neutral-grip pull-ups.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Commando Pull-Ups',template:'Perform {sets} sets of {reps:8} commando pull-ups alternating sides.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'L-Sit Pull-Ups',template:'Complete {sets} sets of {reps:5} L-sit pull-ups.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Archer Pull-Ups',template:'Execute {sets} sets of {reps:6} archer pull-ups each side.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'One Arm Pull-Up Negatives',template:'Perform {sets} sets of {reps:5} one-arm pull-up negatives each side.',stat:'Strength',baseRP:55,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Inverted Row',template:'Complete {sets} sets of {reps:12} inverted rows.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Scapular Pull-Ups',template:'Execute {sets} sets of {reps:12} scapular pull-ups.',stat:'Durability',baseRP:20,baseStatGain:1,compound:true},
      {name:'Dead Hang',template:'Perform {sets} {time:60s} dead hangs.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Active Hang',template:'Complete {sets} {time:45s} active scapular hang.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Bar Row',template:'Execute {sets} sets of {reps:12} bar rows (feet on ground).',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Front Lever',template:'Perform {sets} {time:10s} front lever holds.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced'},
      {name:'Tucked Front Lever [Cali]',template:'Complete {sets} {time:15s} tucked front lever holds.',stat:'Strength',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'One Leg Front Lever',template:'Execute {sets} {time:10s} one-leg front lever holds.',stat:'Strength',baseRP:55,baseStatGain:4,level:'advanced'},
      {name:'Back Lever [Cali]',template:'Perform {sets} {time:10s} back lever holds.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Ring Row',template:'Complete {sets} sets of {reps:12} ring rows.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ring Pull-Up',template:'Execute {sets} sets of {reps:8} ring pull-ups.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Weighted Pull-Ups',template:'Perform {sets} sets of {reps:6} weighted pull-ups.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Pull-Up 100 Challenge',template:'Complete 100 total pull-ups across as many sets as needed.',stat:'Stamina',baseRP:50,baseStatGain:4,compound:true,volume:'high'},
      {name:'Typewriter Pull-Ups',template:'Execute {sets} sets of {reps:6} typewriter pull-ups.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Pull-Up AMRAP',template:'Perform 1 AMRAP pull-up set — max reps.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Slow Pull-Ups',template:'Complete {sets} sets of {reps:6} slow pull-ups — 5s up, 5s down.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Explosive Pull-Ups',template:'Execute {sets} sets of {reps:6} explosive pull-ups.',stat:'Speed',baseRP:40,baseStatGain:3,compound:true},
      {name:'Muscle-Up',template:'Perform {sets} sets of {reps:3} bar muscle-ups.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced',compound:true},
      {name:'Ring Muscle-Up [Cali]',template:'Complete {sets} sets of {reps:3} ring muscle-ups.',stat:'Strength',baseRP:65,baseStatGain:5,level:'advanced',compound:true},
      {name:'Pull-Up Pyramid',template:'Execute pull-up pyramid: 1, 2, 3, 4, 5, 4, 3, 2, 1 reps.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Hollow Body Pull-Up',template:'Perform {sets} sets of {reps:8} hollow body pull-ups.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Head Banger Pull-Ups',template:'Complete {sets} sets of {reps:8} head banger pull-up reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Close Grip Chin-Ups',template:'Execute {sets} sets of {reps:10} close-grip chin-ups.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Clap Pull-Ups',template:'Perform {sets} sets of {reps:5} clapping pull-ups.',stat:'Speed',baseRP:50,baseStatGain:4,compound:true},
      {name:'Around The World Pull-Ups',template:'Complete {sets} sets of {reps:6} around-the-world pull-ups.',stat:'Agility',baseRP:50,baseStatGain:4,compound:true},
      {name:'One-Arm Pull-Up',template:'Execute {sets} sets of {reps:3} one-arm pull-ups each side.',stat:'Strength',baseRP:75,baseStatGain:6,compound:true,level:'advanced'},
      {name:'Human Flag Progression',template:'Perform {sets} {time:5s} human flag progressions.',stat:'Strength',baseRP:65,baseStatGain:5},
    
      // ── Additional Back Calisthenics Quests ──
      {name:'Typewriter Pull-Up',template:'Execute {sets} sets of {reps:6} typewriter pull-ups each side.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Pull-Up Drop Set',template:'Perform pull-up drop set: max wide grip + max neutral + max chin-up.',stat:'Stamina',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Tuck Front Lever',template:'Complete {sets} {time:10s} tuck front lever holds.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Advanced Tuck Front Lever',template:'Execute {sets} {time:10s} advanced tuck front lever holds.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced'},
      {name:'Straddle Front Lever',template:'Perform {sets} {time:5s} straddle front lever holds.',stat:'Strength',baseRP:65,baseStatGain:5,level:'advanced'},
      {name:'Full Front Lever',template:'Complete {sets} {time:5s} full front lever holds.',stat:'Strength',baseRP:75,baseStatGain:6,level:'advanced'},
      {name:'Weighted Pull-Up',template:'Execute {sets} sets of {reps:5} weighted pull-ups with added load.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Muscle-Up Negatives',template:'Perform {sets} sets of {reps:5} muscle-up negative reps.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced',compound:true},
      {name:'L-Sit Pull-Up',template:'Complete {sets} sets of {reps:5} L-sit pull-up reps.',stat:'Strength',baseRP:55,baseStatGain:4,compound:true},
      {name:'Ring Row Feet Elevated',template:'Execute {sets} sets of {reps:12} ring row reps with feet elevated.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Horizontal Pull Ladder',template:'Perform horizontal pull ladder: 1-2-3-4-5 inverted row reps.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Superman Pull-Up',template:'Complete {sets} sets of {reps:3} superman pull-ups.',stat:'Strength',baseRP:55,baseStatGain:5,compound:true},
      {name:'Chin-Up 21s',template:'Execute chin-up 21s: {reps:7} bottom half + {reps:7} top half + {reps:7} full.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Clapping Pull-Up',template:'Perform {sets} sets of {reps:5} clapping pull-ups.',stat:'Speed',baseRP:55,baseStatGain:5,compound:true},
      {name:'Pull-Up Ladder',template:'Complete pull-up ladder: 1-2-3-4-5-4-3-2-1 reps.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Ring Pull-Up [Cali]',template:'Execute {sets} sets of {reps:8} ring pull-up reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'One-Arm Assisted Pull-Up',template:'Perform {sets} sets of {reps:3} one-arm assisted pull-ups each side.',stat:'Strength',baseRP:60,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Dead Hang Max',template:'Complete 1 maximum-duration dead hang. Log your time.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Pull-Up Max Attempt',template:'Execute 1 max-rep pull-up set. The System demands your best.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Back Cali Power Day',template:'Perform back cali power day: {sets}×{reps:5} weighted pull-up + front lever work.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Wide Pull-Up Max',template:'Complete 1 maximum-rep wide-grip pull-up set.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Commando Pull-Up Superset',template:'Execute {sets} supersets: {reps:6} commando pull-up + {reps:10} inverted row.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Bar Row Pyramid',template:'Perform bar row pyramid: {reps:5}→{reps:10}→{reps:15}→{reps:20} reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Arch Body Pull',template:'Complete {sets} sets of {reps:8} arch body position pull-ups.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Ring Muscle-Up Attempt',template:'Perform {sets} ring muscle-up attempts or negatives.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced',compound:true},
      {name:'Pull-Up Strength Test',template:'Work up to max weighted pull-up. Track your max added load.',stat:'Strength',baseRP:60,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'False Grip Pull-Up',template:'Execute {sets} sets of {reps:6} false grip pull-up reps for ring prep.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Explosive Pull-Up (Calisthenics)',template:'Complete {sets} sets of {reps:5} explosive pull-up reps — maximum speed.',stat:'Speed',baseRP:40,baseStatGain:3,compound:true},
      {name:'Rear Weighted Pull-Up',template:'Perform {sets} sets of {reps:6} belt-weighted pull-up reps.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true},
      {name:'Behind Neck Pull-Up',template:'Execute {sets} sets of {reps:6} behind-the-neck pull-up reps.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Hanging Scapular Retract',template:'Perform {sets} sets of {reps:15} hanging scapular retraction reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Pull-Up 5x5',template:'Complete 5 sets of {reps:5} pull-ups — maximum quality.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Cali Pull Endurance',template:'Complete maximum pull exercise reps in {time:10m} — any variation.',stat:'Stamina',baseRP:38,baseStatGain:3},
],

    home: [
      {name:'Door Frame Pull-Ups',template:'Execute {sets} sets of {reps:8} pull-ups on door frame bar.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Table Inverted Row',template:'Perform {sets} sets of {reps:12} table inverted rows.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Chair Inverted Row',template:'Complete {sets} sets of {reps:15} chair inverted rows.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Towel Row',template:'Execute {sets} sets of {reps:12} towel rows over a door.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Band Pull-Apart',template:'Perform {sets} sets of {reps:20} resistance band pull-aparts.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Superman Hold',template:'Complete {sets} sets of {reps:15} superman back extensions.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Back Bridge',template:'Execute {sets} {time:30s} back bridge holds.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Reverse Snow Angel',template:'Perform {sets} sets of {reps:15} reverse snow angels on floor.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Home Pull-Up Bar',template:'Complete {sets} sets of {reps:10} pull-ups on home pull-up bar.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Dumbbell Row Home',template:'Execute {sets} sets of {reps:12} dumbbell rows (if you have dumbbells).',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Doorway Row',template:'Perform {sets} sets of {reps:15} doorway rows holding door frame.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Towel Deadlift',template:'Complete {sets} sets of {reps:10} towel deadlifts with heavy bag.',stat:'Strength',baseRP:20,baseStatGain:1,intensity:'heavy',compound:true},
      {name:'Floor Back Extension',template:'Execute {sets} sets of {reps:20} floor back extension reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Glute Bridge',template:'Perform {sets} sets of {reps:20} glute bridge reps.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Bird Dog',template:'Complete {sets} sets of {reps:12} bird dog reps each side.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Cat-Cow Stretch',template:'Execute {sets} {time:60s} cat-cow mobility flows.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Child Pose Back Stretch',template:'Perform {sets} {time:60s} child pose back stretches.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Standing Band Row',template:'Complete {sets} sets of {reps:15} standing band rows.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Backpack Row',template:'Execute {sets} sets of {reps:12} rows with a loaded backpack.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Home Lat Activation',template:'Perform {sets} {time:30s} active hang or door stretch for lat activation.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Resistance Band Pulldown',template:'Complete {sets} sets of {reps:15} band overhead pulldown reps.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Band Bent Over Row',template:'Execute {sets} sets of {reps:15} resistance band bent-over rows.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Table Pull-Up',template:'Perform {sets} sets of {reps:12} table pull-ups.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true},
      {name:'Staircase Dead Hang',template:'Complete {sets} {time:45s} dead hangs on stairs.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Home Back Day',template:'Execute full home back day: pull-ups + inverted rows + band rows.',stat:'Strength',baseRP:35,baseStatGain:2,compound:true,level:'beginner'},
    
      // ── Additional Back Home Quests ──
      {name:'Door Row Superset',template:'Execute {sets} supersets: {reps:12} underhand row + {reps:12} overhand row.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Floor Superman Extended',template:'Perform {sets} sets of {reps:15} extended superman holds.',stat:'Durability',baseRP:18,baseStatGain:1,volume:'high'},
      {name:'Table Row Elevated',template:'Complete {sets} sets of {reps:12} table inverted row reps — feet elevated.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Home Pull Ladder',template:'Execute towel row ladder: {reps:5}+{reps:8}+{reps:10}+{reps:12}.',stat:'Strength',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Back Arch Holds',template:'Perform {sets} {time:20s} lying back arch holds.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Resistance Band Row Home',template:'Complete {sets} sets of {reps:20} resistance band row reps.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Good Morning BW',template:'Execute {sets} sets of {reps:20} bodyweight good morning reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
      {name:'Hip Hinge Drill',template:'Perform {sets} sets of {reps:15} hip hinge drills for posterior chain.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
      {name:'Wall Angel Back',template:'Complete {sets} sets of {reps:15} wall angel reps for back mobility.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Back Circuit',template:'Execute home back circuit: superman + door row + table row — {sets} rounds.',stat:'Strength',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Prone Y-T-W Home',template:'Perform {sets} rounds of prone Y-T-W on floor.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Towel Pull-Up',template:'Complete {sets} sets of {reps:8} towel pull-up reps on door or bar.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Home Band Deadlift',template:'Execute {sets} sets of {reps:15} resistance band deadlift reps.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Back Extension BW',template:'Perform {sets} sets of {reps:20} bodyweight back extension reps on floor.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Broomstick Row',template:'Complete {sets} sets of {reps:15} broomstick bent-over row reps.',stat:'Strength',baseRP:12,baseStatGain:1},
],
  },

  // ══════════════════════════════════════════════════
  // SHOULDERS
  // ══════════════════════════════════════════════════
  shoulders: {
    gym: [
      {name:'Barbell Overhead Press',template:'Execute {sets} sets of {reps:8} barbell overhead press reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Dumbbell Shoulder Press',template:'Perform {sets} sets of {reps:10} dumbbell shoulder press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Lateral Raises',template:'Complete {sets} sets of {reps:15} lateral raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Front Raises',template:'Execute {sets} sets of {reps:15} front raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Rear Delt Fly',template:'Perform {sets} sets of {reps:15} rear delt fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Arnold Press',template:'Complete {sets} sets of {reps:10} Arnold press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Lateral Raise',template:'Execute {sets} sets of {reps:15} cable lateral raises per side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Machine Shoulder Press',template:'Perform {sets} sets of {reps:12} machine shoulder press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Upright Row',template:'Complete {sets} sets of {reps:12} barbell upright row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Face Pull [Gym]',template:'Execute {sets} sets of {reps:20} face pull reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Bent Over Lateral Raise',template:'Perform {sets} sets of {reps:15} bent-over lateral raises.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Plate Front Raise',template:'Complete {sets} sets of {reps:12} plate front raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Seated Dumbbell Press [Gym]',template:'Execute {sets} sets of {reps:10} seated dumbbell shoulder press.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Push Press',template:'Perform {sets} sets of {reps:6} push press reps.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Seated Barbell Press',template:'Complete {sets} sets of {reps:8} seated barbell press reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Shoulder Press Drop Set',template:'Execute 1 shoulder press drop set: {reps:8}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy'},
      {name:'Lateral Raise Drop Set',template:'Perform 1 lateral raise drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Shoulder Superset',template:'Complete {sets} supersets: {reps:12} overhead press + {reps:15} lateral raise.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Rear Delt Machine',template:'Execute {sets} sets of {reps:15} rear delt machine reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Overhead Press Max',template:'Work up to a heavy overhead press triple today.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true},
    
      // ── Additional Shoulder Gym Quests ──
      {name:'Arnold Press [Gym]',template:'Execute {sets} sets of {reps:10} Arnold press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Push Press [Gym]',template:'Perform {sets} sets of {reps:6} barbell push press reps.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Z-Press',template:'Complete {sets} sets of {reps:8} Z-press reps seated on floor.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Bradford Press',template:'Execute {sets} sets of {reps:10} Bradford press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Dumbbell OHP',template:'Perform {sets} sets of {reps:10} seated dumbbell overhead press reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Standing Barbell OHP',template:'Complete {sets} sets of {reps:8} standing barbell overhead press reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Seated Machine OHP',template:'Execute {sets} sets of {reps:12} seated machine overhead press reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Single Arm OHP',template:'Perform {sets} sets of {reps:10} single-arm dumbbell OHP each side.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Shoulder Press 5x5',template:'Complete 5 sets of {reps:5} barbell overhead press — strength focus.',stat:'Strength',baseRP:45,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'OHP Drop Set',template:'Execute OHP drop set: {reps:8} + {reps:10} + {reps:12}.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Superset Shoulder',template:'Perform {sets} supersets: {reps:10} OHP + {reps:15} lateral raise.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Shoulder Giant Set',template:'Complete giant set: OHP + front raise + lateral raise + rear fly — {reps:12} each.',stat:'Strength',baseRP:45,baseStatGain:3,volume:'high',compound:true},
      {name:'Pike Push-Up Weighted',template:'Execute {sets} sets of {reps:8} weighted pike push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Front Raise',template:'Perform {sets} sets of {reps:15} cable front raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Shoulder 100 Rep',template:'Complete 100 total shoulder reps (any mix) in minimum sets.',stat:'Stamina',baseRP:38,baseStatGain:3,volume:'high'},
      {name:'Front Raise Superset',template:'Execute {sets} supersets: {reps:12} dumbbell front raise + {reps:12} plate raise.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Shoulder Pump Circuit',template:'Perform shoulder pump: lateral raise + front raise + rear fly — no rest.',stat:'Stamina',baseRP:35,baseStatGain:2,volume:'high'},
      {name:'OHP Max Attempt',template:'Work up to a 1-rep max overhead press today. Track your number.',stat:'Strength',baseRP:65,baseStatGain:5,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Seated Arnold Press',template:'Complete {sets} sets of {reps:10} seated Arnold press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Shoulder Wave Load',template:'Execute OHP wave loading: {reps:6}→{reps:4}→{reps:2}→{reps:6}→{reps:4}→{reps:2}.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',level:'advanced',compound:true},
      {name:'Cable Shoulder Circuit',template:'Perform cable circuit: front raise + lateral raise + rear pull — {reps:15} each.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Shoulder Density Block',template:'Set timer for {time:8m}. Perform as many quality shoulder sets as possible.',stat:'Stamina',baseRP:40,baseStatGain:3,volume:'high'},
      {name:'Incline Front Raise',template:'Execute {sets} sets of {reps:12} incline bench front raise reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Landmine Press [Gym]',template:'Complete {sets} sets of {reps:10} landmine press reps each arm.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cuban Press',template:'Perform {sets} sets of {reps:10} Cuban press reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Dumbbell OHP AMRAP',template:'Execute 1 AMRAP set of dumbbell overhead press at 70%.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Shoulder Day Volume',template:'Complete high-volume shoulder day: 5 exercises × {sets} sets.',stat:'Stamina',baseRP:50,baseStatGain:4},
      {name:'Behind Neck Press',template:'Perform {sets} sets of {reps:10} behind-neck barbell press reps — careful.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Single Arm Landmine',template:'Execute {sets} sets of {reps:10} single-arm landmine press each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Shoulder Finisher',template:'Finish shoulder session with: {reps:25} lateral raise + {reps:20} front raise.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'OHP Cluster',template:'Execute OHP cluster: {reps:3}+{reps:3}+{reps:3} at 85%, 20s rest between.',stat:'Strength',baseRP:48,baseStatGain:4,intensity:'heavy',level:'advanced',compound:true},
      {name:'Kneeling OHP',template:'Perform {sets} sets of {reps:10} kneeling barbell overhead press reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Plate Front Raise [Gym]',template:'Complete {sets} sets of {reps:15} plate front raise reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Cable Upright Row',template:'Execute {sets} sets of {reps:12} cable upright row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Resistance Band OHP',template:'Perform {sets} sets of {reps:15} resistance band overhead press reps.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Dumbbell 3-Way Raise',template:'Complete {sets} rounds: {reps:10} front raise + {reps:10} lateral raise + {reps:10} rear fly.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Overhead Press Strength Test',template:'Work up to a 3-rep max overhead press. Log your number.',stat:'Strength',baseRP:58,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'Bottoms-Up Press',template:'Execute {sets} sets of {reps:8} bottoms-up kettlebell press each arm.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Shoulder Isolation Day',template:'Perform complete shoulder isolation: front + lateral + rear + OHP.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Swiss Bar OHP',template:'Complete {sets} sets of {reps:10} Swiss bar overhead press reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Snatch Grip Press',template:'Execute {sets} sets of {reps:8} snatch-grip overhead press reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true,level:'advanced'},
      {name:'Shoulder Press Pyramid',template:'Perform OHP pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6}.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},

      {name:'Push Press Speed',template:'Perform {sets} sets of {reps:5} push press reps at maximum speed.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Shoulder Discipline',template:'Execute shoulder work with strict no-momentum form all session.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'Lateral Raise Speed',template:'Complete {sets} sets of {reps:20} fast lateral raises.',stat:'Speed',baseRP:18,baseStatGain:1},
    ],
    calisthenics: [
      {name:'Pike Push-Ups Cali',template:'Execute {sets} sets of {reps:12} pike push-ups.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Handstand Push-Ups',template:'Perform {sets} sets of {reps:6} wall handstand push-ups.',stat:'Strength',baseRP:45,baseStatGain:4,level:'beginner',compound:true},
      {name:'Handstand Hold',template:'Complete {sets} {time:30s} wall handstand holds.',stat:'Strength',baseRP:35,baseStatGain:3,level:'beginner'},
      {name:'Free Handstand',template:'Execute {sets} {time:10s} freestanding handstand holds.',stat:'Agility',baseRP:60,baseStatGain:5},
      {name:'Pike Hold',template:'Perform {sets} {time:30s} pike hold (elevated feet).',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Pseudo Planche',template:'Complete {sets} {time:20s} pseudo planche hold.',stat:'Strength',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Wall Walks',template:'Execute {sets} sets of {reps:5} wall walks.',stat:'Strength',baseRP:35,baseStatGain:3,level:'beginner'},
      {name:'Headstand Push-Ups',template:'Perform {sets} sets of {reps:8} headstand push-ups.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Negative HSPU',template:'Complete {sets} sets of {reps:5} negative handstand push-up reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Shoulder Tap Plank',template:'Execute {sets} sets of {reps:20} shoulder tap planks.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Shoulder Conditioning',template:'Perform {sets} sets of {reps:20} band face pulls + {reps:15} pike push-ups.',stat:'Durability',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'HSPU Progression',template:'Complete HSPU skill session: 30 minutes of wall handstand and HSPU work.',stat:'Strength',baseRP:50,baseStatGain:4,level:'beginner',compound:true},
    
      // ── Additional Shoulder Cali Quests ──
      {name:'HSPU Training Block',template:'Execute structured HSPU progression: negatives + holds + full reps.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true},
      {name:'Wall Handstand Hold',template:'Perform {sets} {time:30s} wall handstand holds.',stat:'Strength',baseRP:35,baseStatGain:3,level:'beginner'},
      {name:'Freestanding Handstand',template:'Practice freestanding handstand balance for {time:10m}.',stat:'Strength',baseRP:55,baseStatGain:5},
      {name:'Pike Push-Up Drop',template:'Complete pike push-up drop set: max incline + max flat.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'HSPU Negatives',template:'Execute {sets} sets of {reps:5} handstand push-up negatives.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Handstand Walk',template:'Perform {sets} {time:10s} handstand walk attempts.',stat:'Agility',baseRP:55,baseStatGain:5,level:'advanced'},
      {name:'Shoulder HSPU Volume',template:'Complete HSPU volume day: max total reps in {time:10m}.',stat:'Stamina',baseRP:45,baseStatGain:3,volume:'high',compound:true},
      {name:'Band OHP Cali',template:'Execute {sets} sets of {reps:15} band-resisted overhead press reps.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Pike Push-Up Max',template:'Perform 1 maximum-rep pike push-up set.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Shoulder Stability Flow',template:'Complete {time:15m} shoulder stability flow: holds + movements.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Tiger Bend Push-Up',template:'Execute {sets} sets of {reps:5} tiger bend push-ups.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Wall-Supported HSPU',template:'Perform {sets} sets of {reps:8} wall-supported handstand push-ups.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Cali Shoulder Circuit',template:'Complete: {reps:10} pike push-up + {reps:5} HSPU + {time:20s} handstand hold.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Ring-Assisted Handstand',template:'Execute ring-assisted handstand practice for {time:10m}.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Dive Bomber Push-Up',template:'Perform {sets} sets of {reps:10} dive bomber push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Tuck Planche to HSPU',template:'Complete {sets} sets of tuck planche hold into handstand press.',stat:'Strength',baseRP:60,baseStatGain:5,level:'advanced',compound:true},
],
    home: [
      {name:'Pike Push-Ups Home [Home]',template:'Execute {sets} sets of {reps:12} pike push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Wall Handstand Practice',template:'Perform {sets} {time:20s} wall handstand holds.',stat:'Strength',baseRP:30,baseStatGain:2,level:'beginner'},
      {name:'Band Lateral Raise',template:'Complete {sets} sets of {reps:15} resistance band lateral raises.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Water Jug Press',template:'Execute {sets} sets of {reps:12} overhead press with water jugs.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true},
      {name:'Shoulder Circles',template:'Perform {sets} {time:60s} shoulder circle mobility work.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Wall Push-Up Overhead',template:'Complete {sets} sets of {reps:15} elevated wall push-ups.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Doorway Shoulder Stretch',template:'Execute {sets} {time:30s} doorway shoulder stretches.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Pike to Down Dog',template:'Perform {sets} sets of {reps:10} pike to downward dog transitions.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Home Shoulder Day',template:'Complete home shoulder day: pike push-ups + band raises + mobility.',stat:'Strength',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Shoulder Press Backpack',template:'Execute {sets} sets of {reps:12} shoulder press with loaded backpack.',stat:'Strength',baseRP:20,baseStatGain:1},
    
      // ── Additional Shoulder Home Quests ──
      {name:'Shoulder Band Circuit',template:'Execute home band circuit: OHP + lateral raise + front raise — {sets} rounds.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
      {name:'Home Pike Push-Up',template:'Perform {sets} sets of {reps:12} pike push-up reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Handstand Wall Home',template:'Complete {sets} {time:20s} wall handstand holds.',stat:'Strength',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Home OHP Bottle',template:'Execute {sets} sets of {reps:15} water bottle overhead press reps.',stat:'Strength',baseRP:10,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Shoulder AMRAP',template:'Perform 1 AMRAP set of pike push-ups.',stat:'Stamina',baseRP:22,baseStatGain:1,intensity:'heavy',level:'beginner'},
      {name:'Shoulder Stretch Home',template:'Complete {time:5m} shoulder mobility and stretch work.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Pike Ladder',template:'Execute pike push-up ladder: 2-4-6-8-6-4-2 reps.',stat:'Strength',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Isometric Shoulder Press',template:'Perform {sets} {time:30s} isometric overhead press holds.',stat:'Strength',baseRP:15,baseStatGain:1,compound:true},
      {name:'Chair Dip Shoulder',template:'Complete {sets} sets of {reps:12} tricep chair dips with upright torso.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true},
      {name:'Home Shoulder Day [Home]',template:'Execute full home shoulder day: band work + pike push-ups + handstand.',stat:'Strength',baseRP:28,baseStatGain:2,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // BICEPS
  // ══════════════════════════════════════════════════
  biceps: {
    gym: [
      {name:'Barbell Curl',template:'Execute {sets} sets of {reps:10} barbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Curl',template:'Perform {sets} sets of {reps:12} dumbbell curl reps each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hammer Curl',template:'Complete {sets} sets of {reps:12} hammer curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Incline Dumbbell Curl',template:'Execute {sets} sets of {reps:10} incline dumbbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Concentration Curl',template:'Perform {sets} sets of {reps:12} concentration curl reps each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Preacher Curl',template:'Complete {sets} sets of {reps:10} preacher curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Curl',template:'Execute {sets} sets of {reps:15} cable curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'High Cable Curl',template:'Perform {sets} sets of {reps:15} high cable curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Spider Curl',template:'Complete {sets} sets of {reps:10} spider curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Zottman Curl',template:'Execute {sets} sets of {reps:10} Zottman curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'21s Curl',template:'Perform {sets} sets of 21s: 7 bottom-half + 7 top-half + 7 full curls.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'EZ Bar Curl',template:'Complete {sets} sets of {reps:10} EZ bar curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Reverse Curl',template:'Execute {sets} sets of {reps:12} reverse barbell curl reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Wrist Curl',template:'Perform {sets} sets of {reps:20} wrist curl reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Bicep Drop Set',template:'Complete 1 bicep drop set: {reps:8}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:35,baseStatGain:2,intensity:'heavy'},
      {name:'Alternating Curl',template:'Execute {sets} sets of {reps:12} alternating dumbbell curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cross Body Curl',template:'Perform {sets} sets of {reps:12} cross-body hammer curls.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Seated Curl',template:'Complete {sets} sets of {reps:12} seated dumbbell curls.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Machine Curl',template:'Execute {sets} sets of {reps:12} machine curl reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Bicep Superset',template:'Perform {sets} supersets: {reps:10} barbell curl + {reps:15} cable curl.',stat:'Strength',baseRP:32,baseStatGain:2},
    
      // ── Additional Bicep Gym Quests ──
      {name:'Barbell Curl Heavy',template:'Execute {sets} sets of {reps:6} heavy barbell curl reps.',stat:'Strength',baseRP:32,baseStatGain:2,intensity:'heavy'},
      {name:'Incline Dumbbell Curl [Gym]',template:'Perform {sets} sets of {reps:10} incline dumbbell curl reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Preacher Curl [Gym]',template:'Complete {sets} sets of {reps:10} preacher curl reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Concentration Curl [Gym]',template:'Execute {sets} sets of {reps:12} concentration curl reps each arm.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Curl [Gym]',template:'Perform {sets} sets of {reps:12} cable curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Hammer Curl [Gym]',template:'Complete {sets} sets of {reps:10} hammer curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Zottman Curl [Gym]',template:'Execute {sets} sets of {reps:10} Zottman curl reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Spider Curl [Gym]',template:'Perform {sets} sets of {reps:12} spider curl reps on incline bench.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Rope Hammer Curl',template:'Complete {sets} sets of {reps:12} rope cable hammer curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Bicep 21s',template:'Execute bicep 21s: {reps:7} bottom + {reps:7} top + {reps:7} full — {sets} sets.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Curl Drop Set',template:'Perform barbell curl drop set: {reps:8} + {reps:10} + {reps:12}.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Cable Curl Superset',template:'Complete {sets} supersets: {reps:12} cable curl + {reps:12} hammer curl.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Drag Curl',template:'Execute {sets} sets of {reps:10} drag curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Reverse Curl [Gym]',template:'Perform {sets} sets of {reps:12} reverse grip curl reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Dumbbell Curl Ladder',template:'Complete dumbbell curl ladder: {reps:5}+{reps:10}+{reps:15} reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Bicep Peak Day',template:'Execute bicep peak session: incline + preacher + concentration curls.',stat:'Strength',baseRP:42,baseStatGain:3},
      {name:'Machine Curl [Gym]',template:'Perform {sets} sets of {reps:12} machine curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Barbell Curl Pause',template:'Complete {sets} sets of {reps:8} curl reps with 2s pause at midpoint.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Alternating Dumbbell Curl',template:'Execute {sets} sets of {reps:12} alternating dumbbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Bicep AMRAP',template:'Perform 1 AMRAP set of barbell curls at 70%.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Wide Grip Curl',template:'Complete {sets} sets of {reps:10} wide-grip barbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Narrow Grip Curl',template:'Execute {sets} sets of {reps:10} narrow-grip barbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Curl Burnout',template:'Perform cable curl burnout: {reps:25} reps minimum weight.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Bicep Giant Set',template:'Complete giant set: barbell curl + dumbbell curl + cable curl + hammer curl.',stat:'Strength',baseRP:45,baseStatGain:3,volume:'high'},
      {name:'Supinating Curl',template:'Execute {sets} sets of {reps:12} supinating dumbbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Preacher Curl Drop Set',template:'Perform preacher curl drop set: {reps:8} + {reps:12} + {reps:15}.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Bicep Strength Test',template:'Work up to a 1-rep max barbell curl. Log your number.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy'},
      {name:'Bicep Pyramid',template:'Complete barbell curl pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6}.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Bicep Volume Day',template:'Execute bicep volume day: 6 sets each of 3 curl variations.',stat:'Stamina',baseRP:45,baseStatGain:3,volume:'high'},
      {name:'EZ-Bar Curl',template:'Perform {sets} sets of {reps:10} EZ-bar curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Single Arm Preacher',template:'Complete {sets} sets of {reps:12} single-arm preacher curl each side.',stat:'Strength',baseRP:25,baseStatGain:2},

      // ── Pull Balance Fix: Additional Bicep Gym ──
      {name:'Close Grip Chin-Up',template:'Execute {sets} sets of {reps:8} close-grip chin-up reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Tempo Curl 4-0-1',template:'Perform {sets} sets of {reps:8} barbell curls with 4s eccentric.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Hammer Curl',template:'Complete {sets} sets of {reps:12} incline hammer curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cross Body Hammer Curl',template:'Execute {sets} sets of {reps:12} cross-body hammer curl reps each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cable Curl Behind Back',template:'Perform {sets} sets of {reps:15} behind-the-back cable curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Waiter Curl',template:'Complete {sets} sets of {reps:12} waiter curl reps — DB held vertical.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Bayesian Curl',template:'Execute {sets} sets of {reps:12} Bayesian cable curl reps — cable behind.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Prone Incline Curl',template:'Perform {sets} sets of {reps:12} prone incline dumbbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Standing Barbell Curl Pause',template:'Complete {sets} sets of {reps:8} standing curl reps with 2s pause at top.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Machine Preacher Curl',template:'Execute {sets} sets of {reps:12} machine preacher curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'EZ Bar Preacher Curl',template:'Perform {sets} sets of {reps:10} EZ bar preacher curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Curl and Press Combo',template:'Complete {sets} sets of {reps:10} dumbbell curl-to-press combo reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Reverse EZ Bar Curl',template:'Execute {sets} sets of {reps:12} reverse EZ bar curl reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Bicep Finisher 100s',template:'Perform {reps:100} total curl reps with light weight — minimum sets.',stat:'Stamina',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Dumbbell Curl Iso Hold',template:'Complete {sets} sets of {reps:10} dumbbell curls with 3s iso at top.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Wide Curl to Narrow',template:'Execute {sets} sets of {reps:10} wide-to-narrow barbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Bicep Superset Wide Narrow',template:'Perform {sets} supersets: {reps:10} wide grip + {reps:10} narrow grip curl.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Single Arm Cable Curl Seated',template:'Complete {sets} sets of {reps:15} seated single-arm cable curl each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Chin-Up Negative Slow',template:'Execute {sets} sets of {reps:5} slow 5s chin-up negatives.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Bicep Density Set',template:'Perform {time:6m} straight of alternating dumbbell curls — no rest.',stat:'Stamina',baseRP:32,baseStatGain:2},

      // ── Advanced Bicep Quests ──
      {name:'One-Arm Chin-Up Negative',template:'Execute {sets} sets of {reps:3} one-arm chin-up negatives each arm — 5s down.',stat:'Strength',baseRP:60,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Weighted Chin-Up Heavy',template:'Perform {sets} sets of {reps:3} weighted chin-up reps at near-max load.',stat:'Strength',baseRP:55,baseStatGain:5,compound:true,level:'advanced',intensity:'heavy'},
      {name:'Bicep Strength Test Heavy',template:'Work up to a 1RM barbell curl. Log your max.',stat:'Strength',baseRP:55,baseStatGain:5,level:'advanced',intensity:'heavy'},
      {name:'Ring Curl Advanced',template:'Complete {sets} sets of {reps:8} ring curl reps — full supination.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced'},
      {name:'Incline Curl Drop Set Heavy',template:'Execute incline DB curl triple drop set: {reps:6} heavy + {reps:8} medium + {reps:12} light.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced',intensity:'heavy'},
      {name:'Bicep Wave Load',template:'Perform barbell curl wave loading: {reps:6}→{reps:4}→{reps:2}→{reps:6}→{reps:4}→{reps:2}.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced',intensity:'heavy'},
      {name:'L-Sit Chin-Up',template:'Execute {sets} sets of {reps:5} L-sit chin-up reps.',stat:'Strength',baseRP:55,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Bicep 6 Week PR',template:'Set a new 3RM bicep curl PR today. Your previous best must fall.',stat:'Strength',baseRP:65,baseStatGain:6,level:'advanced',intensity:'heavy'},
      {name:'Behind-Head Chin-Up',template:'Perform {sets} sets of {reps:6} behind-head chin-up reps.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Supinated Deadlift Row',template:'Complete {sets} sets of {reps:8} supinated-grip deadlift row combo reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,level:'advanced'},

      {name:'Wide Chin-Up',template:'Execute {sets} sets of {reps:8} wide-grip chin-up reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Neutral Grip Chin-Up',template:'Perform {sets} sets of {reps:10} neutral-grip chin-up reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Inverted Row Supinated',template:'Complete {sets} sets of {reps:12} supinated inverted row reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Ring Row Supinated',template:'Execute {sets} sets of {reps:12} supinated ring row reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Chin-Up Speed',template:'Perform {sets} sets of {reps:5} explosive chin-up reps.',stat:'Speed',baseRP:32,baseStatGain:2,compound:true},
      {name:'Towel Chin-Up',template:'Complete {sets} sets of {reps:6} towel grip chin-up reps.',stat:'Durability',baseRP:35,baseStatGain:3,compound:true},
      {name:'Chin-Up Ladder',template:'Execute chin-up ladder: 1-2-3-4-5-4-3-2-1 reps.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'Close Grip Chin Max',template:'Perform 1 max-rep close-grip chin-up set. Log your number.',stat:'Stamina',baseRP:32,baseStatGain:2,compound:true},
      {name:'Mixed Grip Pull-Up',template:'Complete {sets} sets of {reps:6} mixed grip pull-up reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Chin-Up Negative 5s',template:'Execute {sets} sets of {reps:5} 5-second chin-up negatives.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},

      {name:'Speed Curl',template:'Execute {sets} sets of {reps:15} fast curl reps — controlled eccentric, explosive concentric.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Bicep Discipline',template:'Perform every curl with full supination and peak contraction today.',stat:'Discipline',baseRP:22,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Chin-Up Bicep Focus',template:'Execute {sets} sets of {reps:10} supinated chin-ups — bicep focus.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Negative Chin-Up',template:'Perform {sets} sets of {reps:8} chin-up negatives — 5s down.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Commando Pull-Ups Bicep',template:'Complete {sets} sets of {reps:8} commando pull-ups.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Ring Chin-Up',template:'Execute {sets} sets of {reps:8} ring chin-ups.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Close Grip Chin-Up (Calisthenics)',template:'Perform {sets} sets of {reps:10} close-grip chin-ups.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'One-Arm Chin-Up Neg',template:'Complete {sets} sets of {reps:5} one-arm chin-up negatives each side.',stat:'Strength',baseRP:55,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Bar Bicep Curl',template:'Execute {sets} sets of {reps:8} bar bicep curl (straight bar low height).',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Ring Bicep Curl',template:'Perform {sets} sets of {reps:10} ring bicep curl reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Flexed Arm Hang',template:'Complete {sets} {time:30s} flexed arm hangs at chin-up position.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Inverted Curl',template:'Execute {sets} sets of {reps:12} inverted row curling motion.',stat:'Strength',baseRP:25,baseStatGain:2},
    
      // ── Additional Bicep Cali Quests ──
      {name:'Chin-Up Max',template:'Execute 1 maximum-rep chin-up set.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Weighted Chin-Up',template:'Perform {sets} sets of {reps:6} weighted chin-up reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Commando Curl',template:'Complete {sets} sets of {reps:8} commando pull-up reps each side.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Chin-Up 21s [Cali]',template:'Execute chin-up 21s: {reps:7} bottom + {reps:7} top + {reps:7} full.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Neutral Grip Chin Max',template:'Perform 1 max-rep neutral grip chin-up set.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Ring Curl',template:'Complete {sets} sets of {reps:10} ring curl reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Bicep Cali Circuit',template:'Execute circuit: {reps:8} chin-up + {reps:12} inverted curl + {reps:5} ring curl.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'One-Arm Chin-Up Training',template:'Perform {sets} sets of one-arm chin-up negatives each side.',stat:'Strength',baseRP:60,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Towel Curl',template:'Complete {sets} sets of {reps:10} towel curl reps.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Chin-Up Cluster',template:'Execute chin-up cluster: {reps:3}+{reps:3}+{reps:3} with 15s rest.',stat:'Strength',baseRP:42,baseStatGain:3,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Supinated Inverted Row',template:'Perform {sets} sets of {reps:12} supinated-grip inverted rows.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Band-Assisted Curl',template:'Complete {sets} sets of {reps:15} band-assisted curl reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Chin-Up Pyramid',template:'Execute chin-up pyramid: 1-2-3-4-5-4-3-2-1 reps.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Bar Curl',template:'Perform {sets} sets of {reps:12} bar underhand curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
],
    home: [
      {name:'Household Object Curl',template:'Execute {sets} sets of {reps:15} curls with household items.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Backpack Curl',template:'Perform {sets} sets of {reps:12} curls with a loaded backpack.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Towel Bicep Curl',template:'Complete {sets} sets of {reps:12} towel bicep curl reps.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Band Curl',template:'Execute {sets} sets of {reps:15} resistance band curl reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Chin-Up Bar Home',template:'Perform {sets} sets of {reps:10} chin-ups on home pull-up bar.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Table Row Bicep',template:'Complete {sets} sets of {reps:12} table rows focusing on bicep.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Water Bottle Curl',template:'Execute {sets} sets of {reps:20} water bottle curls.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Isometric Bicep Hold',template:'Perform {sets} {time:30s} isometric bicep holds against door frame.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Bicep Day',template:'Complete home bicep day: band + object curls + chin-ups.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
    
      // ── Additional Bicep Home Quests ──
      {name:'Door Frame Curl',template:'Execute {sets} sets of {reps:12} door frame towel curl reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Home Hammer Curl',template:'Perform {sets} sets of {reps:12} home hammer curl reps (water bottle).',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Isometric Curl Hold',template:'Complete {sets} {time:30s} isometric curl holds at 90 degrees.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Bicep Superset',template:'Execute home superset: {reps:15} band curl + {reps:10} towel row.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Chin-Up Max Home',template:'Perform 1 max-rep chin-up set at home bar.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Home Bicep Circuit',template:'Complete home bicep circuit: band curl + door curl + isometric hold.',stat:'Strength',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Bag Curl',template:'Execute {sets} sets of {reps:12} heavy bag curl reps.',stat:'Strength',baseRP:12,baseStatGain:1,intensity:'heavy'},
      {name:'Slow Eccentric Curl Home',template:'Perform {sets} sets of {reps:8} 5-second eccentric home curls.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // TRICEPS
  // ══════════════════════════════════════════════════
  triceps: {
    gym: [
      {name:'Tricep Pushdown',template:'Execute {sets} sets of {reps:15} tricep rope pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Skull Crushers',template:'Perform {sets} sets of {reps:10} EZ bar skull crusher reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Close Grip Bench [Gym]',template:'Complete {sets} sets of {reps:8} close-grip bench press reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Overhead Tricep Extension',template:'Execute {sets} sets of {reps:12} overhead tricep extension reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Tricep Dips Weighted',template:'Perform {sets} sets of {reps:10} weighted tricep dips.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Kickback',template:'Complete {sets} sets of {reps:12} tricep kickback reps each arm.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Cable Overhead Extension',template:'Execute {sets} sets of {reps:12} cable overhead tricep extension.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'V-Bar Pushdown',template:'Perform {sets} sets of {reps:12} V-bar tricep pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Reverse Grip Pushdown',template:'Complete {sets} sets of {reps:15} reverse-grip pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Tricep Drop Set',template:'Execute 1 tricep pushdown drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Diamond Push-Up Gym',template:'Perform {sets} sets of {reps:12} diamond push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'JM Press',template:'Complete {sets} sets of {reps:8} JM press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Tate Press',template:'Execute {sets} sets of {reps:10} Tate press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Tricep Superset',template:'Perform {sets} supersets: {reps:10} skull crushers + {reps:15} pushdown.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Tricep Finisher',template:'Complete tricep finisher: {reps:100} total pushdown reps.',stat:'Stamina',baseRP:30,baseStatGain:2},
    
      // ── Additional Tricep Gym Quests ──
      {name:'Close Grip Bench [Gym] v2',template:'Execute {sets} sets of {reps:8} close-grip bench press reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Tricep Pushdown [Gym]',template:'Perform {sets} sets of {reps:15} cable tricep pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Overhead Tricep Extension [Gym]',template:'Complete {sets} sets of {reps:12} overhead tricep extension reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Skullcrusher',template:'Execute {sets} sets of {reps:10} EZ-bar skullcrusher reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Rope Pushdown',template:'Perform {sets} sets of {reps:15} rope cable pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Single Arm Pushdown',template:'Complete {sets} sets of {reps:15} single-arm cable pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Tricep Kickback',template:'Execute {sets} sets of {reps:15} dumbbell tricep kickback reps each arm.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Diamond Push-Up Weighted',template:'Perform {sets} sets of {reps:12} weighted diamond push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Weighted Tricep Dip',template:'Complete {sets} sets of {reps:10} weighted tricep dip reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Tricep 21s',template:'Execute tricep pushdown 21s: {reps:7} bottom + {reps:7} top + {reps:7} full.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Overhead DB Extension',template:'Perform {sets} sets of {reps:12} overhead dumbbell tricep extension.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Tricep Drop Set [Gym]',template:'Complete pushdown drop set: {reps:12} + {reps:15} + {reps:20}.',stat:'Strength',baseRP:32,baseStatGain:2,intensity:'heavy'},
      {name:'Tricep Giant Set',template:'Execute giant set: pushdown + overhead ext + kickback + skullcrusher.',stat:'Strength',baseRP:42,baseStatGain:3,volume:'high'},
      {name:'Board Press Tricep',template:'Perform {sets} sets of {reps:6} 3-board press reps — tricep focus.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'JM Press [Gym]',template:'Complete {sets} sets of {reps:8} JM press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'CG Bench 5x5',template:'Execute 5 sets of {reps:5} close-grip bench press.',stat:'Strength',baseRP:42,baseStatGain:3,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Tricep AMRAP',template:'Perform 1 AMRAP set of cable pushdown at 70%.',stat:'Stamina',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Reverse Grip Pushdown [Gym]',template:'Complete {sets} sets of {reps:15} reverse-grip cable pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Tricep Pyramid',template:'Execute pushdown pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6}.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Lying Dumbbell Extension',template:'Perform {sets} sets of {reps:12} lying dumbbell tricep extension reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Tricep Superset [Gym]',template:'Complete {sets} supersets: {reps:10} close bench + {reps:15} pushdown.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Tricep Volume Day',template:'Execute tricep volume: 5 exercises × {sets} sets for full development.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Skullcrusher Superset',template:'Perform {sets} supersets: {reps:8} skullcrusher + {reps:12} pushdown.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Overhead Rope Extension',template:'Complete {sets} sets of {reps:15} overhead rope cable extension reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Tricep Strength Test',template:'Work up to a 3-rep max close-grip bench press. Track your number.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Tricep Dip 100',template:'Complete 100 total tricep dip reps in minimum sets.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true,volume:'high'},
      {name:'Single Arm Overhead Ext',template:'Execute {sets} sets of {reps:12} single-arm overhead extension each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Tricep Burnout Finisher',template:'End tricep session with {reps:30} rope pushdowns.',stat:'Stamina',baseRP:22,baseStatGain:1,volume:'high'},

      {name:'Tricep Pushdown Beginner',template:'Perform 3 sets of {reps:15} cable pushdown reps with light weight.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Chair Dip Beginner',template:'Execute 3 sets of {reps:10} chair tricep dip reps.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Tricep Extension Beginner',template:'Complete 3 sets of {reps:15} overhead tricep extension with light dumbbell.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Diamond Push-Up Beginner',template:'Perform 3 sets of {reps:8} diamond push-up reps — knees down if needed.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Band Pushdown Beginner',template:'Execute 3 sets of {reps:20} resistance band tricep pushdown reps.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},

      {name:'Tricep Speed Press',template:'Perform {sets} sets of {reps:8} close-grip bench press at maximum speed.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
      {name:'Tricep Discipline',template:'Execute every tricep exercise with full lockout and peak contraction today.',stat:'Discipline',baseRP:20,baseStatGain:2},
      {name:'Explosive Dip',template:'Complete {sets} sets of {reps:6} explosive parallel bar dip reps.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
    ],
    calisthenics: [
      {name:'Dips Tricep Focus',template:'Execute {sets} sets of {reps:15} upright dips — tricep focus.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Close Grip Push-Up',template:'Perform {sets} sets of {reps:15} close-grip push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Diamond Push-Up Cali',template:'Complete {sets} sets of {reps:12} diamond push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Ring Dip Tricep',template:'Execute {sets} sets of {reps:10} ring dips — tricep focus.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Tiger Bend Push-Up [Cali]',template:'Perform {sets} sets of {reps:6} tiger bend push-ups.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Bar Tricep Extension',template:'Complete {sets} sets of {reps:12} bar tricep extensions.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Korean Dip',template:'Execute {sets} sets of {reps:8} Korean dips.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Tricep Dip AMRAP',template:'Perform 1 AMRAP dip set — max reps.',stat:'Stamina',baseRP:30,baseStatGain:2,intensity:'heavy',compound:true},
      {name:'Planche Tricep Work',template:'Complete {sets} sets of {reps:8} planche lean with tricep focus.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced'},
    
      // ── Additional Tricep Cali Quests ──
      {name:'Diamond Push-Up Max',template:'Execute 1 maximum-rep diamond push-up set.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Parallel Bar Dip Max',template:'Perform 1 maximum-rep parallel bar dip set.',stat:'Stamina',baseRP:32,baseStatGain:2,compound:true},
      {name:'Ring Dip',template:'Complete {sets} sets of {reps:8} ring dip reps.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Tricep Cali Circuit',template:'Execute circuit: {reps:12} dips + {reps:10} diamond push-up + {reps:8} tricep push-up.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'Weighted Bar Dip',template:'Perform {sets} sets of {reps:8} weighted parallel bar dips.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Dip Pyramid [Cali]',template:'Complete dip pyramid: 5-8-10-12-10-8-5 reps.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true},
      {name:'Ring Dip Negatives',template:'Execute {sets} sets of {reps:5} ring dip negative reps.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Tricep Push-Up Wide',template:'Perform {sets} sets of {reps:15} tricep-focused narrow push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Straight Bar Dip',template:'Complete {sets} sets of {reps:10} straight bar dip reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Korean Dip [Cali]',template:'Execute {sets} sets of {reps:6} Korean dip reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Tricep Cali Max Day',template:'Perform max-effort cali tricep day: weighted dip + ring dip + diamond push.',stat:'Strength',baseRP:48,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Dip Volume Day Cali',template:'Complete tricep dip volume: {sets}×{reps:15} parallel bar dips.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
],
    home: [
      {name:'Chair Dip Tricep',template:'Execute {sets} sets of {reps:15} chair tricep dips.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true},
      {name:'Diamond Push-Up Home',template:'Perform {sets} sets of {reps:12} diamond push-ups at home.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Overhead Towel Extension',template:'Complete {sets} sets of {reps:12} overhead towel tricep extension.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Close Push-Up Home',template:'Execute {sets} sets of {reps:15} close-grip push-ups.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Band Tricep Extension',template:'Perform {sets} sets of {reps:20} band overhead tricep extension.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Tricep Bench Dip',template:'Complete {sets} sets of {reps:15} bench/couch tricep dips.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true},
      {name:'Tricep Kickback Home',template:'Execute {sets} sets of {reps:15} tricep kickbacks with water jug.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Tricep Day',template:'Perform home tricep day: chair dips + diamond push-ups + extensions.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
    
      // ── Additional Tricep Home Quests ──
      {name:'Chair Dip Max',template:'Execute 1 maximum-rep chair tricep dip set.',stat:'Stamina',baseRP:22,baseStatGain:1,compound:true},
      {name:'Diamond Push-Up Home [Home]',template:'Perform {sets} sets of {reps:12} diamond push-up reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Tricep Band Pushdown',template:'Complete {sets} sets of {reps:20} band tricep pushdown reps.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Overhead Extension Home',template:'Execute {sets} sets of {reps:15} overhead tricep extension with bag or bottle.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Home Tricep Circuit',template:'Perform home circuit: diamond push-up + chair dip + overhead extension.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Tricep AMRAP Home',template:'Complete 1 AMRAP diamond push-up set.',stat:'Stamina',baseRP:20,baseStatGain:1,intensity:'heavy'},
      {name:'Home Kickback',template:'Execute {sets} sets of {reps:15} dumbbell/bottle kickback reps each arm.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Elevated Tricep Dip',template:'Perform {sets} sets of {reps:12} elevated chair dip reps.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true},
],
  },

  // ══════════════════════════════════════════════════
  // LEGS - QUADS
  // ══════════════════════════════════════════════════
  quads: {
    gym: [
      {name:'Barbell Back Squat',template:'Execute {sets} sets of {reps:8} barbell back squat reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Front Squat',template:'Perform {sets} sets of {reps:6} front squat reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Leg Press',template:'Complete {sets} sets of {reps:12} leg press reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Leg Extension',template:'Execute {sets} sets of {reps:15} leg extension reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hack Squat',template:'Perform {sets} sets of {reps:10} hack squat reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Bulgarian Split Squat',template:'Complete {sets} sets of {reps:10} Bulgarian split squats each leg.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Lunge',template:'Execute {sets} sets of {reps:12} barbell/dumbbell lunges each leg.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Goblet Squat',template:'Perform {sets} sets of {reps:15} goblet squats with kettlebell.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Box Squat',template:'Complete {sets} sets of {reps:8} box squat reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Pause Squat',template:'Execute {sets} sets of {reps:5} pause squats (3s hold at bottom).',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Squat Drop Set',template:'Perform 1 squat drop set: {reps:5}+{reps:8}+{reps:12}.',stat:'Strength',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Leg Press Drop Set',template:'Complete 1 leg press drop set: {reps:10}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:35,baseStatGain:2,intensity:'heavy',compound:true},
      {name:'Squat 5x5',template:'Execute 5 sets of {reps:5} squats.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Squat Max Attempt',template:'Work up to a 1-rep max squat today.',stat:'Strength',baseRP:75,baseStatGain:6,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Leg Day Heavy',template:'Perform heavy leg day: {sets}×{reps:5} squat + {sets}×{reps:10} leg press.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Leg Day Volume',template:'Complete volume leg day: {sets}×{reps:15} squat + {sets}×{reps:20} extension.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Squat Superset',template:'Execute {sets} supersets: {reps:8} squat + {reps:15} leg extension.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Step-Ups',template:'Perform {sets} sets of {reps:12} weighted step-ups each leg.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Wall Sit',template:'Complete {sets} {time:60s} wall sits.',stat:'Durability',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Sissy Squat',template:'Execute {sets} sets of {reps:12} sissy squat reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
    
      // ── Additional Quad Gym Quests ──
      {name:'Back Squat 5x5',template:'Execute 5 sets of {reps:5} back squats.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Front Squat [Gym]',template:'Perform {sets} sets of {reps:8} front squat reps.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Bulgarian Split Squat [Gym]',template:'Complete {sets} sets of {reps:10} Bulgarian split squats each side.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Hack Squat Machine',template:'Execute {sets} sets of {reps:12} hack squat machine reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Leg Extension Machine',template:'Perform {sets} sets of {reps:15} leg extension machine reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Sissy Squat [Gym]',template:'Complete {sets} sets of {reps:10} sissy squat reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Goblet Squat [Gym]',template:'Execute {sets} sets of {reps:15} goblet squat reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Step-Up Weighted',template:'Perform {sets} sets of {reps:12} weighted step-up reps each leg.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Walking Lunge',template:'Complete {sets} sets of {reps:20} walking lunge reps (10 each leg).',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Squat Drop Set [Gym]',template:'Execute squat drop set: {reps:10} heavy + {reps:12} medium + {reps:15} light.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true,level:'beginner'},
      {name:'Pause Squat [Gym]',template:'Perform {sets} sets of {reps:5} pause squat reps (3s pause at bottom).',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Leg Press Drop Set [Gym]',template:'Complete leg press drop set: {reps:12} + {reps:15} + {reps:20}.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Squat Wave Loading',template:'Execute wave loading: {reps:6}→{reps:4}→{reps:2}→{reps:6}→{reps:4}→{reps:2}.',stat:'Strength',baseRP:52,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Quad Giant Set',template:'Perform giant set: squat + leg press + leg extension + step-up.',stat:'Stamina',baseRP:50,baseStatGain:4,compound:true,volume:'high'},
      {name:'Squat Superset [Gym]',template:'Complete {sets} supersets: {reps:10} back squat + {reps:15} leg extension.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Jump Squat Weighted',template:'Execute {sets} sets of {reps:8} weighted jump squat reps.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Leg Day Heavy [Gym]',template:'Perform heavy leg day: {sets}×{reps:5} squat + {sets}×{reps:8} leg press.',stat:'Strength',baseRP:55,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Squat AMRAP',template:'Execute 1 AMRAP set of squats at 70%. Log total reps.',stat:'Stamina',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Narrow Stance Squat',template:'Perform {sets} sets of {reps:10} narrow stance squat reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Wide Stance Squat',template:'Complete {sets} sets of {reps:10} wide stance squat reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Quad Isolation Day',template:'Execute quad isolation: leg extension + leg press + split squat + step-up.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true},
      {name:'Barbell Lunge',template:'Perform {sets} sets of {reps:10} barbell walking lunge reps each leg.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Squat Pyramid',template:'Complete squat pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6}.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Tempo Squat',template:'Execute {sets} sets of {reps:6} squat reps with 4-1-2 tempo.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Squat Max Attempt [Gym]',template:'Work up to a 1-rep max squat today. The System watches.',stat:'Strength',baseRP:70,baseStatGain:6,intensity:'heavy',compound:true,level:'advanced'},
      {name:'Leg Press High Volume',template:'Perform {sets} sets of {reps:20} leg press reps — high rep pump.',stat:'Stamina',baseRP:35,baseStatGain:2,compound:true},
      {name:'Landmine Squat',template:'Complete {sets} sets of {reps:12} landmine squat reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Reverse Lunge',template:'Execute {sets} sets of {reps:12} reverse lunge reps each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true},
      {name:'Box Squat [Gym]',template:'Perform {sets} sets of {reps:5} box squat reps.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Quarter Squat Overload',template:'Complete {sets} sets of {reps:8} quarter squat reps with overload weight.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Squat Cluster',template:'Execute squat cluster: {reps:3}+{reps:3}+{reps:3} at 85%, 20s rest.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true,level:'advanced'},

      // ── Leg Pool Expansion ──
      {name:'Hack Squat Drop Set',template:'Execute hack squat drop set: {reps:10} + {reps:12} + {reps:15}.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Leg Press 20-Rep',template:'Perform 1 set of {reps:20} leg press reps — breathing squats protocol.',stat:'Stamina',baseRP:32,baseStatGain:2,compound:true},
      {name:'Bulgarian Split 5x5',template:'Execute 5 sets of {reps:5} Bulgarian split squats each leg.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Squat Paused',template:'Perform {sets} sets of {reps:6} paused squat reps (3s pause at bottom).',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Leg Day Giant Set',template:'Execute giant set: squat + leg press + leg extension + leg curl.',stat:'Stamina',baseRP:50,baseStatGain:4,volume:'high',compound:true},
      {name:'Single Leg Press',template:'Perform {sets} sets of {reps:12} single-leg press reps each side.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Sissy Squat Weighted',template:'Complete {sets} sets of {reps:10} weighted sissy squat reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Narrow Leg Press',template:'Execute {sets} sets of {reps:12} narrow-stance leg press reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Leg Press Calf Superset',template:'Perform {sets} supersets: {reps:15} leg press + {reps:20} calf raise.',stat:'Stamina',baseRP:30,baseStatGain:2,compound:true},
      {name:'Step-Up Superset',template:'Complete {sets} supersets: {reps:12} step-up + {reps:12} reverse lunge each side.',stat:'Agility',baseRP:28,baseStatGain:2,compound:true},
      {name:'Front Squat Paused',template:'Execute {sets} sets of {reps:5} front squat reps with 2s pause.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Zercher Squat',template:'Perform {sets} sets of {reps:6} Zercher squat reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Quad Drop Set',template:'Complete quad drop set: {reps:10} hack squat + {reps:12} leg press + {reps:15} leg ext.',stat:'Stamina',baseRP:38,baseStatGain:3,volume:'high',compound:true},
      {name:'Leg Day Volume [Gym]',template:'Execute leg volume day: 6 exercises x {sets} sets.',stat:'Stamina',baseRP:50,baseStatGain:4,volume:'high'},
      {name:'Elevated Heel Squat',template:'Perform {sets} sets of {reps:10} heel-elevated squat reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Cyclist Squat',template:'Complete {sets} sets of {reps:12} cyclist squat reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Squat Superset Volume',template:'Execute {sets} supersets: {reps:8} back squat + {reps:15} goblet squat.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Leg Extension Drop Set',template:'Perform leg extension drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Leg Press Pyramid',template:'Complete leg press pyramid: {reps:20}→{reps:15}→{reps:12}→{reps:10}→{reps:8}.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Squat to Box',template:'Execute {sets} sets of {reps:6} squat-to-box reps at parallel.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Reverse Hack Squat',template:'Perform {sets} sets of {reps:10} reverse hack squat reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Jefferson Squat',template:'Complete {sets} sets of {reps:8} Jefferson squat reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Leg Day AMRAP',template:'Execute 1 AMRAP set of back squat at 70%. Log total reps.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Leg Extension Superset',template:'Perform {sets} supersets: {reps:15} leg extension + {reps:15} leg curl.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Loaded Carry Leg',template:'Execute {sets} {time:30s} front-rack barbell carry — quad tension.',stat:'Durability',baseRP:28,baseStatGain:2,compound:true},
      {name:'Smith Squat',template:'Perform {sets} sets of {reps:12} Smith machine squat reps.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Squat Iso Hold',template:'Complete {sets} {time:30s} bottom squat isometric holds.',stat:'Stamina',baseRP:22,baseStatGain:1,compound:true},
      {name:'Leg Day Density Block',template:'Set timer for {time:10m}. Perform as many quality leg sets as possible.',stat:'Stamina',baseRP:42,baseStatGain:3,volume:'high'},
      {name:'Squat 100',template:'Complete 100 squat reps in minimum sets. Any bar position.',stat:'Stamina',baseRP:32,baseStatGain:2,volume:'high',compound:true},
      {name:'Leg Press Max',template:'Work up to a 1-rep max leg press today.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Triple Squat Set',template:'Execute 3 consecutive squat sets with 60s rest: {reps:10}+{reps:8}+{reps:6} increasing weight.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Squat Warm-Up Protocol',template:'Perform full squat warm-up: bar×10, 40%×8, 60%×5, 80%×3, then work sets.',stat:'Durability',baseRP:15,baseStatGain:1,compound:true},
      {name:'Leg Press 10x10',template:'Complete 10 sets of {reps:10} leg press with 60s rest.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true,volume:'high'},
      {name:'Walking Lunge Heavy',template:'Perform {sets} sets of {reps:20} weighted walking lunges.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true,intensity:'heavy'},
      {name:'Front Squat 5x5',template:'Execute 5 sets of {reps:5} front squat reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Hack Squat Volume',template:'Perform {sets} sets of {reps:15} hack squat reps — controlled.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Split Squat Superset',template:'Complete {sets} supersets: {reps:10} Bulgarian split squat + {reps:10} reverse lunge.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Sissy Squat Burnout',template:'Execute sissy squat burnout: max reps at bodyweight.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high',compound:true},
      {name:'Quad Finisher',template:'Finish leg day: {reps:20} leg extension + {reps:20} sissy squat back-to-back.',stat:'Stamina',baseRP:25,baseStatGain:2,compound:true},
      {name:'Leg Press 5x5',template:'Perform 5 sets of {reps:5} leg press at near max.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true,intensity:'heavy'},

      {name:'Leg Extension Light',template:'Execute {sets} sets of {reps:20} light leg extension reps — isolation only.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Leg Extension 100',template:'Perform 100 leg extension reps in minimum sets.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Leg Extension Pause',template:'Complete {sets} sets of {reps:12} leg extensions with 3s hold at top.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Terminal Knee Extension',template:'Execute {sets} sets of {reps:20} terminal knee extension reps with band.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Leg Extension Burnout',template:'Perform leg extension burnout: {reps:30} reps at lightest weight. No stopping.',stat:'Stamina',baseRP:20,baseStatGain:1,volume:'high'},
      {name:'VMO Drop Set',template:'Complete VMO-focused leg extension drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Quad Stretch Loaded',template:'Perform {sets} {time:45s} loaded quad stretch on knee.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Leg Extension Speed',template:'Execute {sets} sets of {reps:20} fast leg extensions — speed focus.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Sissy Squat Bodyweight',template:'Perform {sets} sets of {reps:12} bodyweight sissy squats.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Quad Daily Finisher',template:'End every leg session with {reps:25} leg extensions — non-negotiable.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Leg Extension Superset Light',template:'Execute {sets} supersets: {reps:15} leg extension + {reps:15} sissy squat.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Peak Contraction Leg Ext',template:'Perform {sets} sets of {reps:10} leg extensions holding peak 5 seconds.',stat:'Strength',baseRP:22,baseStatGain:1},

      {name:'Squat Speed Day',template:'Execute {sets} sets of {reps:5} squats at 60% — maximum bar speed.',stat:'Speed',baseRP:32,baseStatGain:2,compound:true},
      {name:'Leg Day Discipline',template:'Complete every rep of every exercise with full range of motion today.',stat:'Discipline',baseRP:25,baseStatGain:2},
    
      {name:'Leg Extension Iso Focus',template:'Execute {sets} sets of {reps:15} leg extension reps — isolation, no momentum.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Terminal Knee Ext Band',template:'Perform {sets} sets of {reps:25} terminal knee extensions with band.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Quad Stretch Standing',template:'Complete {sets} {time:30s} standing quad stretch each side.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Leg Extension Beginner',template:'Execute 3 sets of {reps:15} light leg extension reps.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Quad Foam Roll',template:'Foam roll quads for {time:5m} — focus on tight spots.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Leg Extension Speed [G]',template:'Perform {sets} sets of {reps:20} fast leg extension reps.',stat:'Speed',baseRP:15,baseStatGain:1},
      {name:'Quad Massage Gun',template:'Use massage gun or foam roller on quads for {time:5m} post session.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Quad Isolation Superset',template:'Complete {sets} supersets: {reps:15} leg extension + {time:20s} quad stretch.',stat:'Strength',baseRP:18,baseStatGain:1},

      {name:'Leg Extension Light Set',template:'Perform {sets} sets of {reps:20} very light leg extension reps.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Quad Static Stretch',template:'Hold standing quad stretch {time:30s} each side. {sets} rounds.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Seated Quad Squeeze',template:'Execute {sets} sets of {reps:20} seated quad squeeze reps.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'VMO Isolation',template:'Perform {sets} sets of {reps:15} VMO isolation leg extension reps.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Quad Activation',template:'Execute {reps:20} quad activation reps before every leg session.',stat:'Discipline',baseRP:10,baseStatGain:1,level:'beginner'},
],
    calisthenics: [
      {name:'Bodyweight Squat',template:'Execute {sets} sets of {reps:20} bodyweight squats.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Jump Squat',template:'Perform {sets} sets of {reps:15} jump squats.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
      {name:'Pistol Squat',template:'Complete {sets} sets of {reps:5} pistol squats each leg.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Pistol Squat Negative',template:'Execute {sets} sets of {reps:8} pistol squat negatives each leg.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Assisted Pistol Squat',template:'Perform {sets} sets of {reps:10} assisted pistol squats each leg.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'advanced'},
      {name:'Shrimp Squat',template:'Complete {sets} sets of {reps:6} shrimp squats each leg.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Bulgarian Split Squat BW',template:'Execute {sets} sets of {reps:12} bodyweight Bulgarian split squats each leg.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Cossack Squat',template:'Perform {sets} sets of {reps:10} Cossack squats each side.',stat:'Agility',baseRP:28,baseStatGain:2,compound:true},
      {name:'Lunge BW',template:'Complete {sets} sets of {reps:15} bodyweight lunges each leg.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Jump Lunge',template:'Execute {sets} sets of {reps:10} jump lunges each leg.',stat:'Speed',baseRP:30,baseStatGain:2,compound:true},
      {name:'Wall Sit Cali',template:'Perform {sets} {time:90s} wall sit holds.',stat:'Durability',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Box Jump',template:'Complete {sets} sets of {reps:8} box jumps.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Squat Hold',template:'Execute {sets} {time:60s} deep squat holds.',stat:'Durability',baseRP:20,baseStatGain:1,compound:true},
      {name:'Step-Up BW',template:'Perform {sets} sets of {reps:15} bodyweight step-ups each leg.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Squat Jump Ladder',template:'Complete squat jump ladder: 5-10-15-20 reps.',stat:'Stamina',baseRP:35,baseStatGain:2,compound:true},
    
      // ── Additional Quad Cali Quests ──
      {name:'Pistol Squat [Cali]',template:'Execute {sets} sets of {reps:5} pistol squat reps each leg.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Jump Squat Max',template:'Perform 1 maximum-rep jump squat set.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
      {name:'Squat Jump Tabata',template:'Complete tabata: 8 rounds of {time:20s} squat jumps / 10s rest.',stat:'Speed',baseRP:32,baseStatGain:2,compound:true},
      {name:'Shrimp Squat [Cali]',template:'Execute {sets} sets of {reps:6} shrimp squat reps each leg.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Pistol Negatives',template:'Perform {sets} sets of {reps:5} pistol squat negatives each leg.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Bulgarian BW',template:'Complete {sets} sets of {reps:12} bodyweight Bulgarian split squat each leg.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Quad Cali Circuit',template:'Execute circuit: squat + jump squat + pistol practice + lunge.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true,level:'advanced'},
      {name:'BW Squat 100',template:'Perform 100 bodyweight squats in minimum time.',stat:'Stamina',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Jumping Lunge',template:'Complete {sets} sets of {reps:20} jumping lunge reps.',stat:'Speed',baseRP:30,baseStatGain:2,compound:true},
      {name:'Squat Hold [Cali]',template:'Execute {sets} {time:45s} bottom squat hold.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true},
      {name:'Cali Leg Day',template:'Perform complete calisthenics leg day: pistol + shrimp + jump squat.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Wall Sit Max',template:'Complete 1 maximum-duration wall sit. Log your time.',stat:'Stamina',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Step-Up BW High',template:'Execute {sets} sets of {reps:12} high step-up BW reps each leg.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
      {name:'One-Leg Wall Sit',template:'Perform {sets} {time:20s} single-leg wall sit each side.',stat:'Stamina',baseRP:30,baseStatGain:2,level:'beginner'},
],
    home: [
      {name:'Home Squat',template:'Execute {sets} sets of {reps:20} bodyweight squats at home.',stat:'Strength',baseRP:15,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Chair Squat',template:'Perform {sets} sets of {reps:15} chair squats.',stat:'Strength',baseRP:12,baseStatGain:1,compound:true},
      {name:'Home Split Squat',template:'Complete {sets} sets of {reps:12} split squats each leg.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Jump Squat',template:'Execute {sets} sets of {reps:10} jump squats.',stat:'Speed',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Lunge',template:'Perform {sets} sets of {reps:15} walking lunges.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Wall Sit',template:'Complete {sets} {time:60s} wall sit holds.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home Pistol Neg',template:'Execute {sets} sets of {reps:5} pistol squat negatives with chair help.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true,level:'advanced'},
      {name:'Home Step-Up',template:'Perform {sets} sets of {reps:15} stair step-ups each leg.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Backpack Squat',template:'Complete {sets} sets of {reps:15} squats with loaded backpack.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Deep Squat Hold',template:'Execute {sets} {time:60s} deep squat mobility holds.',stat:'Durability',baseRP:12,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Leg Day',template:'Perform home leg day: squats + lunges + step-ups + wall sit.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'beginner'},
      {name:'100 Squat Challenge',template:'Complete 100 bodyweight squats today.',stat:'Stamina',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
    
      // ── Additional Quad Home Quests ──
      {name:'Home Squat 200',template:'Complete 200 bodyweight squats throughout the day.',stat:'Stamina',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Home Jump Squat [Home]',template:'Execute {sets} sets of {reps:15} home jump squats.',stat:'Speed',baseRP:20,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Wall Sit [Home]',template:'Perform {sets} {time:1m} wall sit holds.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home Lunge Circuit',template:'Complete home lunge circuit: forward + reverse + lateral — {reps:10} each.',stat:'Agility',baseRP:20,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Pistol Practice',template:'Execute {sets} pistol squat practice sets each leg.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true,level:'advanced'},
      {name:'Home Leg Day [Home]',template:'Perform home leg day: squats + lunges + wall sit + jump squats.',stat:'Stamina',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Stair Lunge',template:'Complete {sets} rounds of stair lunges.',stat:'Agility',baseRP:18,baseStatGain:1,compound:true},
      {name:'Home Squat Ladder',template:'Execute squat ladder: 10-20-30-20-10 reps.',stat:'Stamina',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // HAMSTRINGS
  // ══════════════════════════════════════════════════
  hamstrings: {
    gym: [
      {name:'Romanian Deadlift Hams',template:'Execute {sets} sets of {reps:10} Romanian deadlift reps. Feel the hamstring stretch.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Leg Curl Machine',template:'Perform {sets} sets of {reps:12} lying leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Seated Leg Curl',template:'Complete {sets} sets of {reps:12} seated leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Nordic Curl',template:'Execute {sets} sets of {reps:5} Nordic hamstring curl reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Good Morning [Gym]',template:'Perform {sets} sets of {reps:10} good morning reps.',stat:'Durability',baseRP:28,baseStatGain:2,compound:true},
      {name:'Stiff Leg Deadlift [Gym]',template:'Complete {sets} sets of {reps:10} stiff-leg deadlift reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Glute Ham Raise',template:'Execute {sets} sets of {reps:8} glute-ham raise reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Single Leg RDL',template:'Perform {sets} sets of {reps:10} single-leg RDL each side.',stat:'Agility',baseRP:35,baseStatGain:3,compound:true},
      {name:'Leg Curl Drop Set',template:'Complete 1 leg curl drop set: {reps:10}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Hamstring Superset',template:'Execute {sets} supersets: {reps:10} RDL + {reps:12} leg curl.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
    
      // ── Additional Hamstring Gym Quests ──
      {name:'Lying Leg Curl',template:'Execute {sets} sets of {reps:12} lying leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Seated Leg Curl [Gym]',template:'Perform {sets} sets of {reps:12} seated leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Nordic Curl [Gym]',template:'Complete {sets} sets of {reps:5} Nordic hamstring curl reps.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true},
      {name:'Stiff Leg DL Hamstring',template:'Execute {sets} sets of {reps:10} stiff-legged deadlift reps — hamstring focus.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Romanian DL Hamstring',template:'Perform {sets} sets of {reps:10} Romanian DL reps — max hamstring stretch.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Good Morning Ham',template:'Complete {sets} sets of {reps:10} barbell good morning reps.',stat:'Durability',baseRP:28,baseStatGain:2,compound:true},
      {name:'Leg Curl Drop Set [Gym]',template:'Execute leg curl drop set: {reps:10} + {reps:12} + {reps:15}.',stat:'Strength',baseRP:32,baseStatGain:2,intensity:'heavy'},
      {name:'Single Leg Curl',template:'Perform {sets} sets of {reps:12} single-leg curl reps each side.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Snatch Grip DL Ham',template:'Complete {sets} sets of {reps:5} snatch-grip deadlifts.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Ham Giant Set',template:'Execute giant set: leg curl + RDL + good morning + Nordic.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true,volume:'high'},
      {name:'Glute Ham Raise [Gym]',template:'Perform {sets} sets of {reps:8} glute-ham raise reps on machine.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Hamstring Superset [Gym]',template:'Complete {sets} supersets: {reps:10} leg curl + {reps:10} RDL.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Leg Curl Pyramid',template:'Execute leg curl pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Pull-Through Ham',template:'Perform {sets} sets of {reps:15} cable pull-through reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'RDL 5x10',template:'Complete 5 sets of {reps:10} RDL — controlled stretch.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Hamstring Focus Day',template:'Execute ham focus day: Nordic + lying curl + RDL.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Leg Curl AMRAP',template:'Perform 1 AMRAP set of leg curl at 70%.',stat:'Stamina',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Hamstring Stretch Protocol',template:'Complete {time:10m} hamstring mobility and stretching.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Hamstring Density Block',template:'Set timer for {time:8m}. Perform as many quality hamstring sets as possible.',stat:'Stamina',baseRP:38,baseStatGain:3,volume:'high'},
      {name:'Glute Bridge Hamstring',template:'Execute {sets} sets of {reps:15} single-leg glute bridge reps each side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Lying Curl Paused',template:'Perform {sets} sets of {reps:8} lying leg curl with 2s pause at top.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Hamstring Volume Day',template:'Complete hamstring volume: 5 exercises × {sets} sets.',stat:'Stamina',baseRP:45,baseStatGain:3},

      // ── Hamstring Pool Expansion ──
      {name:'Nordic Curl Weighted',template:'Execute {sets} sets of {reps:5} Nordic hamstring curls with band assistance or weight.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Lying Leg Curl Paused',template:'Perform {sets} sets of {reps:10} lying leg curl with 2s pause at top.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Seated Leg Curl Superset',template:'Complete {sets} supersets: {reps:12} seated curl + {reps:12} lying curl.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ham Curl Drop Set',template:'Execute leg curl drop set: {reps:10}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Single Leg RDL Dumbbell',template:'Perform {sets} sets of {reps:10} single-leg RDL with dumbbell each side.',stat:'Agility',baseRP:30,baseStatGain:2,compound:true},
      {name:'RDL to Curl Combo',template:'Complete {sets} sets of {reps:8} RDL-to-leg-curl combo reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Hamstring Circuit',template:'Execute hamstring circuit: lying curl + RDL + Nordic + glute-ham raise.',stat:'Strength',baseRP:45,baseStatGain:3,volume:'high',compound:true},
      {name:'Hamstring 100s',template:'Complete 100 total hamstring curl reps in minimum sets.',stat:'Stamina',baseRP:28,baseStatGain:2,volume:'high'},
      {name:'Inward Curl',template:'Perform {sets} sets of {reps:12} inward-foot-rotation leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Glute Ham Raise Weighted',template:'Execute {sets} sets of {reps:6} weighted glute-ham raise reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Trap Bar RDL',template:'Perform {sets} sets of {reps:10} trap bar RDL reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Hip Extension Machine',template:'Complete {sets} sets of {reps:15} hip extension machine reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Leg Curl Pyramid [Gym]',template:'Execute leg curl pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6}.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Snatch Grip DL Ham Focus',template:'Perform {sets} sets of {reps:5} snatch-grip DL reps — hamstring stretch.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Hamstring Pre-Fatigue',template:'Execute {reps:20} leg curls before squatting to pre-fatigue quads.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Lying Curl AMRAP',template:'Perform 1 AMRAP lying leg curl at 70%. Log reps.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Cable Leg Curl',template:'Complete {sets} sets of {reps:15} cable leg curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Ham Superset RDL Curl',template:'Execute {sets} supersets: {reps:8} RDL + {reps:12} leg curl.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Nordic Curl Ladder',template:'Perform Nordic curl ladder: 3-4-5-4-3 reps — assist if needed.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Hamstring Max Day',template:'Work up to a 3-rep max on RDL. Log your number.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true,intensity:'heavy'},

      {name:'RDL Speed',template:'Perform {sets} sets of {reps:10} RDL reps at controlled speed — feel the stretch.',stat:'Speed',baseRP:22,baseStatGain:1,compound:true},
      {name:'Hamstring Discipline',template:'Execute every hamstring exercise with a full 2s eccentric today.',stat:'Discipline',baseRP:22,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Nordic Curl BW',template:'Execute {sets} sets of {reps:5} Nordic hamstring curls.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,level:'beginner'},
      {name:'Single Leg Hip Hinge',template:'Perform {sets} sets of {reps:12} single-leg hip hinge each side.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true},
      {name:'Swiss Ball Leg Curl',template:'Complete {sets} sets of {reps:12} stability ball leg curls.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Glute Bridge Hamstring (Calisthenics)',template:'Execute {sets} sets of {reps:20} glute bridge reps focusing on hamstrings.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Good Morning BW (Calisthenics)',template:'Perform {sets} sets of {reps:20} bodyweight good morning reps.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
      {name:'Standing Hamstring Stretch',template:'Complete {sets} {time:60s} standing hamstring stretch per side.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Glute Ham Dev',template:'Execute {sets} sets of {reps:8} glute ham developer movements.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Hamstring Sprint',template:'Perform {reps:10} x {time:10s} sprint intervals focusing on hamstring drive.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
    
      // ── Additional Hamstring Cali Quests ──
      {name:'Nordic Curl BW [Cali]',template:'Execute {sets} sets of {reps:5} Nordic hamstring curl reps.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true,level:'beginner'},
      {name:'Single Leg RDL BW',template:'Perform {sets} sets of {reps:10} single-leg RDL reps each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Hamstring Walkout',template:'Complete {sets} sets of {reps:8} hamstring walkout reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Bridge March',template:'Execute {sets} sets of {reps:20} bridge march reps — hamstring emphasis.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Good Morning BW Ham',template:'Perform {sets} sets of {reps:20} bodyweight good morning reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
      {name:'Glute Ham Hold',template:'Complete {sets} {time:20s} glute-ham hold on bar.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Hamstring Stretch Flow',template:'Execute {time:10m} hamstring mobility flow: leg swings + forward folds.',stat:'Agility',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Hip Hinge Drill Ham',template:'Perform {sets} sets of {reps:15} hip hinge drills.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
      {name:'Deadlift BW RDL',template:'Complete {sets} sets of {reps:20} bodyweight single-leg RDL reps.',stat:'Agility',baseRP:20,baseStatGain:1,compound:true,level:'beginner'},
],
    home: [
      {name:'Home RDL',template:'Execute {sets} sets of {reps:15} RDL with household objects.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Nordic Neg',template:'Perform {sets} sets of {reps:5} Nordic negatives with couch.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Home Glute Bridge',template:'Complete {sets} sets of {reps:20} glute bridges.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Home Single Leg Bridge',template:'Execute {sets} sets of {reps:15} single-leg glute bridges each side.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Lying Ham Stretch',template:'Perform {sets} {time:60s} lying hamstring stretch per leg.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Home Hamstring Day',template:'Complete home hamstring day: bridges + Nordic neg + stretching.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Chair Leg Curl',template:'Execute {sets} sets of {reps:15} chair leg curl isometric holds.',stat:'Durability',baseRP:12,baseStatGain:1},
    
      // ── Additional Hamstring Home Quests ──
      {name:'Home RDL [Home]',template:'Execute {sets} sets of {reps:15} single-leg RDL reps each side.',stat:'Agility',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Nordic',template:'Perform {sets} sets of {reps:3} Nordic curl reps using furniture.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Home Leg Curl',template:'Complete {sets} sets of {reps:15} lying leg curl reps using a chair.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Home Hamstring Stretch',template:'Execute {time:10m} hamstring stretch routine.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Hip Hinge',template:'Perform {sets} sets of {reps:20} bodyweight hip hinge reps.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner',compound:true},
      {name:'Glute Bridge Single Leg',template:'Complete {sets} sets of {reps:15} single-leg glute bridge reps.',stat:'Strength',baseRP:15,baseStatGain:1},
],
  },

  // ══════════════════════════════════════════════════
  // GLUTES
  // ══════════════════════════════════════════════════
  glutes: {
    gym: [
      {name:'Barbell Hip Thrust',template:'Execute {sets} sets of {reps:10} barbell hip thrust reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Cable Kickback',template:'Perform {sets} sets of {reps:15} cable glute kickback each leg.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hip Abduction Machine',template:'Complete {sets} sets of {reps:20} hip abduction machine reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Sumo Squat',template:'Execute {sets} sets of {reps:12} sumo squat reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Glute Bridge Loaded',template:'Perform {sets} sets of {reps:15} loaded glute bridge reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deadlift Glute Focus',template:'Complete {sets} sets of {reps:8} deadlifts squeezing glutes at lockout.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Cable Pull Through',template:'Execute {sets} sets of {reps:15} cable pull-through reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Machine Kickback',template:'Perform {sets} sets of {reps:15} machine glute kickbacks each leg.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Glute Superset',template:'Complete {sets} supersets: {reps:10} hip thrust + {reps:15} cable kickback.',stat:'Strength',baseRP:35,baseStatGain:2,compound:true},
      {name:'Hip Thrust Max',template:'Execute a heavy hip thrust triple today — near max load.',stat:'Strength',baseRP:45,baseStatGain:3,intensity:'heavy',compound:true},
    
      // ── Additional Glute Gym Quests ──
      {name:'Hip Thrust Barbell',template:'Execute {sets} sets of {reps:12} barbell hip thrust reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Glute Bridge Weighted',template:'Perform {sets} sets of {reps:15} weighted glute bridge reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Kickback [Gym]',template:'Complete {sets} sets of {reps:15} cable glute kickback reps each side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hip Abduction Machine [Gym]',template:'Execute {sets} sets of {reps:20} hip abduction machine reps.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Romanian DL Single Leg',template:'Perform {sets} sets of {reps:10} single-leg RDL reps each side.',stat:'Agility',baseRP:32,baseStatGain:2,compound:true},
      {name:'Sumo Squat Glute',template:'Complete {sets} sets of {reps:15} sumo squats — glute emphasis.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
      {name:'Hip Thrust Drop Set',template:'Execute hip thrust drop set: {reps:10} + {reps:15} + {reps:20}.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Donkey Kick Machine',template:'Perform {sets} sets of {reps:15} donkey kick machine reps each leg.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Band Walk Glute',template:'Complete {sets} {time:30s} band lateral walk for glute activation.',stat:'Agility',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Glute Giant Set',template:'Execute giant set: hip thrust + kickback + abduction + RDL.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true,volume:'high'},
      {name:'Step-Up Glute Emphasis',template:'Perform {sets} sets of {reps:12} step-up reps with glute squeeze.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Hip Thrust 5x10',template:'Complete 5 sets of {reps:10} hip thrusts — squeeze at top.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Glute Superset [Gym]',template:'Execute {sets} supersets: {reps:12} hip thrust + {reps:15} cable kickback.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Lateral Band Squat',template:'Perform {sets} {time:30s} lateral band squat walks.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Glute Focus Day',template:'Complete full glute focus day: hip thrust + kickback + abduction.',stat:'Strength',baseRP:45,baseStatGain:3,compound:true},
      {name:'Hip Thrust Max [Gym]',template:'Work up to a 1-rep max hip thrust today.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Glute Activation Protocol',template:'Execute glute activation: band walk + bridge + kickback — warmup before squats.',stat:'Durability',baseRP:20,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Quadruped Kickback',template:'Perform {sets} sets of {reps:15} quadruped kickback reps each side.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Pause Hip Thrust',template:'Complete {sets} sets of {reps:8} paused hip thrust reps (2s at top).',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Glute Volume Day',template:'Execute high-volume glute day: 5 exercises × {sets} sets.',stat:'Stamina',baseRP:45,baseStatGain:3,volume:'high'},

      // ── Glute Pool Expansion ──
      {name:'Hip Thrust Wave Load',template:'Execute hip thrust wave loading: {reps:6}→{reps:4}→{reps:2}→{reps:6}→{reps:4}→{reps:2}.',stat:'Strength',baseRP:48,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Glute Bridge Barbell Paused',template:'Perform {sets} sets of {reps:10} barbell glute bridges with 3s hold.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Hip Thrust AMRAP',template:'Execute 1 AMRAP hip thrust at 70%. Log reps.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'Cable Kickback Superset',template:'Complete {sets} supersets: {reps:15} cable kickback + {reps:15} abduction.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Glute Circuit Weighted',template:'Perform weighted glute circuit: hip thrust + kickback + abduction.',stat:'Stamina',baseRP:38,baseStatGain:3,volume:'high',compound:true},
      {name:'Banded Hip Thrust',template:'Execute {sets} sets of {reps:12} banded barbell hip thrust reps.',stat:'Strength',baseRP:32,baseStatGain:2,compound:true},
      {name:'Glute Finisher',template:'End session with: {reps:25} hip thrust + {reps:20} kickback + {reps:20} abduction.',stat:'Stamina',baseRP:30,baseStatGain:2,volume:'high',compound:true},
      {name:'Hip Thrust 10x10',template:'Perform 10 sets of {reps:10} hip thrusts — glute hypertrophy protocol.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true,volume:'high'},
      {name:'Glute Activation Protocol [Gym]',template:'Execute full glute activation: clam + bridge + kickback + band walk.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Reverse Hyper',template:'Perform {sets} sets of {reps:15} reverse hyperextension reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Hip Thrust Cluster',template:'Execute hip thrust cluster: {reps:3}+{reps:3}+{reps:3} at 85%, 20s rest.',stat:'Strength',baseRP:45,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Glute Max Day',template:'Work up to a 1-rep max hip thrust. Log your number.',stat:'Strength',baseRP:50,baseStatGain:4,compound:true,intensity:'heavy'},
      {name:'Sumo RDL Glute Focus',template:'Complete {sets} sets of {reps:10} sumo RDL reps — glute squeeze at top.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Glute 100 Rep',template:'Perform 100 total glute reps (any mix) in minimum sets.',stat:'Stamina',baseRP:30,baseStatGain:2,volume:'high'},
      {name:'Lateral Band Glute Walk',template:'Execute {sets} {time:40s} lateral band walks — glute emphasis.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Hip Thrust Pyramid',template:'Perform hip thrust pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6}.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true},
      {name:'Single Leg Hip Thrust Heavy',template:'Execute {sets} sets of {reps:8} single-leg hip thrust with added weight.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Glute Volume Day [Gym]',template:'Complete high-volume glute day: 6 exercises × {sets} sets.',stat:'Stamina',baseRP:48,baseStatGain:4,volume:'high'},

      {name:'Hip Thrust Advanced PR',template:'Work up to a 1RM hip thrust. Beat your previous record.',stat:'Strength',baseRP:55,baseStatGain:5,intensity:'heavy',level:'advanced',compound:true},
      {name:'Glute Advanced Circuit',template:'Execute advanced glute circuit: {reps:6} heavy hip thrust + {reps:8} single-leg + {reps:12} kickback.',stat:'Strength',baseRP:45,baseStatGain:4,level:'advanced',compound:true},
      {name:'Single Leg Hip Thrust PR',template:'Work up to max single-leg hip thrust. Log your best.',stat:'Strength',baseRP:45,baseStatGain:4,intensity:'heavy',level:'advanced',compound:true},
      {name:'Hip Thrust Wave',template:'Execute hip thrust wave loading: 6-4-2-6-4-2 reps across 6 sets.',stat:'Strength',baseRP:48,baseStatGain:4,intensity:'heavy',level:'advanced',compound:true},
      {name:'Glute Advanced Superset',template:'Perform {sets} supersets: {reps:5} heavy hip thrust + {reps:15} cable kickback.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced',compound:true},

      {name:'Hip Thrust Speed',template:'Perform {sets} sets of {reps:10} explosive hip thrust reps.',stat:'Speed',baseRP:25,baseStatGain:2,compound:true},
      {name:'Glute Discipline',template:'Squeeze glutes at the top of every rep today — no shortcuts.',stat:'Discipline',baseRP:20,baseStatGain:1},
    ],
    calisthenics: [
      {name:'BW Hip Thrust',template:'Execute {sets} sets of {reps:20} bodyweight hip thrusts.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Donkey Kick',template:'Perform {sets} sets of {reps:20} donkey kick reps each leg.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Fire Hydrant',template:'Complete {sets} sets of {reps:20} fire hydrant reps each leg.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Glute Bridge BW',template:'Execute {sets} sets of {reps:25} glute bridge reps.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Single Leg Hip Thrust',template:'Perform {sets} sets of {reps:15} single-leg hip thrusts each leg.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true},
      {name:'Clamshell',template:'Complete {sets} sets of {reps:20} clamshell reps each side.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Squat Glute Squeeze',template:'Execute {sets} sets of {reps:15} sumo squats squeezing glutes.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Glute Circuit BW',template:'Perform glute circuit: donkey kicks + fire hydrant + bridge each side.',stat:'Strength',baseRP:28,baseStatGain:2,level:'beginner'},
    
      // ── Additional Glute Cali Quests ──
      {name:'Single Leg Bridge Max',template:'Execute 1 max-rep single-leg glute bridge set each side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hip Thrust BW',template:'Perform {sets} sets of {reps:20} bodyweight hip thrust reps.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Donkey Kick BW',template:'Complete {sets} sets of {reps:20} donkey kick reps each leg.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Clam Shell',template:'Execute {sets} sets of {reps:20} clamshell reps each side.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Fire Hydrant [Cali]',template:'Perform {sets} sets of {reps:20} fire hydrant reps each side.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Lateral Band Walk Cali',template:'Complete {sets} {time:30s} lateral band walk each direction.',stat:'Agility',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Glute Kickback Cali',template:'Execute {sets} sets of {reps:20} bodyweight glute kickback reps.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Deep Squat Glute',template:'Perform {sets} sets of {reps:15} deep squat with glute squeeze.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Glute Cali Circuit',template:'Complete circuit: bridge + donkey kick + fire hydrant + clamshell.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Jump Squat Glute',template:'Execute {sets} sets of {reps:12} jump squats with glute emphasis.',stat:'Speed',baseRP:25,baseStatGain:2,compound:true},
],
    home: [
      {name:'Home Hip Thrust',template:'Execute {sets} sets of {reps:20} hip thrusts against couch.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Donkey Kick',template:'Perform {sets} sets of {reps:20} donkey kicks each leg.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Glute Bridge [Home]',template:'Complete {sets} sets of {reps:25} glute bridges.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Single Leg Thrust',template:'Execute {sets} sets of {reps:15} single leg hip thrusts each side.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Glute Day',template:'Perform full home glute day: bridge + kick + thrust + clamshell.',stat:'Strength',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Glute Band Work',template:'Complete {sets} sets of {reps:20} band glute exercises.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
    
      // ── Additional Glute Home Quests ──
      {name:'Home Hip Thrust [Home]',template:'Execute {sets} sets of {reps:20} home hip thrust reps (back on couch).',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Donkey Kick [Home]',template:'Perform {sets} sets of {reps:20} donkey kick reps each leg.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Clam Shell',template:'Complete {sets} sets of {reps:25} clamshell reps each side.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Fire Hydrant',template:'Execute {sets} sets of {reps:25} fire hydrant reps each side.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Glute Circuit',template:'Perform glute circuit: hip thrust + donkey kick + bridge + clam shell.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Glute Squeeze Protocol',template:'Complete 100 glute squeeze holds throughout the day.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Single Leg Home RDL',template:'Execute {sets} sets of {reps:12} single-leg RDL each side at home.',stat:'Agility',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // CALVES
  // ══════════════════════════════════════════════════
  calves: {
    gym: [
      {name:'Standing Calf Raise',template:'Execute {sets} sets of {reps:20} standing calf raise reps.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Seated Calf Raise',template:'Perform {sets} sets of {reps:20} seated calf raise reps.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Leg Press Calf Raise',template:'Complete {sets} sets of {reps:25} leg press calf raises.',stat:'Stamina',baseRP:20,baseStatGain:1,compound:true},
      {name:'Donkey Calf Raise',template:'Execute {sets} sets of {reps:20} donkey calf raises.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Single Leg Calf Raise',template:'Perform {sets} sets of {reps:15} single-leg calf raises each leg.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Calf Raise Drop Set',template:'Complete 1 calf raise drop set: {reps:20}+{reps:25}+{reps:30}.',stat:'Stamina',baseRP:25,baseStatGain:2,intensity:'heavy'},
      {name:'Calf Raise 100',template:'Execute 100 total calf raises.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Jump Rope',template:'Perform {time:5m} of jump rope — calves active.',stat:'Speed',baseRP:28,baseStatGain:2},
    
      // ── Additional Calve Gym Quests ──
      {name:'Standing Calf Raise [Gym]',template:'Execute {sets} sets of {reps:20} standing calf raise reps.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Seated Calf Raise [Gym]',template:'Perform {sets} sets of {reps:20} seated calf raise reps.',stat:'Stamina',baseRP:18,baseStatGain:1},
      {name:'Donkey Calf Raise [Gym]',template:'Complete {sets} sets of {reps:15} donkey calf raise reps.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Single Leg Calf Raise [Gym]',template:'Execute {sets} sets of {reps:15} single-leg calf raise reps each side.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Calf Raise Drop Set [Gym]',template:'Perform calf raise drop set: {reps:15} + {reps:20} + {reps:25}.',stat:'Stamina',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Explosive Calf Jump',template:'Complete {sets} sets of {reps:10} explosive calf jump reps.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Calf Raise Slow Eccentric',template:'Execute {sets} sets of {reps:12} calf raises with 5s eccentric.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Calf Circuit',template:'Perform calf circuit: standing + seated + donkey + single-leg.',stat:'Stamina',baseRP:32,baseStatGain:2},
      {name:'Calf 100 Rep',template:'Complete 100 standing calf raise reps in minimum sets.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Calf Raise Superset',template:'Execute {sets} supersets: {reps:20} standing + {reps:20} seated calf raise.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Leg Press Calf Raise [Gym]',template:'Perform {sets} sets of {reps:20} leg press calf raise reps.',stat:'Stamina',baseRP:20,baseStatGain:1,compound:true},
      {name:'Calf Raise Pause',template:'Complete {sets} sets of {reps:15} calf raises with 2s hold at top.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Calf Focus Day',template:'Execute complete calf day: 4 exercises × {sets} sets.',stat:'Stamina',baseRP:38,baseStatGain:2},
      {name:'Jump Rope Calf',template:'Perform {time:5m} jump rope focusing on calf engagement.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Box Jump Calf',template:'Complete {sets} sets of {reps:10} box jump reps — calf propulsion.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Calf AMRAP',template:'Execute 1 AMRAP standing calf raise set.',stat:'Stamina',baseRP:22,baseStatGain:1,intensity:'heavy'},
      {name:'Calf Raise Pyramid',template:'Perform calf pyramid: {reps:20}→{reps:15}→{reps:12}→{reps:10}→{reps:8}.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Calf Raise Wave',template:'Complete wave loading for calves: {reps:10}→{reps:6}→{reps:10}→{reps:6}.',stat:'Stamina',baseRP:25,baseStatGain:2,intensity:'heavy',level:'advanced'},

      // ── Calves Pool Expansion ──
      {name:'Standing Calf Raise Heavy',template:'Execute {sets} sets of {reps:10} heavy standing calf raise reps.',stat:'Stamina',baseRP:25,baseStatGain:2,intensity:'heavy'},
      {name:'Calf Raise 5x20',template:'Perform 5 sets of {reps:20} standing calf raise reps.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Calf Raise Superset Heavy',template:'Complete {sets} supersets: {reps:15} standing + {reps:15} seated calf raise.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Tibialis-Calf Circuit',template:'Execute circuit: {reps:20} tibialis raise + {reps:20} calf raise. {sets} rounds.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Calf Raise Max Weight',template:'Work up to a 5-rep max on standing calf raise.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Calf 200 Rep',template:'Complete 200 total calf raise reps in minimum sets.',stat:'Stamina',baseRP:30,baseStatGain:2,volume:'high'},
      {name:'Seated Calf Paused',template:'Perform {sets} sets of {reps:15} seated calf raises with 3s hold at top.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Calf Raise Frequency Day',template:'Execute 5 mini sets of {reps:20} calf raises spread throughout workout.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Donkey Calf Heavy',template:'Complete {sets} sets of {reps:12} donkey calf raise reps with weight.',stat:'Stamina',baseRP:25,baseStatGain:2,intensity:'heavy'},
      {name:'Calf Pump Finisher',template:'Execute calf pump finisher: {reps:30}+{reps:25}+{reps:20} decreasing weight.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Explosive Calf Press',template:'Perform {sets} sets of {reps:10} explosive calf press on leg press.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Calf Raise Giant Set',template:'Execute calf giant set: standing + seated + donkey + single-leg.',stat:'Stamina',baseRP:35,baseStatGain:3,volume:'high'},
      {name:'Leg Press Calf Heavy',template:'Complete {sets} sets of {reps:15} leg press calf raises with heavy weight.',stat:'Stamina',baseRP:22,baseStatGain:1,compound:true},

      {name:'Calf Raise 3x25 Beginner',template:'Perform 3 sets of {reps:25} standing calf raises. Focus on full range.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Seated Calf Beginner',template:'Complete 3 sets of {reps:20} seated calf raises.',stat:'Stamina',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Single Leg Calf Beginner',template:'Execute 3 sets of {reps:15} single-leg calf raises each side.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Calf Stretch Protocol',template:'Perform {sets} {time:45s} calf stretches each side — soleus and gastrocnemius.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Calf Raise Advanced Heavy',template:'Execute {sets} sets of {reps:8} standing calf raises at max load.',stat:'Stamina',baseRP:30,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Calf Raise Plyometric',template:'Perform {sets} sets of {reps:15} explosive calf raise jumps.',stat:'Speed',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Tibialis-Calf Contrast',template:'Execute {sets} sets alternating: {reps:20} tibialis raise then {reps:20} calf raise.',stat:'Speed',baseRP:22,baseStatGain:2},
      {name:'Calf Loaded Stretch',template:'Perform {sets} {time:60s} weighted calf stretch on step edge.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Calf Raise Speed',template:'Execute {sets} sets of {reps:30} fast calf raises — speed emphasis.',stat:'Speed',baseRP:22,baseStatGain:2},
      {name:'Calf 300 Challenge',template:'Complete 300 total calf raise reps in minimum sets today.',stat:'Stamina',baseRP:35,baseStatGain:3,volume:'high'},
      {name:'Box Jump Depth',template:'Perform {sets} sets of {reps:8} depth jump to box jump reps.',stat:'Speed',baseRP:32,baseStatGain:3,compound:true,level:'advanced'},

      {name:'Two-Leg Calf Raise Beginner',template:'Perform 3 sets of {reps:20} two-leg calf raises — bodyweight only.',stat:'Stamina',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Wall Calf Raise Beginner',template:'Execute 3 sets of {reps:20} wall-supported calf raises.',stat:'Stamina',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Calf Stretch Beginner',template:'Complete {sets} {time:30s} standing calf stretches each side.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
],
    calisthenics: [
      {name:'Calf Raise BW',template:'Execute {sets} sets of {reps:30} bodyweight calf raises.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Single Calf Raise BW',template:'Perform {sets} sets of {reps:20} single-leg calf raises each side.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Jump Rope Cali',template:'Complete {time:10m} jump rope session.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Box Jump Calves',template:'Execute {sets} sets of {reps:10} box jumps — calf focus.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Calf Raise 200',template:'Perform 200 total calf raise reps.',stat:'Stamina',baseRP:28,baseStatGain:2},
    
      // ── Additional Calve Cali Quests ──
      {name:'Single Leg Calf BW',template:'Execute {sets} sets of {reps:20} single-leg calf raises.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Jump Rope Session',template:'Complete {time:10m} jump rope session.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Box Jump [Cali]',template:'Perform {sets} sets of {reps:10} box jump reps.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Standing BW Calf Max',template:'Execute 1 max-rep standing calf raise set.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Cali Calf Circuit',template:'Complete calf circuit: single leg + jump + tiptoe walk — {sets} rounds.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Tiptoe Walk',template:'Perform {sets} {time:30s} tiptoe walk.',stat:'Stamina',baseRP:12,baseStatGain:1},
      {name:'Calf Raise Ladder',template:'Execute calf ladder: 10-20-30-20-10 reps.',stat:'Stamina',baseRP:22,baseStatGain:1},
],
    home: [
      {name:'Home Calf Raise',template:'Execute {sets} sets of {reps:30} calf raises on stairs.',stat:'Stamina',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Single Calf',template:'Perform {sets} sets of {reps:20} single-leg calf raises on step.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Tiptoe Walk (Home)',template:'Complete {time:5m} of walking on your tiptoes at home.',stat:'Stamina',baseRP:10,baseStatGain:1},
      {name:'Home Jump Rope',template:'Execute {time:5m} jump rope or jumping jacks calf work.',stat:'Speed',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home 100 Calves',template:'Perform 100 calf raises throughout the day.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
    
      // ── Additional Calve Home Quests ──
      {name:'Home Calf Raise [Home]',template:'Execute {sets} sets of {reps:25} home calf raise reps.',stat:'Stamina',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Single Leg Calf',template:'Perform {sets} sets of {reps:20} single-leg home calf raises.',stat:'Stamina',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Stair Calf Raise',template:'Complete {sets} sets of {reps:20} stair-edge calf raise reps.',stat:'Stamina',baseRP:15,baseStatGain:1},
      {name:'Home Jump Rope [Home]',template:'Execute {time:5m} of jump rope or jumping jacks for calf work.',stat:'Speed',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Home Calf Circuit',template:'Perform home calf circuit: double + single + stair calf raises.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // ABS / CORE
  // ══════════════════════════════════════════════════
  core: {
    gym: [
      {name:'Cable Crunch',template:'Execute {sets} sets of {reps:15} cable crunch reps.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Hanging Leg Raise',template:'Perform {sets} sets of {reps:12} hanging leg raises.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Ab Rollout',template:'Complete {sets} sets of {reps:10} ab wheel rollout reps.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Weighted Plank',template:'Execute {sets} {time:60s} weighted plank holds.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Cable Woodchop',template:'Perform {sets} sets of {reps:12} cable woodchop reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Decline Sit-Up',template:'Complete {sets} sets of {reps:15} decline sit-ups.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Dragon Flag',template:'Execute {sets} sets of {reps:5} dragon flag reps.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Toes to Bar',template:'Perform {sets} sets of {reps:10} toes-to-bar reps.',stat:'Discipline',baseRP:35,baseStatGain:3},
      {name:'Windshield Wiper',template:'Complete {sets} sets of {reps:8} hanging windshield wipers.',stat:'Discipline',baseRP:40,baseStatGain:3},
      {name:'Pallof Press',template:'Execute {sets} sets of {reps:12} Pallof press reps each side.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Ab Circuit',template:'Perform core circuit: {reps:15} cable crunch + {reps:12} leg raise + {time:60s} plank.',stat:'Discipline',baseRP:35,baseStatGain:2},
    
      // ── Additional Core Gym Quests ──
      {name:'Cable Crunch Heavy',template:'Execute {sets} sets of {reps:15} heavy cable crunch reps.',stat:'Discipline',baseRP:25,baseStatGain:2,intensity:'heavy'},
      {name:'Leg Raise Weighted',template:'Perform {sets} sets of {reps:12} weighted hanging leg raise reps.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Ab Rollout Machine',template:'Complete {sets} sets of {reps:12} ab rollout machine reps.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Decline Crunch Weighted',template:'Execute {sets} sets of {reps:15} decline weighted crunch reps.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Hanging Leg Raise [Gym]',template:'Perform {sets} sets of {reps:12} hanging straight leg raises.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Cable Crunch Drop Set',template:'Complete cable crunch drop set: {reps:12} + {reps:15} + {reps:20}.',stat:'Discipline',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Dragon Flag [Gym]',template:'Execute {sets} sets of {reps:5} dragon flag reps.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Core Giant Set',template:'Perform giant set: cable crunch + leg raise + rollout + plank.',stat:'Discipline',baseRP:45,baseStatGain:3,volume:'high'},
      {name:'Weighted Plank [Gym]',template:'Complete {sets} {time:45s} weighted plank holds with plate on back.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Plank Variations Circuit',template:'Execute plank circuit: standard + side + RKC — {time:30s} each.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Core Superset',template:'Perform {sets} supersets: {reps:15} cable crunch + {reps:12} leg raise.',stat:'Discipline',baseRP:32,baseStatGain:2},
      {name:'Med Ball Slam',template:'Complete {sets} sets of {reps:15} overhead med ball slam reps.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Ab Wheel Rollout Gym',template:'Execute {sets} sets of {reps:10} ab wheel rollout reps.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'GHD Sit-Up',template:'Perform {sets} sets of {reps:12} GHD sit-up reps.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Core 100 Rep',template:'Complete 100 total core reps (any mix) in minimum sets.',stat:'Stamina',baseRP:32,baseStatGain:2,volume:'high'},
      {name:'Core Focus Day',template:'Execute complete core day: cable crunch + leg raise + dragon flag + plank.',stat:'Discipline',baseRP:45,baseStatGain:3,level:'advanced'},
      {name:'RKC Plank',template:'Perform {sets} {time:20s} RKC plank holds — max tension.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Ab Rippler',template:'Complete {sets} sets of {reps:12} ab rippler reps.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Landmine Rotation Core',template:'Execute {sets} sets of {reps:10} landmine rotation reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Decline Leg Raise',template:'Perform {sets} sets of {reps:12} decline bench leg raise reps.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Core Strength Test',template:'Perform max dragon flags + max hanging leg raises. Log your numbers.',stat:'Discipline',baseRP:45,baseStatGain:3,intensity:'heavy',level:'advanced'},

      // ── Additional Core + Advanced ──
      {name:'Dragon Flag Max',template:'Execute 1 max-rep dragon flag set. Log your number.',stat:'Discipline',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Manna Training',template:'Perform {time:15m} manna progression work — ultimate core and shoulder challenge.',stat:'Discipline',baseRP:65,baseStatGain:5,level:'advanced',intensity:'heavy'},
      {name:'V-Bar Hanging Leg Raise',template:'Complete {sets} sets of {reps:10} V-bar hanging leg raise reps.',stat:'Discipline',baseRP:38,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Toes-to-Bar',template:'Execute {sets} sets of {reps:10} toes-to-bar reps — strict form.',stat:'Discipline',baseRP:38,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Ab Wheel Standing',template:'Perform {sets} sets of {reps:5} standing ab wheel rollout reps.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Core Wave Load',template:'Complete core wave: {reps:10} dragon flag + {reps:15} hanging leg raise + {reps:20} cable crunch.',stat:'Discipline',baseRP:48,baseStatGain:4,level:'advanced',volume:'high'},
      {name:'Anti-Rotation Carry',template:'Execute {sets} {time:30s} anti-rotation loaded carry each side.',stat:'Discipline',baseRP:28,baseStatGain:2,compound:true},
      {name:'GHD Sit-Up Full',template:'Perform {sets} sets of {reps:15} full GHD sit-up reps — hyperextend at bottom.',stat:'Discipline',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Core Monthly Test',template:'Test core: max dragon flags + max L-sit hold + max hanging leg raise. Log all.',stat:'Discipline',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Hollow Body Weighted',template:'Complete {sets} {time:30s} weighted hollow body holds with plate.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Plank Weighted Max',template:'Execute 1 max-duration weighted plank. Log your time.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Core Pre-Fatigue',template:'Perform {reps:15} cable crunches before every compound lift — core pre-fatigue protocol.',stat:'Discipline',baseRP:18,baseStatGain:1},

      {name:'Crunch Beginner',template:'Perform 3 sets of {reps:15} basic crunch reps.',stat:'Discipline',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Plank Beginner',template:'Execute 3 sets of {time:20s} plank holds.',stat:'Discipline',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Leg Raise Beginner',template:'Complete 3 sets of {reps:10} lying leg raise reps.',stat:'Discipline',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Bird Dog Beginner',template:'Perform 3 sets of {reps:10} bird dog reps each side.',stat:'Discipline',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Dead Bug Beginner',template:'Execute 3 sets of {reps:10} dead bug reps each side.',stat:'Discipline',baseRP:10,baseStatGain:1,level:'beginner'},

      {name:'Core Agility Circuit',template:'Execute agility circuit: {reps:20} fast bicycle + {reps:20} mountain climber + {reps:10} burpee.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Core Discipline',template:'Complete core work with maximum tension and no momentum today.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Core Speed Circuit',template:'Perform {sets} rounds of fast core: {reps:30} mountain climber + {reps:20} flutter kick.',stat:'Speed',baseRP:22,baseStatGain:1},
    ],
    calisthenics: [
      {name:'Plank',template:'Execute {sets} {time:60s} plank holds.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'L-Sit',template:'Perform {sets} {time:20s} L-sit holds on bars.',stat:'Discipline',baseRP:40,baseStatGain:3},
      {name:'Dragon Flag BW',template:'Complete {sets} sets of {reps:5} dragon flags.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Hollow Body',template:'Execute {sets} {time:30s} hollow body holds.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'V-Up',template:'Perform {sets} sets of {reps:15} V-up reps.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Hanging Leg Raise BW',template:'Complete {sets} sets of {reps:12} hanging leg raises.',stat:'Discipline',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Toes to Bar Cali',template:'Execute {sets} sets of {reps:10} toes-to-bar.',stat:'Discipline',baseRP:35,baseStatGain:3},
      {name:'Ab Wheel Rollout',template:'Perform {sets} sets of {reps:10} ab wheel rollouts.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Front Lever Rows',template:'Complete {sets} sets of {reps:5} front lever rows.',stat:'Discipline',baseRP:55,baseStatGain:4,level:'advanced'},
      {name:'Side Plank',template:'Execute {sets} {time:45s} side plank holds each side.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Core Circuit Cali',template:'Perform: plank + hollow body + L-sit + leg raise — {sets} rounds.',stat:'Discipline',baseRP:40,baseStatGain:3},
    
      // ── Additional Core Cali Quests ──
      {name:'L-Sit Progression',template:'Execute L-sit progression: tuck → straddle → full. {sets} rounds.',stat:'Discipline',baseRP:35,baseStatGain:3},
      {name:'Front Lever Rows [Cali]',template:'Perform {sets} sets of {reps:5} front lever row reps.',stat:'Discipline',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Dragon Flag BW [Cali]',template:'Complete {sets} sets of {reps:5} dragon flag reps.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Manna Progression',template:'Execute {sets} sets of manna progression work.',stat:'Discipline',baseRP:55,baseStatGain:5},
      {name:'Hollow Body to Arch',template:'Perform {sets} sets of {reps:10} hollow-body-to-arch transitions.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'V-Up Max',template:'Complete 1 max-rep V-up set.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Core Cali Circuit',template:'Execute circuit: L-sit + dragon flag + windshield wiper + toes-to-bar.',stat:'Discipline',baseRP:45,baseStatGain:3,level:'advanced'},
      {name:'Planche Core Work',template:'Perform {time:15m} of planche-related core conditioning.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Ab Wheel BW',template:'Complete {sets} sets of {reps:10} ab wheel rollout reps.',stat:'Discipline',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Hollow Body Progression',template:'Execute hollow body progression: {sets} sets of max-duration holds.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Tuck to Straddle L-Sit',template:'Perform {sets} transitions: tuck L-sit to straddle L-sit.',stat:'Discipline',baseRP:42,baseStatGain:3},
],
    home: [
      {name:'Home Plank',template:'Execute {sets} {time:60s} plank holds.',stat:'Discipline',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Crunch',template:'Perform {sets} sets of {reps:20} crunch reps.',stat:'Discipline',baseRP:12,baseStatGain:1},
      {name:'Sit-Up',template:'Complete {sets} sets of {reps:20} sit-up reps.',stat:'Discipline',baseRP:12,baseStatGain:1},
      {name:'Bicycle Crunch',template:'Execute {sets} sets of {reps:20} bicycle crunch reps.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Mountain Climber',template:'Perform {sets} sets of {reps:30} mountain climber reps.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Leg Raise Home',template:'Complete {sets} sets of {reps:15} lying leg raise reps.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Flutter Kick',template:'Execute {sets} {time:30s} flutter kicks.',stat:'Stamina',baseRP:15,baseStatGain:1},
      {name:'Russian Twist',template:'Perform {sets} sets of {reps:20} Russian twist reps.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Side Plank Home',template:'Complete {sets} {time:45s} side plank holds each side.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Home Core Day',template:'Execute home core day: plank + crunch + leg raise + flutter kicks.',stat:'Discipline',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'100 Sit-Ups',template:'Perform 100 sit-ups today.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Core Burnout',template:'Complete {time:5m} of non-stop core work.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
    
      // ── Additional Core Home Quests ──
      {name:'Home Plank Series',template:'Execute plank series: {time:60s} standard + {time:45s} each side.',stat:'Discipline',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home Ab Wheel',template:'Perform {sets} sets of {reps:10} ab wheel rollout reps.',stat:'Discipline',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Home Core Ladder',template:'Complete core ladder: 5-10-15-20-15-10-5 crunch reps.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home V-Up',template:'Execute {sets} sets of {reps:15} V-up reps.',stat:'Discipline',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home Hollow Body',template:'Perform {sets} {time:30s} hollow body holds.',stat:'Discipline',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Home Core Circuit',template:'Complete home core circuit: sit-up + leg raise + plank + flutter kick.',stat:'Discipline',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Home Dragon Flag',template:'Execute {sets} sets of {reps:3} dragon flags using furniture.',stat:'Discipline',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Home 200 Abs',template:'Perform 200 total abs reps (any variation) throughout the day.',stat:'Stamina',baseRP:22,baseStatGain:1,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // FOREARMS
  // ══════════════════════════════════════════════════
  forearms: {
    gym: [
      {name:'Wrist Curl Gym',template:'Execute {sets} sets of {reps:20} barbell wrist curl reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Reverse Wrist Curl',template:'Perform {sets} sets of {reps:20} reverse wrist curl reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Farmer Carry',template:'Complete {sets} {time:45s} farmer carry with heavy dumbbells.',stat:'Durability',baseRP:25,baseStatGain:2,intensity:'heavy',compound:true},
      {name:'Dead Hang Grip',template:'Execute {sets} {time:60s} dead hang holds for grip training.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Plate Pinch',template:'Perform {sets} {time:30s} plate pinch grip holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Fat Bar Curl',template:'Complete {sets} sets of {reps:10} fat bar bicep curls.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Gripper Work',template:'Execute {sets} sets of {reps:20} hand gripper closes.',stat:'Durability',baseRP:15,baseStatGain:1},
    
      // ── Additional Forearm Gym Quests ──
      {name:'Reverse Barbell Curl',template:'Execute {sets} sets of {reps:15} reverse barbell curl reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Wrist Roller',template:'Perform {sets} sets of wrist roller full extensions.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Zottman Curl Forearm',template:'Complete {sets} sets of {reps:10} Zottman curl reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Trap Bar Carry',template:'Execute {sets} {time:45s} trap bar farmer carry.',stat:'Durability',baseRP:25,baseStatGain:2,compound:true},
      {name:'Towel Pull-Up Grip',template:'Perform {sets} sets of {reps:6} towel pull-up reps.',stat:'Durability',baseRP:32,baseStatGain:2,compound:true},
      {name:'Plate Curl',template:'Complete {sets} sets of {reps:15} plate pinch curl reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Fat Grip Training',template:'Execute {sets} sets of {reps:12} any exercise with fat grips.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Forearm Superset',template:'Perform {sets} supersets: {reps:20} wrist curl + {reps:20} reverse curl.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Forearm Circuit',template:'Complete forearm circuit: wrist curl + reverse curl + plate pinch + dead hang.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Gripper Max',template:'Execute gripper max test — close the gripper as many times as possible.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Farmers Walk Heavy',template:'Perform {sets} {time:45s} heavy farmer walk each side.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy',compound:true},
      {name:'Forearm Volume Day',template:'Complete forearm volume day: all exercises × {sets} sets.',stat:'Durability',baseRP:32,baseStatGain:2,volume:'high'},
      {name:'Wrist Curl 100',template:'Execute 100 wrist curl reps in minimum sets.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Band Wrist Extension',template:'Perform {sets} sets of {reps:25} band wrist extension reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Reverse Grip Row',template:'Complete {sets} sets of {reps:12} reverse-grip DB row reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Dead Hang Max (Gym)',template:'Execute 1 max-duration dead hang. Log your time.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Two-Finger Hang',template:'Perform {sets} {time:10s} two-finger hang holds on bar edge.',stat:'Durability',baseRP:38,baseStatGain:3},
      {name:'Fingerboard Training',template:'Complete fingerboard protocol: {sets} {time:10s} holds at various depths.',stat:'Durability',baseRP:35,baseStatGain:3},

      // ── Additional Forearms + Advanced ──
      {name:'One-Arm Dead Hang',template:'Execute {sets} {time:15s} one-arm dead hang each side.',stat:'Durability',baseRP:40,baseStatGain:3,level:'advanced'},
      {name:'Finger Hang Advanced',template:'Perform {sets} {time:10s} two-finger edge hangs.',stat:'Durability',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Rope Climb Advanced',template:'Complete {sets} legless rope climb ascents.',stat:'Durability',baseRP:55,baseStatGain:5,level:'advanced',compound:true},
      {name:'Pinch Grip Carry',template:'Execute {sets} {time:30s} plate pinch grip carry each hand.',stat:'Durability',baseRP:32,baseStatGain:2,compound:true},
      {name:'Wrist Roller Heavy',template:'Perform {sets} sets of full wrist roller extensions with heavy load.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Dead Hang Monthly Max',template:'Test dead hang: 1 maximum duration hang. Beat your previous time.',stat:'Durability',baseRP:32,baseStatGain:2},
      {name:'Forearm Density Block',template:'Execute {time:10m} forearm density: alternate wrist curl + reverse curl + dead hang.',stat:'Stamina',baseRP:30,baseStatGain:2,volume:'high'},
      {name:'Gripper Progressive',template:'Perform {sets} sets of {reps:10} gripper closes progressing in resistance.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Towel Pull-Up Advanced',template:'Complete {sets} sets of {reps:8} towel pull-up reps.',stat:'Durability',baseRP:40,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Forearm Volume Circuit',template:'Complete forearm circuit: {reps:20} wrist curl + {reps:20} reverse + {reps:20} hammer. {sets} rounds.',stat:'Durability',baseRP:28,baseStatGain:2},

      {name:'Wrist Curl Beginner',template:'Perform 3 sets of {reps:20} light wrist curl reps.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Reverse Curl Beginner',template:'Execute 3 sets of {reps:15} reverse curl reps with light weight.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Dead Hang Beginner',template:'Hang from bar for {time:20s}. Repeat {sets} times.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Farmers Walk Beginner',template:'Carry moderate dumbbells for {time:30s} each set.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Plate Pinch Beginner',template:'Pinch a {reps:10} lb plate for {time:20s} each hand.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Forearm Speed Curls',template:'Execute {sets} sets of {reps:30} speed wrist curl reps.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Reverse Curl Superset Heavy',template:'Perform {sets} supersets: {reps:10} heavy reverse curl + {reps:10} wrist curl.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Forearm Endurance Circuit',template:'Complete circuit: {reps:25} wrist curl + {reps:25} reverse + {reps:30s} dead hang. {sets} rounds.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Forearm Discipline',template:'Perform forearm work every training day this week before leaving the gym.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Climbers Grip Protocol',template:'Execute {sets} sets of {reps:10} two-arm dead hang reps alternating grip widths.',stat:'Durability',baseRP:22,baseStatGain:1},
],
    calisthenics: [
      {name:'Bar Hang Grip',template:'Execute {sets} {time:60s} bar hangs.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Towel Pull-Up (Calisthenics)',template:'Perform {sets} sets of {reps:6} towel pull-ups.',stat:'Durability',baseRP:35,baseStatGain:3,compound:true},
      {name:'Pinch Grip Hold',template:'Complete {sets} {time:30s} pinch grip bar holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rice Bucket Work',template:'Execute {time:5m} of rice bucket forearm exercises.',stat:'Durability',baseRP:18,baseStatGain:1},
    
      // ── Additional Forearm Cali Quests ──
      {name:'Max Dead Hang',template:'Execute 1 maximum-duration dead hang. Log your time.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Towel Row Grip',template:'Perform {sets} sets of {reps:10} towel grip inverted rows.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Rope Climb',template:'Complete {sets} rope climb ascents.',stat:'Durability',baseRP:45,baseStatGain:4},
      {name:'Fingertip Push-Up',template:'Execute {sets} sets of {reps:10} fingertip push-ups.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'One-Arm Hang',template:'Perform {sets} {time:10s} single-arm hang each side.',stat:'Durability',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Forearm Cali Circuit',template:'Complete circuit: dead hang + towel pull + fingertip push-up.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Ledge Hang',template:'Execute {sets} {time:15s} edge/ledge hang holds.',stat:'Durability',baseRP:25,baseStatGain:2},
],
    home: [
      {name:'Home Wrist Curl',template:'Execute {sets} sets of {reps:25} wrist curls with water bottle.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Towel Twist',template:'Perform {sets} sets of {reps:20} towel wringing exercises.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Dead Hang',template:'Complete {sets} {time:30s} door frame dead hangs.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Stress Ball',template:'Execute {time:5m} of stress ball squeezing while studying/reading.',stat:'Durability',baseRP:10,baseStatGain:1},
    
      // ── Additional Forearm Home Quests ──
      {name:'Rice Bucket Home',template:'Execute {time:5m} of rice bucket forearm exercises.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Rubber Band Extensions',template:'Perform {sets} sets of {reps:25} rubber band finger extensions.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Forearm Circuit',template:'Complete home forearm circuit: wrist curl + reverse + towel twist.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Grip Crusher Home',template:'Execute {sets} {time:30s} grip crush with towel or cloth.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Door Edge Hang',template:'Perform {sets} {time:20s} door edge hang holds.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Home Forearm Max',template:'Complete max-duration door frame hang. Log your time.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Towel Wring Max',template:'Execute {sets} {time:30s} towel wringing exercises.',stat:'Durability',baseRP:12,baseStatGain:1},
],
  },

  // ══════════════════════════════════════════════════
  // FULL BODY
  // ══════════════════════════════════════════════════
  fullbody: {
    gym: [
      {name:'Olympic Lifting Session',template:'Perform {sets} sets of {reps:3} clean and jerk or snatch.',stat:'Speed',baseRP:55,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Barbell Complex',template:'Execute barbell complex: {reps:6} deadlift + {reps:6} row + {reps:6} power clean + {reps:6} press.',stat:'Stamina',baseRP:50,baseStatGain:4,compound:true},
      {name:'Power Clean',template:'Perform {sets} sets of {reps:5} power clean reps.',stat:'Speed',baseRP:45,baseStatGain:4,compound:true},
      {name:'Thruster',template:'Complete {sets} sets of {reps:8} barbell thrusters.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Full Body Circuit',template:'Execute {sets} rounds: squat + press + row + deadlift — {reps:10} each.',stat:'Stamina',baseRP:50,baseStatGain:4,compound:true},
      {name:'HIIT Weights',template:'Perform HIIT: {reps:8} exercises × 40s work / 20s rest × {sets} rounds.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'5x5 Full Body',template:'Complete full body 5x5: squat + bench + deadlift.',stat:'Strength',baseRP:60,baseStatGain:5,intensity:'heavy',compound:true,level:'advanced'},
    
      // ── Additional Fullbody Gym Quests ──
      {name:'Clean and Press',template:'Execute {sets} sets of {reps:5} clean and press reps.',stat:'Speed',baseRP:48,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Kettlebell Complex',template:'Perform KB complex: {reps:5} swing + {reps:5} clean + {reps:5} press + {reps:5} squat.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Barbell Squat-Press Complex',template:'Complete {sets} rounds: {reps:8} squat + {reps:8} OHP.',stat:'Stamina',baseRP:42,baseStatGain:3,compound:true},
      {name:'Turkish Get-Up',template:'Execute {sets} sets of {reps:5} Turkish get-up reps each side.',stat:'Agility',baseRP:45,baseStatGain:4,compound:true},
      {name:'Farmer Walk Sprint',template:'Perform {sets} sets of {time:20s} heavy farmer walk sprints.',stat:'Speed',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Sled Push Complex',template:'Complete {sets} sled push sprints at heavy load.',stat:'Speed',baseRP:40,baseStatGain:3,intensity:'heavy',compound:true},
      {name:'Full Body Strength Day',template:'Execute strength day: deadlift + bench + squat — heavy sets.',stat:'Strength',baseRP:60,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'Metabolic Complex',template:'Perform metabolic complex: 6 exercises × 6 reps × {sets} rounds.',stat:'Stamina',baseRP:48,baseStatGain:4},
      {name:'Power Clean 5x3',template:'Complete 5 sets of {reps:3} power clean reps.',stat:'Speed',baseRP:48,baseStatGain:4,compound:true},
      {name:'Full Body Circuit Gym',template:'Execute {sets} rounds: {reps:10} squat + {reps:10} row + {reps:10} press.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Kettlebell Swing Circuit',template:'Perform KB swing circuit: {reps:20} swings × {sets} sets.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Snatch Practice',template:'Complete {sets} sets of {reps:3} snatch reps.',stat:'Speed',baseRP:50,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Full Body AMRAP',template:'Execute 15-minute AMRAP: 5 deadlift + 10 push-up + 15 squat.',stat:'Stamina',baseRP:50,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Olympic Day',template:'Perform full Olympic lifting session: snatch + clean & jerk practice.',stat:'Speed',baseRP:55,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Loaded Carry Complex',template:'Execute: {time:30s} front rack + {time:30s} farmer + {time:30s} overhead carry.',stat:'Durability',baseRP:40,baseStatGain:3,compound:true},
      {name:'Giant Set Full Body',template:'Complete giant set: squat + row + press + hinge — {reps:10} each.',stat:'Stamina',baseRP:50,baseStatGain:4,compound:true,volume:'high'},
      {name:'Full Body Volume Day',template:'Perform high-volume full body day: 3 sets each of 6 exercises.',stat:'Stamina',baseRP:55,baseStatGain:4,volume:'high'},
      {name:'Thruster Complex',template:'Execute {sets} sets of {reps:8} barbell thruster reps.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Full Body Strength Test',template:'Test strength on big 3: max squat + bench + deadlift. Log your numbers.',stat:'Strength',baseRP:70,baseStatGain:6,intensity:'heavy',compound:true},
      {name:'Morning Full Body Gym',template:'Complete morning full body session: compound lifts only, 45 minutes.',stat:'Stamina',baseRP:48,baseStatGain:4},

      // ── Additional FullBody + Advanced ──
      {name:'Clean and Jerk',template:'Execute {sets} sets of {reps:3} clean and jerk reps.',stat:'Speed',baseRP:55,baseStatGain:5,compound:true,level:'advanced',intensity:'heavy'},
      {name:'Barbell Complex Max',template:'Perform barbell complex: {reps:6} deadlift + {reps:6} row + {reps:6} clean + {reps:6} press. {sets} rounds.',stat:'Stamina',baseRP:55,baseStatGain:5,compound:true,level:'advanced',volume:'high'},
      {name:'Power Clean PR',template:'Work up to a 1RM power clean. Log your weight.',stat:'Speed',baseRP:60,baseStatGain:6,compound:true,level:'advanced',intensity:'heavy'},
      {name:'Loaded Carry Complex Gym',template:'Execute loaded carry complex: {time:30s} each — farmers + rack + overhead carry.',stat:'Durability',baseRP:42,baseStatGain:3,compound:true},
      {name:'Full Body AMRAP 20min',template:'AMRAP in {time:20m}: 5 deadlift + 10 push-up + 15 air squat. Log rounds.',stat:'Stamina',baseRP:50,baseStatGain:4,volume:'high',compound:true},
      {name:'Big 3 Max Day',template:'Work to 1RM on squat, bench, and deadlift. Log all three. This is your benchmark.',stat:'Strength',baseRP:75,baseStatGain:6,compound:true,level:'advanced',intensity:'heavy'},
      {name:'Snatch Balance',template:'Perform {sets} sets of {reps:5} snatch balance reps.',stat:'Agility',baseRP:45,baseStatGain:4,compound:true,level:'advanced'},
      {name:'KB Swing 10x10',template:'Complete 10 sets of {reps:10} kettlebell swings — 30s rest between.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true},
      {name:'Full Body Power Day',template:'Execute power day: {sets}×{reps:3} squat + {sets}×{reps:3} bench + {sets}×{reps:3} deadlift at 85%.',stat:'Strength',baseRP:65,baseStatGain:5,compound:true,level:'advanced',intensity:'heavy'},
      {name:'Daily Minimum Protocol',template:'Complete daily minimum on any rest/off day: 100 push-ups + 100 squats throughout.',stat:'Discipline',baseRP:25,baseStatGain:2,compound:true},

      {name:'Full Body Beginner A',template:'Complete beginner full body: 3x10 squat + 3x10 push-up + 3x10 row.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
      {name:'Full Body Beginner B',template:'Perform beginner session: 3x12 goblet squat + 3x12 dumbbell press + 3x12 lat pulldown.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
      {name:'Full Body Speed Circuit',template:'Execute speed circuit: {reps:10} box jump + {reps:10} explosive push-up + {reps:10} pull-up. {sets} rounds.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Full Body Discipline Day',template:'Complete every planned exercise today — no skipping, no shortcuts.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Full Body Endurance',template:'Perform {time:45m} of non-stop full body circuit training.',stat:'Stamina',baseRP:42,baseStatGain:3,volume:'high'},
      {name:'Agility Full Body',template:'Execute agility circuit: lateral shuffle + cone drill + box jump + sprint. {sets} rounds.',stat:'Agility',baseRP:35,baseStatGain:3,compound:true},
      {name:'Full Body Conditioning',template:'Complete conditioning session: KB swing + burpee + jump rope alternating.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true},
      {name:'Functional Full Body',template:'Perform functional circuit: carry + push + pull + hinge + squat. {sets} rounds.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Full Body Speed Day',template:'Execute speed-focused session: all movements at maximum velocity today.',stat:'Speed',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Full Body PR Week',template:'Attempt a new PR on any lift today. Any exercise counts. Push limits.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',level:'advanced'},

      {name:'Full Body Beginner A [G]',template:'Complete beginner full body: 3x10 squat + 3x10 push-up + 3x10 row.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
      {name:'Full Body Beginner B [G]',template:'Perform beginner session: 3x12 goblet squat + 3x12 dumbbell press + 3x12 lat pulldown.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
      {name:'Full Body Speed Circuit [G]',template:'Execute speed circuit: {reps:10} box jump + {reps:10} explosive push-up + {reps:10} pull-up. {sets} rounds.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true,level:'advanced'},
    
      {name:'Form Focus Day',template:'Complete every set today with perfect form — film yourself if needed.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'No Phone Workout',template:'Put your phone away for the entire workout. Full focus, zero distractions.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'Early Gym Session',template:'Train before 7am today. Discipline over motivation.',stat:'Discipline',baseRP:25,baseStatGain:2},
],
    calisthenics: [
      {name:'Burpee',template:'Execute {sets} sets of {reps:15} burpee reps.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Bear Crawl',template:'Perform {sets} {time:30s} bear crawls.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Man Maker',template:'Complete {sets} sets of {reps:8} man maker reps.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Cali Full Body Circuit',template:'Execute circuit: pull-up + push-up + squat + dip — {reps:10} each × {sets} rounds.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'Parkour Flow',template:'Perform {time:20m} of parkour or movement training.',stat:'Agility',baseRP:40,baseStatGain:3},
      {name:'Muscle-Up Complex',template:'Complete {sets} sets of: {reps:3} muscle-up + {reps:5} dip + {reps:5} L-sit.',stat:'Strength',baseRP:60,baseStatGain:5,compound:true,level:'advanced'},
    
      // ── Additional Fullbody Cali Quests ──
      {name:'Complete Cali Workout',template:'Execute complete calisthenics workout: push + pull + squat + core.',stat:'Stamina',baseRP:45,baseStatGain:3,compound:true},
      {name:'100 Pull 200 Push',template:'Perform 100 pull-up reps + 200 push-up reps throughout the day.',stat:'Stamina',baseRP:55,baseStatGain:4,compound:true},
      {name:'Cali Complex',template:'Complete cali complex: {reps:5} muscle-up + {reps:10} dip + {reps:10} pull-up.',stat:'Strength',baseRP:55,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Skill Day',template:'Execute {time:45m} skill practice: handstand + planche + front lever.',stat:'Strength',baseRP:55,baseStatGain:5,level:'advanced'},
      {name:'Cali AMRAP',template:'Perform 20-minute AMRAP: 5 pull-up + 10 push-up + 15 squat.',stat:'Stamina',baseRP:48,baseStatGain:4,intensity:'heavy',compound:true},
      {name:'Full Cali Strength Test',template:'Test cali max: max pull-up + max dip + max push-up. Log numbers.',stat:'Strength',baseRP:55,baseStatGain:5,intensity:'heavy',compound:true},
      {name:'Cali Volume Day',template:'Complete cali volume day: 10 sets each of push-up + pull-up.',stat:'Stamina',baseRP:50,baseStatGain:4,compound:true,volume:'high'},
      {name:'Dynamic Movement Flow',template:'Execute {time:30m} dynamic full-body movement flow.',stat:'Agility',baseRP:42,baseStatGain:3},
      {name:'Cali Power Circuit',template:'Perform power circuit: explosive push-up + kipping pull-up + squat jump.',stat:'Speed',baseRP:45,baseStatGain:4,compound:true},
      {name:'Full Body Cali Day',template:'Complete full calisthenics training day — every major movement.',stat:'Stamina',baseRP:55,baseStatGain:4},
],
    home: [
      {name:'Home Burpee',template:'Execute {sets} sets of {reps:10} burpees at home.',stat:'Stamina',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Home Full Body',template:'Perform full body home circuit: push-ups + squats + rows + core.',stat:'Stamina',baseRP:30,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Home HIIT',template:'Complete home HIIT: {sets} rounds of 5 bodyweight exercises.',stat:'Stamina',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Tabata Home',template:'Execute tabata: 8 rounds of 20s work / 10s rest — any exercise.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Morning Full Body',template:'Perform morning full body routine: 10 min of continuous movement.',stat:'Stamina',baseRP:22,baseStatGain:1},
    
      // ── Additional Fullbody Home Quests ──
      {name:'Home 300 Challenge',template:'Complete 300 total reps: 100 squats + 100 push-ups + 100 sit-ups.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true,level:'beginner'},
      {name:'Home Tabata Full Body',template:'Execute 8-round tabata: alternate push-up and squat each round.',stat:'Stamina',baseRP:32,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Home EMOM',template:'Perform 20-minute EMOM: 5 push-up + 10 squat each minute.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true,level:'beginner'},
      {name:'Home Full Body Circuit',template:'Complete 5-round circuit: burpee + push-up + squat + mountain climber.',stat:'Stamina',baseRP:32,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Morning Routine Full Body',template:'Execute morning full body: 10 min movement, 10 min core, 10 min stretch.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Home AMRAP',template:'Perform 15-minute AMRAP at home: 5 push-up + 10 squat + 15 sit-up.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true,level:'beginner'},
      {name:'Home Strength Test',template:'Test home strength: max push-up + max squat. Log your numbers.',stat:'Stamina',baseRP:35,baseStatGain:3,intensity:'heavy',compound:true,level:'beginner'},
      {name:'Full Home Day',template:'Complete full home workout day: upper + lower + core + cardio.',stat:'Stamina',baseRP:40,baseStatGain:3,level:'beginner'},
      {name:'100/100/100 Challenge',template:'Execute 100 push-ups + 100 squats + 100 sit-ups throughout the day.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true},
],
  },
  // ══════════════════════════════════════════════════
  // SERRATUS ANTERIOR
  // ══════════════════════════════════════════════════
  serratus: {
    gym: [
      {name:'Serratus Cable Punch',template:'Execute {sets} sets of {reps:15} cable punch-out reps. Protract scapula at top.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Serratus Wall Slide',template:'Perform {sets} sets of {reps:12} wall slide reps — hands flat, slide up while protracting.',stat:'Durability',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Landmine Serratus Press',template:'Complete {sets} sets of {reps:12} landmine push-out reps for serratus activation.',stat:'Strength',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Band Serratus Punch',template:'Execute {sets} sets of {reps:20} band-resisted serratus punch reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Cable Serratus Crunch',template:'Perform {sets} sets of {reps:15} cable serratus crunches from above.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Overhead Reach Press',template:'Complete {sets} sets of {reps:12} overhead reach press reps with dumbbell.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Serratus Pushdown',template:'Execute {sets} sets of {reps:15} serratus pushdown reps on cable.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Band Pull-Apart Protract',template:'Perform {sets} sets of {reps:20} band pull-apart with scapular protraction.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Straight Arm Cable Protract',template:'Complete {sets} sets of {reps:15} straight-arm cable protraction reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Serratus Cable Complex',template:'Perform {sets} rounds: {reps:12} cable punch + {reps:12} overhead protract + {reps:12} pushdown.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Push-Up Plus Gym',template:'Complete {sets} sets of {reps:12} push-up plus reps — add protraction at top.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'TRX Serratus Punch',template:'Execute {sets} sets of {reps:12} TRX push-out reps for serratus.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Serratus Raise',template:'Perform {sets} sets of {reps:12} dumbbell serratus raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Serratus Activation Superset',template:'Perform {sets} supersets: {reps:15} cable punch + {reps:15} wall slide.',stat:'Strength',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Cable Overhead Protract',template:'Complete {sets} sets of {reps:12} overhead cable protraction reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Swiss Ball Rollout Protract',template:'Execute {sets} sets of {reps:10} Swiss ball rollouts with protraction.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Single Arm Reach Press',template:'Perform {sets} sets of {reps:12} single-arm reach press each side.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Serratus Drop Set',template:'Complete 1 serratus cable punch drop set: {reps:20} → {reps:20} → {reps:20}.',stat:'Strength',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Overhead Stability Hold',template:'Execute {sets} {time:30s} single-arm overhead dumbbell hold with packed shoulder.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Rotational Cable Press Serratus',template:'Perform {sets} sets of {reps:12} rotational cable press with protraction finish.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Barbell Overhead Reach',template:'Execute {sets} sets of {reps:10} barbell overhead reach-through reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Serratus Rollout',template:'Perform {sets} sets of {reps:8} ab wheel rollouts with scapular protraction focus.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Incline Serratus Slide',template:'Complete {sets} sets of {reps:10} incline bench serratus slides.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Overhead Dumbbell Carry',template:'Execute {sets} {time:45s} single-arm overhead dumbbell carry each side.',stat:'Durability',baseRP:25,baseStatGain:2,compound:true},
    
      // ── Additional Serratus + Advanced ──
      {name:'Full Planche Lean',template:'Execute {sets} {time:20s} full planche lean holds — maximum protraction.',stat:'Strength',baseRP:55,baseStatGain:5,level:'advanced'},
      {name:'Straddle Planche Training',template:'Perform {time:20m} straddle planche progression work.',stat:'Strength',baseRP:65,baseStatGain:5,level:'advanced',intensity:'heavy'},
      {name:'Ring Push-Up Protracting',template:'Complete {sets} sets of {reps:12} ring push-up plus reps with full protraction.',stat:'Strength',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Serratus Cable Drop Set',template:'Execute cable punch drop set: {reps:15} heavy + {reps:20} medium + {reps:25} light.',stat:'Strength',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Protraction Iso Hold Heavy',template:'Perform {sets} {time:45s} loaded overhead protraction holds.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Serratus Giant Set',template:'Complete serratus giant set: cable punch + wall slide + push-up plus + planche lean.',stat:'Strength',baseRP:42,baseStatGain:3,volume:'high'},
      {name:'Serratus Pre-Press',template:'Execute {reps:20} cable punches before every push session — serratus activation.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Serratus Monthly Test',template:'Test serratus: max push-up plus reps. Log your number.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Tiger Bend Serratus',template:'Perform {sets} sets of {reps:6} tiger bend push-ups — serratus emphasis.',stat:'Strength',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Serratus Density Week',template:'Perform {reps:50} serratus activation reps (any variation) before every session this week.',stat:'Discipline',baseRP:25,baseStatGain:2},

      {name:'Serratus Beginner Wall',template:'Perform 3 sets of {reps:15} wall push-up plus reps.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Serratus Band Beginner',template:'Execute 3 sets of {reps:15} band serratus punch reps.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Push-Up Plus Beginner',template:'Complete 3 sets of {reps:10} push-up plus reps — beginner pace.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Serratus Speed Punch',template:'Perform {sets} sets of {reps:25} fast cable serratus punches.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Serratus Discipline Protocol',template:'Execute serratus activation before every push session this week.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'Serratus Stamina Circuit',template:'Complete {sets} rounds: {reps:20} cable punch + {reps:20} wall slide + {reps:15} push-up plus.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Serratus Agility Flow',template:'Perform {sets} rounds of serratus-focused bear crawl + push-up plus + planche lean.',stat:'Agility',baseRP:30,baseStatGain:2,level:'advanced'},
      {name:'Protraction Max Test',template:'Execute max push-up plus reps. Log your number. Beat it next week.',stat:'Discipline',baseRP:25,baseStatGain:2},
],
    calisthenics: [
      {name:'Push-Up Plus',template:'Execute {sets} sets of {reps:15} push-up plus reps — protract fully at top.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Scapular Push-Up',template:'Perform {sets} sets of {reps:15} scapular push-up reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Pike Push Protract',template:'Complete {sets} sets of {reps:10} pike push-up reps with scapular protraction.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Ring Push-Up Plus',template:'Complete {sets} sets of {reps:10} ring push-up plus reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Handstand Wall Protract',template:'Execute {sets} sets of {reps:5} wall handstand scapular presses.',stat:'Strength',baseRP:35,baseStatGain:3,level:'beginner'},
      {name:'Cali Serratus Crawl',template:'Perform {sets} {time:30s} bear crawl with protraction focus.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Serratus Shrug Hang',template:'Complete {sets} sets of {reps:12} dead hang scapular depressions.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Typewriter Push-Up',template:'Execute {sets} sets of {reps:6} typewriter push-up reps each side.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Straddle Planche Lean',template:'Perform {sets} {time:15s} planche lean holds — protract hard.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced'},
      {name:'Push-Up Plus Ladder',template:'Complete push-up plus ladder: 3-6-9-12-9-6-3 reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Serratus Hollow Hold',template:'Execute {sets} {time:30s} hollow body with maximum protraction.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Ring Plank Protract',template:'Perform {sets} {time:20s} ring plank with protraction.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Bar Serratus Reach',template:'Execute {sets} sets of {reps:10} bar overhead reach-throughs.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Plank Protraction',template:'Perform {sets} sets of {reps:10} plank scapular protractions.',stat:'Discipline',baseRP:18,baseStatGain:1},
    ],
    home: [
      {name:'Home Push-Up Plus',template:'Execute {sets} sets of {reps:15} push-up plus reps at home.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Wall Serratus Slide',template:'Perform {sets} sets of {reps:15} wall slide reps.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Floor Scapular Push',template:'Complete {sets} sets of {reps:12} floor scapular pushes.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Plank Protract',template:'Execute {sets} {time:30s} plank with maximum scapular protraction.',stat:'Discipline',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Seated Wall Press Serratus',template:'Perform {sets} sets of {reps:20} seated wall press-outs.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Serratus Circuit',template:'Complete circuit: {reps:15} push-up plus + {reps:15} wall slide + {reps:15} plank protract. {sets} rounds.',stat:'Strength',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Doorframe Reach Serratus',template:'Execute {sets} sets of {reps:12} doorframe overhead reach-throughs.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Book Overhead Hold',template:'Perform {sets} {time:30s} single-arm overhead book hold with protraction.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Chair Scapular Dip',template:'Complete {sets} sets of {reps:12} chair scapular dips.',stat:'Strength',baseRP:15,baseStatGain:1,compound:true},
      {name:'Serratus Morning Drill',template:'Execute {reps:30} push-up plus reps and {reps:20} wall slides upon waking.',stat:'Discipline',baseRP:18,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // HIP FLEXORS
  // ══════════════════════════════════════════════════
  hip_flexors: {
    gym: [
      {name:'Cable Hip Flexion',template:'Execute {sets} sets of {reps:15} cable hip flexion reps each leg.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Hanging Knee Raise Hip',template:'Perform {sets} sets of {reps:12} hanging knee raises — hip flexor contraction focus.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Cable Psoas March',template:'Complete {sets} sets of {reps:20} standing cable psoas march reps.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Decline Sit-Up [Gym]',template:'Execute {sets} sets of {reps:12} decline sit-up reps.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Leg Raise Machine',template:'Perform {sets} sets of {reps:15} leg raise machine reps.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Hip Flexion Band Walk',template:'Complete {sets} {time:30s} band-resisted hip flexion walks.',stat:'Agility',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Weighted Hip March',template:'Execute {sets} sets of {reps:15} ankle-weighted hip march reps.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Standing Hip Flexion Cable',template:'Perform {sets} sets of {reps:15} standing cable hip flexions.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Mountain Climber Gym',template:'Complete {sets} sets of {reps:30} mountain climbers — hip flexor focus.',stat:'Speed',baseRP:22,baseStatGain:1},
      {name:'High Knees Weighted Vest',template:'Execute {sets} {time:30s} weighted vest high knees.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Cable Reverse Crunch',template:'Perform {sets} sets of {reps:15} cable reverse crunch reps.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Kettlebell March',template:'Complete {sets} sets of {reps:20} kettlebell front-hold marches.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Hip Flexor Superset',template:'Execute {sets} supersets: {reps:15} cable march + {reps:15} knee raise.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Sled Push High Knees',template:'Complete {sets} {time:20s} sled push with exaggerated high-knee drive.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Hip Flexor Isolation Day',template:'Perform comprehensive hip flexor session: cable march + knee raise + mountain climber.',stat:'Agility',baseRP:35,baseStatGain:2},
      {name:'Step-Up Hip Drive',template:'Complete {sets} sets of {reps:12} step-ups with exaggerated hip drive.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true},
      {name:'Weighted V-Up',template:'Execute {sets} sets of {reps:10} weighted V-up reps.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Band-Resisted March',template:'Perform {sets} {time:30s} band-resisted marching in place.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Cable Bicycle Crunch',template:'Execute {sets} sets of {reps:20} cable bicycle crunch reps.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Dragon Flag Negative',template:'Perform {sets} sets of {reps:5} dragon flag negatives.',stat:'Discipline',baseRP:40,baseStatGain:3,level:'advanced'},
    
      // ── Small Muscle Fix: Additional Hip Flexors ──
      {name:'Hip Flexor Pre-Sprint',template:'Execute hip flexor activation before sprint work: {reps:20} march + {reps:15} knee raise.',stat:'Speed',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
      {name:'Standing Psoas March',template:'Perform {sets} sets of {reps:20} standing psoas march reps.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Seated Hip Flexion',template:'Complete {sets} sets of {reps:20} seated hip flexion reps with ankle weight.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Hip Flexor Iso Hold',template:'Execute {sets} {time:20s} hip flexion isometric holds each leg.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Cable Hip March Paused',template:'Perform {sets} sets of {reps:15} cable hip march with 2s hold at top.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Hip Flexor Strength Test',template:'Test hip flexor: max standing hip flexion reps with band each leg.',stat:'Stamina',baseRP:22,baseStatGain:1,intensity:'heavy',level:'beginner'},
      {name:'Kneeling Hip Flexor Activation',template:'Complete {sets} sets of {reps:15} kneeling hip flexor activation reps.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Hip Flexor Supine Raise',template:'Execute {sets} sets of {reps:15} supine hip flexor raise reps each leg.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Dynamic Hip Flexor Lunge',template:'Perform {sets} {time:30s} dynamic lunge with hip flexor emphasis each side.',stat:'Agility',baseRP:20,baseStatGain:1,compound:true},
      {name:'Hip Flexor Drop Set',template:'Complete hip flexion drop set: {reps:15} cable → {reps:20} band → {reps:25} bodyweight.',stat:'Stamina',baseRP:25,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Weighted Knee Drive',template:'Execute {sets} sets of {reps:15} weighted knee drive reps each leg.',stat:'Speed',baseRP:22,baseStatGain:1},
      {name:'Hip Flexor Mobility Drill',template:'Perform {time:8m} of hip flexor mobility drills.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Reverse Crunch Hip Flex',template:'Complete {sets} sets of {reps:20} reverse crunches — hip flexor focus.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'High Knee Ladder',template:'Execute high knee ladder: 10s → 20s → 30s → 20s → 10s intervals.',stat:'Speed',baseRP:22,baseStatGain:1},
      {name:'Hip Flexor Daily Protocol',template:'Perform daily hip flexor protocol: march + raise + stretch — each morning.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Pendulum Knee Drive',template:'Complete {sets} sets of {reps:12} pendulum knee drive reps each leg.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Hip Flexor AMRAP',template:'Execute 1 AMRAP standing hip flexion set each leg. Log reps.',stat:'Stamina',baseRP:20,baseStatGain:1,intensity:'heavy'},
      {name:'Sprint Knee Drive Drill',template:'Perform {sets} sets of {reps:10} sprint knee drive reps — explosive.',stat:'Speed',baseRP:25,baseStatGain:2,compound:true},
      {name:'Hip Flexor Superset [Gym]',template:'Complete {sets} supersets: {reps:15} cable march + {reps:20} high knee.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Lunge with Hip Drive Pause',template:'Execute {sets} sets of {reps:10} lunges with paused hip drive at top.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true},
],
    calisthenics: [
      {name:'High Knees Cali',template:'Execute {sets} {time:30s} maximum-speed high knees.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Mountain Climber Hip',template:'Perform {sets} sets of {reps:30} mountain climbers.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Tuck Jump',template:'Complete {sets} sets of {reps:10} tuck jumps.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Hanging Knee Tuck',template:'Execute {sets} sets of {reps:12} hanging knee tucks.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'L-Sit Tuck',template:'Complete {sets} {time:20s} L-sit tuck holds on bars or floor.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Hip Flexor Lunge Flow',template:'Execute {sets} sets of {reps:10} deep lunge hip flexor stretches with overhead reach.',stat:'Agility',baseRP:18,baseStatGain:1,compound:true},
      {name:'Leg Raise Hip Focus',template:'Perform {sets} sets of {reps:15} hanging straight leg raises.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Knee-to-Elbow Hang',template:'Complete {sets} sets of {reps:12} knee-to-elbow hanging reps.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Cossack Squat [Cali]',template:'Execute {sets} sets of {reps:8} Cossack squats each side.',stat:'Agility',baseRP:28,baseStatGain:2,compound:true},
      {name:'Running High Knees Tabata',template:'Execute tabata: 8 rounds of {time:20s} high knees / 10s rest.',stat:'Speed',baseRP:30,baseStatGain:2,compound:true},
      {name:'Hip Flexor Mobility Flow',template:'Perform {time:15m} of hip flexor mobility flow — lunges, circles, leg swings.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Sprint Acceleration Drill',template:'Perform {reps:10} short sprint accelerations of {time:10s} each.',stat:'Speed',baseRP:30,baseStatGain:2,compound:true},
    ],
    home: [
      {name:'Home High Knees',template:'Execute {sets} {time:30s} high knees.',stat:'Speed',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Mountain Climber Home',template:'Perform {sets} sets of {reps:30} mountain climbers.',stat:'Speed',baseRP:15,baseStatGain:1},
      {name:'Lying Leg Raise',template:'Complete {sets} sets of {reps:15} lying leg raises.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Hip Flexor Stretch Kneeling',template:'Execute {sets} {time:30s} kneeling hip flexor stretch each side.',stat:'Agility',baseRP:12,baseStatGain:1},
      {name:'Scissor Kicks',template:'Perform {sets} {time:30s} scissor kicks.',stat:'Stamina',baseRP:15,baseStatGain:1},
      {name:'Reverse Crunch Home',template:'Complete {sets} sets of {reps:15} reverse crunches.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Step March Home',template:'Execute {sets} {time:1m} of marching in place with high knees.',stat:'Speed',baseRP:12,baseStatGain:1},
      {name:'Lunge Hip Drive Home',template:'Perform {sets} sets of {reps:10} forward lunges with hip drive.',stat:'Agility',baseRP:18,baseStatGain:1,compound:true},
      {name:'Hip Flexor Yoga',template:'Complete {time:10m} of hip-opening yoga flow.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Tuck Hold Floor',template:'Execute {sets} {time:20s} floor tuck holds.',stat:'Discipline',baseRP:15,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // LATERAL DELTOIDS
  // ══════════════════════════════════════════════════
  lateral_delts: {
    gym: [
      {name:'Dumbbell Lateral Raise',template:'Execute {sets} sets of {reps:15} dumbbell lateral raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cable Lateral Raise [Gym]',template:'Perform {sets} sets of {reps:15} cable lateral raise reps each side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Leaning Lateral Raise',template:'Complete {sets} sets of {reps:12} leaning cable lateral raise reps each side.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Plate Lateral Raise',template:'Execute {sets} sets of {reps:15} plate lateral raise reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Machine Lateral Raise',template:'Perform {sets} sets of {reps:15} machine lateral raise reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Y-Press',template:'Complete {sets} sets of {reps:12} Y-press reps — elbows out, press high.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Lateral Raise Drop Set [Gym]',template:'Execute 1 lateral raise drop set: {reps:15} heavy, {reps:15} medium, {reps:20} light.',stat:'Strength',baseRP:32,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Behind-Back Cable Raise',template:'Perform {sets} sets of {reps:15} behind-the-back cable lateral raises.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Incline Lateral Raise',template:'Complete {sets} sets of {reps:12} incline bench lateral raise reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Lateral Raise Superset',template:'Execute {sets} supersets: {reps:15} DB lateral raise + {reps:15} cable lateral raise.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'DB Lateral Raise Isometric',template:'Perform {sets} sets of {reps:10} lateral raises with 3s hold at top.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Band Lateral Raise (Gym)',template:'Complete {sets} sets of {reps:20} band lateral raise reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Upright Row Wide',template:'Execute {sets} sets of {reps:12} wide-grip upright row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Lateral Raise 100 Rep',template:'Complete 100 total lateral raise reps with light weight in minimum sets.',stat:'Stamina',baseRP:32,baseStatGain:2,volume:'high',level:'beginner'},
      {name:'Half-Kneeling Lateral Raise',template:'Execute {sets} sets of {reps:12} half-kneeling cable lateral raises each side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Lateral Raise Giant Set',template:'Perform giant set: DB + cable + band lateral raises — {reps:15} each.',stat:'Strength',baseRP:35,baseStatGain:2,volume:'high',level:'beginner'},
      {name:'Lateral Delt Focus Day',template:'Complete full lateral delt session: 4 exercises, {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Seated Lateral Raise',template:'Execute {sets} sets of {reps:15} seated dumbbell lateral raises.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Lateral Raise Ladder',template:'Perform lateral raise ladder: 5-10-15-20 reps, ascending weight.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Y-Raise',template:'Complete {sets} sets of {reps:12} cable Y-raise reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Lateral Delt Burnout',template:'Execute burnout: {reps:30} lateral raises at minimum weight — no stop.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Standing Cable Cross Raise',template:'Perform {sets} sets of {reps:15} cross-body cable lateral raises.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Spider Lateral Raise',template:'Complete {sets} sets of {reps:12} incline spider bench lateral raises.',stat:'Strength',baseRP:25,baseStatGain:2},
    
      // ── Additional Lateral Delt + Advanced ──
      {name:'Lateral Raise Mechanical Drop',template:'Execute mechanical drop set: incline lateral → seated → standing — {reps:12} each.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy'},
      {name:'Cable Lateral Iso Superset',template:'Perform {sets} supersets: {reps:15} cable lateral + {time:15s} iso hold at top.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Lateral Delt Monthly Max',template:'Test lateral raise max: work up to heaviest 6RM. Log your weight.',stat:'Strength',baseRP:40,baseStatGain:3,intensity:'heavy'},
      {name:'Lateral Raise Cable Constant Tension',template:'Complete {sets} sets of {reps:20} cable lateral raises — maintain constant tension.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Lying Lateral Raise Heavy',template:'Execute {sets} sets of {reps:10} lying dumbbell lateral raises.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Lateral Raise 5x20',template:'Perform 5 sets of {reps:20} lateral raises with 60s rest.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Cable Y-Raise Superset',template:'Complete {sets} supersets: {reps:12} Y-raise + {reps:15} lateral raise.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Lateral Delt Pre-Exhaust',template:'Execute {reps:20} lateral raises before overhead press to pre-exhaust delts.',stat:'Strength',baseRP:20,baseStatGain:1,compound:true},
      {name:'Unilateral Cable Lateral',template:'Perform {sets} sets of {reps:15} unilateral cable lateral raises each side — full focus.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Lateral Raise Partials',template:'Complete {sets} sets of {reps:20} partial lateral raise reps — bottom half only.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Lateral Delt Burnout Final',template:'Session finisher: {reps:30} lateral raises, lightest available weight, no stopping.',stat:'Stamina',baseRP:22,baseStatGain:1,volume:'high'},

      {name:'Lateral Raise Beginner',template:'Perform 3 sets of {reps:15} dumbbell lateral raises with light weight.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Lateral Raise Band Beginner',template:'Execute 3 sets of {reps:20} band lateral raises.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Lateral Delt Agility',template:'Complete {sets} sets of {reps:20} cable lateral raises with fast tempo.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Lateral Delt Discipline',template:'Perform lateral raises at the end of every session this week — no exceptions.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'Lateral Delt Stamina',template:'Execute {reps:50} total lateral raise reps without racking the weight.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high'},
      {name:'Lateral Advanced Heavy',template:'Perform {sets} sets of {reps:8} heavy dumbbell lateral raises — near max.',stat:'Strength',baseRP:32,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Lateral Delt Peak Advanced',template:'Execute lateral raise mechanical drop set into cable lateral 21s.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy',level:'advanced'},
      {name:'Side Delt Daily',template:'Perform {reps:30} lateral raises every day for a week — side delt overload.',stat:'Discipline',baseRP:20,baseStatGain:1},
],
    calisthenics: [
      {name:'Pike Push-Up Wide',template:'Execute {sets} sets of {reps:10} wide-arm pike push-ups — lateral delt focus.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Handstand Shoulder Press',template:'Perform {sets} sets of {reps:5} wall handstand shoulder press reps.',stat:'Strength',baseRP:40,baseStatGain:3,level:'beginner'},
      {name:'Ring Y-Raise',template:'Complete {sets} sets of {reps:10} ring Y-raise reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cali Lateral Raise Band',template:'Execute {sets} sets of {reps:20} resistance band lateral raises.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'One-Arm Handstand Lean',template:'Perform {sets} {time:5s} one-arm handstand lean practice each side.',stat:'Strength',baseRP:55,baseStatGain:5,level:'advanced'},
      {name:'Shoulder Circuit Cali',template:'Complete shoulder circuit: {reps:10} pike push-up + {reps:15} band raise + {reps:10} Y-raise.',stat:'Strength',baseRP:30,baseStatGain:2,level:'beginner'},
    ],
    home: [
      {name:'Home Lateral Raise',template:'Execute {sets} sets of {reps:15} water bottle lateral raises.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Band Lateral Raise',template:'Perform {sets} sets of {reps:20} resistance band lateral raises.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Pike Push-Up Wide',template:'Complete {sets} sets of {reps:10} wide pike push-ups.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Isometric Lateral Hold',template:'Execute {sets} {time:30s} isometric lateral arm holds at shoulder height.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Shoulder Circuit',template:'Perform home shoulder circuit: lateral raise + pike push-up + isometric hold.',stat:'Strength',baseRP:22,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // REAR DELTOIDS
  // ══════════════════════════════════════════════════
  rear_delts: {
    gym: [
      {name:'Rear Delt Face Pull',template:'Execute {sets} sets of {reps:20} cable face pull reps — rear delt focus.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Rear Delt Bent-Over Fly',template:'Perform {sets} sets of {reps:15} bent-over dumbbell rear delt fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Reverse Pec Deck [Gym]',template:'Complete {sets} sets of {reps:15} reverse pec deck fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Band Pull-Apart RD',template:'Execute {sets} sets of {reps:20} band pull-apart reps.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Prone Dumbbell Fly',template:'Perform {sets} sets of {reps:15} prone incline rear delt fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Cable Rear Delt Pull',template:'Complete {sets} sets of {reps:15} cable rear delt pull-through reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Seated Rear Delt Fly',template:'Execute {sets} sets of {reps:15} seated bent-over rear delt fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Single Arm Cable Rear Fly',template:'Perform {sets} sets of {reps:15} single-arm cable rear fly reps each side.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Reverse Cable Fly',template:'Complete {sets} sets of {reps:15} reverse cable fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Wide Row Rear Emphasis',template:'Execute {sets} sets of {reps:12} wide-grip row reps — rear delt emphasis.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Rear Delt Drop Set',template:'Perform 1 rear delt fly drop set: {reps:15} + {reps:20} + {reps:25}.',stat:'Durability',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Band Pull-Apart Superset',template:'Complete {sets} supersets: {reps:20} overhand pull-apart + {reps:20} underhand pull-apart.',stat:'Durability',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Rear Delt Burnout',template:'Execute rear delt burnout: {reps:30} face pull + {reps:20} band pull-apart back-to-back.',stat:'Durability',baseRP:28,baseStatGain:2,volume:'high',level:'beginner'},
      {name:'High Cable Rear Pull',template:'Perform {sets} sets of {reps:15} high cable rear delt pulls.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'YTW Drill',template:'Execute {sets} rounds of YTW drill: {reps:10} each position with light dumbbells.',stat:'Durability',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Rear Delt Giant Set',template:'Perform giant set: face pull + reverse fly + band pull-apart — {reps:15} each.',stat:'Durability',baseRP:35,baseStatGain:2,volume:'high',level:'beginner'},
      {name:'Incline Rear Delt Fly',template:'Complete {sets} sets of {reps:15} incline dumbbell rear delt fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Chest Supported Rear Fly',template:'Execute {sets} sets of {reps:15} chest-supported incline rear fly reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Rear Delt Focus Day',template:'Perform complete rear delt session: face pull + reverse fly + band work.',stat:'Durability',baseRP:40,baseStatGain:3,level:'beginner'},
      {name:'Rear Delt 100 Set',template:'Perform 100 rear delt fly reps with light weight in minimum sets.',stat:'Durability',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Lying Rear Delt Raise',template:'Complete {sets} sets of {reps:15} lying rear delt raise reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Meadows Rear Row',template:'Complete {sets} sets of {reps:12} Meadows row with rear delt emphasis.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Cable Pull-Apart',template:'Execute {sets} sets of {reps:20} cable pull-apart reps.',stat:'Durability',baseRP:20,baseStatGain:1},
    
      // ── Pull Balance Fix: Additional Rear Delt Gym ──
      {name:'W-Raise',template:'Execute {sets} sets of {reps:15} W-raise reps with light dumbbells.',stat:'Durability',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Prone T-Raise',template:'Perform {sets} sets of {reps:12} prone T-raise reps on incline bench.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rear Delt Cable Cross',template:'Complete {sets} sets of {reps:15} cable cross rear delt pull reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Snatch Grip High Pull',template:'Execute {sets} sets of {reps:8} snatch-grip high pull reps — rear delt emphasis.',stat:'Speed',baseRP:32,baseStatGain:2,compound:true,level:'advanced'},
      {name:'Bent-Over Lateral Raise',template:'Perform {sets} sets of {reps:15} bent-over lateral raise reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rear Delt Machine Drop',template:'Complete rear delt machine drop set: {reps:15}+{reps:20}+{reps:25}.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Cable Rear Delt Circle',template:'Execute {sets} sets of {reps:12} cable rear delt circle reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Prone Rear Delt Raise Machine',template:'Perform {sets} sets of {reps:15} prone rear delt raise reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rear Delt Fly Paused',template:'Complete {sets} sets of {reps:10} rear delt fly reps with 2s pause.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Half-Kneeling Rear Pull',template:'Execute {sets} sets of {reps:15} half-kneeling cable rear pull each side.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Rear Delt Activation Circuit',template:'Perform circuit: {reps:20} band pull-apart + {reps:15} face pull + {reps:15} YTW.',stat:'Durability',baseRP:28,baseStatGain:2,level:'beginner'},
      {name:'Seated Cable Rear Fly',template:'Complete {sets} sets of {reps:15} seated cable rear fly reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Dumbbell Rear Fly Superset',template:'Execute {sets} supersets: {reps:15} bent-over fly + {reps:15} prone fly.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Rear Delt Band Tri-Set',template:'Perform tri-set: {reps:20} pull-apart + {reps:15} face pull + {reps:12} W-raise.',stat:'Durability',baseRP:30,baseStatGain:2,level:'beginner'},
      {name:'External Rotation Row',template:'Complete {sets} sets of {reps:12} external rotation into row reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Rear Delt 150 Rep',template:'Execute 150 rear delt reps in minimum sets at light weight.',stat:'Stamina',baseRP:32,baseStatGain:2,level:'beginner'},
      {name:'Incline W-Raise',template:'Perform {sets} sets of {reps:15} incline bench W-raise reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Rear Delt Rope Pull',template:'Complete {sets} sets of {reps:15} rope cable rear delt pull-apart reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Scapular Retraction Row',template:'Execute {sets} sets of {reps:12} scapular retraction row reps — slow and controlled.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Rear Delt Daily Maintenance',template:'Perform rear delt maintenance: {reps:30} band pull-apart + {reps:20} face pull.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
],
    calisthenics: [
      {name:'Inverted Row Wide Grip',template:'Execute {sets} sets of {reps:12} wide-grip inverted rows.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Band Face Pull Cali',template:'Perform {sets} sets of {reps:20} band face pulls.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Back Lever Rear Emphasis',template:'Complete {sets} {time:10s} back lever hold with rear delt squeeze.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Band Pull-Apart Cali',template:'Execute {sets} sets of {reps:25} band pull-apart reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Ring Row Wide',template:'Perform {sets} sets of {reps:12} ring row reps with wide arms.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'YTW Calisthenics',template:'Complete {sets} rounds of YTW bodyweight movements.',stat:'Durability',baseRP:22,baseStatGain:1,level:'beginner'},
    ],
    home: [
      {name:'Home Band Face Pull',template:'Execute {sets} sets of {reps:20} resistance band face pulls.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Home Rear Delt Fly',template:'Perform {sets} sets of {reps:15} water bottle rear delt fly reps.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Prone Rear Delt Raise Home',template:'Complete {sets} sets of {reps:15} prone floor rear delt raises.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Towel Row Wide',template:'Execute {sets} sets of {reps:12} wide-grip towel/door rows.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Home YTW',template:'Perform {sets} rounds of YTW raises with minimal resistance.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // ADDUCTORS
  // ══════════════════════════════════════════════════
  adductors: {
    gym: [
      {name:'Hip Adduction Machine',template:'Execute {sets} sets of {reps:15} hip adduction machine reps.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Sumo Squat Barbell',template:'Perform {sets} sets of {reps:10} barbell sumo squats with wide stance.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Cable Adduction Standing',template:'Complete {sets} sets of {reps:15} standing cable hip adduction reps each leg.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Copenhagen Plank',template:'Execute {sets} {time:20s} Copenhagen plank holds each side.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Band Adduction Walk',template:'Perform {sets} {time:30s} band-resisted adduction walks.',stat:'Agility',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Wide Stance Leg Press',template:'Complete {sets} sets of {reps:12} wide-stance leg press reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Lateral Lunge Weighted',template:'Execute {sets} sets of {reps:10} dumbbell lateral lunge reps each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true},
      {name:'Sumo Deadlift Adductor',template:'Complete {sets} sets of {reps:8} sumo deadlifts with adductor focus.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true},
      {name:'Cossack Squat Weighted',template:'Execute {sets} sets of {reps:8} weighted Cossack squats each side.',stat:'Agility',baseRP:30,baseStatGain:2,compound:true},
      {name:'Adductor Plié Squat',template:'Perform {sets} sets of {reps:12} wide plié squat reps.',stat:'Strength',baseRP:22,baseStatGain:1,compound:true},
      {name:'Copenhagen Side Plank',template:'Complete {sets} {time:20s} Copenhagen side plank each side.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Adductor Superset',template:'Execute {sets} supersets: {reps:15} machine adduction + {reps:10} lateral lunge.',stat:'Agility',baseRP:28,baseStatGain:2,compound:true},
      {name:'Curtsy Lunge Weighted',template:'Complete {sets} sets of {reps:10} dumbbell curtsy lunge reps each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true},
      {name:'Adductor Mobility Circuit',template:'Execute adductor circuit: lateral lunge + Cossack squat + Copenhagen plank.',stat:'Agility',baseRP:35,baseStatGain:2,compound:true},
      {name:'Seated Ball Squeeze',template:'Perform {sets} sets of {reps:20} seated medicine ball squeeze reps.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Sliding Lateral Lunge',template:'Complete {sets} sets of {reps:10} slider lateral lunge reps each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true},
    
      // ── Small Muscle Fix: Additional Adductors ──
      {name:'Adductor Machine Pyramid',template:'Execute adductor pyramid: {reps:20}→{reps:15}→{reps:12}→{reps:10} reps.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Lateral Lunge Tempo',template:'Perform {sets} sets of {reps:8} lateral lunge reps with 3s descent each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true},
      {name:'Cable Adduction Superset',template:'Complete {sets} supersets: {reps:15} adduction + {reps:15} abduction.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Sumo Squat Paused',template:'Execute {sets} sets of {reps:10} paused sumo squat reps (3s pause at bottom).',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Copenhagen Plank Progression',template:'Perform {sets} {time:25s} Copenhagen plank with leg lifts.',stat:'Durability',baseRP:32,baseStatGain:2},
      {name:'Adductor Warm-Up',template:'Complete adductor warm-up: {reps:20} lateral swing + {reps:15} sumo squat.',stat:'Agility',baseRP:15,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Sumo Squat Iso Hold',template:'Execute {sets} {time:30s} sumo squat isometric holds at bottom.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true},
      {name:'Lateral Lunge Pulse',template:'Perform {sets} sets of {reps:20} lateral lunge pulses each side.',stat:'Agility',baseRP:20,baseStatGain:1,compound:true},
      {name:'Adductor Cable Drop Set',template:'Complete cable adduction drop set: {reps:15}+{reps:20}+{reps:25}.',stat:'Agility',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Wide Stance Romanian DL',template:'Execute {sets} sets of {reps:10} wide-stance Romanian DL reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Groin Stretch Loaded',template:'Perform {sets} {time:30s} weighted groin stretch holds.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Adductor Pre-Leg Day',template:'Complete adductor activation before every leg session.',stat:'Discipline',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Lateral Band Walk Wide',template:'Execute {sets} {time:40s} wide lateral band walks each direction.',stat:'Agility',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Adductor Strength Test',template:'Test adductor strength: max Copenhagen plank each side. Log times.',stat:'Durability',baseRP:25,baseStatGain:2,intensity:'heavy'},
      {name:'Inner Thigh Squeeze',template:'Perform {sets} sets of {reps:25} inner thigh squeeze reps with medicine ball.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Cossack Squat Progression',template:'Complete Cossack squat progression: assisted → bodyweight → weighted.',stat:'Agility',baseRP:28,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Adductor Superset Circuit',template:'Execute circuit: sumo squat + lateral lunge + cable adduction — {reps:12} each.',stat:'Agility',baseRP:30,baseStatGain:2,compound:true},
      {name:'Side-Lying Adduction',template:'Perform {sets} sets of {reps:20} side-lying adduction reps each leg.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Frog Stretch',template:'Complete {sets} {time:30s} frog stretch holds for adductor mobility.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Adductor AMRAP',template:'Execute 1 AMRAP set of cable adduction each leg. Log reps.',stat:'Stamina',baseRP:22,baseStatGain:1,intensity:'heavy'},
      {name:'Banded Sumo Walk',template:'Perform {sets} {time:30s} banded sumo squat walks.',stat:'Agility',baseRP:20,baseStatGain:1,compound:true},
      {name:'Adductor Volume Day',template:'Complete adductor volume day: machine + cable + lunge + Copenhagen.',stat:'Agility',baseRP:35,baseStatGain:2,compound:true,volume:'high'},
      {name:'Pancake Stretch Weighted',template:'Execute {sets} {time:30s} weighted pancake stretch — weight on back.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Adductor Density Block',template:'Perform {time:8m} continuous adductor work — light weight, high reps.',stat:'Stamina',baseRP:25,baseStatGain:2,volume:'high',level:'beginner'},
      {name:'Reverse Copenhagen',template:'Complete {sets} {time:20s} reverse Copenhagen plank each side.',stat:'Durability',baseRP:28,baseStatGain:2},

      {name:'Adductor Advanced Copenhagen',template:'Execute {sets} {time:30s} Copenhagen plank with leg raise each side.',stat:'Durability',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Sumo Deadlift Advanced',template:'Work up to a 3RM sumo deadlift. Log your weight.',stat:'Strength',baseRP:55,baseStatGain:5,intensity:'heavy',level:'advanced',compound:true},
      {name:'Cossack Squat Loaded Advanced',template:'Perform {sets} sets of {reps:6} heavily loaded Cossack squats each side.',stat:'Agility',baseRP:38,baseStatGain:3,intensity:'heavy',level:'advanced',compound:true},
      {name:'Adductor Advanced Circuit',template:'Execute adductor circuit: heavy sumo squat + Copenhagen plank + cable adduction.',stat:'Strength',baseRP:40,baseStatGain:3,level:'advanced',compound:true},
      {name:'Wide Stance DL Advanced',template:'Perform {sets} sets of {reps:5} wide stance deadlift at heavy load.',stat:'Strength',baseRP:50,baseStatGain:4,intensity:'heavy',level:'advanced',compound:true},
],
    calisthenics: [
      {name:'Cossack Squat BW',template:'Execute {sets} sets of {reps:8} bodyweight Cossack squats each side.',stat:'Agility',baseRP:25,baseStatGain:2,compound:true,level:'beginner'},
      {name:'Lateral Lunge BW',template:'Perform {sets} sets of {reps:12} bodyweight lateral lunges each side.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Copenhagen Plank BW',template:'Complete {sets} {time:20s} Copenhagen plank each side.',stat:'Durability',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Wide Squat Jump',template:'Execute {sets} sets of {reps:10} wide-stance squat jumps.',stat:'Speed',baseRP:28,baseStatGain:2,compound:true},
      {name:'Sumo Squat BW',template:'Perform {sets} sets of {reps:20} bodyweight sumo squats.',stat:'Strength',baseRP:18,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Adductor Stretch Flow',template:'Execute {time:10m} of adductor stretch flow: lateral lunge + groin stretch + butterfly.',stat:'Agility',baseRP:18,baseStatGain:1,compound:true},
      {name:'Side Step Squat',template:'Perform {sets} {time:30s} side-step squat walks.',stat:'Agility',baseRP:22,baseStatGain:1,compound:true},
      {name:'Pancake Stretch',template:'Complete {sets} {time:30s} pancake floor stretch holds.',stat:'Agility',baseRP:18,baseStatGain:1,level:'beginner'},
    ],
    home: [
      {name:'Home Sumo Squat',template:'Execute {sets} sets of {reps:15} home sumo squats.',stat:'Strength',baseRP:15,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Home Lateral Lunge',template:'Perform {sets} sets of {reps:10} lateral lunges each side.',stat:'Agility',baseRP:15,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Butterfly Stretch',template:'Complete {sets} {time:30s} butterfly stretch holds.',stat:'Agility',baseRP:12,baseStatGain:1},
      {name:'Lying Adductor Squeeze',template:'Execute {sets} sets of {reps:20} lying pillow/ball squeeze reps.',stat:'Agility',baseRP:10,baseStatGain:1},
      {name:'Side-Lying Leg Adduction',template:'Perform {sets} sets of {reps:20} side-lying leg adduction reps each side.',stat:'Agility',baseRP:12,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // ROTATOR CUFF
  // ══════════════════════════════════════════════════
  rotator_cuff: {
    gym: [
      {name:'Cable External Rotation',template:'Execute {sets} sets of {reps:15} cable external rotation reps each arm.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Cable Internal Rotation',template:'Perform {sets} sets of {reps:15} cable internal rotation reps each arm.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Prone Dumbbell ER',template:'Complete {sets} sets of {reps:12} prone external rotation reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Side-Lying ER',template:'Execute {sets} sets of {reps:15} side-lying external rotation reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Band ER Walk',template:'Complete {sets} {time:30s} band external rotation walks.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Cuban Press [Gym]',template:'Execute {sets} sets of {reps:10} Cuban press reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'YTW Rotator Drill',template:'Perform {sets} rounds of YTW drill: {reps:10} each position.',stat:'Durability',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Shoulder CARS',template:'Complete {sets} sets of {reps:5} shoulder controlled articular rotations each arm.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Wall Angel RC',template:'Execute {sets} sets of {reps:12} wall angel reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'L-Fly',template:'Perform {sets} sets of {reps:15} L-fly external rotation reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Rotator Cuff Circuit',template:'Complete circuit: cable ER + prone ER + band walk — {reps:15} each, {sets} rounds.',stat:'Durability',baseRP:30,baseStatGain:2,level:'beginner'},
      {name:'Scaption Raise',template:'Execute {sets} sets of {reps:12} scaption (scapular plane) raise reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Diagonal Band Pattern',template:'Perform {sets} sets of {reps:15} diagonal band D1/D2 pattern each arm.',stat:'Durability',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'90-90 External Rotation',template:'Complete {sets} sets of {reps:12} 90-90 external rotation reps each arm.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Horizontal External Rotation',template:'Perform {sets} sets of {reps:15} horizontal external rotation reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rotator Health Day',template:'Complete full rotator cuff health protocol — 30 minutes of targeted work.',stat:'Durability',baseRP:35,baseStatGain:2},
      {name:'DB Pendulum',template:'Execute {sets} {time:1m} dumbbell pendulum swings for shoulder decompression.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Shoulder Sleeper Stretch',template:'Perform {sets} {time:30s} sleeper stretch each shoulder.',stat:'Durability',baseRP:12,baseStatGain:1},
    
      // ── Small Muscle Fix: Additional Rotator Cuff ──
      {name:'Band ER Superset',template:'Execute {sets} supersets: {reps:20} side-lying ER + {reps:20} band pull-apart.',stat:'Durability',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Rotator Cuff Pre-Lift',template:'Perform rotator cuff warmup before every push session: ER + IR + scaption.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Side-Lying ER Paused',template:'Complete {sets} sets of {reps:12} side-lying ER with 2s hold at top.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Cable IR Standing',template:'Execute {sets} sets of {reps:15} standing cable internal rotation reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Full Can Raise',template:'Perform {sets} sets of {reps:15} full-can raise reps (thumb up, 30° plane).',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Empty Can Raise',template:'Complete {sets} sets of {reps:12} empty-can raise reps (thumb down, 30° plane).',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Rotator Cuff Circuit Extended',template:'Execute extended RC circuit: ER + IR + full-can + YTW + scaption.',stat:'Durability',baseRP:32,baseStatGain:2,volume:'high'},
      {name:'Prone ER 90-90',template:'Perform {sets} sets of {reps:12} prone 90-90 external rotation reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Sidelying ER Ladder',template:'Complete ER ladder: {reps:10}→{reps:15}→{reps:20} reps each side.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Band ER Walk Forward',template:'Execute {sets} {time:30s} band ER forward walk.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Sleeper Stretch',template:'Perform {sets} {time:30s} sleeper stretch each shoulder.',stat:'Agility',baseRP:12,baseStatGain:1},
      {name:'Cross-Body Stretch',template:'Complete {sets} {time:30s} cross-body shoulder stretch each side.',stat:'Agility',baseRP:12,baseStatGain:1},
      {name:'Rotator Cuff AMRAP',template:'Execute AMRAP band ER each side. Log your reps.',stat:'Stamina',baseRP:20,baseStatGain:1,intensity:'heavy',level:'beginner'},
      {name:'ER Pyramid',template:'Perform cable ER pyramid: {reps:20}→{reps:15}→{reps:12}→{reps:10} reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Rotator Health Biweekly',template:'Complete dedicated rotator cuff session twice this week.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Shoulder Joint Prep',template:'Execute full shoulder joint prep: pendulum + ER + IR + CARS.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Prone T-Raise RC',template:'Perform {sets} sets of {reps:15} prone T-raise reps for posterior cuff.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Standing ER High Cable',template:'Complete {sets} sets of {reps:15} high-cable standing external rotation.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rotator Cuff Density',template:'Execute {time:8m} of continuous rotator cuff work — light, high-rep.',stat:'Stamina',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Prehab Shoulder Circuit',template:'Perform comprehensive shoulder prehab: ER + IR + full-can + sleeper stretch.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Cable CARS Shoulder',template:'Complete {sets} sets of {reps:5} cable-assisted shoulder CARs each arm.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Band ER Isometric',template:'Execute {sets} {time:20s} band ER isometric holds each arm.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Rotator Monthly Test',template:'Test rotator cuff strength: max ER reps each side with 5lb. Log numbers.',stat:'Durability',baseRP:22,baseStatGain:1},

      {name:'Rotator Cuff Loaded CARs',template:'Execute {sets} sets of {reps:5} loaded shoulder CARs with light plate.',stat:'Agility',baseRP:25,baseStatGain:2,level:'advanced'},
      {name:'Weighted External Rotation',template:'Perform {sets} sets of {reps:12} cable ER at highest manageable weight.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Rotator Cuff Advanced Circuit',template:'Complete advanced RC circuit: loaded ER + full-can + Cuban press + scaption.',stat:'Durability',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Shoulder Stability Advanced',template:'Execute {sets} sets of advanced shoulder stability: bottoms-up KB press + ER walk.',stat:'Durability',baseRP:32,baseStatGain:2,level:'advanced'},
      {name:'Rotator Max Endurance',template:'Perform max ER reps each side at 5kg. Log and beat your number.',stat:'Durability',baseRP:30,baseStatGain:2,level:'advanced'},
],
    calisthenics: [
      {name:'Band ER Cali',template:'Execute {sets} sets of {reps:20} band external rotation reps.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Wall Angel Cali',template:'Perform {sets} sets of {reps:15} wall angels.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Active Hang Rotations',template:'Complete {sets} sets of {reps:5} active dead hang rotations.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Ring Shoulder Stability',template:'Execute {sets} sets of ring-based shoulder stability work.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Shoulder CARS Cali',template:'Perform {sets} rounds of shoulder CARS — {reps:5} reps each arm.',stat:'Agility',baseRP:18,baseStatGain:1},
    ],
    home: [
      {name:'Home Band ER',template:'Execute {sets} sets of {reps:20} resistance band external rotations.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Side-Lying ER Home',template:'Perform {sets} sets of {reps:15} side-lying external rotations with light object.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Wall Angel Home',template:'Complete {sets} sets of {reps:15} wall angels at home.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Pendulum Home',template:'Execute {sets} {time:1m} arm pendulum swings for shoulder health.',stat:'Durability',baseRP:10,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // TIBIALIS ANTERIOR
  // ══════════════════════════════════════════════════
  tibialis: {
    gym: [
      {name:'Tibialis Raise Wall',template:'Execute {sets} sets of {reps:20} tibialis anterior raises against wall.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Resistance Band Dorsiflexion',template:'Perform {sets} sets of {reps:20} band dorsiflexion reps.',stat:'Speed',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Treadmill Heel Walk',template:'Complete {sets} {time:30s} treadmill heel walks.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Dorsiflexion Loaded Step',template:'Complete {sets} sets of {reps:15} loaded dorsiflexion reps on step.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Heel Walk Weighted',template:'Execute {sets} {time:30s} weighted heel walks.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Tibialis Strength Circuit',template:'Perform circuit: heel walk + band dorsiflexion + tibialis raise — {sets} rounds.',stat:'Durability',baseRP:25,baseStatGain:2,level:'beginner'},
      {name:'Ankle Circle Drill',template:'Complete {sets} sets of {reps:20} ankle circles each direction.',stat:'Agility',baseRP:12,baseStatGain:1},
      {name:'Single-Leg Dorsiflexion',template:'Execute {sets} sets of {reps:15} single-leg dorsiflexion reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Ankle Mobility Drill',template:'Perform {sets} sets of {reps:15} ankle mobility drills.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Tibialis Raise Machine',template:'Execute {sets} sets of {reps:20} tibialis raise machine reps if available.',stat:'Durability',baseRP:20,baseStatGain:1},
    
      // ── Small Muscle Fix: Additional Tibialis ──
      {name:'Weighted Tibialis Raise',template:'Execute {sets} sets of {reps:20} tibialis raises holding a plate on foot.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Tibialis Seated Band',template:'Perform {sets} sets of {reps:25} seated band dorsiflexion reps.',stat:'Speed',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Ankle Alphabet',template:'Complete {sets} rounds of ankle alphabet — trace A-Z with each foot.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Toes-Up Walk Incline',template:'Execute {sets} {time:30s} incline treadmill heel walks.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Single Leg Tibialis Raise',template:'Perform {sets} sets of {reps:20} single-leg tibialis raises each side.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Tibialis Press Cable',template:'Complete {sets} sets of {reps:20} cable dorsiflexion press reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Eccentric Heel Drop',template:'Execute {sets} sets of {reps:15} slow eccentric heel drop reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Band Dorsiflexion Walk',template:'Perform {sets} {time:30s} band-resisted dorsiflexion walks.',stat:'Speed',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Tibialis Strength Ladder',template:'Complete tibialis ladder: {reps:15}→{reps:20}→{reps:25}→{reps:30} reps.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Tiptoe Tibialis Contrast',template:'Execute {sets} sets alternating: {reps:15} calf raise + {reps:15} tibialis raise.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Loaded Tibialis Step',template:'Perform {sets} sets of {reps:12} loaded tibialis step-over reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Tibialis Endurance Set',template:'Complete 1 max-rep tibialis raise set. Log your number.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Dorsiflexion Hold',template:'Execute {sets} {time:20s} dorsiflexion isometric holds each foot.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Heel Walk Incline',template:'Perform {sets} {time:30s} incline surface heel walks.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Tibialis Warm-Up Drill',template:'Complete {reps:30} tibialis raises before every lower body session.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Ankle Stability Circuit',template:'Execute ankle circuit: tibialis raise + single-leg balance + dorsiflexion.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Tibialis Raise AMRAP',template:'Perform 1 AMRAP tibialis raise set. Log your number.',stat:'Stamina',baseRP:20,baseStatGain:1,intensity:'heavy'},
      {name:'Resistance Tibialis Walk',template:'Complete {sets} {time:40s} resistance band tibialis walks.',stat:'Speed',baseRP:20,baseStatGain:1,level:'beginner'},
      {name:'Tibialis Focus Day',template:'Execute complete tibialis session: raise + walk + dorsiflexion + balance.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Bilateral Tibialis Raise',template:'Perform {sets} sets of {reps:30} bilateral tibialis raises — both feet.',stat:'Stamina',baseRP:18,baseStatGain:1},
      {name:'Toe Tap Drill',template:'Execute {sets} {time:30s} rapid toe tap drills — tibialis activation.',stat:'Speed',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Foot Inversion Raise',template:'Perform {sets} sets of {reps:20} foot inversion raises each side.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Tibialis Pre-Run Protocol',template:'Complete pre-run tibialis drill: {reps:25} raises + {time:20s} holds before cardio.',stat:'Speed',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
      {name:'Seated Weighted Toes-Up',template:'Execute {sets} sets of {reps:15} seated tibialis raises with weight on knee.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Tibialis Anti-Shin-Splint',template:'Perform comprehensive shin splint prevention: tibialis raise + ankle circle + stretch.',stat:'Durability',baseRP:22,baseStatGain:1},

      {name:'Tibialis Beginner Wall',template:'Perform 3 sets of {reps:15} tibialis raises against wall.',stat:'Speed',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Tibialis Beginner Band',template:'Execute 3 sets of {reps:20} band dorsiflexion reps.',stat:'Speed',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Tibialis Speed Walk',template:'Complete {sets} {time:20s} fast heel walks — speed focus.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Tibialis Discipline',template:'Perform tibialis raises before every lower body session this week.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Tibialis Stamina Max',template:'Execute max tibialis raises in {time:2m}. Log your reps.',stat:'Stamina',baseRP:22,baseStatGain:2},
      {name:'Tibialis Advanced Load',template:'Perform {sets} sets of {reps:20} tibialis raises with heavy plate on foot.',stat:'Durability',baseRP:25,baseStatGain:2,level:'advanced'},
      {name:'Shin Splint Prevention',template:'Complete full shin splint prevention: tibialis raise + ankle mobility + ice if needed.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Tibialis Speed Agility',template:'Execute {sets} sets of {reps:30} rapid toe taps — max speed.',stat:'Speed',baseRP:20,baseStatGain:1},

      {name:'Tibialis Max Advanced',template:'Execute max tibialis raises with heaviest available weight on foot.',stat:'Speed',baseRP:28,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Tibialis Plyometric Advanced',template:'Perform {sets} sets of {reps:20} explosive dorsiflexion jumps.',stat:'Speed',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Single Leg Tibialis Heavy',template:'Execute {sets} sets of {reps:20} single-leg tibialis raises with plate.',stat:'Durability',baseRP:25,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Tibialis Advanced Protocol',template:'Complete tibialis advanced protocol: heavy raises + plyometric + balance.',stat:'Speed',baseRP:30,baseStatGain:2,level:'advanced'},
],
    calisthenics: [
      {name:'Heel Walk BW',template:'Execute {sets} {time:30s} bodyweight heel walks.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Tibialis Raise BW',template:'Perform {sets} sets of {reps:25} bodyweight tibialis raises.',stat:'Speed',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Ankle Mobility Flow',template:'Complete {time:10m} ankle mobility flow.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Single-Leg Balance',template:'Execute {sets} {time:30s} single-leg balance holds each side.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Tiptoe to Heel Walk',template:'Perform {sets} sets of {reps:10} alternating tiptoe-to-heel walks.',stat:'Agility',baseRP:15,baseStatGain:1},
    ],
    home: [
      {name:'Home Tibialis Raise',template:'Execute {sets} sets of {reps:25} tibialis anterior raises against wall.',stat:'Speed',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Heel Walk',template:'Perform {sets} {time:30s} heel walks around the room.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Ankle Circles',template:'Complete {sets} sets of {reps:20} ankle circles each foot.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Home Dorsiflexion Seated',template:'Execute {sets} sets of {reps:20} seated dorsiflexion reps.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // NECK
  // ══════════════════════════════════════════════════
  neck: {
    gym: [
      {name:'Neck Flexion Plate',template:'Execute {sets} sets of {reps:15} neck flexion reps with plate.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Neck Extension Plate',template:'Perform {sets} sets of {reps:15} neck extension reps with plate.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Lateral Neck Flexion',template:'Complete {sets} sets of {reps:15} lateral neck flexion reps each side.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Neck Harness Flexion',template:'Execute {sets} sets of {reps:20} neck harness flexion reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Neck Harness Extension',template:'Perform {sets} sets of {reps:20} neck harness extension reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Neck Isometric Series',template:'Complete {sets} rounds: 30s isometric push each direction — front, back, sides.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Neck Circuit',template:'Execute neck circuit: flexion + extension + lateral — {reps:15} each, {sets} rounds.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Wrestler Bridge',template:'Perform {sets} {time:20s} wrestler bridge holds.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Chin Tuck',template:'Complete {sets} sets of {reps:20} chin tuck reps for deep neck flexors.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Cervical Rotation Drill',template:'Execute {sets} sets of {reps:10} cervical rotation drills each side.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
    
      // ── Small Muscle Fix: Additional Neck ──
      {name:'Neck Flexion Band',template:'Execute {sets} sets of {reps:20} band-resisted neck flexion reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Neck Extension Band',template:'Perform {sets} sets of {reps:20} band-resisted neck extension reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Neck Lateral Band',template:'Complete {sets} sets of {reps:20} band-resisted lateral neck flexion each side.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Neck Isometric Front',template:'Execute {sets} {time:30s} isometric neck flexion holds.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Neck Isometric Back',template:'Perform {sets} {time:30s} isometric neck extension holds.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Neck Isometric Side',template:'Complete {sets} {time:30s} isometric lateral neck holds each side.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Cervical Nod',template:'Execute {sets} sets of {reps:20} deep cervical nod reps.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Neck Protraction Retraction',template:'Perform {sets} sets of {reps:15} neck protraction-retraction reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Sternocleidomastoid Stretch',template:'Complete {sets} {time:30s} SCM stretch each side.',stat:'Agility',baseRP:12,baseStatGain:1},
      {name:'Neck Diagonals',template:'Execute {sets} sets of {reps:15} neck diagonal flexion reps each direction.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Neck Full Circuit',template:'Perform neck circuit: flexion + extension + lateral + rotation — {sets} rounds.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Weighted Neck Flexion',template:'Complete {sets} sets of {reps:15} neck flexion reps with plate on forehead.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Weighted Neck Extension',template:'Execute {sets} sets of {reps:15} neck extension reps with plate on head.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Neck Rotation Drill',template:'Perform {sets} sets of {reps:10} slow neck rotation drills each side.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Neck Mobility Flow',template:'Complete {time:10m} neck mobility flow — circles, tilts, rotations.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Neck Strength Pyramid',template:'Execute neck pyramid: {reps:10}→{reps:15}→{reps:20}→{reps:15}→{reps:10} reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Neck Endurance Hold',template:'Perform max-duration isometric neck hold in all 4 directions. Log times.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Neck Pre-Session Warmup',template:'Complete neck warmup before upper body: {reps:15} each direction.',stat:'Discipline',baseRP:12,baseStatGain:1},
      {name:'Neck Training Daily',template:'Execute daily neck training: {reps:20} each direction × 2 rounds.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Atlas Stone Neck Drill',template:'Perform {sets} {time:20s} wrestler neck bridge holds on padded surface.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Neck Harness Lateral',template:'Complete {sets} sets of {reps:15} neck harness lateral flexion reps each side.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Neck Stability Work',template:'Execute {sets} rounds of neck stability drills: nod + rotation + side-bend.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Neck Traction Hang',template:'Perform {sets} {time:30s} cervical traction hang from bar.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Neck and Trap Circuit',template:'Complete neck and trap combo: {reps:15} shrug + {reps:15} neck extension + {reps:15} flexion.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Neck Conditioning Day',template:'Execute complete neck conditioning day — all planes, all intensities.',stat:'Durability',baseRP:32,baseStatGain:2},

      {name:'Neck Beginner Nod',template:'Perform 3 sets of {reps:20} gentle neck nod reps.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Neck Beginner Side',template:'Execute 3 sets of {reps:15} gentle lateral neck stretch holds each side.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Neck Isometric Beginner',template:'Perform 3 sets of {time:20s} gentle isometric neck resistance each direction.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Neck Speed Drill',template:'Execute {sets} sets of {reps:15} fast neck rotation drills each side.',stat:'Speed',baseRP:15,baseStatGain:1},
      {name:'Neck Discipline Protocol',template:'Perform neck training every single day this week — 10 min each day.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Neck Stamina Endurance',template:'Complete max isometric neck hold in all 4 directions. Log every time.',stat:'Stamina',baseRP:22,baseStatGain:2},
      {name:'Neck Advanced Heavy',template:'Execute {sets} sets of {reps:20} neck harness weighted extension reps.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Neck Agility Flow',template:'Perform {time:10m} neck agility: fast rotations + tilts + figure-8 patterns.',stat:'Agility',baseRP:15,baseStatGain:1},

      {name:'Neck Advanced Harness Heavy',template:'Perform {sets} sets of {reps:15} heavy neck harness extension at max load.',stat:'Durability',baseRP:32,baseStatGain:2,intensity:'heavy',level:'advanced'},
      {name:'Wrestler Bridge Advanced',template:'Execute {sets} sets of {time:30s} full wrestler bridge holds.',stat:'Durability',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Neck Advanced Circuit Heavy',template:'Complete advanced neck circuit: heavy harness + wrestler bridge + lateral band.',stat:'Durability',baseRP:38,baseStatGain:3,intensity:'heavy',level:'advanced'},
      {name:'Neck Max Strength Test',template:'Test maximum neck strength in all planes. Log every direction.',stat:'Durability',baseRP:35,baseStatGain:3,level:'advanced'},
],
    calisthenics: [
      {name:'Neck Bridge',template:'Execute {sets} {time:20s} neck bridge holds on back.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Front Neck Bridge',template:'Perform {sets} {time:15s} front neck bridge holds.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Neck Isometric Cali',template:'Complete {sets} {time:30s} isometric neck resistance each direction.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Headstand Practice',template:'Execute {sets} {time:20s} tripod or headstand holds.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Neck Stretch Flow',template:'Perform {time:10m} neck mobility and stretch flow.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
    ],
    home: [
      {name:'Home Neck Isometric',template:'Execute {sets} {time:30s} isometric neck resistance each direction with hand.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Home Chin Tuck',template:'Perform {sets} sets of {reps:20} chin tuck reps.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Neck Stretch Home',template:'Complete {time:5m} of neck stretching — side, front, back.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Home Neck Rotation',template:'Execute {sets} sets of {reps:10} slow neck rotations each side.',stat:'Agility',baseRP:10,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // OBLIQUES
  // ══════════════════════════════════════════════════
  obliques: {
    gym: [
      {name:'Cable Woodchop High-Low',template:'Execute {sets} sets of {reps:12} high-to-low cable woodchop reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Cable Woodchop Low-High',template:'Perform {sets} sets of {reps:12} low-to-high cable woodchop reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Pallof Press [Gym]',template:'Complete {sets} sets of {reps:12} Pallof press reps each side.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Dumbbell Side Bend',template:'Execute {sets} sets of {reps:15} dumbbell side bend reps each side.',stat:'Agility',baseRP:20,baseStatGain:1},
      {name:'Suitcase Deadlift',template:'Complete {sets} sets of {reps:8} suitcase deadlift reps each side.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true},
      {name:'Kettlebell Windmill',template:'Execute {sets} sets of {reps:8} kettlebell windmill reps each side.',stat:'Agility',baseRP:30,baseStatGain:2},
      {name:'Russian Twist Weighted',template:'Perform {sets} sets of {reps:20} weighted Russian twist reps.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Lateral Cable Crunch',template:'Complete {sets} sets of {reps:15} lateral cable crunch reps each side.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Copenhagen Side Plank Oblique',template:'Execute {sets} {time:20s} Copenhagen side plank each side.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Oblique V-Up',template:'Perform {sets} sets of {reps:12} oblique V-up reps each side.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Rotational Med Ball Slam',template:'Complete {sets} sets of {reps:10} rotational med ball slams each side.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Oblique Drop Set',template:'Execute oblique drop set: {reps:15} cable woodchop heavy → {reps:20} medium → {reps:25} light.',stat:'Agility',baseRP:30,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Suitcase Carry',template:'Perform {sets} {time:30s} suitcase carry each side.',stat:'Durability',baseRP:25,baseStatGain:2,compound:true},
      {name:'Oblique Circuit',template:'Complete oblique circuit: woodchop + Pallof + side bend — {sets} rounds.',stat:'Agility',baseRP:35,baseStatGain:2},
      {name:'Half-Kneeling Cable Rotation',template:'Execute {sets} sets of {reps:12} half-kneeling cable rotation reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Landmine Rotation',template:'Perform {sets} sets of {reps:10} landmine rotation reps each side.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Decline Oblique Crunch',template:'Execute {sets} sets of {reps:15} decline oblique crunch reps each side.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Hanging Oblique Knee Raise',template:'Perform {sets} sets of {reps:10} hanging oblique knee raise reps each side.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Oblique 100 Rep Challenge',template:'Complete 100 oblique reps (any mix) in minimum sets.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Med Ball Rotational Pass',template:'Complete {sets} sets of {reps:10} med ball rotational passes against wall.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Barbell Side Bend',template:'Perform {sets} sets of {reps:12} barbell side bend reps.',stat:'Strength',baseRP:22,baseStatGain:1},
    
      // ── Additional Oblique + Advanced ──
      {name:'Dragon Flag Oblique',template:'Execute {sets} sets of {reps:5} oblique dragon flag reps.',stat:'Discipline',baseRP:50,baseStatGain:4,level:'advanced'},
      {name:'Human Flag Training',template:'Practice human flag progressions for {time:15m}.',stat:'Strength',baseRP:65,baseStatGain:5,level:'advanced',intensity:'heavy'},
      {name:'Windshield Wiper Weighted',template:'Perform {sets} sets of {reps:8} weighted windshield wiper reps.',stat:'Discipline',baseRP:48,baseStatGain:4,level:'advanced',compound:true},
      {name:'Oblique Pallof Heavy',template:'Complete {sets} sets of {reps:10} heavy Pallof press reps each side.',stat:'Discipline',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Standing Ab Wheel Oblique',template:'Execute {sets} sets of {reps:8} diagonal ab wheel rollout reps each side.',stat:'Discipline',baseRP:38,baseStatGain:3,level:'advanced'},
      {name:'Loaded Side Bend Heavy',template:'Perform {sets} sets of {reps:10} heavy barbell side bends.',stat:'Strength',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Oblique Cable 21s',template:'Complete cable woodchop 21s: {reps:7} low + {reps:7} mid + {reps:7} high each side.',stat:'Agility',baseRP:35,baseStatGain:3},
      {name:'Hanging Oblique L-Sit',template:'Execute {sets} sets of {reps:8} hanging oblique L-sit reps.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced',compound:true},
      {name:'Med Ball Rotational Slam',template:'Perform {sets} sets of {reps:15} rotational med ball slams each side.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Oblique Density Block',template:'Execute {time:8m} oblique density: woodchop + side bend + oblique crunch alternating.',stat:'Stamina',baseRP:35,baseStatGain:3,volume:'high'},
      {name:'Ring Oblique Row',template:'Complete {sets} sets of {reps:10} ring row with torso rotation each side.',stat:'Agility',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Pallof Press Iso Hold',template:'Perform {sets} {time:30s} Pallof press isometric holds each side.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Torsion Deadlift',template:'Execute {sets} sets of {reps:6} offset-loaded torsion deadlift reps.',stat:'Strength',baseRP:35,baseStatGain:3,compound:true,level:'advanced'},
      {name:'Oblique Monthly Test',template:'Test oblique strength: max Copenhagen plank + max woodchop reps. Log numbers.',stat:'Discipline',baseRP:35,baseStatGain:3},
      {name:'Suitcase DL Heavy',template:'Perform {sets} sets of {reps:5} heavy suitcase deadlift reps each side.',stat:'Strength',baseRP:38,baseStatGain:3,compound:true,intensity:'heavy'},
      {name:'Side Plank Row',template:'Complete {sets} sets of {reps:10} side plank cable row reps each side.',stat:'Discipline',baseRP:32,baseStatGain:2,level:'advanced'},

      {name:'Oblique Beginner Crunch',template:'Perform 3 sets of {reps:15} oblique crunch reps each side.',stat:'Discipline',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Side Plank Beginner',template:'Execute 3 sets of {time:20s} knee-supported side plank each side.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Russian Twist Beginner',template:'Complete 3 sets of {reps:15} bodyweight Russian twist reps.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Oblique Speed Woodchop',template:'Perform {sets} sets of {reps:20} fast cable woodchop reps each side.',stat:'Speed',baseRP:22,baseStatGain:1},
      {name:'Oblique Stamina 200',template:'Complete 200 total oblique reps in minimum sets.',stat:'Stamina',baseRP:30,baseStatGain:2,volume:'high'},
      {name:'Oblique Agility Rotation',template:'Execute {sets} sets of {reps:20} fast rotational med ball throws each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Oblique Discipline Week',template:'Perform oblique work every single training day this week.',stat:'Discipline',baseRP:25,baseStatGain:2},
],
    calisthenics: [
      {name:'Side Plank [Cali]',template:'Execute {sets} {time:45s} side plank holds each side.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Star Side Plank',template:'Perform {sets} {time:20s} star side plank holds each side.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Windshield Wiper (Calisthenics)',template:'Complete {sets} sets of {reps:10} hanging windshield wiper reps.',stat:'Discipline',baseRP:40,baseStatGain:3},
      {name:'Oblique V-Up BW',template:'Execute {sets} sets of {reps:12} oblique V-ups each side.',stat:'Discipline',baseRP:22,baseStatGain:1,level:'beginner'},
      {name:'Dragon Flag Twist',template:'Perform {sets} sets of {reps:5} dragon flag twists.',stat:'Discipline',baseRP:45,baseStatGain:4,level:'advanced'},
      {name:'Bicycle Crunch BW',template:'Complete {sets} sets of {reps:30} bicycle crunch reps.',stat:'Discipline',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Thread the Needle',template:'Execute {sets} sets of {reps:10} thread the needle reps from plank.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Spiderman Plank',template:'Perform {sets} sets of {reps:12} Spiderman plank reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Hanging Oblique Twist',template:'Complete {sets} sets of {reps:10} hanging oblique knee twists.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Oblique Flow',template:'Execute {time:10m} of oblique-focused calisthenics flow.',stat:'Agility',baseRP:25,baseStatGain:2},
    ],
    home: [
      {name:'Side Plank Home [Home]',template:'Execute {sets} {time:45s} side plank holds each side.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Russian Twist Home',template:'Perform {sets} sets of {reps:20} Russian twist reps.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Bicycle Crunch Home',template:'Complete {sets} sets of {reps:25} bicycle crunch reps.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Oblique V-Up Home',template:'Execute {sets} sets of {reps:12} oblique V-ups each side.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Standing Side Bend Home',template:'Perform {sets} sets of {reps:15} standing side bend reps each side.',stat:'Agility',baseRP:10,baseStatGain:1},
      {name:'Home Woodchop Band',template:'Complete {sets} sets of {reps:15} home resistance band woodchop reps.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
    ],
  },

  // ══════════════════════════════════════════════════
  // TRAPS (TRAPEZIUS)
  // ══════════════════════════════════════════════════
  traps: {
    gym: [
      {name:'Barbell Shrug Heavy',template:'Execute {sets} sets of {reps:10} heavy barbell shrug reps.',stat:'Strength',baseRP:30,baseStatGain:2,intensity:'heavy'},
      {name:'Dumbbell Shrug Heavy',template:'Perform {sets} sets of {reps:12} heavy dumbbell shrug reps.',stat:'Strength',baseRP:28,baseStatGain:2,intensity:'heavy'},
      {name:'Overhead Shrug',template:'Complete {sets} sets of {reps:15} overhead barbell shrug reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Rack Pull Shrug',template:'Execute {sets} sets of {reps:8} rack pull into shrug reps.',stat:'Strength',baseRP:40,baseStatGain:3,compound:true},
      {name:'Trap Bar Shrug',template:'Perform {sets} sets of {reps:12} trap bar shrug reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Shrug',template:'Complete {sets} sets of {reps:15} cable shrug reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Farmer Carry Trap',template:'Execute {sets} {time:30s} heavy farmer carry for trap activation.',stat:'Durability',baseRP:28,baseStatGain:2,intensity:'heavy',level:'beginner',compound:true},
      {name:'Behind-Back Shrug',template:'Perform {sets} sets of {reps:12} behind-the-back barbell shrug reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Power Shrug',template:'Complete {sets} sets of {reps:6} power shrug reps with momentum.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Trap Isolation Day',template:'Execute full trap session: 4 shrug variations + farmer carry.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Incline Dumbbell Shrug',template:'Perform {sets} sets of {reps:15} incline dumbbell shrug reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Shrug Drop Set',template:'Complete shrug drop set: {reps:10} heavy + {reps:15} medium + {reps:20} light.',stat:'Strength',baseRP:35,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Pause Shrug',template:'Execute {sets} sets of {reps:10} pause shrug reps (2s hold at top).',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Trap Superset',template:'Perform {sets} supersets: {reps:12} barbell shrug + {reps:15} cable shrug.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Upright Row [Gym]',template:'Execute {sets} sets of {reps:12} barbell upright row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Snatch Grip Shrug',template:'Perform {sets} sets of {reps:10} snatch-grip barbell shrug reps.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'advanced'},
      {name:'100 Rep Shrug Challenge',template:'Perform 100 total shrug reps in minimum sets.',stat:'Stamina',baseRP:32,baseStatGain:2,volume:'high'},
      {name:'Olympic Shrug',template:'Complete {sets} sets of {reps:6} Olympic-style power shrug reps.',stat:'Speed',baseRP:38,baseStatGain:3},
    
      // ── Pull Balance Fix: Additional Traps Gym ──
      {name:'Cable Shrug High',template:'Execute {sets} sets of {reps:15} high-cable shrug reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Barbell Shrug Pause',template:'Perform {sets} sets of {reps:10} barbell shrug reps with 3s hold.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Dumbbell Shrug Pause',template:'Complete {sets} sets of {reps:12} dumbbell shrug reps with 2s hold.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Trap Bar Farmer Walk',template:'Execute {sets} {time:30s} trap bar farmer walk.',stat:'Durability',baseRP:30,baseStatGain:2,compound:true},
      {name:'Overhead Farmer Carry',template:'Perform {sets} {time:30s} overhead single-arm farmer carry each side.',stat:'Durability',baseRP:28,baseStatGain:2,compound:true},
      {name:'Rack Pull to Shrug',template:'Complete {sets} sets of {reps:6} rack pull into shrug reps.',stat:'Strength',baseRP:42,baseStatGain:3,compound:true},
      {name:'Barbell Shrug 100',template:'Execute 100 barbell shrug reps in minimum sets.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Trap Superset Drop',template:'Perform {sets} supersets into drop set: {reps:8} heavy shrug → {reps:20} light shrug.',stat:'Strength',baseRP:35,baseStatGain:3,intensity:'heavy',level:'beginner'},
      {name:'Face Pull Shrug Combo',template:'Complete {sets} sets of {reps:15} face pull into shrug combo reps.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Single Arm DB Shrug',template:'Execute {sets} sets of {reps:15} single-arm dumbbell shrug reps each side.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Landmine Shrug',template:'Perform {sets} sets of {reps:12} landmine shrug reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Trap Activation Pre-Lift',template:'Complete trap activation: {reps:20} band shrug + {reps:15} cable shrug before main work.',stat:'Durability',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Isometric Shrug Hold',template:'Execute {sets} {time:20s} isometric shrug holds at top.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Wide Grip Shrug',template:'Perform {sets} sets of {reps:12} wide-grip barbell shrug reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Trap Tri-Set',template:'Complete tri-set: {reps:10} heavy shrug + {reps:15} upright row + {reps:20} band shrug.',stat:'Strength',baseRP:35,baseStatGain:2,intensity:'heavy',level:'beginner'},
      {name:'Cable Shrug Superset',template:'Execute {sets} supersets: {reps:15} cable shrug + {reps:15} face pull.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Hex Bar Shrug',template:'Perform {sets} sets of {reps:12} hex bar shrug reps.',stat:'Strength',baseRP:28,baseStatGain:2,compound:true},
      {name:'Snatch Grip Shrug Pause',template:'Complete {sets} sets of {reps:8} snatch-grip shrug with 2s hold.',stat:'Strength',baseRP:30,baseStatGain:2,compound:true,level:'advanced'},
      {name:'Power Shrug to High Pull',template:'Execute {sets} sets of {reps:5} power shrug into high pull reps.',stat:'Speed',baseRP:38,baseStatGain:3},
      {name:'Trap Volume Day',template:'Perform full trap volume day: 5 shrug variations × {sets} sets.',stat:'Stamina',baseRP:42,baseStatGain:3,volume:'high'},

      {name:'Shrug Beginner',template:'Perform 3 sets of {reps:20} dumbbell shrug reps with light weight.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Band Shrug Beginner',template:'Execute 3 sets of {reps:25} resistance band shrug reps.',stat:'Strength',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Trap Speed Shrug',template:'Complete {sets} sets of {reps:20} fast dumbbell shrug reps.',stat:'Speed',baseRP:20,baseStatGain:1},
      {name:'Trap Stamina 200',template:'Perform 200 total shrug reps in minimum sets.',stat:'Stamina',baseRP:28,baseStatGain:2,volume:'high'},
      {name:'Trap Discipline Carry',template:'Execute heavy farmer carry every training day this week.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Trap Agility High Pull',template:'Perform {sets} sets of {reps:10} dumbbell high pull reps.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Trap Advanced Cluster',template:'Execute barbell shrug cluster: {reps:5}+{reps:5}+{reps:5} at 90%, 15s rest.',stat:'Strength',baseRP:38,baseStatGain:3,intensity:'heavy',level:'advanced'},
],
    calisthenics: [
      {name:'Scapular Pull-Up',template:'Execute {sets} sets of {reps:12} scapular pull-ups — trap activation.',stat:'Durability',baseRP:22,baseStatGain:1,compound:true,level:'beginner'},
      {name:'Dead Hang Trap',template:'Perform {sets} {time:60s} dead hangs — focus on scapular depression.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Ring Shrug',template:'Complete {sets} sets of {reps:12} ring shrug reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Handstand Shoulder Shrug',template:'Execute {sets} sets of {reps:8} handstand scapular shrugs on wall.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Trap Band Shrug',template:'Perform {sets} sets of {reps:20} resistance band shrug reps.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Dip Shrug',template:'Complete {sets} sets of {reps:12} scapular dip shrugs at top of dip.',stat:'Strength',baseRP:25,baseStatGain:2,compound:true},
    ],
    home: [
      {name:'Home Shrug',template:'Execute {sets} sets of {reps:15} shrugs with heavy bags or objects.',stat:'Strength',baseRP:15,baseStatGain:1,intensity:'heavy',level:'beginner'},
      {name:'Home Band Shrug',template:'Perform {sets} sets of {reps:20} resistance band shrug reps.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Carry Shrug Home',template:'Complete {sets} {time:30s} farmer carry shrug with heavy bags.',stat:'Durability',baseRP:15,baseStatGain:1,intensity:'heavy',compound:true},
      {name:'Towel Shrug',template:'Execute {sets} sets of {reps:15} towel-over-door pull shrug reps.',stat:'Strength',baseRP:12,baseStatGain:1},
    ],
  },



  // ══════════════════════════════════════════════════
  // MOBILITY & FLEXIBILITY
  // ══════════════════════════════════════════════════
  mobility: {
    gym: [
      {name:'Full Body Mobility Flow',template:'Complete {time:20m} full body mobility flow. Every joint, every plane of motion.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Hip Mobility Drill',template:'Execute {time:15m} hip mobility: deep squat + pigeon + 90-90 + couch stretch.',stat:'Agility',baseRP:22,baseStatGain:2,compound:true},
      {name:'Shoulder Mobility Flow',template:'Perform {time:15m} shoulder mobility: CARs + band work + chest-opener.',stat:'Durability',baseRP:20,baseStatGain:2},
      {name:'Thoracic Mobility',template:'Complete {time:15m} thoracic spine mobility: foam roll + rotation + cat-cow.',stat:'Durability',baseRP:20,baseStatGain:2},
      {name:'Ankle Mobility Protocol',template:'Execute {sets} rounds of ankle mobility: circles + dorsiflexion + single-leg balance.',stat:'Agility',baseRP:18,baseStatGain:1},
      {name:'Full Stretch Session',template:'Perform {time:30m} full body static stretching — every major muscle group, 30s holds.',stat:'Agility',baseRP:28,baseStatGain:3},
      {name:'PNF Stretching',template:'Complete PNF stretching on tight muscle groups — 3 cycles each.',stat:'Agility',baseRP:28,baseStatGain:3},
      {name:'Yoga Flow Gym',template:'Follow a {time:30m} yoga flow routine.',stat:'Agility',baseRP:30,baseStatGain:3},
      {name:'Foam Roll Full Body',template:'Foam roll every major muscle: 60s per area, work out all knots.',stat:'Durability',baseRP:22,baseStatGain:2},
      {name:'Loaded Stretch Protocol',template:'Perform {sets} × {time:30s} loaded stretches on tight muscles.',stat:'Agility',baseRP:22,baseStatGain:2},
      {name:'Hamstring Flexibility Work',template:'Execute {time:15m} hamstring flexibility: RDL stretch + forward fold + pike.',stat:'Agility',baseRP:20,baseStatGain:2,compound:true},
      {name:'Squat Mobility Session',template:'Complete {time:15m} squat mobility: ankle + hip + thoracic focus.',stat:'Agility',baseRP:22,baseStatGain:2,compound:true},
      {name:'Jefferson Curl Gym',template:'Perform {sets} sets of {reps:8} Jefferson curl reps — slow, weighted.',stat:'Agility',baseRP:22,baseStatGain:2,compound:true},
      {name:'Bridge Progression',template:'Execute bridge progression: {sets} × {time:20s} back bridge holds.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Hip Flexor Deep Stretch',template:'Complete {sets} {time:90s} deep kneeling hip flexor stretch each side.',stat:'Agility',baseRP:20,baseStatGain:2},
    
      // ── Additional Mobility Gym ──
      {name:'Controlled Articular Rotations',template:'Execute CARs for every joint: spine, hip, shoulder, knee, ankle — {sets} rounds.',stat:'Agility',baseRP:22,baseStatGain:2},
      {name:'Active Flexibility Training',template:'Perform {time:30m} active flexibility work — not passive holding, active strength in range.',stat:'Agility',baseRP:28,baseStatGain:3,level:'advanced'},
      {name:'Mobility Flow Full Body',template:'Complete {time:25m} full body mobility flow — move through every major restriction.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Spine Decompression',template:'Execute spine decompression: {sets} {time:60s} dead hangs + {time:15m} foam roll.',stat:'Durability',baseRP:20,baseStatGain:2},
      {name:'End Range Strength',template:'Perform end-range strength exercises for hip and shoulder — 3 exercises each.',stat:'Agility',baseRP:28,baseStatGain:2,level:'advanced'},
      {name:'Kinstretch Session',template:'Follow a {time:30m} kinstretch protocol — active joint mobility.',stat:'Agility',baseRP:30,baseStatGain:3},
      {name:'Pre-Workout Mobility',template:'Complete {time:15m} mobility warm-up targeting todays muscle groups.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Mobility Monthly Assessment',template:'Assess your mobility: overhead reach, hip flexion, ankle dorsiflexion. Log results.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Back Mobility Day',template:'Perform full back mobility day: cat-cow + Jefferson curl + thoracic rotation + cobra.',stat:'Durability',baseRP:22,baseStatGain:2,compound:true},
      {name:'Hip Mobility Day',template:'Execute full hip mobility day: 90-90 + pigeon + couch stretch + deep squat hold.',stat:'Agility',baseRP:22,baseStatGain:2,compound:true},
      {name:'Shoulder Mobility Day',template:'Complete full shoulder mobility day: CARs + band work + doorframe stretch + overhead reach.',stat:'Durability',baseRP:22,baseStatGain:2},
      {name:'Flexibility + Strength',template:'Perform {time:30m} of weighted flexibility work — build strength through full range.',stat:'Agility',baseRP:28,baseStatGain:3,level:'advanced'},

      {name:'Hip 90-90 Stretch',template:'Perform {sets} {time:60s} 90-90 hip stretch holds each side.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Couch Stretch Gym',template:'Execute {sets} {time:90s} couch stretch each side — deep hip flexor release.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Pigeon Pose',template:'Complete {sets} {time:60s} pigeon pose stretch each side.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Overhead Squat Mobility',template:'Perform {sets} sets of {reps:10} overhead squat mobility reps with PVC pipe.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Spine Twist Stretch',template:'Execute {sets} {time:30s} supine spinal twist each side.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Wrist Circles Protocol',template:'Perform {sets} {time:30s} wrist circles each direction — essential for pressing.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Deep Squat Hold [G]',template:'Complete {sets} {time:60s} deep squat hold — elbows push knees out.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Hip Circle Flow',template:'Execute {sets} {time:30s} hip circle flows each direction.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Neck Mobility Full',template:'Perform full neck mobility: circles + tilts + rotations — {time:8m} total.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Lats Overhead Stretch',template:'Execute {sets} {time:45s} lat overhead stretch hanging from bar.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Doorframe Pec Stretch',template:'Perform {sets} {time:30s} doorframe pec stretch — chest opener.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Active Pigeon',template:'Execute {sets} {time:45s} active pigeon pose each side — flex glute.',stat:'Agility',baseRP:20,baseStatGain:2,level:'advanced'},
      {name:'Jefferson Curl Advanced',template:'Perform {sets} sets of {reps:10} weighted Jefferson curl reps.',stat:'Agility',baseRP:25,baseStatGain:2,level:'advanced'},
      {name:'Squat to Stand',template:'Complete {sets} sets of {reps:10} squat-to-stand mobility reps.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'World Greatest Stretch',template:'Execute {sets} sets of {reps:5} world greatest stretch each side.',stat:'Agility',baseRP:20,baseStatGain:2},
],
    calisthenics: [
      {name:'Morning Mobility Cali',template:'Execute {time:15m} morning mobility before training: joint CARs + light stretching.',stat:'Agility',baseRP:20,baseStatGain:2},
      {name:'Pike Stretch Progression',template:'Execute {sets} {time:60s} pike stretch holds — work toward straight-leg pike.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Straddle Stretch Cali',template:'Perform {sets} {time:60s} straddle stretch holds. Work toward splits.',stat:'Agility',baseRP:20,baseStatGain:2},
      {name:'Front Split Practice',template:'Complete {time:15m} front split flexibility work each side.',stat:'Agility',baseRP:25,baseStatGain:3},
      {name:'Pancake Stretch Cali',template:'Execute {sets} {time:60s} pancake stretch holds. Progress toward floor.',stat:'Agility',baseRP:22,baseStatGain:2},
      {name:'Wrist Mobility Protocol',template:'Perform {time:10m} wrist mobility: circles + stretches + strengthening.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Shoulder Dislocates',template:'Complete {sets} sets of {reps:15} shoulder dislocate reps with band or stick.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Full Cali Mobility Day',template:'Execute {time:30m} complete calisthenics mobility session.',stat:'Agility',baseRP:28,baseStatGain:3},
    
      // ── Additional Mobility Cali ──
      {name:'Splits Training',template:'Practice full splits progression for {time:20m} each side.',stat:'Agility',baseRP:28,baseStatGain:3},
      {name:'Bridge to Chest',template:'Perform bridge progression until chest touches floor — work in ranges.',stat:'Agility',baseRP:30,baseStatGain:3,level:'advanced'},
      {name:'Backbend Training',template:'Execute backbend progression: bridge + wheel + scorpion — {time:20m}.',stat:'Agility',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Mobility Flow Cali',template:'Complete {time:20m} calisthenics mobility flow — animals, flows, CARs.',stat:'Agility',baseRP:22,baseStatGain:2},
      {name:'Compression Strength',template:'Perform {time:15m} compression strength work: seated leg raise + pike compressions.',stat:'Agility',baseRP:28,baseStatGain:3,level:'advanced'},

      {name:'Back Bridge Hold',template:'Perform {sets} {time:20s} back bridge holds.',stat:'Agility',baseRP:22,baseStatGain:2},
      {name:'German Hang',template:'Execute {sets} {time:10s} German hang holds on rings.',stat:'Agility',baseRP:25,baseStatGain:2,level:'advanced'},
      {name:'Crow Pose',template:'Practice crow pose for {time:10m} — wrist and hip mobility.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Seated Forward Fold',template:'Perform {sets} {time:60s} seated forward fold holds.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Downward Dog Flow',template:'Execute {sets} {time:30s} downward dog holds with calf presses.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
],
    home: [
      {name:'Morning Stretch Home',template:'Complete {time:10m} morning stretch routine immediately after waking.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Evening Flexibility Home',template:'Perform {time:15m} evening stretching before sleep.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Hip Opener Home',template:'Execute {time:15m} hip opener: pigeon + butterfly + 90-90.',stat:'Agility',baseRP:18,baseStatGain:2},
      {name:'Home Yoga Session',template:'Follow a {time:20m} yoga video at home.',stat:'Agility',baseRP:20,baseStatGain:2},
      {name:'Foam Roll Home Session',template:'Use foam roller or tennis ball for {time:15m} on tight areas.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Splits Practice Home',template:'Practice splits for {time:15m}. Hold comfortable positions.',stat:'Agility',baseRP:20,baseStatGain:2},
      {name:'Cat Cow Flow Home',template:'Perform {sets} {time:60s} cat-cow spinal flow for back mobility.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
    
      // ── Additional Mobility Home ──
      {name:'Daily Joint Circles',template:'Execute full body joint circles: every joint, every direction. 10 minutes minimum.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Couch Stretch Home',template:'Perform {sets} {time:90s} couch stretch each side — crucial for hip flexors.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Doorframe Stretch',template:'Complete {sets} {time:30s} doorframe chest and shoulder stretch.',stat:'Durability',baseRP:10,baseStatGain:1,level:'beginner'},
      {name:'Child Pose Flow',template:'Execute {time:10m} child pose and hip opener flow.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Thread the Needle Stretch',template:'Perform {sets} {time:30s} thread-the-needle thoracic stretch each side.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},

      {name:'Legs Up Wall',template:'Lie with legs up wall for {time:5m}. Recovery and circulation.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Figure Four Stretch',template:'Perform {sets} {time:45s} figure four stretch each side.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Thoracic Extension Chair',template:'Execute {sets} {time:30s} thoracic extension over chair back.',stat:'Durability',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Hip Flexor Kneeling',template:'Complete {sets} {time:60s} kneeling hip flexor stretch each side.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
      {name:'Standing Forward Fold',template:'Perform {sets} {time:45s} standing forward fold — hamstring and back.',stat:'Agility',baseRP:12,baseStatGain:1,level:'beginner'},
],
  },

  // ══════════════════════════════════════════════════
  // CARDIO & CONDITIONING
  // ══════════════════════════════════════════════════
  cardio: {
    gym: [
      {name:'Treadmill Run 20min',template:'Run on treadmill for {time:20m} at comfortable pace. Track distance.',stat:'Stamina',baseRP:25,baseStatGain:2,compound:true},
      {name:'Treadmill Intervals',template:'Execute {sets} rounds: {time:1m} sprint / {time:1m} walk on treadmill.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Treadmill Sprint 10x',template:'Perform 10 × {time:30s} treadmill sprints at 90% effort. 30s walk between.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Incline Treadmill Walk',template:'Walk on treadmill at max incline for {time:20m}.',stat:'Stamina',baseRP:22,baseStatGain:2},
      {name:'Rowing Machine 2km',template:'Complete a 2km rowing machine time trial. Log your time.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Rowing Intervals',template:'Execute {sets} rounds: hard row {time:2m} / rest {time:2m}.',stat:'Stamina',baseRP:32,baseStatGain:2},
      {name:'Stationary Bike 20min',template:'Ride stationary bike for {time:20m} at moderate intensity.',stat:'Stamina',baseRP:22,baseStatGain:2},
      {name:'Bike Sprint Intervals',template:'Perform {sets} × {time:30s} all-out bike sprints. 90s rest between.',stat:'Speed',baseRP:32,baseStatGain:3,compound:true},
      {name:'Elliptical 20min',template:'Use elliptical for {time:20m} at moderate-high resistance.',stat:'Stamina',baseRP:22,baseStatGain:2},
      {name:'Jump Rope Gym 10min',template:'Jump rope for {time:10m} continuous. No stopping.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Jump Rope Tabata Gym',template:'Execute tabata jump rope: 8 × {time:20s} max / 10s rest.',stat:'Speed',baseRP:30,baseStatGain:3},
      {name:'Stair Climber 15min',template:'Use stair climber for {time:15m} at moderate pace.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'HIIT Cardio Machine',template:'Perform {time:20m} HIIT on any cardio machine: 30s hard / 30s easy.',stat:'Speed',baseRP:32,baseStatGain:3},
      {name:'Sled Push Cardio',template:'Execute {sets} × {time:20s} sled push sprints. 40s rest between.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Battle Ropes 5 Rounds',template:'Perform 5 × {time:30s} battle rope sets. 30s rest between.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Cardio Finisher Gym',template:'End workout with {time:10m} cardio at moderate intensity.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Zone 2 Cardio',template:'Maintain Zone 2 heart rate (60-70% max) for {time:30m} on any machine.',stat:'Stamina',baseRP:30,baseStatGain:3},
      {name:'Assault Bike 10min',template:'Ride assault bike for {time:10m}. Do not stop.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Assault Bike Tabata',template:'Assault bike tabata: 8 × {time:20s} all-out / 10s rest.',stat:'Speed',baseRP:40,baseStatGain:3},
    
      // ── Additional Cardio Gym ──
      {name:'VO2 Max Intervals',template:'Execute 5 × {time:3m} hard effort on bike or treadmill. 3min easy between.',stat:'Stamina',baseRP:42,baseStatGain:3,level:'advanced'},
      {name:'Lactate Threshold Run',template:'Run at 85% max effort for {time:20m} continuous. Challenging but sustainable.',stat:'Stamina',baseRP:38,baseStatGain:3,level:'advanced',compound:true},
      {name:'Rower 5km',template:'Complete a 5km rowing machine time trial. Log your time.',stat:'Stamina',baseRP:45,baseStatGain:4,compound:true,level:'advanced'},
      {name:'Cardio Ladder',template:'Complete cardio ladder on treadmill: {time:1m} easy → {time:1m} hard × 10 rounds.',stat:'Stamina',baseRP:32,baseStatGain:2},
      {name:'Jump Rope Double Unders',template:'Perform {sets} sets of {reps:30} double-under jump rope reps.',stat:'Speed',baseRP:35,baseStatGain:3,level:'advanced'},
      {name:'Treadmill 5km',template:'Run 5km on treadmill. Log your time.',stat:'Stamina',baseRP:38,baseStatGain:3,compound:true},
      {name:'Cardio and Core Superset',template:'Execute {sets} supersets: {time:2m} bike sprint + {reps:20} hanging leg raise.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Assault Bike 20min',template:'Ride assault bike for {time:20m}. Moderate steady pace.',stat:'Stamina',baseRP:38,baseStatGain:3},
      {name:'Cardio Post-Lifting',template:'Complete {time:15m} low-intensity cardio after strength training — recovery mode.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Heart Rate Zone Training',template:'Spend {time:30m} in heart rate Zone 3 (70-80% max). Any machine.',stat:'Stamina',baseRP:32,baseStatGain:2},
      {name:'Sled Drag Cardio',template:'Perform {sets} × {time:30s} sled drag sprints. 30s rest between.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'Rowing Pyramid',template:'Row pyramid: 250m-500m-750m-1000m-750m-500m-250m. 90s rest between.',stat:'Stamina',baseRP:42,baseStatGain:3,level:'advanced'},

      {name:'Treadmill Walk 30min',template:'Walk on treadmill for {time:30m}. Great for active recovery.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Bike Easy 30min',template:'Ride stationary bike at easy effort for {time:30m}.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Cardio Speed Ladder',template:'Execute: 1min easy + 1min medium + 1min hard + 1min medium + 1min easy × {sets} rounds.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Ski Erg Session',template:'Perform {time:10m} on ski erg machine — full body cardio.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Rowing 1km Sprint',template:'Row 1km as fast as possible. Log your time.',stat:'Speed',baseRP:32,baseStatGain:3,compound:true},
      {name:'Cardio Discipline Day',template:'Complete full planned cardio session — no cutting it short.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'Treadmill Hill Repeat',template:'Execute {sets} × {time:2m} hill treadmill sprints. 2min easy between.',stat:'Speed',baseRP:32,baseStatGain:2},
      {name:'Max Calorie Bike',template:'Burn maximum calories on bike in {time:10m}. All-out effort.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Cardio Agility Drill',template:'Perform agility cardio: lateral shuffle + high knees + butt kicks × {sets} rounds.',stat:'Agility',baseRP:25,baseStatGain:2},
],
    calisthenics: [
      {name:'5km Run',template:'Run 5km outdoors. Track your time.',stat:'Stamina',baseRP:40,baseStatGain:3,compound:true},
      {name:'Sprint Intervals Outdoor',template:'Perform {sets} × {time:30s} all-out sprints outdoors. Walk back.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Tempo Run',template:'Run at comfortably hard pace for {time:20m}. Consistent effort.',stat:'Stamina',baseRP:30,baseStatGain:2,compound:true},
      {name:'Calisthenics Cardio Circuit',template:'Execute: {reps:20} jumping jack + {reps:15} burpee + {reps:20} mountain climber × {sets} rounds.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Burpee Tabata',template:'Burpee tabata: 8 × {time:20s} max burpees / 10s rest.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Jump Rope Outdoor 15min',template:'Jump rope outdoors for {time:15m} continuous.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Hill Sprint Session',template:'Execute {sets} hill sprints up maximum available incline.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Long Run Outdoor',template:'Complete a {time:30m}+ easy-pace outdoor run.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'10km Run',template:'Complete a 10km outdoor run. Log your time.',stat:'Stamina',baseRP:55,baseStatGain:5,compound:true,level:'advanced'},
      {name:'Fartlek Run',template:'Run for {time:30m} alternating fast and easy pace every 2 minutes.',stat:'Speed',baseRP:32,baseStatGain:3,compound:true},
      {name:'Box Jump Cardio',template:'Perform {sets} × {reps:10} box jumps. 30s rest between.',stat:'Speed',baseRP:30,baseStatGain:2},
    
      // ── Additional Cardio Cali ──
      {name:'400m Sprint',template:'Sprint 400m as fast as possible. Rest 5 minutes. Repeat {sets} times.',stat:'Speed',baseRP:40,baseStatGain:3,level:'advanced',compound:true},
      {name:'1500m Run',template:'Run 1500m at maximum sustainable effort. Log your time.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'Tabata Outdoor',template:'Execute outdoor tabata: 8 rounds of {time:20s} sprint / 10s rest.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Calisthenics HIIT',template:'Perform HIIT circuit: burpee + jump squat + mountain climber — 40s on / 20s off × 10.',stat:'Stamina',baseRP:35,baseStatGain:3,compound:true},
      {name:'Stair Sprint Session',template:'Sprint up stairs {sets} times, walk down between.',stat:'Speed',baseRP:32,baseStatGain:3,compound:true},
      {name:'Jump Rope Advanced',template:'Complete {time:20m} jump rope session with variety: singles, doubles, alternating.',stat:'Speed',baseRP:32,baseStatGain:2,level:'advanced'},
      {name:'Running Intervals 10x100',template:'Execute 10 × 100m sprint intervals. Walk back between each.',stat:'Speed',baseRP:38,baseStatGain:3,compound:true},
      {name:'Half Marathon Training',template:'Complete a {time:60m}+ long slow run. Building your aerobic base.',stat:'Stamina',baseRP:55,baseStatGain:5,compound:true,level:'advanced'},

      {name:'Sprint Discipline',template:'Complete every sprint interval fully — no slowing down before the time is up.',stat:'Discipline',baseRP:22,baseStatGain:2},
      {name:'Cardio Speed Test',template:'Run 400m as fast as possible. Log your time. Beat it next month.',stat:'Speed',baseRP:35,baseStatGain:3,compound:true},
      {name:'Agility Ladder Drill',template:'Execute agility ladder drills for {time:15m}.',stat:'Agility',baseRP:22,baseStatGain:2},
],
    home: [
      {name:'Home Cardio Circuit',template:'Execute: {reps:30} jumping jack + {reps:20} high knee + {reps:15} burpee × {sets} rounds.',stat:'Stamina',baseRP:22,baseStatGain:2,level:'beginner'},
      {name:'Home Burpee Session',template:'Perform {reps:50} total burpees in minimum time.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Home Jump Rope Session',template:'Jump rope or perform jump intervals for {time:15m}.',stat:'Speed',baseRP:22,baseStatGain:2},
      {name:'Home HIIT Session',template:'Complete HIIT: 20s work / 10s rest × 8 rounds. Pick 2 exercises, alternate.',stat:'Speed',baseRP:25,baseStatGain:2},
      {name:'Outdoor Walk Home',template:'Take a {time:30m} brisk outdoor walk.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
      {name:'Home Stair Sprint',template:'Sprint up and down stairs {reps:20} times.',stat:'Speed',baseRP:22,baseStatGain:2,compound:true},
      {name:'Home Tabata Cardio',template:'Perform tabata: 8 rounds of {time:20s} jumping jacks / 10s rest.',stat:'Stamina',baseRP:20,baseStatGain:2,level:'beginner'},
    
      // ── Additional Cardio Home ──
      {name:'Shadow Boxing',template:'Shadow box for {time:15m}. Combinations, footwork, head movement.',stat:'Speed',baseRP:22,baseStatGain:2},
      {name:'Home Aerobics',template:'Follow a {time:20m} aerobics or dance cardio video.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},
      {name:'Speed Ladder Home',template:'Perform speed ladder drills for {time:15m} — agility and conditioning.',stat:'Speed',baseRP:22,baseStatGain:2},
      {name:'Stair Interval Home',template:'Execute stair intervals: {time:20m} alternating stair walk and sprint.',stat:'Stamina',baseRP:22,baseStatGain:2},
      {name:'Long Walk Outdoor',template:'Walk briskly outdoors for {time:45m}+. Swing arms, maintain pace.',stat:'Stamina',baseRP:18,baseStatGain:1,level:'beginner'},

      {name:'Cardio Discipline Home',template:'Complete your planned home cardio — no excuses, no shortcuts.',stat:'Discipline',baseRP:18,baseStatGain:2},
      {name:'Speed Burst Home',template:'Perform {sets} × {time:20s} all-out speed bursts in place.',stat:'Speed',baseRP:18,baseStatGain:1},
],
  },


};


// ─── DELOAD QUEST POOL ────────────────────────────────────────────────────────

const DELOAD_QUESTS = {
  gym: [
    {name:'Deload: Light Squat',template:'Execute {sets} sets of {reps:10} squat reps at 50% of normal weight. Perfect form only.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Light Bench',template:'Perform {sets} sets of {reps:10} bench press reps at 50% weight. Slow, controlled.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Light Deadlift',template:'Complete {sets} sets of {reps:5} deadlift reps at 50% weight. Focus on position.',stat:'Strength',baseRP:20,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Light Row',template:'Execute {sets} sets of {reps:12} barbell row at 50% weight. Lat engagement only.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Light OHP',template:'Perform {sets} sets of {reps:12} overhead press at 50% weight.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Light Leg Press',template:'Complete {sets} sets of {reps:15} leg press at 40% weight.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Mobility Flow',template:'Perform {time:20m} full body mobility flow. No heavy loading this session.',stat:'Agility',baseRP:22,baseStatGain:2},
    {name:'Deload: Technique Work',template:'Execute {time:20m} technique practice on your weakest lift. Light weight only.',stat:'Discipline',baseRP:22,baseStatGain:2},
    {name:'Deload: Cable Work Only',template:'Complete {sets} sets of {reps:15} light cable exercises for all push/pull muscles.',stat:'Durability',baseRP:18,baseStatGain:1},
    {name:'Deload: Active Recovery',template:'Perform {time:30m} of light activity — walking, cycling, swimming. No max effort.',stat:'Stamina',baseRP:20,baseStatGain:1},
    {name:'Deload: Foam Roll Session',template:'Complete {time:20m} full body foam rolling and stretching.',stat:'Durability',baseRP:18,baseStatGain:1},
    {name:'Deload: Joint Health',template:'Execute joint circles and mobility work for all major joints — 20 minutes.',stat:'Durability',baseRP:20,baseStatGain:2},
  ],
  calisthenics: [
    {name:'Deload: Easy Ring Rows',template:'Complete {sets} sets of {reps:8} easy ring rows. Stop well before failure.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Technique Push-Ups',template:'Perform {sets} sets of {reps:10} perfect technique push-ups. Slow and controlled.',stat:'Discipline',baseRP:12,baseStatGain:1,level:'beginner'},
    {name:'Deload: Cali Mobility',template:'Complete {time:30m} of calisthenics joint mobility and light stretching.',stat:'Agility',baseRP:18,baseStatGain:2},
    {name:'Deload: Skill Drill Light',template:'Practice basic skill drills at 30% effort — no max attempts.',stat:'Discipline',baseRP:15,baseStatGain:1},
    {name:'Deload: Easy Squat',template:'Execute {sets} sets of {reps:15} bodyweight squats — very easy, perfect form.',stat:'Strength',baseRP:12,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Active Recovery Walk',template:'Walk for {time:30m} at easy pace. Swing arms, breathe deep.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
    {name:'Deload: Easy Pull-Ups',template:'Perform {sets} sets of {reps:5} easy pull-ups — stop well before failure.',stat:'Strength',baseRP:18,baseStatGain:1,level:'beginner',compound:true},
    {name:'Deload: Light Push-Ups',template:'Execute {sets} sets of {reps:15} slow push-ups. No explosive effort.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner'},
    {name:'Deload: Skill Practice Light',template:'Spend {time:20m} on skill practice at 50% effort — handstand, L-sit, etc.',stat:'Discipline',baseRP:20,baseStatGain:1},
    {name:'Deload: Mobility Cali',template:'Perform {time:25m} calisthenics mobility flow. No max effort movements.',stat:'Agility',baseRP:20,baseStatGain:2},
    {name:'Deload: Easy Dips',template:'Complete {sets} sets of {reps:8} easy parallel bar dips. Stop before fatigue.',stat:'Strength',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
  ],
  home: [
    {name:'Deload: Home Mobility',template:'Complete {time:25m} home mobility — every joint, no intensity.',stat:'Agility',baseRP:15,baseStatGain:1,level:'beginner'},
    {name:'Deload: Light Home Circuit',template:'Perform {sets} rounds of easy: {reps:10} squat + {reps:10} push-up + {reps:10} row.',stat:'Stamina',baseRP:12,baseStatGain:1,level:'beginner'},
    {name:'Deload: Easy Home Cardio',template:'Walk or bike at easy effort for {time:30m}.',stat:'Stamina',baseRP:12,baseStatGain:1,level:'beginner'},
    {name:'Deload: Foam Roll Home',template:'Foam roll or use tennis ball for {time:20m} on all tight areas.',stat:'Durability',baseRP:15,baseStatGain:1,level:'beginner'},
    {name:'Deload: Meditation',template:'Meditate for {time:15m}. Let your mind and body fully recover.',stat:'Discipline',baseRP:15,baseStatGain:1},
    {name:'Deload: Sleep Early',template:'Go to bed 1 hour earlier than normal tonight. Recovery starts with sleep.',stat:'Stamina',baseRP:18,baseStatGain:1},
    {name:'Deload: Light Home Session',template:'Execute 20 min of easy bodyweight movement — no max effort, no failure.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
    {name:'Deload: Stretching Day',template:'Perform {time:30m} full body stretching. Every major muscle group.',stat:'Agility',baseRP:18,baseStatGain:2},
    {name:'Deload: Walk',template:'Take a {time:30m} brisk walk outdoors. Active recovery.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner'},
    {name:'Deload: Easy Home Circuit',template:'Complete 3 rounds of easy movement: {reps:10} squat + {reps:10} push-up + {reps:10} row.',stat:'Stamina',baseRP:15,baseStatGain:1,level:'beginner',compound:true},
  ],
};

// ─── NON-FITNESS QUEST DATABASE ───────────────────────────────────────────────

const LIFESTYLE_QUESTS = {

  study: [
    {name:'Deep Study Session',template:'Complete an uninterrupted {time:45m} deep study session. Phone off, distractions eliminated.',stat:'Intelligence',baseRP:35,baseStatGain:3,goals:['study_more']},
    {name:'Learn Something New',template:'Spend {time:30m} learning one new topic. Read, watch, or practice.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Flashcard Review',template:'Review or create {reps:30} flashcards for your current study material.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['study_more']},
    {name:'Practice Problem Set',template:'Solve {reps:10} practice problems from your study material.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Read Non-Fiction',template:'Read {reps:20} pages of a non-fiction or educational book.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Watch Educational Video',template:'Watch a {time:30m} educational video and take notes.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['study_more']},
    {name:'Summarize Learning',template:'Write a {reps:1} page summary of something you recently learned.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Pomodoro Study Block',template:'Complete 4 Pomodoro sessions (25m study / 5m break).',stat:'Intelligence',baseRP:35,baseStatGain:3,goals:['study_more']},
    {name:'Language Practice',template:'Practice a language or skill for {time:30m}.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Write Study Notes',template:'Write comprehensive notes on one topic for {time:30m}.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Teach What You Know',template:'Explain a concept you recently learned to someone else (or write it out).',stat:'Wisdom',baseRP:30,baseStatGain:3,goals:['study_more']},
    {name:'Online Course Module',template:'Complete one full module of an online course today.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Research Deep Dive',template:'Research one topic deeply for {time:60m}. Document findings.',stat:'Intelligence',baseRP:38,baseStatGain:3,goals:['study_more']},
    {name:'Read Article',template:'Read and annotate 3 articles on your field of study.',stat:'Intelligence',baseRP:22,baseStatGain:1,goals:['study_more']},
    {name:'Test Yourself',template:'Take a practice test or quiz on recent study material.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Mind Map',template:'Create a mind map of one complex topic from your studies.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Active Recall',template:'Close your notes and recall everything you know about one topic.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Spaced Repetition',template:'Complete a full spaced repetition review session today.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Study Group',template:'Organize or attend a study session with others.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Read a Full Chapter',template:'Read an entire chapter from an educational textbook.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Organize Study Space',template:'Organize your study space for optimal focus and productivity.',stat:'Discipline',baseRP:15,baseStatGain:1,goals:['study_more','discipline']},
    {name:'Early Morning Study',template:'Wake up {time:1m} earlier than usual and study first thing.',stat:'Discipline',baseRP:30,baseStatGain:2,goals:['study_more','discipline']},
    {name:'No Social Media Study Day',template:'Study for {time:60m} with absolutely no social media or notifications.',stat:'Discipline',baseRP:30,baseStatGain:2,goals:['study_more','discipline']},
    {name:'Finance Fundamentals',template:'Spend {time:30m} learning one personal finance concept: budgeting, investing, compounding, or taxes. Document one key takeaway.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Budget Review',template:'Review your monthly budget. Identify one area to cut spending and one area to increase savings.',stat:'Wisdom',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Investment Research',template:'Research one investment vehicle (stocks, ETFs, index funds, real estate) for {time:30m}. Write a one-paragraph summary.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Track Your Net Worth',template:'Calculate your current net worth (assets minus liabilities). Write it down and compare to last month.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Learn About Compounding',template:'Study how compound interest works for {time:20m}. Calculate how much you would have in 10 years if you saved a set amount monthly.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Explore Your Interest',template:'Spend {time:45m} deeply studying a topic you are genuinely curious about — no agenda, just growth.',stat:'Intelligence',baseRP:35,baseStatGain:3,goals:['study_more']},
    {name:'Read on a Passion Topic',template:'Read {reps:20} pages or watch {time:30m} of content on something you personally find fascinating.',stat:'Wisdom',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Book Chapter',template:'Read {reps:30} pages of a book that improves your mind.',stat:'Wisdom',baseRP:28,baseStatGain:2,goals:['study_more']},
  ],

  discipline: [
    {name:'Wake Up On Time',template:'Wake up at your assigned time without hitting snooze. The System does not accept weakness.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Complete Your To-Do List',template:'Write and complete your full to-do list for today.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Phone First Hour',template:'Do not use your phone for the first hour after waking.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Cold Shower',template:'End your shower with {time:2m} of cold water. No hesitation.',stat:'Discipline',baseRP:30,baseStatGain:3,goals:['discipline']},
    {name:'Digital Detox',template:'Spend {time:2m} with no screens after 9 PM.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Sleep on Time',template:'Be in bed at your designated sleep time without delay.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Track Your Day',template:'Journal every task and action you took today.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'5-Second Rule',template:'Do 3 tasks you have been procrastinating using the 5-second rule.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Junk Food',template:'Go the entire day without eating junk food.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Drink Enough Water',template:'Drink at least 2 liters of water today.',stat:'Durability',baseRP:15,baseStatGain:1,goals:['discipline']},
    {name:'Meal Prep',template:'Prepare your meals for the next day.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Morning Routine',template:'Complete your full morning routine without skipping steps.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Daily Review',template:'Spend {time:10m} reviewing what you accomplished today.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Weekly Plan',template:'Plan your entire next week in advance.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Inbox Zero',template:'Clear your email inbox to zero today.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Clean Your Space',template:'Clean and organize your living and working space.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline'],compound:true,level:'advanced'},
    {name:'Minimize Distractions',template:'Identify and eliminate 3 sources of distraction from your environment.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Limit Screen Time',template:'Stay under 1 hour of non-productive screen time today.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Gratitude Journal',template:'Write 5 things you are grateful for and 3 goals for tomorrow.',stat:'Wisdom',baseRP:15,baseStatGain:1,goals:['discipline','mental_health']},
    {name:'One Hard Task First',template:'Identify your hardest task and complete it first today.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['discipline']},
    {name:'Night Routine',template:'Complete your full night routine and prepare for tomorrow.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Budget Check',template:'Review your finances and track your spending for the day. Find one area to cut costs.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Emergency Fund Check',template:'Review your emergency fund status. If under 3 months expenses, research one step to grow it.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Expense Audit',template:'Review all your subscriptions and recurring expenses. Cancel or question at least one.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Complaints',template:'Go the entire day without complaining about anything.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline','mental_health']},
    {name:'Delayed Gratification',template:'Identify one thing you want immediately and delay it by at least 24 hours.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Commitment Kept',template:'Make one promise today and keep it — to yourself or someone else.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
  ],

  social: [
    {name:'Start a Conversation',template:'Initiate a conversation with someone new today.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Genuine Compliment',template:'Give 3 genuine compliments to different people today.',stat:'Charisma',baseRP:20,baseStatGain:2,goals:['be_social']},
    {name:'Call a Friend',template:'Call or video chat with a friend or family member today.',stat:'Charisma',baseRP:20,baseStatGain:1,goals:['be_social']},
    {name:'Social Event',template:'Attend a social event or gathering today.',stat:'Charisma',baseRP:30,baseStatGain:3,goals:['be_social']},
    {name:'Active Listening',template:'In your next conversation, listen more than you speak. Ask follow-up questions.',stat:'Charisma',baseRP:22,baseStatGain:2,goals:['be_social']},
    {name:'Reconnect',template:'Reach out to someone you have not spoken to in over a month.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Public Speaking',template:'Speak up in a meeting, class, or public setting today.',stat:'Charisma',baseRP:30,baseStatGain:3,goals:['be_social']},
    {name:'Eye Contact',template:'Maintain proper eye contact in all conversations today.',stat:'Charisma',baseRP:18,baseStatGain:1,goals:['be_social']},
    {name:'Help Someone',template:'Do something helpful for someone without being asked.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Introduction',template:'Introduce yourself to at least 2 new people today.',stat:'Charisma',baseRP:28,baseStatGain:3,goals:['be_social']},
    {name:'Confident Handshake',template:'Give a firm, confident handshake or greeting to someone today.',stat:'Charisma',baseRP:15,baseStatGain:1,goals:['be_social']},
    {name:'Plan a Social Event',template:'Organize a hangout, dinner, or activity with others.',stat:'Charisma',baseRP:30,baseStatGain:2,goals:['be_social']},
    {name:'Networking',template:'Connect with someone professionally on LinkedIn or in person.',stat:'Charisma',baseRP:28,baseStatGain:2,goals:['be_social']},
    {name:'Group Discussion',template:'Contribute meaningfully to a group discussion today.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Say Yes',template:'Say yes to a social invitation you would normally decline.',stat:'Charisma',baseRP:30,baseStatGain:3,goals:['be_social']},
    {name:'Thank Someone',template:'Write a meaningful thank-you message to someone who helped you.',stat:'Charisma',baseRP:18,baseStatGain:1,goals:['be_social']},
    {name:'Speak with Confidence',template:'Speak clearly and confidently in all interactions today.',stat:'Charisma',baseRP:20,baseStatGain:2,goals:['be_social']},
    {name:'Teach Someone',template:'Teach or explain something valuable to another person today.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Resolve a Conflict',template:'Address and resolve a disagreement or tension with someone.',stat:'Charisma',baseRP:35,baseStatGain:3,goals:['be_social']},
    {name:'Share Something Valuable',template:'Share a useful article, resource, or insight with someone in your network.',stat:'Charisma',baseRP:18,baseStatGain:1,goals:['be_social']},
  ],

  appearance: [
    {name:'Grooming Routine',template:'Complete a thorough grooming routine today — hair, skin, nails.',stat:'Appearance',baseRP:18,baseStatGain:2,goals:['appearance']},
    {name:'Skincare Routine',template:'Complete your morning and evening skincare routine.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Dress to Impress',template:'Dress better than the situation requires today.',stat:'Appearance',baseRP:20,baseStatGain:2,goals:['appearance']},
    {name:'Haircut',template:'Get a haircut or trim today.',stat:'Appearance',baseRP:22,baseStatGain:2,goals:['appearance']},
    {name:'Posture Check',template:'Maintain correct posture throughout the day. Check every hour.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'Outfit Planning',template:'Plan your outfits for the next 3 days.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Hygiene Max',template:'Complete full hygiene protocol — shower, teeth, skin, grooming.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'Laundry Day',template:'Wash, dry, and fold all your laundry.',stat:'Discipline',baseRP:15,baseStatGain:1,goals:['appearance','discipline']},
    {name:'Clean Your Shoes',template:'Clean and polish your shoes.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance'],compound:true,level:'advanced'},
    {name:'Upgrade Your Wardrobe',template:'Remove one old item from your wardrobe and replace or donate it.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'No Junk Food Appearance',template:'Eat clean all day — no processed food for your skin and body.',stat:'Appearance',baseRP:22,baseStatGain:2,goals:['appearance','lose_weight'],compound:true},
    {name:'Hydration for Skin',template:'Drink 3 liters of water today for skin health.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Sunscreen Application',template:'Apply sunscreen before going outside today.',stat:'Appearance',baseRP:12,baseStatGain:1,goals:['appearance']},
    {name:'Posture Correction',template:'Do {reps:3} sets of posture-corrective exercises.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'Mirror Practice',template:'Practice confident body language in the mirror for {time:5m}.',stat:'Charisma',baseRP:15,baseStatGain:1,goals:['appearance','be_social']},
  ],

  mental: [
    {name:'Meditation',template:'Complete a {time:10m} meditation session. Silence, breath, focus.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health']},
    {name:'Journaling',template:'Write in your journal for {time:15m}. Reflect on today.',stat:'Wisdom',baseRP:20,baseStatGain:2,goals:['mental_health']},
    {name:'Breathing Exercise',template:'Complete {reps:5} rounds of box breathing (4s in, 4s hold, 4s out, 4s hold).',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Nature Walk',template:'Go for a {time:20m} walk in nature — no phone, just observe.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health']},
    {name:'Visualization',template:'Spend {time:10m} visualizing your ideal future self in detail.',stat:'Wisdom',baseRP:20,baseStatGain:2,goals:['mental_health']},
    {name:'Stress Audit',template:'Identify your top 3 stressors and write one action for each.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Limit Negative Input',template:'Remove or unfollow one source of negative content from your life.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Gratitude Practice',template:'Write 10 things you are genuinely grateful for today.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Mindful Meal',template:'Eat one meal today in complete silence — no phone, no TV.',stat:'Wisdom',baseRP:15,baseStatGain:1,goals:['mental_health']},
    {name:'Sleep Hygiene',template:'Sleep at consistent time, no screens 30 min before bed.',stat:'Wisdom',baseRP:20,baseStatGain:1,goals:['mental_health']},
    {name:'Affirmations',template:'Speak or write 10 personal affirmations aloud today.',stat:'Charisma',baseRP:15,baseStatGain:1,goals:['mental_health']},
    {name:'Dopamine Detox',template:'Spend 2 hours without social media, games, or entertainment.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['mental_health','discipline']},
    {name:'Identify One Fear',template:'Write down one fear and one action you can take to face it.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Growth Mindset',template:'Write about a recent failure and what you learned from it.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Read Philosophy',template:'Read {reps:10} pages of philosophy, psychology, or self-development.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health','study_more']},
    {name:'Limit News',template:'Consume no news or doomscrolling today.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['mental_health','discipline']},
    {name:'Creative Expression',template:'Spend {time:20m} on any creative activity — draw, write, play music.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Unplug Hour',template:'Spend one hour completely off all devices — just be present.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health']},
    {name:'Process Your Emotions',template:'Spend {time:10m} identifying and writing about how you feel today.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Positive Social Media',template:'Unfollow 5 accounts that make you feel negative about yourself.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
  ],

  finance: [

    {name:'Track Spending',template:'Record every expense today. Know where your money goes.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Emergency Fund',template:'Transfer money to your emergency fund today. Even a small amount.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Cut One Subscription',template:'Cancel one unused subscription today. Audit your recurring charges.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Investment Research [H]',template:'Spend {time:30m} researching one investment option today.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Spend Day',template:'Spend absolutely zero money today except on essentials.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['discipline']},
    {name:'Financial Goal Set',template:'Write down one specific financial goal with a deadline today.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Debt Payment',template:'Make an extra payment on any debt today.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['discipline']},
    {name:'Income Research',template:'Research one way to increase your income today.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},

    {name:'Budget Review [Home]',template:'Review your monthly budget. Track every expense category and find one area to cut back on.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Learn to Invest',template:'Spend {time:30m} researching index funds, ETFs, or compound interest. Write down one insight.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Track Net Worth',template:'Calculate your total assets minus your total liabilities today. Write the number down.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Savings Goal',template:'Set or review one financial savings goal. Write the target amount and a deadline.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Expense Audit [Home]',template:'Review all recurring subscriptions and expenses. Cancel or question at least one unnecessary cost.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Compound Interest',template:'Use an online calculator to project how much a daily saving of even a small amount grows in 10, 20, and 30 years.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['study_more']},
    {name:'Emergency Fund Check [Home]',template:'Check the status of your emergency fund. Research one step to build it to 3-6 months of expenses.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'No Spend Day [H]',template:'Go the entire day without spending money on anything non-essential.',stat:'Discipline',baseRP:28,baseStatGain:3,goals:['discipline']},
    {name:'Learn About Taxes',template:'Spend {time:20m} reading about how income tax, deductions, or tax-advantaged accounts work in your country.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Financial Book',template:'Read {reps:20} pages of a personal finance book — The Psychology of Money, Rich Dad Poor Dad, or similar.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Income Review',template:'Review your income sources today. Write down at least one potential way to increase your income.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Debt Strategy',template:'If you have any debts, write out a clear payoff plan using either the avalanche or snowball method.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['discipline']},
  ],


  nutrition: [
    {name:'Hit Protein Target',template:'Eat your full daily protein target today. Track every gram. No excuses.',stat:'Stamina',baseRP:25,baseStatGain:2,goals:['build_muscle','lose_weight']},
    {name:'Meal Prep Sunday',template:'Prepare all your meals for the next 3 days. Cook in bulk, portion out.',stat:'Discipline',baseRP:30,baseStatGain:2,goals:['build_muscle','lose_weight','discipline']},
    {name:'Track Calories',template:'Log every single thing you eat today in a tracking app. Full accountability.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['lose_weight','build_muscle']},
    {name:'Creatine Protocol',template:'Take creatine consistently today. If you have not started, research and commit.',stat:'Stamina',baseRP:15,baseStatGain:1,goals:['build_muscle']},
    {name:'Hydration Goal',template:'Drink your full water target today — minimum 3 liters. Track it.',stat:'Stamina',baseRP:18,baseStatGain:1,goals:['build_muscle','lose_weight']},
    {name:'Post-Workout Nutrition',template:'Eat a complete post-workout meal within 1 hour of training. Protein + carbs.',stat:'Stamina',baseRP:20,baseStatGain:1,goals:['build_muscle']},
    {name:'Pre-Workout Meal',template:'Eat a proper pre-workout meal 90 minutes before training today.',stat:'Stamina',baseRP:18,baseStatGain:1,goals:['build_muscle']},
    {name:'No Junk Day',template:'Zero processed food today. Nothing from a packet. Cook every meal.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['lose_weight','discipline']},
    {name:'Vegetable Target',template:'Eat at least 5 servings of vegetables today. Prioritize micronutrients.',stat:'Stamina',baseRP:20,baseStatGain:2,goals:['lose_weight','build_muscle']},
    {name:'Sleep 8 Hours',template:'Be in bed by a consistent time tonight. Get a full 8 hours. Sleep is when you grow.',stat:'Stamina',baseRP:25,baseStatGain:2,goals:['build_muscle','discipline']},
    {name:'No Alcohol Week',template:'Commit to zero alcohol this week. Alcohol kills testosterone, sleep, and recovery.',stat:'Discipline',baseRP:30,baseStatGain:3,goals:['build_muscle','discipline']},
    {name:'Supplement Stack',template:'Take all your supplements consistently today: creatine, protein, vitamins.',stat:'Stamina',baseRP:15,baseStatGain:1,goals:['build_muscle']},
    {name:'Calorie Surplus Day',template:'Eat in a controlled calorie surplus today. Fuel the muscle growth.',stat:'Stamina',baseRP:18,baseStatGain:1,goals:['build_muscle']},
    {name:'Calorie Deficit Day',template:'Maintain a clean calorie deficit today. Track everything, stay consistent.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['lose_weight'],compound:true},
    {name:'Sleep Quality Audit',template:'Evaluate your sleep: dark room, cool temperature, no screens 1hr before bed.',stat:'Stamina',baseRP:20,baseStatGain:2,goals:['build_muscle','discipline']},
    {name:'Anti-Inflammatory Eating',template:'Eat anti-inflammatory foods today: berries, fish, leafy greens, olive oil.',stat:'Durability',baseRP:22,baseStatGain:2,goals:['build_muscle']},
    {name:'Recovery Nutrition',template:'Prioritize recovery foods today: tart cherry, magnesium-rich foods, turmeric.',stat:'Durability',baseRP:20,baseStatGain:2,goals:['build_muscle']},
    {name:'Intermittent Fasting',template:'Practice a 16:8 intermittent fast today. Eat only within your 8-hour window.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['lose_weight','discipline']},
    {name:'Protein Every Meal',template:'Include a complete protein source in every meal today — no exceptions.',stat:'Stamina',baseRP:22,baseStatGain:2,goals:['build_muscle']},
    {name:'Nutrition Week Plan',template:'Plan all your meals for the entire week. Know what you are eating before the week starts.',stat:'Discipline',baseRP:30,baseStatGain:2,goals:['build_muscle','lose_weight','discipline']},
  ],

  fitness_cardio: [
    {name:'30 Min Run',template:'Run continuously for {time:30m}. Maintain a pace you can sustain.',stat:'Stamina',baseRP:30,baseStatGain:2,goals:['lose_weight','discipline'],compound:true},
    {name:'5K Run',template:'Complete a 5km run today.',stat:'Stamina',baseRP:35,baseStatGain:3,goals:['lose_weight'],compound:true},
    {name:'Cycling Session',template:'Cycle for {time:30m} at moderate to high intensity.',stat:'Stamina',baseRP:28,baseStatGain:2,goals:['lose_weight']},
    {name:'Jump Rope Session (Home)',template:'Jump rope for {time:15m} with minimal breaks.',stat:'Speed',baseRP:28,baseStatGain:2,goals:['lose_weight']},
    {name:'Swimming',template:'Swim for {time:30m} continuously.',stat:'Stamina',baseRP:35,baseStatGain:3,goals:['lose_weight']},
    {name:'Stairmaster',template:'Complete {time:20m} on the stairmaster.',stat:'Stamina',baseRP:28,baseStatGain:2,goals:['lose_weight']},
    {name:'Morning Walk',template:'Walk for {time:30m} first thing in the morning.',stat:'Stamina',baseRP:18,baseStatGain:1,goals:['lose_weight']},
    {name:'10,000 Steps',template:'Complete 10,000 steps today.',stat:'Stamina',baseRP:22,baseStatGain:1,goals:['lose_weight']},
    {name:'HIIT Cardio',template:'Complete a {time:20m} HIIT cardio session.',stat:'Speed',baseRP:35,baseStatGain:3,goals:['lose_weight']},
    {name:'Elliptical',template:'Use the elliptical for {time:30m} at high resistance.',stat:'Stamina',baseRP:25,baseStatGain:2,goals:['lose_weight']},
    {name:'Sprint Intervals',template:'Perform {reps:10} sprint intervals of {time:30s} each with 90s rest.',stat:'Speed',baseRP:38,baseStatGain:3,goals:['lose_weight'],compound:true},
    {name:'Zone 2 Cardio [Home]',template:'Maintain zone 2 heart rate for {time:45m} walking or jogging.',stat:'Stamina',baseRP:30,baseStatGain:2,goals:['lose_weight']},
    {name:'Rowing Machine',template:'Row for {time:20m} at consistent pace.',stat:'Stamina',baseRP:30,baseStatGain:2,goals:['lose_weight']},
    {name:'Active Rest Day',template:'Take a recovery walk for {time:45m}. Light movement only.',stat:'Durability',baseRP:18,baseStatGain:1,goals:['lose_weight']},
    {name:'Stretching Session',template:'Complete a full-body stretching routine for {time:20m}.',stat:'Durability',baseRP:18,baseStatGain:1,goals:['lose_weight','mental_health']},
    {name:'Yoga Session',template:'Complete a {time:30m} yoga session.',stat:'Agility',baseRP:25,baseStatGain:2,goals:['mental_health','lose_weight']},
    {name:'Mobility Work',template:'Perform {time:20m} of focused mobility and flexibility work.',stat:'Agility',baseRP:20,baseStatGain:1,goals:['lose_weight'],level:'beginner'},
    {name:'Track Workout',template:'Complete a structured track workout: warm-up + intervals + cool-down.',stat:'Speed',baseRP:40,baseStatGain:3,goals:['lose_weight'],level:'beginner'},
    {name:'Hill Sprints',template:'Perform {reps:8} hill sprint repeats.',stat:'Speed',baseRP:40,baseStatGain:3,goals:['lose_weight'],compound:true},
    {name:'Long Walk',template:'Walk {reps:8} kilometers at a brisk pace.',stat:'Stamina',baseRP:25,baseStatGain:2,goals:['lose_weight']},
  ],
};

// ─── WEEKLY QUEST HISTORY (prevent same-week repeats) ────────────────────────
function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  return `${now.getFullYear()}-W${week}`;
}

function getUsedQuestsThisWeek() {
  const key = 'usedQuests_' + getWeekKey();
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function markQuestsUsed(questNames) {
  const key = 'usedQuests_' + getWeekKey();
  const existing = getUsedQuestsThisWeek();
  const updated = [...new Set([...existing, ...questNames])];
  localStorage.setItem(key, JSON.stringify(updated));
}

// ─── QUEST PICKER ENGINE ──────────────────────────────────────────────────────

function getAvailableEquipmentTypes(workoutEnv) {
  switch(workoutEnv) {
    case 'gym': return ['gym','calisthenics','home'];
    case 'calisthenics': return ['calisthenics','home'];
    case 'home': return ['home','home','home','calisthenics']; // mostly home, occasional calisthenics
    default: return ['home'];
  }
}

function pickQuestsForMuscle(muscle, fitnessLevel, rankName, workoutEnv, count, usedNames) {
  const equipTypes = getAvailableEquipmentTypes(workoutEnv);
  const pool = [];

  equipTypes.forEach(eq => {
    const db = QUEST_DB[muscle]?.[eq] || [];
    db.forEach(q => {
      if (!usedNames.includes(q.name)) pool.push({...q, equipType: eq});
    });
  });

  // ── Difficulty scaling by rank ──
  const rankLevelMap = {
    'E-Rank':'beginner','D-Rank':'beginner',
    'C-Rank':'intermediate','B-Rank':'intermediate',
    'A-Rank':'advanced','S-Rank':'advanced',
    'SS-Rank':'advanced','SSS-Rank':'advanced','X-Rank':'advanced','Z-Rank':'advanced'
  };
  const hunterLevel = rankLevelMap[rankName] || fitnessLevel || 'intermediate';
  if (pool.length > 0) {
    let levelFiltered = pool;
    if (hunterLevel === 'beginner') {
      levelFiltered = pool.filter(q => q.level !== 'advanced');
    } else if (hunterLevel === 'advanced') {
      levelFiltered = pool.filter(q => q.level !== 'beginner');
    }
    if (levelFiltered.length >= count) pool = levelFiltered;
  }

  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // If more than 1 quest requested, cap heavy AND high-volume quests to 1 each per muscle per day
  // to prevent stacking multiple CNS-intensive sessions (e.g. 5x5 + PR day + cluster on same day)
  if (count > 1) {
    let heavyCount = 0;
    const filtered = [];
    for (const q of pool) {
      if (q.intensity === 'heavy') {
        if (heavyCount === 0) { filtered.push(q); heavyCount++; }
      } else if (q.volume === 'high') {
        // Allow max 1 high-volume quest per muscle per day
        const existingHighVol = filtered.filter(x => x.volume === 'high').length;
        if (existingHighVol === 0) filtered.push(q);
      } else {
        filtered.push(q);
      }
      if (filtered.length >= count) break;
    }
    return filtered.slice(0, count).map((q, idx) => formatQuest(q, fitnessLevel, rankName, muscle, idx));
  }

  return pool.slice(0, count).map((q, idx) => formatQuest(q, fitnessLevel, rankName, muscle, idx));
}

function pickLifestyleQuests(goals, fitnessLevel, rankName, count, usedNames) {
  const allPools = [];

  // Determine which lifestyle categories are relevant
  const categoryWeights = {
    discipline: goals.includes('discipline') ? 3 : 1,
    mental: goals.includes('mental_health') ? 3 : 1,
    social: goals.includes('be_social') ? 3 : 1,
    appearance: goals.includes('appearance') ? 3 : 1,
    study: goals.includes('study_more') ? 3 : 1,
    finance: 2, // always included — finance knowledge is universal
    fitness_cardio: (goals.includes('lose_weight') || goals.includes('build_muscle')) ? 2 : 1,
  };

  Object.entries(categoryWeights).forEach(([cat, weight]) => {
    const catPool = LIFESTYLE_QUESTS[cat] || [];
    catPool.forEach(q => {
      if (!usedNames.includes(q.name)) {
        for (let w = 0; w < weight; w++) allPools.push({...q, category: cat});
      }
    });
  });

  // Shuffle
  for (let i = allPools.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPools[i], allPools[j]] = [allPools[j], allPools[i]];
  }

  // Dedupe by name
  const seen = new Set();
  const deduped = allPools.filter(q => {
    if (seen.has(q.name)) return false;
    seen.add(q.name);
    return true;
  });

  return deduped.slice(0, count).map((q, idx) => formatLifestyleQuest(q, fitnessLevel, rankName, idx + 100));
}

function formatQuest(q, fitnessLevel, rankName, muscle, idx) {
  const desc = scaleQuest(q.template, fitnessLevel, rankName);
  const rankMultiplier = getRankRPMultiplier(rankName);
  return {
    id: `q_${muscle}_${idx}_${Date.now()}`,
    type: 'daily',
    name: q.name,
    description: desc,
    stat: q.stat,
    rp: Math.round(q.baseRP * rankMultiplier),
    statGain: q.baseStatGain,
    completed: false,
    muscle: muscle,
    compound: q.compound || false,
    intensity: q.intensity || null,
    volume: q.volume || null,
    level: q.level || 'intermediate',
  };
}

function formatLifestyleQuest(q, fitnessLevel, rankName, idx) {
  const desc = scaleQuest(q.template, fitnessLevel, rankName);
  const rankMultiplier = getRankRPMultiplier(rankName);
  return {
    id: `ql_${idx}_${Date.now()}`,
    type: 'daily',
    name: q.name,
    description: desc,
    stat: q.stat,
    rp: Math.round(q.baseRP * rankMultiplier),
    statGain: q.baseStatGain,
    completed: false,
    muscle: 'lifestyle',
  };
}

function getRankRPMultiplier(rankName) {
  const multipliers = {
    'E-Rank': 1.0, 'D-Rank': 1.2, 'C-Rank': 1.5,
    'B-Rank': 2.0, 'A-Rank': 2.5, 'S-Rank': 3.0,
    'SS-Rank': 3.5, 'SSS-Rank': 4.0, 'X-Rank': 5.0, 'Z-Rank': 6.0
  };
  return multipliers[rankName] || 1.0;
}

// ─── SPLIT LOGIC ──────────────────────────────────────────────────────────────
// Given the split type, day of week, and custom assignments — determine todays muscle groups

const SPLIT_SCHEDULES = {
  ppl: {
    // 6 training days + 1 cardio + 1 mobility per 8-day cycle
    days: 8,
    schedule: [
      ['chest','lateral_delts','triceps','serratus','rotator_cuff'],   // Push A
      ['back','biceps','forearms','rear_delts','traps'],               // Pull A
      ['quads','hamstrings','glutes','calves','hip_flexors','adductors'], // Legs A
      ['chest','lateral_delts','triceps','serratus','rotator_cuff'],   // Push B
      ['back','biceps','forearms','rear_delts','traps'],               // Pull B
      ['quads','hamstrings','glutes','calves','hip_flexors','adductors'], // Legs B
      ['cardio'],                                                       // Cardio day
      ['mobility'],                                                     // Mobility day
    ],
    restDays: [],
  },
  brosplit: {
    // 6 training days + 1 cardio + 1 mobility per 8-day cycle
    days: 8,
    schedule: [
      ['chest','serratus','rotator_cuff'],
      ['back','rear_delts','traps'],
      ['shoulders','lateral_delts','rear_delts','neck'],
      ['biceps','triceps','forearms'],
      ['quads','hamstrings','glutes','calves'],
      ['core','obliques','hip_flexors','adductors','tibialis'],
      ['cardio'],
      ['mobility'],
    ],
    restDays: [],
  },
  upperlower: {
    // 4 training days + 1 cardio + 1 mobility per 6-day cycle
    days: 6,
    schedule: [
      ['chest','back','shoulders','lateral_delts','rear_delts','serratus'],
      ['quads','hamstrings','glutes','calves','hip_flexors','adductors'],
      ['chest','back','shoulders','biceps','triceps','rotator_cuff','traps'],
      ['quads','hamstrings','glutes','calves','obliques','core','tibialis'],
      ['cardio'],
      ['mobility'],
    ],
    restDays: [],
  },
  fullbody: {
    // 3 training days + 1 cardio + 1 mobility per 5-day cycle
    days: 5,
    schedule: [
      ['fullbody','core','serratus'],
      ['fullbody','obliques','hip_flexors'],
      ['fullbody','rotator_cuff','tibialis'],
      ['cardio'],
      ['mobility'],
    ],
    restDays: [],
  },
};

function getMusclesForToday(hunter) {
  const split = hunter.workoutSplit || 'ppl';
  const customSchedule = hunter.customSchedule;
  const daysPerWeek = parseInt(hunter.daysPerWeek) || 5;

  // If custom schedule is set, use it
  if (customSchedule) {
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const todayName = dayNames[new Date().getDay()];
    const muscles = customSchedule[todayName];
    return (muscles && muscles.length > 0) ? muscles : null;
  }

  // Use split schedule
  const schedule = SPLIT_SCHEDULES[split];
  if (!schedule) return ['fullbody'];

  // Determine which day in the cycle we are
  const startDate = hunter.startDate ? new Date(hunter.startDate) : new Date();
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const cycleDay = daysSinceStart % (schedule.days + (7 - daysPerWeek));

  if (cycleDay >= schedule.days) return null; // rest day

  return schedule.schedule[cycleDay % schedule.schedule.length];
}

// ─── MAIN DAILY QUEST GENERATOR ──────────────────────────────────────────────

function generateQuestsLocally(hunter, rankName) {
  const usedNames = getUsedQuestsThisWeek();
  const fitnessLevel = hunter.fitness || 'intermediate';
  const workoutEnv = hunter.workoutEnv || 'home';
  const goals = hunter.goals || [];

  // ── Deload auto-detection: every 5 weeks ──
  const startDate = hunter.startDate ? new Date(hunter.startDate) : new Date();
  const weeksSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const isDeloadWeek = weeksSinceStart > 0 && weeksSinceStart % 5 === 0;

  // ── Rest day enforcement: day 7 of each week is always rest ──
  const dayOfWeek = new Date().getDay(); // 0=Sun, 6=Sat
  const daysPerWeek = parseInt(hunter.daysPerWeek) || 6;
  const forcedRestDay = daysPerWeek >= 6 && dayOfWeek === 0; // Sunday always rest if training 6+ days

  let todayMuscles = getMusclesForToday(hunter);
  const isRestDay = todayMuscles === null || forcedRestDay;
  if (forcedRestDay) todayMuscles = null;

  // Get quest count from state, default to 8
  const questCount = (typeof STATE !== 'undefined' && STATE.questCount) ? STATE.questCount : 8;

  const quests = [];

  if (isDeloadWeek && !isRestDay) {
    // DELOAD WEEK: light versions of todays muscles
    const deloadPool = (DELOAD_QUESTS[workoutEnv] || DELOAD_QUESTS.gym).slice();
    for (let i = deloadPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deloadPool[i], deloadPool[j]] = [deloadPool[j], deloadPool[i]];
    }
    const deloadCount = Math.min(5, deloadPool.length);
    const deloadSelected = deloadPool.slice(0, deloadCount).map(q => ({
      ...q, id: `dl_${Date.now()}`, type: 'daily',
      description: q.template || q.description || '',
      rp: q.baseRP || 20, statGain: q.baseStatGain || 1,
      muscle: 'fullbody',
    }));
    const lifeQ = pickLifestyleQuests(goals, fitnessLevel, rankName, 3, usedNames.concat(deloadSelected.map(q=>q.name)));
    quests.push(...deloadSelected, ...lifeQ);
  } else if (isRestDay) {
    // Rest day: light core + lifestyle
    const lightQuests = pickQuestsForMuscle('core', fitnessLevel, rankName, workoutEnv, 1, usedNames);
    const stretchQuests = pickLifestyleQuests(['mental_health','discipline'], fitnessLevel, rankName, 2, usedNames);
    const lifestyleQuests = pickLifestyleQuests(goals, fitnessLevel, rankName, 5, [...usedNames, ...lightQuests.map(q=>q.name), ...stretchQuests.map(q=>q.name)]);
    quests.push(...lightQuests, ...stretchQuests, ...lifestyleQuests);
  } else {
    // Workout day: allocate questCount between fitness and lifestyle
    const lifestyleCount = Math.max(1, Math.floor(questCount / 3));
    const fitnessTarget = questCount - lifestyleCount;
    const muscleCount = todayMuscles.length;
    const fitnessQuestsPerMuscle = Math.max(1, Math.floor(fitnessTarget / muscleCount));

    todayMuscles.forEach(muscle => {
      const mQuests = pickQuestsForMuscle(muscle, fitnessLevel, rankName, workoutEnv, fitnessQuestsPerMuscle, usedNames);
      quests.push(...mQuests);
      mQuests.forEach(q => usedNames.push(q.name));
    });

    // Fill to target fitness quests if needed
    while (quests.length < fitnessTarget) {
      const extra = pickQuestsForMuscle(todayMuscles[quests.length % todayMuscles.length] || todayMuscles[0], fitnessLevel, rankName, workoutEnv, 1, usedNames.concat(quests.map(q=>q.name)));
      if (!extra.length) break;
      quests.push(...extra);
    }

    // Add lifestyle quests
    const lifeQuests = pickLifestyleQuests(goals, fitnessLevel, rankName, lifestyleCount, usedNames.concat(quests.map(q=>q.name)));
    quests.push(...lifeQuests);
  }

  // Cap to questCount daily quests
  const ts = Date.now();
  const dailyQuests = quests.slice(0, questCount).map((q, i) => ({...q, id: `d${i}_${ts + i}`, type: 'daily'}));

  // Primary muscle for todays special/challenge quests
  // Rotate through all todays muscles by day so no single muscle always gets the bonus quests
  const dayNum0 = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const primaryMuscle = (todayMuscles && todayMuscles.length > 0)
    ? todayMuscles[dayNum0 % todayMuscles.length]
    : 'fullbody';

  // 1 special quest (harder) — always from todays primary muscle
  const specialPool = pickQuestsForMuscle(
    primaryMuscle,
    fitnessLevel, rankName, workoutEnv, 3,
    usedNames.concat(dailyQuests.map(q=>q.name))
  );
  if (specialPool.length > 0) {
    const special = {...specialPool[0]};
    special.id = `s0_${ts + 100}`;
    special.type = 'special';
    special.rp = Math.round(special.rp * 2.5);
    special.statGain = Math.max(3, special.statGain * 2);
    special.name = 'SPECIAL: ' + special.name;
    dailyQuests.push(special);
  }

  // 2 bonus quests — lifestyle only
  const bonusPool = pickLifestyleQuests(
    goals, fitnessLevel, rankName, 4,
    usedNames.concat(dailyQuests.map(q=>q.name))
  );
  bonusPool.slice(0, 2).forEach((q, i) => {
    dailyQuests.push({
      ...q,
      id: `b${i}_${ts + 200 + i}`,
      type: 'bonus',
      rp: Math.round(q.rp * 1.5),
      statGain: Math.max(2, q.statGain + 1),
      name: 'BONUS: ' + q.name,
    });
  });

  // Challenge quest every other day — from todays primary muscle
  if (dayNum0 % 2 === 0) {
    const challengePool = pickQuestsForMuscle(
      primaryMuscle,
      'advanced', rankName, workoutEnv, 1,
      usedNames.concat(dailyQuests.map(q=>q.name))
    );
    if (challengePool.length > 0) {
      const challenge = {...challengePool[0]};
      challenge.id = `c0_${ts + 300}`;
      challenge.type = 'challenging';
      challenge.rp = Math.round(challenge.rp * 4);
      challenge.statGain = Math.max(8, challenge.statGain * 4);
      challenge.name = 'CHALLENGE: ' + challenge.name;
      dailyQuests.push(challenge);
    }
  }

  // ── Warmup Quest (always first) ──
  const warmupTemplates = {
    push: { name:'PRE-SESSION WARMUP', description:'5 min dynamic warmup: arm circles (×20), band pull-aparts (×20), light push-up (×10), wrist rotations. DO THIS BEFORE LIFTING.', stat:'Durability', rp:10, statGain:0 },
    pull: { name:'PRE-SESSION WARMUP', description:'5 min dynamic warmup: dead hang (30s), arm swings (×20), band pull-apart (×20), shoulder CARs (×5 each). DO THIS BEFORE LIFTING.', stat:'Durability', rp:10, statGain:0 },
    legs: { name:'PRE-SESSION WARMUP', description:'5 min dynamic warmup: leg swings (×20), hip circles (×10), bodyweight squat (×15), ankle circles (×10). DO THIS BEFORE LIFTING.', stat:'Durability', rp:10, statGain:0 },
    cardio: { name:'CARDIO DAY WARMUP', description:'5 min easy warm-up: light jog or cycle, dynamic leg swings, ankle circles. Start easy for 5 minutes before pushing the pace.', stat:'Stamina', rp:10, statGain:0 },
    mobility: { name:'MOBILITY DAY PREP', description:'Take 3 deep breaths. Today is recovery and flexibility work. Focus on areas that felt tight this week.', stat:'Agility', rp:10, statGain:0 },
    default: { name:'PRE-SESSION WARMUP', description:'5 min dynamic warmup: light cardio, joint rotations, and 2 warm-up sets of your first exercise at 50% weight. Non-negotiable.', stat:'Durability', rp:10, statGain:0 },
  };

  const cooldownTemplates = [
    { name:'POST-SESSION COOLDOWN', description:'10 min cooldown: stretch every muscle you trained today. Hold each stretch 30s. Log how you feel in the Progress tab.', stat:'Durability', rp:15, statGain:1 },
    { name:'POST-SESSION MOBILITY', description:'10 min mobility work on muscles trained today. Focus on tight spots. Deep breathing, no rushing.', stat:'Agility', rp:15, statGain:1 },
    { name:'POST-SESSION RECOVERY', description:'Foam roll and static stretch all trained muscles for 10 minutes. Drink water. Eat within 1 hour.', stat:'Durability', rp:15, statGain:1 },
  ];

  const dayMuscleStr = (todayMuscles || []).join(',');
  const warmupKey = dayMuscleStr === 'cardio' ? 'cardio'
    : dayMuscleStr === 'mobility' ? 'mobility'
    : dayMuscleStr.includes('chest') || dayMuscleStr.includes('shoulder') || dayMuscleStr.includes('tricep') ? 'push'
    : dayMuscleStr.includes('back') || dayMuscleStr.includes('bicep') || dayMuscleStr.includes('trap') ? 'pull'
    : dayMuscleStr.includes('quad') || dayMuscleStr.includes('hamstring') || dayMuscleStr.includes('glute') ? 'legs'
    : 'default';

  const warmup = warmupTemplates[warmupKey];
  const cooldownTemplate = cooldownTemplates[Math.floor(Math.random() * cooldownTemplates.length)];
  const ts2 = Date.now();

  const warmupQuest = {
    id: `warmup_${ts2}`, type: 'warmup', name: warmup.name,
    description: warmup.description, stat: warmup.stat,
    rp: warmup.rp, statGain: warmup.statGain, completed: false, muscle: 'warmup',
  };
  const cooldownQuest = {
    id: `cooldown_${ts2}`, type: 'cooldown', name: cooldownTemplate.name,
    description: cooldownTemplate.description, stat: cooldownTemplate.stat,
    rp: cooldownTemplate.rp, statGain: cooldownTemplate.statGain, completed: false, muscle: 'cooldown',
  };

  if (!isRestDay) {
    dailyQuests.unshift(warmupQuest); // warmup always first
    dailyQuests.push(cooldownQuest);  // cooldown always last
  }

  // ── Sort: compound quests before isolations (within daily type only) ──
  const compoundFirst = dailyQuests.filter(q => q.type === 'daily' && q.compound);
  const isolationRest = dailyQuests.filter(q => q.type === 'daily' && !q.compound);
  const nonDaily = dailyQuests.filter(q => q.type !== 'daily');
  const warmupQ = nonDaily.filter(q => q.type === 'warmup');
  const cooldownQ = nonDaily.filter(q => q.type === 'cooldown');
  const otherQ = nonDaily.filter(q => q.type !== 'warmup' && q.type !== 'cooldown');
  const sortedQuests = [...warmupQ, ...compoundFirst, ...isolationRest, ...otherQ, ...cooldownQ];

  // Mark all used
  markQuestsUsed(sortedQuests.map(q => q.name));

  return sortedQuests;
}
