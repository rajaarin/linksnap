import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import UrlShortenerForm from './components/UrlShortenerForm';
import ShortenedUrlResult from './components/ShortenedUrlResult';
import FeaturesSection from '../../components/FeaturesSection';
import PricingSection from '../../components/PricingSection';
import SubscriptionBanner from '../../components/SubscriptionBanner';
import linkService from '../../utils/linkService';

const UrlShorteningHome = () => {
  const { user, userProfile } = useAuth();
  const [recentLinks, setRecentLinks] = useState([]);
  const [currentShortenedUrl, setCurrentShortenedUrl] = useState(null);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);

  // Load user's recent links from Supabase
  useEffect(() => {
    const loadUserLinks = async () => {
      if (!user?.id) return;
      
      setIsLoadingLinks(true);
      try {
        const result = await linkService.getUserLinks(user.id, 10);
        if (result?.success) {
          setRecentLinks(result.data || []);
        }
      } catch (error) {
        console.log('Error loading user links:', error);
      } finally {
        setIsLoadingLinks(false);
      }
    };

    loadUserLinks();
  }, [user?.id]);

  const handleUrlShorten = async (linkData) => {
    if (!user?.id) {
      // For non-authenticated users, do not save or display recent links.
      // Only allow short link creation, but don't persist history locally.
      setCurrentShortenedUrl({
        id: Date.now(),
        original_url: linkData.originalUrl,
        short_code: linkData.shortCode || linkService.generateShortCode(),
        short_url: `https://linksnap.co/${linkData.shortCode || linkService.generateShortCode()}`,
        custom_alias: linkData.customAlias || null,
        expires_at: linkData.expiresAt || null,
        qr_code_url: linkData.qrCodeUrl || null,
        created_at: new Date().toISOString(),
        clicks: 0
      });
      return;
    }

    // For authenticated users, save to Supabase
    try {
      const result = await linkService.createShortLink({
        ...linkData,
        userId: user.id
      });

      if (result?.success) {
        const shortenedUrl = {
          ...result.data,
          short_url: `https://linksnap.co/${result.data.short_code}`
        };
        
        setCurrentShortenedUrl(shortenedUrl);
        
        // Reload user links
        const linksResult = await linkService.getUserLinks(user.id, 10);
        if (linksResult?.success) {
          setRecentLinks(linksResult.data || []);
        }
      }
    } catch (error) {
      console.log('Error creating short link:', error);
    }
  };

  const handleCloseResult = () => {
    setCurrentShortenedUrl(null);
  };

  const handleClearAllLinks = () => {
    if (user?.id) {
      // For authenticated users, this would require API call to delete links
      // For now, just clear local state
      setRecentLinks([]);
    } 
    // Removed localStorage clearing for non-authenticated users
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
          </div>
        </div>

        {/* Subscription Banner for logged in users */}
        {user && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <SubscriptionBanner />
          </div>
        )}

        {/* URL Shortener Form */}
        <div className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Shorten Your Links
              </h2>
              <p className="text-muted-foreground">
                Transform long URLs into powerful, trackable short links
              </p>
            </div>
            <UrlShortenerForm onUrlShorten={handleUrlShorten} />
          </div>
        </div>

        {/* Shortened URL Result */}
        {currentShortenedUrl && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ShortenedUrlResult
              shortenedUrl={currentShortenedUrl}
              onClose={handleCloseResult}
            />
          </div>
        )}

        {/* Features Section */}
        <FeaturesSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Recent Links Section - Only show for authenticated users */}
        {user && recentLinks?.length > 0 && (
          <div className="bg-muted/30 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Recent Links</h2>
                <p className="text-muted-foreground">Your recently shortened links</p>
              </div>
              
              <div className="space-y-4 max-w-4xl mx-auto">
                {recentLinks.map((link) => (
                  <div key={link.id} className="bg-background rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {link.title || 'Untitled Link'}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {link.original_url}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-primary font-medium">
                            linksnap.co/{link.short_code}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {link.clicks || 0} clicks
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(link.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="text-xl font-semibold text-foreground">LinkSnap</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The most advanced URL shortening platform with AI-powered features
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} LinkSnap. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UrlShorteningHome;
