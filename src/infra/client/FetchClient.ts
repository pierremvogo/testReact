import { IClient } from "@core/ports/client/IClient";

export class FetchClient implements IClient {
  delete(): Promise<any> {
    return Promise.resolve(undefined);
  }

  get(): Promise<any> {
    return Promise.resolve(undefined);
  }

  patch(): Promise<any> {
    return Promise.resolve(undefined);
  }

  post(): Promise<any> {
    return Promise.resolve(undefined);
  }

  put(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
