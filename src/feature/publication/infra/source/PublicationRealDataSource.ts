import { IPublicationDataSource } from "../../domain/ports/source/IPublicationDataSource";
import { ClientFactory } from "../../../../infra/client/factory/ClientFactory";
import { IClient } from "../../../../core/ports/client/IClient";
import { Post } from "../../domain/entities/Post";

export class PublicationRealDataSource implements IPublicationDataSource {
  private client: IClient = ClientFactory.getClient();

  createPost(input: CreatePostDto): Promise<Post> {
    return Promise.resolve({} as Post);
  }

  findAllPost(): Promise<Post[]> {
    return Promise.resolve([]);
  }
}
