import { Injectable } from "@nestjs/common";
import { ScryfallApi } from "../api/scryfall-api";
import { Card } from "../../domain/schemas/deck.schema";

@Injectable()
export class GetCardsByCommanderUseCase {
    constructor(
        private readonly scryfallApi: ScryfallApi
    ) { }

    async execute(commander: Card, cardsAmount: number): Promise<any[]> {
        const searchedCards = await this.scryfallApi.getCardsByCommander(commander, cardsAmount);
        const cards: Card[] = [];
        const cardsCount = searchedCards.length;

        for (let i = 0; i < cardsAmount; i++) {
            const randomNumber = Math.floor(Math.random() * cardsCount);
            cards.push(searchedCards[randomNumber]);
        }

        return cards;
    }
}