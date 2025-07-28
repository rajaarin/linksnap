import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your personal information'
    },
    {
      icon: 'Clock',
      title: '99.9% Uptime',
      description: 'Reliable service you can count on'
    }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Trusted by 50,000+ Users
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={20} color="#059669" />
              </div>
            </div>
            <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6 space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={16} color="#F59E0B" />
          <span className="text-sm text-gray-600">4.9/5 Rating</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} color="#6B7280" />
          <span className="text-sm text-gray-600">50K+ Users</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;