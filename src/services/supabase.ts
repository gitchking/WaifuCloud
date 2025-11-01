import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Website, Category } from '../types';

// Supabase configuration - these will be set in environment variables
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

// Create Supabase client only if credentials are provided
if (SUPABASE_URL && SUPABASE_ANON_KEY && 
    SUPABASE_URL !== 'your_supabase_project_url_here' && 
    SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here') {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase client initialized');
} else {
  console.warn('Supabase credentials not provided. Running in static data mode.');
}

// Function to extract favicon URL from a website
const getFaviconUrl = (websiteUrl: string): string => {
  try {
    const url = new URL(websiteUrl);
    return `${url.origin}/favicon.ico`;
  } catch (error) {
    console.error('Error parsing URL for favicon:', error);
    return '🌐';
  }
};

// Function to check if favicon exists with better error handling
const checkFaviconExists = async (faviconUrl: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(faviconUrl, { 
      method: 'HEAD', 
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error: any) {
    // Don't let favicon errors break the website addition
    console.warn('Favicon check failed:', error.message || error);
    return false;
  }
};

// Function to update category count
const updateCategoryCount = async (categorySlug: string, increment: number): Promise<void> => {
  if (!supabase) return;

  try {
    console.log(`Updating category count for ${categorySlug} by ${increment}`);
    
    // Get current count for the category
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('count')
      .eq('slug', categorySlug)
      .single();

    if (categoryError) {
      console.error('Error fetching category for count update:', categoryError.message || categoryError);
      return;
    }
    
    console.log('Current category data:', categoryData);

    // Update the count
    const newCount = (categoryData?.count || 0) + increment;
    console.log(`Updating count from ${categoryData?.count || 0} to ${newCount}`);
    
    const { error: updateError } = await supabase
      .from('categories')
      .update({ count: newCount })
      .eq('slug', categorySlug);

    if (updateError) {
      console.error('Error updating category count:', updateError.message || updateError);
    } else {
      console.log('Successfully updated category count');
    }
  } catch (error: any) {
    console.error('Error updating category count:', error.message || error);
  }
};

// Service functions for websites
export const getWebsites = async (): Promise<Website[]> => {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('lastupdated', { ascending: false });

    if (error) {
      console.error('Error fetching websites:', error);
      return [];
    }

    // Convert snake_case to camelCase for the frontend
    return data.map(website => ({
      id: website.id,
      title: website.title,
      description: website.description,
      url: website.url,
      icon: website.icon,
      category: website.category,
      tags: website.tags,
      featured: website.featured,
      popular: website.popular,
      clicks: website.clicks,
      rating: website.rating,
      dateAdded: website.dateadded,
      lastUpdated: website.lastupdated
    })) as Website[];
  } catch (error) {
    console.error('Error fetching websites:', error);
    return [];
  }
};

export const addWebsite = async (website: Omit<Website, 'id'>): Promise<Website | null> => {
  if (!supabase) {
    console.warn('Supabase not configured, cannot add website');
    return null;
  }

  try {
    console.log('Attempting to add website:', website);
    
    // Automatically detect and set favicon (with better error handling)
    let icon = '🌐'; // Default icon
    try {
      const faviconUrl = getFaviconUrl(website.url);
      console.log('Checking favicon:', faviconUrl);
      if (await checkFaviconExists(faviconUrl)) {
        icon = faviconUrl;
        console.log('Favicon found:', faviconUrl);
      } else {
        console.log('No favicon found, using default icon');
      }
    } catch (faviconError: any) {
      console.warn('Favicon detection failed, using default icon:', faviconError.message || faviconError);
      // Continue with default icon
    }

    // Convert camelCase to snake_case for the database
    const websiteData = {
      title: website.title,
      description: website.description,
      url: website.url,
      icon: icon, // Use detected favicon or default
      category: website.category,
      tags: website.tags,
      featured: website.featured,
      popular: website.popular,
      clicks: website.clicks,
      rating: website.rating,
      dateadded: website.dateAdded,
      lastupdated: website.lastUpdated
    };

    console.log('Inserting website data:', websiteData);

    const { data, error } = await supabase
      .from('websites')
      .insert(websiteData)
      .select()
      .single();

    console.log('Supabase response - Data:', data, 'Error:', error?.message || error);

    if (error) {
      console.error('Error adding website:', error.message || error);
      return null;
    }

    // Update category count
    console.log('Updating category count for:', website.category);
    await updateCategoryCount(website.category, 1);

    // Convert snake_case back to camelCase for the frontend
    const result = {
      id: data.id,
      title: data.title,
      description: data.description,
      url: data.url,
      icon: data.icon,
      category: data.category,
      tags: data.tags,
      featured: data.featured,
      popular: data.popular,
      clicks: data.clicks,
      rating: data.rating,
      dateAdded: data.dateadded,
      lastUpdated: data.lastupdated
    };

    console.log('Successfully added website:', result);
    return result as Website;
  } catch (error: any) {
    console.error('Error adding website:', error.message || error);
    return null;
  }
};

export const updateWebsite = async (id: string, updates: Partial<Website>): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase not configured, cannot update website');
    return false;
  }

  try {
    // Get the current website data to check category changes
    const { data: currentWebsite, error: fetchError } = await supabase
      .from('websites')
      .select('category')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching current website:', fetchError);
      return false;
    }

    // If URL is being updated, detect favicon for the new URL
    let icon: string | undefined;
    if (updates.url) {
      const faviconUrl = getFaviconUrl(updates.url);
      if (await checkFaviconExists(faviconUrl)) {
        icon = faviconUrl;
      } else {
        icon = '🌐';
      }
    }

    // Convert camelCase to snake_case for the database
    const websiteUpdates: any = {};
    if (updates.title !== undefined) websiteUpdates.title = updates.title;
    if (updates.description !== undefined) websiteUpdates.description = updates.description;
    if (updates.url !== undefined) websiteUpdates.url = updates.url;
    if (icon !== undefined) websiteUpdates.icon = icon; // Use detected favicon if URL changed
    if (updates.category !== undefined) websiteUpdates.category = updates.category;
    if (updates.tags !== undefined) websiteUpdates.tags = updates.tags;
    if (updates.featured !== undefined) websiteUpdates.featured = updates.featured;
    if (updates.popular !== undefined) websiteUpdates.popular = updates.popular;
    if (updates.clicks !== undefined) websiteUpdates.clicks = updates.clicks;
    if (updates.rating !== undefined) websiteUpdates.rating = updates.rating;
    if (updates.dateAdded !== undefined) websiteUpdates.dateadded = updates.dateAdded;
    if (updates.lastUpdated !== undefined) websiteUpdates.lastupdated = updates.lastUpdated;

    const { error } = await supabase
      .from('websites')
      .update(websiteUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating website:', error);
      return false;
    }

    // Update category counts if category changed
    if (updates.category && updates.category !== currentWebsite.category) {
      // Decrement count for old category
      await updateCategoryCount(currentWebsite.category, -1);
      // Increment count for new category
      await updateCategoryCount(updates.category, 1);
    }

    return true;
  } catch (error) {
    console.error('Error updating website:', error);
    return false;
  }
};

export const deleteWebsite = async (id: string): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase not configured, cannot delete website');
    return false;
  }

  try {
    // Get the website's category before deleting
    const { data: website, error: fetchError } = await supabase
      .from('websites')
      .select('category')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching website for deletion:', fetchError);
      return false;
    }

    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting website:', error);
      return false;
    }

    // Update category count
    await updateCategoryCount(website.category, -1);

    return true;
  } catch (error) {
    console.error('Error deleting website:', error);
    return false;
  }
};

// Function to record a click on a website in real-time
export const recordWebsiteClick = async (id: string): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase not configured, cannot record click');
    return false;
  }

  try {
    // Get the current website data to get the current click count
    const { data: currentWebsite, error: fetchError } = await supabase
      .from('websites')
      .select('clicks')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching website for click recording:', fetchError);
      return false;
    }

    // Increment the click count
    const newClicks = (currentWebsite?.clicks || 0) + 1;

    // Update the website with the new click count
    const { error } = await supabase
      .from('websites')
      .update({ clicks: newClicks })
      .eq('id', id);

    if (error) {
      console.error('Error updating website clicks:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error recording website click:', error);
    return false;
  }
};

// Service functions for categories
export const getCategories = async (): Promise<Category[]> => {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Initialize database tables (for development only)
export const initDatabase = async () => {
  if (!supabase) {
    console.warn('Supabase not configured, cannot initialize database');
    return;
  }
  
  // This function would be used to create tables if they don't exist
  // In production, you would set up the tables in the Supabase dashboard
  console.log('Database initialization would happen here in development');
};