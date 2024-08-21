import { Injectable } from "@nestjs/common";
import { GetCommanderUseCase } from "./get-commander.use-case";
import { GetBasicLandsByCommanderUseCase } from "./get-basic-lands-by-commander.use-case";
import { CreateDeckDto } from "src/shared/dtos/card/create-deck.dto";
import { CardService } from "../../domain/services/card.service";
import { InvalidLandsAmountException } from "src/shared/exceptions/card/invalid-lands-amount.exception";
import { Card } from "../../domain/schemas/deck.schema";
import { GetCardsByCommanderUseCase } from "./get-cards-by-commander.use-case";

@Injectable()
export class GenerateDeckUseCase {
    constructor(
        private readonly cardService: CardService,

        private readonly getCommanderUseCase: GetCommanderUseCase,
        private readonly getBasicLandsUseCase: GetBasicLandsByCommanderUseCase,
        private readonly getCardsByCommanderUseCase: GetCardsByCommanderUseCase
    ) { }

    async execute(createDeckDto: CreateDeckDto) {
        const commander = await this.getCommanderUseCase.execute(createDeckDto.commanderName)
        const availableBasicLands = await this.getBasicLandsUseCase.execute(commander);

        if (!this.cardService.validateLandsAmount(createDeckDto.landsAmount)) {
            throw new InvalidLandsAmountException();
        }

        const lands: Card[] = this.cardService.randomLands(availableBasicLands, createDeckDto.landsAmount);
        const searchAmount = 99 - lands.length;
        let searchedCards: Card[] = [];

        if (searchAmount > 0) {
            searchedCards = await this.getCardsByCommanderUseCase.execute(commander, searchAmount);
            console.log(searchedCards.length)

            for (let card of searchedCards) {
                if (card.type_line.includes('Legendary Creature')) {
                    console.log('lendaria')
                }
            }
            return [
            ]
        }

        // console.log(lands.length)
        // return lands;
        // return commander;
    }
}