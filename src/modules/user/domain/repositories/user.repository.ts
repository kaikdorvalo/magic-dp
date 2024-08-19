import { DeepPartial, Repository } from "typeorm";
import { User, UserDocument } from "../entities/user.entity";

export interface UserRepository {
    createUser(user: Partial<User>): UserDocument

    saveUser(user: User): Promise<User>

    getUserById(id: number): Promise<User | null>

    getUserByEmail(email: string): Promise<User | null>
}