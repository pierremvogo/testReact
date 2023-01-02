import { IPublicationDataSource } from "../../domain/ports/source/IPublicationDataSource";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "../../domain/entities/Post";

export class PublicationTestDataSource implements IPublicationDataSource {
  async createPost(input: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      user: {
        id: "jhjdhjf",
        lastName: " Junior",
        firstName: "Temgoua",
      },
      like: [],
      comments: [],
      id: input.userId,
      description: input.description,
      image: input.image,
      date: Date.now(),
    };
    let posts: Post[] = [];
    try {
      const value = await AsyncStorage.getItem("POST");
      if (value !== null) {
        posts = JSON.parse(value);
        posts.push(newPost);
        await AsyncStorage.setItem("POST", JSON.stringify(posts));
      } else {
        posts.push(newPost);
        await AsyncStorage.setItem("POST", JSON.stringify(posts));
      }
    } catch (err) {
      console.log(err);
    }
    return newPost;
  }

  async findAllPost(): Promise<Post[]> {
    let posts: Post[] = [];
    try {
      const value = await AsyncStorage.getItem("POST");
      if (value !== null) {
        posts = JSON.parse(value);
      } else {
        posts = [];
      }
    } catch (err) {
      console.log(err);
    }
    return posts;
  }
}
