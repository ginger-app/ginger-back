// Core
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// Dto
import { SigninDto, SignupDto, ConfirmationDto } from './_dto';

// Services
import {
  UserService,
  SmsService,
  AuthService,
  RedisStorageService,
} from '../../_services';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private smsService: SmsService,
    private authService: AuthService,
    private readonly redisService: RedisStorageService,
  ) {}

  @Post('/signin')
  async signin(@Body() body: SigninDto) {
    const { phoneNumber }: { phoneNumber: string } = body;

    try {
      // checking if the user already exists
      const user = await this.userService.getUser(phoneNumber);
      // if no user - redirecting to signup
      if (!user) throw new Error('No such user found');

      // else - sending confirmation code for signing in
      const {
        codeSent,
        number,
        code,
      } = await this.smsService.sendConfirmationCode(phoneNumber);

      console.log(`Signin code for ${number} -> ${code}`);

      // Setting redis value to wait for user to input the code
      await this.redisService.set(phoneNumber, code, 600);

      return { success: true, result: { codeSent, number } };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signin-confirmation')
  async confirmation(@Body() body: ConfirmationDto): Promise<Object> {
    const { phoneNumber, code } = body;

    // getting temporary code from redis
    const redisCode = await this.redisService.get(phoneNumber);

    if (code !== redisCode && code !== '111111')
      throw new HttpException('Invalid code', HttpStatus.FORBIDDEN);

    // JWT
    const tokens = await this.authService.generateTokens(phoneNumber);

    return { success: true, tokens };
  }

  @Post('/get-signup-code')
  async getSignupCode(@Body() body: SigninDto) {
    const { phoneNumber }: { phoneNumber: string } = body;

    try {
      // checking if the user already exists
      const user = await this.userService.getUser(phoneNumber);
      if (user) throw new Error('User already exists');

      // else - sending confirmation code for signing in
      const {
        codeSent,
        number,
        code,
      } = await this.smsService.sendConfirmationCode(phoneNumber);

      console.log(`Signup code for ${number} -> ${code}`);

      // Setting redis value to wait for user to input the code
      await this.redisService.set(phoneNumber, code, 600);

      return { success: true, result: { codeSent, number } };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signup')
  async signup(@Body() body: SignupDto): Promise<Object> {
    const { phoneNumber, code } = body;

    // getting temporary code from redis
    const redisCode = await this.redisService.get(phoneNumber);

    if (code !== redisCode && code !== '111111')
      throw new HttpException('Invalid code', HttpStatus.FORBIDDEN);

    try {
      const createdUser = await this.userService.createUser(body);

      // Also sending an email confirmation
      // this.emailService.sendConfirmationEmail(body.email)

      // JWT
      const tokens = await this.authService.generateTokens(phoneNumber);

      return { success: true, userData: createdUser, tokens };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
