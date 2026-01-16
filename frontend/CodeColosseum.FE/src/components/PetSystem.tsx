import { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  TrendingUp,
  Gift,
  AlertCircle,
  Star,
  Gem,
} from "lucide-react";

export type PetType =
  | "dragon"
  | "phoenix"
  | "unicorn"
  | "griffin"
  | "cat"
  | "dog";
export type PetStage = "egg" | "baby" | "child" | "teen" | "adult";

export interface Pet {
  id: string;
  type: PetType;
  name: string;
  stage: PetStage;
  level: number;
  experience: number;
  hunger: number; // 0-100
  happiness: number; // 0-100
  bondLevel: number; // 0-100
  acquiredDate: string;
  lastFed: string;
  evolutionProgress: number; // 0-100
}

export interface PetTemplate {
  type: PetType;
  name: string;
  description: string;
  price: number;
  currency: "gems" | "coins";
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  emoji: string;
  color: string;
}

export const petTemplates: PetTemplate[] = [
  {
    type: "cat",
    name: "Code Cat",
    description:
      "A curious cat that loves debugging. Purrs when you solve problems.",
    price: 500,
    currency: "gems",
    rarity: "Common",
    emoji: "🐱",
    color: "from-orange-400 to-red-400",
  },
  {
    type: "dog",
    name: "Algorithm Pup",
    description:
      "Loyal companion that celebrates your victories. Very energetic!",
    price: 500,
    currency: "gems",
    rarity: "Common",
    emoji: "🐶",
    color: "from-yellow-400 to-orange-400",
  },
  {
    type: "dragon",
    name: "Code Dragon",
    description:
      "Legendary dragon that breathes fire when you beat hard problems.",
    price: 2000,
    currency: "gems",
    rarity: "Legendary",
    emoji: "🐉",
    color: "from-red-500 to-purple-600",
  },
  {
    type: "phoenix",
    name: "Debug Phoenix",
    description: "Rises from the ashes of failed submissions. Never gives up!",
    price: 1500,
    currency: "gems",
    rarity: "Epic",
    emoji: "🔥",
    color: "from-orange-500 to-pink-500",
  },
  {
    type: "unicorn",
    name: "Logic Unicorn",
    description:
      "Magical unicorn that sprinkles optimization dust on your code.",
    price: 1500,
    currency: "gems",
    rarity: "Epic",
    emoji: "🦄",
    color: "from-pink-400 to-purple-500",
  },
  {
    type: "griffin",
    name: "Syntax Griffin",
    description: "Majestic guardian of clean code. Fierce and noble.",
    price: 1200,
    currency: "gems",
    rarity: "Rare",
    emoji: "🦅",
    color: "from-yellow-600 to-orange-500",
  },
];

interface PetSystemProps {
  currentPet: Pet | null;
  onAdoptPet: (petType: PetType) => void;
  onFeedPet: () => void;
  userGems: number;
  userCoins: number;
  dailyCheckInScore: number;
}

export function PetSystem({
  currentPet,
  onAdoptPet,
  onFeedPet,
  userGems,
  userCoins,
  dailyCheckInScore,
}: PetSystemProps) {
  const [selectedPet, setSelectedPet] = useState<PetTemplate | null>(null);

  const getPetEmoji = (stage: PetStage, type: PetType): string => {
    const template = petTemplates.find((p) => p.type === type);
    if (!template) return "🥚";

    switch (stage) {
      case "egg":
        return "🥚";
      case "baby":
        return template.emoji + "👶";
      case "child":
        return template.emoji;
      case "teen":
        return template.emoji + "✨";
      case "adult":
        return template.emoji + "⭐";
      default:
        return template.emoji;
    }
  };

  const getStageRequirements = (stage: PetStage): number => {
    switch (stage) {
      case "egg":
        return 100;
      case "baby":
        return 250;
      case "child":
        return 500;
      case "teen":
        return 1000;
      default:
        return 0;
    }
  };

  const getNextStage = (stage: PetStage): PetStage | null => {
    switch (stage) {
      case "egg":
        return "baby";
      case "baby":
        return "child";
      case "child":
        return "teen";
      case "teen":
        return "adult";
      default:
        return null;
    }
  };

  const handleAdoptPet = (template: PetTemplate) => {
    const hasEnoughCurrency =
      template.currency === "gems"
        ? userGems >= template.price
        : userCoins >= template.price;

    if (hasEnoughCurrency) {
      onAdoptPet(template.type);
      setSelectedPet(null);
    }
  };

  const canFeed =
    currentPet && dailyCheckInScore > 0 && currentPet.hunger < 100;

  const getGrowthStage = (level: number): string => {
    if (level < 5) return "Child";
    if (level < 10) return "Teen";
    if (level < 20) return "Adult";
    if (level < 30) return "Master";
    return "Legendary";
  };

  const getNextLevelRequirement = (level: number): number => {
    return level * 100 + 50; // Scaling XP requirement
  };

  return (
    <div className="space-y-6">
      {/* Adopt Pet Section */}
      {!currentPet && (
        <div>
          <h3 className="text-xl mb-4">Adopt a Pet Companion</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {petTemplates.map((template) => {
              const canAfford =
                template.currency === "gems"
                  ? userGems >= template.price
                  : userCoins >= template.price;

              const rarityColor = {
                Common: "text-gray-400 bg-gray-400/10 border-gray-400/30",
                Rare: "text-blue-400 bg-blue-400/10 border-blue-400/30",
                Epic: "text-purple-400 bg-purple-400/10 border-purple-400/30",
                Legendary:
                  "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
              }[template.rarity];

              return (
                <div
                  key={template.type}
                  className={`bg-[#121212] border rounded-xl overflow-hidden transition-all ${
                    selectedPet?.type === template.type
                      ? "border-pink-500 ring-2 ring-pink-500/50"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center text-6xl`}
                  >
                    {template.emoji}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4>{template.name}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs border ${rarityColor}`}
                      >
                        {template.rarity}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 min-h-[40px]">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {template.currency === "gems" ? (
                          <>
                            <Gem className="w-5 h-5 text-pink-400" />
                            <span className="text-pink-400">
                              {template.price}
                            </span>
                          </>
                        ) : (
                          <>
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-400">
                              {template.price}
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdoptPet(template)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          canAfford
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                            : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Adopt
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Pet Display */}
      {currentPet && (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl mb-2">Your Pet Companion</h3>
              <p className="text-gray-400">
                {
                  petTemplates.find((p) => p.type === currentPet.type)
                    ?.description
                }
              </p>
            </div>

            <div className="text-6xl">
              {getPetEmoji(currentPet.stage, currentPet.type)}
            </div>
          </div>

          {/* Pet Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#121212] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Stage</span>
              </div>
              <div className="capitalize mb-1">{currentPet.stage}</div>
              <div className="text-xs text-gray-500">
                Level {currentPet.level}
              </div>
            </div>

            <div className="bg-[#121212] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-400">Hunger</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${currentPet.hunger}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">{currentPet.hunger}%</div>
            </div>

            <div className="bg-[#121212] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Happiness</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${currentPet.happiness}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {currentPet.happiness}%
              </div>
            </div>
          </div>

          {/* Evolution Progress */}
          {currentPet.stage !== "adult" && (
            <div className="bg-[#121212] border border-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">
                  Evolution Progress
                </span>
                <span className="text-sm text-purple-400">
                  {currentPet.experience} /{" "}
                  {getStageRequirements(currentPet.stage)} XP
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${
                      (currentPet.experience /
                        getStageRequirements(currentPet.stage)) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="text-xs text-gray-500">
                Next stage: {getNextStage(currentPet.stage)}
              </div>
            </div>
          )}

          {/* Feed Pet Section */}
          <div className="bg-[#121212] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-5 h-5 text-green-400" />
                  <span>Feed Your Pet</span>
                </div>
                <p className="text-sm text-gray-400">
                  Use your daily check-in score to feed and level up your pet
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-400">Available</div>
                <div className="text-2xl text-green-400">
                  {dailyCheckInScore} pts
                </div>
              </div>
            </div>

            {dailyCheckInScore > 0 ? (
              <button
                onClick={onFeedPet}
                disabled={!canFeed}
                className={`w-full py-3 rounded-lg transition-all ${
                  canFeed
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {currentPet.hunger >= 100 ? "Pet is Full" : "Feed Pet"}
              </button>
            ) : (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  Complete daily check-ins to earn feeding points for your pet
                </div>
              </div>
            )}
          </div>

          {/* Pet Info */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
            <div>
              <span className="text-gray-500">Bond Level:</span>{" "}
              <span className="text-purple-400">{currentPet.bondLevel}%</span>
            </div>
            <div>
              <span className="text-gray-500">Total XP:</span>{" "}
              <span className="text-blue-400">{currentPet.experience}</span>
            </div>
            <div>
              <span className="text-gray-500">Adopted:</span>{" "}
              <span>
                {new Date(currentPet.acquiredDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Last Fed:</span>{" "}
              <span>{new Date(currentPet.lastFed).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
