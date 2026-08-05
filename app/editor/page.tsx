'use client';

import React, { useState, useEffect } from 'react';
import EditorPage from '@/app/components/EditorPage';

interface FileItem {
  name: string;
  path: string;
  content: string;
}

export default function EditorRoute() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Načtení dostupných souborů z repositáře
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await fetch('/api/editor/files');
        const data = await response.json();
        setFiles(data.files || []);
        if (data.files && data.files.length > 0) {
          setSelectedFile(data.files[0].path);
        }
      } catch (error) {
        console.error('Chyba při načítání souborů:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  const currentFile = files.find(f => f.path === selectedFile);

  const handleSave = async (content: string, path: string) => {
    try {
      const response = await fetch('/api/editor/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content }),
      });

      if (!response.ok) throw new Error('Selhalo uložení');

      // Aktualizuj lokální stav
      setFiles(files.map(f => 
        f.path === path ? { ...f, content } : f
      ));
    } catch (error) {
      console.error('Chyba při ukládání:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítám editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Boční panel se soubory */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="font-bold text-gray-900 dark:text-white text-lg">📁 Soubory</h2>
        </div>

        <div className="space-y-1 p-2">
          {files.map(file => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file.path)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                selectedFile === file.path
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-l-4 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📄 {file.name}
            </button>
          ))}
        </div>

        <div className="p-4 mt-4 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded-lg mx-2">
          <p><strong>💾 Připraveno:</strong> Auto-save je aktivní</p>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto">
        {currentFile ? (
          <EditorPage
            initialContent={currentFile.content}
            filePath={currentFile.path}
            onSave={handleSave}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg">Žádný soubor k editaci</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
