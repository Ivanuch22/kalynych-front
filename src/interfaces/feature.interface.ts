import { IUser } from "./user.interfaces";

export interface IFeature {
  id: number;
  name: string;
  text: string;
  votes: number;
  voted_users: IUser[];
}
