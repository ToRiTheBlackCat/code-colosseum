import { useState, useEffect } from "react";
import {
  Trophy,
  Clock,
  Users,
  Zap,
  CheckCircle2,
  Code2,
  Flame,
  Award,
  Medal,
  Crown,
} from "lucide-react";

interface Participant {
  id: number;
  username: string;
  avatar: string;
  rank: number;
  score: number;
  problemsSolved: number;
  currentProblem: string | null;
  lastSubmission: string;
}

interface ContestRoomProps {
  contestId: number;
  onExit: () => void;
}

export function ContestRoom({ contestId, onExit }: ContestRoomProps) {
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      username: "CodeMaster",
      avatar: "CM",
      rank: 1,
      score: 18,
      problemsSolved: 4,
      currentProblem: "Problem 4",
      lastSubmission: "2m ago",
    },
    {
      id: 2,
      username: "AlgoWizard",
      avatar: "AW",
      rank: 2,
      score: 16,
      problemsSolved: 3,
      currentProblem: "Problem 4",
      lastSubmission: "1m ago",
    },
    {
      id: 3,
      username: "JohnDoe",
      avatar: "JD",
      rank: 3,
      score: 15,
      problemsSolved: 3,
      currentProblem: "Problem 3",
      lastSubmission: "30s ago",
    },
    {
      id: 4,
      username: "ByteNinja",
      avatar: "BN",
      rank: 4,
      score: 12,
      problemsSolved: 2,
      currentProblem: "Problem 3",
      lastSubmission: "5m ago",
    },
    {
      id: 5,
      username: "DataGuru",
      avatar: "DG",
      rank: 5,
      score: 12,
      problemsSolved: 2,
      currentProblem: "Problem 4",
      lastSubmission: "3m ago",
    },
    {
      id: 6,
      username: "StackOverflow",
      avatar: "SO",
      rank: 6,
      score: 10,
      problemsSolved: 2,
      currentProblem: "Problem 2",
      lastSubmission: "8m ago",
    },
    {
      id: 7,
      username: "DevQueen",
      avatar: "DQ",
      rank: 7,
      score: 8,
      problemsSolved: 1,
      currentProblem: "Problem 3",
      lastSubmission: "4m ago",
    },
    {
      id: 8,
      username: "PyCharm",
      avatar: "PC",
      rank: 8,
      score: 7,
      problemsSolved: 1,
      currentProblem: "Problem 2",
      lastSubmission: "6m ago",
    },
  ]);

  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", points: 3, solved: 245 },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      points: 4,
      solved: 189,
    },
    {
      id: 3,
      title: "Longest Substring",
      difficulty: "Medium",
      points: 5,
      solved: 127,
    },
    {
      id: 4,
      title: "Merge K Lists",
      difficulty: "Hard",
      points: 8,
      solved: 45,
    },
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) => {
        const updated = [...prev];
        const randomIdx = Math.floor(Math.random() * updated.length);
        const participant = updated[randomIdx];

        // Randomly update participant
        if (Math.random() > 0.5) {
          participant.score += Math.floor(Math.random() * 3);
          participant.problemsSolved = Math.min(
            participant.problemsSolved + 1,
            4
          );
          participant.currentProblem = `Problem ${
            Math.floor(Math.random() * 4) + 1
          }`;
          participant.lastSubmission = "Just now";
        }

        // Re-sort by score
        updated.sort((a, b) => b.score - a.score);
        updated.forEach((p, idx) => (p.rank = idx + 1));

        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Contest Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-b border-purple-500/20 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl">Weekly Contest 372</h1>
                  <div className="text-sm text-gray-400">Live Competition</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">Live</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-[#121212] border border-gray-800 rounded-xl">
                <Clock className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-sm text-gray-400">Time Left</div>
                  <div
                    className={`text-2xl tabular-nums ${
                      timeLeft < 300
                        ? "text-red-400 animate-pulse"
                        : "text-white"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-[#121212] border border-gray-800 rounded-xl">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">Participants</div>
                  <div className="text-2xl">15,234</div>
                </div>
              </div>

              <button
                onClick={onExit}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
              >
                Exit Contest
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problems List */}
          <div className="lg:col-span-2">
            <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
              <div className="border-b border-gray-800 px-6 py-4 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                <h2 className="text-xl flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  Contest Problems
                </h2>
              </div>

              <div className="divide-y divide-gray-800">
                {problems.map((problem) => {
                  const getDifficultyColor = (diff: string) => {
                    switch (diff) {
                      case "Easy":
                        return "text-green-400 bg-green-400/10 border-green-400/20";
                      case "Medium":
                        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
                      case "Hard":
                        return "text-red-400 bg-red-400/10 border-red-400/20";
                      default:
                        return "";
                    }
                  };

                  return (
                    <div
                      key={problem.id}
                      className="p-6 hover:bg-gray-900/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl group-hover:bg-purple-500/20 transition-all">
                            {problem.id}
                          </div>
                          <div>
                            <h3 className="text-lg mb-1 group-hover:text-purple-400 transition-colors">
                              {problem.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm">
                              <span
                                className={`px-3 py-1 rounded-lg border ${getDifficultyColor(
                                  problem.difficulty
                                )}`}
                              >
                                {problem.difficulty}
                              </span>
                              <span className="text-gray-400">
                                {problem.points} points
                              </span>
                              <span className="text-gray-500">
                                {problem.solved} solved
                              </span>
                            </div>
                          </div>
                        </div>

                        <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          Solve
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden sticky top-24">
              <div className="border-b border-gray-800 px-6 py-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
                <h2 className="text-xl flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Live Leaderboard
                </h2>
              </div>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {participants.map((participant, idx) => (
                  <div
                    key={participant.id}
                    className={`p-4 border-b border-gray-800 transition-all ${
                      participant.lastSubmission === "Just now"
                        ? "bg-gradient-to-r from-green-500/10 to-transparent animate-pulse"
                        : idx % 2 === 0
                        ? "bg-gray-900/30"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(participant.rank) || (
                          <span className="text-gray-400">
                            #{participant.rank}
                          </span>
                        )}
                      </div>

                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm ${
                          participant.lastSubmission === "Just now"
                            ? "ring-2 ring-green-400"
                            : ""
                        }`}
                      >
                        {participant.avatar}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              participant.username === "JohnDoe"
                                ? "text-purple-400"
                                : ""
                            }
                          >
                            {participant.username}
                          </span>
                          {participant.username === "JohnDoe" && (
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {participant.currentProblem
                            ? `Working on ${participant.currentProblem}`
                            : "Idle"}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg">{participant.score}</div>
                        <div className="text-xs text-gray-400">
                          {participant.problemsSolved}/4
                        </div>
                      </div>
                    </div>

                    {participant.lastSubmission === "Just now" && (
                      <div className="flex items-center gap-2 text-xs text-green-400 ml-11">
                        <Zap className="w-3 h-3" />
                        Just submitted!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
