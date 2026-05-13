import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaCopy, FaDownload } from 'react-icons/fa';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { downloadTextFile } from '../../utils/helpers';

const ExplanationCard = ({ title, content, filename = 'result.txt' }) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl border border-slate-700/50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/50 bg-slate-900/50">
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => copy(content)}
            className={`p-2 rounded-lg text-sm transition-colors ${copied ? 'text-green-400' : 'text-slate-400 hover:text-indigo-400'}`}
            title="Copy"
          >
            <FaCopy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => downloadTextFile(content, filename)}
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
            title="Download"
          >
            <FaDownload className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="p-5 prose prose-invert prose-sm max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default ExplanationCard;
