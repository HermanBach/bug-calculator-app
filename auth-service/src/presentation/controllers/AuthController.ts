import { Request, Response } from "express";
import { AuthService } from "../../application/services/AuthService";
import { MongoUserRepository } from "../../infrastructure/database/MongoUserRepository";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService";
import { log } from "console";
// AuthController.ts
/**
 * 
 */
export class AuthController {

    private authService: AuthService;

    constructor() {
        const userRepository = new MongoUserRepository();
        const tokenService = new JwtTokenService();

        this.authService = new AuthService(userRepository, tokenService);
    }

    async register (req: Request, resp: Response){
        try {
            const { login, email, password } = req.body;
            if (!login || !email || !password){
                return resp.status(400).json({
                    error: 'Missing required fields: login, email, password'
                });
            }

            const user = await this.authService.register(login, email, password);

            resp.status(200).json({
                id: user.id,
                login: user.login,
                email: user.email
            });

        } catch (error) {
            const message = error instanceof Error ? error.message : "Registration failed"
            return resp.status(400).json({ error: message });
        }
    }

}