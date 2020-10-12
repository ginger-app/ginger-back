import { Schema } from 'mongoose';

export interface MarketItem {
  name: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  image?: string;
  suppliers: Schema.Types.ObjectId[];
}
