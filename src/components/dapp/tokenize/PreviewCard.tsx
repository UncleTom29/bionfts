import React from 'react';
import { FileText } from 'lucide-react';

interface PreviewCardProps {
  file: File | null;
  preview: string;
}

const PreviewCard = ({ file, preview }: PreviewCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">NFT Preview</h3>
      
      {file ? (
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText size={64} className="text-purple-500" />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Data Preview</h4>
            <pre className="text-sm text-gray-600 overflow-auto max-h-40">
              {preview.slice(0, 500)}
              {preview.length > 500 && '...'}
            </pre>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              File Size: {(file.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-sm text-gray-600">
              Type: {file.type || 'text/plain'}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
          No file selected
        </div>
      )}
    </div>
  );
};

export default PreviewCard;