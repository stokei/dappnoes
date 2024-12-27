import { Module } from '@nestjs/common';

import { WebSocketControllers } from './controllers';

@Module({
  providers: [...WebSocketControllers],
  exports: [...WebSocketControllers]
})
export class WebSocketModule {}
