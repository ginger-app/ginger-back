// Core
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

// Instruments
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from './config';

@Injectable()
export class AuthService {
  async generateTokens(phoneNumber: string) {
    const accessToken = jwt.sign({ phoneNumber }, jwtConfig.secret, {
      expiresIn: '12h',
    });

    const refreshToken = jwt.sign(
      { phoneNumber, isRefresh: true },
      jwtConfig.secret,
      { expiresIn: '12h' },
    );

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const { phoneNumber, isRefresh } = jwt.verify(
        refreshToken,
        jwtConfig.secret,
      );

      if (!isRefresh) {
        throw new BadRequestException('Incorrect token');
      }

      return this.generateTokens(phoneNumber);
    } catch (err) {
      throw new BadRequestException('Incorrect token');
    }
  }

  async TEMPORARY_checkAuth(token: string) {
    try {
      const { phoneNumber, isRefresh } = await jwt.verify(
        token,
        jwtConfig.secret,
      );

      if (isRefresh) throw new BadRequestException('Incorrect token');

      return phoneNumber;
    } catch (err) {
      throw new UnauthorizedException(err.message || 'Unauthorized');
    }
  }
}
