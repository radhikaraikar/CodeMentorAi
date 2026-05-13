import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaStar, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';
import CodeEditor from '../components/editor/CodeEditor';
import ExplanationCard from '../components/cards/ExplanationCard';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';
import { getLanguageLabel, getTypeBadgeColor, getTypeLabel } from '../utils/helpers';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites } = useApp();
  const item = location.state?.item;
  const [isFav, setIsFav] = useState(false);
  const [favId, setFavId] = useState(null);

  if (!item) {
    return (
      <div className="min-h-screen pt-20">
        <EmptyState
          emoji="📭"
          title="No result to display"
          description="Go to the Explain page to generate a code explanation."
          actionLabel="Explain Code"
          actionLink="/explain"
        />
      </div>
    );
  }

  const handleFavorite = () => {
    if (isFav && favId) {
      removeFromFavorites(favId);
      setIsFav(false);
      setFavId(null);
      toast.success('Removed from favorites');
    } else {
      const saved = addToFavorites(item);
      setIsFav(true);
      setFavId(saved.id);
      toast.success('Added to favorites!');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" icon={FaArrowLeft} onClick={() => navigate(-1)}>
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{item.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getTypeBadgeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                  <span className="text-slate-500 text-xs">{getLanguageLabel(item.language)}</span>
                </div>
              </div>
            </div>
            <Button
              variant={isFav ? 'secondary' : 'ghost'}
              size="sm"
              icon={isFav ? FaStar : FaRegStar}
              onClick={handleFavorite}
            >
              {isFav ? 'Favorited' : 'Add to Favorites'}
            </Button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Original Code */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">Original Code</h2>
            <CodeEditor value={item.code} language={item.language} height="250px" readOnly />
          </motion.div>

          {/* Result */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">AI Result</h2>
            <ExplanationCard title={getTypeLabel(item.type)} content={item.result} filename={`${item.type}-result.txt`} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Result;
