// Core
import { Module } from '@nestjs/common';

// Modules

// Controllers

// Providers and Services
import { UserService } from '../user';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
