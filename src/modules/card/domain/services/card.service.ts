import { Injectable } from "@nestjs/common";
import { Card } from "../schemas/deck.schema";

@Injectable()
export class CardService {
    randomLands(availableLands: Card[], landsAmount: number): Card[] {
        let generatedLands: Card[] = [];

        for (let i = 0; i < landsAmount; i++) {
            generatedLands.push(availableLands[Math.floor(Math.random() * availableLands.length)])
        }

        return generatedLands;
    }

    validateLandsAmount(amount: number): boolean {
        if (amount <= 0 || amount > 99) {
            return false;
        }

        return true;
    }
}