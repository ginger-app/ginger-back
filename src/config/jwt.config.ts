import { registerAs } from '@nestjs/config';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { JwtConfig } from '../interfaces/jwt/jwt.config';
import { JwtTokenType } from '../interfaces/jwt/jwt.token.type';

export default registerAs(
  'jwt',
  (): JwtConfig => {
    const issuer = process.env.JWT_ISSUER || 'Opto API';

    const signOptions: SignOptions = {
      algorithm: 'HS512',
      issuer,
    };

    const verifyOptions: VerifyOptions = {
      algorithms: ['HS512'],
      issuer,
    };

    return {
      [JwtTokenType.ACCESS]: {
        secret:
          process.env.JWT_ACCESS_TOKEN_SECRET ||
          'some-very!strong&hard#to)guess(access.secret^&',
        expiresIn:
          parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN, 10) || 60 * 60,
      },
      [JwtTokenType.REFRESH]: {
        secret:
          process.env.JWT_REFRESH_TOKEN_SECRET ||
          'some-very!strong&hard#to)guess(refresh.secret^&',
        expiresIn:
          parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10) ||
          60 * 60 * 24,
      },
      signOptions,
      verifyOptions,
    };
  },
);
