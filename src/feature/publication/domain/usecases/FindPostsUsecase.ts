import { IPublicationDataSource } from "../ports/source/IPublicationDataSource";
import { IUsecase } from "../../../../core/ports/usecase/IUsecase";
import { Post } from "../entities/Post";
import { wait } from "../../../../core/utils/functions";

export class FindPostsUsecase implements IUsecase<void, Post[]> {
  private source!: IPublicationDataSource;

  constructor(source: IPublicationDataSource) {
    this.source = source;
  }

  execute(): Promise<Post[]> {
    return this.source.findAllPost().then();
  }
}
