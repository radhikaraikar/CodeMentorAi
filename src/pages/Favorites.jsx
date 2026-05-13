import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import FavoriteCard from '../components/cards/FavoriteCard';
import EmptyState from '../components/common/EmptyState';
import ReusableModal from '../components/modals/ReusableModal';
import ExplanationCard from '../components/cards/ExplanationCard';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useApp();
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = favorites.filter((item) =>
    !search || item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <FaStar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Favorites</h1>
              <p className="text-slate-400 text-sm">{favorites.length} saved favorites</p>
            </div>
          </div>
        </motion.div>

        {favorites.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search favorites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </motion.div>
        )}

        {favorites.length === 0 ? (
          <EmptyState
            emoji="⭐"
            title="No favorites yet"
            description="Star your best explanations and viva questions to save them here for quick access."
            actionLabel="Explain Some Code"
            actionLink="/explain"
          />
        ) : filtered.length === 0 ? (
          <EmptyState emoji="🔍" title="No results found" description="Try a different search term." />
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  index={i}
                  onView={setSelectedItem}
                  onRemove={(id) => { removeFromFavorites(id); toast.success('Removed from favorites'); }}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <ReusableModal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.title || 'Favorite'} size="lg">
        {selectedItem && (
          <ExplanationCard title="Result" content={selectedItem.result} filename={`${selectedItem.type}-favorite.txt`} />
        )}
      </ReusableModal>
    </div>
  );
};

export default Favorites;
