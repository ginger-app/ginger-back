import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../../config/jwt.config';
import { JwtService } from './jwt.service';

@Module({
  imports: [ConfigModule.forFeature(jwtConfig)],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
