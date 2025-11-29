import { IEmailVerificationRepository, VerificationCode } from "../auth/interfaces/IEmailVerificationRepository";
import { EmailVerification } from "./models/EmailVerification.model";

export class EmailVerificationRepository implements IEmailVerificationRepository{
    async saveCode(email: string, code: string, expiresAt: Date): Promise<void> {
        await EmailVerification.findOneAndUpdate(
            { email },
            { code, expiresAt, attempts: 0, createdAt: new Date() },
            { upsert: true, new: true }
        );
    }
    async findCode(email: string): Promise<VerificationCode | null> {
        const verification = await EmailVerification.findOne({ email });

        if (!verification){
            throw new Error('Can not find email verification code');
        }

        return {
            code: verification.code,
            expiresAt: verification.expiresAt,
            attempts: verification.attempts,
            createdAt: verification.createdAt
        };
    }

    async incrementAttempts(email: string): Promise<void> {
        await EmailVerification.updateOne(
            { email},
            { $inc: {attempts: 1} 
        });
    }

    async deleteCode(email: string): Promise<void> {
        await EmailVerification.deleteOne({ email });
    }

    async getRecentAttempts(email: string, timeframeMs: number): Promise<number> {
        const since = new Date(Date.now() - timeframeMs);

        const count = EmailVerification.countDocuments({
            email: email,
            createAt: { $gte: since }
        });
        return count;
    }
    
    async getLastSentTime(email: string): Promise<Date | null> {
        const lastVerification = await EmailVerification.findOne(
            { email },
            { createdAt: 1 }
        ).sort({ createdAt: -1 });
    
        return lastVerification?.createdAt || null;
    }

}