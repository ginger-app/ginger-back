// Core
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

// Utils
import { Redis } from 'ioredis';

@Injectable()
export class RedisStorageService {
  private client: Redis;
  private readonly logger: Logger = new Logger(RedisStorageService.name);

  constructor(private readonly redisService: RedisService) {
    this.logger.log('RedisStorageService constructing...');
  }

  async getClient(): Promise<Redis> {
    this.logger.log('Getting Redis client...');
    this.client = await this.redisService.getClient();

    return this.client;
  }

  private async checkClient() {
    this.logger.log('Checking Redis client...');

    if (!this.client) {
      await this.getClient();
    }
  }

  async set(key: string, value: string, expirationTime?: number) {
    await this.checkClient();

    try {
      await this.client.set(key, value, 'EX', expirationTime || 3600);

      return { key, value };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async get(key: string) {
    await this.checkClient();

    try {
      const data = await this.client.get(key);

      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(key: string) {
    this.logger.log(` Redis delete -> key: ${key}`);

    await this.client.del(key);

    return true;
  }
}
