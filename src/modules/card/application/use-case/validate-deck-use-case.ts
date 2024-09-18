import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class ValidadeDeckUseCase {
  execute(deckJson: any) {
    try {
      if (!deckJson || !deckJson.cards || deckJson.cards.length !== 100) {
        throw new BadRequestException('O deck deve conter exatamente 100 cartas.');
      }

      const commander = deckJson.cards[0];
      const deck = deckJson.cards;

      if (!commander.type_line.includes('Legendary Creature')) {
        throw new BadRequestException('O commander deve ser uma Legendary Creature.');
      }

      const commanderColorIdentity = commander.color_identity;

      for (const card of deckJson.cards) {
        if (card.color_identity.some((color) => !commanderColorIdentity.includes(color))) {
          throw new BadRequestException(`A carta ${card.name} possui uma color_identity incompatível com o commander.`);
        }
      }

      for (const land of deck.filter(card => card.type_line.includes('Land'))) {
        if (!this.isColorIdentityCompatible(commanderColorIdentity, land.color_identity)) {
          throw new BadRequestException(`O terreno "${land.name}" é incompatível com a color_identity do comandante.`);
        }
      }

      return { message: 'Deck validado com sucesso.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private isColorIdentityCompatible(commanderColorIdentity: string[], cardColorIdentity: string[]): boolean {
    return cardColorIdentity.every(color => commanderColorIdentity.includes(color));
  }
}
