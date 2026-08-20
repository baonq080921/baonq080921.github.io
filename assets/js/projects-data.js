// Case-study data for the "Best Works" modal.
// To add a new project: add a work-slide block in index.html (with a matching
// data-project index), then append a matching object here at the same index.
window.CASE_DATA = [
  { // 0 — Action RPG / Dungeon Crawler
    tags: [],
    title1: 'Action RPG ', title2: 'Dungeon Crawler',
    // paste a YouTube link here, e.g.:
    // video: 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
    video: 'https://www.youtube.com/watch?v=TzrS3qa1Xhk&t=29s',
    overview: 'An offline Action RPG / Dungeon Crawler featuring combo-based combat, a branching skill tree, a full crafting/equipment system, and boss encounters driven by finite-state AI.',
    highlights: [
      ['Engine', 'Built with Unity and C#.'],
      ['Combat System', 'Combo-based melee combat with responsive hit feedback.'],
      ['AI', 'Boss encounters driven by finite-state machine AI.'],
      ['Progression', 'Branching skill tree with a full crafting and equipment system.']
    ],
    features: [
      'Combo-based combat system',
      'Branching skill tree',
      'Full crafting & equipment system',
      'Finite-state AI boss encounters',
      'Offline single-player campaign'
    ],
    liveUrl: null,
    codeUrl: 'https://github.com/baonq080921'
  },
  { // 1 — Sand Blast
    tags: [],
    title1: 'Sand Blast ', title2: 'Puzzle Game',
    video: 'https://www.youtube.com/watch?v=DCSnRchkKuQ', // e.g. 'https://youtu.be/XXXXXXXXXXX'
    overview: 'A Tetris-inspired match/stack puzzle game with power-up mechanics and a full player progression save system.',
    highlights: [
      ['Engine', 'Built with Unity and C#.'],
      ['Core Loop', 'Tetris-inspired block matching and stacking gameplay.'],
      ['Power-ups', 'Special power-up mechanics to clear the board faster.'],
      ['Progression', 'Persistent save system that tracks player milestones.']
    ],
    features: [
      'Match/stack puzzle mechanics',
      'Power-up system',
      'Milestone-based progression',
      'Full player save system'
    ],
    liveUrl: null,
    codeUrl: 'https://github.com/baonq080921'
  },
  { // 2 — TopDownShooter
    tags: [],
    title1: 'TopDownShooter', title2: ' Action Game',
    video: 'https://www.youtube.com/watch?v=7oJZ7vxJcp4&t=260s', // e.g. 'https://youtu.be/XXXXXXXXXXX'
    overview: 'A desert-set survival shooter featuring adaptive enemy AI, a balanced weapon and reload system, and diverse mission modes spanning timed runs, scavenger hunts, VIP escorts, and tower defense.',
    highlights: [
      ['Engine', 'Built with Unity and C#.'],
      ['Weapon System', 'Balanced weapon and reload mechanics for a smooth combat experience various weapon types.'],
      ['AI', 'Boss & Enemy encounters driven by finite-state machine AI.'],
      ['Mode', 'With five play mode including timed runs, scavenger hunts, VIP escorts, and tower defense.']
    ],
    features: [
      'Weapon and reload system',
      'Adaptive enemy AI',
      'Rig and animation for various weapon types',
      'Finite-state AI boss & enemy encounters',
      'Offline single-player campaign'
    ],
    liveUrl: null,
    codeUrl: 'https://github.com/baonq080921/Dune-Survival'
  }
];
