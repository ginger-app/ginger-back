// Core
import { Module } from '@nestjs/common';

// Controllers
import { AuthController } from './auth.controller';

// Providers
import { UserService, SmsService, RedisStorageService } from '../../_services';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService, SmsService, RedisStorageService],
})
export class AuthModule {}
