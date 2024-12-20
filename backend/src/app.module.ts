import { Module } from '@nestjs/common';
import { Modules } from './modules';

@Module({
  imports: [...Modules],
  controllers: [],
  providers: [],
})
export class AppModule {}
