import { DataSource, DeepPartial, Repository } from "typeorm";
import { User, UserDocument } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Inject } from "@nestjs/common";
import { DataSources } from "src/shared/constants/datasources.constants";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    createUser(user: Partial<User>): UserDocument {
        return new this.userModel(user);
    }

    async saveUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        const savedUser = await newUser.save();
        const object = savedUser.toObject();
        delete object.password;
        return object;
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userModel.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email: email });
    }
}