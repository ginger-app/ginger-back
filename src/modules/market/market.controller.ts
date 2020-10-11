// Core
import { Controller, Get, Post, Logger } from '@nestjs/common';

// Services
import { MarketService } from './market.service';

// Instruments
import { GetAllCategoriesResponse } from '../../interfaces';
import { MarketCategoryDto } from './_dto';
import { CategoryDocument } from '../db/models';

@Controller('market')
export class MarketController {
  private readonly logger = new Logger(MarketController.name);
  constructor(private readonly marketService: MarketService) {}

  @Get('/categories')
  async getMarketCategories(): Promise<GetAllCategoriesResponse> {
    return { data: await this.marketService.getAllCategories() };
  }

  @Get('/categories/:id')
  async getMarketCategory(): Promise<MarketCategoryDto | null> {
    return null;
  }

  // Secured
  @Post('/categories')
  async createNewCategory(): Promise<CategoryDocument> {
    return await this.marketService.createNewCategory();
  }
}
