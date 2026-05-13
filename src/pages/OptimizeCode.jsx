import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaTrash, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import CodeEditor from '../components/editor/CodeEditor';
import LanguageSelector from '../components/editor/LanguageSelector';
import OutputPanel from '../components/editor/OutputPanel';
import CodeUpload from '../components/editor/CodeUpload';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { optimizeCode } from '../services/aiService';
import { DEFAULT_CODE, OPTIMIZATION_TYPES } from '../utils/constants';
import { generateId } from '../utils/helpers';

const OptimizeCode = () => {
  const { language, setLanguage, addToHistory } = useApp();
  const [code, setCode] = useState(DEFAULT_CODE[language] || '');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [optimizationType, setOptimizationType] = useState('performance');

  useEffect(() => {
    setCode(DEFAULT_CODE[language] || '');
    setResult('');
  }, [language]);

  const handleOptimize = useCallback(async () => {
    if (!code.trim()) { toast.error('Please enter some code to optimize.'); return; }
    setLoading(true);
    setResult('');
    try {
      const res = await optimizeCode(code, language, optimizationType);
      setResult(res);
      addToHistory({
        id: generateId(),
        title: `Optimize (${optimizationType}): ${code.trim().split('\n')[0].slice(0, 40)}`,
        type: 'optimize',
        language,
        code,
        result: res,
      });
      toast.success('Code optimized successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to optimize code.');
    } finally {
      setLoading(false);
    }
  }, [code, language, optimizationType, addToHistory]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !loading) handleOptimize();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleOptimize, loading]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <FaRocket className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Optimize Code</h1>
              <p className="text-slate-400 text-sm">Improve performance, readability, and efficiency</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector value={language} onChange={setLanguage} />
              {/* Optimization type */}
              <div className="relative">
                <select
                  value={optimizationType}
                  onChange={(e) => setOptimizationType(e.target.value)}
                  className="appearance-none px-4 py-2.5 pr-8 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-slate-200 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:border-cyan-500"
                >
                  {OPTIMIZATION_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
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
            <Button variant="cyan" size="lg" icon={FaRocket} loading={loading} onClick={handleOptimize} className="w-full">
              {loading ? 'Optimizing...' : 'Optimize Code'}
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="min-h-[550px]">
            <OutputPanel result={result} loading={loading} title="Optimization Result" filename="optimized-code.txt" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OptimizeCode;
