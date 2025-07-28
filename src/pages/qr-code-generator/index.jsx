import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LinkSelector from './components/LinkSelector';
import QRPreview from './components/QRPreview';
import CustomizationPanel from './components/CustomizationPanel';
import DownloadPanel from './components/DownloadPanel';
import QRGallery from './components/QRGallery';
import BulkGenerator from './components/BulkGenerator';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import linkService from '../../utils/linkService'; // Import linkService

const QRCodeGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext
  const [selectedLink, setSelectedLink] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [showBulkMode, setShowBulkMode] = useState(false);
  const [qrSettings, setQrSettings] = useState({
    size: 'medium',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrection: 'M',
    logo: null,
    customWidth: '300',
    customHeight: '300'
  });

  const [userLinks, setUserLinks] = useState([]); // State for user's shortened links
  const [recentQRCodes, setRecentQRCodes] = useState([]); // State for user's QR codes

  // Load user's links and QR codes
  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.id) {
        setUserLinks([]);
        setRecentQRCodes([]);
        return;
      }

      // Fetch user's shortened links
      try {
        const result = await linkService.getUserLinks(user.id, 50); // Fetch more links for QR generation
        if (result.success) {
          setUserLinks(result.data || []);
        }
      } catch (error) {
        console.error('Error loading user links for QR Generator:', error);
      }

      // TODO: Fetch user's QR codes from a dedicated QR service once implemented
      // For now, clear mock data if user is logged in
      setRecentQRCodes([]); 
    };

    loadUserData();
  }, [user?.id]);

  // Generate QR code when link or settings change
  useEffect(() => {
    if (selectedLink) {
      generateQRCode();
    }
  }, [selectedLink, qrSettings]);

  const generateQRCode = async () => {
    if (!selectedLink) return;
    
    setIsGenerating(true);
    
    // Simulate QR code generation
    setTimeout(() => {
      const size = getSizeInPixels(qrSettings.size);
      const qrSvg = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${qrSettings.backgroundColor}"/>
          ${generateQRPattern(size, qrSettings.foregroundColor)}
          ${qrSettings.logo ? `<image x="${size/2-20}" y="${size/2-20}" width="40" height="40" href="${qrSettings.logo}"/>` : ''}
        </svg>
      `;
      
      setQrCode(qrSvg);
      setIsGenerating(false);
    }, 1000);
  };

  const getSizeInPixels = (size) => {
    switch (size) {
      case 'small': return 200;
      case 'medium': return 300;
      case 'large': return 500;
      case 'custom': return parseInt(qrSettings.customWidth) || 300;
      default: return 300;
    }
  };

  const generateQRPattern = (size, color) => {
    // Simple QR-like pattern for demo
    const patterns = [];
    const cellSize = size / 25;
    
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if ((i + j) % 3 === 0 || (i % 4 === 0 && j % 4 === 0)) {
          patterns.push(
            `<rect x="${j * cellSize}" y="${i * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}"/>`
          );
        }
      }
    }
    
    return patterns.join('');
  };

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  const handleCreateNewLink = () => {
    navigate('/url-shortening-home');
  };

  const handleSettingsChange = (newSettings) => {
    setQrSettings(newSettings);
  };

  const handleLogoUpload = (logoData) => {
    setQrSettings(prev => ({ ...prev, logo: logoData }));
  };

  const handleRemoveLogo = () => {
    setQrSettings(prev => ({ ...prev, logo: null }));
  };

  const handleDownload = async (downloadSettings) => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      const blob = new Blob([qrCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${downloadSettings.filename}.${downloadSettings.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Add to recent QR codes (only if user is logged in)
      if (user?.id) {
        const newQR = {
          id: `qr${Date.now()}`,
          shortUrl: selectedLink.shortUrl,
          originalUrl: selectedLink.originalUrl,
          qrCode: qrCode,
          format: downloadSettings.format,
          createdAt: new Date(),
          user_id: user.id // Associate with user
        };
        
        setRecentQRCodes(prev => [newQR, ...prev.slice(0, 9)]);
        // TODO: Save QR code to database via a new QR service
      }
      setIsDownloading(false);
    }, 2000);
  };

  const handleBulkGenerate = async (selectedLinkData, bulkSettings) => {
    setIsBulkGenerating(true);
    
    // Simulate bulk generation
    setTimeout(() => {
      console.log('Generating QR codes for:', selectedLinkData);
      console.log('Bulk settings:', bulkSettings);
      setIsBulkGenerating(false);
    }, 3000);
  };

  const handleSelectQR = (qr) => {
    const link = userLinks.find(l => l.short_url === qr.shortUrl); // Use userLinks
    if (link) {
      setSelectedLink(link);
      setQrCode(qr.qrCode);
    }
  };

  const handleDeleteQR = (qrId) => {
    setRecentQRCodes(prev => prev.filter(qr => qr.id !== qrId));
    // TODO: Delete QR code from database via a new QR service
  };

  const handleDownloadQR = (qr) => {
    const blob = new Blob([qr.qrCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${qr.id}.${qr.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  QR Code Generator
                </h1>
                <p className="text-muted-foreground">
                  Create and customize QR codes for your shortened links
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant={showBulkMode ? "default" : "outline"}
                  size="sm"
                  iconName="Zap"
                  iconPosition="left"
                  onClick={() => setShowBulkMode(!showBulkMode)}
                >
                  Bulk Mode
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="HelpCircle"
                >
                  Help
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <LinkSelector
                links={userLinks} // Use userLinks instead of mockLinks
                selectedLink={selectedLink}
                onLinkSelect={handleLinkSelect}
                onCreateNew={handleCreateNewLink}
              />
              
              {selectedLink && (
                <CustomizationPanel
                  settings={qrSettings}
                  onSettingsChange={handleSettingsChange}
                  onLogoUpload={handleLogoUpload}
                  onRemoveLogo={handleRemoveLogo}
                />
              )}
            </div>

            {/* Middle Column - Preview */}
            <div className="lg:col-span-1">
              <QRPreview
                qrCode={qrCode}
                selectedLink={selectedLink}
                isGenerating={isGenerating}
              />
            </div>

            {/* Right Column - Download & Actions */}
            <div className="lg:col-span-1 space-y-6">
              <DownloadPanel
                qrCode={qrCode}
                selectedLink={selectedLink}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
              
              {/* Quick Actions */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Eye"
                    iconPosition="left"
                    disabled={!selectedLink}
                    onClick={() => window.open(selectedLink?.shortUrl, '_blank')}
                  >
                    Preview Link
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    iconPosition="left"
                    disabled={!selectedLink}
                    onClick={() => navigate('/link-management-dashboard')}
                  >
                    View Analytics
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Edit"
                    iconPosition="left"
                    disabled={!selectedLink}
                  >
                    Edit Link
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Generation Mode */}
          {showBulkMode && (
            <div className="mt-8">
              <BulkGenerator
                links={userLinks} // Use userLinks instead of mockLinks
                onBulkGenerate={handleBulkGenerate}
                isBulkGenerating={isBulkGenerating}
              />
            </div>
          )}

          {/* Recent QR Codes Gallery - Only show for authenticated users with QR codes */}
          {user?.id && recentQRCodes?.length > 0 && (
            <div className="mt-8">
              <QRGallery
                recentQRCodes={recentQRCodes}
                onSelectQR={handleSelectQR}
                onDeleteQR={handleDeleteQR}
                onDownloadQR={handleDownloadQR}
              />
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8 bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              QR Code Best Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    High Contrast
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Use dark foreground on light background for best scanning
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Maximize" size={20} color="var(--color-success)" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Adequate Size
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Minimum 2cm x 2cm for print materials
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Error Correction
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Higher levels work better in challenging environments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRCodeGenerator;
