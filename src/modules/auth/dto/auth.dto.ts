// Validator
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMobilePhone } from 'class-validator';

export class GetSmsCodeDto {
  @ApiProperty()
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;
}

export class ConfirmationDto {
  @ApiProperty({ title: `User's phone number` })
  @IsString()
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @ApiProperty({ title: 'Code from SMS' })
  @IsString()
  code: string;
}

export class ClientSignupDto {}
