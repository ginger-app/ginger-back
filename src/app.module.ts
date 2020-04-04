// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthModule } from './_modules';

// Services
import { DynamoDB } from './_services';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [DynamoDB],
})
export class AppModule {}
