export interface MarketItem {
  name: string;
  unit: string;
  minPrice: string;
  maxPrice: string;
  image: string;
  suppliers: {
    name: string;
    price: string;
    discount: number;
    rating: number;
    conditions: Array<string>;
  }[];
}
