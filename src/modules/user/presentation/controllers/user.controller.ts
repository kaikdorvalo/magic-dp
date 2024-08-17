import { Body, Controller, HttpStatus, Post, Res, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/shared/exceptions-filter/http-exception.exception-filter";
import { CreateUserUseCase } from "../../application/use-case/create-user.use-case";
import { CreateUserDto } from "src/shared/dtos/user/create-user.dto";
import { Response } from "express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller('users')
@UseFilters(new HttpExceptionFilter())
@ApiTags('User')
export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
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
}