// Core
import { Module } from '@nestjs/common';

// Modules
import { MongooseModule } from '@nestjs/mongoose';

// Controllers

// Providers and Services
import { UserService } from '../user';

// Instruments
import { ClientSchema } from '../db/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
