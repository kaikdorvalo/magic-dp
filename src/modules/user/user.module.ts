import { Module } from "@nestjs/common";
import { UserController } from "./presentation/controllers/user.controller";
import { UserRepository } from "./infrastructure/persistence/user.repository";
import { CreateUserUseCase } from "./application/use-case/create-user.use-case";
import { UserService } from "./domain/services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/schemas/user.schema";
import { GetUserUseCase } from "./application/use-case/get-user.use-case";
import { UpdateUserUseCase } from "./application/use-case/update-user.use-case";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [
        UserService,
        CreateUserUseCase,
        UserRepository,
        GetUserUseCase,
        UpdateUserUseCase,
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserRepository,
        UserService
    ]
})
export class UserModule { }