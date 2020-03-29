// Validator
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMobilePhone, IsEmail } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsString()
  @IsMobilePhone('UA')
  phoneNumber: string;
}

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsMobilePhone('UA')
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
