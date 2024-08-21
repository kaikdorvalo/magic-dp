import { Injectable } from "@nestjs/common";
import { GetCommanderUseCase } from "./get-commander.use-case";
import { GetBasicLandsByCommanderUseCase } from "./get-basic-lands-by-commander.use-case";
import { CreateDeckDto } from "src/shared/dtos/card/create-deck.dto";

@Injectable()
export class GenerateDeckUseCase {
    constructor(
        private readonly getCommanderUseCase: GetCommanderUseCase,
        private readonly getBasicLandsUseCase: GetBasicLandsByCommanderUseCase
    ) { }

    async execute(createDeckDto: CreateDeckDto) {
        const commander = await this.getCommanderUseCase.execute(createDeckDto.commanderName)
        const basicLands = await this.getBasicLandsUseCase.execute(commander);
        return basicLands;
        // return commander;
    }
}