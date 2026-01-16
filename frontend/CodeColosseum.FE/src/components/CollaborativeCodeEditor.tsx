import { useState, useEffect } from "react";
import { Code2, ChevronDown, User } from "lucide-react";

interface Cursor {
  userId: string;
  username: string;
  x: number;
  y: number;
  color: string;
}

interface CollaborativeCodeEditorProps {
  isHost: boolean;
  participants: Array<{ id: string; username: string; color: string }>;
}

const languages = [
  { id: "typescript", name: "TypeScript", icon: "⬡" },
  { id: "javascript", name: "JavaScript", icon: "JS" },
  { id: "python", name: "Python", icon: "🐍" },
  { id: "java", name: "Java", icon: "☕" },
  { id: "cpp", name: "C++", icon: "C++" },
];

const starterCodeByLanguage: Record<string, string> = {
  typescript: `function twoSum(nums: number[], target: number): number[] {\n    // Write your solution here\n    \n}`,
  javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your solution here\n    \n};`,
  python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your solution here\n        pass`,
  java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
  cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};`,
};

export function CollaborativeCodeEditor({
  isHost,
  participants,
}: CollaborativeCodeEditorProps) {
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState(starterCodeByLanguage[language]);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentLang = languages.find((l) => l.id === language) || languages[0];

  // Simulate other participants typing
  useEffect(() => {
    const interval = setInterval(() => {
      if (participants.length > 1) {
        const randomParticipant =
          participants[Math.floor(Math.random() * participants.length)];
        setCursors([
          {
            userId: randomParticipant.id,
            username: randomParticipant.username,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            color: randomParticipant.color,
          },
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [participants]);

  // Track mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(starterCodeByLanguage[newLang]);
    setShowLangMenu(false);
  };

  return (
    <div
      className="h-full flex flex-col bg-[#1e1e1e] relative"
      onMouseMove={handleMouseMove}
    >
      {/* Language Selector */}
      <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between bg-[#252525]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Collaborative Code</span>
          {participants.length > 1 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>{participants.length} coding</span>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
          >
            <span className="text-lg">{currentLang.icon}</span>
            <span>{currentLang.name}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showLangMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl z-10 min-w-[180px] overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-500/10 transition-all text-left ${
                    lang.id === language
                      ? "bg-purple-500/20 text-purple-400"
                      : ""
                  }`}
                >
                  <span className="text-lg">{lang.icon}</span>
                  <span>{lang.name}</span>
                  {lang.id === language && (
                    <span className="ml-auto text-purple-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Editors Indicator */}
      {participants.length > 1 && (
        <div className="border-b border-gray-800 px-4 py-2 bg-[#1e1e1e] flex items-center gap-3">
          <div className="text-xs text-gray-400">Active editors:</div>
          <div className="flex -space-x-2">
            {participants.map((p) => (
              <div
                key={p.id}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-[#1e1e1e]"
                style={{ backgroundColor: p.color }}
                title={p.username}
              >
                {p.username[0]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Area with Cursors */}
      <div className="flex-1 p-4 overflow-auto relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-transparent text-gray-100 resize-none outline-none relative z-10"
          spellCheck={false}
          style={{
            fontFamily:
              'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
            fontSize: "14px",
            lineHeight: "1.6",
            tabSize: 4,
          }}
        />

        {/* Other users' cursors */}
        {cursors.map((cursor) => (
          <div
            key={cursor.userId}
            className="absolute pointer-events-none z-20 transition-all duration-200"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
            }}
          >
            <div className="relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M0 0 L0 16 L4 12 L7 18 L9 17 L6 11 L12 10 Z"
                  fill={cursor.color}
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                className="absolute top-5 left-5 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.username}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
