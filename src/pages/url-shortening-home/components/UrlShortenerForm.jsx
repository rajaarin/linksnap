import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import linkService from '../../../utils/linkService';

const UrlShortenerForm = ({ onUrlShorten }) => {
  const { user, userProfile } = useAuth();
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [generateQR, setGenerateQR] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateUrl = (urlString) => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const canCreateLink = () => {
    if (!user) return true; // Allow demo for non-authenticated users
    if (userProfile?.subscription_plan === 'premium') return true;
    return (userProfile?.links_created || 0) < 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (must include http:// or https://)');
      return;
    }

    // Check if user can create more links
    if (user && !canCreateLink()) {
      setError('You have reached your monthly limit. Upgrade to Premium for unlimited links.');
      return;
    }

    setIsLoading(true);

    try {
      const linkData = {
        originalUrl: url,
        shortCode: customAlias || linkService.generateShortCode(),
        customAlias: customAlias || null,
        expiresAt: expirationDate || null,
        qrCodeUrl: generateQR ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}` : null,
        title: null, // Could be extracted from URL meta tags
        description: null
      };

      await onUrlShorten(linkData);
      
      // Reset form
      setUrl('');
      setCustomAlias('');
      setExpirationDate('');
      setShowAdvanced(false);
    } catch (error) {
      setError('Failed to create short link. Please try again.');
      console.log('Link creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError('');
    } catch (err) {
      console.log('Failed to read clipboard:', err);
    }
  };

  const isPremiumFeature = (feature) => {
    return user && userProfile?.subscription_plan !== 'premium';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main URL Input */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="Paste your long URL here"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                error={error}
                className="text-lg h-14"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handlePaste}
              iconName="Clipboard"
              className="h-14 px-4"
            />
          </div>
        </div>

        {/* Subscription Warning */}
        {user && !canCreateLink() && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-600">⚠️</div>
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Basic plan limit reached
                </p>
                <p className="text-xs text-yellow-700">
                  You have used all 3 links for this month. Upgrade to Premium for unlimited links.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Options Toggle */}
        <div className="text-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-sm"
          >
            Advanced Options
          </Button>
        </div>

        {/* Advanced Options Panel */}
        {showAdvanced && (
          <div className="bg-muted/50 rounded-lg p-6 space-y-4 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="Custom Alias (Optional)"
                  placeholder="my-custom-link"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  description="Create a branded short link"
                  disabled={isPremiumFeature('customAlias')}
                />
                {isPremiumFeature('customAlias') && (
                  <div className="absolute inset-0 bg-muted/70 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
                      Premium Feature
                    </span>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Input
                  label="Expiration Date (Optional)"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  description="Link will expire on this date"
                  min={new Date().toISOString().split('T')[0]}
                  disabled={isPremiumFeature('expiration')}
                />
                {isPremiumFeature('expiration') && (
                  <div className="absolute inset-0 bg-muted/70 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
                      Premium Feature
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="generateQR"
                checked={generateQR}
                onChange={(e) => setGenerateQR(e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="generateQR" className="text-sm font-medium text-foreground">
                Generate QR Code {!user && '(Standard Quality)'}
                {user && userProfile?.subscription_plan !== 'premium' && ' (Standard Quality)'}
                {user && userProfile?.subscription_plan === 'premium' && ' (High Quality)'}
              </label>
            </div>
          </div>
        )}

        {/* Shorten Button */}
        <div className="text-center">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            iconName="Link"
            iconPosition="left"
            className="px-8 py-4 text-lg font-semibold"
            disabled={user && !canCreateLink()}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </Button>
        </div>

        {/* Feature Hints */}
        {!user && (
          <div className="text-center text-sm text-muted-foreground">
            <p>
              <a href="/user-registration" className="text-primary hover:underline">
                Sign up for free
              </a>{' '}
              to save your links and access advanced features
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default UrlShortenerForm;