import { User } from "../entities/User.entity";
import { LoginResult } from "../entities/loginResult.entity";

export interface IAuthService {
    register(login: string, email: string, password: string): Promise<User>;
    login(identifier: string, password: string): Promise<LoginResult>
}