import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GetCommanderUseCase } from "./get-commander.use-case";
import { GetBasicLandsByCommanderUseCase } from "./get-basic-lands-by-commander.use-case";
import { CreateDeckDto } from "src/shared/dtos/card/create-deck.dto";
import { CardService } from "../../domain/services/card.service";
import { InvalidLandsAmountException } from "src/shared/exceptions/card/invalid-lands-amount.exception";
import { Card, Deck } from "../../domain/schemas/deck.schema";
import { GetCardsByCommanderUseCase } from "./get-cards-by-commander.use-case";
import { IUser } from "src/modules/user/application/interfaces/user.interface";
import { Request } from "express";
import { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { Repositories } from "src/shared/constants/repositories.constants";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository.impl";
import { ResponseData } from "src/shared/utils/response-data";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";

@Injectable()
export class GenerateDeckUseCase {
    constructor(
        private readonly cardService: CardService,

        private readonly getCommanderUseCase: GetCommanderUseCase,
        private readonly getBasicLandsUseCase: GetBasicLandsByCommanderUseCase,
        private readonly getCardsByCommanderUseCase: GetCardsByCommanderUseCase,

        private readonly cardRepository: CardRepositroy,

        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository
    ) { }

    async execute(createDeckDto: CreateDeckDto, request: Request) {
        try {
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

                for (let card of searchedCards) {
                    if (card.type_line.includes('Legendary Creature')) {
                        console.log('lendaria')
                    }
                }
            }

            const deck: Card[] = this.buildDeck(commander, lands, searchedCards);
            console.log(deck.length);

            const requestUser = request["user"];
            const user = await this.userRepository.getUserById(requestUser.sub);

            const savedDeck = await this.persistDeck(commander, lands.length, deck, user._id);

            return new ResponseData(
                HttpStatus.CREATED,
                savedDeck
            )
        } catch (err: any) {
            httpExceptionHandler(err)
        }
    }

    private buildDeck(commander: Card, lands: Card[], cards: Card[]): Card[] {
        const deck: Card[] = [];

        deck.push(commander);

        for (let land of lands) {
            deck.push(land);
        }

        for (let card of cards) {
            deck.push(card);
        }

        return deck
    }

    private async persistDeck(commander: Card, landsAmount: number, deck: Card[], userId: string): Promise<any> {
        const newDeck = this.cardRepository.createDeck({
            userId: userId,
            commander: commander.name,
            lands: landsAmount,
            cards: deck
        });

        const savedDeck = await this.cardRepository.saveDeck(newDeck);

        return savedDeck;
    }
}