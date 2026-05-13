import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaTrash, FaCopy, FaStar, FaRegStar, FaKeyboard } from 'react-icons/fa';
import toast from 'react-hot-toast';
import CodeEditor from '../components/editor/CodeEditor';
import LanguageSelector from '../components/editor/LanguageSelector';
import OutputPanel from '../components/editor/OutputPanel';
import CodeUpload from '../components/editor/CodeUpload';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { explainCode } from '../services/aiService';
import { DEFAULT_CODE } from '../utils/constants';
import { generateId } from '../utils/helpers';

const ExplainCode = () => {
  const { language, setLanguage, addToHistory, addToFavorites, removeFromFavorites } = useApp();
  const [code, setCode] = useState(DEFAULT_CODE[language] || '');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setCode(DEFAULT_CODE[language] || '');
    setResult('');
    setCurrentItemId(null);
    setIsFav(false);
  }, [language]);

  const handleExplain = useCallback(async () => {
    if (!code.trim()) { toast.error('Please enter some code first.'); return; }
    setLoading(true);
    setResult('');
    try {
      const res = await explainCode(code, language);
      setResult(res);
      const item = addToHistory({
        id: generateId(),
        title: `Explain: ${code.trim().split('\n')[0].slice(0, 50)}`,
        type: 'explain',
        language,
        code,
        result: res,
      });
      setCurrentItemId(item.id);
      toast.success('Code explained successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to explain code. Check your API key.');
    } finally {
      setLoading(false);
    }
  }, [code, language, addToHistory]);

  // Ctrl+Enter shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!loading) handleExplain();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleExplain, loading]);

  const handleFavorite = () => {
    if (!result) return;
    if (isFav && currentItemId) {
      removeFromFavorites(currentItemId);
      setIsFav(false);
      toast.success('Removed from favorites');
    } else {
      const item = addToFavorites({
        title: `Explain: ${code.trim().split('\n')[0].slice(0, 50)}`,
        type: 'explain',
        language,
        code,
        result,
      });
      setCurrentItemId(item.id);
      setIsFav(true);
      toast.success('Added to favorites!');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-neon">
              <FaPlay className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Explain Code</h1>
              <p className="text-slate-400 text-sm">Get AI-powered line-by-line explanations</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
            <FaKeyboard className="w-3 h-3" />
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">Ctrl+Enter</kbd> to explain</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Editor */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector value={language} onChange={setLanguage} />
              <CodeUpload onUpload={(content) => setCode(content)} />
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="ghost" size="sm" icon={FaTrash} onClick={() => { setCode(''); setResult(''); }}>
                  Clear
                </Button>
                <Button variant="ghost" size="sm" icon={FaCopy} onClick={() => { navigator.clipboard.writeText(code); toast.success('Code copied!'); }}>
                  Copy
                </Button>
              </div>
            </div>

            <CodeEditor value={code} onChange={setCode} language={language} height="450px" />

            <Button variant="primary" size="lg" icon={FaPlay} loading={loading} onClick={handleExplain} className="w-full">
              {loading ? 'Analyzing...' : 'Explain Code'}
            </Button>
          </motion.div>

          {/* Right: Output */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="min-h-[550px]">
            <OutputPanel
              result={result}
              loading={loading}
              onAddFavorite={result ? handleFavorite : undefined}
              isFavorite={isFav}
              title="Code Explanation"
              filename="explanation.txt"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExplainCode;
