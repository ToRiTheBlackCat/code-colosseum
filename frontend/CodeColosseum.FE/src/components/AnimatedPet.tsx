import { useEffect, useState } from "react";
import { Sparkles, Heart, Star } from "lucide-react";
import { petTemplates } from "./PetSystem";
import type { Pet } from "./PetSystem";

interface AnimatedPetProps {
  pet: Pet;
  size?: "small" | "medium" | "large";
  showEffects?: boolean;
}

export function AnimatedPet({
  pet,
  size = "medium",
  showEffects = true,
}: AnimatedPetProps) {
  const [animation, setAnimation] = useState<
    "idle" | "jump" | "bounce" | "wiggle" | "spin"
  >("idle");
  const [showParticles, setShowParticles] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const template = petTemplates.find((p) => p.type === pet.type);

  const sizeClasses = {
    small: "text-4xl",
    medium: "text-6xl",
    large: "text-8xl",
  };

  const containerSizes = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  // Get pet appearance based on level
  const getPetAppearance = () => {
    if (!template) return "🥚";

    if (pet.level < 5) {
      return template.emoji; // Basic form
    } else if (pet.level < 10) {
      return template.emoji + "✨"; // Sparkly form
    } else if (pet.level < 20) {
      return template.emoji + "⭐"; // Star form
    } else if (pet.level < 30) {
      return template.emoji + "💫"; // Galaxy form
    } else {
      return template.emoji + "👑"; // Royal/Master form
    }
  };

  // Random idle animations
  useEffect(() => {
    const animations: Array<"idle" | "jump" | "bounce" | "wiggle" | "spin"> = [
      "jump",
      "bounce",
      "wiggle",
      "spin",
    ];

    const interval = setInterval(() => {
      const randomAnim =
        animations[Math.floor(Math.random() * animations.length)];
      setAnimation(randomAnim);

      // Show particles occasionally
      if (Math.random() > 0.7 && showEffects) {
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
      }

      setTimeout(() => setAnimation("idle"), 1000);
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, [showEffects]);

  // Animation classes
  const getAnimationClass = () => {
    switch (animation) {
      case "jump":
        return "animate-jump";
      case "bounce":
        return "animate-bounce-custom";
      case "wiggle":
        return "animate-wiggle";
      case "spin":
        return "animate-spin-once";
      default:
        return "animate-float";
    }
  };

  // Happiness effects
  const getHappinessGlow = () => {
    if (pet.happiness > 80)
      return "drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]";
    if (pet.happiness > 50)
      return "drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]";
    return "";
  };

  // Hunger effects
  const getHungerEffect = () => {
    if (pet.hunger < 30) {
      return "grayscale-[30%] opacity-80";
    }
    return "";
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Pet Container */}
      <div
        className={`relative ${containerSizes[size]} flex items-center justify-center`}
      >
        {/* Glow effect background */}
        {pet.happiness > 70 && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${template?.color} opacity-20 rounded-full blur-xl animate-pulse`}
          />
        )}

        {/* Pet Character */}
        <div
          className={`
            ${sizeClasses[size]} 
            ${getAnimationClass()} 
            ${getHappinessGlow()}
            ${getHungerEffect()}
            transition-all duration-300 cursor-pointer select-none
            ${isHovered ? "scale-110" : "scale-100"}
          `}
          style={{
            filter: `hue-rotate(${pet.bondLevel * 0.5}deg)`,
          }}
        >
          {getPetAppearance()}
        </div>

        {/* Level Badge */}
        <div className="absolute -top-1 -right-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#121212] shadow-lg">
          {pet.level}
        </div>

        {/* Hunger indicator */}
        {pet.hunger < 30 && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="text-xs">🍖</div>
          </div>
        )}
      </div>

      {/* Particle Effects */}
      {showParticles && showEffects && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 animate-particle"
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${i * 45}deg)`,
              }}
            >
              <div className="text-xs">
                {["✨", "💫", "⭐", "💛", "💖"][Math.floor(Math.random() * 5)]}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hover Effects */}
      {isHovered && showEffects && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs animate-fade-in">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-400" />
              <span>{template?.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Special Effects based on Bond Level */}
      {pet.bondLevel > 80 && showEffects && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 animate-float-slow">
            <Star className="w-3 h-3 text-yellow-400" />
          </div>
          <div
            className="absolute bottom-0 right-0 animate-float-slow"
            style={{ animationDelay: "1s" }}
          >
            <Sparkles className="w-3 h-3 text-pink-400" />
          </div>
        </div>
      )}
    </div>
  );
}
