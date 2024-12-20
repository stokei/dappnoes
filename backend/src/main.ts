import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HOST, PORT } from './environments';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, HOST);
  const appURL = await app.getUrl();
  logger.log(`Server started at ${appURL}`)
}
bootstrap();
