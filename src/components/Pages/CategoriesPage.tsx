import { useState } from 'react';
import { Grid3X3, Search, Zap, AlertTriangle } from 'lucide-react';
import CategoryCard from '../Cards/CategoryCard';
import WebsiteCard from '../Cards/WebsiteCard';
import { Category, Website } from '../../types';

interface CategoriesPageProps {
  categories: Category[];
  websites: Website[];
  selectedCategory?: string;
  onCategoryClick: (slug: string) => void;
  onWebsiteClick?: (website: Website) => void;
}

// Function to determine website status based on activity metrics
const getWebsiteStatus = (website: Website) => {
  // Consider a website "active" if it has:
  // 1. High click count (popular)
  // 2. High rating
  // 3. Recently updated
  const isPopular = website.popular || website.clicks > 1000;
  const isHighRated = website.rating >= 4.0;
  const isRecentlyUpdated = new Date(website.lastUpdated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Updated in last 30 days
  
  if (isPopular && isHighRated) return 'active';
  if (isPopular || isHighRated) return 'moderate';
  if (isRecentlyUpdated) return 'recent';
  return 'inactive';
};

// Function to sort websites by status
const sortWebsitesByStatus = (websites: Website[]) => {
  return [...websites].sort((a, b) => {
    const statusA = getWebsiteStatus(a);
    const statusB = getWebsiteStatus(b);
    
    // Define status priority: active > moderate > recent > inactive
    const statusPriority = {
      active: 4,
      moderate: 3,
      recent: 2,
      inactive: 1
    };
    
    // Sort by status priority (descending)
    if (statusPriority[statusA] !== statusPriority[statusB]) {
      return statusPriority[statusB] - statusPriority[statusA];
    }
    
    // If same status, sort by clicks (descending)
    if (a.clicks !== b.clicks) {
      return b.clicks - a.clicks;
    }
    
    // If same clicks, sort by rating (descending)
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }
    
    // If same rating, sort by last updated (descending)
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
};

const CategoriesPage = ({ 
  categories, 
  websites, 
  selectedCategory, 
  onCategoryClick,
  onWebsiteClick
}: CategoriesPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryWebsites = selectedCategory
    ? websites.filter(site => site.category === selectedCategory)
    : [];

  // Sort websites by status
  const sortedCategoryWebsites = sortWebsitesByStatus(categoryWebsites);

  // Separate websites into active and inactive groups
  const activeWebsites = sortedCategoryWebsites.filter(website => 
    getWebsiteStatus(website) === 'active' || getWebsiteStatus(website) === 'moderate'
  );
  
  const inactiveWebsites = sortedCategoryWebsites.filter(website => 
    getWebsiteStatus(website) === 'inactive' || getWebsiteStatus(website) === 'recent'
  );

  const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory);

  if (selectedCategory && selectedCategoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Navigation - Reduced margin */}
          <div className="mb-6">
            <button
              onClick={() => onCategoryClick('all')}
              className="flex items-center space-x-2 text-blue-600 dark:text-tokyo-night-blue hover:text-blue-700 dark:hover:text-tokyo-night-blue/80 transition-colors duration-200 font-lato"
            >
              <span>← Back to Categories</span>
            </button>
          </div>

          {/* Category Header - Improved alignment */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-tokyo-night-comment">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <Grid3X3 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                  {selectedCategoryData.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-tokyo-night-text-dark font-lato mt-1">
                  {selectedCategoryData.description}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-tokyo-night-bg-highlight text-blue-800 dark:text-tokyo-night-blue px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
              {categoryWebsites.length} websites available
            </div>
          </div>

          {/* Websites Grid - Four cards per row */}
          {sortedCategoryWebsites.length > 0 ? (
            <div>
              {/* Active/Popular Websites Section */}
              {activeWebsites.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center space-x-2 mb-6">
                    <Zap className="w-5 h-5 text-green-500 dark:text-tokyo-night-green" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                      Active & Popular Sites
                    </h2>
                    <span className="bg-green-100 dark:bg-tokyo-night-green/20 text-green-800 dark:text-tokyo-night-green text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {activeWebsites.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activeWebsites.map(website => (
                      <WebsiteCard key={website.id} website={website} categories={categories} onCardClick={onWebsiteClick} />
                    ))}
                  </div>
                </div>
              )}

              {/* Inactive Websites Section */}
              {inactiveWebsites.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-tokyo-night-yellow" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                      Less Active Sites
                    </h2>
                    <span className="bg-yellow-100 dark:bg-tokyo-night-yellow/20 text-yellow-800 dark:text-tokyo-night-yellow text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {inactiveWebsites.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {inactiveWebsites.map(website => (
                      <div key={website.id} className="opacity-80 hover:opacity-100 transition-opacity duration-200">
                        <WebsiteCard website={website} categories={categories} onCardClick={onWebsiteClick} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-tokyo-night-bg-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400 dark:text-tokyo-night-comment" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
                No websites found
              </h3>
              <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                This category is being updated. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - Reduced margins */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-tokyo-night-bg-highlight px-4 py-2 rounded-full text-sm font-medium text-blue-800 dark:text-tokyo-night-blue mb-4">
            <Grid3X3 className="w-4 h-4" />
            <span className="font-lato">Organized Collections</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-tokyo-night-text mb-4 font-ubuntu">
            Browse by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
              Categories
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-tokyo-night-text-dark max-w-3xl mx-auto font-lato leading-relaxed">
            Explore our comprehensive collection of websites organized into {categories.length} categories. 
            Find exactly what you're looking for with our intuitive classification system.
          </p>
        </div>

        {/* Search - Reduced margins */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-tokyo-night-comment" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-tokyo-night-bg-dark border border-gray-200 dark:border-tokyo-night-comment rounded-xl text-gray-900 dark:text-tokyo-night-text placeholder-gray-500 dark:placeholder-tokyo-night-comment focus:ring-2 focus:ring-blue-500 dark:focus:ring-tokyo-night-blue focus:border-transparent transition-all duration-200 shadow-sm font-lato"
            />
          </div>
        </div>

        {/* Categories Stats - Reduced margins */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              {categories.length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Categories</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              {websites.length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Total Websites</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              {websites.filter(w => w.featured).length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Featured</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-dark rounded-xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              {websites.filter(w => w.popular).length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Popular</p>
          </div>
        </div>

        {/* Categories Grid - Four cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredCategories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;