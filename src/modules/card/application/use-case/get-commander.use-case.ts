import { Injectable } from "@nestjs/common";
import { ScryfallApi } from "../api/scryfall-api";
import { CommanderNotFoundException } from "src/shared/exceptions/card/commander-bot-found.exception";
import { NotCommanderException } from "src/shared/exceptions/card/not-commander.exception";
import { Card } from "../../domain/schemas/deck.schema";

@Injectable()
export class GetCommanderUseCase {
    constructor(
        private scryfallApi: ScryfallApi
    ) { }

    async execute(commanderName: string): Promise<Card> {
        const commander: Card = await this.scryfallApi.getCommanderByName(commanderName);
        if (commander == null) {
            throw new CommanderNotFoundException();
        }


        if (!commander.type_line.includes("Legendary Creature")) {
            throw new NotCommanderException();
        }

        return commander
    }
}