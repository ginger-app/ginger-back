import { MarketItem } from '../market';
import { Order } from '../order';
import { Location } from '../location';

export interface ListItem extends MarketItem {
  locations: Array<any>;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  locations: Location[];
  orders: {
    suppliers: Array<any>;
    categories: Array<any>;
    data: Order[];
  };
  unfinishedOrder: Order;
  lists: ListItem[];
  paymentMethods: Array<any>;
  analyticsData: Object;
  cookiesAgreed: Boolean;
  readonly role: string;
}
