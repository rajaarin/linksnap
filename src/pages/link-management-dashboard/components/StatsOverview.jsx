import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const statCards = [
    {
      title: 'Total Links',
      value: stats.totalLinks,
      icon: 'Link',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: stats.linksChange,
      changeType: stats.linksChange > 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Total Clicks',
      value: stats.totalClicks,
      icon: 'MousePointer',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: stats.clicksChange,
      changeType: stats.clicksChange > 0 ? 'increase' : 'decrease'
    },
    {
      title: 'QR Codes',
      value: stats.qrCodes,
      icon: 'QrCode',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: stats.qrChange,
      changeType: stats.qrChange > 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Avg. CTR',
      value: `${stats.avgCtr}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: stats.ctrChange,
      changeType: stats.ctrChange > 0 ? 'increase' : 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            
            {stat.change !== undefined && (
              <div className={`flex items-center space-x-1 ${
                stat.changeType === 'increase' ? 'text-success' : 'text-destructive'
              }`}>
                <Icon 
                  name={stat.changeType === 'increase' ? 'ArrowUp' : 'ArrowDown'} 
                  size={12} 
                />
                <span className="text-xs font-medium">
                  {Math.abs(stat.change)}%
                </span>
              </div>
            )}
          </div>
          
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;