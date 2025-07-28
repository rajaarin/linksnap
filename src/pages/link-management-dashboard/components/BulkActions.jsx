import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onBulkDelete, onBulkExport, onSelectAll, onDeselectAll, totalCount }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleBulkDelete = () => {
    if (showConfirmDelete) {
      onBulkDelete();
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
      // Auto-hide confirmation after 5 seconds
      setTimeout(() => setShowConfirmDelete(false), 5000);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[320px]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedCount} link{selectedCount > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to perform
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onDeselectAll}
            className="h-6 w-6 p-0"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Square"
            onClick={selectedCount === totalCount ? onDeselectAll : onSelectAll}
            className="flex-1"
          >
            {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onBulkExport}
            className="flex-1"
          >
            Export
          </Button>
          
          <Button
            variant={showConfirmDelete ? "destructive" : "outline"}
            size="sm"
            iconName={showConfirmDelete ? "AlertTriangle" : "Trash2"}
            onClick={handleBulkDelete}
            className="flex-1"
          >
            {showConfirmDelete ? 'Confirm Delete' : 'Delete'}
          </Button>
        </div>

        {showConfirmDelete && (
          <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-xs text-destructive text-center">
              Click "Confirm Delete" again to permanently delete {selectedCount} link{selectedCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;