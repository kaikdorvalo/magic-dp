import { Module } from "@nestjs/common";
import { UserController } from "./presentation/controllers/user.controller";
import { DatabaseModule } from "../database/database.module";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserRepositoryImpl } from "./infrastructure/persistence/user.repository.impl";
import { CreateUserUseCase } from "./application/use-case/create-user.use-case";
import { UserService } from "./domain/services/user.service";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        UserService,
        CreateUserUseCase,
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