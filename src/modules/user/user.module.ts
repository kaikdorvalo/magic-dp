import { Module } from "@nestjs/common";
import { UserController } from "./presentation/controllers/user.controller";
import { Repositories } from "../../shared/constants/repositories.constants";
import { UserRepositoryImpl } from "./infrastructure/persistence/user.repository.impl";
import { CreateUserUseCase } from "./application/use-case/create-user.use-case";
import { UserService } from "./domain/services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
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
    ],
    exports: [
        {
            provide: Repositories.USER_REPOSITORY,
            useClass: UserRepositoryImpl
        },
        UserService
    ]
})
export class UserModule { }