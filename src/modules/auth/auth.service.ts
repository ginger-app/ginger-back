import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenType } from '../../interfaces';

// Dto & Interfaces
// import { SigninUserData, ConfirmationDto } from './_dto';
import { ClientSignup } from '../../interfaces';

// Services
// import { CryptoService } from '../crypto';
import { RedisStorageService } from '../redis';
import { UserService } from '../user';
import { JwtService } from '../jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisStorageService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // private readonly cryptoService: CryptoService,
  ) {}

  async setConfirmationCode(phoneNumber: string, type: 'signup' | 'signin') {
    try {
      // const code = this.cryptoService.randomStringOfNumbers(6);
      const code = '111111';

      await this.redisService.set(
        type === 'signup'
          ? `signup-code-${phoneNumber}`
          : `signin-code-${phoneNumber}`,
        code,
        600,
      );

      return phoneNumber;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Logs user in and saves tokens into redis
   */
  async signin({ phoneNumber, code }: any): Promise<any> {
    const user = await this.userService.getUser(phoneNumber);
    const redisCode = await this.redisService.get(`signin-code-${phoneNumber}`);

    if (code !== redisCode) throw new UnauthorizedException('Wrong code');

    if (!user) {
      throw new NotFoundException('No such user');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.issue({ phoneNumber }, JwtTokenType.ACCESS),
      this.jwtService.issue({ phoneNumber }, JwtTokenType.REFRESH),
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

  /**
   * Creates new client account and logs in
   */
  async signup(userData: ClientSignup) {
    const { phoneNumber } = userData;

    const redisCode = await this.redisService.get(`signup-code-${phoneNumber}`);

    if (userData.code !== redisCode)
      throw new UnauthorizedException('Wrong code');

    // Creating new user
    //...
    //...
    //...

    const user = {
      id: Math.random()
        .toFixed(0)
        .slice(2),
    };

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

    return {
      userData: { ...userData, id: user.id },
      accessToken,
      refreshToken,
    };
  }
}
