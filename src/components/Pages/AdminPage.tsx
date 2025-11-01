import { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, Save, X, Eye, EyeOff, Search, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Website, Category } from '../../types';

interface AdminPageProps {
  websites: Website[];
  categories: Category[];
  onWebsiteAdd: (website: Omit<Website, 'id'>) => void;
  onWebsiteUpdate: (id: string, website: Partial<Website>) => void;
  onWebsiteDelete: (id: string) => void;
}

interface WebsiteFormData {
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string;
  featured: boolean;
  popular: boolean;
  rating: number;
}

const AdminPage = ({ 
  websites, 
  categories,
  onWebsiteAdd, 
  onWebsiteUpdate, 
  onWebsiteDelete 
}: AdminPageProps) => {
  const { user, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isBulkImporting, setIsBulkImporting] = useState(false); // New state for bulk import
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [bulkImportData, setBulkImportData] = useState(''); // New state for bulk import data
  const [bulkImportResult, setBulkImportResult] = useState<{success: number, failed: number, errors: string[]} | null>(null); // New state for bulk import result

  const [formData, setFormData] = useState<WebsiteFormData>({
    title: '',
    description: '',
    url: '',
    category: '',
    tags: '',
    featured: false,
    popular: false,
    rating: 4.5
  });

  // Check if Supabase is working
  useEffect(() => {
    // In a real implementation, you might want to check Supabase connection here
    // For now, we'll just clear any previous errors when component mounts
    setSupabaseError(null);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (!success) {
      setLoginError('Invalid password');
    } else {
      setLoginError('');
      setPassword('');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      category: '',
      tags: '',
      featured: false,
      popular: false,
      rating: 4.5
    });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const websiteData = {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        featured: formData.featured,
        popular: formData.popular,
        clicks: 0,
        rating: formData.rating,
        dateAdded: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      if (isEditing && isEditing !== 'new') {
        // Update existing website
        await onWebsiteUpdate(isEditing, websiteData);
      } else {
        // Add new website
        await onWebsiteAdd(websiteData);
      }
      
      resetForm();
      setSupabaseError(null);
    } catch (error) {
      console.error('Error saving website:', error);
      setSupabaseError('Failed to save website. Please check your Supabase connection.');
    }
  };

  const handleInlineEdit = (website: Website) => {
    setFormData({
      title: website.title,
      description: website.description,
      url: website.url,
      category: website.category,
      tags: website.tags.join(', '),
      featured: website.featured,
      popular: website.popular,
      rating: website.rating
    });
    setIsEditing(website.id);
  };

  const handleInlineSave = async () => {
    if (isEditing && isEditing !== 'new') {
      try {
        const websiteData = {
          title: formData.title,
          description: formData.description,
          url: formData.url,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
          featured: formData.featured,
          popular: formData.popular,
          rating: formData.rating,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        await onWebsiteUpdate(isEditing, websiteData);
        setIsEditing(null);
        setSupabaseError(null);
      } catch (error) {
        console.error('Error updating website:', error);
        setSupabaseError('Failed to update website. Please check your Supabase connection.');
      }
    }
  };

  const filteredWebsites = websites.filter(website => {
    const matchesSearch = website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || website.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tokyo-night-bg to-tokyo-night-bg-dark flex items-center justify-center p-4">
        <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-tokyo-night-red to-tokyo-night-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
              Enter your password to access the admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-tokyo-night-comment" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-12 pr-12 dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 dark:text-tokyo-night-comment hover:text-gray-600 dark:hover:text-tokyo-night-text" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 dark:text-tokyo-night-comment hover:text-gray-600 dark:hover:text-tokyo-night-text" />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 dark:bg-tokyo-night-red/20 border border-red-200 dark:border-tokyo-night-red/30 text-red-700 dark:text-tokyo-night-red px-4 py-3 rounded-xl text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary dark:bg-tokyo-night-blue dark:hover:bg-tokyo-night-blue/90"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Function to parse bulk import data with improved category detection and error handling
  const parseBulkImportData = (data: string) => {
    // Split by newlines and filter out empty lines
    const rawLines = data.trim().split('\n');
    const lines = rawLines.filter(line => line.trim() !== '');
    
    // If we have an odd number of lines, the last line is incomplete
    const validLineCount = lines.length % 2 === 0 ? lines.length : lines.length - 1;
    
    const websitesToAdd: Partial<Website>[] = [];
    
    console.log(`Processing ${validLineCount} lines (${validLineCount/2} website pairs)`);
    
    // Process data in pairs of lines (title+url, description)
    for (let i = 0; i < validLineCount; i += 2) {
      const titleLine = lines[i]?.trim();
      let descriptionLine = lines[i + 1]?.trim();
      
      console.log(`Processing pair ${i/2 + 1}:`, { titleLine, descriptionLine });
      
      // Skip if we don't have a title line
      if (!titleLine) {
        console.log(`Skipping pair ${i/2 + 1}: Empty title line`);
        continue;
      }
      
      // If we have a title line but no description, use empty string
      let description = descriptionLine || '';
      
      // Check if category is specified in the description line
      let categorySlug = '';
      const categoryMatch = description.match(/#category:([a-z0-9-]+)/i);
      if (categoryMatch) {
        categorySlug = categoryMatch[1];
        // Remove the category specification from the description
        description = description.replace(/#category:[a-z0-9-]+/i, '').trim();
      }
      
      // Extract title and URL from title line
      // Format: "Title - URL" or just "Title - URL" without extra formatting
      let title = '';
      let url = '';
      
      // Try to match the format "Title - URL"
      const titleUrlMatch = titleLine.match(/^(.*?)\s*-\s*(https?:\/\/.*)$/i);
      if (titleUrlMatch) {
        title = titleUrlMatch[1].trim();
        url = titleUrlMatch[2].trim();
        console.log(`Parsed with regex - Title: "${title}", URL: "${url}"`);
      } else {
        // If that doesn't work, try to find URL anywhere in the line
        const urlMatch = titleLine.match(/(https?:\/\/[^\s]+)/i);
        if (urlMatch) {
          url = urlMatch[1];
          // Extract title as everything before the URL
          title = titleLine.substring(0, titleLine.indexOf(url)).replace(/[-\s]+$/, '').trim();
          // If title is empty, use the domain as title
          if (!title) {
            try {
              const urlObj = new URL(url);
              title = urlObj.hostname.replace('www.', '');
              // Capitalize first letter
              title = title.charAt(0).toUpperCase() + title.slice(1);
            } catch {
              title = 'Untitled';
            }
          }
          console.log(`Parsed by URL search - Title: "${title}", URL: "${url}"`);
        } else {
          // No URL found, skip this entry
          console.log(`No URL found in line: "${titleLine}", skipping entry`);
          continue;
        }
      }
      
      // Validate URL
      try {
        new URL(url); // This will throw if URL is invalid
        console.log(`URL is valid: ${url}`);
      } catch {
        // Invalid URL, skip this entry
        console.log(`Invalid URL, skipping entry: ${url}`);
        continue;
      }
      
      // Validate title
      if (!title || title.length < 2) {
        console.log(`Invalid title, skipping entry: "${title}"`);
        continue;
      }
      
      console.log(`Valid entry found - Title: "${title}", URL: "${url}"`);
      
      // Use specified category or auto-detect based on URL content with more precise detection
      let category = 'manga-readers'; // Default category
      if (categorySlug) {
        // Use the specified category
        category = categorySlug;
        console.log(`Using specified category: ${category}`);
      } else {
        // Auto-detect category based on URL, title, and description
        const urlLower = url.toLowerCase();
        const titleLower = title.toLowerCase();
        const descriptionLower = description.toLowerCase();
        
        // More sophisticated category detection based on URL, title, and description
        if (urlLower.includes('manga') || titleLower.includes('manga') || descriptionLower.includes('manga') ||
            urlLower.includes('manhwa') || titleLower.includes('manhwa') || descriptionLower.includes('manhwa') ||
            urlLower.includes('manhua') || titleLower.includes('manhua') || descriptionLower.includes('manhua') ||
            urlLower.includes('comic') || titleLower.includes('comic') || descriptionLower.includes('comic')) {
          category = 'manga-readers';
        } else if (urlLower.includes('anime') || titleLower.includes('anime') || descriptionLower.includes('anime') ||
                   urlLower.includes('animelist') || titleLower.includes('animelist') || descriptionLower.includes('animelist')) {
          category = 'anime';
        } else if (urlLower.includes('novel') || titleLower.includes('novel') || descriptionLower.includes('novel') ||
                   urlLower.includes('fiction') || titleLower.includes('fiction') || descriptionLower.includes('fiction')) {
          category = 'visual-novels';
        } else if (urlLower.includes('ai') || titleLower.includes('ai') || descriptionLower.includes('ai') ||
                   urlLower.includes('chatgpt') || titleLower.includes('chatgpt') || descriptionLower.includes('chatgpt') ||
                   urlLower.includes('openai') || titleLower.includes('openai') || descriptionLower.includes('openai')) {
          category = 'ai-tools';
        } else if (urlLower.includes('github') || titleLower.includes('github') || descriptionLower.includes('github') ||
                   urlLower.includes('git') || titleLower.includes('git') || descriptionLower.includes('git')) {
          category = 'dev-tools';
        } else if (urlLower.includes('notion') || titleLower.includes('notion') || descriptionLower.includes('notion') ||
                   urlLower.includes('productivity') || titleLower.includes('productivity') || descriptionLower.includes('productivity')) {
          category = 'productivity';
        } else if (urlLower.includes('netflix') || titleLower.includes('netflix') || descriptionLower.includes('netflix') ||
                   urlLower.includes('stream') || titleLower.includes('stream') || descriptionLower.includes('stream')) {
          category = 'streaming';
        } else if (urlLower.includes('game') || titleLower.includes('game') || descriptionLower.includes('game')) {
          category = 'games';
        } else if (urlLower.includes('discord') || titleLower.includes('discord') || descriptionLower.includes('discord') ||
                   urlLower.includes('social') || titleLower.includes('social') || descriptionLower.includes('social')) {
          category = 'social';
        } else if (urlLower.includes('spotify') || titleLower.includes('spotify') || descriptionLower.includes('spotify') ||
                   urlLower.includes('music') || titleLower.includes('music') || descriptionLower.includes('music')) {
          category = 'music';
        } else if (urlLower.includes('search') || titleLower.includes('search') || descriptionLower.includes('search')) {
          category = 'search-engines';
        } else if (urlLower.includes('database') || titleLower.includes('database') || descriptionLower.includes('database')) {
          category = 'databases';
        } else if (urlLower.includes('privacy') || titleLower.includes('privacy') || descriptionLower.includes('privacy') ||
                   urlLower.includes('vpn') || titleLower.includes('vpn') || descriptionLower.includes('vpn')) {
          category = 'privacy-tools';
        } else if (urlLower.includes('forum') || titleLower.includes('forum') || descriptionLower.includes('forum')) {
          category = 'forum';
        } else if (urlLower.includes('stat') || titleLower.includes('stat') || descriptionLower.includes('stat') ||
                   urlLower.includes('analytic') || titleLower.includes('analytic') || descriptionLower.includes('analytic')) {
          category = 'statistics';
        } else if (urlLower.includes('art') || titleLower.includes('art') || descriptionLower.includes('art') ||
                   urlLower.includes('design') || titleLower.includes('design') || descriptionLower.includes('design')) {
          category = 'art';
        } else if (urlLower.includes('drama') || titleLower.includes('drama') || descriptionLower.includes('drama')) {
          category = 'asian-drama';
        }
        console.log(`Auto-detected category: ${category}`);
      }
      
      websitesToAdd.push({
        title,
        url,
        description,
        category,
        tags: [], // Will be populated based on URL and title
        featured: false,
        popular: false,
        clicks: 0,
        rating: 4.5,
        dateAdded: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      
      console.log(`Added website: ${title} -> ${category}`);
    }
    
    // Add tags based on content
    websitesToAdd.forEach(website => {
      const tags: string[] = [];
      
      // Add tags based on title content
      const titleLower = website.title?.toLowerCase() || '';
      if (titleLower.includes('manga')) tags.push('Manga');
      if (titleLower.includes('manhwa')) tags.push('Manhwa');
      if (titleLower.includes('manhua')) tags.push('Manhua');
      if (titleLower.includes('webtoon')) tags.push('Webtoon');
      if (titleLower.includes('comic')) tags.push('Comic');
      if (titleLower.includes('novel') && !titleLower.includes('light novel')) tags.push('Novel');
      if (titleLower.includes('light novel')) tags.push('Light Novel');
      if (titleLower.includes('ai')) tags.push('AI');
      if (titleLower.includes('tool')) tags.push('Tool');
      if (titleLower.includes('productivity')) tags.push('Productivity');
      if (titleLower.includes('stream')) tags.push('Streaming');
      if (titleLower.includes('game')) tags.push('Game');
      if (titleLower.includes('social')) tags.push('Social');
      if (titleLower.includes('music')) tags.push('Music');
      if (titleLower.includes('search')) tags.push('Search');
      if (titleLower.includes('database')) tags.push('Database');
      if (titleLower.includes('privacy')) tags.push('Privacy');
      if (titleLower.includes('forum')) tags.push('Forum');
      if (titleLower.includes('stat')) tags.push('Statistics');
      if (titleLower.includes('art')) tags.push('Art');
      if (titleLower.includes('drama')) tags.push('Drama');
      if (titleLower.includes('anime')) tags.push('Anime');
      
      // Add tags based on URL content
      const urlLower = website.url?.toLowerCase() || '';
      if (urlLower.includes('raw')) tags.push('Raw');
      if (urlLower.includes('scan') || urlLower.includes('tl')) tags.push('Scanlation');
      if (urlLower.includes('fan')) tags.push('Fan');
      if (urlLower.includes('free')) tags.push('Free');
      if (urlLower.includes('reader')) tags.push('Reader');
      if (urlLower.includes('community')) tags.push('Community');
      
      // Add generic tags
      tags.push('Free', 'Reader');
      
      // Remove duplicates and limit to reasonable number
      website.tags = [...new Set(tags)].slice(0, 10);
    });
    
    console.log(`Total websites to add: ${websitesToAdd.length}`);
    return websitesToAdd as Omit<Website, 'id'>[];
  };

  // Function to handle bulk import
  const handleBulkImport = async () => {
    if (!bulkImportData.trim()) {
      setBulkImportResult({
        success: 0,
        failed: 0,
        errors: ['Please enter website data to import']
      });
      return;
    }

    try {
      const websitesToAdd = parseBulkImportData(bulkImportData);
      
      if (websitesToAdd.length === 0) {
        setBulkImportResult({
          success: 0,
          failed: 0,
          errors: ['No valid websites found in the provided data. Please check the format. Make sure each website is represented by exactly two lines: Title - URL on the first line, and Description on the second line.']
        });
        return;
      }
      
      let successCount = 0;
      let failedCount = 0;
      const errors: string[] = [];
      
      // Process websites one by one to provide detailed feedback
      for (const website of websitesToAdd) {
        try {
          if (!website.title || !website.url) {
            failedCount++;
            errors.push(`Skipped entry: Missing title or URL`);
            continue;
          }
          
          // Validate URL format
          try {
            new URL(website.url);
          } catch {
            failedCount++;
            errors.push(`Invalid URL for "${website.title}": ${website.url}`);
            continue;
          }
          
          // Try to add the website
          const result = await onWebsiteAdd(website);
          if (result !== null && result !== undefined) {
            successCount++;
          } else {
            failedCount++;
            errors.push(`Failed to add "${website.title}": Server returned null result`);
          }
        } catch (error: any) {
          failedCount++;
          console.error(`Error adding website "${website.title}":`, error);
          
          // Check if it's a duplicate entry error
          if (error?.message?.includes('duplicate') || error?.message?.includes('unique constraint')) {
            errors.push(`"${website.title}" already exists in the database`);
          } else if (error?.message) {
            errors.push(`Failed to add "${website.title}": ${error.message}`);
          } else {
            errors.push(`Failed to add "${website.title}": ${error || 'Unknown error occurred'}`);
          }
        }
      }
      
      setBulkImportResult({
        success: successCount,
        failed: failedCount,
        errors
      });
      
      // Reset form after successful import (only if there were successes)
      if (successCount > 0) {
        setBulkImportData('');
      }
    } catch (error: any) {
      console.error('Error during bulk import:', error);
      setBulkImportResult({
        success: 0,
        failed: 0,
        errors: [`Bulk import failed: ${error?.message || error || 'Unknown error'}`]
      });
    }
  };

  // Reset bulk import form
  const resetBulkImportForm = () => {
    setBulkImportData('');
    setBulkImportResult(null);
    setIsBulkImporting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-3xl shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-tokyo-night-red to-tokyo-night-pink rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                  Manage websites and directory content
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-tokyo-night-bg-highlight text-gray-700 dark:text-tokyo-night-text rounded-xl hover:bg-gray-200 dark:hover:bg-tokyo-night-bg-highlight/80 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-lato">Logout</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {supabaseError && (
          <div className="bg-red-50 dark:bg-tokyo-night-red/20 border border-red-200 dark:border-tokyo-night-red/30 text-red-700 dark:text-tokyo-night-red px-4 py-3 rounded-xl text-sm mb-6">
            <div className="flex items-center">
              <span className="font-bold mr-2">Error:</span>
              <span>{supabaseError}</span>
            </div>
            <div className="mt-2 text-sm">
              Please ensure your Supabase tables are created. Check the CREATE_TABLES.sql file for the required SQL commands.
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-2xl p-6 border border-gray-200/50 dark:border-tokyo-night-comment">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              {websites.length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Total Websites</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-2xl p-6 border border-gray-200/50 dark:border-tokyo-night-comment">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              {websites.filter(w => w.featured).length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Featured</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-2xl p-6 border border-gray-200/50 dark:border-tokyo-night-comment">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              {websites.filter(w => w.popular).length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Popular</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-2xl p-6 border border-gray-200/50 dark:border-tokyo-night-comment">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              {categories.length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Categories</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-3xl shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-tokyo-night-comment" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search websites..."
                  className="form-input pl-12 dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select min-w-[200px] dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => {
                  resetForm();
                  setIsAdding(true);
                  setIsEditing('new'); // Special identifier for new websites
                }}
                className="flex items-center space-x-2 btn-primary dark:bg-tokyo-night-blue dark:hover:bg-tokyo-night-blue/90"
              >
                <Plus className="w-4 h-4" />
                <span>Add Website</span>
              </button>
              
              {/* Bulk Import Button */}
              <button
                onClick={() => {
                  resetBulkImportForm();
                  setIsBulkImporting(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Bulk Import</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Import Form */}
        {isBulkImporting && (
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-3xl shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                Bulk Import Websites
              </h2>
              <button
                onClick={resetBulkImportForm}
                className="p-2 text-gray-400 dark:text-tokyo-night-comment hover:text-gray-600 dark:hover:text-tokyo-night-text rounded-lg hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                Paste Website Data (Format: Title - URL on one line, Description on the next line)
              </label>
              <textarea
                value={bulkImportData}
                onChange={(e) => setBulkImportData(e.target.value)}
                className="form-textarea dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment w-full"
                rows={10}
                placeholder={`Example format (each website is two lines: Title - URL on first line, Description on second line):
ChatGPT - https://chat.openai.com
Advanced conversational AI assistant for various tasks and creative projects. #category:ai-tools
GitHub - https://github.com
World's leading software development platform and version control system. #category:dev-tools
Notion - https://notion.so
All-in-one workspace for notes, docs, projects and collaboration.
MangaDex - https://mangadex.org
A fan-driven platform hosting manga scans in multiple languages, known for its vast library and active community. #category:manga-readers
Netflix - https://netflix.com
Premium streaming service for movies, TV shows, and documentaries. #category:streaming`}
              />
              <p className="text-sm text-gray-500 dark:text-tokyo-night-comment mt-2">
                Each website should be represented by two lines: Title - URL on the first line, and Description on the second line.
                The system will automatically detect the most appropriate category based on the website content.
                To manually specify a category, add #category:category-slug at the end of the description line.
                Supported categories: {categories.map(cat => cat.name).join(', ')}
              </p>
            </div>

            {bulkImportResult && (
              <div className={`p-4 rounded-xl mb-6 ${
                bulkImportResult.failed === 0 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30' 
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30'
              }`}>
                <div className="flex items-center">
                  <span className="font-bold mr-2">Import Result:</span>
                  <span>
                    {bulkImportResult.success} successful, {bulkImportResult.failed} failed
                  </span>
                </div>
                {bulkImportResult.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Errors:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {bulkImportResult.errors.slice(0, 5).map((error, index) => (
                        <li key={index} className="text-sm">{error}</li>
                      ))}
                      {bulkImportResult.errors.length > 5 && (
                        <li className="text-sm">...and {bulkImportResult.errors.length - 5} more errors</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleBulkImport}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4" />
                <span>Import Websites</span>
              </button>
              <button
                onClick={resetBulkImportForm}
                className="flex items-center space-x-2 bg-gray-200 dark:bg-tokyo-night-bg-highlight text-gray-700 dark:text-tokyo-night-text px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-tokyo-night-bg-highlight/80 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Website Form - Improved Organization */}
        {(isAdding || (isEditing && isEditing !== 'new')) && (
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-3xl shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                {isEditing && isEditing !== 'new' ? 'Edit Website' : 'Add New Website'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 dark:text-tokyo-night-comment dark:hover:text-tokyo-night-text"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {/* Basic Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-tokyo-night-text mb-4 font-ubuntu border-b-2 border-tokyo-night-blue dark:border-tokyo-night-blue pb-2">
                  Basic Information
                </h3>
                <p className="text-sm text-gray-600 dark:text-tokyo-night-text-dark mb-4">
                  Essential details about the website
                </p>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment"
                  placeholder="Enter website title"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment"
                  rows={4}
                  placeholder="Enter a detailed description of the website. Include key features, target audience, and what makes this site unique..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-tokyo-night-comment">
                  Provide a comprehensive description that helps users understand the website's purpose and value.
                </p>
              </div>

              {/* Categorization Section */}
              <div className="md:col-span-2 mt-6 pt-4 border-t border-gray-100 dark:border-tokyo-night-comment">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-tokyo-night-text mb-4 font-ubuntu border-b-2 border-tokyo-night-green dark:border-tokyo-night-green pb-2">
                  Categorization
                </h3>
                <p className="text-sm text-gray-600 dark:text-tokyo-night-text-dark mb-4">
                  Organize the website into appropriate categories and tags
                </p>
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text dark:placeholder-tokyo-night-comment"
                  placeholder="AI, Tool, Productivity"
                />
              </div>

              {/* Rating & Status Section */}
              <div className="md:col-span-2 mt-6 pt-4 border-t border-gray-100 dark:border-tokyo-night-comment">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-tokyo-night-text mb-4 font-ubuntu border-b-2 border-tokyo-night-purple dark:border-tokyo-night-purple pb-2">
                  Rating & Status
                </h3>
                <p className="text-sm text-gray-600 dark:text-tokyo-night-text-dark mb-4">
                  Set the website's rating and visibility status
                </p>
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                  className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-tokyo-night-comment">
                  Higher ratings improve visibility
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-tokyo-night-text mb-2 font-ubuntu">
                  Status
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-gray-300 text-tokyo-night-blue focus:ring-tokyo-night-blue dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment h-5 w-5"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-tokyo-night-text font-ubuntu">Featured</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="rounded border-gray-300 text-tokyo-night-blue focus:ring-tokyo-night-blue dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment h-5 w-5"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-tokyo-night-text font-ubuntu">Popular</span>
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-tokyo-night-comment">
                  Featured websites appear in the featured section. Popular websites appear in the popular section.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 pt-4">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 dark:border-tokyo-night-comment text-gray-700 dark:text-tokyo-night-text font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 font-ubuntu"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 btn-primary dark:bg-tokyo-night-blue dark:hover:bg-tokyo-night-blue/90 px-6 py-3"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isEditing && isEditing !== 'new' ? 'Update Website' : 'Add Website'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Websites List */}
        <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-3xl shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu mb-6">
            Manage Websites ({filteredWebsites.length})
          </h2>
          
          {filteredWebsites.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-tokyo-night-bg-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400 dark:text-tokyo-night-comment" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
                No websites found
              </h3>
              <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                {searchTerm || selectedCategory ? 'Try adjusting your filters' : 'Add your first website to get started'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-tokyo-night-comment table-auto">
                <thead className="bg-gray-50 dark:bg-tokyo-night-bg-highlight">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Website</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">URL</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Tags</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Featured</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Popular</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-tokyo-night-text-dark uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-tokyo-night-bg-dark divide-y divide-gray-200 dark:divide-tokyo-night-comment">
                  {filteredWebsites.map(website => (
                    <tr key={website.id} className="hover:bg-gray-50 dark:hover:bg-tokyo-night-bg-highlight/50">
                      {isEditing === website.id ? (
                        // Inline editing row
                        <>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-1">
                              <span className="text-xl">🌐</span>
                              <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                                required
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={formData.url}
                              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                              className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                              required
                            />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              className="form-select w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                            >
                              {categories.map(category => (
                                <option key={category.id} value={category.slug}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="form-textarea w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                              rows={3}
                              placeholder="Description..."
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={formData.tags}
                              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                              className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                              placeholder="AI, Tool, Productivity"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col space-y-2">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.featured}
                                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                  className="rounded border-gray-300 text-tokyo-night-blue focus:ring-tokyo-night-blue dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment"
                                />
                                <span className="text-sm">Featured</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.popular}
                                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                  className="rounded border-gray-300 text-tokyo-night-blue focus:ring-tokyo-night-blue dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment"
                                />
                                <span className="text-sm">Popular</span>
                              </label>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              max="5"
                              step="0.1"
                              value={formData.rating}
                              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                              className="form-input w-full dark:bg-tokyo-night-bg-dark dark:border-tokyo-night-comment dark:text-tokyo-night-text"
                            />
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            <button
                              onClick={handleInlineSave}
                              className="text-tokyo-night-blue hover:text-tokyo-night-blue/80 mr-2"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setIsEditing(null)}
                              className="text-gray-500 hover:text-gray-700 dark:text-tokyo-night-comment dark:hover:text-tokyo-night-text"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </td>
                        </>
                      ) : (
                        // Display row
                        <>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center space-x-1">
                              <span className="text-xl">{website.icon || '🌐'}</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-tokyo-night-text">{website.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-tokyo-night-text-dark truncate max-w-xs">{website.url}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-tokyo-night-blue/10 text-tokyo-night-blue dark:bg-tokyo-night-blue/20">
                              {website.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-tokyo-night-text-dark max-w-xs truncate" title={website.description}>
                              {website.description}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-tokyo-night-text-dark">
                              {website.tags.join(', ')}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {website.featured ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {website.popular ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-tokyo-night-text-dark">
                            {website.rating}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleInlineEdit(website)}
                              className="text-tokyo-night-blue hover:text-tokyo-night-blue/80 mr-2"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                if (window.confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
                  onWebsiteDelete(website.id);
                }
              }}
                              className="text-red-500 hover:text-red-700 dark:text-tokyo-night-red dark:hover:text-tokyo-night-red/80"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;