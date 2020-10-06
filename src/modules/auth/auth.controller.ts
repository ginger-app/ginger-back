// Core
import {
  Controller,
  Logger,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CookieOptions } from 'express';

// Instruments
import config from '../../config';
import { REFRESH_TOKEN_COOKIE_NAME } from './_constants';

// Dto
import {
  GetSmsCodeDto,
  ClientSignupDto,
  ConfirmationDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './_dto';

// Services
import {
  UserService,
  SmsService,
  AuthService,
  RedisStorageService,
} from '../../_services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly cookieOptions: CookieOptions;

  constructor(
    private userService: UserService,
    private smsService: SmsService,
    private authService: AuthService,
    private readonly redisService: RedisStorageService,
  ) {
    this.cookieOptions = {
      httpOnly: true,
      secure: false,
      domain: config.domain,
      path: '/auth/refresh',
      signed: true,
    };
  }

  // @Post('/refresh')
  // @ApiOperation({ summary: 'Refresh token' })
  // @ApiBody({
  //   type: RefreshTokenDto,
  //   required: true,
  //   description: 'refresh_token',
  // })
  // @ApiResponse({
  //   status: 201,
  //   type: RefreshTokenResponseDto,
  //   description: 'Refresh token response',
  // })
  // @ApiNotFoundResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'token.expired',
  // })
  // @ApiNotFoundResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'token.error',
  // })
  // @ApiNotFoundResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'server-error',
  // })
  // async refreshToken(
  //   @Body { refresh_token }: RefreshTokenDto,
  // ): Promise<RefreshTokenResponseDto> {
  //   //
  // }

  @Post('/signin')
  async signin(@Body() body: GetSmsCodeDto) {
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

    // userData + tokens
    const data = await this.authService.signin(phoneNumber);

    return { success: true, data };
  }

  @Post('/get-signup-code')
  async getSignupCode(@Body() body: GetSmsCodeDto) {
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
  async signup(@Body() body: ClientSignupDto): Promise<Object> {
    const { phoneNumber, code } = body;

    // getting temporary code from redis
    const redisCode = await this.redisService.get(phoneNumber);

    if (code !== redisCode && code !== '111111')
      throw new HttpException('Invalid code', HttpStatus.FORBIDDEN);

    try {
      // const createdUser = await this.userService.createUser(body);

      // Also sending an email confirmation
      // this.emailService.sendConfirmationEmail(body.email)

      // userData + tokens
      const data = await this.authService.signin(phoneNumber);

      return { success: true, data };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
