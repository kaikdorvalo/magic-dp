import { BadRequestException, Injectable } from "@nestjs/common";
import { ImcompatibleCardColorException } from "src/shared/exceptions/card/imcompatible-card-color.exception";
import { ImcompatibleLandColorException } from "src/shared/exceptions/card/imcompatible-land-color.exception";
import { NotCommanderException } from "src/shared/exceptions/card/not-commander.exception";
import { WrongNumberOfCardsException } from "src/shared/exceptions/card/wrong-number-of-cards.exception";
import { httpExceptionHandler } from "src/shared/utils/exception-handler";

@Injectable()
export class ValidadeDeckUseCase {
  execute(deckJson: any) {
    try {
      if (!deckJson || !deckJson.cards || deckJson.cards.length !== 100) {
        throw new WrongNumberOfCardsException();
      }

      const commander = deckJson.cards[0];
      const deck = deckJson.cards;

      if (!commander.type_line.includes('Legendary Creature')) {
        throw new NotCommanderException();
      }

      const commanderColorIdentity = commander.color_identity;

      for (const card of deck.filter(card => ['Creature', 'Artifact', 'Enchantment', 'Planeswalker', 'Battle'].some(type => card.type_line.includes(type)))) {
        if (card.color_identity.some((color) => !commanderColorIdentity.includes(color))) {
          throw new ImcompatibleCardColorException();
        }
      }


      for (const land of deck.filter(card => card.type_line.includes('Land'))) {
        if (!this.isColorIdentityCompatible(commanderColorIdentity, land.color_identity)) {
          throw new ImcompatibleLandColorException();
        }
      }

      return { message: 'Deck validated successfully.' };
    } catch (error) {
      httpExceptionHandler(error)
    }

  }

  private isColorIdentityCompatible(commanderColorIdentity: string[], cardColorIdentity: string[]): boolean {
    return cardColorIdentity.every(color => commanderColorIdentity.includes(color));
  }
}
