import { Injectable } from "@nestjs/common";
import { ScryfallApi } from "../api/scryfall-api";
import { Card } from "../../domain/schemas/deck.schema";


@Injectable()
export class GetBasicLandsByCommanderUseCase {
    constructor(
        private scryfallApi: ScryfallApi
    ) { }

    async execute(commander: Card) {
        const lands: Card[] = await this.scryfallApi.getLands();
        const validBasicLands: Card[] = [];

        lands.forEach((card) => {
            if (commander.colors.includes(card.color_identity[0])) {
                validBasicLands.push(card);
            }
        })

        return validBasicLands;
    }
}