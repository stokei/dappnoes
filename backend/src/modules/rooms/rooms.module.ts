import { Module } from '@nestjs/common';
import { RoomControllers } from './controllers';
import { RoomServices } from './services';

@Module({
  providers: [...RoomControllers, ...RoomServices],
})
export class RoomsModule {}
