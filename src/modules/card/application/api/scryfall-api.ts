import { HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import axios from "axios";
import { timeout } from "rxjs";
import { CommanderNotFoundException } from "src/shared/exceptions/card/commander-bot-found.exception";

@Injectable()
export class ScryfallApi {
    private baseUrl: string = 'https://api.scryfall.com';
    private api = axios.create({
        baseURL: this.baseUrl,
        timeout: 10000
    })

    async getCommanderByName(name: string) {
        try {
            const res = await this.api.get(`/cards/named?fuzzy=${name}`)
            const commander = res.data;
            return commander;
        } catch (err: any) {
            return null;
        }
    }
}