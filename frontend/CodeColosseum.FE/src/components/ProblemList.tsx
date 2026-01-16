import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Star,
  Flame,
  Target,
  BookOpen,
  Zap,
  Award,
} from "lucide-react";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: number;
  submissions: number;
  solved: boolean;
  tags: string[];
  isPremium?: boolean;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: 49.2,
    submissions: 8234567,
    solved: true,
    tags: ["Array", "Hash Table"],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: 38.5,
    submissions: 5123456,
    solved: true,
    tags: ["Linked List", "Math"],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    acceptance: 33.8,
    submissions: 6234567,
    solved: false,
    tags: ["String", "Sliding Window"],
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    acceptance: 35.2,
    submissions: 2123456,
    solved: false,
    tags: ["Array", "Binary Search"],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    acceptance: 32.1,
    submissions: 4234567,
    solved: false,
    tags: ["String", "Dynamic Programming"],
  },
  {
    id: 6,
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    acceptance: 27.3,
    submissions: 3234567,
    solved: true,
    tags: ["Math"],
  },
  {
    id: 7,
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array",
    acceptance: 54.2,
    submissions: 3123456,
    solved: false,
    tags: ["Array", "Two Pointers"],
  },
  {
    id: 8,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "Dynamic Programming",
    acceptance: 27.8,
    submissions: 1823456,
    solved: false,
    tags: ["String", "Dynamic Programming", "Recursion"],
    isPremium: true,
  },
  {
    id: 9,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: 40.5,
    submissions: 5234567,
    solved: true,
    tags: ["String", "Stack"],
  },
  {
    id: 10,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: 61.2,
    submissions: 4234567,
    solved: true,
    tags: ["Linked List", "Recursion"],
  },
  {
    id: 11,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Tree",
    acceptance: 38.1,
    submissions: 1523456,
    solved: false,
    tags: ["Tree", "DFS", "Binary Tree"],
  },
  {
    id: 12,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Array",
    acceptance: 54.8,
    submissions: 1923456,
    solved: false,
    tags: ["Array", "Two Pointers", "Stack"],
  },
];

const curatedLists = [
  {
    name: "Beginner Pack",
    icon: BookOpen,
    color: "from-green-400 to-emerald-500",
    count: 30,
    description: "Perfect for getting started",
  },
  {
    name: "Daily Challenge",
    icon: Flame,
    color: "from-orange-400 to-red-500",
    count: 1,
    description: "Today's featured problem",
  },
  {
    name: "Top 100 Interview",
    icon: Star,
    color: "from-yellow-400 to-orange-500",
    count: 100,
    description: "Most asked in interviews",
  },
  {
    name: "Top 50 FAANG",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    count: 50,
    description: "FAANG company favorites",
  },
  {
    name: "Speed Run",
    icon: Zap,
    color: "from-blue-400 to-cyan-500",
    count: 25,
    description: "Quick practice problems",
  },
  {
    name: "Algorithm Mastery",
    icon: Target,
    color: "from-pink-500 to-rose-500",
    count: 75,
    description: "Master key algorithms",
  },
];

interface ProblemListProps {
  onSelectProblem: (id: number) => void;
}

export function ProblemList({ onSelectProblem }: ProblemListProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "difficulty" | "acceptance">(
    "id"
  );

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

  const categories = [
    "all",
    ...Array.from(new Set(problems.map((p) => p.category))),
  ];

  const filteredProblems = problems
    .filter((p) => {
      if (selectedDifficulty !== "all" && p.difficulty !== selectedDifficulty)
        return false;
      if (selectedCategory !== "all" && p.category !== selectedCategory)
        return false;
      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "difficulty":
          const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case "acceptance":
          return b.acceptance - a.acceptance;
        default:
          return a.id - b.id;
      }
    });

  const stats = {
    total: problems.length,
    solved: problems.filter((p) => p.solved).length,
    easy: problems.filter((p) => p.difficulty === "Easy").length,
    medium: problems.filter((p) => p.difficulty === "Medium").length,
    hard: problems.filter((p) => p.difficulty === "Hard").length,
  };

  return (
    <div className="max-w-[1800px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Problem Set</h1>
        <p className="text-gray-400">Master algorithms and data structures</p>
      </div>

      {/* Curated Lists */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Curated Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {curatedLists.map((list) => (
            <div
              key={list.name}
              className="bg-[#121212] border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${list.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <list.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-1">{list.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{list.description}</p>
              <div className="text-xs text-purple-400">
                {list.count} problems
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Total</div>
          <div className="text-3xl">{stats.total}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Easy</div>
          <div className="text-3xl text-green-400">{stats.easy}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Medium</div>
          <div className="text-3xl text-yellow-400">{stats.medium}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Hard</div>
          <div className="text-3xl text-red-400">{stats.hard}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="text-gray-400 mb-2">Solved</div>
          <div className="text-3xl text-purple-400">{stats.solved}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
          >
            <option value="id">Sort by ID</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="acceptance">Sort by Acceptance</option>
          </select>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-gray-400">Title</th>
                <th className="px-6 py-3 text-left text-gray-400">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-gray-400">Category</th>
                <th className="px-6 py-3 text-left text-gray-400">
                  Acceptance
                </th>
                <th className="px-6 py-3 text-left text-gray-400">
                  Submissions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <tr
                  key={problem.id}
                  onClick={() => onSelectProblem(problem.id)}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    {problem.solved ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg group-hover:text-purple-400 transition-colors">
                        {problem.id}. {problem.title}
                      </span>
                      {problem.isPremium && (
                        <span className="px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 rounded text-xs">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-1">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {problem.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">
                        {problem.acceptance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {(problem.submissions / 1000000).toFixed(1)}M
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
