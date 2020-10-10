// Core
import { ApiProperty } from '@nestjs/swagger';

import { Client } from '../../../interfaces';
import { ClientDto } from '../../users/_dto';

/** login response */
export class SigninResponseDto {
  @ApiProperty({ title: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ title: 'Date and time when access token expires' })
  expiresAt: Date;

  @ApiProperty({ title: 'Info about user' })
  user: ClientDto;

  constructor(accessToken: string, expiresAt: Date, user: Client) {
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
    this.user = new ClientDto(user);
  }
}

export class SigninUserData {
  /** access jwt token */
  @ApiProperty({
    type: 'object',
  })
  accessToken: {
    token: string;
    expiresAt: Date;
  };

  /** refresh jwt token */
  @ApiProperty({
    type: 'object',
  })
  refreshToken: {
    token: string;
    expiresAt: Date;
  };

  @ApiProperty({
    type: 'object',
  })
  user: any;
}
