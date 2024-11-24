import { HttpStatus, Inject, Injectable, Options } from "@nestjs/common";
import { Card } from "../../domain/schemas/deck.schema";
import { ResponseData } from "src/shared/utils/response-data";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { ClientProxy } from "@nestjs/microservices";
import { ValidadeDeckUseCase } from "./validate-deck-use-case";
import { Role } from "src/shared/enums/roles.enum";

@Injectable()
export class SendDeckToProcessUseCase {
    constructor(
        @Inject("CARDS_IMPORT") private rabbitClient: ClientProxy,
        private validateDeckUseCase: ValidadeDeckUseCase,
    ) { }

    async execute(deck: Card[], userId: string, userRole: Role[]) {
        try {
            this.validateDeckUseCase.execute(deck)

            const priority = userRole.includes(Role.ADMIN) ? 10 : 1;

            let cards = { userId: userId, priority, cards: deck }

            this.rabbitClient.emit('cards-placed', cards);
            return new ResponseData(
                HttpStatus.OK,
                'Deck received'
            )
        } catch (err) {
            httpExceptionHandler(err);
        }
    }
}