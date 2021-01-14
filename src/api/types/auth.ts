import { IUser } from "./user";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface IWhoamiResponse {
  user: IUser;
}

export interface IAuthenticationResponse extends IWhoamiResponse {
  token: string;
}
