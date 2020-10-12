// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { MarketController } from './market.controller';

// Services
import { MarketService } from './market.service';
import { CryptoService } from '../crypto';

// Instruments
import {
  CategorySchema,
  SubcategorySchema,
  MarketItemSchema,
} from '../db/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Subcategory', schema: SubcategorySchema },
      { name: 'MarketItems', schema: MarketItemSchema },
    ]),
  ],
  controllers: [MarketController],
  providers: [MarketService, CryptoService],
})
export class MarketModule {}
