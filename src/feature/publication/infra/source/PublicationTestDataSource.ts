import { IPublicationDataSource } from "@features/publication/domain/ports/source/IPublicationDataSource";

export class PublicationTestDataSource implements IPublicationDataSource {
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
