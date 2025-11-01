import { Star, Crown, Sparkles } from 'lucide-react';
import WebsiteCard from '../Cards/WebsiteCard';
import { Website } from '../../types';
import { categories as allCategories } from '../../data/categories';

interface FeaturedPageProps {
  websites: Website[];
  onWebsiteClick?: (website: Website) => void;
}

const FeaturedPage = ({ websites, onWebsiteClick }: FeaturedPageProps) => {
  const categories = allCategories;
  const featuredWebsites = websites.filter(site => site.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark px-6 py-3 rounded-full text-sm font-medium text-orange-800 dark:text-tokyo-night-orange mb-6">
            <Crown className="w-5 h-5" />
            <span className="font-lato">Premium Collection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-tokyo-night-text mb-6 font-ubuntu">
            Featured
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
              Websites & Tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-tokyo-night-text-dark max-w-3xl mx-auto font-lato leading-relaxed">
            Our carefully curated selection of the most exceptional websites and tools. 
            These premium resources are handpicked for their quality, innovation, and user experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-yellow-200/50 dark:border-tokyo-night-comment">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-tokyo-night-blue dark:to-tokyo-night-purple rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">{featuredWebsites.length}</h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Featured Websites</p>
          </div>
          <div className="bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-yellow-200/50 dark:border-tokyo-night-comment">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-tokyo-night-purple dark:to-tokyo-night-pink rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">4.8</h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Average Rating</p>
          </div>
          <div className="bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-yellow-200/50 dark:border-tokyo-night-comment">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 dark:from-tokyo-night-green dark:to-tokyo-night-blue rounded-xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">Premium</h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Quality Assured</p>
          </div>
        </div>

        {/* Featured Websites Grid - Four cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredWebsites.map(website => (
            <div key={website.id} className="relative">
              <div className="absolute -top-3 -left-3 z-10">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-tokyo-night-blue dark:to-tokyo-night-purple rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              <WebsiteCard website={website} categories={categories} onCardClick={onWebsiteClick} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-3xl p-8 text-white dark:text-tokyo-night-text">
            <h3 className="text-2xl font-bold mb-4 font-ubuntu">Want to get featured?</h3>
            <p className="text-yellow-100 dark:text-tokyo-night-text-dark mb-6 font-lato">
              Submit your website for review and join our premium collection
            </p>
            <button className="bg-white dark:bg-tokyo-night-bg-dark text-orange-600 dark:text-tokyo-night-orange px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 shadow-lg font-lato">
              Submit Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;