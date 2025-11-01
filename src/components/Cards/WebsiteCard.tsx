import { Star, TrendingUp } from 'lucide-react';
import { Website, Category } from '../../types';

interface WebsiteCardProps {
  website: Website;
  onCardClick?: (website: Website) => void;
  categories: Category[]; // Fix the type to match what we're passing
}

const WebsiteCard = ({ website, onCardClick, categories }: WebsiteCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onCardClick) {
      onCardClick(website);
    } else {
      window.open(website.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Find the category name based on the website's category slug
  const categoryName = categories.find(cat => cat.slug === website.category)?.name || website.category;

  // Extract favicon URL from website URL or use stored icon
  const getFaviconUrl = (url: string, storedIcon: string) => {
    // If stored icon is a URL (favicon), use it directly
    if (storedIcon && (storedIcon.startsWith('http') || storedIcon.startsWith('https'))) {
      return storedIcon;
    }
    
    // Otherwise, try to get favicon from Google service
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      // Fallback to stored icon or default emoji
      return storedIcon || '🌐';
    }
  };

  const faviconUrl = getFaviconUrl(website.url, website.icon || '');

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-white dark:bg-tokyo-night-bg-dark rounded-xl border border-gray-200 dark:border-tokyo-night-comment p-4 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-tokyo-night-blue/10 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-tokyo-night-bg-highlight/50 dark:to-tokyo-night-bg-dark/50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />
      
      {/* Pulsing animation for featured websites */}
      {website.featured && (
        <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] dark:shadow-[0_0_20px_rgba(128,191,255,0.3)] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}

      {/* Featured Badge - Show only for featured websites */}
      {website.featured && (
        <div className="absolute top-2 right-2 z-20">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-tokyo-night-yellow dark:to-tokyo-night-orange text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center whitespace-nowrap transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <Star className="inline w-3 h-3 mr-1 animate-pulse" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Popular Badge - Show only for popular websites that are NOT featured */}
      {website.popular && !website.featured && (
        <div className="absolute top-2 right-2 z-20">
          <div className="flex items-center space-x-1 bg-red-500 dark:bg-tokyo-night-red text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <TrendingUp className="w-3 h-3 animate-bounce" />
            <span>Popular</span>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Icon and Title */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex-shrink-0">
            {faviconUrl && (faviconUrl.startsWith('http') || faviconUrl.startsWith('https')) ? (
              <img 
                src={faviconUrl} 
                alt={`${website.title} favicon`}
                className="w-10 h-10 rounded-lg group-hover:scale-110 transition-all duration-300 shadow-sm transform"
                onError={(e) => {
                  // Fallback to emoji if favicon fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '';
                  target.style.display = 'none';
                  target.nextElementSibling!.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-all duration-300 shadow-sm hidden transform">
              {faviconUrl && !faviconUrl.startsWith('http') ? faviconUrl : '🌐'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-800 dark:text-tokyo-night-text transition-all duration-300 font-ubuntu line-clamp-1 transform group-hover:translate-x-1">
              {website.title}
            </h3>
            {/* Category Label - Moved to be directly under title */}
            <div className="mt-1">
              <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-tokyo-night-blue bg-blue-50 dark:bg-tokyo-night-bg-highlight rounded-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                {categoryName}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-tokyo-night-text-dark font-lato mt-2 line-clamp-2 h-10 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-tokyo-night-text">
              {website.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-tokyo-night-comment transition-all duration-300 group-hover:border-blue-200 dark:group-hover:border-tokyo-night-blue/30">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 dark:bg-tokyo-night-green rounded-full animate-pulse"></span>
              <span className="font-lato text-xs text-gray-600 dark:text-tokyo-night-text-dark transition-all duration-300 group-hover:text-green-600 dark:group-hover:text-tokyo-night-green">{website.clicks.toLocaleString()} clicks</span>
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 dark:text-tokyo-night-yellow fill-current transition-all duration-300 group-hover:scale-125" />
              <span className="font-lato text-xs text-gray-600 dark:text-tokyo-night-text-dark transition-all duration-300 group-hover:text-yellow-600 dark:group-hover:text-tokyo-night-yellow">{website.rating}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-tokyo-night-comment font-lato transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-tokyo-night-text">
            Updated {new Date(website.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;