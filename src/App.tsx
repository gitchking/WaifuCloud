import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Layout/Header';
import HomePage from './components/Pages/HomePage';
import FeaturedPage from './components/Pages/FeaturedPage';
import CategoriesPage from './components/Pages/CategoriesPage';
import PopularPage from './components/Pages/PopularPage';
import ChangelogPage from './components/Pages/ChangelogPage';
import TOSPage from './components/Pages/TOSPage';
import PPPage from './components/Pages/PPPage';
import FAQPage from './components/Pages/FAQPage';
import AdminPage from './components/Pages/AdminPage';
import { Website, Category } from './types';
// Import static data as fallback
import { websites as initialWebsites } from './data/websites';
import { categories as initialCategories } from './data/categories';
import { getWebsites, getCategories, addWebsite, updateWebsite, deleteWebsite, recordWebsiteClick } from './services/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [websites, setWebsites] = useState<Website[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([]);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode as default
  const [loading, setLoading] = useState(true);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  // Define fixed colors for footer
  const footerColors = {
    titleColor: 'text-gray-900 dark:text-tokyo-night-text',
    textColor: 'text-gray-600 dark:text-tokyo-night-text-dark',
    linkColor: 'text-gray-600 dark:text-tokyo-night-text-dark hover:text-blue-600 dark:hover:text-tokyo-night-blue',
    accentColor: 'text-blue-600 dark:text-tokyo-night-blue'
  };

  // Check if Supabase is configured
  useEffect(() => {
    const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
    const isConfigured = supabaseUrl && supabaseKey && 
                         supabaseUrl !== 'your_supabase_project_url_here' && 
                         supabaseKey !== 'your_supabase_anon_key_here';
    
    setSupabaseConfigured(!!isConfigured);
    
    if (!isConfigured) {
      // Use static data if Supabase is not configured
      setWebsites(initialWebsites);
      setCategories(initialCategories);
      setFilteredWebsites(initialWebsites);
      setLoading(false);
    }
  }, []);

  // Fetch data from Supabase on component mount or use static data as fallback
  useEffect(() => {
    if (!supabaseConfigured) return;

    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Try to fetch from Supabase
        const [websitesData, categoriesData] = await Promise.all([
          getWebsites(),
          getCategories()
        ]);
        
        // Check if we got data or empty arrays
        if (websitesData.length === 0 && categoriesData.length === 0) {
          // If both are empty, it might be a connection issue or empty database
          console.warn('No data returned from Supabase. Using static data as fallback.');
          setWebsites(initialWebsites);
          setCategories(initialCategories);
          setFilteredWebsites(initialWebsites);
        } else {
          setWebsites(websitesData);
          setCategories(categoriesData);
          setFilteredWebsites(websitesData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        // Fallback to static data on error
        setWebsites(initialWebsites);
        setCategories(initialCategories);
        setFilteredWebsites(initialWebsites);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabaseConfigured]);

  // Initialize dark mode - now set to true by default
  useEffect(() => {
    try {
      // Set dark mode as default, but still check localStorage for user preference
      const savedDarkMode = localStorage.getItem('darkMode');
      
      if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
      } else {
        // Dark mode is already true by default
        setDarkMode(true);
      }
    } catch (error) {
      console.warn('Could not access localStorage for dark mode preference');
      setDarkMode(true); // Ensure dark mode is on by default
    }
  }, []);

  // Apply dark mode class to document element
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', darkMode.toString());
    } catch (error) {
      console.warn('Could not save dark mode preference to localStorage');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter websites based on search query
  useEffect(() => {
    try {
      if (!searchQuery.trim()) {
        setFilteredWebsites(websites);
        return;
      }

      const filtered = websites.filter(website =>
        website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        website.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredWebsites(filtered);
    } catch (error) {
      console.error('Error filtering websites:', error);
      setFilteredWebsites(websites);
    }
  }, [searchQuery, websites]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedCategory('');
    if (page !== 'search') {
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (slug: string) => {
    if (slug === 'all') {
      setCurrentPage('categories');
      setSelectedCategory('');
    } else {
      setCurrentPage('categories');
      setSelectedCategory(slug);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentPage('search');
    }
  };

  // Website management functions for admin using Supabase
  const handleWebsiteAdd = async (newWebsite: Omit<Website, 'id'>) => {
    try {
      console.log('handleWebsiteAdd called with:', newWebsite);
      
      if (supabaseConfigured) {
        const website = await addWebsite(newWebsite);
        console.log('addWebsite returned:', website);
        
        if (website) {
          setWebsites(prev => [...prev, website]);
          return website; // Return the added website
        } else {
          throw new Error('Failed to add website to database - server returned null');
        }
      } else {
        // Fallback for static data (in a real app, you'd want to persist this)
        console.warn('Supabase not configured. Cannot add website in static mode.');
        throw new Error('Supabase not configured. Cannot add website in static mode.');
      }
    } catch (error: any) {
      console.error('Error adding website:', error);
      // Provide more specific error messages
      if (error.message && error.message.includes('Failed to add website')) {
        throw error; // Re-throw our own errors
      } else {
        throw new Error(`Failed to add website to database: ${error.message || error || 'Unknown error'}`);
      }
    }
  };

  const handleWebsiteUpdate = async (id: string, updates: Partial<Website>) => {
    try {
      if (supabaseConfigured) {
        const success = await updateWebsite(id, updates);
        if (success) {
          setWebsites(prev =>
            prev.map(website =>
              website.id === id
                ? { ...website, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
                : website
            )
          );
        }
      } else {
        // Fallback for static data
        console.warn('Supabase not configured. Cannot update website in static mode.');
        alert('Supabase not configured. Cannot update website in static mode.');
      }
    } catch (error) {
      console.error('Error updating website:', error);
    }
  };

  const handleWebsiteDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      try {
        if (supabaseConfigured) {
          const success = await deleteWebsite(id);
          if (success) {
            setWebsites(prev => prev.filter(website => website.id !== id));
          }
        } else {
          // Fallback for static data
          console.warn('Supabase not configured. Cannot delete website in static mode.');
          alert('Supabase not configured. Cannot delete website in static mode.');
        }
      } catch (error) {
        console.error('Error deleting website:', error);
      }
    }
  };

  // Function to handle website click and record it in real-time
  const handleWebsiteClick = async (website: Website) => {
    try {
      // Open the website immediately without waiting for click recording
      window.open(website.url, '_blank', 'noopener,noreferrer');
      
      // Record the click in real-time asynchronously
      if (supabaseConfigured) {
        const success = await recordWebsiteClick(website.id);
        if (success) {
          // Update the local state to reflect the new click count
          setWebsites(prev =>
            prev.map(w =>
              w.id === website.id
                ? { ...w, clicks: w.clicks + 1 }
                : w
            )
          );
        }
      }
    } catch (error) {
      console.error('Error recording website click:', error);
      // The website is already opened, so no need to open it again here
    }
  };

  // Render the appropriate page
  const renderCurrentPage = () => {
    const displayWebsites = currentPage === 'search' ? filteredWebsites : websites;

    // Show loading state
    if (loading && supabaseConfigured) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-tokyo-night-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Loading data from Supabase...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            websites={displayWebsites}
            categories={categories}
            onCategoryClick={handleCategoryClick}
            onWebsiteClick={handleWebsiteClick}
          />
        );
      case 'featured':
        return <FeaturedPage websites={displayWebsites} onWebsiteClick={handleWebsiteClick} />;
      case 'categories':
        return (
          <CategoriesPage
            categories={categories}
            websites={displayWebsites}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            onWebsiteClick={handleWebsiteClick}
          />
        );
      case 'popular':
        return <PopularPage websites={displayWebsites} onWebsiteClick={handleWebsiteClick} />;
      case 'changelog':
        return <ChangelogPage />;
      case 'tos':
        return <TOSPage />;
      case 'pp':
        return <PPPage />;
      case 'faq':
        return <FAQPage />;
      case 'admin':
        return (
          <AdminPage
            websites={websites}
            categories={categories}
            onWebsiteAdd={handleWebsiteAdd}
            onWebsiteUpdate={handleWebsiteUpdate}
            onWebsiteDelete={handleWebsiteDelete}
          />
        );
      case 'search':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Search Results Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-tokyo-night-text mb-6 font-ubuntu">
                  Search Results
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
                    "{searchQuery}"
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-tokyo-night-text-dark max-w-3xl mx-auto font-lato leading-relaxed">
                  {filteredWebsites.length > 0 
                    ? `Found ${filteredWebsites.length} website${filteredWebsites.length === 1 ? '' : 's'} matching your search`
                    : 'No websites found matching your search criteria'
                  }
                </p>
              </div>

              {/* Search Results */}
              {filteredWebsites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredWebsites.map(website => (
                    <div key={website.id} className="transform hover:scale-105 transition-transform duration-200">
                      <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-2xl border border-gray-200/50 dark:border-tokyo-night-comment p-6 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-tokyo-night-blue/10 transition-all duration-300 cursor-pointer">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-xl flex items-center justify-center text-2xl shadow-sm">
                              {website.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-tokyo-night-text font-ubuntu line-clamp-1">
                              {website.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-tokyo-night-text-dark font-lato mt-1 line-clamp-2">
                              {website.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {website.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs font-medium text-gray-600 dark:text-tokyo-night-text bg-gray-100 dark:bg-tokyo-night-bg-highlight rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600 dark:text-tokyo-night-blue font-medium">
                            {categories.find(cat => cat.slug === website.category)?.name || website.category}
                          </span>
                          <button
                            onClick={() => window.open(website.url, '_blank')}
                            className="text-blue-600 dark:text-tokyo-night-blue hover:text-blue-700 dark:hover:text-tokyo-night-blue/80 font-medium text-sm"
                          >
                            Visit →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-tokyo-night-bg-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-tokyo-night-text mb-4 font-ubuntu">
                    No websites found
                  </h3>
                  <p className="text-gray-600 dark:text-tokyo-night-text-dark mb-8 font-lato">
                    Try searching with different keywords or browse our categories
                  </p>
                  <button
                    onClick={() => handlePageChange('categories')}
                    className="btn-primary"
                  >
                    Browse Categories
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            websites={displayWebsites}
            categories={categories}
            onCategoryClick={handleCategoryClick}
            onWebsiteClick={handleWebsiteClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-tokyo-night-bg">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      
      <main className="animate-fade-in">
        {renderCurrentPage()}
      </main>

      {/* Theme Switch Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 p-3 bg-white dark:bg-tokyo-night-bg-dark rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 border border-gray-200 dark:border-tokyo-night-comment"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-tokyo-night-blue" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Footer - Only show on non-category pages or when no category is selected */}
      {(currentPage !== 'categories' || !selectedCategory) && (
        <footer className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-tokyo-night-bg-dark dark:to-tokyo-night-bg-highlight border-t border-gray-200/50 dark:border-tokyo-night-comment mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Social Links - Left */}
              <div className="flex space-x-4 mb-6 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-tokyo-night-bg-dark border border-gray-200 dark:border-tokyo-night-comment flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <span className="text-blue-500 dark:text-tokyo-night-blue font-bold text-base">f</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-tokyo-night-bg-dark border border-gray-200 dark:border-tokyo-night-comment flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <span className="text-blue-400 dark:text-tokyo-night-blue font-bold text-base">t</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-tokyo-night-bg-dark border border-gray-200 dark:border-tokyo-night-comment flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <span className="text-pink-500 dark:text-tokyo-night-pink font-bold text-base">in</span>
                </div>
              </div>
              
              {/* Copyright - Centered according to website body */}
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mb-6 md:mb-0">
                <p className={`${footerColors.textColor} font-lato text-base text-center`}>
                  © 2025 WebDirectory, All Rights Reserved
                </p>
              </div>
              
              {/* Legal Links - Right */}
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => handlePageChange('tos')}
                  className={`${footerColors.linkColor} text-base font-lato hover:underline`}
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => handlePageChange('pp')}
                  className={`${footerColors.linkColor} text-base font-lato hover:underline`}
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => handlePageChange('faq')}
                  className={`${footerColors.linkColor} text-base font-lato hover:underline`}
                >
                  FAQ
                </button>
                <button className={`${footerColors.linkColor} text-base font-lato hover:underline`}>Contact Us</button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;