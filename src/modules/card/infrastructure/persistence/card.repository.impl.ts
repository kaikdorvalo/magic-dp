import { InjectModel } from "@nestjs/mongoose";
import { Deck } from "../../domain/schemas/deck.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CardRepositroy {
    constructor(
        @InjectModel(Deck.name) private readonly deckModel: Model<Deck>
    ) { }

    createDeck(deck: Partial<Deck>): Deck {
        return new this.deckModel(deck);
    }

    async saveDeck(deck: Deck): Promise<any> {
        const newUser = new this.deckModel(deck);
        const savedDeck = await newUser.save();
        return savedDeck;
    }
}