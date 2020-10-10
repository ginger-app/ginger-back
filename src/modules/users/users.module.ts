// Core
import { Module, forwardRef } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';

// Modules
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { UsersController } from './users.controller';

// Providers and Services
import { UserService } from './users.service';

// Instruments
import { ClientSchema } from '../db/models';
import { JwtModule } from '../jwt';
import { AuthModule } from '../auth';
// import { AccessStrategy } from '../auth/strategies/access.jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
    JwtModule,
    forwardRef(() => AuthModule),
    // PassportModule.register({ defaultStrategy: 'access' }),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
