// Core
import { Module } from '@nestjs/common';

// Controllers
import { ProfileController } from './profile.controller';

// Providers
import { UserService, MarketService, AuthService } from '../../_services';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [UserService, MarketService, AuthService],
})
export class ProfileModule {}
