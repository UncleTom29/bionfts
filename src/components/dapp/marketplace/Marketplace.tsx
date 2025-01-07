import React from 'react';
import FilterBar from './FilterBar';
import NFTGrid from './NFTGrid';
import { useNFTFilters } from '../../../hooks/useNFTFilters';

const Marketplace = () => {
  const { filters, setFilters, filteredNFTs } = useNFTFilters();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">NFT Marketplace</h2>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <NFTGrid nfts={filteredNFTs} />
    </div>
  );
}

export default Marketplace;