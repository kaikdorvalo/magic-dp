import { Injectable } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class UserService {

    async hashPassword(password: string): Promise<string | null> {
        if (typeof password !== 'string') return null;
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(password, salt);
        return hashedPassword
    }

}