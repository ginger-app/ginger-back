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
import { SigninDto, SignupDto, ConfirmationDto } from './_dto';

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
      // checking if the user already exists
      const user = await this.userService.getUser(phoneNumber);
      // if no user - redirecting to signup
      if (!user)
        return res
          .status(302)
          .redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

      // else - sending confirmation code for signing in
      const {
        codeSent,
        number,
        code,
      } = await this.smsService.sendConfirmationCode(phoneNumber);

      // Setting redis value to wait for user to input the code
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

      // Also sending an email confirmation
      // this.emailService.sendConfirmationEmail(body.email)

      return { success: true };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/confirmation')
  async confirmation(@Body() body: ConfirmationDto): Promise<Object> {
    const { phoneNumber, code } = body;

    // getting temporary code from redis
    const redisCode = await this.redisService.get(phoneNumber);

    if (code !== redisCode)
      throw new HttpException('Invalid code', HttpStatus.FORBIDDEN);

    //TODO if code check was passed - getting data from db (replace this with tokens later)
    const userData = await this.userService.getUser(phoneNumber);

    return { success: true, userData };
  }
}
