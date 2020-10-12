import { Schema } from 'mongoose';

// FilteringOption === Subcategory
export interface FilteringOption {
  id: Schema.Types.ObjectId;
  name: string;
}

export interface MarketCategory {
  _id: Schema.Types.ObjectId;
  name: string;
  image: string;
  filteringOptions: Schema.Types.ObjectId[];
  items: Schema.Types.ObjectId[];
}
