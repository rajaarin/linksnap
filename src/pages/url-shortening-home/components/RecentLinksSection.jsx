import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentLinksSection = ({ recentLinks, onClearAll }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  if (!recentLinks || recentLinks.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12">
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
          <Icon name="Link" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No links yet</h3>
          <p className="text-muted-foreground">
            Start by shortening your first URL above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Links</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="Trash2"
          iconPosition="left"
          className="text-muted-foreground hover:text-destructive"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-3">
        {recentLinks.map((link) => (
          <div
            key={link.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Original URL */}
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground mb-1">Original:</p>
                  <p className="text-sm text-foreground break-all">
                    {truncateUrl(link.originalUrl, 60)}
                  </p>
                </div>

                {/* Short URL */}
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-1">Short:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-primary break-all">
                      {link.shortUrl}
                    </p>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleCopy(link.shortUrl, link.id)}
                      iconName={copiedId === link.id ? "Check" : "Copy"}
                      className="shrink-0 text-muted-foreground hover:text-foreground"
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {formatDate(link.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="MousePointer" size={12} />
                    {link.clicks} clicks
                  </span>
                  {link.customAlias && (
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={12} />
                      Custom
                    </span>
                  )}
                  {link.generateQR && (
                    <span className="flex items-center gap-1">
                      <Icon name="QrCode" size={12} />
                      QR
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {link.generateQR && (
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="QrCode"
                    className="text-muted-foreground hover:text-foreground"
                    title="View QR Code"
                  />
                )}
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ExternalLink"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => window.open(link.shortUrl, '_blank')}
                  title="Open Link"
                />
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="MoreVertical"
                  className="text-muted-foreground hover:text-foreground"
                  title="More Options"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentLinks.length > 5 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
          >
            View All Links
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentLinksSection;