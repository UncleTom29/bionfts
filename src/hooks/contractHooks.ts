import { 
    useAccount, 
    useReadContract, 
    useWriteContract,
  } from 'wagmi';
  import { parseEther, Address } from 'viem';
  
  // ABI snippets for the main functions we'll use
  const BioNFTAbi = [
    // Read functions
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'bioData',
      outputs: [
        {
          components: [
            { internalType: 'string', name: 'dataType', type: 'string' },
            { internalType: 'string', name: 'ipfsHash', type: 'string' },
            { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
            { internalType: 'address', name: 'creator', type: 'address' }
          ],
          internalType: 'struct BioNFT.BioMetadata',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    // Mint function
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
  
  const MarketplaceAbi = [
    // Create listing
    {
      inputs: [
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'price', type: 'uint256' }
      ],
      name: 'createListing',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    // Purchase listing
    {
      inputs: [{ internalType: 'uint256', name: 'listingId', type: 'uint256' }],
      name: 'purchaseListing',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    }
  ] as const;
  
  const StakingAbi = [
    // Stake
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'stake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    // Calculate reward
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'calculateReward',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }
  ] as const;
  
  // Contract addresses (replace with actual deployed addresses)
  const CONTRACTS = {
    BioNFT: '0x5daD757B8D3caDEc9cfD99e74766573176C1eAC2' as const,
    Marketplace: '0x1D7f1713eE2732648264f6f52c087D5eE871F674' as const,
    Staking: '0x4Af4eA278DE08529ce1F77e8561ef4f1B985Aec3' as const,
  } as const;
  
  export function useMintBioNFT() {
    const { address } = useAccount();
    const { writeContract, isError, error } = useWriteContract();
    
    const mintNFT = async (
      uri: string,
      dataType: string,
      ipfsHash: string,
      royaltyPercentage: number
    ) => {
      if (!address) return;
      
      return writeContract({
        address: CONTRACTS.BioNFT,
        abi: BioNFTAbi,
        functionName: 'mint',
        args: [address, uri, dataType, ipfsHash, BigInt(royaltyPercentage)],
      });
    };
  
    return { mintNFT, isError, error };
  }
  
  export function useCreateListing() {
    const { writeContract, isError, error } = useWriteContract();
  
    const listNFT = async (tokenId: bigint, price: number) => {
      return writeContract({
        address: CONTRACTS.Marketplace,
        abi: MarketplaceAbi,
        functionName: 'createListing',
        args: [tokenId, parseEther(price.toString())],
      });
    };
  
    return { listNFT, isError, error };
  }
  
  export function usePurchaseNFT() {
    const { writeContract, isError, error } = useWriteContract();
  
    const purchaseNFT = async (listingId: bigint, price: number) => {
      return writeContract({
        address: CONTRACTS.Marketplace,
        abi: MarketplaceAbi,
        functionName: 'purchaseListing',
        args: [listingId],
        value: parseEther(price.toString()),
      });
    };
  
    return { purchaseNFT, isError, error };
  }
  
  export function useStakeNFT() {
    const { writeContract, isError, error } = useWriteContract();
  
    const stakeNFT = async (tokenId: bigint) => {
      return writeContract({
        address: CONTRACTS.Staking,
        abi: StakingAbi,
        functionName: 'stake',
        args: [tokenId],
      });
    };
  
    return { stakeNFT, isError, error };
  }
  
  export function useNFTRewards(tokenId: bigint) {
    const { data: rewards } = useReadContract({
      address: CONTRACTS.Staking,
      abi: StakingAbi,
      functionName: 'calculateReward',
      args: [tokenId],
    });
  
    return { rewards };
  }
  
  export function useOwnedNFTs(owner: Address | undefined) {
    const { data: balance } = useReadContract({
      address: CONTRACTS.BioNFT,
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      functionName: 'balanceOf',
      args: [owner!],
      query: {
        enabled: Boolean(owner),
      }
    });
  
    const { data: tokens } = useReadContract({
      address: CONTRACTS.BioNFT,
      abi: [
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'uint256', name: 'index', type: 'uint256' }
          ],
          name: 'tokenOfOwnerByIndex',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      functionName: 'tokenOfOwnerByIndex',
      args: [owner!, 0n],
      query: {
        enabled: Boolean(owner && balance && balance > 0n),
      }
    });
  
    return { balance, tokens };
  }