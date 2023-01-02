import { IClient } from "@core/ports/client/IClient";
import { ClientFactory } from "@infra/client/factory/ClientFactory";
import { IPublicationDataSource } from "@features/publication/domain/ports/source/IPublicationDataSource";

export class PublicationRealDataSource implements IPublicationDataSource {
  private client: IClient = ClientFactory.getClient();

  createOtp(): Promise<any> {
    return Promise.resolve(undefined);
  }

  signIn(): Promise<any> {
    return Promise.resolve(undefined);
  }

  signUp(): Promise<any> {
    return Promise.resolve(undefined);
  }

  verifyOtp(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
