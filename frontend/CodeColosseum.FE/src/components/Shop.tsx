import { useState } from 'react';
import { ShoppingBag, Coins, Crown, Star, Sparkles, Frame, Award, Palette, Zap, Lock, CheckCircle2, Gem, Gift } from 'lucide-react';
import { GemPurchase } from './GemPurchase';
import { PetSystem, petTemplates } from './PetSystem';
import { PremiumSubscription } from './PremiumSubscription';
import type { Pet } from "./PetSystem";
import type { PetType } from "./PetSystem";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'badge' | 'frame' | 'theme' | 'boost';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  icon: any;
  color: string;
  owned: boolean;
  preview?: string;
}

const shopItems: ShopItem[] = [
  // Badges
  {
    id: 1,
    name: 'Diamond Crown',
    description: 'Show your elite status with this prestigious crown badge',
    price: 5000,
    category: 'badge',
    rarity: 'Legendary',
    icon: Crown,
    color: 'from-yellow-400 to-orange-500',
    owned: false,
  },
  {
    id: 2,
    name: 'Lightning Strike',
    description: 'For the fastest problem solvers',
    price: 2500,
    category: 'badge',
    rarity: 'Epic',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    owned: false,
  },
  {
    id: 3,
    name: 'Shooting Star',
    description: 'Rising star in the community',
    price: 1500,
    category: 'badge',
    rarity: 'Rare',
    icon: Star,
    color: 'from-blue-400 to-purple-400',
    owned: true,
  },
  {
    id: 4,
    name: 'Trophy Master',
    description: 'Contest champion badge',
    price: 3500,
    category: 'badge',
    rarity: 'Epic',
    icon: Award,
    color: 'from-purple-500 to-pink-500',
    owned: false,
  },
  
  // Avatar Frames
  {
    id: 5,
    name: 'Golden Aura',
    description: 'Luxurious golden frame that makes you stand out',
    price: 4000,
    category: 'frame',
    rarity: 'Legendary',
    icon: Frame,
    color: 'from-yellow-400 to-yellow-600',
    owned: false,
    preview: 'border-4 border-yellow-400',
  },
  {
    id: 6,
    name: 'Cosmic Frame',
    description: 'A frame that glows with cosmic energy',
    price: 3000,
    category: 'frame',
    rarity: 'Epic',
    icon: Frame,
    color: 'from-purple-500 to-pink-500',
    owned: false,
    preview: 'border-4 border-purple-500',
  },
  {
    id: 7,
    name: 'Emerald Border',
    description: 'Elegant emerald green frame',
    price: 2000,
    category: 'frame',
    rarity: 'Rare',
    icon: Frame,
    color: 'from-green-400 to-emerald-500',
    owned: true,
    preview: 'border-4 border-green-400',
  },
  {
    id: 8,
    name: 'Neon Glow',
    description: 'Electric neon frame effect',
    price: 2500,
    category: 'frame',
    rarity: 'Epic',
    icon: Frame,
    color: 'from-cyan-400 to-blue-500',
    owned: false,
    preview: 'border-4 border-cyan-400',
  },
  
  // Themes
  {
    id: 9,
    name: 'Dark Void',
    description: 'Deep space theme with purple accents',
    price: 3500,
    category: 'theme',
    rarity: 'Epic',
    icon: Palette,
    color: 'from-purple-600 to-indigo-900',
    owned: false,
  },
  {
    id: 10,
    name: 'Ocean Breeze',
    description: 'Calming blue ocean theme',
    price: 2500,
    category: 'theme',
    rarity: 'Rare',
    icon: Palette,
    color: 'from-blue-400 to-cyan-600',
    owned: false,
  },
  {
    id: 11,
    name: 'Sunset Horizon',
    description: 'Warm sunset gradient theme',
    price: 2000,
    category: 'theme',
    rarity: 'Rare',
    icon: Palette,
    color: 'from-orange-400 to-pink-500',
    owned: false,
  },
  
  // Boosts
  {
    id: 12,
    name: 'XP Boost 2x (7 Days)',
    description: 'Double your experience points for 7 days',
    price: 1000,
    category: 'boost',
    rarity: 'Common',
    icon: Sparkles,
    color: 'from-green-400 to-emerald-500',
    owned: false,
  },
  {
    id: 13,
    name: 'Streak Shield',
    description: 'Protect your streak for 3 days',
    price: 800,
    category: 'boost',
    rarity: 'Common',
    icon: Star,
    color: 'from-orange-400 to-red-500',
    owned: false,
  },
  {
    id: 14,
    name: 'Premium Hints (10 Pack)',
    description: 'Get 10 advanced AI hints',
    price: 1200,
    category: 'boost',
    rarity: 'Rare',
    icon: Sparkles,
    color: 'from-purple-400 to-purple-600',
    owned: false,
  },
];

export function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'badge' | 'frame' | 'theme' | 'boost'>('all');
  const [activeTab, setActiveTab] = useState<'regular' | 'premium' | 'pets' | 'subscription'>('regular');
  const [userCoins, setUserCoins] = useState(3420);
  const [userGems, setUserGems] = useState(1000);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([3, 7]);
  const [showGemPurchase, setShowGemPurchase] = useState(false);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [dailyCheckInScore, setDailyCheckInScore] = useState(50);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'badge', name: 'Badges', icon: Award },
    { id: 'frame', name: 'Avatar Frames', icon: Frame },
    { id: 'theme', name: 'Themes', icon: Palette },
    { id: 'boost', name: 'Boosts', icon: Sparkles },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'Rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (userCoins >= item.price && !item.owned && !purchasedItems.includes(item.id)) {
      setUserCoins(userCoins - item.price);
      setPurchasedItems([...purchasedItems, item.id]);
    }
  };

  const handleGemPurchaseComplete = (gems: number) => {
    setUserGems(prev => prev + gems);
  };

  const handleAdoptPet = (petType: PetType) => {
    const template = petTemplates.find(p => p.type === petType);
    if (!template) return;

    if (template.currency === 'gems' && userGems >= template.price) {
      setUserGems(prev => prev - template.price);
      setCurrentPet({
        id: `pet-${Date.now()}`,
        type: petType,
        name: template.name,
        stage: 'child',
        level: 1,
        experience: 0,
        hunger: 50,
        happiness: 80,
        bondLevel: 10,
        acquiredDate: new Date().toISOString(),
        lastFed: new Date().toISOString(),
        evolutionProgress: 0,
      });
    }
  };

  const handleFeedPet = () => {
    if (!currentPet || dailyCheckInScore <= 0) return;

    setCurrentPet(prev => {
      if (!prev) return prev;
      
      const hungerIncrease = Math.min(20, 100 - prev.hunger);
      const xpGain = dailyCheckInScore * 2;
      
      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + hungerIncrease),
        happiness: Math.min(100, prev.happiness + 5),
        experience: prev.experience + xpGain,
        bondLevel: Math.min(100, prev.bondLevel + 2),
        lastFed: new Date().toISOString(),
      };
    });

    setDailyCheckInScore(0);
  };

  const isOwned = (itemId: number) => {
    const item = shopItems.find(i => i.id === itemId);
    return item?.owned || purchasedItems.includes(itemId);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Gem Purchase Modal */}
      {showGemPurchase && (
        <GemPurchase 
          onClose={() => setShowGemPurchase(false)}
          onPurchaseComplete={handleGemPurchaseComplete}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">Item Shop</h1>
            <p className="text-gray-400">Customize your profile and boost your progress</p>
          </div>
          
          <div className="flex gap-4">
            {/* Coins Balance */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Coins className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-xs text-gray-400">Coins</div>
                  <div className="text-2xl text-yellow-400">{userCoins.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Gems Balance */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Gem className="w-6 h-6 text-pink-400" />
                <div>
                  <div className="text-xs text-gray-400">Gems</div>
                  <div className="text-2xl text-pink-400">{userGems.toLocaleString()}</div>
                </div>
              </div>
              <button
                onClick={() => setShowGemPurchase(true)}
                className="mt-2 w-full px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded text-xs transition-all"
              >
                Buy Gems
              </button>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('regular')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'regular'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#121212] border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Regular Shop
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'premium'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#121212] border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Gem className="w-4 h-4" />
            Premium Items
          </button>
          <button
            onClick={() => setActiveTab('pets')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'pets'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#121212] border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Gift className="w-4 h-4" />
            Pet Companions
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'subscription'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#121212] border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            Premium Subscription
          </button>
        </div>
      </div>

      {/* Regular Shop Tab */}
      {activeTab === 'regular' && (
        <>
          {/* Categories */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white'
                    : 'bg-[#121212] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const owned = isOwned(item.id);
              const canAfford = userCoins >= item.price;
              
              return (
                <div
                  key={item.id}
                  className={`bg-[#121212] border rounded-xl overflow-hidden transition-all ${
                    owned 
                      ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent'
                      : 'border-gray-800 hover:border-purple-500/50'
                  }`}
                >
                  {/* Item Preview */}
                  <div className={`h-48 bg-gradient-to-br ${item.color} relative flex items-center justify-center`}>
                    {item.category === 'frame' && (
                      <div className={`w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center ${item.preview}`}>
                        <span className="text-xl">JD</span>
                      </div>
                    )}
                    {item.category !== 'frame' && (
                      <item.icon className="w-20 h-20 text-white drop-shadow-2xl" />
                    )}
                    
                    {owned && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Owned
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-lg border text-xs ${getRarityColor(item.rarity)}`}>
                        {item.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="p-6">
                    <h3 className="text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-400 mb-4 min-h-[40px]">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-xl text-yellow-400">{item.price.toLocaleString()}</span>
                      </div>
                      
                      {owned ? (
                        <button
                          disabled
                          className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg cursor-not-allowed"
                        >
                          Owned
                        </button>
                      ) : canAfford ? (
                        <button
                          onClick={() => handlePurchase(item)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all"
                        >
                          Purchase
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed flex items-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How to Earn Coins */}
          <div className="mt-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              <Coins className="w-6 h-6 text-yellow-400" />
              How to Earn Coins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { action: 'Solve Easy Problem', coins: '+10', icon: CheckCircle2, color: 'text-green-400' },
                { action: 'Solve Medium Problem', coins: '+25', icon: CheckCircle2, color: 'text-yellow-400' },
                { action: 'Solve Hard Problem', coins: '+50', icon: CheckCircle2, color: 'text-red-400' },
                { action: 'Daily Check-in', coins: '+10', icon: Star, color: 'text-purple-400' },
                { action: 'Weekly Contest Top 100', coins: '+200', icon: Award, color: 'text-yellow-400' },
                { action: 'Monthly Challenge', coins: '+500', icon: Crown, color: 'text-orange-400' },
                { action: '7-Day Streak', coins: '+100', icon: Sparkles, color: 'text-blue-400' },
                { action: 'Referral Bonus', coins: '+150', icon: Star, color: 'text-pink-400' },
              ].map((earn, idx) => (
                <div key={idx} className="bg-[#121212] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <earn.icon className={`w-5 h-5 ${earn.color}`} />
                    <span className="text-sm text-gray-300">{earn.action}</span>
                  </div>
                  <div className="text-xl text-yellow-400">{earn.coins}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Premium Items Tab */}
      {activeTab === 'premium' && (
        <div>
          <div className="mb-6 p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Gem className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl">Premium Exclusive Items</h2>
            </div>
            <p className="text-gray-400">
              These special items can only be purchased with Gems. They offer unique features and exclusive designs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Premium exclusive items */}
            {[
              {
                id: 'p1',
                name: 'Eternal Flame Badge',
                description: 'Animated fire effect that never goes out. Pure prestige.',
                price: 300,
                rarity: 'Legendary',
                icon: '🔥',
                color: 'from-red-500 to-orange-600'
              },
              {
                id: 'p2',
                name: 'Galaxy Frame',
                description: 'Animated galaxy swirl around your avatar. Mesmerizing!',
                price: 500,
                rarity: 'Legendary',
                icon: '🌌',
                color: 'from-purple-600 to-blue-600'
              },
              {
                id: 'p3',
                name: 'Rainbow Trail',
                description: 'Leave a rainbow trail wherever you go on the platform.',
                price: 400,
                rarity: 'Epic',
                icon: '🌈',
                color: 'from-pink-400 via-purple-400 to-blue-400'
              },
              {
                id: 'p4',
                name: 'VIP Name Color',
                description: 'Display your name in animated gradient colors.',
                price: 250,
                rarity: 'Epic',
                icon: '✨',
                color: 'from-yellow-400 to-pink-500'
              },
              {
                id: 'p5',
                name: 'Code Master Title',
                description: 'Exclusive "Code Master" title displayed on your profile.',
                price: 350,
                rarity: 'Legendary',
                icon: '👑',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                id: 'p6',
                name: 'Custom Theme Builder',
                description: 'Create your own custom theme with full color control.',
                price: 600,
                rarity: 'Legendary',
                icon: '🎨',
                color: 'from-pink-500 to-purple-600'
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-[#121212] border border-gray-800 hover:border-pink-500/50 rounded-xl overflow-hidden transition-all"
              >
                <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center text-6xl relative`}>
                  {item.icon}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg border text-xs bg-black/30 backdrop-blur-sm border-white/30 text-white">
                      {item.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 min-h-[40px]">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gem className="w-5 h-5 text-pink-400" />
                      <span className="text-xl text-pink-400">{item.price}</span>
                    </div>
                    
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-lg transition-all"
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pets Tab */}
      {activeTab === 'pets' && (
        <PetSystem
          currentPet={currentPet}
          onAdoptPet={handleAdoptPet}
          onFeedPet={handleFeedPet}
          userGems={userGems}
          userCoins={userCoins}
          dailyCheckInScore={dailyCheckInScore}
        />
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <PremiumSubscription
          userGems={userGems}
          isPremium={isPremium}
          onSubscribe={() => {
            setUserGems(prev => prev - 200);
            setIsPremium(true);
          }}
          onCancel={() => setIsPremium(false)}
        />
      )}
    </div>
  );
}