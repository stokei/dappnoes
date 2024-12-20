import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/types/base-service';
import { CreateRoomDto } from '../../dto/create-room.dto';

@Injectable()
export class CreateRoomService implements BaseService {
  async execute(data: CreateRoomDto): Promise<CreateRoomDto> {
    return data;
  };
}
