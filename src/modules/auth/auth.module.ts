// Core
import { Module } from '@nestjs/common';

// Controllers
import { AuthController } from './auth.controller';

// Providers and Services
import { UserService } from '../user';
import { SmsService } from '../sms';
import { AuthService } from '../auth';
import { RedisStorageService } from '../redis';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService, SmsService, AuthService, RedisStorageService],
})
export class AuthModule {}
