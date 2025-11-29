import { Code2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { id: 'typescript', name: 'TypeScript', icon: '⬡' },
  { id: 'javascript', name: 'JavaScript', icon: 'JS' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: 'C++' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
];

export function CodeEditor({ code, onChange, language, onLanguageChange }: CodeEditorProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLang = languages.find(l => l.id === language) || languages[0];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Language Selector */}
      <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between bg-[#252525]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Code</span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
          >
            <span className="text-lg">{currentLang.icon}</span>
            <span>{currentLang.name}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>

          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl z-10 min-w-[180px] overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    onLanguageChange(lang.id);
                    setShowLangMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-500/10 transition-all text-left ${
                    lang.id === language ? 'bg-purple-500/20 text-purple-400' : ''
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

      {/* Code Area */}
      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent text-gray-100 resize-none outline-none"
          spellCheck={false}
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
}
