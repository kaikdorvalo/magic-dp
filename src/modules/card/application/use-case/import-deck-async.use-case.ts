import { Injectable } from "@nestjs/common";
import { Card } from "../../domain/schemas/deck.schema";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository";

@Injectable()
export class ImportDeckAsyncUseCase {

    constructor(
        private cardRepository: CardRepositroy
    ) { }

    async execute(deck: Card[]) {
        let landsAmount = this.landsCounter(deck)
        let commanderName = deck[0].name
        const result = this.persistDeck(deck[0], landsAmount, deck, '')
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

    landsCounter(deck: Card[]) {
        let cont = 0;
        for (let card of deck) {
            if (card.type_line.split(" ").includes("Land")) cont++;
        }
        return cont
    }
}