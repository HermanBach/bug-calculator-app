export interface IEmailService {
    sendVerificationCode(email: string, code: string): Promise<boolean>;
    sendWelcomeEmail(email: string, username: string): Promise<boolean>
    sendPasswordReset(email: string, username: string): Promise<boolean>
}