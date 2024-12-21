import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PrismaClientExceptionFilter } from './core/interceptors/prisma-client-exception';
import { AppModule } from './app.module';
import { HOST, PORT } from './environments';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(PORT, HOST);
  const appURL = await app.getUrl();
  logger.log(`Server started at ${appURL}`);
}
bootstrap();
