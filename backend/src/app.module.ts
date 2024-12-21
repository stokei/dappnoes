import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { Modules } from './modules';

@Module({
  imports: [...Modules, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
