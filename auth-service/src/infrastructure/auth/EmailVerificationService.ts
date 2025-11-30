import { IEmailVerificationService } from "../../domain/interfaces/IEmailVerificationService";
import { IEmailVerificationRepository } from "./interfaces/IEmailVerificationRepository";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { CodeGenerator } from "./CodeGenerator";

export class EmailVerificationService implements IEmailVerificationService{
    private readonly RESEND_DELAY_MS: number;
    private readonly MAX_ATTEMPTS_PER_HOUR: number;
    
    constructor(
        private emailVerificationRepo: IEmailVerificationRepository,
        private emailService: IEmailService,
        private codeGenerator: CodeGenerator
    ){
        const delay = process.env.RESEND_DELAY_MS;

        if (!delay){
            throw new Error('RESEND_DELAY_MS not found in environment variables')
        }

        const perHour = process.env.MAX_ATTEMPTS_PER_HOUR;

        if (!perHour){
            throw new Error('MAX_ATTEMPTS_PER_HOUR not found in environment variables')
        }

        this.RESEND_DELAY_MS = parseInt(delay);
        this.MAX_ATTEMPTS_PER_HOUR = parseInt(perHour);
    }

    private async canResendCode(email: string): Promise<boolean>{
        const recentAttempts = await this.emailVerificationRepo.getRecentAttempts(
            email,
            60 * 60 * 1000
        );
        const lastSent = await this.emailVerificationRepo.getLastSentTime(email);

        const isWithinRateLimit = recentAttempts < this.MAX_ATTEMPTS_PER_HOUR;
        const isAfterDelay = !lastSent || 
            (Date.now() - lastSent.getTime()) > this.RESEND_DELAY_MS;

        return isWithinRateLimit && isAfterDelay;
    };

    async sendVerificationCode(email: string): Promise<boolean> {
        const canResendCode = await this.canResendCode(email);

        if (!canResendCode){
            return false;
        }

        const code = this.codeGenerator.generateVerificationCode();
        const expiresAt = this.codeGenerator.generateExpiryDate();

        await this.emailVerificationRepo.saveCode(email, code, expiresAt);

        const emailSend = await this.emailService.sendVerificationCode(email, code);

        if(!emailSend){
            throw new Error ('Email doesn`t send');
        }
        return emailSend
    }

    verifyCode(email: string, code: string): Promise<boolean> {
        throw new Error ('verifyCode not exist');
    }
}