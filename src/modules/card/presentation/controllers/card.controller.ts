import { Body, Controller, Get, Param, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { CreateDeckDto } from "../../../../shared/dtos/card/create-deck.dto";
import { HttpExceptionFilter } from "../../../../shared/exceptions-filter/http-exception.exception-filter";
import { GenerateDeckUseCase } from "../../application/use-case/generate-deck.use-case";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../../../modules/auth/application/guards/auth.guard";
import { Request, response, Response } from "express";
import { GetDeckByIdUseCase } from "../../application/use-case/get-deck-by-id.use-case";
import { ExportDeckToJsonUseCase } from "../../application/use-case/export-deck-to-json.use-case";
import { request } from "http";
import { GetAllUserDecksUseCase } from "../../application/use-case/get-all-user-decks.use-case";

@Controller('cards')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@ApiTags('Cards')
export class CardController {

    constructor(
        private generateDeckUseCase: GenerateDeckUseCase,
        private getDeckByIdUseCase: GetDeckByIdUseCase,
        private exportDeckToJsonUseCase: ExportDeckToJsonUseCase,
        private getAllUserDecksUseCase: GetAllUserDecksUseCase
    ) { }

    @Post('commander')
    @ApiBody({
        type: CreateDeckDto
    })
    async createDeck(@Body() createDeckDto: CreateDeckDto, @Req() request: Request, @Res() response: Response) {
        const result = await this.generateDeckUseCase.execute(createDeckDto, request["user"].sub);
        return response.send(result)
    }

    @Get('decks/:id')
    async getDeckById(@Param('id') id: string, @Req() request: Request, @Res() response: Response) {
        const result = await this.getDeckByIdUseCase.execute(id, request["user"].sub);
        return response.status(result.status).send(result.data);
    }

    @Get('decks/exports/:id')
    async exportDeckToJson(@Param('id') id: string, @Req() request: Request, @Res() response: Response) {
        const result = await this.exportDeckToJsonUseCase.execute(id, request["user"].sub);
        return response.status(result.status).send(result.data)
    }

    @Get('decks/get/all')
    async getAllUserDecks(@Req() request: Request, @Res() response) {
        console.log(request["user"].sub)
        const result = await this.getAllUserDecksUseCase.execute(request["user"].sub);
        return response.status(result.status).send(result.data);
    }

}