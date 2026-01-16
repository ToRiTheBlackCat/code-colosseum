import { useState } from "react";
import {
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { CodeEditor } from "./CodeEditor";

interface ProblemDetailProps {
  problemId: number;
  onToggleAIMentor: () => void;
  showAIMentor: boolean;
}

const problemData = {
  1: {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    starterCode: `function twoSum(nums: number[], target: number): number[] {
    // Write your solution here
    
}`,
  },
};

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  output: string;
  time: string;
  memory: string;
}

interface SubmissionStats {
  runtimePercentile: number;
  memoryPercentile: number;
  totalSubmissions: number;
  averageRuntime: string;
  averageMemory: string;
}

const starterCodeByLanguage: Record<string, string> = {
  typescript: `function twoSum(nums: number[], target: number): number[] {\n    // Write your solution here\n    \n}`,
  javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your solution here\n    \n};`,
  python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your solution here\n        pass`,
  java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
  cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};`,
  go: `func twoSum(nums []int, target int) []int {\n    // Write your solution here\n    \n}`,
  rust: `impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Write your solution here\n        \n    }\n}`,
};

export function ProblemDetail({
  problemId,
  onToggleAIMentor,
  showAIMentor,
}: ProblemDetailProps) {
  const problem = problemData[1]; // Using problem 1 as example
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState(starterCodeByLanguage[language]);
  const [activeTab, setActiveTab] = useState<
    "description" | "submissions" | "solutions" | "discussions"
  >("description");
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [submissionStats, setSubmissionStats] =
    useState<SubmissionStats | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(starterCodeByLanguage[newLang]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setTestResults([
        {
          passed: true,
          input: "nums = [2,7,11,15], target = 9",
          expected: "[0,1]",
          output: "[0,1]",
          time: "42ms",
          memory: "44.2 MB",
        },
        {
          passed: true,
          input: "nums = [3,2,4], target = 6",
          expected: "[1,2]",
          output: "[1,2]",
          time: "38ms",
          memory: "44.1 MB",
        },
        {
          passed: false,
          input: "nums = [3,3], target = 6",
          expected: "[0,1]",
          output: "undefined",
          time: "35ms",
          memory: "43.9 MB",
        },
      ]);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setIsRunning(true);

    // Simulate submission process
    setTimeout(() => {
      setSubmitting(false);

      // Generate random percentiles for demo
      const runtimePercentile = Math.floor(Math.random() * 30) + 70; // 70-99%
      const memoryPercentile = Math.floor(Math.random() * 40) + 60; // 60-99%

      setTestResults([
        {
          passed: true,
          input: "Test case 1/15",
          expected: "[0,1]",
          output: "[0,1]",
          time: "42ms",
          memory: "44.2 MB",
        },
        {
          passed: true,
          input: "Test case 2/15",
          expected: "[1,2]",
          output: "[1,2]",
          time: "38ms",
          memory: "44.1 MB",
        },
      ]);

      setSubmissionStats({
        runtimePercentile,
        memoryPercentile,
        totalSubmissions: 1247583,
        averageRuntime: "68ms",
        averageMemory: "48.3 MB",
      });

      setIsRunning(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="h-[calc(100vh-73px)] flex">
      {/* Left Panel - Problem Description */}
      <div
        className={`${
          showAIMentor ? "w-[35%]" : "w-1/2"
        } border-r border-gray-800 flex flex-col transition-all duration-300`}
      >
        <div className="border-b border-gray-800 flex items-center px-6 py-3 gap-2">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "description"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "submissions"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Submissions
          </button>
          <button
            onClick={() => setActiveTab("solutions")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "solutions"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Solutions
          </button>
          <button
            onClick={() => setActiveTab("discussions")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "discussions"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Discussions
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab === "description" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-2xl">1. {problem.title}</h1>
                  <span
                    className={`px-3 py-1 rounded-lg border text-sm ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {problem.description}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-gray-200">Examples</h3>
                {problem.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-4 bg-[#121212] border border-gray-800 rounded-lg"
                  >
                    <div className="mb-2">
                      <span className="text-gray-400">Input: </span>
                      <code className="text-green-400">{example.input}</code>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Output: </span>
                      <code className="text-blue-400">{example.output}</code>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="text-gray-400">Explanation: </span>
                        <span className="text-gray-300">
                          {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="mb-3 text-gray-200">Constraints</h3>
                <ul className="space-y-2">
                  {problem.constraints.map((constraint, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-purple-400 mt-1">•</span>
                      <code className="text-sm">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="space-y-6">
              <h3 className="text-xl mb-4">Top Submissions</h3>
              {[
                {
                  runtime: "28ms",
                  beats: 98.5,
                  memory: "42.1 MB",
                  language: "TypeScript",
                  user: "CodeMaster",
                },
                {
                  runtime: "32ms",
                  beats: 95.2,
                  memory: "42.8 MB",
                  language: "Python",
                  user: "AlgoQueen",
                },
                {
                  runtime: "35ms",
                  beats: 91.7,
                  memory: "43.2 MB",
                  language: "JavaScript",
                  user: "DevNinja",
                },
                {
                  runtime: "38ms",
                  beats: 87.3,
                  memory: "43.9 MB",
                  language: "Java",
                  user: "ByteBeast",
                },
              ].map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-[#121212] border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                          idx === 0
                            ? "from-yellow-500 to-orange-500"
                            : idx === 1
                            ? "from-gray-400 to-gray-600"
                            : idx === 2
                            ? "from-orange-600 to-orange-800"
                            : "from-purple-500 to-pink-500"
                        } flex items-center justify-center text-sm`}
                      >
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-purple-400">@{sub.user}</div>
                        <div className="text-sm text-gray-500">
                          {sub.language}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400">Beats {sub.beats}%</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400">{sub.runtime}</span>
                    </div>
                    <div className="text-gray-400">{sub.memory}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "solutions" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
                <h3 className="text-xl mb-3">Official Solution</h3>
                <p className="text-gray-400 mb-4">
                  Unlock expert explanations and optimal approaches
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="px-4 py-2 bg-[#121212] rounded-lg">
                    <div className="text-sm text-gray-400">Hint 1</div>
                    <div className="text-purple-400">50 coins</div>
                  </div>
                  <div className="px-4 py-2 bg-[#121212] rounded-lg">
                    <div className="text-sm text-gray-400">Hint 2</div>
                    <div className="text-purple-400">100 coins</div>
                  </div>
                  <div className="px-4 py-2 bg-[#121212] rounded-lg">
                    <div className="text-sm text-gray-400">Full Solution</div>
                    <div className="text-purple-400">200 coins</div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all">
                  Unlock Hint 1 (50 coins)
                </button>
              </div>

              <div>
                <h3 className="text-xl mb-4">Community Solutions</h3>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-[#121212] border border-gray-800 rounded-lg p-4 mb-3 hover:border-purple-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                          U{i}
                        </div>
                        <div>
                          <div>Hash Map Approach - O(n) Time</div>
                          <div className="text-sm text-gray-500">
                            by User{i} • 2 days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-green-400">
                          <span>↑</span>
                          <span>{142 - i * 20}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "discussions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">Discussions</h3>
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-all">
                  New Discussion
                </button>
              </div>

              {[
                {
                  title: "Optimal approach explanation",
                  author: "AlgoMaster",
                  replies: 24,
                  votes: 145,
                  time: "2h ago",
                },
                {
                  title: "Can anyone explain the hash map solution?",
                  author: "Beginner123",
                  replies: 12,
                  votes: 67,
                  time: "5h ago",
                },
                {
                  title: "Alternative solution using two pointers",
                  author: "CodeGuru",
                  replies: 8,
                  votes: 89,
                  time: "1d ago",
                },
                {
                  title: "Time complexity question",
                  author: "Student99",
                  replies: 15,
                  votes: 43,
                  time: "2d ago",
                },
              ].map((discussion, idx) => (
                <div
                  key={idx}
                  className="bg-[#121212] border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button className="text-gray-400 hover:text-green-400 transition-colors">
                        ↑
                      </button>
                      <div className="text-sm text-purple-400">
                        {discussion.votes}
                      </div>
                      <button className="text-gray-400 hover:text-red-400 transition-colors">
                        ↓
                      </button>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg mb-1 hover:text-purple-400 transition-colors">
                        {discussion.title}
                      </h4>
                      <div className="text-sm text-gray-500">
                        <span className="text-purple-400">
                          @{discussion.author}
                        </span>{" "}
                        • {discussion.replies} replies • {discussion.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div
        className={`${
          showAIMentor ? "w-[65%]" : "w-1/2"
        } flex flex-col transition-all duration-300`}
      >
        <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
              <option>TypeScript</option>
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
            <button
              onClick={() => setCode(problem.starterCode)}
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <button
            onClick={onToggleAIMentor}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              showAIMentor
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Mentor
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Submission Animation */}
        {submitting && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#121212] border border-purple-500/50 rounded-2xl p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
                <div
                  className="absolute inset-4 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "0.8s",
                  }}
                />
              </div>
              <h3 className="text-2xl mb-2">Submitting Solution...</h3>
              <div className="text-gray-400 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Compiling code</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span>Running test cases</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <span>Calculating performance</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Results */}
        {testResults && (
          <div className="border-t border-gray-800 bg-[#0a0a0a]">
            {submissionStats && testResults.every((t) => t.passed) && (
              <div className="border-b border-gray-800 p-4 bg-gradient-to-r from-green-500/5 to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Accepted</span>
                  <span className="text-sm text-gray-400 ml-auto">
                    Submitted to{" "}
                    {submissionStats.totalSubmissions.toLocaleString()} total
                    submissions
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Runtime</div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{testResults[0].time}</span>
                      <span
                        className={`text-sm px-2 py-0.5 rounded ${
                          submissionStats.runtimePercentile >= 90
                            ? "bg-green-400/20 text-green-400"
                            : submissionStats.runtimePercentile >= 70
                            ? "bg-blue-400/20 text-blue-400"
                            : "bg-yellow-400/20 text-yellow-400"
                        }`}
                      >
                        Beats {submissionStats.runtimePercentile}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                        style={{
                          width: `${submissionStats.runtimePercentile}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Average: {submissionStats.averageRuntime}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">Memory</div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{testResults[0].memory}</span>
                      <span
                        className={`text-sm px-2 py-0.5 rounded ${
                          submissionStats.memoryPercentile >= 90
                            ? "bg-green-400/20 text-green-400"
                            : submissionStats.memoryPercentile >= 70
                            ? "bg-blue-400/20 text-blue-400"
                            : "bg-yellow-400/20 text-yellow-400"
                        }`}
                      >
                        Beats {submissionStats.memoryPercentile}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all"
                        style={{
                          width: `${submissionStats.memoryPercentile}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Average: {submissionStats.averageMemory}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 max-h-[250px] overflow-y-auto">
              <h3 className="mb-3 flex items-center gap-2">
                Test Results
                <span
                  className={`text-sm ${
                    testResults.every((t) => t.passed)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ({testResults.filter((t) => t.passed).length}/
                  {testResults.length} passed)
                </span>
              </h3>
              <div className="space-y-2">
                {testResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      result.passed
                        ? "bg-green-400/5 border-green-400/20"
                        : "bg-red-400/5 border-red-400/20"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm">{result.input}</span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {result.time} | {result.memory}
                      </span>
                    </div>
                    {!result.passed && (
                      <div className="text-sm space-y-1 ml-6">
                        <div className="text-gray-400">
                          Expected:{" "}
                          <code className="text-green-400">
                            {result.expected}
                          </code>
                        </div>
                        <div className="text-gray-400">
                          Got:{" "}
                          <code className="text-red-400">{result.output}</code>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-gray-800 px-6 py-4 flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            Last run: {isRunning ? "Running..." : "2 minutes ago"}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
