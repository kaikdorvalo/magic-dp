import { Body, Controller, Post } from "@nestjs/common";
import { UserSignInUseCase } from "../application/use-case/user-signin.use-case";
import { UserSignInDto } from "src/shared/dtos/user/user-signin.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly userSignInUseCase: UserSignInUseCase
    ) { }

    @Post('login')
    async signIn(@Body() userSignIn: UserSignInDto) {
        const res = await this.userSignInUseCase.execute(userSignIn)
        console.log(res)
    }
}