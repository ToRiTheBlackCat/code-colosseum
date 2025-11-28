import { CheckCircle2, Circle, TrendingUp, Clock } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: number;
  submissions: number;
  solved: boolean;
}

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Array', acceptance: 49.2, submissions: 8234567, solved: true },
  { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', acceptance: 38.5, submissions: 5123456, solved: true },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'String', acceptance: 33.8, submissions: 6234567, solved: false },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Array', acceptance: 35.2, submissions: 2123456, solved: false },
  { id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'String', acceptance: 32.1, submissions: 4234567, solved: false },
  { id: 6, title: 'Reverse Integer', difficulty: 'Medium', category: 'Math', acceptance: 27.3, submissions: 3234567, solved: true },
  { id: 7, title: 'Container With Most Water', difficulty: 'Medium', category: 'Array', acceptance: 54.2, submissions: 3123456, solved: false },
  { id: 8, title: 'Regular Expression Matching', difficulty: 'Hard', category: 'Dynamic Programming', acceptance: 27.8, submissions: 1823456, solved: false },
  { id: 9, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', acceptance: 40.5, submissions: 5234567, solved: true },
  { id: 10, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', acceptance: 61.2, submissions: 4234567, solved: true },
];

interface ProblemListProps {
  onSelectProblem: (id: number) => void;
}

export function ProblemList({ onSelectProblem }: ProblemListProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <div className="max-w-[1800px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Solved</span>
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl">{stats.solved}/{stats.total}</div>
          <div className="text-sm text-gray-400 mt-1">
            {Math.round((stats.solved / stats.total) * 100)}% Complete
          </div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Easy</span>
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </div>
          <div className="text-3xl">{problems.filter(p => p.solved && p.difficulty === 'Easy').length}/{stats.easy}</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Medium</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          </div>
          <div className="text-3xl">{problems.filter(p => p.solved && p.difficulty === 'Medium').length}/{stats.medium}</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Hard</span>
            <div className="w-2 h-2 bg-red-400 rounded-full" />
          </div>
          <div className="text-3xl">{problems.filter(p => p.solved && p.difficulty === 'Hard').length}/{stats.hard}</div>
        </div>
      </div>

      <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-xl">Problem Set</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-gray-400">Title</th>
                <th className="px-6 py-3 text-left text-gray-400">Category</th>
                <th className="px-6 py-3 text-left text-gray-400">Difficulty</th>
                <th className="px-6 py-3 text-left text-gray-400">Acceptance</th>
                <th className="px-6 py-3 text-left text-gray-400">Submissions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem.id}
                  onClick={() => onSelectProblem(problem.id)}
                  className="border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer transition-colors"
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
                      <span>{problem.id}.</span>
                      <span className="hover:text-purple-400 transition-colors">{problem.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {problem.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {problem.acceptance}%
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {problem.submissions.toLocaleString()}
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
