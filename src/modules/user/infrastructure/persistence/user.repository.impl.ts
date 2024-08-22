import { User, UserDocument } from "../../domain/schemas/user.schema";
import { UserRepository } from "../../domain/repositories/user.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../../application/interfaces/user.interface";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    createUser(user: Partial<User>): UserDocument {
        return new this.userModel(user);
    }

    async saveUser(user: User): Promise<IUser> {
        const newUser = new this.userModel(user);
        const savedUser = await newUser.save();
        const object: IUser = savedUser.toObject();
        delete object.password;
        return object;
    }

    async getUserById(_id: string): Promise<IUser | null> {
        const user: IUser = await this.userModel.findById(_id);
        return user;
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email: email });
    }
}