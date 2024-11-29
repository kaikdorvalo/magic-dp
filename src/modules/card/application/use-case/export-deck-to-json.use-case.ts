import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Card } from "../../domain/schemas/deck.schema";
import { GetDeckByIdUseCase } from "./get-deck-by-id.use-case";
import "dotenv/config"
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { ExportDeckErrorException } from "../../../../shared/exceptions/card/export-deck-error.exception";
import { ResponseData } from "../../../../shared/utils/response-data";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ExportDeckToJsonUseCase {
    constructor(
        private readonly getDeckByIdUseCase: GetDeckByIdUseCase,

        @Inject('CARDS_NOTIFY') private rabbitClient: ClientProxy,
    ) { }

    async execute(id: string, userId: string) {
        try {
            const deck = await this.getDeckByIdUseCase.execute(id, userId);
            const cards: Card[] = deck.data.cards;

            const filePath = path.join(__dirname, '..', '..', '..', '..', 'shared', `${deck.data._id}_deck.json`);

            await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

            const writableStream = fs.createWriteStream(filePath);

            writableStream.write('[\n');

            for (let i = 0; i < cards.length; i++) {
                const card = JSON.stringify(cards[i], null, 2);
                writableStream.write(`${card}`);
                if (i < cards.length - 1) {
                    writableStream.write(',\n');
                }
            }

            writableStream.end('\n]');

            this.rabbitClient.emit('deck-notify', `Deck exportado para dist/src/shared`)

            return new ResponseData(
                HttpStatus.CREATED,
                "exported file"
            );
        } catch (err: any) {
            this.rabbitClient.emit('deck-notify', `Erro ao exportar o deck`)
            throw new ExportDeckErrorException()
        }
    }
}
