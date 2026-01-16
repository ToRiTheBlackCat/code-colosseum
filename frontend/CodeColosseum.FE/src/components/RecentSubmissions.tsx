import { CheckCircle2, XCircle, Clock, Code2 } from "lucide-react";

interface Submission {
  id: number;
  problem: string;
  problemId: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
  runtime: string;
  memory: string;
  language: string;
  timestamp: string;
}

const submissions: Submission[] = [
  {
    id: 1,
    problem: "Two Sum",
    problemId: 1,
    difficulty: "Easy",
    status: "Accepted",
    runtime: "42ms",
    memory: "44.2 MB",
    language: "TypeScript",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    problem: "Median of Two Sorted Arrays",
    problemId: 4,
    difficulty: "Hard",
    status: "Wrong Answer",
    runtime: "-",
    memory: "-",
    language: "Python",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    problem: "Valid Parentheses",
    problemId: 9,
    difficulty: "Easy",
    status: "Accepted",
    runtime: "38ms",
    memory: "42.1 MB",
    language: "JavaScript",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    problem: "Longest Palindromic Substring",
    problemId: 5,
    difficulty: "Medium",
    status: "Time Limit Exceeded",
    runtime: "-",
    memory: "-",
    language: "Java",
    timestamp: "1 day ago",
  },
  {
    id: 5,
    problem: "Container With Most Water",
    problemId: 7,
    difficulty: "Medium",
    status: "Accepted",
    runtime: "156ms",
    memory: "58.3 MB",
    language: "C++",
    timestamp: "2 days ago",
  },
  {
    id: 6,
    problem: "Regular Expression Matching",
    problemId: 8,
    difficulty: "Hard",
    status: "Runtime Error",
    runtime: "-",
    memory: "-",
    language: "Python",
    timestamp: "2 days ago",
  },
  {
    id: 7,
    problem: "Reverse Integer",
    problemId: 6,
    difficulty: "Medium",
    status: "Accepted",
    runtime: "52ms",
    memory: "43.8 MB",
    language: "TypeScript",
    timestamp: "3 days ago",
  },
  {
    id: 8,
    problem: "Add Two Numbers",
    problemId: 2,
    difficulty: "Medium",
    status: "Accepted",
    runtime: "68ms",
    memory: "48.2 MB",
    language: "JavaScript",
    timestamp: "3 days ago",
  },
];

export function RecentSubmissions() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      default:
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "text-green-400";
      case "Wrong Answer":
        return "text-red-400";
      case "Time Limit Exceeded":
        return "text-orange-400";
      case "Runtime Error":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const stats = {
    totalSubmissions: submissions.length,
    accepted: submissions.filter((s) => s.status === "Accepted").length,
    acceptanceRate: Math.round(
      (submissions.filter((s) => s.status === "Accepted").length /
        submissions.length) *
        100
    ),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Total Submissions</div>
          <div className="text-3xl">{stats.totalSubmissions}</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Accepted</div>
          <div className="text-3xl text-green-400">{stats.accepted}</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Acceptance Rate</div>
          <div className="text-3xl text-purple-400">
            {stats.acceptanceRate}%
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-xl">Submission History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-gray-400">Problem</th>
                <th className="px-6 py-3 text-left text-gray-400">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-gray-400">Language</th>
                <th className="px-6 py-3 text-left text-gray-400">Runtime</th>
                <th className="px-6 py-3 text-left text-gray-400">Memory</th>
                <th className="px-6 py-3 text-left text-gray-400">Time</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(submission.status)}
                      <span className={getStatusColor(submission.status)}>
                        {submission.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{submission.problemId}.</span>
                      <span className="hover:text-purple-400 transition-colors cursor-pointer">
                        {submission.problem}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getDifficultyColor(submission.difficulty)}>
                      {submission.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {submission.language}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {submission.runtime}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {submission.memory}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {submission.timestamp}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
