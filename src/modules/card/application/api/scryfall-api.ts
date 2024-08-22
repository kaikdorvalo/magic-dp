import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Card } from "../../domain/schemas/deck.schema";
import * as http from 'http'
import * as https from 'https'

@Injectable()
export class ScryfallApi {
    private baseUrl: string = 'https://api.scryfall.com';
    private api = axios.create({
        baseURL: this.baseUrl,
        timeout: 10000,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
    })

    async getCommanderByName(name: string) {
        try {
            const res = await this.api.get(`/cards/named?fuzzy=${name}`)
            if (res.status !== 200) {
                return null
            }
            console.log('status')
            console.log(res.status)
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

    async getCardsByCommander(commander: Card, cardsAmount: number): Promise<any[]> {
        const query = this.generateQueryColor(commander);
        const searchedCards: Card[] = [];
        const promiseCards: Promise<any>[] = [];
        let page = 1;

        const firstRes = await axios.get(`${this.baseUrl}/cards/search`, {
            params: {
                q: `is:noncommander t:creature (${query})`,
                unique: 'cards'
            }
        })
        const availablePages = Math.ceil(firstRes.data.total_cards / 175);

        do {
            promiseCards.push(
                axios.get(`${this.baseUrl}/cards/search`, {
                    params: {
                        q: `is:noncommander t:creature (${query})`,
                        page: page,
                        unique: 'cards'
                    }
                })
            )

            page++;
        } while (page <= availablePages);

        const cardGroups = await Promise.all(promiseCards);

        for (let group of cardGroups) {
            for (let item of group.data.data) {
                searchedCards.push(item);
            }
        }

        return this.removeLegendaryCreatures(searchedCards);
    }

    private removeLegendaryCreatures(searched: Card[]): Card[] {
        const cards: Card[] = [];

        searched.forEach((card) => {
            if (!card.type_line.includes('Legendary Creature')) {
                cards.push(card);
            }
        })

        return cards;
    }

    private generateQueryColor(commander: Card): string {
        let query: string = '';
        let colors = commander.colors;

        for (let i = 0; i < colors.length; i++) {
            if (i !== colors.length - 1) {
                query = query + `c:${colors[i]} or `;
            } else {
                query = query + `c:${colors[i]}`;
            }
        }

        return query;
    }
}