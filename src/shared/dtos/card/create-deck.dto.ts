import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDeckDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Commander name"
    })
    commanderName: string;

    @IsNumber()
    @ApiProperty({
        description: 'The number of lands required',
    })
    landsAmount: number
}