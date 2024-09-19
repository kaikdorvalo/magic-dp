import { HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/infrastructure/persistence/user.repository";
import { CardRepositroy } from "../../infrastructure/persistence/card.repository";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";
import { ResponseData } from "src/shared/utils/response-data";

@Injectable()
export class GetAllUserDecksUseCase {

    constructor(
        private cardRepository: CardRepositroy
    ) { }

    async execute(userId: string) {
        try {
            const cards = await this.cardRepository.getDecksByUser(userId);
            return new ResponseData(
                HttpStatus.OK,
                cards
            )
        } catch (err) {
            httpExceptionHandler(err)
        }
    }
} 