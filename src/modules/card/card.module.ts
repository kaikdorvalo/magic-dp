import { Module } from "@nestjs/common";
import { GetCommanderUseCase } from "./application/use-case/get-commander.use-case";
import { CardService } from "./domain/services/card.service";
import { CardController } from "./presentation/controllers/card.controller";
import { ScryfallApi } from "./application/api/scryfall-api";

@Module({
    providers: [
        ScryfallApi,
        CardService,
        GetCommanderUseCase
    ],
    controllers: [
        CardController
    ]
})
export class CardModule { }