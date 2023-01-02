export interface IPublicationDataSource {
  signIn: () => Promise<any>;
  signUp: () => Promise<any>;
  createOtp: () => Promise<any>;
  verifyOtp: () => Promise<any>;
}
