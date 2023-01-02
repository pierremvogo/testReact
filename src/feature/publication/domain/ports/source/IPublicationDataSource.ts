import { Post } from "../../entities/Post";

export interface IPublicationDataSource {
  createPost: (input: CreatePostDto) => Promise<Post>;
  findAllPost: () => Promise<Post[]>;
}
