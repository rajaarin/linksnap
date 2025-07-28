import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureSidebar = () => {
  const features = [
    {
      icon: 'Link',
      title: 'Smart URL Shortening',
      description: 'Create branded short links with custom aliases and track their performance in real-time.'
    },
    {
      icon: 'QrCode',
      title: 'QR Code Generation',
      description: 'Generate downloadable QR codes for your links with customization options.'
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description: 'Get detailed insights on clicks, locations, devices, and referrer data.'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Share and manage links with your team members and set permissions.'
    }
  ];

  const stats = [
    { label: 'Links Created', value: '2.5M+' },
    { label: 'Active Users', value: '50K+' },
    { label: 'Countries', value: '180+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-primary/5 p-8 lg:p-12">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Welcome back to LinkSnap
          </h2>
          <p className="text-muted-foreground">
            Continue managing your links and growing your digital presence with our powerful tools.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSidebar;