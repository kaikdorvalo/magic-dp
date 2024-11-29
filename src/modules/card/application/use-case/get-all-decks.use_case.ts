import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { ResponseData } from "src/shared/utils/response-data";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class GetAllDecksUseCase {

    constructor(
        private cardRepository: CardRepositroy,

        @Inject('CARDS_NOTIFY') private rabbitClient: ClientProxy,

    ) { }

    async execute() {
        try {
            const cards = await this.cardRepository.getAllDecks();
            this.rabbitClient.emit('deck-notify', `Decks buscados com sucesso.`)
            return new ResponseData(
                HttpStatus.OK,
                cards
            )
        } catch (err) {
            this.rabbitClient.emit('deck-notify', `Erro ao buscar os decks.`)
            httpExceptionHandler(err)
        }
    }
} 