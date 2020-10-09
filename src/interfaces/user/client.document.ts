import { Document } from 'mongoose';
import { Client } from './client.interface';

export interface ClientDocument extends Client, Omit<Document, 'id'> {}
