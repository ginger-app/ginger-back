// Zero-dependency config
import * as dotenv from 'dotenv';
dotenv.config();

// Core
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ValidationPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Modules
import { AppModule } from './app.module';

// Providers
import { DynamoDB } from './modules/dynamo';

// Middleware
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // App
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Middleware
  app.enableCors(configService.get('app.cors'));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser(configService.get<string>('app.cookieSecret')));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
      exceptionFactory: details =>
        new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          details,
        }),
    }),
  );
  app.setGlobalPrefix('api');

  // DB
  await DynamoDB.init();

  // Swagger documentation
  if (configService.get<string>('app.env') !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Ginger doc')
      .setDescription('Ginger app API description')
      .setVersion('0.0.2')
      // .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  // Launch
  await app.listen(process.env.PORT || 6001);
}
bootstrap();
