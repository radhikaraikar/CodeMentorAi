import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCode } from 'react-icons/fa';
import { languages } from '../../data/languages';

const LanguageSelector = ({ value, onChange, className = '' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = languages.find((l) => l.value === value) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-200 text-sm font-medium transition-all duration-200 min-w-[160px] w-full"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base">{selected.icon}</span>
        <span className="flex-1 text-left">{selected.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FaChevronDown className="w-3 h-3 text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute top-full left-0 mt-2 w-full z-50 bg-slate-900 border border-slate-700 rounded-xl shadow-glass overflow-hidden"
          >
            {languages.map((lang) => (
              <li
                key={lang.value}
                role="option"
                aria-selected={lang.value === value}
                onClick={() => {
                  onChange(lang.value);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors duration-150
                  ${lang.value === value
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <span className="text-base">{lang.icon}</span>
                <span>{lang.label}</span>
                <span className="ml-auto text-xs text-slate-500 font-mono">{lang.extension}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
