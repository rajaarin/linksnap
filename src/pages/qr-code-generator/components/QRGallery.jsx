import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QRGallery = ({ 
  recentQRCodes, 
  onSelectQR, 
  onDeleteQR, 
  onDownloadQR 
}) => {
  if (!recentQRCodes || recentQRCodes.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Recent QR Codes
        </h2>
        <div className="text-center py-8">
          <Icon name="QrCode" size={48} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No QR codes generated yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Recent QR Codes
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentQRCodes.map((qr) => (
          <div
            key={qr.id}
            className="group border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 cursor-pointer"
            onClick={() => onSelectQR(qr)}
          >
            <div className="aspect-square bg-white rounded-lg mb-3 p-2 border border-border">
              <div 
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: qr.qrCode }}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Link" size={14} color="var(--color-primary)" />
                <span className="text-sm font-medium text-foreground truncate">
                  {qr.shortUrl}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground truncate">
                {qr.originalUrl}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{qr.createdAt.toLocaleDateString()}</span>
                <span>{qr.format.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadQR(qr);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(qr.shortUrl);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteQR(qr.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRGallery;