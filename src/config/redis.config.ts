import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

export default registerAs(
  'redis',
  (): RedisOptions => ({
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  }),
);
