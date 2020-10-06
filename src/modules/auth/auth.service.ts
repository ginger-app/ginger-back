import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenInfo, JwtTokenType } from '../../interfaces';

// Dto
import { SigninResponseDto } from './_dto';

// Services
import { RedisStorageService } from '../redis';
import { UserService } from '../user';
import { JwtService } from '../jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisStorageService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Logs user in and saves tokens into redis
   */
  async signin(phoneNumber: string): Promise<SigninResponseDto> {
    const user = await this.userService.getUser(phoneNumber);

    if (!user) {
      throw new NotFoundException('No such user');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.issue(phoneNumber, JwtTokenType.ACCESS),
      this.jwtService.issue(phoneNumber, JwtTokenType.REFRESH),
    ]);

    await Promise.all([
      this.redisService.set(
        `access-${user.id}`,
        accessToken.token,
        this.configService.get(`jwt.${JwtTokenType.ACCESS}.expiresIn`),
      ),
      this.redisService.set(
        `refresh-${user.id}`,
        refreshToken.token,
        this.configService.get(`jwt.${JwtTokenType.REFRESH}.expiresIn`),
      ),
    ]);

    return { user, accessToken, refreshToken };
  }
}
