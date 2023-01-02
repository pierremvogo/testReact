import { IPublicationDataSource } from "../ports/source/IPublicationDataSource";
import { IUsecase } from "../../../../core/ports/usecase/IUsecase";
import { Post } from "../entities/Post";

export class CreatePostUsecase implements IUsecase<CreatePostDto, Post> {
  private source!: IPublicationDataSource;

  constructor(source: IPublicationDataSource) {
    this.source = source;
  }

  execute(input: CreatePostDto): Promise<any> {
    return this.source.createPost(input).then();
  }
}
