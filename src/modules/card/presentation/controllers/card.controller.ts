import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { CreateDeckDto } from "../../../../shared/dtos/card/create-deck.dto";
import { HttpExceptionFilter } from "../../../../shared/exceptions-filter/http-exception.exception-filter";
import { GenerateDeckUseCase } from "../../application/use-case/generate-deck.use-case";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../../../modules/auth/application/guards/auth.guard";
import { Request, response, Response } from "express";
import { GetDeckByIdUseCase } from "../../application/use-case/get-deck-by-id.use-case";
import { ExportDeckToJsonUseCase } from "../../application/use-case/export-deck-to-json.use-case";
import { ValidadeDeckUseCase } from "../../application/use-case/validate-deck-use-case";
import { request } from "http";
import { GetAllUserDecksUseCase } from "../../application/use-case/get-all-user-decks.use-case";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Deck } from "../../domain/schemas/deck.schema";
import { GetAllDecksUseCase } from "../../application/use-case/get-all-decks.use_case";
import { Roles } from "src/modules/user/application/decorators/roles.decorator";
import { Role } from "src/shared/enums/roles.enum";
import { RolesGuard } from "src/modules/user/application/guards/roles.guard";

@Controller('cards')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@ApiTags('Cards')
export class CardController {

    constructor(
        private generateDeckUseCase: GenerateDeckUseCase,
        private getDeckByIdUseCase: GetDeckByIdUseCase,
        private exportDeckToJsonUseCase: ExportDeckToJsonUseCase,
        private validadeDeckUseCase: ValidadeDeckUseCase,
        private getAllUserDecksUseCase: GetAllUserDecksUseCase,
        private getAllDecksUseCase: GetAllDecksUseCase,

        @Inject(CACHE_MANAGER) private cacheManager: Cache
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

    @Post('validate')
    importDeck(@Body() deckJson: any) {
        return this.validadeDeckUseCase.execute(deckJson);
    }

    @Get('decks/get/all')
    async getAllUserDecks(@Req() request: Request, @Res() response) {
        const cache: Deck[] = await this.cacheManager.get('user_cards')
        if (cache) {
            console.log(cache)
            if (cache[0].userId == request["user"].sub) {
                return response.status(200).send(cache);
            }
        }

        const result = await this.getAllUserDecksUseCase.execute(request["user"].sub);
        if (!cache && result.data.length > 0) {
            await this.cacheManager.set('user_cards', result.data, 30000)
        }
        return response.status(result.status).send(result.data);
    }

    @Get('decks/get/getall')
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    async getAllDecks(@Res() response: Response) {
        const decks = await this.getAllDecksUseCase.execute();
        return response.status(decks.status).send(decks.data);
    }
}