import { Injectable } from "@nestjs/common";
import { ScryfallApi } from "../api/scryfall-api";


@Injectable()
export class GetBasicLandsByCommanderUseCase {
    constructor(
        private scryfallApi: ScryfallApi
    ) { }

    async execute() {
        const lands = await this.scryfallApi.getLands();
        return lands;
    }
}