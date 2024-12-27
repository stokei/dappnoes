import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { RedisIoAdapter } from './core/adapters/redis-io-adapter';
import { AppModule } from './app.module';
import { HOST, PORT } from './environments';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  });
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(PORT, HOST);
  const appURL = await app.getUrl();
  logger.log(`Server started at ${appURL}`);
}
bootstrap();
