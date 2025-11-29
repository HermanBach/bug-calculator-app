import { IEmailVerificationService } from "../../domain/interfaces/IEmailVerificationService";

export class EmailVerificationService implements IEmailVerificationService{
    sendVerificationCode(email: string): Promise<boolean> {
        throw new Error ('sendVerificationCode not exist');
    }
    verifyCode(email: string, code: string): Promise<boolean> {
        throw new Error ('verifyCode not exist');
    }
    canResendCode(email: string): Promise<boolean> {
        throw new Error ('canResendCode not exist');
    }
}