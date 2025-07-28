import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      {/* Hero Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Link" size={32} className="text-primary" strokeWidth={2} />
        </div>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Shorten Your URLs
        <span className="block text-primary">Instantly</span>
      </h1>

      {/* Hero Description */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
        Transform long, complex URLs into short, shareable links with custom branding, 
        QR codes, and detailed analytics. Perfect for social media, marketing campaigns, 
        and professional communications.
      </p>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
            <Icon name="Zap" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Instant Results</h3>
            <p className="text-sm text-muted-foreground">Get shortened URLs in seconds</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center shrink-0">
            <Icon name="Palette" size={20} className="text-warning" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Custom Branding</h3>
            <p className="text-sm text-muted-foreground">Create branded short links</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
            <Icon name="QrCode" size={20} className="text-success" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">QR Codes</h3>
            <p className="text-sm text-muted-foreground">Generate QR codes automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;