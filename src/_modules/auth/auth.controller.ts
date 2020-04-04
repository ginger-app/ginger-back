// Core
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

// Dto
import { SigninDto, SignupDto } from './_dto';

// Services
import { UserService, SmsService, RedisStorageService } from '../../_services';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private smsService: SmsService,
    private readonly redisService: RedisStorageService,
  ) {}

  @Post('/signin')
  async signin(@Body() body: SigninDto, @Res() res: Response) {
    const { phoneNumber }: { phoneNumber: string } = body;

    try {
      const user = await this.userService.getUser(phoneNumber);
      // if no user - redirecting to signup
      if (!user)
        return res
          .status(302)
          .redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

      const {
        codeSent,
        number,
        code,
      } = await this.smsService.sendConfirmationCode(phoneNumber);

      // Setting redis to wait for user to input the code
      await this.redisService.set(phoneNumber, code, 600);

      return res.send({ success: true, result: { codeSent, number } });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signup')
  async signup(@Body() body: SignupDto): Promise<Object> {
    try {
      await this.userService.createUser(body);

      // We don't want to wait for this or handle errors (UDP style)
      this.smsService.sendWelcomeSms(body.phoneNumber);

      return { success: true };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
