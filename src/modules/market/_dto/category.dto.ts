// Core
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

import { MarketItem } from '../../../interfaces';

export class MarketCategoryDto {
  @ApiProperty({
    title: 'Category id - generated automatically from name',
    type: String,
  })
  _id: string;

  @ApiProperty({ title: 'Market category name', type: String })
  name: string;

  @ApiProperty({ title: 'Market category image', type: String })
  image: string;

  @ApiProperty({
    title: 'Filtering options for category a.k.a. Subcategory',
    type: Array,
  })
  filteringOptions: Schema.Types.ObjectId[];

  @ApiProperty({ title: 'A list of items in a category', type: Array })
  items: MarketItem[];
}
