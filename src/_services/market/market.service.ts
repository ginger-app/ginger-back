// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Models
import { Category, Subcategory, MarketItemModel, Order } from '../db/models';
import { throwError } from 'rxjs';

@Injectable()
export class MarketService {
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
      const data = await Category.queryOne({ id: sku }).exec();
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Subcategories
  async getSubcategoryBySku(sku: string) {
    try {
      const subcategory: any = await Subcategory.queryOne({ id: sku }).exec();

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
    try {
      const data = await MarketItemModel.scan({
        name: { contains: name },
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

  // Test shit
  async createTestModels() {
    for (let i = 1; i < 11; i++) {
      const category = new Order({
        id: Date.now().toString(),
        date: Date.now(),
        sum: 1000,
        status: [
          'Awaiting payment',
          'Awaiting collection',
          'Awaiting shipment',
          'Shipping',
          'Completed',
        ][Math.floor(Math.random() * 5)],
        userCart: [
          {
            item: Number(`100010001`),
            amount: 100,
          },
          {
            item: Number(`100010002`),
            amount: 100,
          },
          {
            item: Number(`100010003`),
            amount: 100,
          },
          {
            item: Number(`100010004`),
            amount: 100,
          },
        ],

        actualCart: [
          {
            item: Number(`100010001`),
            amount: 101,
          },
          {
            item: Number(`100010002`),
            amount: 99,
          },
          {
            item: Number(`100010003`),
            amount: 101,
          },
          {
            item: Number(`100010004`),
            amount: 99,
          },
        ],
        address: 'Some Address str, 60',
        client: '+380639990001',
      });

      // const category = new MarketItemModel({
      //   sku: Number(`10001000${i}`),

      //   categories: [],

      //   subcategories: [],

      //   nameUkr: `TestName_Item_Ukr_${i}`,

      //   nameRu: `TestName_Item_Ru_${i}`,

      //   searchName: `TestName_Item_Ru_${
      //     i % 2 !== 0 ? 'паляниця' : ''
      //   } TestName_Item_Ukr_${i % 2 !== 0 ? 'жопа' : ''}`,

      //   descriptionUkr: `TestName_Item_${i}_descr`,

      //   descriptionRu: `TestName_Item_${i}_descr`,

      //   manufacturer: `TestName_Item_${i}_manuf`,

      //   measurementValue: 'kg',

      //   stock: 100,

      //   price: 100,

      //   discount: 0,
      // });

      // const category = new Subcategory({
      //   id: `10001000${i}`,
      //   name: `TestName_Sub_${i}`,
      //   parent: `10001000${i}`,
      //   items: [`10001000${i}`, `10001000${i + 1}`, `10001000${i + 2}`],
      // });

      await category.save();
    }
  }
}
