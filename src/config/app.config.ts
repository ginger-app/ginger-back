// Core
import { registerAs } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 6001,
  env: process.env.NODE_ENV || 'development',
  cookieSecret: process.env.COOKIE_SECRET || 'opto-cookie-secret',
  domain: process.env.DOMAIN || 'api.development.roquefore.dev',
  cors: {
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
    origin: (process.env.CORS_ALLOWED_ORIGIN || '*').split(' '),
    credentials: true,
  } as CorsOptions,
}));
