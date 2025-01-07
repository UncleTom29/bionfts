import React from 'react';
import { Dna, FileText, Microscope } from 'lucide-react';
import { NFT } from '../../../types/marketplace';

interface NFTCardProps {
  nft: NFT;
}

const NFTCard = ({ nft }: NFTCardProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'dna':
        return <Dna size={64} className="text-purple-500" />;
      case 'file-text':
        return <FileText size={64} className="text-purple-500" />;
      case 'microscope':
        return <Microscope size={64} className="text-purple-500" />;
      default:
        return <Dna size={64} className="text-purple-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-50 rounded-t-xl p-4 flex items-center justify-center">
        {getIcon(nft.image)}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{nft.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{nft.category}</p>
        
        <div className="mt-4 flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-lg font-semibold text-gray-900">{nft.price} BNB</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;