import { TrendingUp, Flame, BarChart3 } from 'lucide-react';
import WebsiteCard from '../Cards/WebsiteCard';
import { Website } from '../../types';
import { categories as allCategories } from '../../data/categories';

interface PopularPageProps {
  websites: Website[];
  onWebsiteClick?: (website: Website) => void;
}

const PopularPage = ({ websites, onWebsiteClick }: PopularPageProps) => {
  const categories = allCategories;
  const popularWebsites = websites
    .filter(site => site.popular)
    .sort((a, b) => b.clicks - a.clicks);

  const trendingWebsites = websites
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark px-6 py-3 rounded-full text-sm font-medium text-red-800 dark:text-tokyo-night-red mb-6">
            <Flame className="w-5 h-5" />
            <span className="font-lato">Hot & Trending</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-tokyo-night-text mb-6 font-ubuntu">
            Popular
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 dark:from-tokyo-night-red dark:to-tokyo-night-pink">
              Websites & Tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-tokyo-night-text-dark max-w-3xl mx-auto font-lato leading-relaxed">
            Discover the most visited and loved websites by our community. 
            These trending platforms are making waves across the internet.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 dark:border-tokyo-night-comment">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 dark:from-tokyo-night-red dark:to-tokyo-night-pink rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                  {popularWebsites.reduce((sum, site) => sum + site.clicks, 0).toLocaleString()}
                </h3>
                <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Total Clicks</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 dark:border-tokyo-night-comment">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 dark:from-tokyo-night-orange dark:to-tokyo-night-red rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                  {popularWebsites.length}
                </h3>
                <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Popular Sites</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-tokyo-night-bg-highlight/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 dark:border-tokyo-night-comment">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-red-500 dark:from-tokyo-night-purple dark:to-tokyo-night-red rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                  {(popularWebsites.reduce((sum, site) => sum + site.rating, 0) / popularWebsites.length).toFixed(1)}
                </h3>
                <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 dark:from-tokyo-night-red dark:to-tokyo-night-pink rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
              Top Performers
            </h2>
            <div className="flex items-center space-x-2 bg-red-100 dark:bg-tokyo-night-bg-highlight text-red-800 dark:text-tokyo-night-red px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-red-500 dark:bg-tokyo-night-red rounded-full animate-pulse"></span>
              <span>Live Rankings</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularWebsites.slice(0, 9).map((website, index) => (
              <div key={website.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-tokyo-night-yellow dark:to-tokyo-night-orange rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
                    #{index + 1}
                  </div>
                )}
                <WebsiteCard website={website} categories={categories} onCardClick={onWebsiteClick} />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 dark:from-tokyo-night-orange dark:to-tokyo-night-red rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
              Trending Now
            </h2>
            <div className="text-sm text-gray-500 dark:text-tokyo-night-comment font-lato">
              Based on recent activity
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingWebsites.map(website => (
              <div key={website.id} className="relative">
                <WebsiteCard website={website} categories={categories} onCardClick={onWebsiteClick} />
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-3xl p-8 text-white dark:text-tokyo-night-text">
            <h3 className="text-2xl font-bold mb-4 font-ubuntu">Join the Trending List</h3>
            <p className="text-red-100 dark:text-tokyo-night-text-dark mb-6 font-lato">
              Submit your website and watch it climb the popularity rankings
            </p>
            <button className="bg-white dark:bg-tokyo-night-bg-dark text-red-600 dark:text-tokyo-night-red px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 shadow-lg font-lato">
              Submit Your Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPage;