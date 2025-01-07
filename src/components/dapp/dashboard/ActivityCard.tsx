import React from 'react';
import { Activity } from 'lucide-react';

const activities = [
  { type: 'purchase', asset: 'BioNFT #123', price: '2.5 BNB', time: '2h ago' },
  { type: 'stake', asset: 'BioNFT #456', amount: '1 NFT', time: '5h ago' },
  { type: 'reward', asset: 'Staking Rewards', amount: '50 BNFT', time: '1d ago' },
];

const ActivityCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <Activity className="text-purple-500" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{activity.asset}</p>
              <p className="text-sm text-gray-600">{activity.type}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{activity.price || activity.amount}</p>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityCard;