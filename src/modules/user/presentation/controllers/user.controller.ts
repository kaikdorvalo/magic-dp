import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "../../../../shared/exceptions-filter/http-exception.exception-filter";
import { CreateUserUseCase } from "../../application/use-case/create-user.use-case";
import { CreateUserDto } from "../../../../shared/dtos/user/create-user.dto";
import { Request, Response } from "express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserUseCase } from "../../application/use-case/get-user.use-case";
import { AuthGuard } from "src/modules/auth/application/guards/auth.guard";


@Controller('users')
@UseFilters(new HttpExceptionFilter())
@ApiTags('User')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase
    ) { }

    @Post('create')
    @ApiBody({
        type: CreateUserDto
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'User created' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const result = await this.createUserUseCase.execute(createUserDto);
        return res.status(result.status).send(result.data);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUser(@Res() response: Response, @Req() request: Request) {
        const result = await this.getUserUseCase.execute(request["user"].sub);
        return response.status(result.status).send(result.data);
    }
}