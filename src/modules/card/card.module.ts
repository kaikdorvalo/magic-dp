import { Module } from "@nestjs/common";
import { GetCommanderUseCase } from "./application/use-case/get-commander.use-case";
import { CardService } from "./domain/services/card.service";
import { CardController } from "./presentation/controllers/card.controller";
import { ScryfallApi } from "./application/api/scryfall-api";
import { GetBasicLandsByCommanderUseCase } from "./application/use-case/get-basic-lands-by-commander.use-case";
import { GetCardsByCommanderUseCase } from "./application/use-case/get-cards-by-commander.use-case";
import { GenerateDeckUseCase } from "./application/use-case/generate-deck.use-case";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        AuthModule
    ],
    providers: [
        ScryfallApi,
        CardService,
        GetCommanderUseCase,
        GetBasicLandsByCommanderUseCase,
        GetCardsByCommanderUseCase,
        GenerateDeckUseCase,
    ],
    controllers: [
        CardController
    ]
})
export class CardModule { }