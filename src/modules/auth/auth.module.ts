import { Module } from "@nestjs/common";
import { AuthController } from "./presentation/auth.controller";
import { AuthService } from "./domain/service/auth.service";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        UserModule,
    ],
    providers: [
        AuthService,
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule { }