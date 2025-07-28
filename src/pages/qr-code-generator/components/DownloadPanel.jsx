import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DownloadPanel = ({ 
  qrCode, 
  selectedLink, 
  onDownload, 
  isDownloading 
}) => {
  const [downloadSettings, setDownloadSettings] = useState({
    format: 'png',
    quality: 'high',
    customWidth: '500',
    customHeight: '500'
  });

  const formatOptions = [
    { value: 'png', label: 'PNG', description: 'Best for web and print' },
    { value: 'svg', label: 'SVG', description: 'Vector format, scalable' },
    { value: 'pdf', label: 'PDF', description: 'Document format' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low (72 DPI)' },
    { value: 'medium', label: 'Medium (150 DPI)' },
    { value: 'high', label: 'High (300 DPI)' },
    { value: 'custom', label: 'Custom Dimensions' }
  ];

  const handleDownload = () => {
    if (!qrCode || !selectedLink) return;
    
    onDownload({
      ...downloadSettings,
      filename: `qr-${selectedLink.alias || selectedLink.id}-${Date.now()}`
    });
  };

  const handleShare = async (platform) => {
    if (!selectedLink) return;
    
    const shareData = {
      title: 'Check out this QR code',
      text: `QR code for: ${selectedLink.originalUrl}`,
      url: selectedLink.shortUrl
    };

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(selectedLink.shortUrl);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Download & Share
      </h2>
      
      <div className="space-y-6">
        {/* Download Settings */}
        <div className="space-y-4">
          <Select
            label="Format"
            options={formatOptions}
            value={downloadSettings.format}
            onChange={(value) => setDownloadSettings({ 
              ...downloadSettings, 
              format: value 
            })}
          />
          
          <Select
            label="Quality"
            options={qualityOptions}
            value={downloadSettings.quality}
            onChange={(value) => setDownloadSettings({ 
              ...downloadSettings, 
              quality: value 
            })}
          />
          
          {downloadSettings.quality === 'custom' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Width (px)"
                type="number"
                value={downloadSettings.customWidth}
                onChange={(e) => setDownloadSettings({ 
                  ...downloadSettings, 
                  customWidth: e.target.value 
                })}
              />
              <Input
                label="Height (px)"
                type="number"
                value={downloadSettings.customHeight}
                onChange={(e) => setDownloadSettings({ 
                  ...downloadSettings, 
                  customHeight: e.target.value 
                })}
              />
            </div>
          )}
        </div>

        {/* Download Button */}
        <Button
          variant="default"
          fullWidth
          iconName="Download"
          iconPosition="left"
          loading={isDownloading}
          disabled={!qrCode || !selectedLink}
          onClick={handleDownload}
        >
          {isDownloading ? 'Preparing Download...' : 'Download QR Code'}
        </Button>

        {/* Share Options */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Share QR Code
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              onClick={() => handleShare('native')}
              disabled={!selectedLink}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              onClick={() => navigator.clipboard.writeText(selectedLink?.shortUrl || '')}
              disabled={!selectedLink}
            >
              Copy Link
            </Button>
          </div>
        </div>

        {/* QR Code Testing */}
        {selectedLink && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Smartphone" size={20} color="var(--color-primary)" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  Test Your QR Code
                </h4>
                <p className="text-xs text-muted-foreground">
                  Scan with your phone camera to verify the QR code works correctly
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadPanel;