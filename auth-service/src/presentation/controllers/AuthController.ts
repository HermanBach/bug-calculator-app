import { Request, Response } from "express";
import { AuthService } from "../../application/services/AuthService";
import { MongoUserRepository } from "../../infrastructure/database/MongoUserRepository";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService";

export class AuthController {

    private authService: AuthService;

    constructor() {
        const userRepository = new MongoUserRepository();
        const tokenService = new JwtTokenService();

        this.authService = new AuthService(userRepository, tokenService);
    }
    /**
    * @swagger
    * /auth-service/auth/register:
    *   post:
    *     summary: Register new user
    *     tags: [Authentication]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               login:
    *                 type: string
    *               email:
    *                 type: string  
    *               password:
    *                 type: string
    *     responses:
    *       200:
    *         description: User created
    */

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

    /**
     * @swagger
     * /auth-service/auth/login:
     *   post:
     *     summary: Login user
     *     tags: [Authentication] 
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               identifier:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     */
    async login (req: Request, resp: Response){
        try {
            const { identifier, password } = req.body;

            if (!identifier || !password){
                return resp.status(400).json({
                    error: 'Missing required fields: identifier, password'
                });
            }

            const loginResult = await this.authService.login(
                identifier,
                password
            );

            if (!loginResult){
                return resp.status(400).json({
                    error: 'Login error'
                });
            }

            resp.status(200).json({
                message: "Ok",
                user: {
                    id: loginResult.user.id,
                    login: loginResult.user.login,
                    email: loginResult.user.email
                },
                accessToken: loginResult.accessToken
            })
        } catch (error){
            const message = error instanceof Error ? error.message : "Login failed"
            return resp.status(400).json({ error: message });
        }
    }

    /**
     * @swagger
     * /auth-service/auth/logout:
     *   post:
     *     summary: Logout user and invalidate token
     *     tags: [Authentication]
     *     responses:
     *       200:
     *         description: Successfully logged out
     */
    async logout (req: Request, resp: Response){
        // TODO: make with blacklist
        resp.json({message: "Logged out successfully"});
    }

    /**
     * @swagger
     * /auth-service/auth/github:
     *   post:
     *     summary: Authenticate user via GitHub OAuth
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - code
     *             properties:
     *               code:
     *                 type: string
     *                 description: GitHub OAuth authorization code
     *     responses:
     *       200:
     *         description: Successfully authenticated
     *       400:
     *         description: Invalid or missing authorization code
     *       401:
     *         description: Authentication failed
     */
    async github(req: Request, resp: Response){
        try{
            const { code } = req.body;
            if (!code) {
                return resp.status(400).json({
                    error: 'Authorization code is required'
                });
            }
            const result = await this.authService.oauthGithubLogin(code);
            
            return resp.status(200).json(result);

        } catch (error){
            const err = error as Error;
        
            if (err.message.includes('GitHub user data not found') || 
                err.message.includes('GitHub user ID is required') ||
                err.message.includes('GitHub account email is required')) {
                return resp.status(400).json({
                    error: err.message
                });
            }

            if (err.message.includes('User account is deactivated')) {
                return resp.status(401).json({
                    error: err.message
                });
            }
            return resp.status(500).json({
                error: 'Internal server error'
            });
        } 
    }

}
