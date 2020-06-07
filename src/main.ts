// Zero-dependency config
import * as dotenv from 'dotenv';
dotenv.config();

// Core
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Modules
import { AppModule } from './app.module';

// Providers
import { DynamoDB } from './_services';

// Middleware
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  // App
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.use(function(req, res, next) {
    console.log(`[${new Date().getTime()}][INCOMING_REQ]`);
    console.log(`[IP_ADDRESS] ${req.connection.remoteAddress}`);
    console.log(`[REQ_PROTOCOL] ${req.protocol}`);
    console.log(`[REQ_HOSTNAME] ${req.hostname}`);
    console.log(`[REQ_PATH] ${req.path}`);
    console.log(`[REQ_METHOD] ${req.method}`);

    next();
  });
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://192.168.1.110:3000',
      process.env.CORS_ORIGIN,
    ],
  });
  app.use(function(req, res, next) {
    console.log(`[PASSED CORS]`);

    next();
  });
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(function(req, res, next) {
    console.log(`[PASSED RATE LIMITER]`);

    next();
  });
  app.use(helmet());
  app.use(function(req, res, next) {
    console.log(`[PASSED HELMET]`);

    next();
  });
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    console.log(`[PASSED BODY PARSER]`);

    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.use(function(req, res, next) {
    console.log(`[PASSED VALIDATION PIPE]`);

    next();
  });
  app.setGlobalPrefix('api');

  // DB
  await DynamoDB.init();

  // Swagger documentation
  const options = new DocumentBuilder()
    .setTitle('Ginger doc')
    .setDescription('Ginger app API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // Launch
  await app.listen(process.env.PORT || 6001);
}
bootstrap();
