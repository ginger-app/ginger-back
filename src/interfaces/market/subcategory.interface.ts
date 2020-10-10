import { Schema } from 'mongoose';

export interface MarketSubcategory {
  _id: Schema.Types.ObjectId;
  name: string;
  items: Schema.Types.ObjectId[];
}
