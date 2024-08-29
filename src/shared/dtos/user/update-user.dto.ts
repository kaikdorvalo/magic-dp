import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({
        description: 'User name'
    })
    name: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'User email'
    })
    email: string;
}