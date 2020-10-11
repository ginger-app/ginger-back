// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

import { FilteringOption } from '../../../interfaces';

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

  @Prop({ default: [] })
  fileringOptions: FilteringOption[];

  @Prop({ default: [] })
  items: MongoSchema.Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
