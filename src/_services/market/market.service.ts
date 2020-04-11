// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Models
import { Category, Subcategory, MarketItemModel, Order } from '../db/models';

// Providers
import { UserService } from '../users';

// Dto
import { Order as OrderDto } from '../../_modules/market/_dto';

// test data
const testData = {
  marketCategories: [
    {
      sku: '10001',
      name: 'Category_1',
      subcategories: ['10001001', '10001002', '10001003'],
    },
    {
      sku: '10002',
      name: 'Category_2',
      subcategories: ['10002001', '10002002', '10002003'],
    },
    {
      sku: '10003',
      name: 'Category_3',
      subcategories: ['10003001', '10003002', '10003003'],
    },
  ],

  marketSubcategories: [
    {
      sku: '10001001',
      parent: '10001',
      name: 'Subcategory_1_1',
      tags: ['one', 'two'],
      items: ['10001001001', '10001001002'],
    },
    {
      sku: '10001002',
      parent: '10001',
      name: 'Subcategory_1_2',
      tags: ['one', 'two'],
      items: ['10001002003', '10001002004'],
    },
    {
      sku: '10001003',
      parent: '10001',
      name: 'Subcategory_1_3',
      tags: ['one', 'two'],
      items: ['10002001001', '10002001004'],
    },
    {
      sku: '10002001',
      parent: '10002',
      name: 'Subcategory_2_1',
      tags: ['one', 'two'],
      items: ['10002002001', '10002002004'],
    },
    {
      sku: '10002002',
      parent: '10002',
      name: 'Subcategory_2_2',
      tags: ['one', 'two'],
      items: [],
    },
    {
      sku: '10002003',
      parent: '10002',
      name: 'Subcategory_2_3',
      tags: ['one', 'two'],
      items: [],
    },
    {
      sku: '10003001',
      parent: '10003',
      name: 'Subcategory_3_1',
      tags: ['one', 'two'],
      items: [],
    },
    {
      sku: '10003002',
      parent: '10003',
      name: 'Subcategory_3_2',
      tags: ['one', 'two'],
      items: [],
    },
    {
      sku: '10003003',
      parent: '10003',
      name: 'Subcategory_3_3',
      tags: ['one', 'two'],
      items: [],
    },
  ],

  marketItems: [
    {
      sku: '10001001001',
      categories: ['1001'],
      subcategories: ['1001001'],
      tags: ['one'],
      nameUkr: 'Паляниця',
      nameRu: 'Булочка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10001001002',
      categories: ['1001'],
      subcategories: ['1001001'],
      tags: ['two'],
      nameUkr: 'Кватирка',
      nameRu: 'Форточка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10001002003',
      categories: ['1001'],
      subcategories: ['1001002'],
      tags: ['one'],
      nameUkr: 'Паляниця',
      nameRu: 'Булочка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10001002004',
      categories: ['1001'],
      subcategories: ['1001002'],
      tags: ['two'],
      nameUkr: 'Кватирка',
      nameRu: 'Форточка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10002001001',
      categories: ['1002'],
      subcategories: ['1002001'],
      tags: ['one'],
      nameUkr: 'Паляниця',
      nameRu: 'Булочка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10002001004',
      categories: ['1002'],
      subcategories: ['1002001'],
      tags: ['two'],
      nameUkr: 'Кватирка',
      nameRu: 'Форточка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10002002001',
      categories: ['1002'],
      subcategories: ['1002002'],
      tags: ['one'],
      nameUkr: 'Паляниця',
      nameRu: 'Булочка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
    {
      sku: '10002002004',
      categories: ['1002'],
      subcategories: ['1002002'],
      tags: ['two'],
      nameUkr: 'Кватирка',
      nameRu: 'Форточка',
      descriptionUkr: 'DescrUkr',
      descriptionRu: 'DescrRu',
      manufacturer: 'Maenufacturer',
      measurementValue: 'шт.',
      stock: 100,
      price: 100,
      discount: 0,
    },
  ],
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
    console.log(name);
    try {
      const data = await MarketItemModel.scan({
        searchName: { contains: name.toLowerCase().trim() },
      }).exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
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

      await this.userService.createNewUserOrder(data.client, id);

      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Test shit
  async createTestModels() {
    const { marketCategories, marketSubcategories, marketItems } = testData;

    marketCategories.forEach(async item => {
      try {
        const category = new Category(item);

        await category.save();
      } catch (err) {
        console.log('Market ctegories err -> ', err);
      }
    });

    marketSubcategories.forEach(async item => {
      try {
        const subcategory = new Subcategory(item);

        await subcategory.save();
      } catch (err) {
        console.log('Market subcategories err -> ', err);
      }
    });

    marketItems.forEach(async item => {
      try {
        const marketItem = new MarketItemModel({
          ...item,
          searchName: (item.nameUkr + ' ' + item.nameRu).toLowerCase().trim(),
        });

        await marketItem.save();
      } catch (err) {
        console.log('Market items err -> ', err);
      }
    });
  }
}
