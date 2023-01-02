import { PublicationTestDataSource } from "../PublicationTestDataSource";

export class AuthenticationSourceFactory {
  static getSource() {
    return new PublicationTestDataSource();
  }
}
