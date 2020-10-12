// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type MarketItemDocument = MarketItem & Document;

@Schema()
export class MarketItem {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  minPrice: number;

  @Prop({ required: true })
  maxPrice: number;

  @Prop({
    default:
      'https://opto.s3.eu-north-1.amazonaws.com/market-items/apples-mock.png',
  })
  image: string;

  @Prop({ ref: 'Suppliers' })
  suppliers: MongoSchema.Types.ObjectId[];
}

export const MarketItemSchema = SchemaFactory.createForClass(MarketItem);
