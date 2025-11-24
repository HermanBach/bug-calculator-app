export class User {
    constructor(
        public id: string,
        public login: string,
        public email: string,
        public password: string,
        public isActive: boolean
    ) {}

    isValidLogin(): boolean {
        return this.login.length >= 3 && 
               /^[a-zA-Z0-9_]+$/.test(this.login);
    }

    isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    isValidPassword(): boolean {
        return this.password.length >= 8 && 
               /[A-Z]/.test(this.password) && 
               /[0-9]/.test(this.password);
    }

    isValidUser(): boolean {
        return this.isValidLogin() && 
               this.isValidEmail() &&
               this.isValidPassword();
    }

    isUserActive(): boolean {
        return this.isActive;
    }


    getValidationErrors(): string[] {
        const errors: string[] = [];
        
        if (!this.isValidLogin()) {
            errors.push("Login must be at least 3 characters long and can only contain letters, numbers and underscores");
        }

        if (!this.isValidEmail()) {
            errors.push("Invalid email format");
        }
        if (!this.isValidPassword()) {
            errors.push("Password must be at least 8 characters long and must contain at least one uppercase letter and must contain at least one number");
        }
        
        return errors;
    }
}