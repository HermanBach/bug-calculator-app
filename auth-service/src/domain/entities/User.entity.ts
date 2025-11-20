export class User {
    constructor(
        public id: string,
        public login: string,
        public email: string,
        public password: string
    ) {}

    isValivEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    isValidPassword(): boolean {
        return this.password.length > 8;
    }

    isValidUser(): boolean {
        return this.isValivEmail() && this.isValidPassword();
    }
}