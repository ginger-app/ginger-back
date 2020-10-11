// Core
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Services
import { CryptoService } from '../crypto';

// Instruments
import { CategoryDocument } from '../db/models';
import { MarketCategoryDto } from './_dto';

const Translitter = require('cyrillic-to-translit-js');
@Injectable()
export class MarketService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

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

  async getAllCategories(): Promise<Omit<MarketCategoryDto, 'items'>[]> {
    const categories = await this.categoryModel
      .find()
      .select('-items')
      .exec();

    return categories;
  }
}
