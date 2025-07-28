import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DemoAccess = ({ onDemoAccess }) => {
  const demoFeatures = [
    'Create up to 5 short links',
    'Generate QR codes',
    'Basic analytics',
    'Custom aliases'
  ];

  return (
    <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
      <div className="text-center mb-4">
        <Icon name="Play" size={24} className="text-primary mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-foreground">Try LinkSnap Demo</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Explore our features before creating an account
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {demoFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-accent flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={onDemoAccess}
        iconName="ArrowRight"
        iconPosition="right"
      >
        Start Demo
      </Button>
    </div>
  );
};

export default DemoAccess;