import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PremiumFeaturesSidebar = () => {
  const premiumFeatures = [
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description: 'Detailed click tracking, geographic data, and conversion metrics for all your links.'
    },
    {
      icon: 'Palette',
      title: 'Custom Branding',
      description: 'Use your own domain, customize QR codes, and add your brand colors to links.'
    },
    {
      icon: 'Zap',
      title: 'Bulk Operations',
      description: 'Create, edit, and manage hundreds of links at once with CSV import/export.'
    },
    {
      icon: 'Shield',
      title: 'Link Protection',
      description: 'Password protect links, set expiration dates, and control access permissions.'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Share link management with team members and assign different access levels.'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile App',
      description: 'Manage your links on the go with our iOS and Android applications.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 h-fit">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Crown" size={32} color="white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Unlock Premium Features
        </h3>
        <p className="text-gray-600">
          Get the most out of LinkSnap with advanced tools and insights
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {premiumFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon name={feature.icon} size={20} color="#2563EB" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 text-center">
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900">$9</span>
          <span className="text-gray-600">/month</span>
        </div>
        <Button variant="default" fullWidth className="mb-3">
          Start Free Trial
        </Button>
        <p className="text-xs text-gray-500">
          14-day free trial • No credit card required
        </p>
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Icon name="Check" size={16} color="#10B981" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Check" size={16} color="#10B981" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeaturesSidebar;