import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "../../../../shared/exceptions-filter/http-exception.exception-filter";
import { CreateUserUseCase } from "../../application/use-case/create-user.use-case";
import { CreateUserDto } from "../../../../shared/dtos/user/create-user.dto";
import { Request, Response } from "express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserUseCase } from "../../application/use-case/get-user.use-case";
import { AuthGuard } from "src/modules/auth/application/guards/auth.guard";
import { UpdateUserDto } from "src/shared/dtos/user/update-user.dto";
import { UpdateUserUseCase } from "../../application/use-case/update-user.use-case";
import { Roles } from "../../application/decorators/roles.decorator";
import { Role } from "src/shared/enums/roles.enum";
import { RolesGuard } from '../../application/guards/roles.guard';


@Controller('users')
@UseFilters(new HttpExceptionFilter())
@ApiTags('User')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase
    ) { }

    @Post('create')
    @ApiBody({
        type: CreateUserDto
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'User created' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        console.log(createUserDto)
        const result = await this.createUserUseCase.execute(createUserDto);
        return res.status(result.status).send(result.data);
    }

    @Get('get')
    @UseGuards(AuthGuard)
    async getUser(@Res() response: Response, @Req() request: Request) {
        const result = await this.getUserUseCase.execute(request["user"].sub);
        return response.status(result.status).send(result.data);
    }

    @Post('update')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async updateUser(@Body() updateUser: UpdateUserDto, @Res() response: Response, @Req() request: Request) {
        const result = await this.updateUserUseCase.execute(updateUser, request["user"].sub);
        return response.status(result.status).send(result.data);
    }
}