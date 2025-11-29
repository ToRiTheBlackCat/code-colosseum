import { X, Trophy, Target, Flame, TrendingUp, Award, Crown, Star, Medal, CheckCircle2, Code2 } from 'lucide-react';

interface UserProfileModalProps {
  userId: number;
  onClose: () => void;
}

export function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  // Mock user data
  const user = {
    username: 'CodeMaster',
    displayName: 'Alex Johnson',
    avatar: 'CM',
    rank: 1,
    totalSolved: 487,
    easyCompleted: 198,
    mediumCompleted: 215,
    hardCompleted: 74,
    currentStreak: 127,
    maxStreak: 189,
    reputation: 15742,
    contestRating: 2145,
    acceptanceRate: 82.3,
    joinedDate: 'January 2024',
    badges: [
      { name: 'Legendary Coder', icon: Crown, color: 'from-yellow-400 to-orange-500', rarity: 'Legendary' },
      { name: '100 Day Streak', icon: Flame, color: 'from-orange-500 to-red-500', rarity: 'Legendary' },
      { name: 'Contest Champion', icon: Trophy, color: 'from-purple-500 to-pink-500', rarity: 'Epic' },
      { name: 'Speed Demon', icon: Star, color: 'from-yellow-500 to-orange-500', rarity: 'Epic' },
      { name: 'Algorithm Master', icon: Award, color: 'from-blue-500 to-cyan-500', rarity: 'Rare' },
      { name: 'Problem Solver', icon: CheckCircle2, color: 'from-green-500 to-emerald-500', rarity: 'Rare' },
    ],
    recentActivity: [
      { problem: 'Median of Two Sorted Arrays', difficulty: 'Hard', status: 'Accepted', time: '1h ago' },
      { problem: 'LRU Cache', difficulty: 'Medium', status: 'Accepted', time: '3h ago' },
      { problem: 'Trapping Rain Water', difficulty: 'Hard', status: 'Accepted', time: '5h ago' },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#0a0a0a] border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-b border-purple-500/20 p-8 backdrop-blur-lg">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-800 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                {user.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                <Crown className="w-5 h-5 text-gray-900" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl">{user.displayName}</h2>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
                  @{user.username}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Global Rank #{user.rank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>Rating: {user.contestRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span>{user.reputation} Rep</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">Joined {user.joinedDate}</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Total Solved</div>
              <div className="text-2xl">{user.totalSolved}</div>
              <div className="text-xs text-green-400 mt-1">Top 1%</div>
            </div>

            <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Streak</div>
              <div className="text-2xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                {user.currentStreak}
              </div>
              <div className="text-xs text-gray-500 mt-1">Max: {user.maxStreak}</div>
            </div>

            <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Acceptance</div>
              <div className="text-2xl">{user.acceptanceRate}%</div>
              <div className="text-xs text-blue-400 mt-1">Excellent</div>
            </div>

            <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Contest Rating</div>
              <div className="text-2xl text-purple-400">{user.contestRating}</div>
              <div className="text-xs text-green-400 mt-1">+45 this week</div>
            </div>
          </div>

          {/* Problems Progress */}
          <div className="mb-8">
            <h3 className="text-xl mb-4">Problems Solved</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <span>Easy</span>
                  </div>
                  <span className="text-gray-400">{user.easyCompleted}/300</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all"
                    style={{ width: `${(user.easyCompleted / 300) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span>Medium</span>
                  </div>
                  <span className="text-gray-400">{user.mediumCompleted}/700</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${(user.mediumCompleted / 700) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <span>Hard</span>
                  </div>
                  <span className="text-gray-400">{user.hardCompleted}/400</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-full transition-all"
                    style={{ width: `${(user.hardCompleted / 400) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="text-xl mb-4">Badges & Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {user.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-[#121212] border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-all"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-2`}>
                    <badge.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm mb-1">{badge.name}</div>
                  <div className="text-xs text-gray-500">{badge.rarity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {user.recentActivity.map((activity, idx) => {
                const getDiffColor = (diff: string) => {
                  switch (diff) {
                    case 'Easy': return 'text-green-400';
                    case 'Medium': return 'text-yellow-400';
                    case 'Hard': return 'text-red-400';
                    default: return 'text-gray-400';
                  }
                };

                return (
                  <div
                    key={idx}
                    className="bg-[#121212] border border-gray-800 rounded-lg p-4 flex items-center justify-between hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="mb-1">{activity.problem}</div>
                        <div className={`text-sm ${getDiffColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
