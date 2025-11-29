export interface IEmailVerificationService {
    sendVerificationCode(email: string): Promise<boolean>;
    verifyCode(email: string, code: string): Promise<boolean>,
    canResendCode(email: string): Promise<boolean>
}