import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator"

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
}