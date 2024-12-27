import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { WebSocketController } from '@/core/decorators';

@WebSocketController()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
    server: Server;

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  emitEvent<TData = any>(event: string, payload: TData) {
    this.server.emit(event, payload);
  }
}
