import { useState } from 'react';
import { Trophy, Clock, Users, Calendar, Award, TrendingUp, Zap, Star, Medal, Crown } from 'lucide-react';

interface Contest {
  id: number;
  title: string;
  type: 'Weekly' | 'Biweekly' | 'Monthly' | 'Special';
  startTime: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'live' | 'completed';
  prizes: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const contests: Contest[] = [
  {
    id: 1,
    title: 'Weekly Contest 372',
    type: 'Weekly',
    startTime: '2025-11-30 10:30 AM',
    duration: '1h 30m',
    participants: 15234,
    status: 'upcoming',
    prizes: ['Gold Badge', '500 Points', 'Featured Profile'],
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    title: 'Biweekly Contest 120',
    type: 'Biweekly',
    startTime: '2025-12-01 02:30 PM',
    duration: '1h 30m',
    participants: 12891,
    status: 'upcoming',
    prizes: ['Silver Badge', '300 Points'],
    difficulty: 'Advanced',
  },
  {
    id: 3,
    title: 'Monthly Challenge December',
    type: 'Monthly',
    startTime: '2025-12-01',
    duration: '30 days',
    participants: 28456,
    status: 'live',
    prizes: ['Legendary Badge', '1000 Points', 'Premium Access'],
    difficulty: 'Expert',
  },
  {
    id: 4,
    title: 'Holiday Code Sprint',
    type: 'Special',
    startTime: '2025-12-24 12:00 PM',
    duration: '3 hours',
    participants: 8234,
    status: 'upcoming',
    prizes: ['Exclusive Badge', '800 Points', 'Swag Pack'],
    difficulty: 'Intermediate',
  },
];

const pastContests = [
  {
    id: 101,
    title: 'Weekly Contest 371',
    rank: 127,
    participants: 14532,
    score: 18,
    rating: '+45',
    problems: 4,
    date: '2025-11-23',
  },
  {
    id: 102,
    title: 'Biweekly Contest 119',
    rank: 89,
    participants: 11234,
    score: 21,
    rating: '+67',
    problems: 4,
    date: '2025-11-17',
  },
  {
    id: 103,
    title: 'Weekly Contest 370',
    rank: 234,
    participants: 13876,
    score: 15,
    rating: '+12',
    problems: 3,
    date: '2025-11-16',
  },
];

export function Contests() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'rankings'>('upcoming');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-400/10 border border-green-400/30 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Live Now</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="px-3 py-1.5 bg-blue-400/10 border border-blue-400/30 rounded-lg">
            <span className="text-blue-400 text-sm">Upcoming</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Expert':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Contests</h1>
        <p className="text-gray-400">Compete with coders worldwide and climb the rankings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Contest Rating</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl mb-1">1845</div>
          <div className="text-sm text-green-400">+45 this week</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Contests Joined</span>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl mb-1">23</div>
          <div className="text-sm text-gray-400">8 this month</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Best Rank</span>
            <Medal className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl mb-1">#12</div>
          <div className="text-sm text-gray-400">Weekly Contest 365</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Points</span>
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl mb-1">3,420</div>
          <div className="text-sm text-gray-400">From contests</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 mb-8">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'upcoming'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Upcoming Contests
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'past'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            My Participation
          </button>
          <button
            onClick={() => setActiveTab('rankings')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'rankings'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Contest Rankings
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className={`bg-[#121212] border rounded-xl p-6 hover:border-purple-500/50 transition-all ${
                contest.status === 'live'
                  ? 'border-green-400/30 bg-gradient-to-br from-green-500/5 to-transparent'
                  : 'border-gray-800'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2">{contest.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    {getStatusBadge(contest.status)}
                    <span className={`px-3 py-1 rounded-lg border text-sm ${getDifficultyColor(contest.difficulty)}`}>
                      {contest.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300">
                      {contest.type}
                    </span>
                  </div>
                </div>
                <Trophy className={`w-8 h-8 ${contest.status === 'live' ? 'text-green-400' : 'text-purple-400'}`} />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{contest.startTime}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {contest.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{contest.participants.toLocaleString()} registered</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Prizes:</div>
                <div className="flex flex-wrap gap-2">
                  {contest.prizes.map((prize, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300">
                      {prize}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  contest.status === 'live'
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
              >
                {contest.status === 'live' ? (
                  <>
                    <Zap className="w-5 h-5" />
                    Join Now
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    Register
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'past' && (
        <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-xl">Contest History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-400">Contest</th>
                  <th className="px-6 py-3 text-left text-gray-400">Rank</th>
                  <th className="px-6 py-3 text-left text-gray-400">Score</th>
                  <th className="px-6 py-3 text-left text-gray-400">Problems Solved</th>
                  <th className="px-6 py-3 text-left text-gray-400">Rating Change</th>
                  <th className="px-6 py-3 text-left text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {pastContests.map((contest) => (
                  <tr
                    key={contest.id}
                    className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-purple-400" />
                        <span>{contest.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400">#{contest.rank}</span>
                        <span className="text-gray-500 text-sm">/ {contest.participants.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{contest.score}</td>
                    <td className="px-6 py-4 text-gray-400">{contest.problems}/4</td>
                    <td className="px-6 py-4">
                      <span className="text-green-400">{contest.rating}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{contest.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rankings' && (
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-8 text-center">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl mb-2">Contest Rankings</h3>
          <p className="text-gray-400 mb-6">
            Contest-specific rankings will appear here after each contest
          </p>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">
            View Global Rankings
          </button>
        </div>
      )}
    </div>
  );
}
