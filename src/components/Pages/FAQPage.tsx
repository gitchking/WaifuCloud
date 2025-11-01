import { HelpCircle, ChevronDown, Mail, User, Globe, Star } from 'lucide-react';
import { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is WebDirectory?",
      answer: "WebDirectory is a curated collection of the best websites, tools, and resources across the internet. We organize content into categories to help you discover new and useful websites for productivity, entertainment, education, and more."
    },
    {
      question: "How often is the directory updated?",
      answer: "We update our directory daily with new websites and resources. Our team regularly reviews existing listings to ensure they remain relevant and functional. Popular and featured sections are updated weekly based on user engagement and feedback."
    },
    {
      question: "How are websites selected for the directory?",
      answer: "Websites are selected based on several criteria including usability, design quality, content value, and user feedback. Our team manually reviews each submission to ensure it meets our standards. Users can also submit websites for consideration through our submission form."
    },
    {
      question: "Can I submit my website to the directory?",
      answer: "Yes! We welcome website submissions. You can submit your website through our submission form on the homepage. Our team will review your submission and, if it meets our criteria, add it to the appropriate category. Please ensure your website is functional and provides value to users."
    },
    {
      question: "How are websites ranked in the Popular section?",
      answer: "The Popular section is based on user engagement metrics including clicks, time spent on site, and user ratings. Websites that receive higher engagement from our users are ranked higher in this section. The rankings are updated weekly."
    },
    {
      question: "What does the Featured badge mean?",
      answer: "Featured websites are hand-picked by our editorial team as exceptional resources. These websites have been selected for their outstanding quality, unique value proposition, or innovative approach. Featured websites are reviewed monthly to maintain their status."
    },
    {
      question: "How can I report a broken link or outdated website?",
      answer: "If you encounter a broken link or outdated website, please use our reporting form or contact us directly. We investigate all reports within 48 hours and take appropriate action, which may include removing the listing or contacting the website owner."
    },
    {
      question: "Is there a mobile app for WebDirectory?",
      answer: "Currently, we don't have a dedicated mobile app, but our website is fully responsive and works great on mobile devices. We're considering developing a mobile app in the future based on user demand."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support team through the contact form on our website or by emailing support@webdirectory.com. Our support team is available Monday through Friday, 9 AM to 5 PM EST, and typically responds within 24 hours."
    },
    {
      question: "Do you offer advertising opportunities?",
      answer: "Yes, we offer advertising opportunities for businesses that align with our audience. We have various ad formats including banner ads, sponsored listings, and newsletter sponsorships. Please contact our advertising team at ads@webdirectory.com for more information."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-tokyo-night-bg-highlight px-6 py-3 rounded-full text-sm font-medium text-slate-700 dark:text-tokyo-night-text mb-6">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-lato">Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-tokyo-night-text mb-6 font-ubuntu">
            Help &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-800 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
              Support
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-tokyo-night-text-dark max-w-3xl mx-auto font-lato leading-relaxed">
            Find answers to common questions about using WebDirectory and our services.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-10 h-10 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              24
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">FAQs</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-10 h-10 bg-green-500/20 dark:bg-green-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              10k+
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Users</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-10 h-10 bg-purple-500/20 dark:bg-purple-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              500+
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Websites</p>
          </div>
          <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-4 text-center border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <div className="w-10 h-10 bg-yellow-500/20 dark:bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-tokyo-night-text mb-1 font-ubuntu">
              4.8
            </h3>
            <p className="text-gray-600 dark:text-tokyo-night-text-dark text-sm font-lato">Rating</p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-tokyo-night-text font-ubuntu">
                  {item.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 dark:text-tokyo-night-text-dark transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-tokyo-night-comment">
                  <p className="text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-r from-slate-800 to-gray-900 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-3xl p-8 text-white dark:text-tokyo-night-text">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-ubuntu">Still Need Help?</h3>
            <p className="text-slate-300 dark:text-tokyo-night-text-dark mb-8 font-lato">
              Can't find the answer you're looking for? Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white dark:bg-tokyo-night-bg-dark text-slate-800 dark:text-tokyo-night-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 shadow-lg font-lato">
                Contact Support
              </button>
              <button className="bg-transparent border-2 border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200 font-lato">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;