import { motion } from 'framer-motion';
import { APP_NAME } from '../../utils/constants';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 blob opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 blob blob-delay-2 opacity-10" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-neon"
        >
          <span className="text-2xl">⚡</span>
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold gradient-text"
        >
          {APP_NAME}
        </motion.h1>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-indigo-500"
            />
          ))}
        </div>

        <p className="text-slate-400 text-sm">Loading AI Assistant...</p>
      </div>
    </motion.div>
  );
};

export default Loader;
