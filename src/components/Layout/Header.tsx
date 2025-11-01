import { useState, useMemo } from 'react';
import { Search, Menu, X, Home, Star, Grid3X3, TrendingUp, FileText } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearch: (query: string) => void;
}

const Header = ({ currentPage, onPageChange, onSearch }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Define permanent colors
  const colors = {
    titleColor: 'text-gray-900 dark:text-tokyo-night-text',
    subtitleColor: 'text-gray-500 dark:text-tokyo-night-comment',
    accentColor: 'text-blue-600 dark:text-tokyo-night-blue'
  };

  // Define unique colors for each navigation item
  const navigationItems = useMemo(() => [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      color: 'text-blue-600 dark:text-blue-400',
      activeColor: 'text-blue-700 dark:text-blue-300'
    },
    { 
      id: 'categories', 
      label: 'Categories', 
      icon: Grid3X3,
      color: 'text-green-600 dark:text-green-400',
      activeColor: 'text-green-700 dark:text-green-300'
    },
    { 
      id: 'featured', 
      label: 'Featured', 
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      activeColor: 'text-yellow-700 dark:text-yellow-300'
    },
    { 
      id: 'popular', 
      label: 'Popular', 
      icon: TrendingUp,
      color: 'text-red-600 dark:text-red-400',
      activeColor: 'text-red-700 dark:text-red-300'
    },
    { 
      id: 'changelog', 
      label: 'Changelog', 
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400',
      activeColor: 'text-purple-700 dark:text-purple-300'
    }
  ], []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-tokyo-night-bg-dark/80 backdrop-blur-md border-b border-gray-200/50 dark:border-tokyo-night-comment/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-3 min-w-0 cursor-pointer hover:opacity-90 transition-opacity duration-200 focus:outline-none"
            aria-label="Refresh page"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-lg">WD</span>
            </div>
            <div className="min-w-0 text-left">
              <h1 className={`text-xl font-bold ${colors.titleColor} font-ubuntu truncate`}>WebDirectory</h1>
              <p className={`text-xs ${colors.subtitleColor} font-lato truncate`}>Discover Amazing Websites</p>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 text-gray-400 dark:text-tokyo-night-comment ${colors.accentColor}`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for websites, tools, and resources..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-tokyo-night-bg-dark border-0 rounded-2xl text-gray-900 dark:text-tokyo-night-text placeholder-gray-500 dark:placeholder-tokyo-night-comment focus:ring-2 focus:ring-blue-500 dark:focus:ring-tokyo-night-blue focus:bg-white dark:focus:bg-tokyo-night-bg-dark transition-all duration-200 font-lato"
              />
            </form>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? `${item.activeColor} bg-blue-50 dark:bg-tokyo-night-bg-highlight shadow-sm`
                      : `text-gray-600 dark:text-tokyo-night-text-dark hover:${item.color} hover:bg-gray-50 dark:hover:bg-tokyo-night-bg-highlight`
                  }`}
                >
                  <Icon className={`h-4 w-4 ${currentPage === item.id ? item.activeColor : item.color}`} />
                  <span className={`font-lato ${currentPage === item.id ? item.activeColor : item.color}`}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Admin Access */}
          <button
            onClick={() => onPageChange('admin')}
            className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gray-800 dark:bg-tokyo-night-bg-highlight text-gray-100 dark:text-tokyo-night-text rounded-xl text-sm font-medium hover:bg-gray-700 dark:hover:bg-tokyo-night-bg-highlight/80 transition-all duration-200 shadow-lg"
          >
            <span className="font-lato">Admin</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-tokyo-night-text-dark hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 flex-shrink-0"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 text-gray-400 dark:text-tokyo-night-comment ${colors.accentColor}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search websites..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-tokyo-night-bg-dark border-0 rounded-2xl text-gray-900 dark:text-tokyo-night-text placeholder-gray-500 dark:placeholder-tokyo-night-comment focus:ring-2 focus:ring-blue-500 dark:focus:ring-tokyo-night-blue focus:bg-white dark:focus:bg-tokyo-night-bg-dark transition-all duration-200"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-tokyo-night-bg-dark border-t border-gray-200 dark:border-tokyo-night-comment">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? `${item.activeColor} bg-blue-50 dark:bg-tokyo-night-bg-highlight`
                      : `text-gray-600 dark:text-tokyo-night-text-dark hover:${item.color} hover:bg-gray-50 dark:hover:bg-tokyo-night-bg-highlight`
                  }`}
                >
                  <Icon className={`h-5 w-5 ${currentPage === item.id ? item.activeColor : item.color}`} />
                  <span className={currentPage === item.id ? item.activeColor : item.color}>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onPageChange('admin');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-800 dark:bg-tokyo-night-bg-highlight text-gray-100 dark:text-tokyo-night-text rounded-xl text-sm font-medium hover:bg-gray-700 dark:hover:bg-tokyo-night-bg-highlight/80 transition-all duration-200"
            >
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;