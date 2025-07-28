import React from 'react';
import { 
  Link2, 
  QrCode, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Upload,
  Eye,
  Clock,
  Smartphone
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Link2,
      title: 'Smart Link Shortening',
      description: 'Transform long URLs into memorable short links with custom aliases and branding options.',
      color: 'text-blue-500'
    },
    {
      icon: QrCode,
      title: 'QR Code Generation',
      description: 'Automatically generate high-quality QR codes for all your shortened links.',
      color: 'text-green-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track clicks, geographic data, device information, and referrer details with exportable reports.',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Security Features',
      description: 'Password protection, expiration dates, and advanced security controls for your links.',
      color: 'text-red-500'
    },
    {
      icon: Zap,
      title: 'AI-Powered Summaries',
      description: 'Get intelligent previews and summaries of your links with smart tags and images.',
      color: 'text-yellow-500'
    },
    {
      icon: Globe,
      title: 'Custom Branding',
      description: 'Create branded splash pages and custom domains for professional link sharing.',
      color: 'text-indigo-500'
    },
    {
      icon: Upload,
      title: 'Bulk Operations',
      description: 'Upload and manage multiple links at once with CSV import and batch editing.',
      color: 'text-teal-500'
    },
    {
      icon: Eye,
      title: 'Link Preview',
      description: 'Safe link previews with website screenshots and metadata before clicking.',
      color: 'text-orange-500'
    },
    {
      icon: Clock,
      title: 'Schedule & Expire',
      description: 'Set activation dates and automatic expiration for time-sensitive links.',
      color: 'text-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
      color: 'text-cyan-500'
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage, track, and optimize your links in one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border border-border bg-background hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <IconComponent className={`w-6 h-6 ${feature.color} group-hover:scale-110 transition-transform`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-muted-foreground">Links Created</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;