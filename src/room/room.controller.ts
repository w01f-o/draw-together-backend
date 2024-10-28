import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dtos/CreateRoom.dto';

@Controller('rooms')
export class RoomController {
  public constructor(private readonly roomService: RoomService) {}

  @Get()
  public async findAll() {
    return await this.roomService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.roomService.findOne(id);
  }

  @Post()
  public async create(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto);
  }
}
