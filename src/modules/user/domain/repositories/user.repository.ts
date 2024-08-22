import { User, UserDocument } from "../schemas/user.schema";
import { IUser } from "../../application/interfaces/user.interface";

export interface UserRepository {
    createUser(user: Partial<User>): UserDocument

    saveUser(user: User): Promise<IUser>

    getUserByEmail(email: string): Promise<IUser | null>

    getUserById(_id: string): Promise<IUser | null>
}