import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

const PPPage = () => {
  const [colors] = useState({
    titleColor: 'text-gray-900 dark:text-tokyo-night-text',
    subtitleColor: 'text-gray-600 dark:text-tokyo-night-text-dark',
    headingColor: 'text-blue-600 dark:text-blue-400',
    subheadingColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-gray-600 dark:text-tokyo-night-text-dark',
    accentColor: 'text-blue-600 dark:text-blue-400'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-tokyo-night-blue/20 dark:to-tokyo-night-purple/20 px-6 py-3 rounded-full text-sm font-medium ${colors.subtitleColor} mb-6`}>
            <Shield className={`w-5 h-5 text-blue-600 dark:text-tokyo-night-blue ${colors.accentColor}`} />
            <span className="font-lato">Privacy Policy</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-6 font-ubuntu`}>
            Privacy
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
              Policy
            </span>
          </h1>
          <p className={`text-xl ${colors.subtitleColor} max-w-3xl mx-auto font-lato leading-relaxed`}>
            Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-6 border border-blue-100/50 dark:border-tokyo-night-blue/30 shadow-sm mb-12">
          <div className={`flex items-center space-x-2 ${colors.textColor}`}>
            <Shield className={`w-5 h-5 text-blue-600 dark:text-tokyo-night-blue ${colors.accentColor}`} />
            <span className="font-lato">Last updated: January 22, 2024</span>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              1. Information We Collect
            </h2>
            <h3 className={`text-xl font-semibold ${colors.subheadingColor} mb-4 font-ubuntu`}>
              Personal Information
            </h3>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, participate in activities on the website, or otherwise contact us.
            </p>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              The personal information we collect may include your name, email address, and any other information you choose to provide.
            </p>
            
            <h3 className={`text-xl font-semibold ${colors.subheadingColor} mt-8 mb-4 font-ubuntu`}>
              Usage Information
            </h3>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our website, and other technical information.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              2. How We Use Your Information
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className={`list-disc list-inside text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed space-y-2`}>
              <li>To facilitate account creation and logon process</li>
              <li>To send administrative information to you</li>
              <li>To protect our services</li>
              <li>To enforce our terms, conditions, and policies</li>
              <li>To respond to legal requests and prevent harm</li>
              <li>For other business purposes such as data analysis, identifying usage trends, and evaluating and improving our services</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              3. Information Sharing
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              We may process or share data based on the following legal basis:
            </p>
            <ul className={`list-disc list-inside text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed space-y-2`}>
              <li><span className={`font-semibold ${colors.subheadingColor}`}>Consent:</span> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
              <li><span className={`font-semibold ${colors.subheadingColor}`}>Legitimate Interests:</span> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
              <li><span className={`font-semibold ${colors.subheadingColor}`}>Performance of a Contract:</span> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
              <li><span className={`font-semibold ${colors.subheadingColor}`}>Legal Obligations:</span> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              4. Data Security
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              5. Data Retention
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              6. Your Privacy Rights
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
            </p>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              In some regions, such as the European Economic Area, you have certain rights under applicable data protection laws. These may include the right to request access to, obtain a copy of, update, or correct your personal information.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              7. Cookies and Tracking Technologies
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              We may use cookies and similar tracking technologies to access or store information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              8. Third-Party Websites
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              The website may contain links to third-party websites and applications to provide you with increased functionality. We are not responsible for the privacy practices or the content of such third-party websites and applications.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              9. Changes to This Privacy Policy
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              10. Contact Us
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              If you have questions or comments about this policy, you may email us at:
            </p>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed font-semibold`}>
              privacy@webdirectory.com
            </p>
          </section>
        </div>

        {/* Contact */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800 to-gray-900 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-3xl p-8 text-white dark:text-tokyo-night-text">
            <h3 className="text-2xl font-bold mb-4 font-ubuntu">Have Privacy Questions?</h3>
            <p className="text-slate-300 dark:text-tokyo-night-text-dark mb-6 font-lato">
              If you have any questions about our privacy policy, please contact us.
            </p>
            <button className="bg-white dark:bg-tokyo-night-bg-dark text-slate-800 dark:text-tokyo-night-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 shadow-lg font-lato">
              Contact Privacy Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPPage;