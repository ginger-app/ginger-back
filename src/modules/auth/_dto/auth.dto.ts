// Validator
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMobilePhone,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class GetSmsCodeDto {
  @ApiProperty()
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;
}

export class ClientSignupDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isWorker: boolean;
}

export class ConfirmationDto {
  @ApiProperty()
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  code: string;
}
