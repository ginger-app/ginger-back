// Core
import { Module } from '@nestjs/common';

// Controllers
import { ProfileController } from './profile.controller';

// Providers
import {
  UserService,
  MarketService,
  AuthService,
  RedisStorageService,
} from '../../_services';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [UserService, MarketService, AuthService, RedisStorageService],
})
export class ProfileModule {}
