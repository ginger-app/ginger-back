import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { JwtTokenType } from '../../../interfaces/jwt/jwt.token.type';
import { AuthService } from '../auth.service';
import { REFRESH_TOKEN_COOKIE_NAME } from '../../../constants';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({ cookieName: REFRESH_TOKEN_COOKIE_NAME, signed: true });
  }

  validate(token: string) {
    return this.authService.validateToken(token, JwtTokenType.REFRESH);
  }
}
