import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { CreateDeckDto } from "src/shared/dtos/card/create-deck.dto";
import { GetCommanderUseCase } from "../../application/use-case/get-commander.use-case";
import { HttpExceptionFilter } from "src/shared/exceptions-filter/http-exception.exception-filter";
import { GenerateDeckUseCase } from "../../application/use-case/generate-deck.use-case";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "src/shared/dtos/user/create-user.dto";
import { AuthGuard } from "src/modules/auth/application/guards/auth.guard";

@Controller('cards')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
export class CardController {

    constructor(
        private generateDeckUseCase: GenerateDeckUseCase
    ) { }

    @Post('commander')
    @ApiBody({
        type: CreateDeckDto
    })
    async createDeck(@Body() createDeckDto: CreateDeckDto) {
        return await this.generateDeckUseCase.execute(createDeckDto);
    }

}