import { Link } from 'react-router-dom';
import { FaBolt, FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/50 bg-[#020617]">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <FaBolt className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Code<span className="gradient-text">Mentor</span> AI
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered code explainer for students. Understand any code instantly with detailed explanations.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/explain', label: 'Explain Code' },
                { to: '/debug', label: 'Debug Code' },
                { to: '/optimize', label: 'Optimize Code' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              {[
                { to: '/viva', label: 'Viva Questions' },
                { to: '/history', label: 'History' },
                { to: '/favorites', label: 'Favorites' },
                { to: '/explain', label: 'Complexity Analysis' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-white font-semibold mb-4">Supported Languages</h4>
            <div className="flex flex-wrap gap-2">
              {['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML', 'CSS', 'SQL'].map((lang) => (
                <span key={lang} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs border border-slate-700">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <FaHeart className="w-3.5 h-3.5 text-red-500" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
