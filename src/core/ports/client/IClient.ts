export interface IClient {
  post(): Promise<any>;
  get(): Promise<any>;
  put(): Promise<any>;
  patch(): Promise<any>;
  delete(): Promise<any>;
}
