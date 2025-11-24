import { User } from "../entities/User.entity";
import { LoginResult } from "../entities/loginResult.entity";
import { UpdateUserData } from "../../presentation/dto/UpdateUserData";

export interface IAuthService {
    // authentication
    register(login: string, email: string, password: string): Promise<User>;
    login(identifier: string, password: string): Promise<LoginResult>;
    // user management
    updateUser(token: string, data: UpdateUserData): Promise<User>;
    deactivateUser(token: string): Promise<boolean>
}
