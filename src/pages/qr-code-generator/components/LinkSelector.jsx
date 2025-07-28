import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LinkSelector = ({ 
  links, 
  selectedLink, 
  onLinkSelect, 
  onCreateNew 
}) => {
  const linkOptions = links.map(link => ({
    value: link.id,
    label: `${link.shortUrl} - ${link.originalUrl.substring(0, 50)}${link.originalUrl.length > 50 ? '...' : ''}`,
    description: `Created: ${link.createdAt.toLocaleDateString()}`
  }));

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Select Link for QR Code
        </h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateNew}
        >
          Create New Link
        </Button>
      </div>
      
      <Select
        label="Choose a shortened link"
        placeholder="Select a link to generate QR code"
        options={linkOptions}
        value={selectedLink?.id || ''}
        onChange={(value) => {
          const link = links.find(l => l.id === value);
          onLinkSelect(link);
        }}
        searchable
        className="mb-4"
      />
      
      {selectedLink && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Link" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-foreground">
                  {selectedLink.shortUrl}
                </span>
              </div>
              <p className="text-xs text-muted-foreground break-all">
                {selectedLink.originalUrl}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <span>Clicks: {selectedLink.clicks}</span>
                <span>Created: {selectedLink.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              onClick={() => navigator.clipboard.writeText(selectedLink.shortUrl)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkSelector;