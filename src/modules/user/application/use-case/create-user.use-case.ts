import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../../../shared/dtos/user/create-user.dto";
import { Repositories } from "../../../../shared/constants/repositories.constants";
import { UserService } from "../../domain/services/user.service";
import { ResponseData } from "../../../../shared/utils/response-data";
import { UserAlreadyExistsException } from "../../../../shared/exceptions/user/user-already-exists.exception";
import { httpExceptionHandler } from "../../../../shared/utils/exception-handler";
import { UserRepository } from "../../infrastructure/persistence/user.repository";
import { Role } from "src/shared/enums/roles.enum";

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userService: UserService,
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
            newUser.roles = [Role.USER];

            console.log(newUser)
            const save = await this.userRepository.saveUser(newUser)
            console.log(save)

            return new ResponseData(
                HttpStatus.CREATED,
                save
            )
        } catch (err: any) {
            httpExceptionHandler(err);
        }
    }
}