import { IEmailService } from "../../domain/interfaces/IEmailService";

export class MockEmailService implements IEmailService{

    async sendVerificationCode(email: string, code: string): Promise<boolean> {
        console.log(`🎯 [MOCK EMAIL] Verification code: ${code} for ${email}`);
        return true;
    }
    
    async sendWelcomeEmail(email: string, username: string): Promise<boolean> {
        console.log(`🎯 [MOCK EMAIL] Welcome to ${username} at ${email}`);
        return true;
    }

    async sendPasswordReset(email: string, token: string): Promise<boolean> {
        console.log(`🎯 [MOCK EMAIL] Password reset token: ${token} for ${email}`);
        return true;
    }
}