import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export interface UserRepository {
    getUserById(id: number): Promise<User | null>
}