import { Heart, Sparkles, TrendingUp, Star } from 'lucide-react';
import { petTemplates } from './PetSystem';
import { AnimatedPet } from './AnimatedPet';
import type { Pet } from "./PetSystem";

interface PetDisplayProps {
  pet: Pet;
  compact?: boolean;
}

export function PetDisplay({ pet, compact = false }: PetDisplayProps) {
  const template = petTemplates.find(p => p.type === pet.type);

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <AnimatedPet pet={pet} size="medium" showEffects={true} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-lg truncate">{template?.name}</h4>
              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs flex-shrink-0">
                Lv. {pet.level}
              </span>
            </div>
            <div className="text-sm text-gray-400 capitalize mb-2">{pet.stage} Stage</div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-gray-400">Hunger</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${pet.hunger}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-400">Happy</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${pet.happiness}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl">My Pet Companion</h3>
        <div className="flex items-center gap-2 text-purple-400">
          <Star className="w-4 h-4" />
          <span className="text-sm">Level {pet.level}</span>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex-shrink-0">
          <AnimatedPet pet={pet} size="large" showEffects={true} />
        </div>
        
        <div className="flex-1">
          <h4 className="text-2xl mb-1">{template?.name}</h4>
          <p className="text-sm text-gray-400 mb-3 capitalize">{pet.stage} Stage</p>
          
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-400">Hunger</span>
                </div>
                <span className="text-sm text-gray-400">{pet.hunger}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${pet.hunger}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">Happiness</span>
                </div>
                <span className="text-sm text-gray-400">{pet.happiness}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${pet.happiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Bond Level</span>
                </div>
                <span className="text-sm text-gray-400">{pet.bondLevel}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${pet.bondLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
        <div className="text-center">
          <div className="text-2xl text-blue-400">{pet.experience}</div>
          <div className="text-xs text-gray-500">Total XP</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-green-400 capitalize">{pet.stage}</div>
          <div className="text-xs text-gray-500">Current Stage</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-purple-400">{pet.level}</div>
          <div className="text-xs text-gray-500">Pet Level</div>
        </div>
      </div>
    </div>
  );
}