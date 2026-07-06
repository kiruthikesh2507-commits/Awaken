/* ═══════════════════════════════════════════════════════════════════════
   AWAKEN SYSTEM — STRUCTURED PROGRAM ENGINE  (v3.0)
   Replaces random daily quest draws with a real, periodized training
   program: warmup -> primary compound -> secondary compound -> accessory
   -> isolation/weak-point -> cooldown, with progressive overload tracked
   per exercise and safe exercise ordering / volume control built in.
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────────────────────────────
   1. EXERCISE DATABASE
   Each exercise is tagged with everything the planner needs to make safe,
   structured, progressive decisions:
     muscle    : primary muscle group bucket (matches old QUEST_DB keys
                 plus new explicit ones: rear_delts, traps, rotator_cuff,
                 serratus, obliques, neck)
     role      : 'compound' | 'accessory' | 'isolation'
     pattern   : movement pattern, used for safe ordering & spinal-load
                 stacking rules -> 'hinge' | 'squat' | 'horizontal_push' |
                 'vertical_push' | 'horizontal_pull' | 'vertical_pull' |
                 'carry' | 'core' | 'isolation_small'
     spinalLoad: true if it meaningfully loads the spine axially (heavy
                 deadlifts, squats, heavy rows) -> never schedule two of
                 these back-to-back without something else between them
     equip     : 'gym' | 'calisthenics' | 'home'
     loadable  : true if a real external weight is typically used (so we
                 ask for weight logging); false for holds/bodyweight reps
     baseSets / repRange / baseRP / baseStatGain / stat : as before
   ─────────────────────────────────────────────────────────────────────── */

const EX_DB = {

  // ═══ CHEST ═══
  chest: {
    gym: [
      { name:'Barbell Bench Press', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:true, stat:'Strength', baseSets:4, repRange:[5,8], baseRP:35, baseStatGain:3, cue:'At lockout fully protract your scapula — this hits serratus anterior. Keep your neck neutral throughout; never crane toward the bar.' },
      { name:'Incline Dumbbell Press', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[8,10], baseRP:30, baseStatGain:2, cue:'At the top punch the dumbbells up slightly to fully protract the scapula — activates serratus anterior. Upper chest and shoulder stabilisers work together here.' },
      { name:'Weighted Chest Dip', role:'accessory', pattern:'horizontal_push', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[8,12], baseRP:28, baseStatGain:2 },
      { name:'Cable Crossover', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:22, baseStatGain:1 },
      { name:'Pec Deck Machine', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
      { name:'Incline Cable Fly', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:22, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Weighted/Standard Dips', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:true, stat:'Strength', baseSets:4, repRange:[6,10], baseRP:30, baseStatGain:2 },
      { name:'Push-Ups', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,20], baseRP:20, baseStatGain:1 },
      { name:'Archer Push-Ups', role:'accessory', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[6,10], baseRP:28, baseStatGain:2 },
      { name:'Pseudo Planche Push-Ups', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[6,10], baseRP:30, baseStatGain:2 },
    ],
    home: [
      { name:'Push-Ups', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,20], baseRP:18, baseStatGain:1 },
      { name:'Decline Push-Ups (feet elevated)', role:'accessory', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[8,15], baseRP:18, baseStatGain:1 },
      { name:'Wide Push-Ups', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,18], baseRP:15, baseStatGain:1 },
    ],
  },

  // ═══ BACK (lats/mid-back thickness) ═══
  back: {
    gym: [
      { name:'Barbell Deadlift', role:'compound', pattern:'hinge', spinalLoad:true, loadable:true, stat:'Strength', baseSets:3, repRange:[4,6], baseRP:50, baseStatGain:4, cue:'Brace your entire core 360° before the pull — obliques fire to protect the spine. Keep your neck neutral (eyes forward). Upper traps, neck stabilisers, and entire posterior chain work isometrically to hold position through the pull.' },
      { name:'Barbell Bent-Over Row', role:'compound', pattern:'horizontal_pull', spinalLoad:true, loadable:true, stat:'Strength', baseSets:4, repRange:[6,10], baseRP:35, baseStatGain:3, cue:'At the top squeeze shoulder blades and hold 1 second — this fully engages rear delts and rotator cuff. Keep the neck packed and neutral throughout; never jerk the head up.' },
      { name:'Lat Pulldown', role:'compound', pattern:'vertical_pull', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[8,12], baseRP:28, baseStatGain:2 },
      { name:'Seated Cable Row', role:'accessory', pattern:'horizontal_pull', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:26, baseStatGain:2 },
      { name:'Chest-Supported Dumbbell Row', role:'accessory', pattern:'horizontal_pull', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:26, baseStatGain:2 },
      { name:'Straight-Arm Pulldown', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Pull-Ups', role:'compound', pattern:'vertical_pull', spinalLoad:false, loadable:false, stat:'Strength', baseSets:4, repRange:[5,10], baseRP:32, baseStatGain:3 },
      { name:'Inverted Rows', role:'compound', pattern:'horizontal_pull', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[8,15], baseRP:25, baseStatGain:2 },
      { name:'Chin-Ups', role:'accessory', pattern:'vertical_pull', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[6,10], baseRP:28, baseStatGain:2 },
      { name:'Scapular Pull-Ups', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[10,15], baseRP:15, baseStatGain:1 },
    ],
    home: [
      { name:'Door-Frame / Table Rows', role:'compound', pattern:'horizontal_pull', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:20, baseStatGain:1 },
      { name:'Towel Rows (over door)', role:'accessory', pattern:'horizontal_pull', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:18, baseStatGain:1 },
      { name:'Superman Hold', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
  },

  // ═══ TRAPS (explicit, was missing) ═══
  traps: {
    gym: [
      { name:'Barbell Shrugs', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1, cue:'Shrug straight up — no rolling. Hold the top for 2 seconds. Upper traps and the muscles that brace the neck (levator scapulae, splenius capitis) all contract isometrically. Keep your head still and upright.' },
      { name:'Dumbbell Farmer Shrugs', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:18, baseStatGain:1 },
      { name:'Cable Upright Row (trap focus)', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:22, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Bar Hang Scap Shrugs', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[10,15], baseRP:16, baseStatGain:1 },
      { name:'Pike Push-Up Shrug', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
    home: [
      { name:'Backpack Shrugs', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,20], baseRP:12, baseStatGain:1 },
      { name:'Resistance Band Shrugs', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,20], baseRP:12, baseStatGain:1 },
    ],
  },

  // ═══ REAR DELTS (explicit, was missing) ═══
  rear_delts: {
    gym: [
      { name:'Face Pull', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:3, repRange:[15,20], baseRP:20, baseStatGain:1, cue:'Pull to face height, externally rotate at the end position and hold 2 seconds. Best exercise for rotator cuff health and rear delt development — counteracts all the internal rotation from pressing. Never skip this.' },
      { name:'Rear Delt Fly (cable or dumbbell)', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:3, repRange:[15,20], baseRP:18, baseStatGain:1 },
      { name:'Bent-Over Reverse Fly', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:3, repRange:[15,20], baseRP:18, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Band Face Pull', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[15,20], baseRP:16, baseStatGain:1 },
      { name:'Band Pull-Apart', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[15,25], baseRP:14, baseStatGain:1 },
    ],
    home: [
      { name:'Band Pull-Apart', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[15,25], baseRP:14, baseStatGain:1 },
      { name:'Reverse Snow Angels (floor)', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[12,15], baseRP:12, baseStatGain:1 },
    ],
  },

  // ═══ ROTATOR CUFF (explicit, was missing — joint health) ═══
  rotator_cuff: {
    gym: [
      { name:'Cable External Rotation', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:14, baseStatGain:1 },
      { name:'Dumbbell Internal/External Rotation', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Band External Rotation', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:12, baseStatGain:1 },
      { name:'Band Internal Rotation', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:12, baseStatGain:1 },
    ],
    home: [
      { name:'Band External Rotation', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:12, baseStatGain:1 },
      { name:'Doorframe Internal Rotation', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:10, baseStatGain:1 },
    ],
  },

  // ═══ SHOULDERS (front/side delts) ═══
  shoulders: {
    gym: [
      { name:'Barbell Overhead Press', role:'compound', pattern:'vertical_push', spinalLoad:false, loadable:true, stat:'Strength', baseSets:4, repRange:[6,8], baseRP:32, baseStatGain:3, cue:'Keep your neck packed (chin slightly tucked) — upper traps and deep neck flexors brace isometrically under load. At lockout shrug the bar toward the ceiling to fully activate lower traps and serratus anterior.' },
      { name:'Dumbbell Lateral Raise', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
      { name:'Cable Lateral Raise', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Pike Push-Ups', role:'compound', pattern:'vertical_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[8,12], baseRP:24, baseStatGain:2 },
      { name:'Wall Handstand Hold', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[1,1], baseRP:26, baseStatGain:2 }, // time-based, handled separately
    ],
    home: [
      { name:'Pike Push-Ups', role:'compound', pattern:'vertical_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[8,12], baseRP:18, baseStatGain:1 },
      { name:'Water-Jug Lateral Raise', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
  },

  // ═══ SERRATUS ANTERIOR (explicit, was missing) ═══
  serratus: {
    gym: [
      { name:'Landmine Press (scapular protraction focus)', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:20, baseStatGain:1 },
      { name:'Cable Serratus Punch', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:16, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Push-Up Plus', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:18, baseStatGain:1 },
      { name:'Scapular Push-Ups', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
    home: [
      { name:'Push-Up Plus', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
      { name:'Scapular Push-Ups', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[12,15], baseRP:12, baseStatGain:1 },
    ],
  },

  // ═══ BICEPS ═══
  biceps: {
    gym: [
      { name:'Barbell Curl', role:'compound', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[8,10], baseRP:24, baseStatGain:2 },
      { name:'Incline Dumbbell Curl', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:22, baseStatGain:1 },
      { name:'Hammer Curl', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:20, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Chin-Ups (supinated, bicep focus)', role:'compound', pattern:'vertical_pull', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[6,10], baseRP:26, baseStatGain:2 },
      { name:'Ring/Bar Curl', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:20, baseStatGain:1 },
    ],
    home: [
      { name:'Backpack Curl', role:'compound', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
      { name:'Band Curl', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
  },

  // ═══ TRICEPS ═══
  triceps: {
    gym: [
      { name:'Close-Grip Bench Press', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:true, stat:'Strength', baseSets:4, repRange:[6,10], baseRP:30, baseStatGain:2 },
      { name:'Skull Crushers', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:25, baseStatGain:2 },
      { name:'Tricep Rope Pushdown', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Dips (tricep-focused, upright torso)', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[8,12], baseRP:26, baseStatGain:2 },
      { name:'Diamond Push-Ups', role:'accessory', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:20, baseStatGain:1 },
    ],
    home: [
      { name:'Chair Dips', role:'compound', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:16, baseStatGain:1 },
      { name:'Diamond Push-Ups', role:'accessory', pattern:'horizontal_push', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:16, baseStatGain:1 },
    ],
  },

  // ═══ QUADS ═══
  quads: {
    gym: [
      { name:'Barbell Back Squat', role:'compound', pattern:'squat', spinalLoad:true, loadable:true, stat:'Strength', baseSets:4, repRange:[5,8], baseRP:42, baseStatGain:4, cue:'Big breath and brace your obliques hard before descending — they protect the spine under load. Drive knees out over toes to engage hip flexors and tibialis anterior. Keep your neck neutral; eyes forward or slightly up.' },
      { name:'Leg Press', role:'compound', pattern:'squat', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:28, baseStatGain:2 },
      { name:'Bulgarian Split Squat', role:'accessory', pattern:'squat', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[8,10], baseRP:30, baseStatGain:2 },
      { name:'Leg Extension', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Pistol Squat Progression', role:'compound', pattern:'squat', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[5,8], baseRP:30, baseStatGain:2 },
      { name:'Bodyweight Squat', role:'compound', pattern:'squat', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,25], baseRP:16, baseStatGain:1 },
      { name:'Bulgarian Split Squat (bodyweight)', role:'accessory', pattern:'squat', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:20, baseStatGain:1 },
      { name:'Wall Sit', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[1,1], baseRP:18, baseStatGain:1 },
    ],
    home: [
      { name:'Bodyweight Squat', role:'compound', pattern:'squat', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,25], baseRP:14, baseStatGain:1 },
      { name:'Split Squat', role:'accessory', pattern:'squat', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[10,15], baseRP:16, baseStatGain:1 },
      { name:'Wall Sit', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[1,1], baseRP:14, baseStatGain:1 },
    ],
  },

  // ═══ HAMSTRINGS ═══
  hamstrings: {
    gym: [
      { name:'Romanian Deadlift', role:'compound', pattern:'hinge', spinalLoad:true, loadable:true, stat:'Strength', baseSets:4, repRange:[8,10], baseRP:34, baseStatGain:3 },
      { name:'Lying Leg Curl', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[10,12], baseRP:24, baseStatGain:2 },
      { name:'Nordic Curl', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:2, repRange:[4,6], baseRP:30, baseStatGain:2 },
    ],
    calisthenics: [
      { name:'Single-Leg RDL (bodyweight)', role:'compound', pattern:'hinge', spinalLoad:false, loadable:false, stat:'Agility', baseSets:3, repRange:[8,12], baseRP:22, baseStatGain:1 },
      { name:'Nordic Curl Negative', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:2, repRange:[5,8], baseRP:26, baseStatGain:2 },
      { name:'Glute-Ham Bridge', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,20], baseRP:14, baseStatGain:1 },
    ],
    home: [
      { name:'Single-Leg Hip Hinge', role:'compound', pattern:'hinge', spinalLoad:false, loadable:false, stat:'Agility', baseSets:3, repRange:[10,12], baseRP:16, baseStatGain:1 },
      { name:'Glute Bridge (hamstring focus)', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,20], baseRP:14, baseStatGain:1 },
    ],
  },

  // ═══ GLUTES ═══
  glutes: {
    gym: [
      { name:'Barbell Hip Thrust', role:'compound', pattern:'hinge', spinalLoad:false, loadable:true, stat:'Strength', baseSets:4, repRange:[8,10], baseRP:32, baseStatGain:3, cue:'Drive through the heels, squeeze glutes hard at the top and hold 2 seconds. Chin tucked — do not hyperextend the neck. Actively lengthens hip flexors under load, improving hip flexibility over time.' },
      { name:'Cable Kickback', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:18, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Single-Leg Hip Thrust', role:'compound', pattern:'hinge', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
      { name:'Fire Hydrant', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:2, repRange:[15,20], baseRP:12, baseStatGain:1 },
    ],
    home: [
      { name:'Glute Bridge', role:'compound', pattern:'hinge', spinalLoad:false, loadable:false, stat:'Strength', baseSets:3, repRange:[15,20], baseRP:14, baseStatGain:1 },
      { name:'Donkey Kick', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Strength', baseSets:2, repRange:[15,20], baseRP:10, baseStatGain:1 },
    ],
  },

  // ═══ CALVES ═══
  calves: {
    gym: [
      { name:'Standing Calf Raise', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Stamina', baseSets:4, repRange:[12,15], baseRP:18, baseStatGain:1 },
      { name:'Seated Calf Raise', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Stamina', baseSets:3, repRange:[15,20], baseRP:16, baseStatGain:1 },
      { name:'Donkey Calf Raise', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Stamina', baseSets:3, repRange:[15,20], baseRP:18, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Single-Leg Calf Raise', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Stamina', baseSets:3, repRange:[15,20], baseRP:14, baseStatGain:1 },
      { name:'Jump Rope — Calf Focus', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Speed', baseSets:3, repRange:[1,1], baseRP:18, baseStatGain:1 },
    ],
    home: [
      { name:'Calf Raise (stairs)', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Stamina', baseSets:3, repRange:[15,25], baseRP:10, baseStatGain:1 },
      { name:'Single-Leg Calf Raise (stairs)', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Stamina', baseSets:3, repRange:[12,20], baseRP:12, baseStatGain:1 },
    ],
  },

  // ═══ CORE (rectus abdominis) ═══
  core: {
    gym: [
      { name:'Hanging Leg Raise', role:'compound', pattern:'core', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[8,12], baseRP:26, baseStatGain:2, cue:'Initiate from the pelvis — tilt it posteriorly before raising legs. This fires hip flexors and lower abs together. Serratus anterior engages to stabilise the grip overhead. Obliques control any lateral sway.' },
      { name:'Cable Crunch', role:'accessory', pattern:'core', spinalLoad:false, loadable:true, stat:'Discipline', baseSets:3, repRange:[12,15], baseRP:20, baseStatGain:1 },
      { name:'Ab Wheel Rollout', role:'isolation', pattern:'core', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[8,12], baseRP:24, baseStatGain:2 },
    ],
    calisthenics: [
      { name:'Hanging Knee/Leg Raise', role:'compound', pattern:'core', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[8,12], baseRP:24, baseStatGain:2 },
      { name:'Hollow Body Hold', role:'accessory', pattern:'core', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[1,1], baseRP:20, baseStatGain:1 },
    ],
    home: [
      { name:'Lying Leg Raise', role:'compound', pattern:'core', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[12,15], baseRP:14, baseStatGain:1 },
      { name:'Crunch', role:'accessory', pattern:'core', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[15,20], baseRP:10, baseStatGain:1 },
    ],
  },

  // ═══ OBLIQUES (explicit, was missing) ═══
  obliques: {
    gym: [
      { name:'Cable Woodchop', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Agility', baseSets:3, repRange:[12,15], baseRP:18, baseStatGain:1 },
      { name:'Pallof Press', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Discipline', baseSets:3, repRange:[10,12], baseRP:18, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Side Plank', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:2, repRange:[1,1], baseRP:14, baseStatGain:1 },
      { name:'Hanging Windshield Wipers', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:3, repRange:[6,10], baseRP:24, baseStatGain:2 },
    ],
    home: [
      { name:'Side Plank', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Discipline', baseSets:2, repRange:[1,1], baseRP:12, baseStatGain:1 },
      { name:'Russian Twist', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Agility', baseSets:3, repRange:[15,20], baseRP:10, baseStatGain:1 },
    ],
  },

  // ═══ FOREARMS / GRIP ═══
  forearms: {
    gym: [
      { name:'Farmer Carry', role:'compound', pattern:'carry', spinalLoad:false, loadable:true, stat:'Durability', baseSets:3, repRange:[1,1], baseRP:22, baseStatGain:1, cue:'Walk tall — chest up, shoulders back, neck packed neutral. Trains grip, forearms, upper traps, deep neck stabilisers, and obliques simultaneously. One of the best total-body strength and conditioning movements that exists.' },
      { name:'Barbell Wrist Curl', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:3, repRange:[15,20], baseRP:14, baseStatGain:1 },
      { name:'Reverse Curl', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:3, repRange:[12,15], baseRP:16, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Dead Hang', role:'compound', pattern:'carry', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[1,1], baseRP:18, baseStatGain:1 },
      { name:'Towel Pull-Up Grip', role:'accessory', pattern:'carry', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[1,1], baseRP:16, baseStatGain:1 },
    ],
    home: [
      { name:'Towel Wring / Water-Bottle Wrist Curl', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[15,20], baseRP:10, baseStatGain:1 },
      { name:'Rice Bucket / Stress Ball Grip Work', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:3, repRange:[1,1], baseRP:10, baseStatGain:1 },
    ],
  },

  // ═══ NECK (explicit, was missing) ═══
  neck: {
    gym: [
      { name:'Neck Harness Flexion/Extension', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:14, baseStatGain:1 },
      { name:'Plate-Loaded Neck Flexion', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:true, stat:'Durability', baseSets:2, repRange:[12,15], baseRP:14, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Manual Neck Resistance (4-way)', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[10,12], baseRP:12, baseStatGain:1 },
      { name:'Chin Tuck Isometric Hold', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[1,1], baseRP:10, baseStatGain:1 },
    ],
    home: [
      { name:'Manual Neck Resistance (4-way)', role:'isolation', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[10,12], baseRP:10, baseStatGain:1 },
      { name:'Chin Tuck Isometric Hold', role:'accessory', pattern:'isolation_small', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[1,1], baseRP:10, baseStatGain:1 },
    ],
  },

  // ═══ MOBILITY (new — dedicated flexibility/joint health exercises) ═══
  mobility: {
    gym: [
      { name:'Hip 90/90 Stretch', role:'isolation', pattern:'core', spinalLoad:false, loadable:false, stat:'Agility', baseSets:2, repRange:[1,1], baseRP:14, baseStatGain:1 },
      { name:'Thoracic Spine Foam Roll', role:'isolation', pattern:'core', spinalLoad:false, loadable:false, stat:'Durability', baseSets:2, repRange:[1,1], baseRP:12, baseStatGain:1 },
      { name:'Ankle Mobility Drill', role:'isolation', pattern:'core', spinalLoad:false, loadable:false, stat:'Agility', baseSets:2, repRange:[12,15], baseRP:12, baseStatGain:1 },
    ],
    calisthenics: [
      { name:'Hip 90/90 Stretch', role:'isolation', pattern:'core', spinalLoad:false, loadable:false, stat:'Agility', baseSets:2, repRange:[1,1], baseRP:14, baseStatGain:1 },
      { name:'Jefferson Curl (light)', role:'compound', pattern:'hinge', spinalLoad:false, loadable:false, stat:'Agility', baseSets:3, repRange:[8,10], baseRP:18, baseStatGain:1 },
      { name:'Cossack Squat', role:'accessory', pattern:'squat', spinalLoad:false, loadable:false, stat:'Agility', baseSets:3, repRange:[8,10], baseRP:18, baseStatGain:1 },
    ],
    home: [
      { name:'Hip 90/90 Stretch', role:'isolation', pattern:'core', spinalLoad:false, loadable:false, stat:'Agility', baseSets:2, repRange:[1,1], baseRP:12, baseStatGain:1 },
      { name:'Cossack Squat', role:'accessory', pattern:'squat', spinalLoad:false, loadable:false, stat:'Agility', baseSets:3, repRange:[8,10], baseRP:16, baseStatGain:1 },
      { name:'Deep Squat Hold + Breathing', role:'isolation', pattern:'squat', spinalLoad:false, loadable:false, stat:'Agility', baseSets:2, repRange:[1,1], baseRP:10, baseStatGain:1 },
    ],
  },
};

/* ───────────────────────────────────────────────────────────────────────
   2. WARMUP / COOLDOWN — mandatory, scaled by primary movement pattern
   ─────────────────────────────────────────────────────────────────────── */

const WARMUP_TEMPLATES = {
  squat:           { name:'Warmup — Lower Body Activation', desc:'5 min light cardio, then 2 sets of 10 bodyweight squats + 10 leg swings each leg + 1 light ramp-up set of today\'s first lift at ~50% working weight.' },
  hinge:           { name:'Warmup — Hip Hinge Prep', desc:'5 min light cardio, then 2 sets of 10 glute bridges + 10 bodyweight RDLs + 1 light ramp-up set of today\'s first lift at ~50% working weight.' },
  horizontal_push: { name:'Warmup — Push Prep', desc:'5 min light cardio, then 2×10 band pull-aparts (rotator cuff activation), 10 arm circles each direction, and 1 ramp-up set at ~50% working weight. The band pull-aparts bulletproof the rotator cuff and rear delts before any pressing.' },
  vertical_push:   { name:'Warmup — Shoulder Prep', desc:'5 min light cardio, then band external rotations ×10 each side (rotator cuff activation), 10 arm circles, pike hold 20s (serratus anterior), and 1 ramp-up set at ~50% working weight.' },
  horizontal_pull: { name:'Warmup — Pull Prep', desc:'5 min light cardio, then 2 sets of 10 scapular pulls/band rows + 1 light ramp-up set of today\'s first pull at ~50% working weight.' },
  vertical_pull:   { name:'Warmup — Pull Prep', desc:'5 min light cardio, then 2 sets of 10 scapular pulls + dead hangs 20s + 1 light ramp-up set at ~50% working effort.' },
  core:            { name:'Warmup — Core Activation', desc:'2 min light cardio, then cat-cow x10 + dead bug x10 each side to activate the core before loading it.' },
  default:         { name:'Warmup — General Activation', desc:'5 min light cardio (jog, jump rope, or bike) followed by dynamic stretches for the muscles you are training today.' },
};

const COOLDOWN_TEMPLATES = {
  squat:           { name:'Cooldown — Lower Body Stretch', desc:'Couch stretch 45s each side (quad + hip flexor), deep squat hold 30s (ankle + hip flexibility), lying hip flexor stretch 30s each side. Finish with 10 slow neck circles — squats brace the neck isometrically so it earns a stretch.' },
  hinge:           { name:'Cooldown — Posterior Chain Stretch', desc:'Standing hamstring stretch 45s each leg, child\'s pose 45s, figure-4 piriformis stretch 30s each side. Finish with chin-tuck neck stretch 20s each side — deadlifts brace the neck hard and it needs to be released.' },
  horizontal_push: { name:'Cooldown — Chest/Shoulder Stretch', desc:'Doorway chest stretch 45s each side (also lengthens serratus anterior), cross-body shoulder stretch 30s each arm, overhead tricep stretch 20s each. Finish with 10 slow neck rolls to release isometric neck tension from pressing.' },
  vertical_push:   { name:'Cooldown — Shoulder Stretch', desc:'Doorway shoulder stretch 30s each side + overhead tricep stretch 30s each arm.' },
  horizontal_pull: { name:'Cooldown — Back/Lat Stretch', desc:'Child\'s pose 45s (lats + lower traps), lat stretch on bar or doorframe 30s each side, rear-delt cross-body stretch 20s each arm. Finish with 10 slow chin tucks to decompress the neck — rows load it isometrically.' },
  vertical_pull:   { name:'Cooldown — Lat Stretch', desc:'Active hang or lat stretch on a doorframe 30-45s, plus child\'s pose 45s.' },
  core:            { name:'Cooldown — Core/Spine Reset', desc:'Child\'s pose 45s followed by a gentle cat-cow flow for 60s to decompress the spine.' },
  default:         { name:'Cooldown — General Stretch', desc:'5 minutes of static stretching for the muscles trained today, holding each stretch 30s.' },
};

/* ───────────────────────────────────────────────────────────────────────
   3. SAFE EXERCISE ORDERING + VOLUME CONTROL
   ─────────────────────────────────────────────────────────────────────── */

// Max number of exercises a single muscle gets in one session (junk-volume guard)
const MAX_EXERCISES_PER_MUSCLE = 3;
// Max working sets across a whole session for one muscle (further junk-volume guard)
const MAX_SETS_PER_MUSCLE = 12;

// Order exercises within a day: compounds first (heaviest pattern first),
// then accessories, then isolation. Never place two spinalLoad:true
// exercises back-to-back — insert a non-spinal exercise between them.
function orderExercisesSafely(exercises) {
  const roleOrder = { compound: 0, accessory: 1, isolation: 2 };
  const sorted = [...exercises].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

  const result = [];
  let lastWasSpinal = false;
  const deferred = [];

  sorted.forEach(ex => {
    if (ex.spinalLoad && lastWasSpinal) {
      // Defer this spinal-load exercise until a non-spinal one has been placed
      deferred.push(ex);
      return;
    }
    result.push(ex);
    lastWasSpinal = !!ex.spinalLoad;
    // Drain any deferred spinal exercises now that a buffer exists
    while (deferred.length && !lastWasSpinal) {
      const d = deferred.shift();
      result.push(d);
      lastWasSpinal = true;
    }
  });
  // Anything still deferred (e.g. ended on a spinal exercise) goes at the end
  result.push(...deferred);
  return result;
}

/* ───────────────────────────────────────────────────────────────────────
   4. STRENGTH-RELATIVE STARTING LOADS
   Beginner vs advanced get genuinely different absolute prescriptions,
   not just a rep multiplier on the same load. For loadable exercises we
   estimate a safe starting weight as a fraction of bodyweight, scaled by
   fitness level. Users can override by logging their own numbers, after
   which the engine tracks THEIR actual weight instead of the estimate.
   ─────────────────────────────────────────────────────────────────────── */

// Rough, conservative bodyweight-multiplier starting points by experience
// level for big compound lifts (kg). Used only as a *starting suggestion*
// the first time an exercise is ever seen — real progression takes over
// immediately after the first logged set.
const STRENGTH_STARTING_RATIOS = {
  beginner:     { squat: 0.5,  hinge: 0.6,  horizontal_push: 0.4, vertical_push: 0.25, horizontal_pull: 0.4, vertical_pull: 0.0 },
  intermediate: { squat: 0.9,  hinge: 1.1,  horizontal_push: 0.7, vertical_push: 0.45, horizontal_pull: 0.65, vertical_pull: 0.0 },
  advanced:     { squat: 1.4,  hinge: 1.6,  horizontal_push: 1.0, vertical_push: 0.65, horizontal_pull: 0.9, vertical_pull: 0.0 },
};

function estimateStartingWeight(exercise, fitnessLevel, bodyweightKg) {
  if (!exercise.loadable || !bodyweightKg) return null;
  const ratios = STRENGTH_STARTING_RATIOS[fitnessLevel] || STRENGTH_STARTING_RATIOS.intermediate;
  const ratio = ratios[exercise.pattern];
  if (!ratio) return null;
  const raw = bodyweightKg * ratio;
  // Round to nearest 2.5kg (standard plate increment)
  return Math.max(2.5, Math.round(raw / 2.5) * 2.5);
}

/* ───────────────────────────────────────────────────────────────────────
   5. PROGRESSIVE OVERLOAD ENGINE
   Persists per-exercise history in localStorage under 'exerciseProgress'.
   Two modes per exercise, chosen automatically:
     - LOADED mode (loadable === true): tracks weight (kg) + reps. After
       a completed session, if the user hit the top of their rep range
       for all sets, weight goes up next time (linear progression);
       otherwise reps go up first. Deload every 4th week automatically
       (-10% weight) to manage fatigue, per standard periodization practice.
     - BODYWEIGHT/HOLD mode (loadable === false): tracks reps or hold
       time. Progresses reps/time by a small fixed step ONLY if the
       previous week's prescribed amount was actually completed
       (consistency-gated, so it never progresses through a plateau).
   ─────────────────────────────────────────────────────────────────────── */

function getExerciseProgressStore() {
  try {
    return JSON.parse(localStorage.getItem('exerciseProgress') || '{}');
  } catch {
    return {};
  }
}

function saveExerciseProgressStore(store) {
  localStorage.setItem('exerciseProgress', JSON.stringify(store));
}

// Call this once a quest/exercise is marked complete. `result` is optional:
// { weight, repsAchieved, allSetsHitTop } supplied by the logging UI for
// loadable exercises; for non-loadable exercises pass { completed: true }.
function recordExerciseResult(exerciseName, muscle, result) {
  const store = getExerciseProgressStore();
  const key = exerciseName;
  const prev = store[key] || { weekIndex: 0, history: [] };

  prev.history.push({ date: new Date().toISOString(), ...result });
  if (prev.history.length > 12) prev.history.shift(); // keep last 12 sessions
  prev.weekIndex = (prev.weekIndex || 0) + 1;
  prev.muscle = muscle;
  prev.lastResult = result;
  store[key] = prev;
  saveExerciseProgressStore(store);
}

// Compute the prescription (sets/reps/weight or sets/reps/hold) for an
// exercise THIS session, based on its history. This is the heart of the
// progressive-overload fix: it never just rerolls a random rep count.
// Rank names in order — used to scale workout volume as user progresses
const RANK_ORDER = ['Unranked','E-Rank','D-Rank','C-Rank','B-Rank','A-Rank','S-Rank','SS-Rank','SSS-Rank','X-Rank','Z-Rank'];

function getRankTier(rankName) {
  const idx = RANK_ORDER.indexOf(rankName);
  return idx < 0 ? 0 : idx; // 0=Unranked, 1=E, 2=D ... 10=Z
}

// Scale sets by rank: compounds get +1 set every 2 rank tiers above E-Rank (capped at +3)
function rankScaleSets(baseSets, role, rankTier) {
  if (role !== 'compound') return baseSets; // only scale compound lifts
  const bonus = Math.min(3, Math.floor(Math.max(0, rankTier - 1) / 2));
  return baseSets + bonus;
}

function getPrescription(exercise, fitnessLevel, bodyweightKg, rankName) {
  const store = getExerciseProgressStore();
  const prog = store[exercise.name];
  const [repLow, repHigh] = exercise.repRange;
  const rankTier = getRankTier(rankName || 'E-Rank');
  const sets = rankScaleSets(exercise.baseSets, exercise.role, rankTier);

  // First time ever seeing this exercise — establish a baseline.
  if (!prog || !prog.history.length) {
    if (exercise.loadable) {
      const startWeight = estimateStartingWeight(exercise, fitnessLevel, bodyweightKg);
      return {
        sets, reps: repLow, weight: startWeight, isDeload: false,
        note: startWeight ? `Starting weight suggestion: ${startWeight}kg — adjust to what feels like a controlled but challenging set, then log it.` : 'Log the weight you use so next session can build on it.',
      };
    }
    return { sets, reps: repLow, weight: null, isDeload: false, note: null };
  }

  const last = prog.lastResult || {};
  const weekIndex = prog.weekIndex || 0;
  const isDeloadWeek = exercise.loadable && weekIndex > 0 && weekIndex % 4 === 0;

  if (exercise.loadable) {
    let weight = (typeof last.weight === 'number' && last.weight > 0)
      ? last.weight
      : estimateStartingWeight(exercise, fitnessLevel, bodyweightKg) || 20;
    let reps = (typeof last.repsAchieved === 'number') ? Math.min(last.repsAchieved, repHigh) : repLow;

    if (isDeloadWeek) {
      // Planned deload: reduce load ~10%, keep reps moderate, let fatigue dissipate
      weight = Math.max(2.5, Math.round((weight * 0.9) / 2.5) * 2.5);
      reps = repLow;
      return { sets, reps, weight, isDeload: true, note: 'Deload week — lighter load on purpose. This protects your joints and lets strength keep climbing afterward.' };
    }

    if (last.allSetsHitTop) {
      // Hit the top of the rep range on all sets last time -> add weight, reset reps to bottom
      const increment = exercise.pattern === 'squat' || exercise.pattern === 'hinge' ? 2.5 : 1.25;
      weight = Math.round((weight + increment) / 2.5) * 2.5;
      reps = repLow;
      return { sets, reps, weight, isDeload: false, note: `Progressive overload: you hit ${repHigh} reps on every set last time, so weight goes up to ${weight}kg.` };
    } else if (typeof last.repsAchieved === 'number' && last.repsAchieved < repHigh) {
      // Same weight, try to add a rep
      reps = Math.min(repHigh, last.repsAchieved + 1);
      return { sets, reps, weight, isDeload: false, note: `Same weight (${weight}kg), aim for ${reps} reps this time — building toward the top of the range before the next weight jump.` };
    }
    // No clear signal (e.g. missed logging last time) — repeat as-is
    return { sets, reps, weight, isDeload: false, note: `Repeat last known load: ${weight}kg for ${reps} reps.` };
  }

  // Bodyweight / hold-based progression — gated by consistency
  const lastCompleted = last.completed !== false; // default true unless explicitly marked failed
  let reps = (typeof last.repsAchieved === 'number') ? last.repsAchieved : repLow;
  if (lastCompleted) {
    reps = Math.min(repHigh + Math.floor(weekIndex / 4) * 2, reps + 1); // small steady creep, extends range every ~4 weeks
  }
  return {
    sets, reps, weight: null, isDeload: false,
    note: lastCompleted ? `Progressing: aim for ${reps} reps/seconds today, up from last session.` : `Repeat ${reps} reps/seconds — let's nail this consistently before pushing further.`,
  };
}

/* ───────────────────────────────────────────────────────────────────────
   6. MESOCYCLE / SPLIT DEFINITIONS — fixed exercise SLOTS per day so the
   same lifts recur week to week (required for progressive overload to
   mean anything), while still rotating accessory/isolation choices every
   4-week mesocycle block for variety and to avoid staleness.
   ─────────────────────────────────────────────────────────────────────── */

const PROGRAM_SPLITS = {
  ppl: {
    days: 6,
    schedule: [
      { label: 'Push Day',  slots: [
        { muscle:'chest', role:'compound' }, { muscle:'shoulders', role:'compound' },
        { muscle:'chest', role:'accessory' }, { muscle:'triceps', role:'compound' },
        { muscle:'chest', role:'isolation' }, { muscle:'rear_delts', role:'accessory' },
        { muscle:'triceps', role:'isolation' },
      ]},
      { label: 'Pull Day', slots: [
        { muscle:'back', role:'compound' }, { muscle:'back', role:'compound', alt:true },
        { muscle:'back', role:'accessory' }, { muscle:'biceps', role:'compound' },
        { muscle:'rear_delts', role:'accessory' }, { muscle:'traps', role:'isolation' },
        { muscle:'rotator_cuff', role:'isolation' }, { muscle:'forearms', role:'compound' },
      ]},
      { label: 'Leg Day', slots: [
        { muscle:'quads', role:'compound' }, { muscle:'hamstrings', role:'compound' },
        { muscle:'glutes', role:'compound' }, { muscle:'quads', role:'accessory' },
        { muscle:'calves', role:'isolation' }, { muscle:'core', role:'compound' },
        { muscle:'obliques', role:'isolation' },
      ]},
    ],
  },
  brosplit: {
    days: 5,
    schedule: [
      { label: 'Chest Day', slots: [
        { muscle:'chest', role:'compound' },
        { muscle:'chest', role:'accessory' },
        { muscle:'chest', role:'isolation' },
        { muscle:'serratus', role:'accessory' },
        { muscle:'triceps', role:'isolation' },
      ]},
      { label: 'Back Day', slots: [
        { muscle:'back', role:'compound' }, { muscle:'back', role:'compound', alt:true },
        { muscle:'back', role:'accessory' }, { muscle:'traps', role:'isolation' },
        { muscle:'rear_delts', role:'accessory' },
      ]},
      { label: 'Shoulder Day', slots: [
        { muscle:'shoulders', role:'compound' }, { muscle:'shoulders', role:'isolation' },
        { muscle:'rear_delts', role:'accessory' }, { muscle:'rotator_cuff', role:'isolation' },
        { muscle:'traps', role:'isolation' },
      ]},
      { label: 'Arms Day', slots: [
        { muscle:'biceps', role:'compound' }, { muscle:'triceps', role:'compound' },
        { muscle:'biceps', role:'accessory' }, { muscle:'triceps', role:'accessory' },
        { muscle:'biceps', role:'isolation' }, { muscle:'triceps', role:'isolation' },
        { muscle:'forearms', role:'compound' },
      ]},
      { label: 'Leg Day', slots: [
        { muscle:'quads', role:'compound' }, { muscle:'hamstrings', role:'compound' },
        { muscle:'glutes', role:'compound' }, { muscle:'quads', role:'accessory' },
        { muscle:'calves', role:'isolation' }, { muscle:'core', role:'compound' },
        { muscle:'obliques', role:'isolation' },
      ]},
    ],
  },
  upperlower: {
    days: 4,
    schedule: [
      { label: 'Upper A', slots: [
        { muscle:'chest', role:'compound' }, { muscle:'back', role:'compound' },
        { muscle:'shoulders', role:'compound' }, { muscle:'biceps', role:'compound' },
        { muscle:'triceps', role:'compound' }, { muscle:'rear_delts', role:'accessory' },
      ]},
      { label: 'Lower A', slots: [
        { muscle:'quads', role:'compound' }, { muscle:'hamstrings', role:'compound' },
        { muscle:'glutes', role:'compound' }, { muscle:'calves', role:'isolation' },
        { muscle:'core', role:'compound' },
      ]},
      { label: 'Upper B', slots: [
        { muscle:'back', role:'compound', alt:true }, { muscle:'chest', role:'accessory' },
        { muscle:'shoulders', role:'isolation' }, { muscle:'traps', role:'isolation' },
        { muscle:'biceps', role:'accessory' }, { muscle:'triceps', role:'accessory' },
        { muscle:'serratus', role:'accessory' },
      ]},
      { label: 'Lower B', slots: [
        { muscle:'quads', role:'accessory' }, { muscle:'hamstrings', role:'accessory' },
        { muscle:'glutes', role:'compound' }, { muscle:'calves', role:'isolation' },
        { muscle:'obliques', role:'isolation' },
      ]},
    ],
  },
  fullbody: {
    days: 3,
    schedule: [
      { label: 'Full Body A', slots: [
        { muscle:'quads', role:'compound' }, { muscle:'chest', role:'compound' },
        { muscle:'back', role:'compound' }, { muscle:'shoulders', role:'accessory' },
        { muscle:'core', role:'compound' }, { muscle:'calves', role:'isolation' },
      ]},
      { label: 'Full Body B', slots: [
        { muscle:'hamstrings', role:'compound' }, { muscle:'shoulders', role:'compound' },
        { muscle:'back', role:'compound', alt:true }, { muscle:'triceps', role:'compound' },
        { muscle:'rear_delts', role:'accessory' },
      ]},
      { label: 'Full Body C', slots: [
        { muscle:'glutes', role:'compound' }, { muscle:'chest', role:'accessory' },
        { muscle:'back', role:'accessory' }, { muscle:'biceps', role:'compound' },
        { muscle:'obliques', role:'isolation' }, { muscle:'traps', role:'isolation' },
        { muscle:'calves', role:'isolation' },
      ]},
    ],
  },
};

const MUSCLE_DISPLAY_NAMES = {
  chest:'Chest', back:'Back', shoulders:'Shoulders', biceps:'Biceps', triceps:'Triceps',
  quads:'Quads', hamstrings:'Hamstrings', glutes:'Glutes', calves:'Calves', core:'Core',
  forearms:'Forearms', traps:'Traps', rear_delts:'Rear Delts',
  // neck, serratus, rotator_cuff trained via compound cues + warmup/cooldown
  serratus:'Serratus', obliques:'Obliques',
};

/* ───────────────────────────────────────────────────────────────────────
   7. DAY/EXERCISE SELECTION — pick a fixed exercise per slot, keep it
   stable for the whole mesocycle (4 weeks) so overload tracking is
   meaningful, then rotate at mesocycle boundaries.
   ─────────────────────────────────────────────────────────────────────── */

function getMesocycleIndex(hunter) {
  const startDate = hunter.startDate ? new Date(hunter.startDate) : new Date();
  const weeksSinceStart = Math.floor((Date.now() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return Math.floor(weeksSinceStart / 4); // new mesocycle every 4 weeks
}

function pickExerciseForSlot(slot, equipType, mesoIndex, excludeNames) {
  const pool = (EX_DB[slot.muscle] && EX_DB[slot.muscle][equipType]) || [];
  const roleMatches = pool.filter(e => e.role === slot.role && !(excludeNames && excludeNames.has(e.name)));
  let candidates = roleMatches.length ? roleMatches : pool.filter(e => !(excludeNames && excludeNames.has(e.name)));
  if (!candidates.length) candidates = roleMatches.length ? roleMatches : pool; // last resort: allow repeats rather than dropping the slot entirely
  if (!candidates.length) return null;
  // Deterministic rotation by mesocycle index so the SAME exercise is
  // picked all 4 weeks of a mesocycle, then changes for the next block.
  const idx = (mesoIndex + (slot.alt ? 1 : 0)) % candidates.length;
  return candidates[idx];
}

/* ───────────────────────────────────────────────────────────────────────
   8. MAIN ENTRY POINT — builds today's structured workout
   Returns null on a rest day, otherwise:
   { dayLabel, warmup, cooldown, exercises: [{...exercise, prescription, slotMuscle}] }
   ─────────────────────────────────────────────────────────────────────── */

function getAvailableEquipTypesForProgram(workoutEnv) {
  switch (workoutEnv) {
    case 'gym': return 'gym';
    case 'calisthenics': return 'calisthenics';
    default: return 'home';
  }
}

// Auto-expand the 'fullbody' shorthand into a balanced set of major muscle
// groups so a custom-scheduled "Full Body" day still gets real, varied slots
// (compound-first), rotating which secondary muscles show up by mesocycle.
const FULLBODY_ROTATION = [
  ['quads', 'chest', 'back', 'shoulders', 'core'],
  ['hamstrings', 'shoulders', 'back', 'triceps', 'rear_delts'],
  ['glutes', 'chest', 'back', 'biceps', 'obliques'],
];

function expandFullbodyMuscles(mesoIndex) {
  return FULLBODY_ROTATION[mesoIndex % FULLBODY_ROTATION.length];
}

// Build day "slots" (muscle + role) from a plain list of muscle group keys —
// used both for custom per-weekday schedules and as a fallback. Gives each
// muscle 1 compound + 1 accessory (+1 isolation if it's the primary/first
// muscle of the day) so single-muscle "Chest Day" style custom days still
// get proper structure instead of one lonely exercise.
function buildSlotsFromMuscleList(muscles) {
  const slots = [];
  muscles.forEach((m, i) => {
    slots.push({ muscle: m, role: 'compound' });
    slots.push({ muscle: m, role: 'accessory' });
    if (i === 0 || muscles.length <= 2) {
      slots.push({ muscle: m, role: 'isolation' });
    }
  });
  return slots;
}

function getCustomDayPlan(hunter) {
  const schedule = hunter.customSchedule;
  if (!schedule || typeof schedule !== 'object' || !Object.keys(schedule).length) return undefined;
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName = dayNames[new Date().getDay()];
  if (!(todayName in schedule)) return undefined; // no custom schedule configured for this weekday at all
  const muscles = schedule[todayName];
  if (muscles === null || muscles === undefined) return null; // explicit rest day
  return { muscles };
}

function buildStructuredWorkout(hunter) {
  const equipType = getAvailableEquipTypesForProgram(hunter.workoutEnv);
  const fitnessLevel = hunter.fitness || 'intermediate';
  const bodyweightKg = parseFloat(hunter.weight) || null;
  const mesoIndex = getMesocycleIndex(hunter);

  let dayLabel, slots;

  // 1) Respect an explicit per-weekday custom schedule if the user set one
  const customPlan = getCustomDayPlan(hunter);
  if (customPlan === null) {
    return null; // user explicitly marked today as rest
  } else if (customPlan) {
    let muscles = customPlan.muscles;
    if (muscles.includes('fullbody')) muscles = expandFullbodyMuscles(mesoIndex);
    dayLabel = muscles.map(m => MUSCLE_DISPLAY_NAMES[m] || m).join(' + ');
    slots = buildSlotsFromMuscleList(muscles);
  } else {
    // 2) Fall back to the fixed split cycle (PPL / Bro Split / Upper-Lower / Full Body)
    const split = PROGRAM_SPLITS[hunter.workoutSplit] || PROGRAM_SPLITS.ppl;
    const daysPerWeek = parseInt(hunter.daysPerWeek) || split.days;
    const startDate = hunter.startDate ? new Date(hunter.startDate) : new Date();
    const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const restGap = Math.max(0, 7 - daysPerWeek);
    const cycleLen = split.days + restGap;
    const cycleDay = daysSinceStart % cycleLen;
    if (cycleDay >= split.days) return null; // rest day

    const dayPlan = split.schedule[cycleDay % split.schedule.length];
    dayLabel = dayPlan.label;
    slots = dayPlan.slots;
  }

  // Pick one exercise per slot, avoiding picking the literal same exercise twice
  const pickedNames = new Set();
  let pickedExercises = slots
    .map(slot => {
      const ex = pickExerciseForSlot(slot, equipType, mesoIndex, pickedNames);
      if (!ex) return null;
      pickedNames.add(ex.name);
      return { ...ex, slotMuscle: slot.muscle };
    })
    .filter(Boolean);

  // Volume control: cap exercises-per-muscle and total sets-per-muscle
  const perMuscleCount = {};
  const perMuscleSets = {};
  pickedExercises = pickedExercises.filter(ex => {
    const m = ex.slotMuscle;
    perMuscleCount[m] = (perMuscleCount[m] || 0);
    perMuscleSets[m] = (perMuscleSets[m] || 0);
    if (perMuscleCount[m] >= MAX_EXERCISES_PER_MUSCLE) return false;
    if (perMuscleSets[m] + ex.baseSets > MAX_SETS_PER_MUSCLE) return false;
    perMuscleCount[m] += 1;
    perMuscleSets[m] += ex.baseSets;
    return true;
  });

  // Safe ordering: compounds first, no two spinal-load lifts back-to-back
  pickedExercises = orderExercisesSafely(pickedExercises);

  // Attach prescriptions (progressive overload happens here)
  // Pass rankName so higher ranks automatically get more volume on compound lifts
  const rankName = (typeof getCurrentRank === 'function') ? getCurrentRank().name : (hunter.rankName || 'E-Rank');
  const exercisesWithPrescription = pickedExercises.map((ex, i) => {
    const prescription = getPrescription(ex, fitnessLevel, bodyweightKg, rankName);
    return {
      ...ex,
      id: `pe_${i}_${Date.now()}`,
      prescription,
      muscleLabel: MUSCLE_DISPLAY_NAMES[ex.slotMuscle] || ex.slotMuscle,
      completed: false,
    };
  });

  // Warmup keyed off the first exercise's pattern (the heaviest movement of the day)
  const primaryPattern = (pickedExercises[0] && pickedExercises[0].pattern) || 'default';
  const warmupTpl = WARMUP_TEMPLATES[primaryPattern] || WARMUP_TEMPLATES.default;
  const cooldownTpl = COOLDOWN_TEMPLATES[primaryPattern] || COOLDOWN_TEMPLATES.default;

  return {
    dayLabel,
    mesoIndex,
    warmup: { ...warmupTpl, id: 'warmup_' + Date.now(), type: 'warmup', completed: false },
    cooldown: { ...cooldownTpl, id: 'cooldown_' + Date.now(), type: 'cooldown', completed: false },
    exercises: exercisesWithPrescription,
  };
}

// Expose globally for app.js
window.ProgramEngine = {
  EX_DB,
  PROGRAM_SPLITS,
  MUSCLE_DISPLAY_NAMES,
  buildStructuredWorkout,
  recordExerciseResult,
  getPrescription,
  getExerciseProgressStore,
  estimateStartingWeight,
};
