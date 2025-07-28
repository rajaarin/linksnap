import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomizationPanel = ({ 
  settings, 
  onSettingsChange, 
  onLogoUpload, 
  onRemoveLogo 
}) => {
  const sizeOptions = [
    { value: 'small', label: 'Small (200x200)' },
    { value: 'medium', label: 'Medium (300x300)' },
    { value: 'large', label: 'Large (500x500)' },
    { value: 'custom', label: 'Custom Size' }
  ];

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (~7%)', description: 'Suitable for clean environments' },
    { value: 'M', label: 'Medium (~15%)', description: 'Balanced option' },
    { value: 'Q', label: 'Quartile (~25%)', description: 'Good for outdoor use' },
    { value: 'H', label: 'High (~30%)', description: 'Best for damaged surfaces' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onLogoUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Customize QR Code
      </h2>
      
      <div className="space-y-6">
        {/* Size Settings */}
        <div>
          <Select
            label="Size"
            options={sizeOptions}
            value={settings.size}
            onChange={(value) => onSettingsChange({ ...settings, size: value })}
          />
          
          {settings.size === 'custom' && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Input
                label="Width"
                type="number"
                placeholder="300"
                value={settings.customWidth}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  customWidth: e.target.value 
                })}
              />
              <Input
                label="Height"
                type="number"
                placeholder="300"
                value={settings.customHeight}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  customHeight: e.target.value 
                })}
              />
            </div>
          )}
        </div>

        {/* Color Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Foreground Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={settings.foregroundColor}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  foregroundColor: e.target.value 
                })}
                className="w-12 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                type="text"
                value={settings.foregroundColor}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  foregroundColor: e.target.value 
                })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  backgroundColor: e.target.value 
                })}
                className="w-12 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  backgroundColor: e.target.value 
                })}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Error Correction */}
        <Select
          label="Error Correction Level"
          description="Higher levels allow QR code to work even when partially damaged"
          options={errorCorrectionOptions}
          value={settings.errorCorrection}
          onChange={(value) => onSettingsChange({ 
            ...settings, 
            errorCorrection: value 
          })}
        />

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Logo (Optional)
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Add your brand logo to the center of the QR code
          </p>
          
          {settings.logo ? (
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <img 
                src={settings.logo} 
                alt="Logo preview" 
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Logo uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Logo will be centered in QR code
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={onRemoveLogo}
              />
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
              >
                <div className="text-center">
                  <Icon name="Upload" size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload logo
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;