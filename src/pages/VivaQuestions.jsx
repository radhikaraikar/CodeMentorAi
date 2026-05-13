import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaTrash, FaStar, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import CodeEditor from '../components/editor/CodeEditor';
import LanguageSelector from '../components/editor/LanguageSelector';
import OutputPanel from '../components/editor/OutputPanel';
import CodeUpload from '../components/editor/CodeUpload';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { generateVivaQuestions } from '../services/aiService';
import { DEFAULT_CODE, DIFFICULTY_LEVELS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const VivaQuestions = () => {
  const { language, setLanguage, addToHistory, addToFavorites, removeFromFavorites } = useApp();
  const [code, setCode] = useState(DEFAULT_CODE[language] || '');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('intermediate');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setCode(DEFAULT_CODE[language] || '');
    setResult('');
    setCurrentItemId(null);
    setIsFav(false);
  }, [language]);

  const handleGenerate = useCallback(async () => {
    if (!code.trim()) { toast.error('Please enter some code first.'); return; }
    setLoading(true);
    setResult('');
    try {
      const res = await generateVivaQuestions(code, language, difficulty);
      setResult(res);
      const item = addToHistory({
        id: generateId(),
        title: `Viva (${difficulty}): ${code.trim().split('\n')[0].slice(0, 40)}`,
        type: 'viva',
        language,
        code,
        result: res,
      });
      setCurrentItemId(item.id);
      toast.success('Viva questions generated!');
    } catch (err) {
      toast.error(err.message || 'Failed to generate questions.');
    } finally {
      setLoading(false);
    }
  }, [code, language, difficulty, addToHistory]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !loading) handleGenerate();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleGenerate, loading]);

  const handleFavorite = () => {
    if (!result) return;
    if (isFav && currentItemId) {
      removeFromFavorites(currentItemId);
      setIsFav(false);
      toast.success('Removed from favorites');
    } else {
      const item = addToFavorites({
        title: `Viva (${difficulty}): ${code.trim().split('\n')[0].slice(0, 40)}`,
        type: 'viva',
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <FaGraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Viva Questions</h1>
              <p className="text-slate-400 text-sm">Generate exam-ready questions from your code</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector value={language} onChange={setLanguage} />
              <div className="relative">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="appearance-none px-4 py-2.5 pr-8 rounded-xl bg-slate-800 border border-slate-700 hover:border-yellow-500 text-slate-200 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:border-yellow-500"
                >
                  {DIFFICULTY_LEVELS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
              <CodeUpload onUpload={(content) => setCode(content)} />
              <Button variant="ghost" size="sm" icon={FaTrash} onClick={() => { setCode(''); setResult(''); }} className="ml-auto">
                Clear
              </Button>
            </div>
            <CodeEditor value={code} onChange={setCode} language={language} height="450px" />
            <Button
              size="lg"
              icon={FaGraduationCap}
              loading={loading}
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
            >
              {loading ? 'Generating...' : 'Generate Viva Questions'}
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="min-h-[550px]">
            <OutputPanel
              result={result}
              loading={loading}
              onAddFavorite={result ? handleFavorite : undefined}
              isFavorite={isFav}
              title="Viva Questions"
              filename="viva-questions.txt"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VivaQuestions;
