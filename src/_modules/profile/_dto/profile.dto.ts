import {
  IsString,
  IsNumber,
  IsArray,
  IsDateString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  userpic: string;

  @ApiProperty()
  @IsArray()
  lists: Array<string>;

  @ApiProperty()
  @IsObject()
  favorites: Object;

  @ApiProperty()
  @IsDateString()
  registrationDate: string;

  @ApiProperty()
  @IsDateString()
  lastVisit: string;

  @ApiProperty()
  @IsNumber()
  averageSessionDuration: number;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsBoolean()
  isWorker: boolean;

  @ApiProperty()
  @IsArray()
  addresses: Array<string>;

  @ApiProperty()
  @IsNumber()
  bonuses: number;

  @ApiProperty()
  @IsArray()
  cards: Array<string>;

  @ApiProperty()
  @IsArray()
  orders: Array<string>;

  @ApiProperty()
  @IsArray()
  referrals: Array<string>;
}
