import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LinkCard from './components/LinkCard';
import SearchAndFilter from './components/SearchAndFilter';
import BulkActions from './components/BulkActions';
import StatsOverview from './components/StatsOverview';
import EmptyState from './components/EmptyState';
import EditLinkModal from './components/EditLinkModal';

const LinkManagementDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    type: 'all',
    status: 'all'
  });
  const [selectedLinks, setSelectedLinks] = useState(new Set());
  const [editingLink, setEditingLink] = useState(null);
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for links
  const [links, setLinks] = useState([
    {
      id: 1,
      title: "Product Launch Campaign",
      originalUrl: "https://example.com/products/new-smartphone-launch-2024-features-specifications-pricing",
      shortUrl: "https://lnk.snap/prod24",
      customAlias: "prod24",
      clicks: 1247,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      qrCode: true,
      clickTrend: 15,
      status: "active"
    },
    {
      id: 2,
      title: "Marketing Blog Post",
      originalUrl: "https://blog.company.com/digital-marketing-strategies-for-small-businesses-complete-guide",
      shortUrl: "https://lnk.snap/mkt-guide",
      customAlias: "mkt-guide",
      clicks: 892,
      createdAt: "2024-01-12T14:20:00Z",
      updatedAt: "2024-01-12T14:20:00Z",
      qrCode: true,
      clickTrend: -5,
      status: "active"
    },
    {
      id: 3,
      title: "Event Registration",
      originalUrl: "https://events.company.com/annual-conference-2024-registration-form-early-bird-discount",
      shortUrl: "https://lnk.snap/conf2024",
      customAlias: "conf2024",
      clicks: 2156,
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-10T09:15:00Z",
      qrCode: true,
      clickTrend: 28,
      status: "active"
    },
    {
      id: 4,
      title: "Social Media Campaign",
      originalUrl: "https://social.company.com/instagram-contest-win-prizes-follow-share-tag-friends",
      shortUrl: "https://lnk.snap/ig-contest",
      customAlias: "ig-contest",
      clicks: 3421,
      createdAt: "2024-01-08T16:45:00Z",
      updatedAt: "2024-01-08T16:45:00Z",
      qrCode: false,
      clickTrend: 42,
      status: "active"
    },
    {
      id: 5,
      title: "Customer Survey",
      originalUrl: "https://survey.company.com/customer-satisfaction-feedback-form-quarterly-review",
      shortUrl: "https://lnk.snap/survey-q1",
      customAlias: "survey-q1",
      clicks: 567,
      createdAt: "2024-01-05T11:30:00Z",
      updatedAt: "2024-01-05T11:30:00Z",
      qrCode: true,
      clickTrend: 0,
      status: "expired"
    },
    {
      id: 6,
      title: "Newsletter Signup",
      originalUrl: "https://newsletter.company.com/subscribe-monthly-updates-industry-insights-exclusive-content",
      shortUrl: "https://lnk.snap/newsletter",
      customAlias: "newsletter",
      clicks: 1834,
      createdAt: "2024-01-03T13:20:00Z",
      updatedAt: "2024-01-03T13:20:00Z",
      qrCode: true,
      clickTrend: 12,
      status: "active"
    }
  ]);

  // Mock stats data
  const stats = {
    totalLinks: links.length,
    totalClicks: links.reduce((sum, link) => sum + link.clicks, 0),
    qrCodes: links.filter(link => link.qrCode).length,
    avgCtr: 12.5,
    linksChange: 8,
    clicksChange: 23,
    qrChange: 15,
    ctrChange: 3
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort links
  const filteredAndSortedLinks = useMemo(() => {
    let filtered = links.filter(link => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        link.title?.toLowerCase().includes(searchLower) ||
        link.originalUrl.toLowerCase().includes(searchLower) ||
        link.customAlias?.toLowerCase().includes(searchLower);

      // Date range filter
      const matchesDateRange = filters.dateRange === 'all' || (() => {
        const linkDate = new Date(link.createdAt);
        const now = new Date();
        
        switch (filters.dateRange) {
          case 'today':
            return linkDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return linkDate >= weekAgo;
          case 'month':
            return linkDate.getMonth() === now.getMonth() && linkDate.getFullYear() === now.getFullYear();
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            const linkQuarter = Math.floor(linkDate.getMonth() / 3);
            return linkQuarter === quarter && linkDate.getFullYear() === now.getFullYear();
          case 'year':
            return linkDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      })();

      // Type filter
      const matchesType = filters.type === 'all' || (() => {
        switch (filters.type) {
          case 'custom':
            return link.customAlias && link.customAlias.length > 0;
          case 'generated':
            return !link.customAlias || link.customAlias.length === 0;
          case 'qr-enabled':
            return link.qrCode;
          default:
            return true;
        }
      })();

      // Status filter
      const matchesStatus = filters.status === 'all' || link.status === filters.status;

      return matchesSearch && matchesDateRange && matchesType && matchesStatus;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-clicks':
          return b.clicks - a.clicks;
        case 'least-clicks':
          return a.clicks - b.clicks;
        case 'alphabetical':
          return (a.title || a.originalUrl).localeCompare(b.title || b.originalUrl);
        default:
          return 0;
      }
    });

    return filtered;
  }, [links, searchQuery, sortBy, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({
      dateRange: 'all',
      type: 'all',
      status: 'all'
    });
  };

  const handleToggleSelect = (linkId) => {
    setSelectedLinks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(linkId)) {
        newSet.delete(linkId);
      } else {
        newSet.add(linkId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedLinks(new Set(filteredAndSortedLinks.map(link => link.id)));
  };

  const handleDeselectAll = () => {
    setSelectedLinks(new Set());
  };

  const handleCopy = (linkId) => {
    setCopiedLinkId(linkId);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const handleEdit = (link) => {
    setEditingLink(link);
  };

  const handleSaveEdit = (updatedLink) => {
    setLinks(prev => prev.map(link => 
      link.id === updatedLink.id ? updatedLink : link
    ));
    setEditingLink(null);
  };

  const handleDelete = (linkId) => {
    setLinks(prev => prev.filter(link => link.id !== linkId));
    setSelectedLinks(prev => {
      const newSet = new Set(prev);
      newSet.delete(linkId);
      return newSet;
    });
  };

  const handleBulkDelete = () => {
    setLinks(prev => prev.filter(link => !selectedLinks.has(link.id)));
    setSelectedLinks(new Set());
  };

  const handleBulkExport = () => {
    const selectedLinksData = links.filter(link => selectedLinks.has(link.id));
    const csvContent = [
      ['Title', 'Original URL', 'Short URL', 'Clicks', 'Created Date'],
      ...selectedLinksData.map(link => [
        link.title || '',
        link.originalUrl,
        link.shortUrl,
        link.clicks,
        new Date(link.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `links-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-20 bg-muted rounded-lg mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Link Management</h1>
              <p className="text-muted-foreground">
                Organize and track your shortened links performance
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => handleBulkExport()}
                disabled={links.length === 0}
              >
                Export All
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={() => navigate('/url-shortening-home')}
              >
                Create Link
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsOverview stats={stats} />

          {/* Search and Filters */}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            totalLinks={filteredAndSortedLinks.length}
            selectedCount={selectedLinks.size}
          />

          {/* Links Grid */}
          {filteredAndSortedLinks.length === 0 ? (
            <EmptyState 
              hasSearchQuery={searchQuery || Object.values(filters).some(f => f !== 'all')}
              onClearSearch={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedLinks.map(link => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCopy={handleCopy}
                  onToggleSelect={handleToggleSelect}
                  isSelected={selectedLinks.has(link.id)}
                />
              ))}
            </div>
          )}

          {/* Copy Success Toast */}
          {copiedLinkId && (
            <div className="fixed bottom-6 right-6 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-40">
              <Icon name="Check" size={16} />
              <span className="text-sm font-medium">Link copied to clipboard!</span>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedLinks.size}
        totalCount={filteredAndSortedLinks.length}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />

      {/* Edit Link Modal */}
      <EditLinkModal
        link={editingLink}
        isOpen={!!editingLink}
        onClose={() => setEditingLink(null)}
        onSave={handleSaveEdit}
      />

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 sm:hidden z-30">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          onClick={() => navigate('/url-shortening-home')}
          className="rounded-full w-14 h-14 shadow-lg"
        />
      </div>
    </div>
  );
};

export default LinkManagementDashboard;