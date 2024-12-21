import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { RoomControllers } from './controllers';
import { RoomServices } from './services';

@Module({
  imports: [DatabaseModule],
  providers: [...RoomControllers, ...RoomServices],
})
export class RoomsModule {}
