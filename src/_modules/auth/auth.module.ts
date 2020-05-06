// Core
import { Module } from '@nestjs/common';

// Controllers
import { AuthController } from './auth.controller';

// Providers
import {
  UserService,
  SmsService,
  RedisStorageService,
  AuthService,
} from '../../_services';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService, SmsService, AuthService, RedisStorageService],
})
export class AuthModule {}
