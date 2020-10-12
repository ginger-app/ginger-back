// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    default:
      'https://opto.s3.eu-north-1.amazonaws.com/market-categories/tomato-mock.png',
  })
  image: string;

  @Prop({ default: [], ref: 'Subcategory' })
  filteringOptions: MongoSchema.Types.ObjectId[];

  @Prop({ default: [], ref: 'MarketItems' })
  items: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
