// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Services & Modules
import { RedisModule } from 'nestjs-redis';
import { DynamoDB } from './modules/dynamo';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.register({
      host: 'redis',
      port: 6379,
    }),
    DynamoDB,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
