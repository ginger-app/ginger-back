import { MarketItem } from '../market';
import { Order } from '../order';

interface LocationMarketItem extends MarketItem {
  chosenSupplier: string;
}

export interface Location {
  id: string;
  parentId: string;
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
