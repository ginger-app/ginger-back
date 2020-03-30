// Core
import { Module } from '@nestjs/common';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
})
export class AuthModule {}
