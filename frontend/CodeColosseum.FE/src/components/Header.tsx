import {
  Code2,
  Trophy,
  Swords,
  Rocket,
  User,
  ShoppingBag,
  Coins,
  Video,
  Gem,
  Crown,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type View =
  | "home"
  | "problems"
  | "problem-detail"
  | "leaderboard"
  | "profile"
  | "contests"
  | "shop"
  | "meeting";

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onBackToProblems: () => void;
  onSignOut?: () => void;
  theme: "light" | "dark" | "auto";
  onThemeChange: (theme: "light" | "dark" | "auto") => void;
  isPremium?: boolean;
}

export function Header({
  currentView,
  setCurrentView,
  onBackToProblems,
  onSignOut,
  theme,
  onThemeChange,
  isPremium,
}: HeaderProps) {
  const handleNavClick = (view: View) => {
    if (view === "problems") {
      onBackToProblems();
    } else {
      setCurrentView(view);
    }
  };

  return (
    <header className="border-b border-gray-800 dark:border-gray-800 light:border-gray-200 bg-[#121212] dark:bg-[#121212] light:bg-white sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="relative">
                {/* Orbital rings */}
                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "20s" }}
                >
                  <div className="w-10 h-10 border-2 border-transparent border-t-purple-400 border-r-pink-400 rounded-full" />
                </div>
                <div
                  className="absolute inset-0.5 animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                >
                  <div className="w-9 h-9 border border-transparent border-b-purple-300 border-l-pink-300 rounded-full" />
                </div>

                {/* Core planet/star */}
                <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-2 rounded-full shadow-lg">
                  <Rocket className="w-6 h-6 text-white" />

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-md opacity-50 -z-10" />
                </div>

                {/* Small orbiting dots */}
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
              </div>
              <span className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeColosseum
              </span>
            </button>

            <nav className="flex items-center gap-1">
              <button
                onClick={() => handleNavClick("problems")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === "problems" || currentView === "problem-detail"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Code2 className="w-4 h-4" />
                Problems
              </button>

              <button
                onClick={() => handleNavClick("contests")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === "contests"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Swords className="w-4 h-4" />
                Contests
              </button>

              <button
                onClick={() => handleNavClick("leaderboard")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === "leaderboard"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Trophy className="w-4 h-4" />
                Leaderboard
              </button>

              <button
                onClick={() => handleNavClick("meeting")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === "meeting"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Video className="w-4 h-4" />
                Meeting
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick("shop")}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg hover:border-yellow-500/50 transition-all"
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">3,420</span>
            </button>

            <button
              onClick={() => handleNavClick("shop")}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg hover:border-pink-500/50 transition-all"
            >
              <Gem className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-400">1000</span>
            </button>

            {isPremium && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">Premium</span>
              </div>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Live Execution</span>
            </div>

            <button
              onClick={() => handleNavClick("profile")}
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:ring-2 hover:ring-purple-400 transition-all ${
                currentView === "profile" ? "ring-2 ring-purple-400" : ""
              }`}
            >
              <span className="text-sm">JD</span>
            </button>

            <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
          </div>
        </div>
      </div>
    </header>
  );
}
