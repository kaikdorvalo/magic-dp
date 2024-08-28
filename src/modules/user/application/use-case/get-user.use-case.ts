import { ResponseData } from "src/shared/utils/response-data";
import { UserRepository } from "../../infrastructure/persistence/user.repository";
import { HttpStatus } from "@nestjs/common";

export class GetUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(id: string) {
        const user = await this.userRepository.getUserById(id);
        return new ResponseData(
            HttpStatus.FOUND,
            user
        )
    }
}