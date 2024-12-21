import { Test, TestingModule } from '@nestjs/testing';

import { WebSocketMessages } from '@/constants/websocket-messages';
import { createWebSocketServerMock } from '@/utils/test/mocks/websocket-server.mock';

import { createRoomStub } from '../../entities/room.entity.stub';
import { CreateRoomService } from '../../services/create-room/service';

import { CreateRoomController } from './controller';

describe('CreateRoomController', () => {
  let createRoomController: CreateRoomController;
  let createRoomService: CreateRoomService;

  const mockWebSocketServer = createWebSocketServerMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRoomController,
        {
          provide: CreateRoomService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    createRoomController =
      module.get<CreateRoomController>(CreateRoomController);
    createRoomService = module.get<CreateRoomService>(CreateRoomService);

    (createRoomController as any).server = mockWebSocketServer;
  });

  it('should be defined', () => {
    expect(createRoomController).toBeDefined();
  });

  it('should create a new room with successfully', async () => {
    const newRoom = createRoomStub();

    jest.spyOn(createRoomService, 'execute').mockResolvedValue(newRoom);

    const createRoomControllerResponse =
      await createRoomController.execute({
        name: newRoom.name,
        creator: newRoom.creator,
        entryFee: newRoom.entryFee,
        maxPlayers: newRoom.maxPlayers,
      });
    expect(createRoomControllerResponse).toStrictEqual(newRoom);

    expect(mockWebSocketServer.emit).toHaveBeenCalledWith(
      WebSocketMessages.ROOM_CREATED,
      newRoom,
    );
  });
});
