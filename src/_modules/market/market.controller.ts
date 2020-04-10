// Core
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Param,
  Put,
  Body,
} from '@nestjs/common';

// Dto
import { UpdateOrder } from './_dto';

// Services
import { MarketService } from '../../_services';

// Instruments
import { validate } from 'class-validator';

@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {}

  // Default GET API calls from app
  //
  @Get('/categories')
  async getMarketCategories() {
    const data = await this.marketService.getAllGategories();

    return { success: true, data };
  }

  @Get('/categories/:sku')
  async getMarketCategoryBySku(@Param() param: { sku: string }) {
    const data = await this.marketService.getCategoryBySku(param.sku);

    if (!data)
      throw new HttpException('Category does not exist', HttpStatus.NOT_FOUND);

    return { success: true, data };
  }

  @Get('/subcategories/:sku')
  async getMarketSubcategoryBySku(@Param() param: { sku: string }) {
    const data = await this.marketService.getSubcategoryBySku(param.sku);

    if (!data)
      throw new HttpException(
        'Subcategory does not exist',
        HttpStatus.NOT_FOUND,
      );

    return { success: true, data };
  }

  @Get('/item/:sku')
  async getMarketItemBySku(@Param() param: { sku: string }) {
    const data = await this.marketService.getMarketItemBySku(param.sku);

    if (!data)
      throw new HttpException('Item does not exist', HttpStatus.NOT_FOUND);

    return { success: true, data };
  }

  // Searching options
  //
  @Get('/item')
  async getMarketItemByName(@Query('name') name) {
    const data = await this.marketService.getMarketItemByName(name);

    // Return empty obj
    if (!data) return { success: true, data: {} };

    return { success: true, data };
  }

  // Orders section
  //
  @Get('/orders')
  async getAllOrders() {
    const data = await this.marketService.getAllOrders();

    return { success: true, data };
  }

  @Get('/orders/:id')
  async getOrderById(@Param('id') id: string) {
    const data = await this.marketService.getOrderById(id);

    if (!data)
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);

    return { success: true, data };
  }

  @Put('/orders/:id')
  async updateOrderById(@Param('id') id: string, @Body() body: UpdateOrder) {
    const data = await this.marketService.updateOrderById(id, body);

    return { success: true, data };
  }

  // Test shit
  @Get('/test')
  async testShit() {
    this.marketService.createTestModels();
  }
}
