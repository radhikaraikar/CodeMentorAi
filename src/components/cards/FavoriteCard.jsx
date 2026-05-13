import { motion } from 'framer-motion';
import { FaEye, FaTrash, FaStar } from 'react-icons/fa';
import { formatDate, truncateText, getTypeBadgeColor, getTypeLabel, getLanguageIcon } from '../../utils/helpers';

const FavoriteCard = ({ item, onView, onRemove, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass rounded-2xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FaStar className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="text-white font-medium text-sm truncate">
              {item.title || 'Untitled'}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">{formatDate(item.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-lg">{getLanguageIcon(item.language)}</span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getTypeBadgeColor(item.type)}`}>
            {getTypeLabel(item.type)}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-slate-800">
        <pre className="text-slate-400 text-xs font-mono overflow-hidden leading-relaxed">
          {truncateText(item.code, 120)}
        </pre>
      </div>

      <div className="flex items-center justify-end gap-2">
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
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors border border-red-500/20"
        >
          <FaTrash className="w-3 h-3" />
          Remove
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FavoriteCard;
