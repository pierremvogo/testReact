import { User } from "./User";

export class Comment {
  id!: string;
  user!: User;
  text!: string;
  date!: number;
}
