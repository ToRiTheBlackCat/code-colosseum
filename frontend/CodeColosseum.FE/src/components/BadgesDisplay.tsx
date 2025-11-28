import { Award, Trophy, Flame, Zap, Crown, Star, Target, Code2, Calendar, TrendingUp, Medal, Gift, Heart, Rocket } from 'lucide-react';

export function BadgesDisplay() {
  const badges = [
    {
      id: 1,
      name: '100 Day Streak',
      description: 'Maintained a 100-day solving streak',
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      rarity: 'Legendary',
      unlocked: true,
      unlockedDate: '2025-11-15',
      progress: 100,
    },
    {
      id: 2,
      name: 'Speed Demon',
      description: 'Solved 10 problems in under 1 hour',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      rarity: 'Epic',
      unlocked: true,
      unlockedDate: '2025-10-28',
      progress: 100,
    },
    {
      id: 3,
      name: 'Contest Champion',
      description: 'Won 1st place in a weekly contest',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      rarity: 'Legendary',
      unlocked: true,
      unlockedDate: '2025-11-01',
      progress: 100,
    },
    {
      id: 4,
      name: 'Algorithm Master',
      description: 'Solved all hard problems in a category',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      rarity: 'Epic',
      unlocked: true,
      unlockedDate: '2025-09-12',
      progress: 100,
    },
    {
      id: 5,
      name: 'Early Bird',
      description: 'Solved problems before 6 AM for 7 days',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      rarity: 'Rare',
      unlocked: true,
      unlockedDate: '2025-08-05',
      progress: 100,
    },
    {
      id: 6,
      name: 'Perfect Week',
      description: 'Solved at least one problem every day for a week',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      rarity: 'Rare',
      unlocked: true,
      unlockedDate: '2025-11-20',
      progress: 100,
    },
    {
      id: 7,
      name: 'Problem Hoarder',
      description: 'Solve 500 total problems',
      icon: Target,
      color: 'from-red-500 to-pink-500',
      rarity: 'Epic',
      unlocked: false,
      progress: 49,
      required: 500,
      current: 245,
    },
    {
      id: 8,
      name: 'Rising Star',
      description: 'Reach top 100 in global rankings',
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-400',
      rarity: 'Legendary',
      unlocked: false,
      progress: 78,
      required: 100,
      current: 127,
    },
    {
      id: 9,
      name: 'Code Mentor',
      description: 'Help 50 users with solutions',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      rarity: 'Epic',
      unlocked: false,
      progress: 32,
      required: 50,
      current: 16,
    },
    {
      id: 10,
      name: 'Rocket Launch',
      description: 'Achieve 2000+ contest rating',
      icon: Rocket,
      color: 'from-blue-400 to-purple-400',
      rarity: 'Legendary',
      unlocked: false,
      progress: 92,
      required: 2000,
      current: 1845,
    },
    {
      id: 11,
      name: 'Triple Crown',
      description: 'Win 3 consecutive contests',
      icon: Medal,
      color: 'from-yellow-500 to-orange-600',
      rarity: 'Legendary',
      unlocked: false,
      progress: 33,
      required: 3,
      current: 1,
    },
    {
      id: 12,
      name: 'Generous Giver',
      description: 'Give 100 helpful votes',
      icon: Gift,
      color: 'from-green-400 to-teal-400',
      rarity: 'Rare',
      unlocked: false,
      progress: 67,
      required: 100,
      current: 67,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'Rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Total Badges</div>
          <div className="text-3xl">{unlockedBadges.length}/{badges.length}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Legendary</div>
          <div className="text-3xl text-yellow-400">
            {unlockedBadges.filter(b => b.rarity === 'Legendary').length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Recent Badge</div>
          <div className="text-sm text-blue-400 mt-2">100 Day Streak</div>
        </div>
      </div>

      {/* Unlocked Badges */}
      <div>
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Unlocked Badges ({unlockedBadges.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-[#121212] border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg">{badge.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{badge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-lg border text-xs ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </span>
                    <span className="text-xs text-gray-500">
                      {badge.unlockedDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-gray-400" />
          Locked Badges ({lockedBadges.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-[#121212] border border-gray-800 rounded-xl p-6 opacity-75 hover:opacity-100 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 relative">
                  <badge.icon className="w-8 h-8 text-gray-600" />
                  <div className="absolute inset-0 bg-gray-900/50 rounded-xl backdrop-blur-sm" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2 text-gray-300">{badge.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{badge.description}</p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{badge.current}/{badge.required}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg border text-xs ${getRarityColor(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
