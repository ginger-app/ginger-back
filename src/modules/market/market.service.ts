// Core
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Mongo Documents
import { CategoryDocument } from '../db/models';

import { MarketCategoryDto } from './_dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async createNewCategory(): Promise<CategoryDocument> {
    const category = new this.categoryModel({
      name: Math.round(Math.random() * 100000000).toString(16),
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
