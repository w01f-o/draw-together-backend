import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketEvents } from '../enums/SocketEvents.enum';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { Room } from '../Enitities/room.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class RoomGateway implements OnGatewayInit {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('RoomGateway');

  afterInit(server: Server) {
    this.logger.log(`Room gateway init: ${server}`);
  }

  @SubscribeMessage(SocketEvents.GET_ROOMS)
  public async getRooms(client: Socket) {
    const rooms = await this.roomService.findAll();

    client.emit(SocketEvents.SET_ROOMS, rooms);
  }

  @SubscribeMessage(SocketEvents.CREATE_ROOM)
  public async createRoom() {
    const rooms = await this.roomService.findAll();

    this.server.emit(SocketEvents.SET_ROOMS, rooms);
  }

  @SubscribeMessage(SocketEvents.JOIN_ROOM)
  public async joinRoom(
    _client: Socket,
    payload: { room: Room; user: { name: string; id: string } },
  ) {
    await this.roomService.joinRoom(payload);
    const rooms = await this.roomService.findAll();

    this.server.emit(SocketEvents.SET_ROOMS, rooms);
  }

  @SubscribeMessage(SocketEvents.LEAVE_ROOM)
  public async leaveRoom(
    _client: Socket,
    payload: { room: Room; user: { name: string; id: string } },
  ) {
    await this.roomService.leaveRoom(payload);
    const rooms = await this.roomService.findAll();

    this.server.emit(SocketEvents.SET_ROOMS, rooms);
  }

  @SubscribeMessage(SocketEvents.DRAW)
  public async sendMessage(
    _client: Socket,
    payload: { roomId: string; dataUrl: string },
  ) {
    await this.roomService.draw(payload);

    this.server.emit(SocketEvents.DRAW, payload);
  }
}
