// Core
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Services & Modules
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/users';

// Instruments
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: async (configService: ConfigService) =>
        configService.get<string>('database'),
      inject: [ConfigService],
    }),
    RedisModule.register({
      host: 'redis',
      port: 6379,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
