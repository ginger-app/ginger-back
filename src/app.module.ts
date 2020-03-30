// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthModule } from './_modules';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
