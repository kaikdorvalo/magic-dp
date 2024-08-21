import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { UserService } from "src/modules/user/domain/services/user.service";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserSignInDto } from "src/shared/dtos/user/user-signin.dto";

@Injectable()
export class UserSignInUseCase {
    constructor(
        private readonly userService: UserService,

        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository
    ) { }

    async execute(userSignIn: UserSignInDto) {

    }
}