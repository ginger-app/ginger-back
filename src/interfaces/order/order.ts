import { MarketItem } from '../market';

enum Status {
  Placed = 'Placed',
  Payed = 'Payed',
  Finished = 'Finished',
  Cancelled = 'Cancelled',
}

export interface Order {
  supplier: string; // supplier id
  client: string; // client id
  createdAt: Date;
  deliveryDate: Date;
  location: string; // location id
  items: MarketItem[];
  sum: string;
  status: Status;
}
