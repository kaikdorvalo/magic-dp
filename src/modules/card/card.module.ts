import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { GetCommanderUseCase } from "./application/use-case/get-commander.use-case";
import { CardService } from "./domain/services/card.service";
import { CardController } from "./presentation/controllers/card.controller";
import { ScryfallApi } from "./application/api/scryfall-api";

@Module({
    imports: [
        DatabaseModule
    ],
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