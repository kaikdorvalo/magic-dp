import { DataSource, DeepPartial, Repository } from "typeorm";
import { User, UserDocument } from "../../domain/schemas/user.schema";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Inject } from "@nestjs/common";
import { DataSources } from "src/shared/constants/datasources.constants";
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

    async getUserById(id: number): Promise<IUser | null> {
        return await this.userModel.findById(id);
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email: email });
    }
}