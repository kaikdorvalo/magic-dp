import { HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../../domain/schemas/user.schema";
import { UserRepository } from "../../infrastructure/persistence/user.repository";
import { UpdateUserDto } from "src/shared/dtos/user/update-user.dto";
import { ResponseData } from "src/shared/utils/response-data";

@Injectable()
export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(user: UpdateUserDto, requestedUser: string) {
        const exists = await this.userRepository.getUserById(requestedUser)

        if (!exists) {
            // exception
        }

        if (user.email !== exists.email) {
            const newEmailExists = await this.userRepository.getUserByEmail(user.email);

            if (newEmailExists) {
                // exception email em uso
            }
        }

        const updated = await this.userRepository.updateUser(requestedUser, user);

        return new ResponseData(
            HttpStatus.OK,
            updated
        )
    }
}