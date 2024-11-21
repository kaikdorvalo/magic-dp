import { Injectable } from "@nestjs/common";
import { Card, Deck } from "../../domain/schemas/deck.schema";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository";
import { SendImportedDeckMessage } from "./send-imported-deck-message.use-case";

@Injectable()
export class ImportDeckAsyncUseCase {

    constructor(
        private cardRepository: CardRepositroy,
        private sendImportedDeckMessage: SendImportedDeckMessage
    ) { }

    async execute(deck: Card[], userId: string) {
        let landsAmount = this.landsCounter(deck)
        const result = await this.persistDeck(deck[0], landsAmount, deck, userId)
        this.sendImportedDeckMessage.execute(result._id)
    }

    private async persistDeck(commander: Card, landsAmount: number, deck: Card[], userId: string): Promise<any> {
        const newDeck = this.cardRepository.createDeck({
            userId: userId,
            commander: commander.name,
            lands: landsAmount,
            cards: deck
        });

        const savedDeck: Deck = await this.cardRepository.saveDeck(newDeck);

        return savedDeck;
    }

    landsCounter(deck: Card[]) {
        let cont = 0;
        for (let card of deck) {
            if (card.type_line.split(" ").includes("Land")) cont++;
        }
        return cont
    }
}