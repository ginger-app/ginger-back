// Core
import { ApiProperty } from '@nestjs/swagger';

import { FilteringOption, MarketItem } from '../../../interfaces';

export class MarketCategoryDto {
  @ApiProperty({ title: 'Market category name', type: String })
  name: string;

  @ApiProperty({ title: 'Market category image', type: String })
  image: string;

  @ApiProperty({
    title: 'Filtering options for category a.k.a. Subcategory',
    type: Array,
  })
  fileringOptions: FilteringOption[];

  @ApiProperty({ title: 'A list of items in a category', type: Array })
  items: MarketItem[];
}
