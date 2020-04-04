// Validator
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMobilePhone, IsEmail, IsBoolean } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;
}

export class SignupDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsBoolean()
  isWorker: boolean;
}
