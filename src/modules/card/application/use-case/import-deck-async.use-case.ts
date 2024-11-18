import { Injectable } from "@nestjs/common";
import { Card } from "../../domain/schemas/deck.schema";

@Injectable()
export class ImportDeckAsyncUseCase {

    execute(jsonDeck: Card[]) {

    }
}