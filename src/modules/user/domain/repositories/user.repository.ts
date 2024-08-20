import { DeepPartial, Repository } from "typeorm";
import { User, UserDocument } from "../schemas/user.schema";

export interface UserRepository {
    createUser(user: Partial<User>): UserDocument

    saveUser(user: User): Promise<User>

    getUserById(id: number): Promise<User | null>

    getUserByEmail(email: string): Promise<User | null>
}