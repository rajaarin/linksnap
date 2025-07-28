import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSocialLogin(provider.id)}
            disabled={loading}
            className={`
              flex items-center justify-center px-4 py-2.5 border rounded-lg text-sm font-medium
              transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
              ${provider.bgColor} ${provider.textColor} ${provider.borderColor}
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            `}
          >
            <Icon 
              name={provider.icon} 
              size={18} 
              className="mr-2" 
            />
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginButtons;