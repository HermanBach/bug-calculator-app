import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User.entity";
import { UserModel } from "./models/User.model";
import { UpdateUserData } from "../../presentation/dto/UpdateUserData";

export class MongoUserRepository implements IUserRepository {

    private mapToEntity(user: any): User {
        return new User(user._id.toString(), user.login, user.email, user.password, user.isActive, user.githubId);
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

    async findByGithubId(githubId: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ githubId });
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

    async update(id: string, data: UpdateUserData): Promise<User> {
        const userDoc = await UserModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            });

        if (!userDoc){
            throw new Error("User not found");
        }
        return this.mapToEntity(userDoc);
    }

    async deactivate(id: string): Promise<boolean> {
        const userDoc = await UserModel.findByIdAndUpdate(
            id,
            {
                isActive: false
            },
            {
                new: true
            });
        return !!userDoc;
    }
}