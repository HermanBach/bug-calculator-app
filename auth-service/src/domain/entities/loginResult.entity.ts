import { User } from "./User.entity";

export class LoginResult {
  constructor(
    public user: User,
    public accessToken: string,
  ) {}
}