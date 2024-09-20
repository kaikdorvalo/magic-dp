import { Module } from "@nestjs/common";
import { GetCommanderUseCase } from "./application/use-case/get-commander.use-case";
import { CardService } from "./domain/services/card.service";
import { CardController } from "./presentation/controllers/card.controller";
import { ScryfallApi } from "./application/api/scryfall-api";
import { GetBasicLandsByCommanderUseCase } from "./application/use-case/get-basic-lands-by-commander.use-case";
import { GetCardsByCommanderUseCase } from "./application/use-case/get-cards-by-commander.use-case";
import { GenerateDeckUseCase } from "./application/use-case/generate-deck.use-case";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Deck, DeckSchema } from "./domain/schemas/deck.schema";
import { CardRepositroy } from "./infrastructure/persistence/card.repository";
import { GetDeckByIdUseCase } from "./application/use-case/get-deck-by-id.use-case";
import { ExportDeckToJsonUseCase } from "./application/use-case/export-deck-to-json.use-case";
import { ValidadeDeckUseCase } from "./application/use-case/validate-deck-use-case";
import { GetAllUserDecksUseCase } from "./application/use-case/get-all-user-decks.use-case";
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        AuthModule,
        UserModule,
        MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
        CacheModule.register()
    ],
    providers: [
        ScryfallApi,
        CardService,
        CardRepositroy,
        GetCommanderUseCase,
        GetBasicLandsByCommanderUseCase,
        GetCardsByCommanderUseCase,
        GenerateDeckUseCase,
        GetDeckByIdUseCase,
        ExportDeckToJsonUseCase,
        ValidadeDeckUseCase,
        GetAllUserDecksUseCase
    ],
    controllers: [
        CardController
    ]
})
export class CardModule { }