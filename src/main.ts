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
// import * as cors from 'cors';

async function bootstrap() {
  // App
  const app = await NestFactory.create(AppModule, { cors: true });

  // Middleware
  // app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
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
