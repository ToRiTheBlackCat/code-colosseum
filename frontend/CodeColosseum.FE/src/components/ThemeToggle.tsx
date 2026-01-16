import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark" | "auto";
  onThemeChange: (theme: "light" | "dark" | "auto") => void;
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getCurrentIcon = () => {
    if (theme === "auto") return <Monitor className="w-5 h-5" />;
    if (theme === "light") return <Sun className="w-5 h-5" />;
    return <Moon className="w-5 h-5" />;
  };

  const options = [
    {
      value: "light" as const,
      icon: <Sun className="w-4 h-4" />,
      label: "Light",
    },
    {
      value: "dark" as const,
      icon: <Moon className="w-4 h-4" />,
      label: "Dark",
    },
    {
      value: "auto" as const,
      icon: <Monitor className="w-4 h-4" />,
      label: "Auto",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-800 rounded-lg transition-all"
        title="Change theme"
      >
        {getCurrentIcon()}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-[#121212] border border-gray-800 rounded-lg shadow-xl py-2 min-w-[150px] z-50">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onThemeChange(option.value);
                  setShowMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-all ${
                  theme === option.value ? "text-purple-400" : "text-gray-300"
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
                {theme === option.value && (
                  <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
