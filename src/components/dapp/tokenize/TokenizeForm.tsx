import React from 'react';
import { Upload, X } from 'lucide-react';
import MetadataForm from './MetadataForm';
import PreviewCard from './PreviewCard';

const TokenizeForm = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string>('');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('text/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsText(droppedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Tokenize Your Biological Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors"
          >
            {!file ? (
              <div className="space-y-4">
                <Upload className="mx-auto text-gray-400" size={32} />
                <p className="text-gray-600">Drag and drop your data file here, or click to browse</p>
                <input
                  type="file"
                  accept=".txt,.csv,.json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFile(file);
                  }}
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
          
          <MetadataForm />
        </div>
        
        <PreviewCard file={file} preview={preview} />
      </div>
    </div>
  );
};

export default TokenizeForm;