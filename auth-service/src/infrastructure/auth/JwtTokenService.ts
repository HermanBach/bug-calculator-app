import { ITokenService } from "../../domain/interfaces/ITokenService";

export class JwtTokenService implements ITokenService {
    generateToken(userId: string): string {
        return `fake-token-for-${userId}`
    }
    verifyToken(token: string): boolean {
        return !!token;
    }
    decodeToken(token: string): string {
        return token.replace(`fake-token-for-`, "");
    }

}