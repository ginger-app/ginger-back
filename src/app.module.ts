// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthModule } from './_modules';
import { RedisModule } from 'nestjs-redis';

// Services
import { DynamoDB } from './_services';

@Module({
  imports: [
    AuthModule,
    RedisModule.register({
      host: '127.0.0.1',
      port: 6379,
    }),
  ],
  controllers: [],
  providers: [DynamoDB],
})
export class AppModule {}
