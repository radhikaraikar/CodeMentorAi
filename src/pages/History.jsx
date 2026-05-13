import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHistory, FaSearch, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import HistoryCard from '../components/cards/HistoryCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ReusableModal from '../components/modals/ReusableModal';
import ExplanationCard from '../components/cards/ExplanationCard';
import { languages } from '../data/languages';

const typeFilters = [
  { label: 'All', value: '' },
  { label: 'Explain', value: 'explain' },
  { label: 'Debug', value: 'debug' },
  { label: 'Optimize', value: 'optimize' },
  { label: 'Viva', value: 'viva' },
];

const History = () => {
  const { history, deleteHistory, clearHistory } = useApp();
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = history.filter((item) => {
    const matchSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase()) || item.code?.toLowerCase().includes(search.toLowerCase());
    const matchLang = !langFilter || item.language === langFilter;
    const matchType = !typeFilter || item.type === typeFilter;
    return matchSearch && matchLang && matchType;
  });

  const handleClearAll = () => {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      clearHistory();
      toast.success('History cleared');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <FaHistory className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">History</h1>
                <p className="text-slate-400 text-sm">{history.length} saved explanations</p>
              </div>
            </div>
            {history.length > 0 && (
              <Button variant="danger" size="sm" icon={FaTrash} onClick={handleClearAll}>
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search history..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="">All Languages</option>
              {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <div className="flex gap-2">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    typeFilter === f.value
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {history.length === 0 ? (
          <EmptyState
            emoji="📭"
            title="No history yet"
            description="Your code explanations, debug results, and viva questions will appear here automatically."
            actionLabel="Explain Some Code"
            actionLink="/explain"
          />
        ) : filtered.length === 0 ? (
          <EmptyState emoji="🔍" title="No results found" description="Try adjusting your search or filters." />
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onView={setSelectedItem}
                  onDelete={(id) => { deleteHistory(id); toast.success('Deleted'); }}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* View Modal */}
      <ReusableModal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.title || 'Result'} size="lg">
        {selectedItem && (
          <ExplanationCard title="Result" content={selectedItem.result} filename={`${selectedItem.type}-result.txt`} />
        )}
      </ReusableModal>
    </div>
  );
};

export default History;
