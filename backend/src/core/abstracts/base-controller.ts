import { WebSocketServer } from '@nestjs/websockets';

import { SocketServer } from './socket-server';

export abstract class BaseWebSocketController {
  @WebSocketServer()
    server: SocketServer;
}
