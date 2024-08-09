import { DataSource, Repository } from "typeorm";
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

    getUserById(id: number): Promise<User | null> {
        return this.findOneBy({ id: id });
    }
}