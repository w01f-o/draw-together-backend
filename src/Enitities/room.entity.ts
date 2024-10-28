import { User } from './User.entity';

export interface Room {
  id: string;
  name: string;
  users: User[];
  dataUrl: string | null;
}
