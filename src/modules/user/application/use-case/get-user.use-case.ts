import { ResponseData } from "src/shared/utils/response-data";
import { UserRepository } from "../../infrastructure/persistence/user.repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class GetUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(id: string) {
        const user: IUser = await this.userRepository.getUserById(id);
        user.password = undefined;
        return new ResponseData(
            HttpStatus.FOUND,
            user
        )
    }
}