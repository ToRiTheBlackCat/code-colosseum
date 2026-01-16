import { useState } from "react";
import { Calendar, Flame, Gift, Star, CheckCircle2 } from "lucide-react";

interface DailyCheckInProps {
  streak: number;
}

export function DailyCheckIn({ streak }: DailyCheckInProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
  };

  const rewards = [
    { day: 1, points: 10, unlocked: true },
    { day: 2, points: 10, unlocked: true },
    { day: 3, points: 15, unlocked: true },
    { day: 4, points: 15, unlocked: true },
    { day: 5, points: 20, unlocked: true },
    { day: 6, points: 25, unlocked: false },
    { day: 7, points: 50, unlocked: false, special: true },
  ];

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span className="text-lg">Daily Check-In</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-400/10 border border-orange-400/20 rounded-lg">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400">{streak} days</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {rewards.map((reward) => (
          <div
            key={reward.day}
            className={`relative aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
              reward.unlocked
                ? "bg-purple-500/10 border-purple-500/50"
                : reward.special
                ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            {reward.unlocked && (
              <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-green-400" />
            )}
            <div className="text-xs text-gray-400 mb-0.5">D{reward.day}</div>
            <div
              className={`text-xs flex items-center gap-0.5 ${
                reward.special
                  ? "text-yellow-400"
                  : reward.unlocked
                  ? "text-purple-400"
                  : "text-gray-500"
              }`}
            >
              {reward.special && <Star className="w-3 h-3" />}
              <span>+{reward.points}</span>
            </div>
          </div>
        ))}
      </div>

      {!isCheckedIn ? (
        <button
          onClick={handleCheckIn}
          className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4" />
          Check In Today
        </button>
      ) : (
        <div className="w-full py-2.5 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center gap-2 text-green-400">
          <CheckCircle2 className="w-4 h-4" />
          Checked In! +10 Points
        </div>
      )}

      {showReward && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-8 py-6 rounded-2xl shadow-2xl animate-bounce z-50">
          <div className="text-center">
            <Gift className="w-12 h-12 mx-auto mb-2" />
            <div className="text-2xl mb-1">+10 Points!</div>
            <div className="text-sm opacity-90">Keep up the streak!</div>
          </div>
        </div>
      )}
    </div>
  );
}
