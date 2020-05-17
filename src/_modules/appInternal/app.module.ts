// Core
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
})
export class AppInternalModule {}
