import { ReactNode } from 'react';

export interface NFT {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  owner: string;
}
export interface NFTFilters {
  category: string;
  priceRange: string;
  sortBy: string;
}