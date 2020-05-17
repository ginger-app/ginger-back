// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Models
import { Category, Subcategory, MarketItemModel, Order } from '../db/models';

// Providers
import { UserService } from '../users';

// Dto
import {
  Order as OrderDto,
  MarketItem as MarketItemDto,
  MarketCategory as MarketCategoryDto,
  MarketSubcategory as MarketSubcategoryDto,
} from '../../_modules/market/_dto';

// Instruments
import * as randomWords from 'random-words';

// test data
const testData = () => {
  const marketCategories = Array(10)
    .fill(1)
    .map(item => ({
      sku: Math.floor(Math.random() * 99999).toString(),
      name: randomWords(),
      subcategories: [],
      items: [],
    }));

  const marketSubcategories = marketCategories
    .map(item => {
      const randomizeData = () => ({
        sku: `${item.sku}-${Math.floor(Math.random() * 99999)}`,
        name: `${item.name}-${randomWords()}`,
        parent: item.sku,
        items: [],
        tags: randomWords(5),
      });

      const subcatData = [
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
        randomizeData(),
      ];

      // pushing subcategory to the specific category
      marketCategories
        .filter(marketCategory => marketCategory.sku === item.sku)[0]
        .subcategories.push(...subcatData.map(subcatItem => subcatItem.sku));

      return subcatData;
    })
    .flat();

  const marketItems = marketSubcategories
    .map(item => {
      const nameUkr = randomWords();
      const nameRu = randomWords();

      const randomizeItemData = () => ({
        nameUkr,
        nameRu,
        sku: `${item.sku}-${Math.floor(Math.random() * 9999)}`,
        name: randomWords(),
        categories: [item.parent],
        subcategories: [item.sku],
        searchName: (nameUkr + ' ' + nameRu).toLowerCase().trim(),
        descriptionUkr:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        descriptionRu:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        manufacturer: 'Lorem',
        unit: ['шт.', 'кг', 'л', 'уп'][Math.floor(Math.random() * 4)],
        stock: Math.round(Math.random() * 100),
        price: Number((Math.random() * 500).toFixed(2)),
        discount: Number(Math.floor(Math.random() * 10)),
        tags: [
          item.tags[Math.floor(Math.random() * 5)],
          item.tags[Math.floor(Math.random() * 5)],
        ],
      });

      return [
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
        randomizeItemData(),
      ];
    })
    .flat();

  return { marketCategories, marketSubcategories, marketItems };
};

@Injectable()
export class MarketService {
  constructor(private userService: UserService) {}

  // Categories
  async getAllGategories() {
    try {
      const data = await Category.scan().exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getCategoryBySku(sku: string) {
    try {
      const data = await Category.queryOne({ sku }).exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addNewItemToCategory(sku: string, newItem: object) {
    try {
      const category: any = await Category.queryOne({ sku }).exec();
      if (!category) return null;

      const updatedCategory = new Category({
        ...category,
        items: [...category.items, newItem],
      });

      await updatedCategory.save();
    } catch (err) {
      throw new HttpException(
        `addNewItemToCategory err -> ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Subcategories
  async getSubcategoryBySku(sku: string) {
    try {
      const subcategory: any = await Subcategory.queryOne({ sku }).exec();

      // Populating items
      subcategory.items = await Promise.all(
        subcategory.items.map(async item => {
          const itemData = await MarketItemModel.get(item);
          return itemData;
        }),
      );

      return subcategory;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addNewItemToSubCategory(sku: string, newItem: object) {
    try {
      const subcategory: any = await Subcategory.queryOne({ sku }).exec();
      if (!subcategory) return null;

      const updatedSubcategory = new Subcategory({
        ...subcategory,
        items: [...subcategory.items, newItem],
      });

      await updatedSubcategory.save();
    } catch (err) {
      throw new HttpException(
        `addNewItemToSubCategory err -> ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Items
  async getMarketItemBySku(sku: string) {
    try {
      const data = await MarketItemModel.queryOne({ sku }).exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getMarketItemByName(name: string) {
    try {
      const data = await MarketItemModel.scan({
        searchName: { contains: name.toLowerCase().trim() },
      }).exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewMarketItem(data: MarketItemDto) {
    const { nameRu, nameUkr, categories, subcategories } = data;
    try {
      const marketItem = new MarketItemModel({
        ...data,
        searchName: (nameUkr + ' ' + nameRu).toLowerCase().trim(),
      });

      // creating new item at MarketItems table
      await marketItem.save();

      categories.forEach(async item => {
        await this.addNewItemToCategory(item, data);
      });

      subcategories.forEach(async item => {
        await this.addNewItemToSubCategory(item, data);
      });
    } catch (err) {
      console.log('Market items err -> ', err);
    }
  }

  // Orders
  async getAllOrders() {
    try {
      const data = await Order.scan().exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderById(id: string) {
    try {
      const data = await Order.queryOne({ id }).exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateOrderById(id: string, data: object) {
    try {
      const order: any = await Order.queryOne({ id }).exec();

      if (!order) throw new Error('Order does not exist');

      const updatedOrder = new Order({
        ...order,
        ...data,
        id,
        client: order.client,
        date: order.date,
        userCart: order.userCart,
      });

      const result = await updatedOrder.save();

      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewOrder(data: OrderDto) {
    const id = Date.now().toString();

    try {
      const order = new Order({ ...data, id });
      const result = await order.save();

      await this.userService.createNewUserOrder(data.client, { ...data, id });

      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Test shit
  async createTestModels() {
    const { marketCategories, marketSubcategories, marketItems } = testData();

    // console.log({ marketCategories, marketSubcategories, marketItems });

    await Promise.all(
      marketCategories.map(async item => {
        try {
          const category = new Category(item);

          await category.save();
        } catch (err) {
          console.log('Market ctegories err -> ', err);
        }
      }),
    );

    await Promise.all(
      marketSubcategories.map(async item => {
        try {
          const subcategory = new Subcategory(item);

          await subcategory.save();
        } catch (err) {
          console.log('Market subcategories err -> ', err);
        }
      }),
    );

    await Promise.all(
      marketItems.map(async item => {
        await this.createNewMarketItem(item);
      }),
    );
  }
}
