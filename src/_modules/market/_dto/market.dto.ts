import { IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarketCategory {
  @ApiProperty()
  @IsString()
  name: string;
}

export class MarketItem {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  categories: [];

  @ApiProperty()
  @IsNumber()
  leftovers: number;
}
