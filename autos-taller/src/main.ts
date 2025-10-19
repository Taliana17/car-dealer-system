import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seguridad básica
  app.use(helmet());

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // quita propiedades extra no declaradas en DTOs
      forbidNonWhitelisted: true,// lanza error si mandan propiedades no permitidas
      transform: true,           // convierte tipos (string->number en pipes)
    }),
  );

  // Si quieres prefijo global tipo /api:
  // app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ? +process.env.PORT : 3000);
}
bootstrap();
