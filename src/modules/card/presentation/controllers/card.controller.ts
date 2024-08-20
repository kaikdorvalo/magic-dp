import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { CreateDeckDto } from "src/shared/dtos/card/create-deck.dto";
import { GetCommanderUseCase } from "../../application/use-case/get-commander.use-case";
import { HttpExceptionFilter } from "src/shared/exceptions-filter/http-exception.exception-filter";

@Controller('cards')
@UseFilters(new HttpExceptionFilter())
export class CardController {

    constructor(
        private getCommanderUseCase: GetCommanderUseCase
    ) { }

    @Post('commander')
    async createDeck(@Body() createDeckDto: CreateDeckDto) {
        return await this.getCommanderUseCase.execute(createDeckDto.commanderName);
    }

}