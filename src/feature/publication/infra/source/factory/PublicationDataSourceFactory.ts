import { PublicationTestDataSource } from "../PublicationTestDataSource";
import { IPublicationDataSource } from "../../../domain/ports/source/IPublicationDataSource";

export class PublicationDataSourceFactory {
  static getSource(): IPublicationDataSource {
    return new PublicationTestDataSource();
  }
}
