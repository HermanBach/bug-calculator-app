import bcrypt from 'bcrypt';
import { IPasswordService } from '../../domain/interfaces/IPasswordService';

export class PasswordService implements IPasswordService {

    async hashPassword(password: string): Promise<string>{
        const saltRounds = process.env.SALTROUNDS;

        if (!saltRounds){
            throw new Error('❌ SALTROUND is not defined in environment variables');
        }

        const saltRoundNumber = parseInt(saltRounds, 10);

        if (isNaN(saltRoundNumber)) {
            throw new Error('❌ SALTROUNDS must be a valid number');
        }

        return await bcrypt.hash(password, saltRoundNumber);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword);
    }

}