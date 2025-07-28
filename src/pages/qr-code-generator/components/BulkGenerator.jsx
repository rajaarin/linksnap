import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BulkGenerator = ({ 
  links, 
  onBulkGenerate, 
  isBulkGenerating 
}) => {
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [bulkSettings, setBulkSettings] = useState({
    format: 'png',
    size: 'medium',
    includeFilename: true
  });

  const handleLinkToggle = (linkId) => {
    setSelectedLinks(prev => 
      prev.includes(linkId) 
        ? prev.filter(id => id !== linkId)
        : [...prev, linkId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLinks.length === links.length) {
      setSelectedLinks([]);
    } else {
      setSelectedLinks(links.map(link => link.id));
    }
  };

  const handleBulkGenerate = () => {
    if (selectedLinks.length === 0) return;
    
    const selectedLinkData = links.filter(link => 
      selectedLinks.includes(link.id)
    );
    
    onBulkGenerate(selectedLinkData, bulkSettings);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Bulk QR Generation
        </h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Zap" size={16} />
          <span>Generate multiple QR codes</span>
        </div>
      </div>
      
      {/* Bulk Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Format
          </label>
          <select
            value={bulkSettings.format}
            onChange={(e) => setBulkSettings({ 
              ...bulkSettings, 
              format: e.target.value 
            })}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input"
          >
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Size
          </label>
          <select
            value={bulkSettings.size}
            onChange={(e) => setBulkSettings({ 
              ...bulkSettings, 
              size: e.target.value 
            })}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input"
          >
            <option value="small">Small (200px)</option>
            <option value="medium">Medium (300px)</option>
            <option value="large">Large (500px)</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <Checkbox
            label="Include filename prefix"
            checked={bulkSettings.includeFilename}
            onChange={(e) => setBulkSettings({ 
              ...bulkSettings, 
              includeFilename: e.target.checked 
            })}
          />
        </div>
      </div>

      {/* Link Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">
            Select Links ({selectedLinks.length}/{links.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
          >
            {selectedLinks.length === links.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        
        <div className="max-h-64 overflow-y-auto space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Checkbox
                checked={selectedLinks.includes(link.id)}
                onChange={() => handleLinkToggle(link.id)}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Link" size={14} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-foreground">
                    {link.shortUrl}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {link.originalUrl}
                </p>
                <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                  <span>Clicks: {link.clicks}</span>
                  <span>Created: {link.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          iconName="Download"
          iconPosition="left"
          loading={isBulkGenerating}
          disabled={selectedLinks.length === 0}
          onClick={handleBulkGenerate}
        >
          {isBulkGenerating 
            ? `Generating ${selectedLinks.length} QR Codes...` 
            : `Generate ${selectedLinks.length} QR Codes`
          }
        </Button>
        
        {selectedLinks.length > 0 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            QR codes will be downloaded as a ZIP file
          </p>
        )}
      </div>
    </div>
  );
};

export default BulkGenerator;