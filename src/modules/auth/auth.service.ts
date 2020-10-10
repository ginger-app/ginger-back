import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenType, JwtPayload } from '../../interfaces';

// Dto & Interfaces
import { ClientSignup } from '../../interfaces';

// Services
// import { CryptoService } from '../crypto';
import { RedisStorageService } from '../redis';
import { UserService } from '../users';
import { JwtService } from '../jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly redisService: RedisStorageService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // private readonly cryptoService: CryptoService,
  ) {}

  private isValidPayload(payload: any): payload is JwtPayload {
    return (
      payload &&
      typeof payload._id === 'string' &&
      typeof payload.phoneNumber === 'string'
    );
  }

  async validateUser(phoneNumber: string, code: string) {
    const user = await this.userService.getUserByPhoneNumber(phoneNumber);
    const redisCode = await this.redisService.get(`auth-code-${phoneNumber}`);

    if (code !== redisCode) throw new UnauthorizedException('Wrong code');

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async validateToken(token: string, type: JwtTokenType) {
    const payload = await this.jwtService.validate(token, type);

    if (!this.isValidPayload(payload))
      throw new UnauthorizedException('Invalid token payload');

    const user = await this.userService.getUserByPhoneNumber(
      payload.phoneNumber,
    );

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async setConfirmationCode(phoneNumber: string, type: 'signup' | 'signin') {
    // const code = this.cryptoService.randomStringOfNumbers(6);
    const code = '111111';

    if (type === 'signin') {
      const user = await this.userService.getUserByPhoneNumber(phoneNumber);

      if (!user) throw new NotFoundException('User not found');
    }

    await this.redisService.set(`auth-code-${phoneNumber}`, code, 600);

    return phoneNumber;
  }

  /**
   * Logs user in and saves tokens into redis
   */
  async signin({ phoneNumber, code }: any): Promise<any> {
    const user = await this.validateUser(phoneNumber, code);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.issue(
        { phoneNumber, _id: user._id },
        JwtTokenType.ACCESS,
      ),
      this.jwtService.issue(
        { phoneNumber, _id: user._id },
        JwtTokenType.REFRESH,
      ),
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
  async signup(userData: ClientSignup): Promise<any> {
    const { phoneNumber, email } = userData;
    const userAlreadyExists =
      (await this.userService.getUserByPhoneNumber(phoneNumber)) ||
      (await this.userService.getUserByEmail(email));

    if (userAlreadyExists) throw new BadRequestException('User already exists');

    delete userData.code;

    // Creating new user
    const user = await this.userService.createClient(userData);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.issue(
        { phoneNumber, _id: user._id },
        JwtTokenType.ACCESS,
      ),
      this.jwtService.issue(
        { phoneNumber, _id: user._id },
        JwtTokenType.REFRESH,
      ),
    ]);

    await Promise.all([
      this.redisService.set(
        `access-${user._id}`,
        accessToken.token,
        this.configService.get(`jwt.${JwtTokenType.ACCESS}.expiresIn`),
      ),
      this.redisService.set(
        `refresh-${user._id}`,
        refreshToken.token,
        this.configService.get(`jwt.${JwtTokenType.REFRESH}.expiresIn`),
      ),
    ]);

    return { user, accessToken, refreshToken };
  }
}
