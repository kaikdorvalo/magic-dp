import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";

export class SendImportedDeckMessage {
    constructor(
        @Inject('CARDS_IMPORTED') private rabbitClient: ClientProxy
    ) {
    }

    async execute(deckId: string) {
        try {
            this.rabbitClient.emit('deck-imported', deckId)
        } catch (err) {
            httpExceptionHandler(err)
        }
    }
}