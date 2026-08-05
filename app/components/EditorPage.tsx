import React, { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';
import { Download, Save, FileText, RotateCcw } from 'lucide-react';

interface EditorPageProps {
  initialContent?: string;
  filePath?: string;
  onSave?: (content: string, path: string) => Promise<void>;
}

export default function EditorPage({ 
  initialContent = '', 
  filePath = 'dokument.md',
  onSave 
}: EditorPageProps) {
  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [mode, setMode] = useState('markdown');
  const editorRef = useRef<AceEditor>(null);

  const isDirty = content !== savedContent;

  // Automatické uložení každých 30 sekund
  useEffect(() => {
    if (!isDirty || !onSave) return;

    const autoSaveTimer = setTimeout(async () => {
      await handleSave();
    }, 30000);

    return () => clearTimeout(autoSaveTimer);
  }, [content, isDirty]);

  const handleSave = async () => {
    if (!onSave || !isDirty) return;

    setIsSaving(true);
    try {
      await onSave(content, filePath);
      setSavedContent(content);
      setSaveMessage('✓ Uloženo v repositáři');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('✗ Chyba při ukládání');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadFile = (format: 'md' | 'txt' | 'docx' | 'pdf') => {
    let blob: Blob;
    let fileName = filePath.replace(/\.[^/.]+$/, '');

    switch (format) {
      case 'md':
        blob = new Blob([content], { type: 'text/markdown' });
        fileName += '.md';
        break;
      case 'txt':
        blob = new Blob([content], { type: 'text/plain' });
        fileName += '.txt';
        break;
      case 'docx':
        // Jednoduchá konverze pro DOCX (nutný DocxJS)
        const docxContent = `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
          <w:body><w:p><w:r><w:t>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</w:t></w:r></w:p></w:body>
        </w:document>`;
        blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        fileName += '.docx';
        break;
      case 'pdf':
        // Pro PDF bude nutná externální knihovna (pdfkit nebo jsPDF)
        blob = new Blob([content], { type: 'application/pdf' });
        fileName += '.pdf';
        break;
      default:
        return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Horní lišta */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              📝 Editor - {filePath}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isDirty ? '● Neuložené změny' : '✓ Vše je uloženo'}
            </p>
          </div>

          {/* Ovládání */}
          <div className="flex flex-wrap gap-2">
            {/* Mód editoru */}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <option value="markdown">Markdown</option>
              <option value="text">Text</option>
            </select>

            {/* Uložit */}
            <button
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
            >
              <Save size={18} />
              {isSaving ? 'Ukládám...' : 'Uložit'}
            </button>

            {/* Reset */}
            <button
              onClick={() => setContent(savedContent)}
              disabled={!isDirty}
              className="flex items-center gap-2 px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Stavy */}
        {saveMessage && (
          <div className="bg-blue-50 dark:bg-blue-900 px-4 py-2 text-sm text-blue-700 dark:text-blue-200">
            {saveMessage}
          </div>
        )}
      </div>

      {/* Obsah */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Editor */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <AceEditor
              ref={editorRef}
              mode={mode}
              theme="github"
              onChange={setContent}
              value={content}
              width="100%"
              height="600px"
              fontSize={14}
              showPrintMargin={false}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>

          {/* Sidebar - Export */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Download size={20} />
                Stažení
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => downloadFile('md')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition text-sm flex items-center justify-center gap-2"
                >
                  📄 Markdown (.md)
                </button>

                <button
                  onClick={() => downloadFile('txt')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition text-sm flex items-center justify-center gap-2"
                >
                  📝 Text (.txt)
                </button>

                <button
                  onClick={() => downloadFile('docx')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition text-sm flex items-center justify-center gap-2"
                >
                  📋 Word (.docx)
                </button>

                <button
                  onClick={() => downloadFile('pdf')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition text-sm flex items-center justify-center gap-2"
                >
                  🔴 PDF (.pdf)
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 border border-blue-200 dark:border-blue-700 text-sm text-blue-700 dark:text-blue-200">
              <p className="font-semibold mb-2">💡 Tipy:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Automatické uložení každých 30 sekund</li>
                <li>Stiskni Ctrl+S pro manuální uložení</li>
                <li>Markdown i Text mód</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
