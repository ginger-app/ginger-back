// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

// Instruments
import * as EmailValidator from 'email-validator';
import parsePhoneNumber from 'libphonenumber-js';
import { Order, ListItem } from '../../../interfaces';

interface OrdersObject {
  suppliers: MongoSchema.Types.ObjectId[];
  categories: MongoSchema.Types.ObjectId[];
  data: MongoSchema.Types.ObjectId[];
}

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, validate: value => EmailValidator.validate(value) })
  email: string;

  @Prop({
    required: true,
    validate: value => parsePhoneNumber(value).isValid(),
  })
  phoneNumber: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ default: [] })
  locations: Array<MongoSchema.Types.ObjectId>;

  @Prop({ default: {} })
  type: OrdersObject;

  @Prop({ default: {} })
  unfinishedOrder: Order;

  @Prop({ default: [] })
  lists: ListItem[];

  @Prop({ default: [] })
  paymentMethods: string[];

  @Prop({ default: {} })
  analyticsData: Object;

  @Prop({ default: 'client' })
  role: string;

  @Prop({ default: new Date(Date.now()).toISOString() })
  lastVisit: Date;

  @Prop()
  registrationDate: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
