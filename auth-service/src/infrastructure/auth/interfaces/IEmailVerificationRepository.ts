export interface IEmailVerificationRepository{
    saveCode(email: string, code: string, expiresAt: Date): Promise<void>;
    findCode(email: string): Promise<VerificationCode | null>;
    incrementAttempts(email: string): Promise<void>;
    deleteCode(email: string): Promise<void>;

    getRecentAttempts(email: string, timeframeMs: number): Promise<number>;
    getLastSentTime(email: string): Promise<Date | null>;
}

export interface VerificationCode {
    code?: string;
    expiresAt?: Date;
    attempts?: number;
    createdAt?: Date;
}