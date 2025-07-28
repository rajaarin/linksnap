import React from 'react';
import Icon from '../../../components/AppIcon';

const QRPreview = ({ qrCode, selectedLink, isGenerating }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
      <div className="text-center">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
          QR Code Preview
        </h2>
        {selectedLink && (
          <p className="text-sm text-muted-foreground mb-6 break-all">
            {selectedLink.shortUrl}
          </p>
        )}
        
        <div className="relative inline-block">
          <div className="bg-white p-4 rounded-lg shadow-soft border border-border">
            {isGenerating ? (
              <div className="w-64 h-64 flex items-center justify-center">
                <div className="animate-spin">
                  <Icon name="Loader2" size={32} color="var(--color-primary)" />
                </div>
              </div>
            ) : qrCode ? (
              <div 
                className="w-64 h-64 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: qrCode }}
              />
            ) : (
              <div className="w-64 h-64 flex flex-col items-center justify-center text-muted-foreground">
                <Icon name="QrCode" size={48} className="mb-3" />
                <p className="text-sm">QR Code will appear here</p>
              </div>
            )}
          </div>
          
          {qrCode && (
            <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2">
              <Icon name="Check" size={16} />
            </div>
          )}
        </div>
        
        {selectedLink && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Original URL:</p>
            <p className="text-sm font-medium text-foreground break-all">
              {selectedLink.originalUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPreview;