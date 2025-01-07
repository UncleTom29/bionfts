import React from 'react';
import { Wallet, LayoutDashboard, Coins, Store, LifeBuoy } from 'lucide-react';
import { Dna } from 'lucide-react';

const BioNFTsLogo = () => {
  return (
    <div className="flex items-center cursor-pointer">
      <Dna size={32} className="text-purple-600" />
      <span className="ml-2 text-xl font-bold text-gray-900">BioNFTs</span>
    </div>
  );
};

interface DappNavbarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const DappNavbar = ({ onPageChange, currentPage }: DappNavbarProps) => {
  const [isConnected, setIsConnected] = React.useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Coins size={20} />, label: 'Tokenize', id: 'tokenize' },
    { icon: <Store size={20} />, label: 'Marketplace', id: 'marketplace' },
    { icon: <LifeBuoy size={20} />, label: 'Support', id: 'support' },
  ];

  const handleLogoClick = () => {
    // Navigate to landing page
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div onClick={handleLogoClick} className="mr-6">
              <BioNFTsLogo />
            </div>
            
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                  currentPage === item.id
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setIsConnected(!isConnected)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                isConnected
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <Wallet size={20} className="mr-2" />
              {isConnected ? '0x1234...5678' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DappNavbar;