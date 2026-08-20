// Case-study data for the "Best Works" cards and modal, in both languages.
// To add a new project: add a work-slide block in index.html (with a matching
// data-project index and image), then append a matching object here at the
// same index, filling in both the `en` and `vi` variants.
window.CASE_DATA = [
  { // 0 — Action RPG / Dungeon Crawler
    tags: [],
    accentColor: '#f87171', // red — colors the title2 accent span on the card and in the modal
    video: 'https://www.youtube.com/watch?v=TzrS3qa1Xhk&t=29s',
    liveUrl: null,
    codeUrl: 'https://github.com/baonq080921',
    en: {
      title1: 'Action RPG ', title2: 'Dungeon Crawler',
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
      ]
    },
    vi: {
      title1: 'RPG Hành Động ', title2: 'Đi Hầm Ngục',
      overview: 'Một tựa game RPG Hành Động / Đi Hầm Ngục chơi offline với hệ thống combat combo, cây kỹ năng phân nhánh, hệ thống chế tạo/trang bị đầy đủ, và các trận đấu trùm được điều khiển bởi AI finite-state.',
      highlights: [
        ['Engine', 'Xây dựng bằng Unity và C#.'],
        ['Hệ Thống Combat', 'Combat cận chiến dạng combo với phản hồi va chạm nhạy bén.'],
        ['AI', 'Các trận đấu trùm được điều khiển bởi AI finite-state machine.'],
        ['Tiến Trình', 'Cây kỹ năng phân nhánh cùng hệ thống chế tạo và trang bị đầy đủ.']
      ],
      features: [
        'Hệ thống combat dạng combo',
        'Cây kỹ năng phân nhánh',
        'Hệ thống chế tạo & trang bị đầy đủ',
        'Trận đấu trùm với AI finite-state',
        'Chế độ chơi đơn offline'
      ]
    }
  },
  { // 1 — Sand Blast
    tags: [],
    accentColor: '#60a5fa', // blue
    video: 'https://www.youtube.com/watch?v=DCSnRchkKuQ',
    liveUrl: null,
    codeUrl: 'https://github.com/baonq080921',
    en: {
      title1: 'Sand Blast ', title2: 'Puzzle Game',
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
      ]
    },
    vi: {
      title1: 'Sand Blast ', title2: 'Game Giải Đố',
      overview: 'Một tựa game giải đố xếp hình lấy cảm hứng từ Tetris, có cơ chế power-up và hệ thống lưu tiến trình người chơi đầy đủ.',
      highlights: [
        ['Engine', 'Xây dựng bằng Unity và C#.'],
        ['Lối Chơi Chính', 'Lối chơi ghép và xếp khối lấy cảm hứng từ Tetris.'],
        ['Power-up', 'Cơ chế power-up đặc biệt giúp dọn bảng nhanh hơn.'],
        ['Tiến Trình', 'Hệ thống lưu game bền vững theo dõi các cột mốc của người chơi.']
      ],
      features: [
        'Cơ chế giải đố ghép/xếp khối',
        'Hệ thống power-up',
        'Tiến trình theo cột mốc',
        'Hệ thống lưu game đầy đủ'
      ]
    }
  },
  { // 2 — TopDownShooter
    tags: [],
    accentColor: '#c084fc', // purple
    video: 'https://www.youtube.com/watch?v=7oJZ7vxJcp4&t=260s',
    liveUrl: null,
    codeUrl: 'https://github.com/baonq080921/Dune-Survival',
    en: {
      title1: 'TopDownShooter', title2: ' Action Game',
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
      ]
    },
    vi: {
      title1: 'TopDownShooter', title2: ' Game Hành Động',
      overview: 'Một tựa game bắn súng sinh tồn lấy bối cảnh sa mạc với AI kẻ địch thích ứng, hệ thống vũ khí và nạp đạn cân bằng, cùng nhiều chế độ nhiệm vụ đa dạng như chạy đua thời gian, săn lùng vật phẩm, hộ tống VIP và phòng thủ tháp.',
      highlights: [
        ['Engine', 'Xây dựng bằng Unity và C#.'],
        ['Hệ Thống Vũ Khí', 'Cơ chế vũ khí và nạp đạn cân bằng cho trải nghiệm combat mượt mà với nhiều loại vũ khí khác nhau.'],
        ['AI', 'Các trận đấu trùm & kẻ địch được điều khiển bởi AI finite-state machine.'],
        ['Chế Độ Chơi', 'Năm chế độ chơi bao gồm chạy đua thời gian, săn lùng vật phẩm, hộ tống VIP và phòng thủ tháp.']
      ],
      features: [
        'Hệ thống vũ khí và nạp đạn',
        'AI kẻ địch thích ứng',
        'Rig và animation cho nhiều loại vũ khí',
        'Trận đấu trùm & kẻ địch với AI finite-state',
        'Chế độ chơi đơn offline'
      ]
    }
  }
];
