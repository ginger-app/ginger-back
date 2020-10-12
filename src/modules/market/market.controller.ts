// Core
import { Controller, Get, Post, Logger, Body, Param } from '@nestjs/common';

// Services
import { MarketService } from './market.service';

// Instruments
import { GetAllCategoriesResponse } from '../../interfaces';
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
  async getMarketCategory(@Param() { id }): Promise<CategoryDocument> {
    return await this.marketService.getCategoryData(id);
  }

  // Secured
  @Post('/categories')
  async createNewCategory(@Body() body): Promise<CategoryDocument> {
    return await this.marketService.createNewCategory(body.name);
  }

  @Post('/test-items')
  async createTestSetOfItems(): Promise<Boolean> {
    await this.marketService.createTestSetOfItems();

    return true;
  }
}
