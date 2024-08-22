import { DeepPartial, Repository } from "typeorm";
import { User, UserDocument } from "../schemas/user.schema";
import { IUser } from "../../application/interfaces/user.interface";

export interface UserRepository {
    createUser(user: Partial<User>): UserDocument

    saveUser(user: User): Promise<IUser>

    getUserById(id: number): Promise<IUser | null>

    getUserByEmail(email: string): Promise<IUser | null>
}