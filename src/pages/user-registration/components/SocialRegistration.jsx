import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
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
      {socialProviders.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          fullWidth
          onClick={() => onSocialRegister(provider.id)}
          className={`${provider.bgColor} ${provider.textColor} ${provider.borderColor} transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name={provider.icon} size={20} />
            <span className="font-medium">Continue with {provider.name}</span>
          </div>
        </Button>
      ))}
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or register with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;