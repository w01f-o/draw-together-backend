import { Injectable } from '@nestjs/common';
import { Room } from '../Enitities/room.entity';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import * as uuid from 'uuid';

@Injectable()
export class RoomDao {
  private rooms: Room[] = [];

  public async findAll(): Promise<Room[]> {
    return this.rooms;
  }

  public async findOne(id: string): Promise<Room> {
    return this.rooms.find((room) => room.id === id);
  }

  public async create(createRoomDto: CreateRoomDto) {
    const room: Room = {
      ...createRoomDto,
      id: uuid.v4(),
      users: [{ name: createRoomDto.user.name, id: createRoomDto.user.id }],
      dataUrl: null,
    };

    this.rooms.push(room);

    return room;
  }

  public async delete(id: string) {
    this.rooms = this.rooms.filter((room) => room.id !== id);
  }

  public async addUser(id: string, user: { name: string; id: string }) {
    this.rooms = this.rooms.map((room) => {
      if (
        room.id === id &&
        room.users.every((roomUser) => roomUser.id !== user.id)
      ) {
        room.users.push({ name: user.name, id: user.id });
      }

      return room;
    });
  }

  public async removeUser(id: string, user: { name: string; id: string }) {
    this.rooms = this.rooms
      .map((room) => {
        if (room.id === id) {
          room.users = room.users.filter((roomUser) => roomUser.id !== user.id);
        }

        return room;
      })
      .filter((room) => room.users.length > 0);
  }

  public async draw(payload: { roomId: string; dataUrl: string }) {
    this.rooms.map((room) => {
      if (room.id === payload.roomId) {
        room.dataUrl = payload.dataUrl;
      }

      return room;
    });
  }
}
