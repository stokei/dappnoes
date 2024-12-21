import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from '@/core/abstracts/base-service';
import { PrismaClient } from '@/database/prisma/client';

import { CreateRoomDto } from '../../dto/create-room.dto';
import { Room } from '../../entities/room.entity';

@Injectable()
export class CreateRoomService extends BaseService {
  constructor(private readonly prismaClient: PrismaClient) {
    super();
  }

  async execute(data: CreateRoomDto): Promise<Room> {
    if (!data.name || !data.owner || data.entryFee < 0 || data.maxPlayers <= 0) {
      throw new BadRequestException('Invalid room data');
    }

    const dateNow = new Date().toISOString();
    const room = await this.prismaClient.room.create({
      data: {
        ...data,
        createdAt: dateNow,
        updatedAt: dateNow
      }
    });
    return new Room(room, room.id);
  }
}
