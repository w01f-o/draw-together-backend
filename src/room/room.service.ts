import { Injectable } from '@nestjs/common';
import { RoomDao } from './room.dao';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { Room } from '../Enitities/room.entity';

@Injectable()
export class RoomService {
  public constructor(private readonly roomDao: RoomDao) {}

  public async findAll() {
    return await this.roomDao.findAll();
  }

  public async findOne(id: string) {
    return await this.roomDao.findOne(id);
  }

  public async create(createRoomDto: CreateRoomDto) {
    return await this.roomDao.create(createRoomDto);
  }

  public async joinRoom({
    user,
    room,
  }: {
    room: Room;
    user: { name: string; id: string };
  }) {
    return await this.roomDao.addUser(room.id, user);
  }

  public async leaveRoom({
    room,
    user,
  }: {
    room: Room;
    user: { name: string; id: string };
  }) {
    return await this.roomDao.removeUser(room.id, user);
  }

  public async draw(payload: { roomId: string; dataUrl: string }) {
    await this.roomDao.draw(payload);
  }
}
