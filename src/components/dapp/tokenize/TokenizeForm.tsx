import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { useAccount, useWriteContract } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Dna, FileText, Microscope } from 'lucide-react';

const BIONFT_ADDRESS = '0x5daD757B8D3caDEc9cfD99e74766573176C1eAC2' as const;

const BioNFTAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'string', name: 'uri', type: 'string' },
      { internalType: 'string', name: 'dataType', type: 'string' },
      { internalType: 'string', name: 'ipfsHash', type: 'string' },
      { internalType: 'uint96', name: 'royaltyPercentage', type: 'uint96' }
    ],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

const TokenizeForm = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract, isError } = useWriteContract();
  
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string>('');
  const [isMinting, setIsMinting] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    category: 'genomic',
    price: '',
    royaltyPercentage: '5'
  });

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('text/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsText(droppedFile);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setMetadata(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (!file || !address) return;

    try {
      setIsMinting(true);
      
      // In a real app, you would upload the file to IPFS here
      const mockIpfsHash = 'QmXyZ...'; // Replace with actual IPFS upload
      const mockUri = `ipfs://${mockIpfsHash}`;
      
      const hash = await writeContract({
        address: BIONFT_ADDRESS,
        abi: BioNFTAbi,
        functionName: 'mint',
        args: [
          address,
          mockUri,
          metadata.category,
          mockIpfsHash,
          BigInt(Math.floor(Number(metadata.royaltyPercentage) * 100)) // Convert percentage to basis points
        ],
      });

      // Optional: Wait for transaction confirmation
      // const receipt = await waitForTransaction({ hash });
      
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Tokenize Your Biological Data</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    if (file) {
                      setFile(file);
                      const reader = new FileReader();
                      reader.onload = (e) => setPreview(e.target?.result as string);
                      reader.readAsText(file);
                    }
                  }}
                />
                <button 
                  type="button" 
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={metadata.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., Genomic Sequence #123"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={metadata.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Describe your biological data..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={metadata.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              >
                <option value="genomic">Genomic Data</option>
                <option value="research">Research Findings</option>
                <option value="patent">Biotech Patent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Price (BNB)</label>
              <input
                type="number"
                name="price"
                value={metadata.price}
                onChange={handleInputChange}
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Royalty Percentage (%)</label>
              <input
                type="number"
                name="royaltyPercentage"
                value={metadata.royaltyPercentage}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isMinting || !file || !isConnected}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isMinting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Minting...
                </>
              ) : (
                'Create BioNFT'
              )}
            </button>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">NFT Preview</h3>
          
          {file ? (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                {getPreviewIcon(metadata.category)}
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
      </form>
    </div>
  );
};

// Helper function for preview icons
const getPreviewIcon = (category: string) => {
  switch (category) {
    case 'genomic':
      return <Dna size={64} className="text-purple-500" />;
    case 'research':
      return <FileText size={64} className="text-purple-500" />;
    case 'patent':
      return <Microscope size={64} className="text-purple-500" />;
    default:
      return <Dna size={64} className="text-purple-500" />;
  }
};

export default TokenizeForm;