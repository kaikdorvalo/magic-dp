import { HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import axios from "axios";
import { Response } from "express";
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

    async getLands() {
        try {
            let lands: any[] = [];
            const res = await axios.get(`${this.baseUrl}/cards/search`, {
                params: {
                    q: 't:land (t:plains or t:island or t:swamp or t:mountain or t:forest) is:basic',
                    unique: 'cards',
                },
            })

            lands = res.data.data;

            const basicLands = lands.reduce((filtered, card) => {
                if (card.type_line?.includes('Basic')) {
                    filtered.push(card);
                }
                return filtered;
            }, []);

            console.log(basicLands.length)
            return basicLands;
        } catch (error) {
            console.error('Erro ao buscar terrenos básicos:', error.message);
        }
    }

    async getCardsByCommander() { }
}