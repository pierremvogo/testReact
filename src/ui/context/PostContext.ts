import { Post } from "../../feature/publication/domain/entities/Post";
import { createContext } from "react";

export type PostContextData = {
  posts: Post[];
  setPosts: (value: Post[]) => void;
};

export const PostContext = createContext<PostContextData>({
  posts: [],
  setPosts: (value) => console.log(value),
});
