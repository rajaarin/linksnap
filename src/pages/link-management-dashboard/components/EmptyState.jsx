import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ hasSearchQuery, onClearSearch }) => {
  const navigate = useNavigate();

  if (hasSearchQuery) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No links found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any links matching your search criteria. Try adjusting your search terms or filters.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            iconName="X"
            onClick={onClearSearch}
          >
            Clear Search
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            onClick={() => navigate('/url-shortening-home')}
          >
            Create New Link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="Link" size={32} color="var(--color-primary)" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">No links created yet</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Start by creating your first shortened link. You can customize the alias, generate QR codes, and track performance all in one place.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          onClick={() => navigate('/url-shortening-home')}
        >
          Create Your First Link
        </Button>
        <Button
          variant="outline"
          size="lg"
          iconName="QrCode"
          onClick={() => navigate('/qr-code-generator')}
        >
          Generate QR Code
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" size={20} color="var(--color-accent)" />
          </div>
          <h4 className="font-medium text-foreground mb-1">Fast & Easy</h4>
          <p className="text-sm text-muted-foreground">Create shortened links in seconds</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="BarChart3" size={20} color="var(--color-warning)" />
          </div>
          <h4 className="font-medium text-foreground mb-1">Track Performance</h4>
          <p className="text-sm text-muted-foreground">Monitor clicks and engagement</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Palette" size={20} color="var(--color-success)" />
          </div>
          <h4 className="font-medium text-foreground mb-1">Custom Branding</h4>
          <p className="text-sm text-muted-foreground">Use custom aliases and QR codes</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;