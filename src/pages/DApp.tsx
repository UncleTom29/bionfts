import React, { useState } from 'react';
import DappNavbar from '../components/dapp/layout/DappNavbar';
import Dashboard from '../components/dapp/dashboard/Dashboard';
import Tokenize from '../components/dapp/tokenize/Tokenize';
import Marketplace from '../components/dapp/marketplace/Marketplace';
import Support from '../components/dapp/Support';

const DApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tokenize':
        return <Tokenize />;
      case 'marketplace':
        return <Marketplace />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DappNavbar onPageChange={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </div>
  );
};

export default DApp;