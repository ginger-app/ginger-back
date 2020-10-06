import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { JwtTokenInfo } from './jwt.token.info';
import { JwtTokenType } from './jwt.token.type';

export interface JwtConfig {
  signOptions: SignOptions;
  verifyOptions: VerifyOptions;
  [JwtTokenType.ACCESS]: JwtTokenInfo;
  [JwtTokenType.REFRESH]: JwtTokenInfo;
}
