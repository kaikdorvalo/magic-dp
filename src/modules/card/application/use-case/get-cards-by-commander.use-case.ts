import { Injectable } from "@nestjs/common";
import { ScryfallApi } from "../api/scryfall-api";
import { Card } from "../../domain/schemas/deck.schema";

@Injectable()
export class GetCardsByCommanderUseCase {
    constructor(
        private readonly scryfallApi: ScryfallApi
    ) { }

    async execute(commander: Card) {

    }
}