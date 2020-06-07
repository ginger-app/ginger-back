// Core
import { Module } from '@nestjs/common';

// Modules
import {
  AuthModule,
  MarketModule,
  ProfileModule,
  AppInternalModule,
} from './_modules';
import { RedisModule } from 'nestjs-redis';

// Services
import { DynamoDB } from './_services';

@Module({
  imports: [
    AuthModule,
    MarketModule,
    ProfileModule,
    AppInternalModule,
    // RedisModule.register({
    //   // host: 'redis',
    //   host: 'localhost',
    //   port: 6379,
    // }),
  ],
  controllers: [],
  providers: [DynamoDB],
})
export class AppModule {}
