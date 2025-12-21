import { IEmailService } from "../../domain/interfaces/IEmailService";
import { logger } from "../logging/GraylogLogger";

export class MockEmailService implements IEmailService{

    async sendVerificationCode(email: string, code: string): Promise<boolean> {
        const maskedEmail = this.maskEmail(email);

        logger.info('EMAIL_VERIFICATION_CODE_SENT', {
            service: 'email-verification',
            email: maskedEmail,
            codeLength: code.length,
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString()
        });

        if (process.env.NODE_ENV !== 'production') {
            logger.debug(`[DEV] Verification code for ${email}: ${code}`);
        }
        return true;
    }
    
    async sendWelcomeEmail(email: string, username: string): Promise<boolean> {
        logger.info('WELCOME_EMAIL_SENT', {
            service: 'email-welcome',
            email: this.maskEmail(email),
            username: username,
            timestamp: new Date().toISOString()
        });
        
        if (process.env.NODE_ENV !== 'production') {
            logger.debug(`[DEV] Welcome email to ${username} (${email})`);
        }
        return true;
    }

    async sendPasswordReset(email: string, token: string): Promise<boolean> {
        logger.info('PASSWORD_RESET_SENT', {
            service: 'email-password-reset',
            email: this.maskEmail(email),
            tokenHash: this.hashToken(token),
            timestamp: new Date().toISOString()
        });
        
        if (process.env.NODE_ENV !== 'production') {
            logger.debug(`[DEV] Password reset token for ${email}: ${token.substring(0, 8)}...`);
        }
        return true;
    }

    private maskEmail(email: string): string {
        const [name, domain] = email.split('@');
        return `${name[0]}***@${domain}`;
    }

    private hashToken(token: string): string {
        const crypto = require('crypto');
        return crypto.createHash('sha256')
            .update(token)
            .digest('hex')
            .substring(0, 8);
    }
}