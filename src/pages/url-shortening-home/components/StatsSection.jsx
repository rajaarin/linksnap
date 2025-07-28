import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = ({ totalLinks, totalClicks, totalUsers }) => {
  const stats = [
    {
      id: 1,
      label: 'Links Shortened',
      value: totalLinks?.toLocaleString() || '1,234,567',
      icon: 'Link',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      label: 'Total Clicks',
      value: totalClicks?.toLocaleString() || '8,901,234',
      icon: 'MousePointer',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 3,
      label: 'Active Users',
      value: totalUsers?.toLocaleString() || '45,678',
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Trusted by Millions
        </h2>
        <p className="text-muted-foreground">
          Join thousands of users who trust LinkSnap for their URL shortening needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-sm transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} className="text-primary" />
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} className="text-accent" />
            <span>Global CDN</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Zap" size={16} className="text-warning" />
            <span>Lightning Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;