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
  Post,
  Headers,
} from '@nestjs/common';

// Dto
import { UpdateOrder, Order } from './_dto';

// Services
import { MarketService, AuthService, UserService } from '../../_services';

@Controller('market')
export class MarketController {
  constructor(
    private marketService: MarketService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // Default GET API calls from app
  //
  @Get('/categories')
  async getMarketCategories() {
    const data = await this.marketService.getAllGategories();

    // console.log(`[CATEGORIES GET] ${data}`);

    return { success: true, data };
  }

  @Get('/categories/:sku')
  async getMarketCategoryBySku(@Param() param: { sku: string }) {
    return { success: true };
  }

  @Get('/subcategories/:sku')
  async getMarketSubcategoryBySku(@Param() param: { sku: string }) {
    return { success: true };
  }

  @Get('/product/:sku')
  async getMarketItemBySku(@Param() param: { sku: string }) {
    return { success: true };
  }

  // Searching options
  //
  @Get('/product')
  async getMarketItemByName(@Query('name') name) {
    return { success: true };
  }

  // Orders section
  //
  @Get('/orders')
  async getAllOrders() {
    return { success: true };
  }

  @Get('/orders/:id')
  async getOrderById(
    @Param('id') id: string,
    @Headers() headers: { authorization: string },
  ) {
    return { success: true };
  }

  @Put('/orders/:id')
  async updateOrderById(@Param('id') id: string, @Body() body: UpdateOrder) {
    return { success: true };
  }

  @Post('/orders')
  async createNewOrder(
    @Headers() headers: { authorization: string },
    @Body() body: Order,
  ) {
    try {
      return { success: true };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
