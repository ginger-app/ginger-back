// Core
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';

// Providers
import { RedisStorageService } from '../../_services';

@Module({
  controllers: [AppController],
  providers: [RedisStorageService],
})
export class AppInternalModule {}
