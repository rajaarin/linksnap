import React from 'react';
import Button from './ui/Button';
import { Check, X, Zap, Shield } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      icon: Zap,
      features: [
        { text: '3 link shortening per month', included: true },
        { text: 'AI-generated summary (limited)', included: true },
        { text: 'QR code (standard quality)', included: true },
        { text: 'Basic analytics', included: false },
        { text: 'Custom aliases', included: false },
        { text: 'Password protection', included: false },
        { text: 'Bulk uploading', included: false },
        { text: 'No ads', included: false },
        { text: 'Priority support', included: false }
      ],
      popular: false,
      ctaText: 'Get Started',
      ctaVariant: 'outline'
    },
    {
      name: 'Premium',
      price: '₹199 per 3 months',
      description: 'Power features for professionals',
      icon: Shield,
      features: [
        { text: 'Unlimited custom aliases', included: true },
        { text: 'Full link editing/control', included: true },
        { text: 'Enhanced AI preview/summary with images', included: true },
        { text: 'Detailed analytics (geo/time/referrer/device)', included: true },
        { text: 'Analytics history (all time), export data', included: true },
        { text: 'Password protection, scheduled expiry', included: true },
        { text: 'Advanced security features', included: true },
        { text: 'Bulk uploading', included: true },
        { text: 'Branded splash/preview page', included: true },
        { text: 'No ads, priority support, early features', included: true }
      ],
      popular: true,
      ctaText: 'Upgrade to Premium',
      ctaVariant: 'default'
    }
  ];

  const handlePremiumPurchase = () => {
    // Open Cashfree payment form
    window.open('https://payments.cashfree.com/forms?code=linksnappremium', '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with our free Basic plan or unlock premium features with our Professional plan
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative rounded-2xl border-2 p-8 bg-background shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary shadow-primary/20 scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.ctaVariant}
                  size="lg"
                  className="w-full"
                  onClick={plan.name === 'Premium' ? handlePremiumPurchase : undefined}
                >
                  {plan.ctaText}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Feature Comparison</h3>
          <div className="bg-background rounded-lg border border-border overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-foreground">Basic</th>
                    <th className="text-center p-4 font-semibold text-foreground">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Monthly Link Limit', basic: '3', premium: 'Unlimited' },
                    { feature: 'AI Summary', basic: 'Limited', premium: 'Enhanced with Images' },
                    { feature: 'QR Code Quality', basic: 'Standard', premium: 'High Quality' },
                    { feature: 'Custom Aliases', basic: '❌', premium: '✅' },
                    { feature: 'Analytics', basic: 'Basic', premium: 'Detailed + Export' },
                    { feature: 'Password Protection', basic: '❌', premium: '✅' },
                    { feature: 'Bulk Upload', basic: '❌', premium: '✅' },
                    { feature: 'Branded Pages', basic: '❌', premium: '✅' },
                    { feature: 'Ads', basic: 'Yes', premium: 'None' },
                    { feature: 'Support', basic: 'Community', premium: 'Priority' }
                  ].map((row, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-foreground font-medium">{row.feature}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.basic}</td>
                      <td className="p-4 text-center text-foreground font-medium">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;