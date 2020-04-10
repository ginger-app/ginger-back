// Core
import { Module } from '@nestjs/common';

// Controllers
import { MarketController } from './market.controller';

// Providers
import { MarketService } from '../../_services';

@Module({
  imports: [],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
