import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const TOSPage = () => {
  const [colors] = useState({
    titleColor: 'text-gray-900 dark:text-tokyo-night-text',
    subtitleColor: 'text-gray-600 dark:text-tokyo-night-text-dark',
    headingColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-gray-600 dark:text-tokyo-night-text-dark',
    accentColor: 'text-blue-600 dark:text-blue-400'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-tokyo-night-bg dark:to-tokyo-night-bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 bg-slate-100 dark:bg-tokyo-night-bg-highlight px-6 py-3 rounded-full text-sm font-medium ${colors.subtitleColor} mb-6`}>
            <FileText className={`w-5 h-5 ${colors.accentColor}`} />
            <span className="font-lato">Legal Agreement</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-6 font-ubuntu`}>
            Terms of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-800 dark:from-tokyo-night-blue dark:to-tokyo-night-purple">
              Service
            </span>
          </h1>
          <p className={`text-xl ${colors.subtitleColor} max-w-3xl mx-auto font-lato leading-relaxed`}>
            Please read these terms of service carefully before using our web directory service.
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-6 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm mb-12">
          <div className={`flex items-center space-x-2 ${colors.textColor}`}>
            <FileText className={`w-5 h-5 ${colors.accentColor}`} />
            <span className="font-lato">Last updated: January 22, 2024</span>
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              1. Acceptance of Terms
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              By accessing or using the WebDirectory service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              2. Use License
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              Permission is granted to temporarily download one copy of the materials (information or software) on WebDirectory's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by WebDirectory at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              3. Disclaimer
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed mb-4`}>
              The materials on WebDirectory's website are provided on an 'as is' basis. WebDirectory makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              Further, WebDirectory does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              4. Limitations
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              In no event shall WebDirectory or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WebDirectory's website, even if WebDirectory or a WebDirectory authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              5. Accuracy of Materials
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              The materials appearing on WebDirectory's website could include technical, typographical, or photographic errors. WebDirectory does not warrant that any of the materials on its website are accurate, complete or current. WebDirectory may make changes to the materials contained on its website at any time without notice. However, WebDirectory does not make any commitment to update the materials.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              6. Links
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              WebDirectory has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WebDirectory of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              7. Modifications
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              WebDirectory may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="bg-white dark:bg-tokyo-night-bg-highlight rounded-2xl p-8 border border-gray-200/50 dark:border-tokyo-night-comment shadow-sm">
            <h2 className={`text-2xl font-bold ${colors.headingColor} mb-6 font-ubuntu`}>
              8. Governing Law
            </h2>
            <p className={`text-gray-600 dark:text-tokyo-night-text-dark font-lato leading-relaxed`}>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>

        {/* Contact */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800 to-gray-900 dark:from-tokyo-night-bg-highlight dark:to-tokyo-night-bg-dark rounded-3xl p-8 text-white dark:text-tokyo-night-text">
            <h3 className="text-2xl font-bold mb-4 font-ubuntu">Questions About Our Terms?</h3>
            <p className="text-slate-300 dark:text-tokyo-night-text-dark mb-6 font-lato">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <button className="bg-white dark:bg-tokyo-night-bg-dark text-slate-800 dark:text-tokyo-night-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-tokyo-night-bg-highlight transition-colors duration-200 shadow-lg font-lato">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOSPage;