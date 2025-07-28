import { supabase } from './supabase';

const linkService = {
  // Create a new short link
  async createShortLink(linkData) {
    try {
      const { data, error } = await supabase
        .from('short_links')
        .insert({
          original_url: linkData.originalUrl,
          short_code: linkData.shortCode || this.generateShortCode(),
          custom_alias: linkData.customAlias || null,
          title: linkData.title || null,
          description: linkData.description || null,
          expires_at: linkData.expiresAt || null,
          password_hash: linkData.passwordHash || null,
          qr_code_url: linkData.qrCodeUrl || null,
          user_id: linkData.userId
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create short link' };
    }
  },

  // Get user's links
  async getUserLinks(userId, limit = 50, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('short_links')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load links' };
    }
  },

  // Get link by short code
  async getLinkByShortCode(shortCode) {
    try {
      const { data, error } = await supabase
        .from('short_links')
        .select('*')
        .eq('short_code', shortCode)
        .eq('status', 'active')
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to find link' };
    }
  },

  // Update link
  async updateLink(linkId, updates) {
    try {
      const { data, error } = await supabase
        .from('short_links')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', linkId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update link' };
    }
  },

  // Delete link
  async deleteLink(linkId) {
    try {
      const { error } = await supabase
        .from('short_links')
        .delete()
        .eq('id', linkId);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete link' };
    }
  },

  // Record click
  async recordClick(linkId, clickData = {}) {
    try {
      const { error } = await supabase
        .from('link_clicks')
        .insert({
          link_id: linkId,
          ip_address: clickData.ipAddress || null,
          user_agent: clickData.userAgent || null,
          referrer: clickData.referrer || null,
          country: clickData.country || null,
          city: clickData.city || null,
          device_type: clickData.deviceType || null,
          browser: clickData.browser || null
        });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      // Don't return error for click tracking failures to avoid breaking link functionality
      console.log('Click tracking failed:', error);
      return { success: true };
    }
  },

  // Get link analytics
  async getLinkAnalytics(linkId) {
    try {
      const { data, error } = await supabase
        .from('link_clicks')
        .select('*')
        .eq('link_id', linkId)
        .order('clicked_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load analytics' };
    }
  },

  // Generate random short code
  generateShortCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },

  // Check if user can create more links
  async canCreateLink(userId) {
    try {
      const { data, error } = await supabase
        .rpc('can_create_link');

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to check link creation permissions' };
    }
  }
};

export default linkService;