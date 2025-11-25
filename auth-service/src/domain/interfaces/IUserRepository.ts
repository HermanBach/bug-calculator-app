import { User } from "../entities/User.entity"
import { UpdateUserData } from "../../presentation/dto/UpdateUserData";

export interface IUserRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findByLogin(login: string): Promise<User | null>

    findByGithubId(githubId: string): Promise<User | null>

    save(user: User):Promise<User>
    update(id: string, data: UpdateUserData ):Promise<User>

    deactivate(id: string): Promise<boolean>
}