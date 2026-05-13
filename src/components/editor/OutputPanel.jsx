import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaCopy, FaDownload, FaStar, FaRegStar, FaRobot } from 'react-icons/fa';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { downloadTextFile } from '../../utils/helpers';
import Spinner from '../common/Spinner';

const OutputPanel = ({
  result,
  loading,
  onAddFavorite,
  isFavorite = false,
  title = 'AI Analysis',
  filename = 'explanation.txt',
}) => {
  const { copied, copy } = useCopyToClipboard();

  const skeletonLines = [
    'w-3/4', 'w-full', 'w-5/6', 'w-full', 'w-2/3',
    'w-full', 'w-4/5', 'w-full', 'w-3/4', 'w-full',
  ];

  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/50 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <FaRobot className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-200 text-sm">{title}</span>
          {loading && (
            <span className="flex items-center gap-1.5 text-xs text-indigo-400 ml-2">
              <Spinner size="sm" />
              Analyzing...
            </span>
          )}
        </div>

        {result && !loading && (
          <div className="flex items-center gap-2">
            {onAddFavorite && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onAddFavorite}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isFavorite
                    ? 'text-yellow-400 bg-yellow-400/10'
                    : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? <FaStar className="w-4 h-4" /> : <FaRegStar className="w-4 h-4" />}
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => copy(result)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                copied ? 'text-green-400 bg-green-400/10' : 'text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10'
              }`}
              title="Copy result"
            >
              <FaCopy className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => downloadTextFile(result, filename)}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors duration-200"
              title="Download result"
            >
              <FaDownload className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {/* AI thinking animation */}
              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <FaRobot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-indigo-300 text-sm font-medium">AI is analyzing your code...</p>
                  <p className="text-slate-500 text-xs mt-0.5">This may take a few seconds</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-indigo-500"
                    />
                  ))}
                </div>
              </div>

              {/* Skeleton lines */}
              {skeletonLines.map((width, i) => (
                <div key={i} className={`h-4 rounded skeleton ${width}`} />
              ))}
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="prose prose-invert prose-sm max-w-none"
            >
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <div className="relative group">
                        <pre className="bg-[#0d1117] border border-slate-700/50 rounded-lg p-4 overflow-x-auto text-sm">
                          <code className={`text-slate-200 font-mono ${className || ''}`} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },
                  h2({ children }) {
                    return (
                      <h2 className="text-lg font-bold text-white mt-6 mb-3 pb-2 border-b border-slate-700/50 flex items-center gap-2">
                        <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full inline-block" />
                        {children}
                      </h2>
                    );
                  },
                  h3({ children }) {
                    return <h3 className="text-base font-semibold text-slate-200 mt-4 mb-2">{children}</h3>;
                  },
                  p({ children }) {
                    return <p className="text-slate-300 leading-relaxed mb-3">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="space-y-1 mb-3 pl-4">{children}</ul>;
                  },
                  li({ children }) {
                    return (
                      <li className="text-slate-300 flex items-start gap-2">
                        <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                        <span>{children}</span>
                      </li>
                    );
                  },
                  strong({ children }) {
                    return <strong className="text-white font-semibold">{children}</strong>;
                  },
                }}
              >
                {result}
              </ReactMarkdown>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
                <FaRobot className="w-7 h-7 text-slate-600" />
              </div>
              <p className="text-slate-400 font-medium">AI output will appear here</p>
              <p className="text-slate-600 text-sm mt-1">Paste your code and click the action button</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OutputPanel;
