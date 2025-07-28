import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from './ui/Button';

const SubscriptionBanner = () => {
  const { userProfile } = useAuth();

  if (!userProfile || userProfile?.subscription_plan === 'premium') {
    return null;
  }

  const linksUsed = userProfile?.links_created || 0;
  const linksRemaining = Math.max(0, 3 - linksUsed);

  const handlePremiumPurchase = () => {
    // Open Cashfree payment form
    window.open('https://payments.cashfree.com/forms?code=linksnappremium', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{linksRemaining}</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              {linksRemaining > 0 
                ? `${linksRemaining} links remaining in Basic plan`
                : 'Basic plan limit reached'
              }
            </h3>
            <p className="text-xs text-blue-700">
              {linksRemaining > 0 
                ? 'Upgrade to Premium for ₹199 per 3 months - unlimited links and advanced features'
                : 'Upgrade to Premium for ₹199 per 3 months to continue creating links'
              }
            </p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handlePremiumPurchase}
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;