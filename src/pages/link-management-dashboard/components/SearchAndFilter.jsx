import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  filters, 
  onFilterChange,
  onClearFilters,
  totalLinks,
  selectedCount 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-clicks', label: 'Most Clicks' },
    { value: 'least-clicks', label: 'Least Clicks' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Links' },
    { value: 'custom', label: 'Custom Alias' },
    { value: 'generated', label: 'Auto Generated' },
    { value: 'qr-enabled', label: 'With QR Code' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'disabled', label: 'Disabled' }
  ];

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all'
  ).length;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search links by title, URL, or alias..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-40"
          />
          
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            onClick={() => setShowFilters(!showFilters)}
            className={`relative ${activeFiltersCount > 0 ? 'border-primary text-primary' : ''}`}
          >
            Filter
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <span>{totalLinks} total links</span>
          {selectedCount > 0 && (
            <span className="text-primary font-medium">{selectedCount} selected</span>
          )}
        </div>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters.dateRange || 'all'}
              onChange={(value) => onFilterChange('dateRange', value)}
            />
            
            <Select
              label="Link Type"
              options={typeOptions}
              value={filters.type || 'all'}
              onChange={(value) => onFilterChange('type', value)}
            />
            
            <Select
              label="Status"
              options={statusOptions}
              value={filters.status || 'all'}
              onChange={(value) => onFilterChange('status', value)}
            />
          </div>

          {/* Active Filter Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value === 'all') return null;
                
                const getFilterLabel = (key, value) => {
                  const option = {
                    dateRange: dateRangeOptions,
                    type: typeOptions,
                    status: statusOptions
                  }[key]?.find(opt => opt.value === value);
                  
                  return option ? option.label : value;
                };

                return (
                  <div
                    key={key}
                    className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs"
                  >
                    <span>{getFilterLabel(key, value)}</span>
                    <button
                      onClick={() => onFilterChange(key, 'all')}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;