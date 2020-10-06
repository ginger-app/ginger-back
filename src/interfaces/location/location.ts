import { Client } from '../profile';
import { MarketItem } from '../market';
import { Order } from '../order';

interface LocationMarketItem extends MarketItem {
  chosenSupplier: string;
}

export interface Location {
  id: string;
  parentId: Client['id'];
  locationName: string;
  address: string;
  schedule: {
    start: number;
    end: number;
  };
  managerName: string;
  phoneNumber: string;
  image: string;
  itemsList: LocationMarketItem[];
  orders: Order[];
}
