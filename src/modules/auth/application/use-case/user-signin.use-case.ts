import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignInDto } from "src/shared/dtos/user/user-signin.dto";
import { AuthService } from "../../domain/service/auth.service";
import { ResponseData } from "src/shared/utils/response-data";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { UserRepository } from "src/modules/user/infrastructure/persistence/user.repository";

@Injectable()
export class UserSignInUseCase {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository
    ) { }

    async execute(userSignIn: UserSignInDto) {
        try {
            const user = await this.userRepository.getUserByEmail(userSignIn.email);

            if (user == null) {
                throw new UnauthorizedException();
            }

            if (!(await this.authService.comparePassword(userSignIn.password, user.password))) {
                throw new UnauthorizedException();
            }

            return new ResponseData(
                HttpStatus.OK,
                {
                    access_token: await this.authService.generateJwtToken(user._id)
                }
            )
        } catch (err: any) {
            httpExceptionHandler(err);
        }
    }
}