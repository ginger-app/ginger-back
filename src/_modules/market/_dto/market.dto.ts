import {
  IsString,
  IsNumber,
  IsArray,
  // IsOptional,
  IsIn,
  IsObject,
  IsDateString,
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
}

export class MarketItem {
  @ApiProperty()
  @IsNumber()
  sku: number;

  @ApiProperty()
  @IsArray()
  categories: Array<object>;

  @ApiProperty()
  @IsArray()
  subcategories: Array<object>;

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
  measurementValue: string;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  discount: number;
}

export class Order {
  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNumber()
  sum: number;

  @ApiProperty()
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
  actualCart: Object;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  client: string;
}
