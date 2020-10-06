import { Client } from '../profile';

export interface ClientSignup
  extends Pick<Client, 'name' | 'email' | 'phoneNumber' | 'companyName'> {}
