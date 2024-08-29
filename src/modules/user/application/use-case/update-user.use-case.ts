import { HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../../infrastructure/persistence/user.repository";
import { UpdateUserDto } from "src/shared/dtos/user/update-user.dto";
import { ResponseData } from "src/shared/utils/response-data";
import { UserNotFoundException } from "src/shared/exceptions/user/user-not-found.exception";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { EmailAlreadyExists } from "src/shared/exceptions/user/email-already-exists.exception";

@Injectable()
export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(user: UpdateUserDto, requestedUser: string) {
        try {
            const exists = await this.userRepository.getUserById(requestedUser)

            if (!exists) {
                throw new UserNotFoundException();
            }

            if (user.email !== exists.email) {
                const newEmailExists = await this.userRepository.getUserByEmail(user.email);

                if (newEmailExists) {
                    throw new EmailAlreadyExists();
                }
            }

            const updated = await this.userRepository.updateUser(requestedUser, user);

            return new ResponseData(
                HttpStatus.OK,
                updated
            )
        } catch (err: any) {
            httpExceptionHandler(err);
        }
    }
}