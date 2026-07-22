// ── FOLLOW YOUR FRIENDS ───────────────────────────────────────────────────
export const FRIENDS = [
  { id: 1, name: 'Jake Mercer', username: '@jakemercer', initials: 'JM', handicap: 8, trend: '-1.2', lastRound: { course: 'Torrey Pines South', score: 79, date: 'Jul 19' }, mutualFriends: 3, following: true, avatar: '#e8341c' },
  { id: 2, name: 'Sarah Okonkwo', username: '@sokonkwo', initials: 'SO', handicap: 14, trend: '+0.4', lastRound: { course: 'Pelican Hill', score: 88, date: 'Jul 20' }, mutualFriends: 5, following: true, avatar: '#4a9fd5' },
  { id: 3, name: 'Tyler Rhodes', username: '@trhodes_golf', initials: 'TR', handicap: 22, trend: '-2.1', lastRound: { course: 'Pebble Beach GL', score: 97, date: 'Jul 18' }, mutualFriends: 1, following: true, avatar: '#a855f7' },
  { id: 4, name: 'Dana Whitfield', username: '@dwhitfield', initials: 'DW', handicap: 5, trend: '-0.8', lastRound: { course: 'Riviera CC', score: 74, date: 'Jul 21' }, mutualFriends: 2, following: true, avatar: '#4ade80' },
];

export const SUGGESTED_FRIENDS = [
  { id: 5, name: 'Marcus Webb', username: '@marcuswebb', initials: 'MW', handicap: 12, mutualFriends: 4, avatar: '#f07428' },
  { id: 6, name: 'Chris Tanaka', username: '@ctanaka_golf', initials: 'CT', handicap: 18, mutualFriends: 2, avatar: '#e8341c' },
];

export const FOLLOW_REQUESTS = [
  { id: 7, name: 'Brent Holt', username: '@brentholt', initials: 'BH', handicap: 16, mutualFriends: 3, avatar: '#f07428' },
];

export const FRIEND_PROFILE = {
  id: 1, name: 'Jake Mercer', username: '@jakemercer', initials: 'JM',
  handicap: 8, handicapTrend: '-1.2', homeCourse: 'Torrey Pines GC',
  roundsThisYear: 34, coursesPlayed: 18, avgScore: 81,
  recentRounds: [
    { course: 'Torrey Pines South', score: 79, date: 'Jul 19', par: 72 },
    { course: 'Riviera CC', score: 77, date: 'Jul 12', par: 71 },
    { course: 'Pelican Hill', score: 82, date: 'Jul 5', par: 71 },
    { course: 'Pebble Beach GL', score: 84, date: 'Jun 28', par: 72 },
    { course: 'Sherwood CC', score: 80, date: 'Jun 22', par: 72 },
  ],
  topCourses: ['Torrey Pines South', 'Riviera CC', 'Pebble Beach GL'],
  bucketList: ['Augusta National', 'St Andrews', 'Cypress Point'],
  personalBests: { bestScore: 72, mostBirdies: 6, longestStreak: '4 pars in a row' },
  mutualFriends: 3,
  avatar: '#e8341c',
};

// ── COURSE RANKINGS ────────────────────────────────────────────────────────
export const RATING_ATTRIBUTES = [
  { id: 'conditions', label: 'Course Conditions', icon: '🌿' },
  { id: 'pace', label: 'Pace of Play', icon: '⏱' },
  { id: 'scenery', label: 'Views / Scenery', icon: '🏔' },
  { id: 'layout', label: 'Course Layout', icon: '🗺' },
  { id: 'challenge', label: 'Challenge Level', icon: '💪' },
  { id: 'value', label: 'Value for Money', icon: '💰' },
  { id: 'greens', label: 'Greens / Fairway Speed', icon: '⛳' },
  { id: 'staff', label: 'Staff Friendliness', icon: '🤝' },
  { id: 'amenities', label: 'GPS / Amenities', icon: '📱' },
  { id: 'signature', label: 'Signature Holes', icon: '🌟' },
  { id: 'walkability', label: 'Walkability', icon: '🚶' },
  { id: 'turnshack', label: 'Turn Shack', icon: '🍔' },
];

export const MY_COURSES = [
  { rank: 1, name: 'Pebble Beach GL', location: 'Pebble Beach, CA', score: 97, lastPlayed: 'Jun 28', timesPlayed: 2, photo: '#1a3a2a' },
  { rank: 2, name: 'Riviera CC', location: 'Pacific Palisades, CA', score: 94, lastPlayed: 'Jul 12', timesPlayed: 5, photo: '#1a2a3a' },
  { rank: 3, name: 'Torrey Pines South', location: 'La Jolla, CA', score: 91, lastPlayed: 'Jul 19', timesPlayed: 12, photo: '#2a1a1a' },
  { rank: 4, name: 'Pelican Hill', location: 'Newport Coast, CA', score: 87, lastPlayed: 'Jul 5', timesPlayed: 3, photo: '#1a1a2a' },
  { rank: 5, name: 'Sherwood CC', location: 'Thousand Oaks, CA', score: 83, lastPlayed: 'Jun 22', timesPlayed: 4, photo: '#2a2a1a' },
  { rank: 6, name: 'Northgate Golf Club', location: 'San Diego, CA', score: 71, lastPlayed: 'Mar 22', timesPlayed: 28, photo: '#1a2a1a' },
];

export const HEAD_TO_HEAD = {
  courseA: { name: 'Riviera CC', location: 'Pacific Palisades, CA', yourScore: 77, played: 'Jul 12', currentRank: 2 },
  courseB: { name: 'Pelican Hill', location: 'Newport Coast, CA', yourScore: 82, played: 'Jul 5', currentRank: 4 },
  comparison: 1,
  totalComparisons: 5,
};

export const COMMUNITY_RANKINGS = [
  { rank: 1, name: 'Pebble Beach GL', location: 'Pebble Beach, CA', communityScore: 96, ratings: 1243, friendsRank: 1 },
  { rank: 2, name: 'Augusta National GC', location: 'Augusta, GA', communityScore: 95, ratings: 892, friendsRank: null },
  { rank: 3, name: 'Cypress Point Club', location: 'Pebble Beach, CA', communityScore: 94, ratings: 421, friendsRank: null },
  { rank: 4, name: 'Riviera CC', location: 'Pacific Palisades, CA', communityScore: 92, ratings: 1876, friendsRank: 2 },
  { rank: 5, name: 'Torrey Pines South', location: 'La Jolla, CA', communityScore: 89, ratings: 3241, friendsRank: 3 },
];

// ── ACHIEVEMENTS / BADGES ─────────────────────────────────────────────────
export const BADGE_CATEGORIES = [
  {
    name: 'Scoring Milestones', badges: [
      { id: 'birdie10', name: 'Birdie Starter', desc: '10 birdies', icon: '🐦', earned: true, earnedDate: 'Mar 2026', tier: 'bronze' },
      { id: 'birdie25', name: 'Birdie Machine', desc: '25 birdies', icon: '🐦', earned: true, earnedDate: 'Jun 2026', tier: 'silver' },
      { id: 'birdie50', name: 'Birdie King', desc: '50 birdies', icon: '🐦', earned: false, progress: 31, total: 50, tier: 'gold' },
      { id: 'eagle10', name: 'Eagle Eye', desc: '10 eagles', icon: '🦅', earned: false, progress: 2, total: 10, tier: 'gold' },
      { id: 'break80', name: 'Break 80', desc: 'Shoot under 80', icon: '🔥', earned: true, earnedDate: 'Feb 2026', tier: 'gold' },
      { id: 'break90', name: 'Break 90', desc: 'Shoot under 90', icon: '✅', earned: true, earnedDate: 'Jan 2025', tier: 'silver' },
    ]
  },
  {
    name: 'Rounds Played', badges: [
      { id: 'rounds5', name: 'First Five', desc: '5 rounds logged', icon: '⛳', earned: true, earnedDate: 'Apr 2025', tier: 'bronze' },
      { id: 'rounds25', name: 'Regular', desc: '25 rounds logged', icon: '🏌️', earned: true, earnedDate: 'Aug 2025', tier: 'silver' },
      { id: 'rounds50', name: 'Devoted', desc: '50 rounds logged', icon: '📅', earned: false, progress: 34, total: 50, tier: 'gold' },
      { id: 'rounds100', name: 'Century Club', desc: '100 rounds logged', icon: '💯', earned: false, progress: 34, total: 100, tier: 'platinum' },
    ]
  },
  {
    name: 'Course Explorer', badges: [
      { id: 'courses5', name: 'Explorer', desc: '5 courses played', icon: '🗺', earned: true, earnedDate: 'May 2025', tier: 'bronze' },
      { id: 'courses10', name: 'Wanderer', desc: '10 courses played', icon: '✈️', earned: true, earnedDate: 'Dec 2025', tier: 'silver' },
      { id: 'courses25', name: 'Road Warrior', desc: '25 courses played', icon: '🌎', earned: false, progress: 18, total: 25, tier: 'gold' },
      { id: 'scout', name: 'The Scout', desc: '3 course reviews', icon: '🔍', earned: false, progress: 2, total: 3, tier: 'silver' },
    ]
  },
  {
    name: 'Social & Special', badges: [
      { id: 'holeinone', name: 'Hole in One', desc: 'Ace a hole', icon: '🎯', earned: false, progress: 0, total: 1, tier: 'legendary' },
      { id: 'firsttee', name: 'First Tee', desc: 'Log your first round', icon: '🏁', earned: true, earnedDate: 'Mar 2025', tier: 'bronze' },
      { id: 'golfwfriends', name: 'Better Together', desc: 'Play with a friend', icon: '👥', earned: true, earnedDate: 'May 2025', tier: 'bronze' },
      { id: 'alphawolf', name: 'Alpha Wolf', desc: 'Win a group wager', icon: '🐺', earned: true, earnedDate: 'Jun 2026', tier: 'silver' },
    ]
  },
];

export const CLOSE_TO_ACHIEVING = [
  { id: 'scout', name: 'The Scout', desc: '3 course reviews', icon: '🔍', progress: 2, total: 3, remaining: 1, pct: 67, tier: 'silver' },
  { id: 'birdie50', name: 'Birdie King', desc: '50 birdies total', icon: '🐦', progress: 31, total: 50, remaining: 19, pct: 62, tier: 'gold' },
  { id: 'courses25', name: 'Road Warrior', desc: '25 courses played', icon: '🌎', progress: 18, total: 25, remaining: 7, pct: 72, tier: 'gold' },
  { id: 'rounds50', name: 'Devoted', desc: '50 rounds logged', icon: '📅', progress: 34, total: 50, remaining: 16, pct: 68, tier: 'gold' },
];

export const UNLOCK_BADGE = {
  id: 'alphawolf', name: 'Alpha Wolf', desc: 'Win a group wager', icon: '🐺',
  tier: 'silver', earnedDate: 'Today',
  message: 'You dominated the Nassau. The bag pays for itself.',
};

// ── ANALYTICS DASHBOARD ────────────────────────────────────────────────────
export const ANALYTICS = {
  period: 'Last 30 Days',
  northStar: {
    totalRounds: { value: 12847, change: 23, label: 'Rounds Tracked' },
    mau: { value: 3421, change: 15, label: 'Monthly Active Users' },
    roundsPerUser: { value: 3.8, change: -5, label: 'Rounds / Active User' },
    activeCaddies: { value: 1318, change: 28, label: 'Active Caddies' },
    ghinUsers: { value: 847, pct: 24.8, change: 12, label: 'GHIN Integrated' },
  },
  deviceSplit: [
    { label: 'Mobile Only', value: 53, count: 1812, color: '#4a9fd5' },
    { label: 'Caddie Only', value: 37, count: 1265, color: '#e8341c' },
    { label: 'Multi-Device', value: 10, count: 344, color: '#f07428' },
  ],
  activationFunnel: [
    { label: 'New Signups', value: 1000, pct: 100 },
    { label: 'Completed Onboarding', value: 891, pct: 89 },
    { label: 'First Round Tracked', value: 643, pct: 64 },
    { label: 'Second Round', value: 457, pct: 46 },
  ],
  cohortRetention: [
    { month: 'Jan 2026', signups: 342, d30: 67, d90: 48, active: 41 },
    { month: 'Feb 2026', signups: 521, d30: 72, d90: 52, active: 47 },
    { month: 'Mar 2026', signups: 689, d30: 69, d90: 51, active: null },
    { month: 'Apr 2026', signups: 834, d30: 71, d90: null, active: null },
  ],
  featureAdoption: [
    { feature: 'GPS Navigation', pct: 94, color: '#4ade80' },
    { feature: 'Score Tracking', pct: 87, color: '#4ade80' },
    { feature: 'GHIN Integration', pct: 25, color: '#f07428' },
    { feature: 'Advanced Stats', pct: 31, color: '#f07428' },
    { feature: 'Group / Multiplayer', pct: 18, color: '#e8341c' },
    { feature: 'Games / Challenges', pct: 12, color: '#e8341c' },
  ],
  syncHealth: {
    avg: 2.1, last24h: 43, last48h: 65, last7d: 89, inactive30d: 8,
  },
};
