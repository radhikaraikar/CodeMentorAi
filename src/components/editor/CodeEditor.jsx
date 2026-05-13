import Editor from '@monaco-editor/react';
import Spinner from '../common/Spinner';

const CodeEditor = ({
  value = '',
  onChange,
  language = 'javascript',
  height = '400px',
  readOnly = false,
  placeholder = '// Paste or type your code here...',
}) => {
  const handleEditorMount = (editor) => {
    // Add keyboard shortcut hint
    editor.addCommand(
      // Ctrl+Enter
      2048 + 3,
      () => {
        // Trigger explain - handled by parent via keyboard event
        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
          ctrlKey: true,
          bubbles: true,
        });
        document.dispatchEvent(event);
      }
    );
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1117]">
      {/* Editor header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border-b border-slate-700/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-slate-500 text-xs ml-2 font-mono">
          {language}.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'java' ? 'java' : language === 'cpp' ? 'cpp' : language}
        </span>
        {readOnly && (
          <span className="ml-auto text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Read Only</span>
        )}
      </div>

      <Editor
        height={height}
        language={language === 'cpp' ? 'cpp' : language}
        value={value}
        onChange={onChange}
        onMount={handleEditorMount}
        loading={
          <div className="flex items-center justify-center h-full bg-[#0d1117]">
            <Spinner size="lg" />
          </div>
        }
        options={{
          theme: 'vs-dark',
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          readOnly,
          placeholder,
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          suggest: {
            showKeywords: true,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
