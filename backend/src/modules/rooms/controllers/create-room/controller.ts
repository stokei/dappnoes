import { MessageBody, SubscribeMessage } from '@nestjs/websockets';

import { WebSocketMessages } from '@/constants/websocket-messages';
import { BaseWebSocketController } from '@/core/abstracts/base-controller';
import { WebSocketController } from '@/core/decorators';

import { CreateRoomDto } from '../../dto/create-room.dto';
import { CreateRoomService } from '../../services/create-room/service';

@WebSocketController()
export class CreateRoomController extends BaseWebSocketController {
  constructor(private readonly createRoomService: CreateRoomService) {
    super();
  }

  @SubscribeMessage(WebSocketMessages.CREATE_ROOM)
  async execute(@MessageBody() data: CreateRoomDto) {
    const room = await this.createRoomService.execute(data);
    this.server.emit(WebSocketMessages.ROOM_CREATED, room);
    return room;
  }
}
