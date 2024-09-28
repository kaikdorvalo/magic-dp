import { HttpStatus, Injectable } from "@nestjs/common";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { ResponseData } from "src/shared/utils/response-data";

@Injectable()
export class GetAllDecksUseCase {

    constructor(
        private cardRepository: CardRepositroy
    ) { }

    async execute() {
        try {
            const cards = await this.cardRepository.getAllDecks();
            return new ResponseData(
                HttpStatus.OK,
                cards
            )
        } catch (err) {
            httpExceptionHandler(err)
        }
    }
} 