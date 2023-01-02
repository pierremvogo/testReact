import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

export class Post {
  id!: string;
  description!: string;
  user!: User;
  image!: string;
  comments!: Comment[];
  like!: Like[];
  date!: number;
}
