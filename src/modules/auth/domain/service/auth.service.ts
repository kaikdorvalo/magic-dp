import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/modules/user/domain/schemas/user.schema";

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
}