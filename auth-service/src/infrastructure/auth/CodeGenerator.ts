export class CodeGenerator{
    generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    generateExpiryDate(minutes: number = 15): Date {
        return new Date(Date.now() + minutes * 60 * 1000);
    }
    
    generatePasswordResetToken(): string {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }
}