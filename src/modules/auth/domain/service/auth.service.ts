import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/modules/user/domain/schemas/user.schema";
import "dotenv/config"
import { UnauthorizedException } from "src/shared/exceptions/auth/unauthorized.exception";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async comparePassword(receivedPassword: string, password: string) {
        return await bcrypt.compare(receivedPassword, password)
    }

    async generateJwtToken(userId: string) {
        const payload = { sub: userId }

        return await this.jwtService.signAsync(payload);
    }

    async decodeToken(token: string) {
        try {
            const decode = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_TOKEN
                }
            )

            return decode;
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
}