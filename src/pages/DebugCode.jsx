import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaBug, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import CodeEditor from '../components/editor/CodeEditor';
import LanguageSelector from '../components/editor/LanguageSelector';
import OutputPanel from '../components/editor/OutputPanel';
import CodeUpload from '../components/editor/CodeUpload';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { debugCode } from '../services/aiService';
import { generateId } from '../utils/helpers';

const buggyCode = {
  javascript: `// Buggy JavaScript code
function calculateAverage(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

console.log(calculateAverage([1, 2, 3, 4, 5]));`,
  python: `# Buggy Python code
def calculate_average(lst):
    sum = 0
    for i in range(len(lst) + 1):
        sum += lst[i]
    return sum / len(lst)

print(calculate_average([1, 2, 3, 4, 5]))`,
};

const DebugCode = () => {
  const { language, setLanguage, addToHistory } = useApp();
  const [code, setCode] = useState(buggyCode[language] || buggyCode.javascript);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode(buggyCode[language] || '');
    setResult('');
  }, [language]);

  const handleDebug = useCallback(async () => {
    if (!code.trim()) { toast.error('Please enter some code to debug.'); return; }
    setLoading(true);
    setResult('');
    try {
      const res = await debugCode(code, language);
      setResult(res);
      addToHistory({
        id: generateId(),
        title: `Debug: ${code.trim().split('\n')[0].slice(0, 50)}`,
        type: 'debug',
        language,
        code,
        result: res,
      });
      toast.success('Code debugged successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to debug code.');
    } finally {
      setLoading(false);
    }
  }, [code, language, addToHistory]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !loading) handleDebug();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleDebug, loading]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <FaBug className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Debug Code</h1>
              <p className="text-slate-400 text-sm">Find and fix errors with AI-powered debugging</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector value={language} onChange={setLanguage} />
              <CodeUpload onUpload={(content) => setCode(content)} />
              <Button variant="ghost" size="sm" icon={FaTrash} onClick={() => { setCode(''); setResult(''); }} className="ml-auto">
                Clear
              </Button>
            </div>
            <CodeEditor value={code} onChange={setCode} language={language} height="450px" />
            <Button variant="danger" size="lg" icon={FaBug} loading={loading} onClick={handleDebug} className="w-full">
              {loading ? 'Debugging...' : 'Debug Code'}
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="min-h-[550px]">
            <OutputPanel result={result} loading={loading} title="Debug Analysis" filename="debug-result.txt" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DebugCode;
