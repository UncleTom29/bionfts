import React from 'react';

const MetadataForm = () => {
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">NFT Metadata</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="e.g., Genomic Sequence #123"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="Describe your biological data..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
          <option>Genomic Data</option>
          <option>Research Findings</option>
          <option>Biotech Patent</option>
          <option>Clinical Trial Data</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Initial Price (BNB)</label>
        <input
          type="number"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="0.00"
        />
      </div>
      
      <button className="w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
        Create BioNFT
      </button>
    </div>
  );
};

export default MetadataForm;