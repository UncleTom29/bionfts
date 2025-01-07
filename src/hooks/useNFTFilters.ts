import { useState } from 'react';
import { NFT, NFTFilters } from '../types/marketplace';
import { mockNFTs } from '../data/mockNFTs';

export const useNFTFilters = () => {
  const [filters, setFilters] = useState<NFTFilters>({
    category: '',
    priceRange: '',
    sortBy: 'recent'
  });

  const filteredNFTs = mockNFTs.filter((nft) => {
    if (filters.category && nft.category !== filters.category) return false;
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (nft.price < min || nft.price > max)) return false;
      if (!max && nft.price < min) return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return b.id - a.id;
    }
  });

  return { filters, setFilters, filteredNFTs };
};