import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/shared/dtos/user/create-user.dto";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserService } from "../../domain/services/user.service";
import { ResponseData } from "src/shared/utils/response-data";
import { UserAlreadyExistsException } from "src/shared/exceptions/user/user-already-exists.exception";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userService: UserService,

        @Inject(Repositories.USER_REPOSITORY)
        private userRepository: UserRepository
    ) { }

    async execute(createUserDto: CreateUserDto) {
        try {
            const user = await this.userRepository.getUserByEmail(createUserDto.email);

            if (user != null) {
                throw new UserAlreadyExistsException()
            }

            const newUser = this.userRepository.createUser(createUserDto);
            newUser.password = await this.userService.hashPassword(newUser.password);
            await this.userRepository.saveUser(newUser)
            const savedUser = { ...newUser, password: undefined }

            return new ResponseData(
                HttpStatus.CREATED,
                savedUser
            )
        } catch (err: any) {
            httpExceptionHandler(err);
        }
    }
}