import { Body, Controller, Post, Res, UseFilters } from "@nestjs/common";
import { UserSignInUseCase } from "../application/use-case/user-signin.use-case";
import { UserSignInDto } from "src/shared/dtos/user/user-signin.dto";
import { HttpExceptionFilter } from "src/shared/exceptions-filter/http-exception.exception-filter";
import { Response } from "express";


@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
    constructor(
        private readonly userSignInUseCase: UserSignInUseCase
    ) { }

    @Post('login')
    async signIn(@Body() userSignIn: UserSignInDto, @Res() response: Response) {
        const result = await this.userSignInUseCase.execute(userSignIn)
        return response.status(result.status).send(result.data);
    }
}