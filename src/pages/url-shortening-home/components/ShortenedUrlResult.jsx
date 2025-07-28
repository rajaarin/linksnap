import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Copy, Check, QrCode, Share2, X } from 'lucide-react';

const ShortenedUrlResult = ({ shortenedUrl, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl?.short_url || `https://linksnap.co/${shortenedUrl?.short_code}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this link',
          url: shortenedUrl?.short_url || `https://linksnap.co/${shortenedUrl?.short_code}`
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <div className="bg-background rounded-xl border-2 border-primary/20 shadow-lg p-6 animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Link Created Successfully!</h3>
            <p className="text-sm text-muted-foreground">Your shortened link is ready to use</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
          className="text-muted-foreground hover:text-foreground"
        />
      </div>

      {/* Original URL */}
      <div className="mb-4">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Original URL
        </label>
        <p className="text-sm text-muted-foreground truncate mt-1">
          {shortenedUrl?.original_url}
        </p>
      </div>

      {/* Shortened URL */}
      <div className="mb-6">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Shortened URL
        </label>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex-1 bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-lg font-mono text-primary">
              {shortenedUrl?.short_url || `https://linksnap.co/${shortenedUrl?.short_code}`}
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={handleCopy}
            iconName={copied ? "Check" : "Copy"}
            className={`px-4 ${copied ? 'text-green-600' : ''}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="default"
          onClick={handleShare}
          iconName="Share2"
          iconPosition="left"
        >
          Share Link
        </Button>
        
        {shortenedUrl?.qr_code_url && (
          <Button
            variant="outline"
            onClick={() => setShowQR(!showQR)}
            iconName="QrCode"
            iconPosition="left"
          >
            {showQR ? 'Hide QR' : 'Show QR'}
          </Button>
        )}

        <div className="ml-auto text-sm text-muted-foreground">
          <span className="font-medium">{shortenedUrl?.clicks || 0}</span> clicks
        </div>
      </div>

      {/* QR Code */}
      {showQR && shortenedUrl?.qr_code_url && (
        <div className="mt-6 pt-6 border-t border-border text-center">
          <h4 className="text-sm font-medium text-foreground mb-4">QR Code</h4>
          <img
            src={shortenedUrl.qr_code_url}
            alt="QR Code"
            className="mx-auto w-48 h-48 border border-border rounded-lg"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Scan to open the shortened link
          </p>
        </div>
      )}

      {/* Link Details */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="text-sm font-medium text-foreground">
              {new Date(shortenedUrl?.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Clicks</p>
            <p className="text-sm font-medium text-foreground">
              {shortenedUrl?.clicks || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-medium text-green-600">
              {shortenedUrl?.status || 'Active'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expires</p>
            <p className="text-sm font-medium text-foreground">
              {shortenedUrl?.expires_at 
                ? new Date(shortenedUrl.expires_at).toLocaleDateString()
                : 'Never'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortenedUrlResult;