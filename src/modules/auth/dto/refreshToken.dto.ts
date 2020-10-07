import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/** login payload */
export class RefreshTokenDto {
  /** token */
  @ApiProperty({
    description: 'refreshToken',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
