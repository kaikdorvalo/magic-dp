import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUser } from "src/modules/user/application/interfaces/user.interface";

export type DeckDocument = Deck & Document;

@Schema()
class CardImageUris {
    @Prop()
    small: string;
    @Prop()
    normal: string;
    @Prop()
    large: string;
    @Prop()
    png: string;
    @Prop()
    art_crop: string;
    @Prop()
    border_crop: string;
}

@Schema()
class CardLegalities {
    @Prop()
    standard: string;
    @Prop()
    future: string;
    @Prop()
    historic: string;
    @Prop()
    timeless: string;
    @Prop()
    gladiator: string;
    @Prop()
    pioneer: string;
    @Prop()
    explorer: string;
    @Prop()
    modern: string;
    @Prop()
    legacy: string;
    @Prop()
    pauper: string;
    @Prop()
    vintage: string;
    @Prop()
    penny: string;
    @Prop()
    commander: string;
    @Prop()
    oathbreaker: string;
    @Prop()
    standardbraw: string;
    @Prop()
    brawl: string;
    @Prop()
    alchemy: string;
    @Prop()
    paupercommander: string;
    @Prop()
    duel: string;
    @Prop()
    oldschool: string;
    @Prop()
    premodern: string;
    @Prop()
    predh: string;
}

@Schema()
class CardPrices {
    @Prop()
    usd: string;
    @Prop()
    usd_foil: string;
    @Prop()
    usd_etched: string;
    @Prop()
    eur: string;
    @Prop()
    eur_foil: string;
    @Prop()
    tix: string;
}

@Schema()
class CardRelatedUris {
    @Prop()
    gatherer: string;
    @Prop()
    tcgplayer_infinite_articles: string;
    @Prop()
    tcgplayer_infinite_decks: string;
    @Prop()
    edhrec: string;
}

@Schema()
class CardPurchaseUris {
    @Prop()
    tcgplayer: string;
    @Prop()
    cardmarket: string;
    @Prop()
    cardhoarder: string;
}

@Schema()
export class Card {
    @Prop()
    object: string
    @Prop()
    id: string
    @Prop()
    oracle_id: string
    @Prop()
    multiverse_ids: number[]
    @Prop()
    name: string
    @Prop()
    printed_name: string
    @Prop()
    lang: string
    @Prop()
    released_at: string
    @Prop()
    uri: string
    @Prop()
    scryfall_uri: string
    @Prop()
    layout: string
    @Prop()
    highres_image: string
    @Prop()
    image_status: string
    @Prop()
    image_uris: CardImageUris
    @Prop()
    mana_cost: string
    @Prop()
    cmc: number
    @Prop()
    type_line: string
    @Prop()
    printed_type_line: string
    @Prop()
    oracle_text: string
    @Prop()
    printed_text: string
    @Prop()
    power: string
    @Prop()
    toughness: string
    @Prop()
    colors: string[]
    @Prop()
    color_identity: string[]
    @Prop()
    keywords: string[]
    @Prop()
    legalities: CardLegalities
    @Prop()
    games: string[]
    @Prop()
    reserved: boolean
    @Prop()
    foil: boolean
    @Prop()
    nonfoil: boolean
    @Prop()
    finishes: string[]
    @Prop()
    oversized: boolean
    @Prop()
    promo: boolean
    @Prop()
    reprint: boolean
    @Prop()
    variation: boolean
    @Prop()
    set_id: string
    @Prop()
    set: string
    @Prop()
    set_name: string
    @Prop()
    set_type: string
    @Prop()
    set_uri: string
    @Prop()
    set_search_uri: string
    @Prop()
    scryfall_set_uri: string
    @Prop()
    rulings_uri: string
    @Prop()
    prints_search_uri: string
    @Prop()
    collector_number: string
    @Prop()
    digital: boolean
    @Prop()
    rarity: string
    @Prop()
    card_back_id: string
    @Prop()
    artist: string
    @Prop()
    artist_ids: string[]
    @Prop()
    illustration_id: string
    @Prop()
    border_color: string
    @Prop()
    frame: string
    @Prop()
    frame_effects: string[]
    @Prop()
    security_stamp: string
    @Prop()
    full_art: boolean
    @Prop()
    textless: boolean
    @Prop()
    booster: boolean
    @Prop()
    story_spotlight: boolean
    @Prop()
    edhrec_rank: number
    @Prop()
    penny_rank: number
    @Prop()
    prices: CardPrices
    @Prop()
    related_uris: CardRelatedUris
    @Prop()
    purchase_uris: CardPurchaseUris
}

@Schema()
export class Deck {
    @Prop({ required: true })
    userId: string
    @Prop({ required: true })
    commander: string
    @Prop({ required: true })
    lands: number
    @Prop({ required: true })
    cards: Card[]
}


export const DeckSchema = SchemaFactory.createForClass(Deck)