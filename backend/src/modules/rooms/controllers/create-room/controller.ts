import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateRoomDto } from '../../dto/create-room.dto';
import { CreateRoomService } from '../../services/create-room/service';

@WebSocketGateway()
export class CreateRoomController {
  constructor(private readonly roomsService: CreateRoomService) {}

  @SubscribeMessage('createRoom')
  execute(@MessageBody() data: CreateRoomDto) {
    return this.roomsService.execute(data);
  }
}
