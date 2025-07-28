import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LinkCard = ({ link, onEdit, onDelete, onCopy, onToggleSelect, isSelected }) => {
  const [showFullUrl, setShowFullUrl] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatClicks = (clicks) => {
    if (clicks >= 1000) {
      return `${(clicks / 1000).toFixed(1)}k`;
    }
    return clicks.toString();
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      onCopy(link.id);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary border-primary' : ''
    }`}>
      {/* Header with checkbox and actions */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleSelect(link.id)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected 
                ? 'bg-primary border-primary' :'border-border hover:border-primary'
            }`}
          >
            {isSelected && <Icon name="Check" size={12} color="white" strokeWidth={3} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Link" size={16} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{link.title || 'Untitled Link'}</p>
              <p className="text-xs text-muted-foreground">{formatDate(link.createdAt)}</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setShowActions(!showActions)}
            className="h-8 w-8 p-0"
          />
          
          {showActions && (
            <div className="absolute right-0 top-8 bg-popover border border-border rounded-md shadow-lg z-10 py-1 min-w-[120px]">
              <button
                onClick={() => {
                  onEdit(link);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2"
              >
                <Icon name="Edit" size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onDelete(link.id);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted text-destructive flex items-center space-x-2"
              >
                <Icon name="Trash2" size={14} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Original URL */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-1">Original URL</p>
        <div className="flex items-center space-x-2">
          <p 
            className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => setShowFullUrl(!showFullUrl)}
          >
            {showFullUrl ? link.originalUrl : truncateUrl(link.originalUrl)}
          </p>
          {link.originalUrl.length > 40 && (
            <Button
              variant="ghost"
              size="sm"
              iconName={showFullUrl ? "ChevronUp" : "ChevronDown"}
              onClick={() => setShowFullUrl(!showFullUrl)}
              className="h-6 w-6 p-0"
            />
          )}
        </div>
      </div>

      {/* Short URL */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-1">Short URL</p>
        <div className="flex items-center justify-between bg-muted rounded-md p-2">
          <p className="text-sm font-medium text-primary">{link.shortUrl}</p>
          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            onClick={handleCopy}
            className="h-6 w-6 p-0 hover:bg-background"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="MousePointer" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">{formatClicks(link.clicks)}</span>
            <span className="text-xs text-muted-foreground">clicks</span>
          </div>
          
          {link.qrCode && (
            <div className="flex items-center space-x-1">
              <Icon name="QrCode" size={14} color="var(--color-accent)" />
              <span className="text-xs text-muted-foreground">QR</span>
            </div>
          )}
          
          {link.customAlias && (
            <div className="flex items-center space-x-1">
              <Icon name="Tag" size={14} color="var(--color-warning)" />
              <span className="text-xs text-muted-foreground">Custom</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => window.open(link.shortUrl, '_blank')}
            className="h-6 w-6 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            className="h-6 w-6 p-0"
          />
        </div>
      </div>

      {/* Click trend indicator */}
      {link.clickTrend && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last 7 days</span>
            <div className={`flex items-center space-x-1 ${
              link.clickTrend > 0 ? 'text-success' : link.clickTrend < 0 ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={link.clickTrend > 0 ? "TrendingUp" : link.clickTrend < 0 ? "TrendingDown" : "Minus"} 
                size={12} 
              />
              <span className="text-xs font-medium">
                {link.clickTrend > 0 ? '+' : ''}{link.clickTrend}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkCard;