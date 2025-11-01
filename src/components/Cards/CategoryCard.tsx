import { ArrowRight, Brain, Code2, Zap, Play, Gamepad2, Users, Music, Search, BookOpen, Book, Database, Shield, MessageSquare, BarChart3, Palette, Tv, Film } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onCategoryClick: (slug: string) => void;
}

const CategoryCard = ({ category, onCategoryClick }: CategoryCardProps) => {
  // Define fixed colors for each category based on exact category names
  const getCategoryColors = (categoryName: string) => {
    const colorMap: Record<string, { gradient: string; text: string; darkText: string; border: string }> = {
      'AI Tools': { 
        gradient: 'from-blue-500 to-purple-500', 
        text: 'text-blue-600', 
        darkText: 'dark:text-blue-400', 
        border: 'border-blue-500' 
      },
      'Dev Tools': { 
        gradient: 'from-green-500 to-teal-500', 
        text: 'text-green-600', 
        darkText: 'dark:text-green-400', 
        border: 'border-green-500' 
      },
      'Productivity': { 
        gradient: 'from-yellow-500 to-orange-500', 
        text: 'text-yellow-600', 
        darkText: 'dark:text-yellow-400', 
        border: 'border-yellow-500' 
      },
      'Streaming': { 
        gradient: 'from-red-500 to-pink-500', 
        text: 'text-red-600', 
        darkText: 'dark:text-red-400', 
        border: 'border-red-500' 
      },
      'Games': { 
        gradient: 'from-indigo-500 to-blue-500', 
        text: 'text-indigo-600', 
        darkText: 'dark:text-indigo-400', 
        border: 'border-indigo-500' 
      },
      'Social': { 
        gradient: 'from-purple-500 to-pink-500', 
        text: 'text-purple-600', 
        darkText: 'dark:text-purple-400', 
        border: 'border-purple-500' 
      },
      'Music': { 
        gradient: 'from-teal-500 to-green-500', 
        text: 'text-teal-600', 
        darkText: 'dark:text-teal-400', 
        border: 'border-teal-500' 
      },
      'Search Engines': { 
        gradient: 'from-pink-500 to-red-500', 
        text: 'text-pink-600', 
        darkText: 'dark:text-pink-400', 
        border: 'border-pink-500' 
      },
      'Visual Novels': { 
        gradient: 'from-yellow-500 to-amber-500', 
        text: 'text-yellow-600', 
        darkText: 'dark:text-yellow-400', 
        border: 'border-yellow-500' 
      },
      'Manga Readers': { 
        gradient: 'from-purple-500 to-indigo-500', 
        text: 'text-purple-600', 
        darkText: 'dark:text-purple-400', 
        border: 'border-purple-500' 
      },
      'Databases': { 
        gradient: 'from-cyan-500 to-blue-500', 
        text: 'text-cyan-600', 
        darkText: 'dark:text-cyan-400', 
        border: 'border-cyan-500' 
      },
      'Privacy Tools': { 
        gradient: 'from-gray-500 to-blue-gray-500', 
        text: 'text-gray-600', 
        darkText: 'dark:text-gray-400', 
        border: 'border-gray-500' 
      },
      'Forum': { 
        gradient: 'from-orange-500 to-red-500', 
        text: 'text-orange-600', 
        darkText: 'dark:text-orange-400', 
        border: 'border-orange-500' 
      },
      'Statistics': { 
        gradient: 'from-emerald-500 to-green-500', 
        text: 'text-emerald-600', 
        darkText: 'dark:text-emerald-400', 
        border: 'border-emerald-500' 
      },
      'Art': { 
        gradient: 'from-pink-500 to-purple-500', 
        text: 'text-pink-600', 
        darkText: 'dark:text-pink-400', 
        border: 'border-pink-500' 
      },
      'Asian Drama': { 
        gradient: 'from-rose-500 to-pink-500', 
        text: 'text-rose-600', 
        darkText: 'dark:text-rose-400', 
        border: 'border-rose-500' 
      },
      'Anime': { 
        gradient: 'from-violet-500 to-purple-500', 
        text: 'text-violet-600', 
        darkText: 'dark:text-violet-400', 
        border: 'border-violet-500' 
      },
      'default': { 
        gradient: 'from-blue-500 to-purple-500', 
        text: 'text-blue-600', 
        darkText: 'dark:text-blue-400', 
        border: 'border-blue-500' 
      }
    };
    
    // Use exact match for category names
    return colorMap[categoryName] || colorMap['default'];
  };

  const { gradient: iconColor, text: textColor, darkText: darkTextColor, border: borderColor } = 
    getCategoryColors(category.name);

  // Map category icons to actual components
  const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
    Brain,
    Code2,
    Zap,
    Play,
    Gamepad2,
    Users,
    Music,
    Search,
    BookOpen,
    Book,
    Database,
    Shield,
    MessageSquare,
    BarChart3,
    Palette,
    Tv,
    Film
  };

  const IconComponent = iconMap[category.icon];

  return (
    <div 
      onClick={() => onCategoryClick(category.slug)}
      className={`group relative bg-white dark:bg-tokyo-night-bg-dark rounded-xl border border-gray-200 dark:border-tokyo-night-comment p-4 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-tokyo-night-blue/10 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] hover:${borderColor} dark:hover:${borderColor.replace('border-', 'dark:border-')}`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-tokyo-night-bg-highlight/50 dark:to-tokyo-night-bg-dark/50 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out rounded-xl" />
      
      {/* Pulsing animation for categories with many websites */}
      {category.count > 10 && (
        <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(128,191,255,0.3)] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"></div>
      )}

      {/* Icon and Title */}
      <div className="flex items-start space-x-3 mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${iconColor} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 ease-in-out shadow-lg flex-shrink-0 transform`}>
          {IconComponent ? <IconComponent className="w-5 h-5" /> : <div className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-semibold transition-all duration-300 ease-in-out font-ubuntu line-clamp-1 transform group-hover:translate-x-1 ${textColor} ${darkTextColor}`}>
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-tokyo-night-text-dark font-lato mt-1 line-clamp-2 h-10 transition-all duration-300 ease-in-out group-hover:text-gray-700 dark:group-hover:text-tokyo-night-text">
            {category.description}
          </p>
        </div>
      </div>

      {/* Count and Action */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-tokyo-night-comment transition-all duration-300 ease-in-out group-hover:border-blue-200 dark:group-hover:border-tokyo-night-blue/30">
        <span className={`inline-block px-2 py-1 text-xs font-medium bg-blue-50 dark:bg-tokyo-night-bg-highlight rounded-md transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-sm ${textColor} ${darkTextColor}`}>
          {category.count} websites
        </span>
        <div className={`flex items-center space-x-1 transition-all duration-300 ease-in-out ${textColor} ${darkTextColor}`}>
          <span className="text-xs font-medium transform group-hover:translate-x-1 transition-transform duration-300 ease-in-out">Explore</span>
          <ArrowRight className="w-3 h-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;