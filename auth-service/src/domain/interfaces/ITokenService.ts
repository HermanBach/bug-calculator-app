export interface ITokenService {
    generateToken(userId: string): string;
    verifyToken(token:string): boolean;
    decodeToken(token: string): string;
}