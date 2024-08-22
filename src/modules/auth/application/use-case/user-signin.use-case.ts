import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { UserService } from "src/modules/user/domain/services/user.service";
import { Repositories } from "src/shared/constants/repositories.constants";
import { UserSignInDto } from "src/shared/dtos/user/user-signin.dto";
import { AuthService } from "../../domain/service/auth.service";

@Injectable()
export class UserSignInUseCase {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,

        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository
    ) { }

    async execute(userSignIn: UserSignInDto) {
        const user = await this.userRepository.getUserByEmail(userSignIn.email);

        if (user == null) {
            throw new UnauthorizedException();
        }

        if (!(await this.authService.comparePassword(userSignIn.password, user.password))) {
            throw new UnauthorizedException();
        }

        return {
            access_token: this.authService.generateJwtToken(user._id)
        }


    }
}