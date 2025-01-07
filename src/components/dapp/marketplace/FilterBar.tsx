import React from 'react';
import { Filter } from 'lucide-react';
import { NFTFilters } from '../../../types/marketplace';

interface FilterBarProps {
  filters: NFTFilters;
  onFilterChange: (filters: NFTFilters) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <Filter size={20} className="text-gray-400 mr-2" />
          <span className="font-medium">Filters</span>
        </div>
        
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="">All Categories</option>
          <option value="genomic">Genomic Data</option>
          <option value="research">Research Findings</option>
          <option value="patent">Biotech Patents</option>
        </select>
        
        <select
          value={filters.priceRange}
          onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="">All Prices</option>
          <option value="0-1">0-1 BNB</option>
          <option value="1-5">1-5 BNB</option>
          <option value="5+">5+ BNB</option>
        </select>
        
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="recent">Recently Listed</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;