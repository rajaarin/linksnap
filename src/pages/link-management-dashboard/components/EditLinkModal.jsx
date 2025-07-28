import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EditLinkModal = ({ link, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    customAlias: '',
    originalUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (link && isOpen) {
      setFormData({
        title: link.title || '',
        customAlias: link.customAlias || '',
        originalUrl: link.originalUrl || ''
      });
      setErrors({});
    }
  }, [link, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.originalUrl.trim()) {
      newErrors.originalUrl = 'Original URL is required';
    } else if (!isValidUrl(formData.originalUrl)) {
      newErrors.originalUrl = 'Please enter a valid URL';
    }

    if (formData.customAlias && !/^[a-zA-Z0-9-_]+$/.test(formData.customAlias)) {
      newErrors.customAlias = 'Alias can only contain letters, numbers, hyphens, and underscores';
    }

    if (formData.customAlias && formData.customAlias.length < 3) {
      newErrors.customAlias = 'Alias must be at least 3 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await onSave({
        ...link,
        ...formData,
        updatedAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to update link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Edit" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Edit Link</h2>
              <p className="text-sm text-muted-foreground">Update your link details</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="h-8 w-8 p-0"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Link Title"
            type="text"
            placeholder="Enter a descriptive title (optional)"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            description="Help identify this link in your dashboard"
          />

          <Input
            label="Original URL"
            type="url"
            placeholder="https://example.com/very-long-url"
            value={formData.originalUrl}
            onChange={(e) => handleInputChange('originalUrl', e.target.value)}
            error={errors.originalUrl}
            required
          />

          <Input
            label="Custom Alias"
            type="text"
            placeholder="my-custom-link"
            value={formData.customAlias}
            onChange={(e) => handleInputChange('customAlias', e.target.value)}
            error={errors.customAlias}
            description="Leave empty for auto-generated alias"
          />

          {errors.submit && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          {/* Current Short URL Display */}
          <div className="p-3 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground mb-1">Current Short URL</p>
            <p className="text-sm font-medium text-primary">{link?.shortUrl}</p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              iconName="Save"
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLinkModal;