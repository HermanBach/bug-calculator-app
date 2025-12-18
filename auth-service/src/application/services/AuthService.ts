import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { User } from "../../domain/entities/User.entity";
import { LoginResult } from "../../domain/entities/loginResult.entity";
import { UpdateUserData } from "../../presentation/dto/UpdateUserData";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IEmailVerificationService } from "../../domain/interfaces/IEmailVerificationService";
import { ILoggerService } from "../../domain/interfaces/ILoggerService";
import { IPasswordService } from "../../domain/interfaces/IPasswordService";
import { IGitHubOAuthService } from "../../domain/interfaces/IGitHubOAuthService";
import { GitHubUserData } from "../../presentation/dto/GitHubUserData";

export class AuthService implements IAuthService {
    constructor (
        private userRepository: IUserRepository,
        private tokenService: ITokenService,
        private emailVerificationService: IEmailVerificationService,
        private logerService: ILoggerService,
        private passwordService: IPasswordService,
        private gitHubOAuthService: IGitHubOAuthService
    ) {}

    private async findUserFromToken(token: string): Promise<User>{
        const isTokenValid = await this.tokenService.verifyToken(token);
        if (!isTokenValid){
            throw new Error ('Invalid token');
        }

        const userId = await this.tokenService.decodeToken(token);
        const user = await this.userRepository.findById(userId);

        if (!user){
            throw new Error('User not found');
        }

        return user;
    }

    private generatorUserId(): string {
        return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    private async createUserFromGithub(githubUser: GitHubUserData): Promise<User>{
        const login = await this.getNewOauthLogin(githubUser.login);
        
        const hashedPassword = await this.passwordService.hashPassword(this.generatorUserId());
        
        const newUser = new User(
            this.generatorUserId(),
            login,
            githubUser.email,
            hashedPassword,
            true,
            githubUser.id
        );

        if (!newUser.isValidUser()){
            const errors = newUser.getValidationErrors();
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }

        return await this.userRepository.save(newUser);
    }

    private async getNewOauthLogin(login: string): Promise<string>{
        if (!await this.userRepository.findByLogin(login)){
            return login;
        }

        let newLogin = login;
        let counter = 1;
    
        while (await this.userRepository.findByLogin(newLogin)) {
            newLogin = `${login}${counter}`;
            counter++;

            if (counter > 1000) {
                throw new Error("Cannot generate unique login");
            }
        }
        
        return newLogin;
    }

    private async userExistAndVerify(email: string): Promise<boolean>{
        const user = await this.userRepository.findByEmail(email);

        if (!user || user.isEmailVerified){
            return false;
        }

        return true;
    }

    async register(login: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        
        if (existingUser){
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
        const user =  await this.userRepository.findByEmail(identifier) || await this.userRepository.findByLogin(identifier);

        if (!user){
            throw new Error ("User not found");
        }

        const passwordIsValid = await this.passwordService.comparePassword(password, user.password);

        if (!passwordIsValid){
            throw new Error ("Invalid password");
        }

        const token = this.tokenService.generateToken(user.id);

        return new LoginResult(user, token);
    }

    refreshToken(token: string): string {
        const newToken = this.tokenService.refreshToken(token);

        if (!newToken){
            throw new Error ('Failed refresh token');
        }
        return newToken;
    }

    async updateUser(token: string, data: UpdateUserData): Promise<User> {
        const user = await this.findUserFromToken(token);

        if (data.email && data.email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new Error("Email already in use");
            }
        }

        const updateData = { ...data };
        if (data.password){
            if (data.password.length < 6) {
                throw new Error("Password must be at least 6 characters");
            }
            updateData.password = await this.passwordService.hashPassword(data.password);
        }
        return await this.userRepository.update(user.id, updateData);
    }

    async deactivateUser(token: string): Promise<boolean> {
        const user = await this.findUserFromToken(token);
        return await this.userRepository.deactivate(user.id)       
    }

    async oauthGithubLogin(code: string): Promise<LoginResult> {
        const githubUser = await this.gitHubOAuthService.getUserData(code);

        if (!githubUser){
            throw new Error('GitHub user data not found');
        }

        if (!githubUser.id) {
            throw new Error('GitHub user ID is required');
        }

        if (!githubUser.email) {
            throw new Error('GitHub account email is required');
        }

        let user = await this.userRepository.findByGithubId(githubUser.id);

        if (!user){
            user = await this.createUserFromGithub(githubUser);
        }

        if (!user?.isActive){
            throw new Error("User account is deactivated");
        }

        const token = this.tokenService.generateToken(user.id);
        return new LoginResult(user, token);
    }

    async requestEmailVerification(email: string): Promise<boolean> {
        if (!await this.userExistAndVerify(email)){
            throw new Error("User not found or Email already verified");
        }
        return await this.emailVerificationService.sendVerificationCode(email);
    }
    
    async verifyEmail(email: string, code: string): Promise<boolean> {
        if (!await this.userExistAndVerify(email)){
            throw new Error("User not found or Email already verified");
        }

        const isValid = await this.emailVerificationService.verifyCode(email, code);
    
        if (isValid){
            const user = await this.userRepository.findByEmail(email);
            if (user) {
                user.makeEmailVerified();
                await this.userRepository.save(user);
            }
        }
    
        return isValid;
    }

}