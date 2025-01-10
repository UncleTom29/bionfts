import React, { useEffect, useState } from 'react';
import { PiggyBank, Loader2 } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { formatEther } from 'viem';

const STAKING_ADDRESS = '0x4Af4eA278DE08529ce1F77e8561ef4f1B985Aec3' as const;

const StakingAbi = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getStakedTokens',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewardRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

const StakingCard = () => {
  const { address, isConnected } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);

  // Get staked tokens
  const { data: stakedTokens } = useReadContract({
    address: STAKING_ADDRESS,
    abi: StakingAbi,
    functionName: 'getStakedTokens',
    args: [address!],
    query: {
      enabled: Boolean(address),
    },
  });

  // Get reward rate (APY)
  const { data: rewardRate } = useReadContract({
    address: STAKING_ADDRESS,
    abi: StakingAbi,
    functionName: 'rewardRate',
  });

  // Claim rewards
  const { writeContract } = useWriteContract();

  const handleClaimRewards = async () => {
    if (!address) return;

    try {
      setIsClaiming(true);
      const hash = await writeContract({
        address: STAKING_ADDRESS,
        abi: StakingAbi,
        functionName: 'claimRewards',
      });
      // Wait for transaction confirmation if needed
    } catch (error) {
      console.error('Failed to claim rewards:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  // Calculate APY
  const calculateAPY = () => {
    if (!rewardRate) return 0;
    const annualRewards = Number(formatEther(rewardRate)) * 365;
    return (annualRewards * 100).toFixed(1);
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Staking Rewards</h3>
        <p className="text-gray-500 text-center">Connect your wallet to view staking info</p>
      </div>
    );
  }

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
            <p className="text-xl font-semibold">
              {stakedTokens ? stakedTokens.length : 0} BioNFTs
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current APY</p>
            <p className="text-xl font-semibold text-green-600">
              {calculateAPY()}%
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Unclaimed Rewards</p>
          <p className="text-xl font-semibold">250 BNFT</p>
          <button
            onClick={handleClaimRewards}
            disabled={isClaiming || !stakedTokens?.length}
            className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isClaiming ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Claiming...
              </>
            ) : (
              'Claim Rewards'
            )}
          </button>
        </div>
      </div>
    </div>
  )}

  export default StakingCard;