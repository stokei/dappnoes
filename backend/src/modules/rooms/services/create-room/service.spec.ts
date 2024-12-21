import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaClient } from '@/database/prisma/client';
import { createPrismaClientMock } from '@/utils/test/mocks/prisma-client.mock';

import { CreateRoomDto } from '../../dto/create-room.dto';
import { Room } from '../../entities/room.entity';
import { createRoomStub } from '../../entities/room.entity.stub';

import { CreateRoomService } from './service';

describe('CreateRoomService', () => {
  let createRoomService: CreateRoomService;
  const mockPrismaClient = createPrismaClientMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRoomService,
        { provide: PrismaClient, useValue: mockPrismaClient },
      ],
    }).compile();

    createRoomService = module.get<CreateRoomService>(CreateRoomService);
  });

  it('should be defined', () => {
    expect(createRoomService).toBeDefined();
  });

  it('should create a new room successfully', async () => {
    const newRoom = createRoomStub();
    const roomData: CreateRoomDto = {
      name: newRoom.name,
      owner: newRoom.owner,
      entryFee: newRoom.entryFee,
      maxPlayers: newRoom.maxPlayers,
    };

    mockPrismaClient.room.create.mockResolvedValue(newRoom);
    const createdRoom = await createRoomService.execute(roomData);

    expect(createdRoom).toBeInstanceOf(Room);
    expect(createdRoom.name).toBe(newRoom.name);
    expect(createdRoom.owner).toBe(newRoom.owner);
    expect(createdRoom.entryFee).toBe(newRoom.entryFee);
    expect(createdRoom.maxPlayers).toBe(newRoom.maxPlayers);
    expect(createdRoom.createdAt).toBeDefined();
    expect(createdRoom.updatedAt).toBeDefined();
    expect(mockPrismaClient.room.create).toHaveBeenCalledWith({
      data: {
        ...roomData,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      },
    });
  });

  it('should throw BadRequestException if room data is invalid', async () => {
    const invalidRoomData: CreateRoomDto = {
      name: '',
      owner: 'owner-address',
      entryFee: -10,
      maxPlayers: 0,
    };

    await expect(createRoomService.execute(invalidRoomData)).rejects.toThrow(BadRequestException);
  });

  it('should handle missing required fields', async () => {
    const incompleteRoomData: CreateRoomDto = {
      name: '',
      owner: 'owner-address',
      entryFee: 10,
      maxPlayers: 4,
    };

    await expect(createRoomService.execute(incompleteRoomData)).rejects.toThrow(BadRequestException);
  });
});
