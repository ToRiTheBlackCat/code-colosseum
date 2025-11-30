import { Code2, Trophy, Swords, Zap, User, ShoppingBag, Coins, Video } from 'lucide-react';

type View = 'problems' | 'problem-detail' | 'leaderboard' | 'profile' | 'contests' | 'shop' | 'meeting';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onBackToProblems: () => void;
}

export function Header({ currentView, setCurrentView, onBackToProblems }: HeaderProps) {
  const handleNavClick = (view: View) => {
    if (view === 'problems') {
      onBackToProblems();
    } else {
      setCurrentView(view);
    }
  };

  return (
    <header className="border-b border-gray-800 bg-[#121212] sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeBattle
              </span>
            </div>
            
            <nav className="flex items-center gap-1">
              <button
                onClick={() => handleNavClick('problems')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'problems' || currentView === 'problem-detail'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Problems
              </button>
              
              <button
                onClick={() => handleNavClick('contests')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'contests'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Swords className="w-4 h-4" />
                Contests
              </button>
              
              <button
                onClick={() => handleNavClick('leaderboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'leaderboard'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Trophy className="w-4 h-4" />
                Leaderboard
              </button>

              <button
                onClick={() => handleNavClick('meeting')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'meeting'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Video className="w-4 h-4" />
                Meeting
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('shop')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg hover:border-yellow-500/50 transition-all"
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">3,420</span>
            </button>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Live Execution</span>
            </div>
            
            <button
              onClick={() => handleNavClick('profile')}
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:ring-2 hover:ring-purple-400 transition-all ${
                currentView === 'profile' ? 'ring-2 ring-purple-400' : ''
              }`}
            >
              <span className="text-sm">JD</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}