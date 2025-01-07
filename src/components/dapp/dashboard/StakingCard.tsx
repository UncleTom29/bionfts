import React from 'react';
import { PiggyBank } from 'lucide-react';

const StakingCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Staking Rewards</h3>
        <PiggyBank className="text-purple-500" />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Staked</p>
            <p className="text-xl font-semibold">5 BioNFTs</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current APY</p>
            <p className="text-xl font-semibold text-green-600">12.5%</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Unclaimed Rewards</p>
          <p className="text-xl font-semibold">250 BNFT</p>
          <button className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
}

export default StakingCard;