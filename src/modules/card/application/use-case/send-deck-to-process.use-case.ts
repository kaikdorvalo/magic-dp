import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Card } from "../../domain/schemas/deck.schema";
import { ResponseData } from "src/shared/utils/response-data";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { ClientProxy } from "@nestjs/microservices";
import { ValidadeDeckUseCase } from "./validate-deck-use-case";

@Injectable()
export class SendDeckToProcessUseCase {
    constructor(
        @Inject("CARDS_SERVICE") private rabbitClient: ClientProxy,
        private validateDeckUseCase: ValidadeDeckUseCase,
    ) { }

    async execute(deck: Card[]) {
        try {
            this.validateDeckUseCase.execute(deck)

            this.rabbitClient.emit('cards-placed', deck)
            return new ResponseData(
                HttpStatus.OK,
                'Deck received'
            )
        } catch (err) {
            httpExceptionHandler(err);
        }
    }
}