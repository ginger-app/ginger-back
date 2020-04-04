// Core
import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// Dto
import { SigninDto, SignupDto } from './_dto';

// Services
import { UserService, SmsService } from '../../_services';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private smsService: SmsService,
  ) {}

  @Post('/signin')
  async signin(@Body() body: SigninDto): Promise<Object> {
    const { phoneNumber }: { phoneNumber: string } = body;

    try {
      const result = await this.smsService.sendConfirmationCode(phoneNumber);
      return { success: true, result };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signup')
  async signup(@Body() body: SignupDto): Promise<Object> {
    try {
      await this.userService.createUser(body);
      return { success: true };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
