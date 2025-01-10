import React from 'react';
import { Dna, FileText, Microscope, Loader2 } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { NFT } from '../../../types/marketplace';
import { usePurchaseNFT } from '../../../hooks/contractHooks';

interface NFTCardProps {
  nft: NFT;
}

const NFTCard = ({ nft }: NFTCardProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { purchaseNFT, isError } = usePurchaseNFT();
  const [isPurchasing, setIsPurchasing] = React.useState(false);

  const handlePurchase = async () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
      return;
    }

    try {
      setIsPurchasing(true);
      const hash = await purchaseNFT(BigInt(nft.id), nft.price);
      // Wait for transaction confirmation if needed
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

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
          <button 
            onClick={handlePurchase}
            disabled={isPurchasing}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center"
          >
            {isPurchasing ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Buying...
              </>
            ) : (
              'Buy Now'
            )}
          </button>
        </div>
        
        {isError && (
          <p className="mt-2 text-sm text-red-600">
            Error occurred during purchase. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default NFTCard;