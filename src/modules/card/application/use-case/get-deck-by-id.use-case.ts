import { HttpStatus, Injectable } from "@nestjs/common";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository.impl";
import { DeckNotFoundException } from "src/shared/exceptions/card/deck-not-found.exception";
import { ResponseData } from "src/shared/utils/response-data";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";

@Injectable()
export class GetDeckByIdUseCase {
    constructor(
        private readonly cardRepository: CardRepositroy
    ) { }

    async execute(_id: string, userId: string) {
        try {
            const deck = await this.cardRepository.getById(_id);
            if (!deck) {
                throw new DeckNotFoundException()
            }
            if (deck.userId !== userId) {
                throw new DeckNotFoundException()
            }

            return new ResponseData(
                HttpStatus.FOUND,
                deck
            )
        } catch (err: any) {
            httpExceptionHandler(err);
        }
    }
}