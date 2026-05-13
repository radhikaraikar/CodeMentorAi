import { motion } from 'framer-motion';
import { FaEye, FaTrash, FaCode } from 'react-icons/fa';
import { formatDate, truncateText, getTypeBadgeColor, getTypeLabel, getLanguageIcon } from '../../utils/helpers';

const HistoryCard = ({ item, onView, onDelete, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass rounded-2xl p-5 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">{getLanguageIcon(item.language)}</span>
          <div className="min-w-0">
            <h3 className="text-white font-medium text-sm truncate">
              {item.title || 'Untitled'}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">{formatDate(item.createdAt)}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex-shrink-0 ${getTypeBadgeColor(item.type)}`}>
          {getTypeLabel(item.type)}
        </span>
      </div>

      {/* Code preview */}
      <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-slate-800">
        <pre className="text-slate-400 text-xs font-mono overflow-hidden leading-relaxed">
          {truncateText(item.code, 120)}
        </pre>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <FaCode className="w-3 h-3" />
          {item.language}
        </span>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onView(item)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-medium transition-colors border border-indigo-500/20"
          >
            <FaEye className="w-3 h-3" />
            View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(item.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors border border-red-500/20"
          >
            <FaTrash className="w-3 h-3" />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
