import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ALLOWED_EXTENSIONS = ['.js', '.py', '.java', '.cpp', '.c', '.html', '.css', '.sql', '.txt', '.ts', '.go', '.rs', '.php'];

const CodeUpload = ({ onUpload }) => {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      toast.error(`Unsupported file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
      return;
    }
    if (file.size > 500 * 1024) {
      toast.error('File too large. Max size is 500KB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target.result, file.name);
      toast.success(`Loaded: ${file.name}`);
    };
    reader.onerror = () => toast.error('Failed to read file.');
    reader.readAsText(file);
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_EXTENSIONS.join(',')}
        onChange={handleChange}
        className="hidden"
        aria-label="Upload code file"
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
        title="Upload a code file"
      >
        <FaUpload className="w-3.5 h-3.5" />
        Upload File
      </motion.button>
    </div>
  );
};

export default CodeUpload;
