import { ITokenService } from "../../domain/interfaces/ITokenService";
import jwt, { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

export class JwtTokenService implements ITokenService {

    private readonly secretKey: string;
    private readonly expiresIn: string;
    private readonly issuer: string;

    constructor(){
        this.secretKey = process.env.JWT_SECRET || 'dev-secret-key';
        this.expiresIn = '24h';
        this.issuer = process.env.ISSUER || 'auth-service';

        if (!process.env.JWT_SECRET){
            console.warn('Using development JWT secret - set JWT_SECRET for production!');
        }
    }

    generateToken(userId: string): string {
        const payload = {
            sub: userId,
            iat: Math.floor(Date.now() / 1000)
        };

        return jwt.sign(payload, this.secretKey, {
            expiresIn: this.expiresIn,
            issuer: this.issuer,
        } as jwt.SignOptions);
    }

    verifyToken(token: string): boolean {
        try{
            jwt.verify(token, this.secretKey);
            return true

        } catch (error){
            if (error instanceof TokenExpiredError) {
                console.warn('🕒 Token expired');
            } else if (error instanceof JsonWebTokenError) {
                console.warn('❌ Invalid token:', error.message);
            } else if (error instanceof NotBeforeError) {
                console.warn('⏰ Token not yet active');
            } else {
                console.error('🔐 Token verification error:', error);
            }
            return false;
        }
    }

    decodeToken(token: string): string {
        try {
            const decode = jwt.verify(token, this.secretKey) as { sub: string };
            return decode.sub;
        } catch (error){
            if (error instanceof TokenExpiredError) {
                throw new Error('Token expired');
            } else if (error instanceof JsonWebTokenError) {
                throw new Error('Invalid token');
            } else if (error instanceof NotBeforeError) {
                throw new Error('Token not yet active');
            } else {
                throw new Error('Token verification failed');
            }
        }
    }

}