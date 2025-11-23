import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { User } from "../../domain/entities/User.entity";
import { LoginResult } from "../../domain/entities/loginResult.entity";
import { PasswordService } from "../../infrastructure/auth/PasswordService";

export class AuthService implements IAuthService {
    constructor (
        private userRepository: IUserRepository,
        private tokenService: ITokenService,
        private passwordService = new PasswordService()
    ) {}



    async register(login: string, email: string, password: string): Promise<User> {
        const existUser = await this.userRepository.findByEmail(email);
        
        if (existUser){
            throw new Error ("User with this email already exists");
        }

        const hashedPassword = await this.passwordService.hashPassword(password);
        
        const newUser = new User(
            this.generatorUserId(),
            login,
            email,
            hashedPassword
        );

        return await this.userRepository.save(newUser);
    }

    async login(identifier: string, password: string): Promise<LoginResult> {
        const findedUser =  await this.userRepository.findByEmail(identifier) || await this.userRepository.findByLogin(identifier);

        if (!findedUser){
            throw new Error ("User not found");
        }

        const passwordIsValid = await this.passwordService.comparePassword(password, findedUser.password);

        if (!passwordIsValid){
            throw new Error ("Invalid password");
        }

        const token = this.tokenService.generateToken(findedUser.id);
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        return new LoginResult(findedUser, token, expiresAt);
    }

    private generatorUserId(): string {
        return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}