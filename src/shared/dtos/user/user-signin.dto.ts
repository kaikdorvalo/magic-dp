import { IsNotEmpty, IsString } from "class-validator"

export class UserSignInDto {

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}