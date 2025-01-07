import React from 'react';
import PortfolioCard from './PortfolioCard';
import StakingCard from './StakingCard';
import ActivityCard from './ActivityCard';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PortfolioCard />
        <StakingCard />
        <ActivityCard />
      </div>
    </div>
  );
}

export default Dashboard;