import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Token } from './token';

async function bootstrap() {
  //await initializeClient();
  const token = new Token();
  token.initialize();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
