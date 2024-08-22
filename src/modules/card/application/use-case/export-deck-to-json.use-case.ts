import { HttpStatus, Injectable } from "@nestjs/common";
import { Card } from "../../domain/schemas/deck.schema";
import { GetDeckByIdUseCase } from "./get-deck-by-id.use-case";
import "dotenv/config"
import { promises as fs } from 'fs';
import * as path from 'path';
import { ExportDeckErrorException } from "src/shared/exceptions/card/export-deck-error.exception";
import { ResponseData } from "src/shared/utils/response-data";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";

@Injectable()
export class ExportDeckToJsonUseCase {
    constructor(
        private readonly getDeckByIdUseCase: GetDeckByIdUseCase
    ) { }

    async execute(id: string, userId: string) {
        try {
            const deck = await this.getDeckByIdUseCase.execute(id, userId);
            const cards: Card[] = deck.data.cards;

            const timestamp = Date.now();
            const filePath = path.join(__dirname, '..', '..', '..', '..', 'shared', `${deck.data._id}_deck.json`);

            await this.createFile(path.dirname(filePath));
            await this.createJson(cards, filePath);

            return new ResponseData(
                HttpStatus.CREATED,
                "exported file"
            )
        } catch (err: any) {
            httpExceptionHandler(err);
        }
    }

    async createJson(cards: Card[], filePath: string) {
        const jsonData = JSON.stringify(cards, null, 2);

        try {
            await fs.writeFile(filePath, jsonData);
            return true
        } catch (error) {
            throw new ExportDeckErrorException()
        }
    }

    async createFile(dirPath: string) {
        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (error) {
            throw new ExportDeckErrorException()
        }
    }

}
