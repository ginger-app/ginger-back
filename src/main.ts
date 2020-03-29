// Zero-dependency config
import * as dotenv from 'dotenv';
dotenv.config();

// Core
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Modules
import { AppModule } from './app.module';

// Middleware
import * as helmet from 'helmet';

async function bootstrap() {
  // App
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.use(helmet());
  app.setGlobalPrefix('api');

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
