import { Injectable } from "@nestjs/common";
import { serialize } from "uri-js";
import { Card } from "../schemas/deck.schema";
import { InvalidLandsAmountException } from "src/shared/exceptions/card/invalid-lands-amount.exception";

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