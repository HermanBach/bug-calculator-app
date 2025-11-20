import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User.entity";
import { UserModel } from "./models/User.model";

export class MongoUserRepository implements IUserRepository {

    private mapToEntity(user: any): User {
        return new User(user._id.toString(), user.login, user.email, user.password);
    }

    async findById(id: string): Promise<User | null> {
        const userDoc = await UserModel.findById(id);
        return userDoc ? this.mapToEntity(userDoc) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ email });
        return userDoc ? this.mapToEntity(userDoc) : null;
    }

    async findByLogin(login: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ login });
        return userDoc ? this.mapToEntity(userDoc) : null;
    }

    async save(user: User): Promise<User> {
        const userDoc = await UserModel.create({
            login: user.login,
            email: user.email,
            password: user.password,
        })
        return this.mapToEntity(userDoc);
    }

    async update(user: User): Promise<User> {
        const userDoc = await UserModel.findByIdAndUpdate(
            user.id,
            {
                login: user.login,
                email: user.email,
                password: user.password
            },
            {
                new: true
            });
        if (!userDoc){
            throw new Error("User not found");
        }
        return this.mapToEntity(userDoc);
    }
    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return !!result;
    }
}