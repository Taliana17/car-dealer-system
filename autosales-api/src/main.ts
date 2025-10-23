import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // elimina propiedades extra no definidas en DTO
    forbidNonWhitelisted: true,// lanza error si llegan props desconocidas
    transform: true,           // transforma tipos (string->number) cuando es posible
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

console.log('DB_HOST:', process.env.DB_HOST);
