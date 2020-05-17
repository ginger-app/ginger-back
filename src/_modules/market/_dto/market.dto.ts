import {
  IsString,
  IsNumber,
  IsArray,
  // IsOptional,
  IsIn,
  IsObject,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarketCategory {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  children: string;
}

export class MarketSubcategory {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  parentSku: string;

  @ApiProperty()
  @IsArray()
  tags: Array<string>;
}

export class MarketItem {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsArray()
  categories: Array<string>;

  @ApiProperty()
  @IsArray()
  subcategories: Array<string>;

  @ApiProperty()
  @IsString()
  nameUkr: string;

  @ApiProperty()
  @IsString()
  nameRu: string;

  @ApiProperty()
  @IsString()
  descriptionUkr: string;

  @ApiProperty()
  @IsString()
  descriptionRu: string;

  @ApiProperty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsArray()
  tags: Array<string>;
}

export class Order {
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  date: string;

  @ApiProperty()
  @IsNumber()
  sum: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([
    'Awaiting payment',
    'Awaiting collection',
    'Awaiting shipment',
    'Shipping',
    'Completed',
    'Pending',
  ])
  status: string;

  @ApiProperty()
  @IsObject()
  userCart: Object;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  actualCart: Object;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  client: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty()
  @IsString()
  deliveryTime: string;

  @ApiProperty()
  @IsString()
  addressDetails: string;
}
export class UpdateOrder {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sum: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([
    'Awaiting payment',
    'Awaiting collection',
    'Awaiting shipment',
    'Shipping',
    'Completed',
    'Pending',
  ])
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  actualCart: Object;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;
}
