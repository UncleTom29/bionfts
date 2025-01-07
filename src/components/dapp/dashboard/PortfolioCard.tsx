import React from 'react';
import { Dna, TrendingUp } from 'lucide-react';

const PortfolioCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Your Portfolio</h3>
        <span className="text-green-600 flex items-center text-sm">
          <TrendingUp size={16} className="mr-1" /> +12.5%
        </span>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Dna className="text-purple-500 mr-3" />
            <div>
              <h4 className="font-medium">BioNFT #{item}</h4>
              <p className="text-sm text-gray-600">Genomic Sequence #{item}00</p>
            </div>
            <div className="ml-auto">
              <p className="font-medium">2.5 BNB</p>
              <p className="text-sm text-gray-600">$1,250</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioCard;