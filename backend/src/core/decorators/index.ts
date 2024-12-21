import { WebSocketGateway } from '@nestjs/websockets';

export function WebSocketController() {
  return WebSocketGateway({
    cors: {
      origin: '*',
    },
  });
}
