import { AxiosClient } from "../AxiosClient";

export class ClientFactory {
  static getClient() {
    return new AxiosClient();
  }
}
