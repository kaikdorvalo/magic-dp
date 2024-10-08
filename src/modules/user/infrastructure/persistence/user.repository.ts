import { User, UserDocument } from "../../domain/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateWriteOpResult } from "mongoose";
import { IUser } from "../../application/interfaces/user.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    createUser(user: Partial<User>): UserDocument {
        return new this.userModel(user);
    }

    async saveUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        await newUser.save();
        newUser.password = undefined;
        return newUser;
    }

    async getUserById(_id: string): Promise<User | null> {
        const user: User = await this.userModel.findById(_id);
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email: email });
    }

    async updateUser(_id: string, user: Partial<User>): Promise<UpdateWriteOpResult> {
        return await this.userModel.updateOne({ _id: _id }, user);
    }
}