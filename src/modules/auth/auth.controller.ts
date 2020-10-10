// Core
import {
  Controller,
  Logger,
  Post,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';

// Dto
import { GetSmsCodeDto, ConfirmationDto, SigninResponseDto } from './dto';

// Services
import { AuthService } from '../auth';

// Instruments
import { REFRESH_TOKEN_COOKIE_NAME } from '../../constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly cookieOptions: CookieOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    this.cookieOptions = {
      httpOnly: true,
      secure: this.configService.get<string>('app.env') === 'production',
      domain: this.configService.get<string>('app.domain'),
      path: '/auth/refresh',
      signed: true,
    };
  }

  @Post('/get-signin-code')
  async confirmation(@Body() { phoneNumber }: GetSmsCodeDto): Promise<Object> {
    await this.authService.setConfirmationCode(phoneNumber, 'signin');

    return { phoneNumber };
  }

  @Post('/get-signup-code')
  async getSignupCode(@Body() body: GetSmsCodeDto) {
    const { phoneNumber } = body;

    await this.authService.setConfirmationCode(phoneNumber, 'signup');

    return { phoneNumber };
  }

  @Post('/signin')
  async signin(@Body() body: ConfirmationDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.signin(
      body,
    );

    res
      .cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken.token, {
        ...this.cookieOptions,
        expires: refreshToken.expiresAt,
      })
      .status(HttpStatus.OK)
      .json(
        new SigninResponseDto(accessToken.token, accessToken.expiresAt, user),
      );
  }

  @Post('/signup')
  async signup(@Body() body: any, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.signup(
      body,
    );

    res
      .cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken.token, {
        ...this.cookieOptions,
        expires: refreshToken.expiresAt,
      })
      .status(HttpStatus.CREATED)
      .json(
        new SigninResponseDto(accessToken.token, accessToken.expiresAt, user),
      );
  }
}
