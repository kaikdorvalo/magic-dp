import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/infrastructure/persistence/user.repository";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { ResponseData } from "src/shared/utils/response-data";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class GetAllUserDecksUseCase {

    constructor(
        private cardRepository: CardRepositroy,

        @Inject('CARDS_NOTIFY') private rabbitClient: ClientProxy,
    ) { }

    async execute(userId: string) {
        try {
            const cards = await this.cardRepository.getDecksByUser(userId);
            this.rabbitClient.emit('deck-notify', `Seus decks foram buscados com sucesso.`)
            return new ResponseData(
                HttpStatus.OK,
                cards
            )
        } catch (err) {
            this.rabbitClient.emit('deck-notify', `Erro ao buscar os seus decks.`)
            httpExceptionHandler(err)
        }
    }
} 