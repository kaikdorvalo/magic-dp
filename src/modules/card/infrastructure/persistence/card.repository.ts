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

    async getById(_id: string): Promise<Deck> {
        const deck = await this.deckModel.findById(_id)
        return deck;
    }

    async getDecksByUser(userId: string): Promise<Deck[] | null> {
        const decks = await this.deckModel.find({ userId: userId });
        return decks;
    }
}