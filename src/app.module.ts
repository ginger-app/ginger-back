// Core
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';

// Modules
import { AuthModule } from './auth';

// Services
import { AppService } from './app.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
