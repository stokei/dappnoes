import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoomController } from './controller';
import { CreateRoomService } from '../../services/create-room/service';

describe('CreateRoomController', () => {
  let gateway: CreateRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateRoomController, CreateRoomService],
    }).compile();

    gateway = module.get<CreateRoomController>(CreateRoomController);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
