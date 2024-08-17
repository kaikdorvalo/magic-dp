import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities/user.entity";

export interface UserRepository {
    createUser(entityLike: DeepPartial<User>): User

    saveUser(user: User): Promise<User>

    getUserById(id: number): Promise<User | null>

    getUserByEmail(email: string): Promise<User | null>
}