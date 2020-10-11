import { MarketCategoryDto } from '../../modules/market/_dto';

export interface GetAllCategoriesResponse {
  data: Omit<MarketCategoryDto, 'items'>[];
}
