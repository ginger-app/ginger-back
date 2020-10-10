import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
  @Prop({ required: true })
  name: string;

  @Prop({ default: [] })
  items: MongooseSchema.Types.ObjectId[];
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
