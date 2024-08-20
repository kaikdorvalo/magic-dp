import { Injectable } from "@nestjs/common";
import { ScryfallApi } from "../api/scryfall-api";
import { CommanderNotFoundException } from "src/shared/exceptions/card/commander-bot-found.exception";

@Injectable()
export class GetCommanderUseCase {
    constructor(
        private scryfallApi: ScryfallApi
    ) { }

    async execute(commanderName: string) {
        const commander = await this.scryfallApi.getCommanderByName(commanderName);
        if (commander == null) {
            throw new CommanderNotFoundException();
        }
        return commander

        // const lands = await this.scryfallApi.getLands();
        // return lands
    }
}