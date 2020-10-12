// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Services
import { CryptoService } from '../crypto';

// Instruments
import { MarketItem } from 'src/interfaces';
import { CategoryDocument, MarketItemDocument } from '../db/models';

const Translitter = require('cyrillic-to-translit-js');
@Injectable()
export class MarketService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('MarketItems')
    private readonly marketItemModel: Model<MarketItemDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  // Categories
  async createNewCategory(name = 'unnamed'): Promise<CategoryDocument> {
    const _id = Translitter({ preset: 'uk' }).transform(
      name.toLowerCase(),
      '-',
    );

    const category = new this.categoryModel({
      name,
      _id: `${_id}-${this.cryptoService.randomString(6)}`,
    });

    const newCategory = await category.save();

    return newCategory;
  }

  async getAllCategories(): Promise<Omit<CategoryDocument, 'items'>[]> {
    const categories = await this.categoryModel
      .find()
      .select('-items')
      .exec();

    return categories;
  }

  async getCategoryData(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel
      .findById(id)
      .populate('items', null, this.marketItemModel)
      .exec();

    if (!category) throw new NotFoundException('No such category');

    return category;
  }

  async updateCategory(id: string, data: any): Promise<CategoryDocument> {
    return await this.categoryModel.findByIdAndUpdate(id, data);
  }

  async addItemToCategory(
    id: string,
    itemId: string,
  ): Promise<CategoryDocument> {
    const { items } = await this.categoryModel.findById(id);

    return await this.updateCategory(id, { items: [...items, itemId] });
  }

  // MarketItems
  async createNewMarketItem(
    categoryId: string,
    itemData: MarketItem,
  ): Promise<MarketItemDocument> {
    const _id = Translitter({ preset: 'uk' }).transform(
      itemData.name.toLowerCase(),
      '-',
    );

    const item = new this.marketItemModel({
      ...itemData,
      _id: `${_id}-${this.cryptoService.randomString(6)}`,
      category: categoryId,
    });
    const newItem = await item.save();

    await this.addItemToCategory(categoryId, newItem._id);

    return newItem;
  }

  async createTestSetOfItems(): Promise<void> {
    const categories = await this.getAllCategories();

    categories.forEach(
      async ({ _id }) =>
        await this.createNewMarketItem(_id, {
          name: 'Шоколадна брокколі',
          unit: 'кг',
          minPrice: 100,
          maxPrice: 120,
          suppliers: [],
        }),
    );
  }
}
