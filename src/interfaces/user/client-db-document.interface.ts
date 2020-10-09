import { ObjectID } from 'bson';
import { Client } from './client.interface';

export type ClientDbDocument = Omit<Client, 'createdAt' | 'updatedAt'> & {
  _id: ObjectID;
  created_at: Date;
  updated_at: Date;
};
