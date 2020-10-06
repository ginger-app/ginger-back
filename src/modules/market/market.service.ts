// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Models
// import { Category, Subcategory, MarketItemModel, Order } from '../db/models';

// Providers
import { UserService } from '../user';

// Dto
import {
  Order as OrderDto,
  MarketItem as MarketItemDto,
  MarketCategory as MarketCategoryDto,
  MarketSubcategory as MarketSubcategoryDto,
} from '../../modules/market/_dto';

// Instruments
import * as randomWords from 'random-words';

@Injectable()
export class MarketService {
  constructor(private userService: UserService) {}

  // Categories
  async getAllGategories() {}

  async getCategoryBySku(sku: string) {}

  async addNewItemToCategory(sku: string, newItem: object) {}

  // Subcategories
  async getSubcategoryBySku(sku: string) {}

  async addNewItemToSubCategory(sku: string, newItem: object) {}

  // Items
  async getMarketItemBySku(sku: string) {}

  async getMarketItemByName(name: string) {}

  async createNewMarketItem(data: MarketItemDto) {}

  // Orders
  async getAllOrders() {}

  async getOrderById(id: string) {}

  async updateOrderById(id: string, data: object) {}

  async createNewOrder(data: OrderDto) {}

  // Test shit
  async createTestModels() {}
}
