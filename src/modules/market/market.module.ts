// Core
import { Module } from '@nestjs/common';

// Controllers
import { MarketController } from './market.controller';

// Providers
import {
  MarketService,
  UserService,
  AuthService,
  RedisStorageService,
} from '../../_services';

@Module({
  imports: [],
  controllers: [MarketController],
  providers: [MarketService, UserService, AuthService, RedisStorageService],
})
export class MarketModule {}
