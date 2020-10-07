import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { JwtTokenType } from '../../../interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(token: string) {
    // return this.authService.validateToken(token, JwtTokenType.ACCESS);
    return token;
  }
}
