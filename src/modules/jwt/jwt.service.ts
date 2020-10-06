import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenType, JwtTokenInfo } from '../../interfaces';

import {
  sign,
  SignOptions,
  verify,
  VerifyOptions,
  JsonWebTokenError,
  decode,
} from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  async issue(payload: any, type: JwtTokenType) {
    const { secret, expiresIn } = this.configService.get<JwtTokenInfo>(
      `jwt.${type}`,
    );

    const token: string = await new Promise((resolve, reject) => {
      sign(
        payload,
        secret,
        {
          ...this.configService.get<SignOptions>(`jwt.signOptions`),
          expiresIn,
        },
        (error, token) => (error ? reject(error) : resolve(token)),
      );
    });

    const expiresAt = new Date(decode(token).exp * 1000);

    return { token, expiresAt };
  }

  async validate(token: string, type: JwtTokenType): Promise<any> {
    const { secret } = this.configService.get<JwtTokenInfo>(`jwt.${type}`);

    return new Promise((resolve, reject) =>
      verify(
        token,
        secret,
        this.configService.get<VerifyOptions>(`jwt.signOptions`),
        (error, payload) => {
          if (error) {
            return reject(
              error instanceof JsonWebTokenError
                ? new UnauthorizedException(error.message)
                : error,
            );
          }

          return resolve(payload);
        },
      ),
    );
  }
}
