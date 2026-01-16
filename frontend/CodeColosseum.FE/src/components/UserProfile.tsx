import { useState } from "react";
import {
  Calendar,
  Flame,
  Award,
  TrendingUp,
  Code2,
  Target,
  Clock,
  CheckCircle2,
  Zap,
  Crown,
  Star,
  Gift,
  Trophy,
  Medal,
  Settings,
  LogOut,
} from "lucide-react";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { SkillsRadar } from "./SkillsRadar";
import { BadgesDisplay } from "./BadgesDisplay";
import { DailyCheckIn } from "./DailyCheckIn";
import { RecentSubmissions } from "./RecentSubmissions";
import { EditProfile } from "./EditProfile";
import { PetDisplay } from "./PetDisplay";
import { type Pet } from "./PetSystem";

interface UserProfileProps {
  onSignOut?: () => void;
}

export function UserProfile({ onSignOut }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "submissions" | "badges"
  >("overview");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [userData, setUserData] = useState({
    username: "JohnDoe",
    displayName: "John Doe",
    email: "johndoe@example.com",
    avatar: "",
    bio: "Passionate software engineer | Competitive programmer | Love solving algorithmic challenges",
  });

  // Demo pet data - in production, this would come from user's actual pet
  const [userPet] = useState<Pet | null>({
    id: "demo-pet",
    type: "dragon",
    name: "Code Dragon",
    stage: "child",
    level: 5,
    experience: 350,
    hunger: 75,
    happiness: 85,
    bondLevel: 60,
    acquiredDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastFed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    evolutionProgress: 70,
  });

  const userStats = {
    rank: 127,
    totalSolved: 245,
    totalProblems: 1250,
    easyCompleted: 98,
    mediumCompleted: 112,
    hardCompleted: 35,
    currentStreak: 47,
    maxStreak: 89,
    reputation: 8432,
    contestRating: 1845,
    acceptanceRate: 68.5,
    totalSubmissions: 1247,
  };

  const recentActivity = [
    { date: "2025-11-28", count: 5 },
    { date: "2025-11-27", count: 8 },
    { date: "2025-11-26", count: 3 },
    { date: "2025-11-25", count: 12 },
    { date: "2025-11-24", count: 7 },
  ];

  const handleSaveProfile = (updatedData: any) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setShowEditProfile(false);
    // Show success message (you can add a toast notification here)
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                  {userData.displayName[0]?.toUpperCase() || "J"}
                  {userData.displayName.split(" ")[1]?.[0]?.toUpperCase() ||
                    "D"}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                <Crown className="w-5 h-5 text-gray-900" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl">{userData.displayName}</h1>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
                  @{userData.username}
                </span>
              </div>
              <p className="text-gray-400 mb-3 max-w-2xl">{userData.bio}</p>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Global Rank #{userStats.rank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>Contest Rating: {userStats.contestRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span>{userStats.reputation} Reputation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowEditProfile(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <DailyCheckIn streak={userStats.currentStreak} />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">Total Solved</span>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl mb-1">{userStats.totalSolved}</div>
          <div className="text-sm text-gray-400">
            {Math.round(
              (userStats.totalSolved / userStats.totalProblems) * 100
            )}
            % of all problems
          </div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">Current Streak</span>
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl mb-1">{userStats.currentStreak} days</div>
          <div className="text-sm text-gray-400">
            Max: {userStats.maxStreak} days
          </div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">Acceptance Rate</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl mb-1">{userStats.acceptanceRate}%</div>
          <div className="text-sm text-gray-400">
            {userStats.totalSubmissions} submissions
          </div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">Contest Rating</span>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl mb-1">{userStats.contestRating}</div>
          <div className="text-sm text-gray-400">Top 15% globally</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 mb-8">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === "overview"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === "submissions"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Recent Submissions
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === "badges"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Badges & Achievements
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Problems Progress */}
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl mb-6">Problems Solved</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <span>Easy</span>
                    </div>
                    <span className="text-gray-400">
                      {userStats.easyCompleted}/250
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-full transition-all"
                      style={{
                        width: `${(userStats.easyCompleted / 250) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <span>Medium</span>
                    </div>
                    <span className="text-gray-400">
                      {userStats.mediumCompleted}/650
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{
                        width: `${(userStats.mediumCompleted / 650) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <span>Hard</span>
                    </div>
                    <span className="text-gray-400">
                      {userStats.hardCompleted}/350
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full transition-all"
                      style={{
                        width: `${(userStats.hardCompleted / 350) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl mb-6">Activity</h2>
              <ActivityHeatmap />
            </div>

            {/* Skills Radar */}
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl mb-6">Skills Breakdown</h2>
              <SkillsRadar />
            </div>
          </div>

          <div className="space-y-8">
            {/* Pet Companion */}
            {userPet && (
              <div className="mb-8">
                <PetDisplay pet={userPet} compact={true} />
              </div>
            )}

            {/* Featured Badges */}
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Featured Badges</h2>
                <button
                  onClick={() => setActiveTab("badges")}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "100 Days",
                    icon: Calendar,
                    color: "from-orange-500 to-red-500",
                    desc: "Streak Master",
                  },
                  {
                    name: "Speed Demon",
                    icon: Zap,
                    color: "from-yellow-500 to-orange-500",
                    desc: "Fast Solver",
                  },
                  {
                    name: "Contest Winner",
                    icon: Trophy,
                    color: "from-purple-500 to-pink-500",
                    desc: "1st Place",
                  },
                  {
                    name: "Algorithm Expert",
                    icon: Award,
                    color: "from-blue-500 to-cyan-500",
                    desc: "All Hard",
                  },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center`}
                    >
                      <badge.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm mb-1">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  {
                    action: "Solved",
                    problem: "Two Sum",
                    difficulty: "Easy",
                    time: "2 hours ago",
                    color: "green",
                  },
                  {
                    action: "Attempted",
                    problem: "Median of Two Sorted Arrays",
                    difficulty: "Hard",
                    time: "5 hours ago",
                    color: "yellow",
                  },
                  {
                    action: "Solved",
                    problem: "Valid Parentheses",
                    difficulty: "Easy",
                    time: "1 day ago",
                    color: "green",
                  },
                  {
                    action: "Contest",
                    problem: "Weekly Contest 372",
                    difficulty: "Contest",
                    time: "2 days ago",
                    color: "purple",
                  },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-2 h-2 mt-2 rounded-full bg-${activity.color}-400`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-300">{activity.action}</span>
                        <span className="text-purple-400">
                          {activity.problem}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "submissions" && <RecentSubmissions />}

      {activeTab === "badges" && <BadgesDisplay />}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile
          currentUser={userData}
          onSave={handleSaveProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}
    </div>
  );
}
