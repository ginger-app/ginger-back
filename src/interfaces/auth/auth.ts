import { Client } from '../user';

export interface ClientSignup
  extends Pick<Client, 'name' | 'email' | 'phoneNumber' | 'companyName'> {
  code: string;
}
