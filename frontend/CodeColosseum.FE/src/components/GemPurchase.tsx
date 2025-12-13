import { useState } from 'react';
import { X, Gem, CreditCard, DollarSign, Check, Loader2, AlertCircle } from 'lucide-react';

interface GemPackage {
  id: number;
  gems: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  badge?: string;
}

const gemPackages: GemPackage[] = [
  { id: 1, gems: 100, price: 0.99 },
  { id: 2, gems: 500, price: 4.99, bonus: 50 },
  { id: 3, gems: 1200, price: 9.99, bonus: 200, popular: true },
  { id: 4, gems: 2500, price: 19.99, bonus: 500 },
  { id: 5, gems: 6000, price: 49.99, bonus: 1500, badge: 'Best Value' },
  { id: 6, gems: 12500, price: 99.99, bonus: 3500, badge: 'Ultimate' },
];

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  enabled: boolean;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'paypal', name: 'PayPal', logo: '💳', enabled: true },
  { id: 'visa', name: 'Credit/Debit Card', logo: '💳', enabled: true },
  { id: 'payos', name: 'PayOS', logo: '💰', enabled: true },
  { id: 'zalopay', name: 'ZaloPay', logo: '⚡', enabled: true },
];

interface GemPurchaseProps {
  onClose: () => void;
  onPurchaseComplete: (gems: number) => void;
}

export function GemPurchase({ onClose, onPurchaseComplete }: GemPurchaseProps) {
  const [selectedPackage, setSelectedPackage] = useState<GemPackage | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPackage || !selectedPayment) return;

    setProcessing(true);
    
    // Simulate payment processing
    // In production, integrate with actual payment gateways:
    // - PayPal SDK: https://developer.paypal.com/
    // - Stripe for cards: https://stripe.com/docs
    // - PayOS API: https://payos.vn/docs
    // - ZaloPay SDK: https://docs.zalopay.vn/
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setPurchaseSuccess(true);
    
    const totalGems = selectedPackage.gems + (selectedPackage.bonus || 0);
    
    setTimeout(() => {
      onPurchaseComplete(totalGems);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
              <Gem className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl">Purchase Gems</h2>
              <p className="text-sm text-gray-400">Get premium currency to unlock exclusive items</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!purchaseSuccess ? (
          <>
            {/* Gem Packages */}
            <div className="p-6">
              <h3 className="text-lg mb-4">Select a Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gemPackages.map((pkg) => {
                  const totalGems = pkg.gems + (pkg.bonus || 0);
                  const isSelected = selectedPackage?.id === pkg.id;
                  
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-gray-800 hover:border-gray-700 bg-[#121212]'
                      } ${pkg.popular ? 'ring-2 ring-purple-500/50' : ''}`}
                    >
                      {pkg.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full">
                          {pkg.badge}
                        </div>
                      )}
                      {pkg.popular && !pkg.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Gem className="w-8 h-8 text-pink-400" />
                          <div>
                            <div className="text-2xl text-pink-400">{pkg.gems}</div>
                            {pkg.bonus && (
                              <div className="text-xs text-green-400">+{pkg.bonus} Bonus</div>
                            )}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-2">
                        Total: {totalGems} gems
                      </div>
                      <div className="text-2xl">${pkg.price.toFixed(2)}</div>
                      {pkg.bonus && (
                        <div className="text-xs text-purple-400 mt-1">
                          {Math.round((pkg.bonus / pkg.gems) * 100)}% extra value
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods */}
            {selectedPackage && (
              <div className="p-6 border-t border-gray-800">
                <h3 className="text-lg mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPayment === method.id;
                    
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        disabled={!method.enabled}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-pink-500 bg-pink-500/10'
                            : 'border-gray-800 hover:border-gray-700 bg-[#121212]'
                        } ${!method.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{method.logo}</div>
                          <span>{method.name}</span>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <div className="mb-1">Secure Payment</div>
                    <div className="text-gray-400">
                      All transactions are encrypted and secure. We never store your payment information.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Button */}
            {selectedPackage && selectedPayment && (
              <div className="p-6 border-t border-gray-800 bg-[#121212]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Total Amount</div>
                    <div className="text-3xl">${selectedPackage.price.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">You'll Receive</div>
                    <div className="text-3xl text-pink-400 flex items-center gap-2">
                      <Gem className="w-8 h-8" />
                      {selectedPackage.gems + (selectedPackage.bonus || 0)}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePurchase}
                  disabled={processing}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-700 disabled:to-gray-800 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Complete Purchase
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  By purchasing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl mb-2">Purchase Successful!</h3>
            <p className="text-gray-400 mb-6">
              {selectedPackage && `${selectedPackage.gems + (selectedPackage.bonus || 0)} gems have been added to your account`}
            </p>
            <div className="flex items-center justify-center gap-2 text-pink-400">
              <Gem className="w-6 h-6" />
              <span className="text-3xl">{selectedPackage && selectedPackage.gems + (selectedPackage.bonus || 0)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
