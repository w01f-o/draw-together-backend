import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { RoomDao } from './room.dao';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomGateway, RoomService, RoomDao],
})
export class RoomModule {}
