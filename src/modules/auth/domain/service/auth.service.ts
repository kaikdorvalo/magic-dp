import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/modules/user/domain/schemas/user.schema";
import "dotenv/config"
import { UnauthorizedException } from "src/shared/exceptions/auth/unauthorized.exception";
import { Role } from "src/shared/enums/roles.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async comparePassword(receivedPassword: string, password: string) {
        return await bcrypt.compare(receivedPassword, password)
    }

    async generateJwtToken(userId: string, roles: Role[]) {
        const payload = { sub: userId, roles: roles }


        return await this.jwtService.signAsync(payload);
    }
}