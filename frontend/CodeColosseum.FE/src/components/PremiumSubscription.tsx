import { useState } from "react";
import { Crown, Check, Sparkles, MessageSquare, Bot, Mic } from "lucide-react";

interface PremiumSubscriptionProps {
  userGems: number;
  isPremium: boolean;
  onSubscribe: () => void;
  onCancel: () => void;
}

export function PremiumSubscription({
  userGems,
  isPremium,
  onSubscribe,
  onCancel,
}: PremiumSubscriptionProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const monthlyPrice = 200;

  const premiumFeatures = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "AI Mentor Access",
      description: "Get unlimited help from AI Mentor while solving problems",
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI Interview Agent",
      description:
        "Virtual AI interviewer in meeting rooms with voice interaction",
    },
    {
      icon: <Mic className="w-5 h-5" />,
      title: "Voice-Enabled Interviews",
      description: "Practice with AI that speaks and listens to your responses",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Custom Agent Configuration",
      description:
        "Set role, experience level, tech stack, and interview style",
    },
    {
      icon: <Crown className="w-5 h-5" />,
      title: "Premium Badge",
      description: "Show off your premium status with exclusive badge",
    },
  ];

  const handleSubscribe = () => {
    if (userGems >= monthlyPrice) {
      onSubscribe();
      setShowConfirm(false);
    }
  };

  if (isPremium) {
    return (
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl">Premium Active</h3>
            <p className="text-sm text-gray-400">
              You have full access to all premium features
            </p>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Next Billing</span>
            <span className="text-sm">30 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Monthly Cost</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">{monthlyPrice}</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <div className="text-yellow-400 mt-0.5">{feature.icon}</div>
              <div className="flex-1">
                <div className="text-white">{feature.title}</div>
                <div className="text-gray-400 text-xs">
                  {feature.description}
                </div>
              </div>
              <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm"
        >
          Cancel Subscription
        </button>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl mb-2">Cancel Premium?</h3>
              <p className="text-sm text-gray-400 mb-6">
                You'll lose access to AI Mentor and AI Interview Agent. Your
                subscription will remain active until the end of the current
                billing period.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
                >
                  Keep Premium
                </button>
                <button
                  onClick={() => {
                    onCancel();
                    setShowConfirm(false);
                  }}
                  className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl">CodeColosseum Premium</h3>
          <p className="text-sm text-gray-400">
            Unlock AI-powered interview practice
          </p>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-4 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-4xl">{monthlyPrice}</span>
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        <div className="text-sm text-gray-400">per month</div>
      </div>

      <div className="space-y-3 mb-6">
        {premiumFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="text-yellow-400 mt-0.5">{feature.icon}</div>
            <div className="flex-1">
              <div className="text-sm">{feature.title}</div>
              <div className="text-xs text-gray-500">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>

      {userGems < monthlyPrice ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-400 text-center">
            You need {monthlyPrice - userGems} more gems to subscribe
          </p>
        </div>
      ) : null}

      <button
        onClick={handleSubscribe}
        disabled={userGems < monthlyPrice}
        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition-all shadow-lg"
      >
        {userGems >= monthlyPrice ? "Subscribe Now" : "Not Enough Gems"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Auto-renews monthly. Cancel anytime.
      </p>
    </div>
  );
}
