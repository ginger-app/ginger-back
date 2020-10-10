// Core
import {
  Controller,
  Logger,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

// Services
import { UserService } from './users.service';

// Instruments
import { JwtTokenType } from '../../interfaces';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/current')
  async getCurrentUser(@Req() req: Request) {
    const token = req.header('authorization');
    this.logger.log(token);

    const user = await this.userService.getCurrentUserProfile(token);

    return user;
  }
}
