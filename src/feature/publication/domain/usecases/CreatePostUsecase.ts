import { IPublicationDataSource } from "../ports/source/IPublicationDataSource";
import { IUsecase } from "@core/ports/usecase/IUsecase";

export class CreatePostUsecase implements IUsecase<any, any> {
  private source!: IPublicationDataSource;

  constructor(source: IPublicationDataSource) {
    this.source = source;
  }

  execute(input: any): Promise<any> {
    return this.source.signIn().then();
  }
}
