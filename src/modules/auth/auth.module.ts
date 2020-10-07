// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../../config/app.config';

// Modules
import { JwtModule } from '../jwt';
import { UserModule } from '../user';

// Controllers
import { AuthController } from './auth.controller';

// Providers and Services
import { AuthService } from '../auth';
import { RedisStorageService } from '../redis';

@Module({
  imports: [ConfigModule.forFeature(appConfig), JwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, RedisStorageService],
  exports: [AuthService],
})
export class AuthModule {}
