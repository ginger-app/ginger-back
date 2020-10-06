// Core
import { ApiProperty } from '@nestjs/swagger';

/** login response */
export class SigninResponseDto {
  /** access jwt token */
  @ApiProperty({
    type: 'object',
  })
  // tslint:disable-next-line: variable-name
  accessToken: object;

  /** refresh jwt token */
  @ApiProperty({
    type: 'object',
  })
  // tslint:disable-next-line: variable-name
  refreshToken: object;

  @ApiProperty({
    type: 'object',
  })
  user: any;
}
