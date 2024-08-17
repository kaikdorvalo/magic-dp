import { Injectable } from "@nestjs/common";
import { serialize } from "uri-js";

@Injectable()
export class CardService {

    encodeStringUriSearch(string: string): string {
        const uri = serialize({ scheme: 'https', host: 'api.scryfall.com/cards/search', query: `q=${string}` })
        return uri;
    }
}