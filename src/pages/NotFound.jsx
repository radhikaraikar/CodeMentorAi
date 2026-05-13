import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBolt } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600 blob opacity-10" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600 blob blob-delay-2 opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative"
      >
        {/* 404 */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <div className="text-[120px] sm:text-[160px] font-black leading-none gradient-text select-none">
            404
          </div>
        </motion.div>

        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-neon">
          <FaBolt className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Looks like this page got lost in the code. Let's get you back to explaining some code!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-neon"
          >
            <FaHome className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/explain"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold hover:border-indigo-500 transition-all duration-200"
          >
            Explain Code
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
