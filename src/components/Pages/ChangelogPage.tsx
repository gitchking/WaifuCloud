import { FileText, Plus, Edit, Trash2, Clock } from 'lucide-react';

interface ChangelogEntry {
  id: string;
  date: string;
  type: 'added' | 'updated' | 'removed';
  title: string;
  description: string;
  websites?: string[];
}

const ChangelogPage = () => {
  const changelogEntries: ChangelogEntry[] = [
    {
      id: '1',
      date: '2024-01-22',
      type: 'added',
      title: 'New AI Tools Category',
      description: 'Added 15 new AI-powered tools including ChatGPT alternatives and productivity assistants.',
      websites: ['Claude AI', 'Perplexity AI', 'Jasper AI', 'Copy.ai']
    },
    {
      id: '2',
      date: '2024-01-21',
      type: 'updated',
      title: 'Website Cards Redesign',
      description: 'Completely redesigned website cards with improved information display and better hover effects.',
      websites: []
    },
    {
      id: '3',
      date: '2024-01-20',
      type: 'added',
      title: 'Popular Section Launch',
      description: 'Launched the new Popular section featuring trending websites based on user engagement.',
      websites: ['Netflix', 'Spotify', 'GitHub', 'Figma']
    },
    {
      id: '4',
      date: '2024-01-19',
      type: 'updated',
      title: 'Search Enhancement',
      description: 'Improved search functionality with better filtering and category-based results.',
      websites: []
    },
    {
      id: '5',
      date: '2024-01-18',
      type: 'added',
      title: 'Admin Panel Features',
      description: 'Added comprehensive admin panel for website management with bulk operations.',
      websites: []
    },
    {
      id: '6',
      date: '2024-01-17',
      type: 'removed',
      title: 'Outdated Websites Cleanup',
      description: 'Removed 8 outdated or non-functional websites from the directory.',
      websites: ['OldTool1', 'DeadLink2', 'OutdatedApp3']
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <Plus className="w-5 h-5 text-tokyo-night-green" />;
      case 'updated':
        return <Edit className="w-5 h-5 text-tokyo-night-blue" />;
      case 'removed':
        return <Trash2 className="w-5 h-5 text-tokyo-night-red" />;
      default:
        return <FileText className="w-5 h-5 text-tokyo-night-text" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'bg-tokyo-night-green/20 text-tokyo-night-green border-tokyo-night-green/30';
      case 'updated':
        return 'bg-tokyo-night-blue/20 text-tokyo-night-blue border-tokyo-night-blue/30';
      case 'removed':
        return 'bg-tokyo-night-red/20 text-tokyo-night-red border-tokyo-night-red/30';
      default:
        return 'bg-tokyo-night-bg-highlight text-tokyo-night-text border-tokyo-night-comment';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-tokyo-night-bg-highlight px-6 py-3 rounded-full text-sm font-medium text-slate-700 dark:text-tokyo-night-text mb-6">
            <FileText className="w-5 h-5" />
            <span className="font-lato">Platform Updates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-tokyo-night-text mb-6 font-ubuntu">
            What's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-800 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
              New & Updated
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-tokyo-night-text-dark max-w-3xl mx-auto font-lato leading-relaxed">
            Stay up to date with the latest changes, additions, and improvements to our web directory. 
            We're constantly evolving to bring you the best experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-6 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-12 h-12 bg-tokyo-night-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-tokyo-night-green" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              {changelogEntries.filter(e => e.type === 'added').length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Added</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-6 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-12 h-12 bg-tokyo-night-blue/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Edit className="w-6 h-6 text-tokyo-night-blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              {changelogEntries.filter(e => e.type === 'updated').length}
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Updated</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-6 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-12 h-12 bg-tokyo-night-bg-highlight rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-tokyo-night-text" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-tokyo-night-text mb-2 font-ubuntu">
              7
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato">Days Ago</p>
          </div>
        </div>

        {/* Changelog Timeline */}
        <div className="space-y-6">
          {changelogEntries.map((entry, index) => (
            <div key={entry.id} className="relative">
              {/* Timeline line */}
              {index !== changelogEntries.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 dark:bg-tokyo-night-comment"></div>
              )}
              
              {/* Entry */}
              <div className="flex space-x-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-tokyo-night-bg-highlight border-2 border-gray-200 dark:border-tokyo-night-comment rounded-full flex items-center justify-center shadow-sm">
                  {getTypeIcon(entry.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-6 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                          {entry.title}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(entry.type)}`}>
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-tokyo-night-comment">
                      <Clock className="w-4 h-4" />
                      <span className="font-lato">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Affected websites */}
                  {entry.websites && entry.websites.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-tokyo-night-text-dark mb-2 font-ubuntu">
                        {entry.type === 'removed' ? 'Removed:' : 'Affected websites:'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.websites.map((website, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-3 py-1 text-xs font-medium text-gray-600 dark:text-tokyo-night-text bg-gray-100 dark:bg-tokyo-night-bg-dark rounded-lg"
                          >
                            {website}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe to Updates */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800 to-gray-900 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-3xl p-8 text-white dark:text-tokyo-night-text">
            <h3 className="text-2xl font-bold mb-4 font-ubuntu">Stay Updated</h3>
            <p className="text-slate-300 dark:text-tokyo-night-text-dark mb-6 font-lato">
              Get notified about new websites, features, and improvements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 dark:text-tokyo-night-text placeholder-gray-500 dark:placeholder-tokyo-night-comment bg-white dark:bg-tokyo-night-bg-dark border-0 focus:ring-2 focus:ring-white/20 dark:focus:ring-tokyo-night-blue/20 font-lato"
              />
              <button className="bg-white dark:bg-tokyo-night-bg-dark text-slate-800 dark:text-tokyo-night-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 shadow-lg font-lato">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;