import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeckDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Commander name"
    })
    commanderName: string
}