import { User } from "../entities/User.entity";
import { LoginResult } from "../entities/loginResult.entity";
import { UpdateUserData } from "../../presentation/dto/UpdateUserData";

export interface IAuthService {
    // authentication
    register(login: string, email: string, password: string, githubId?: string): Promise<User>;
    login(identifier: string, password: string): Promise<LoginResult>;
    refreshToken(token: string): string;
    // user management
    updateUser(token: string, data: UpdateUserData): Promise<User>;
    deactivateUser(token: string): Promise<boolean>

    oauthGithubLogin(code: string): Promise<LoginResult>

    requestEmailVerification(email: string): Promise<boolean>
    verifyEmail(email: string, code: string): Promise<boolean>
}
