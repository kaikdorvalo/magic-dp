import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator"
import { Role } from "src/shared/enums/roles.enum";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({
        description: 'User name'
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'User email'
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty({
        description: 'User password'
    })
    password: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        description: 'User roles'
    })
    roles: Role[];
}