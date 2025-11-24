import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { User } from "../../domain/entities/User.entity";
import { LoginResult } from "../../domain/entities/loginResult.entity";
import { PasswordService } from "../../infrastructure/auth/PasswordService";
import { UpdateUserData } from "../../presentation/dto/UpdateUserData";
import { IAuthService } from "../../domain/interfaces/IAuthService";

export class AuthService implements IAuthService {
    constructor (
        private userRepository: IUserRepository,
        private tokenService: ITokenService,
        private passwordService = new PasswordService()
    ) {}

    private async findUserFromToken(token: string): Promise<User>{
        const isTokenValid = await this.tokenService.verifyToken(token);
        if (!isTokenValid){
            throw new Error ('Invalid token');
        }

        const userId = await this.tokenService.decodeToken(token);
        const findedUser = await this.userRepository.findById(userId);

        if (!findedUser){
            throw new Error('User not found');
        }

        return findedUser;
    }
    private generatorUserId(): string {
        return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

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
            hashedPassword,
            true
        );

        if (!newUser.isValidUser()){
            const errors = newUser.getValidationErrors();
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }

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

        return new LoginResult(findedUser, token);
    }

    refreshToken(token: string): string {
        const newToken = this.tokenService.refreshToken(token);

        if (!newToken){
            throw new Error ('Failed refresh token');
        }
        return newToken;
    }

    async updateUser(token: string, data: UpdateUserData): Promise<User> {
        const findedUser = await this.findUserFromToken(token);

        const updateData = { ...data };
        if (!!data.password){
            updateData.password = await this.passwordService.hashPassword(data.password);
        }
        return await this.userRepository.update(findedUser.id, updateData);
    }

    async deactivateUser(token: string): Promise<boolean> {
        const findedUser = await this.findUserFromToken(token);
        return await this.userRepository.deactivate(findedUser.id)       
    }

    async oauthGithubLogin(provider: "github", code: string): Promise<LoginResult> {
        throw new Error("GitHub OAuth not implemented yet");
    }

}