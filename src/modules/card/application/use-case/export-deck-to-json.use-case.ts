import { Card } from "../../domain/schemas/deck.schema";
import { GetDeckByIdUseCase } from "./get-deck-by-id.use-case";
import "dotenv/config"

export class ExportDeckToJsonUseCase {
    constructor(
        private readonly getDeckByIdUseCase: GetDeckByIdUseCase
    ) { }

    async execute(id: string, userId: string) {
        const deck = await this.getDeckByIdUseCase.execute(id, userId);
        const cards: Card[] = deck.data.cards;
        const json = this.createJson(cards);
        const result = await this.sendToWebHook(json);
        return result
    }

    private createJson(cards: Card[]) {
        const jsonData = JSON.stringify(cards)
        const buffer = Buffer.from(jsonData);
        return buffer
    }

    private async sendToWebHook(buffer: Buffer) {
        const webHook = process.env.DISCORD_JSON_WEBHOOK;

        const formData = {
            file: {
                value: buffer,
                options: {
                    filename: 'data.json',
                    contentType: 'application/json',
                },
            },
        };

        const result = await fetch(webHook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: buffer,
        })

        console.log(result);
    }
}
