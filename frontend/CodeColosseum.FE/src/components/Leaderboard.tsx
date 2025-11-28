import { Trophy, Medal, TrendingUp, Zap, Crown } from 'lucide-react';
import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  solved: number;
  streak: number;
  trend: 'up' | 'down' | 'same';
  trendChange: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: 'CodeMaster_2024', avatar: 'CM', score: 15420, solved: 523, streak: 47, trend: 'same', trendChange: 0 },
  { rank: 2, username: 'AlgoQueen', avatar: 'AQ', score: 14890, solved: 501, streak: 32, trend: 'up', trendChange: 2 },
  { rank: 3, username: 'DevNinja', avatar: 'DN', score: 14125, solved: 487, streak: 28, trend: 'down', trendChange: 1 },
  { rank: 4, username: 'BinaryBeast', avatar: 'BB', score: 13750, solved: 465, streak: 21, trend: 'up', trendChange: 1 },
  { rank: 5, username: 'StackOverflow', avatar: 'SO', score: 13420, solved: 452, streak: 15, trend: 'same', trendChange: 0 },
  { rank: 6, username: 'PyThonPro', avatar: 'PP', score: 12980, solved: 441, streak: 19, trend: 'up', trendChange: 3 },
  { rank: 7, username: 'JavaJunkie', avatar: 'JJ', score: 12675, solved: 428, streak: 12, trend: 'down', trendChange: 2 },
  { rank: 8, username: 'RustRanger', avatar: 'RR', score: 12340, solved: 415, streak: 25, trend: 'up', trendChange: 1 },
  { rank: 9, username: 'GoGopher', avatar: 'GG', score: 11890, solved: 402, streak: 8, trend: 'same', trendChange: 0 },
  { rank: 10, username: 'CppChampion', avatar: 'CC', score: 11560, solved: 395, streak: 16, trend: 'up', trendChange: 2 },
];

export function Leaderboard() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-400 w-6 text-center">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'same', change: number) => {
    if (trend === 'same') return <span className="text-gray-500">—</span>;
    if (trend === 'up') {
      return (
        <div className="flex items-center gap-1 text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs">+{change}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-red-400">
        <TrendingUp className="w-4 h-4 rotate-180" />
        <span className="text-xs">-{change}</span>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">Global Leaderboard</h1>
            <p className="text-gray-400">Real-time rankings updated every minute</p>
          </div>

          <div className="flex items-center gap-2 bg-[#121212] border border-gray-800 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === 'daily' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === 'weekly' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === 'monthly' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange('alltime')}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === 'alltime' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Top Score</span>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl">15,420</div>
            <div className="text-sm text-gray-400 mt-1">CodeMaster_2024</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Active Users</span>
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl">2,847</div>
            <div className="text-sm text-gray-400 mt-1">+127 this hour</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Solutions Today</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl">8,432</div>
            <div className="text-sm text-gray-400 mt-1">+15% from yesterday</div>
          </div>
        </div>
      </div>

      <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-xl">Top Performers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400">Rank</th>
                <th className="px-6 py-3 text-left text-gray-400">User</th>
                <th className="px-6 py-3 text-left text-gray-400">Score</th>
                <th className="px-6 py-3 text-left text-gray-400">Problems Solved</th>
                <th className="px-6 py-3 text-left text-gray-400">Streak</th>
                <th className="px-6 py-3 text-left text-gray-400">Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, idx) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-gray-800 hover:bg-gray-900/50 transition-colors ${
                    idx < 3 ? 'bg-gradient-to-r from-purple-500/5 to-transparent' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                        idx === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                        idx === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                        idx === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-800' :
                        'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {entry.avatar}
                      </div>
                      <span>{entry.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-purple-400">{entry.score.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {entry.solved}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400">{entry.streak} days</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getTrendIcon(entry.trend, entry.trendChange)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-800 px-6 py-4 bg-[#0a0a0a]">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>Your Rank: #127 (+5 this week)</div>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              View Full Rankings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
