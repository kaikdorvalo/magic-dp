import { Module } from "@nestjs/common";
import { UserController } from "./presentation/controllers/user.controller";
import { DatabaseModule } from "../database/database.module";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserRepositoryImpl } from "./infrastructure/persistence/user.repository.impl";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        {
            provide: Repositories.USER_REPOSITORY,
            useClass: UserRepositoryImpl
        }
    ],
    controllers: [
        UserController
    ]
})
export class UserModule { }