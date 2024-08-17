import { DataSource, DeepPartial, Repository } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Inject } from "@nestjs/common";
import { DataSources } from "src/shared/constants/datasources.constants";

export class UserRepositoryImpl extends Repository<User> implements UserRepository {
    constructor(
        @Inject(DataSources.PUBLIC_DATASOURCE)
        private dataSource: DataSource
    ) {
        super(User, dataSource.createEntityManager())
    }

    createUser(entityLike: DeepPartial<User>): User {
        return this.create(entityLike);
    }

    async saveUser(user: DeepPartial<User>): Promise<User> {
        return await this.save(user);
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.findOneBy({ id: id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.findOneBy({ email: email });
    }
}