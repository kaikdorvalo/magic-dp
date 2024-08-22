import { Module } from "@nestjs/common";
import { AuthController } from "./presentation/auth.controller";
import { AuthService } from "./domain/service/auth.service";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config"
import { UserSignInUseCase } from "./application/use-case/user-signin.use-case";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_TOKEN,
            signOptions: { expiresIn: '5m' },
        }),
    ],
    providers: [
        AuthService,
        UserSignInUseCase
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule { }