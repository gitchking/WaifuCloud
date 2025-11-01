import { TrendingUp, Star, Zap, ArrowRight, Sparkles, Flame, Crown, BarChart3 } from 'lucide-react';
import WebsiteCard from '../Cards/WebsiteCard';
import CategoryCard from '../Cards/CategoryCard';
import { Website, Category } from '../../types';

interface HomePageProps {
  websites: Website[];
  categories: Category[];
  onCategoryClick: (slug: string) => void;
  onWebsiteClick?: (website: Website) => void;
}

const HomePage = ({ websites, categories, onCategoryClick, onWebsiteClick }: HomePageProps) => {
  // Get featured websites
  const featuredWebsites = websites.filter(site => site.featured).slice(0, 8);
  
  // Get one popular website from each category
  const popularByCategory = categories.map(category => {
    const popularInCategory = websites
      .filter(site => site.category === category.slug && site.popular)
      .sort((a, b) => b.rating - a.rating); // Sort by rating
    
    return popularInCategory.length > 0 ? popularInCategory[0] : null;
  }).filter(site => site !== null) as Website[]; // Remove null values
  
  // Combine featured websites with popular websites from each category
  const featuredAndPopularByCategory = [...featuredWebsites, ...popularByCategory.filter(site => 
    !featuredWebsites.some(featured => featured.id === site.id)
  )].slice(0, 12);
  
  // Get top 3 websites by rating for the popular section
  const topRatedWebsites = websites
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  const topCategories = categories.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs with complex animations */}
          <div className="absolute -top-1/2 -left-1/4 w-[200%] h-[200%]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-tokyo-night-blue/10 rounded-full blur-3xl animate-pulse animation-delay-2000 animate-float-slow"></div>
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-tokyo-night-purple/10 rounded-full blur-3xl animate-pulse animation-delay-4000 animate-float-medium"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/10 dark:bg-tokyo-night-comment/10 rounded-full blur-3xl animate-pulse animation-delay-6000 animate-float-fast"></div>
            
            {/* Additional floating elements for more depth */}
            <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-pink-500/5 dark:bg-tokyo-night-pink/5 rounded-full blur-2xl animate-pulse animation-delay-1000 animate-float-medium"></div>
            <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-teal-500/5 dark:bg-tokyo-night-teal/5 rounded-full blur-2xl animate-pulse animation-delay-3000 animate-float-slow"></div>
          </div>
          
          {/* Particle effects */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-blue-400/20 dark:bg-tokyo-night-blue/20 animate-pulse"
                style={{
                  width: `${Math.random() * 10 + 2}px`,
                  height: `${Math.random() * 10 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 5 + 3}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Grid pattern overlay for subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#565f89_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge with enhanced animation */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-tokyo-night-blue/20 dark:to-tokyo-night-purple/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-tokyo-night-blue mb-6 border border-blue-200/30 dark:border-tokyo-night-comment/30 animate-fade-in hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <Zap className="w-4 h-4 animate-pulse group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-lato">Discover Premium Web Resources</span>
          </div>
          
          {/* Main heading with enhanced gradient animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-tokyo-night-text mb-6 font-ubuntu leading-tight animate-fade-in-up">
            Explore The Best
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-tokyo-night-blue dark:via-tokyo-night-purple dark:to-tokyo-night-pink animate-gradient-x-slow">
              Websites & Tools
            </span>
          </h1>
          
          {/* Subheading with typing effect animation */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-tokyo-night-text-dark mb-10 max-w-3xl mx-auto font-lato leading-relaxed animate-fade-in-up animation-delay-300 opacity-90">
            Discover handpicked websites, AI tools, productivity apps, and resources across 16+ categories. 
            <span className="block mt-2">Your gateway to the best of the internet.</span>
          </p>
          
          {/* Stats with hover effects */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-500">
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group">
              <TrendingUp className="w-5 h-5 text-green-500 dark:text-tokyo-night-green group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium text-gray-700 dark:text-tokyo-night-text font-lato">Updated Daily</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-gray-200/50 dark:border-tokyo-night-comment/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group">
              <Star className="w-5 h-5 text-yellow-500 dark:text-tokyo-night-yellow group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium text-gray-700 dark:text-tokyo-night-text font-lato">10,000+ Websites</span>
            </div>
          </div>
          
          {/* CTA Button with enhanced hover effect */}
          <div className="animate-fade-in-up animation-delay-700">
            <button 
              onClick={() => onCategoryClick('all')}
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-lato text-lg overflow-hidden relative"
            >
              <span className="relative z-10">Explore Categories</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              {/* Animated background for button */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-tokyo-night-purple dark:to-tokyo-night-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </button>
          </div>
          
          {/* Sparkle effect around button on hover */}
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 dark:bg-tokyo-night-blue/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <Sparkles className="w-6 h-6 text-blue-500 dark:text-tokyo-night-blue mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 bg-gray-50 dark:bg-tokyo-night-bg">
        {/* Add spacing between hero section and content */}
        <div className="pt-8"></div>
        
        {/* Featured Websites & Tools Section - now includes popular from each category */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-tokyo-night-text font-ubuntu mb-2">
                Featured Websites & Tools
              </h2>
              <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                Hand-picked premium tools and popular websites from each category
              </p>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400 dark:text-tokyo-night-yellow bg-yellow-50 dark:bg-tokyo-night-bg-highlight px-4 py-2 rounded-full">
              <Crown className="w-5 h-5 fill-current" />
              <span className="font-medium font-lato">Premium Selection</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredAndPopularByCategory.slice(0, 8).map(website => (
              <div key={website.id} className="relative">
                <div className="absolute -top-3 -left-3 z-20">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-tokyo-night-blue dark:to-tokyo-night-purple rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
                <WebsiteCard website={website} categories={categories} onCardClick={onWebsiteClick} />
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated Websites Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-tokyo-night-text font-ubuntu mb-2">
                Top Rated Websites
              </h2>
              <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                Highest rated websites based on user reviews
              </p>
            </div>
            <div className="flex items-center space-x-2 text-red-500 dark:text-tokyo-night-red bg-red-50 dark:bg-tokyo-night-bg-highlight px-4 py-2 rounded-full">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium font-lato">Top 3 by Rating</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topRatedWebsites.map((website, index) => (
              <div key={website.id} className="relative">
                <div className="absolute -top-3 -left-3 z-20 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-tokyo-night-yellow dark:to-tokyo-night-orange rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  #{index + 1}
                </div>
                <WebsiteCard website={website} categories={categories} onCardClick={onWebsiteClick} />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-tokyo-night-text font-ubuntu mb-2">
                Browse Categories
              </h2>
              <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                Explore websites organized by category
              </p>
            </div>
            <button 
              onClick={() => onCategoryClick('all')}
              className="text-blue-600 dark:text-tokyo-night-blue hover:text-blue-700 dark:hover:text-tokyo-night-blue/80 transition-colors duration-200 bg-blue-50 dark:bg-tokyo-night-bg-highlight px-4 py-2 rounded-full font-medium font-lato"
            >
              View All Categories →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topCategories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onCategoryClick={onCategoryClick}
              />
            ))}
          </div>
        </section>

        {/* Popular Section - now shows top 3 by rating */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-tokyo-night-text font-ubuntu mb-2">
                Trending Now
              </h2>
              <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">
                Most visited websites this week
              </p>
            </div>
            <div className="flex items-center space-x-2 text-red-500 dark:text-tokyo-night-red bg-red-50 dark:bg-tokyo-night-bg-highlight px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium font-lato">Hot Picks</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRatedWebsites.map(website => (
              <WebsiteCard key={website.id} website={website} categories={categories} onCardClick={onWebsiteClick} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;