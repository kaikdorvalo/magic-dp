import { Model } from "mongoose"
import { ScryfallApi } from "../../../../../modules/card/application/api/scryfall-api"
import { GenerateDeckUseCase } from "../../../../../modules/card/application/use-case/generate-deck.use-case"
import { GetBasicLandsByCommanderUseCase } from "../../../../../modules/card/application/use-case/get-basic-lands-by-commander.use-case"
import { GetCardsByCommanderUseCase } from "../../../../../modules/card/application/use-case/get-cards-by-commander.use-case"
import { GetCommanderUseCase } from "../../../../../modules/card/application/use-case/get-commander.use-case"
import { Card, Deck } from "../../../../../modules/card/domain/schemas/deck.schema"
import { CardService } from "../../../../../modules/card/domain/services/card.service"
import { CardRepositroy } from "../../../infrastructure/persistence/card.repository"
import { IUser } from "../../../../../modules/user/application/interfaces/user.interface"
import { User } from "../../../../../modules/user/domain/schemas/user.schema"
import { UserRepositoryImpl } from "../../../../user/infrastructure/persistence/user.repository"
import { CreateDeckDto } from "../../../../../shared/dtos/card/create-deck.dto"

describe('Generate deck test', () => {
    const scryfallApi = new ScryfallApi()

    const cardService = new CardService()
    const getCommanderUseCase = new GetCommanderUseCase(scryfallApi)
    const getBasicLandsUseCase = new GetBasicLandsByCommanderUseCase(scryfallApi)
    const getCardsByCommander = new GetCardsByCommanderUseCase(scryfallApi)

    const cardModel = {

    } as unknown as Model<Deck>

    const userModel = {

    } as unknown as Model<User>

    const cardRepository = new CardRepositroy(cardModel)
    const userRepository = new UserRepositoryImpl(userModel)


    const generateDeckUseCase = new GenerateDeckUseCase(
        cardService,
        getCommanderUseCase,
        getBasicLandsUseCase,
        getCardsByCommander,
        cardRepository,
        userRepository
    )

    it('Should get Commander by name', async () => {
        const commander = await getCommanderUseCase.execute('Dina Imbuidora de Almas');
        const isCommander = commander.type_line.includes('Legendary Creature')

        expect(commander).toBeDefined()
        expect(isCommander).toBe(true);
    })

    it('Should get basic lands for commander', async () => {
        const commander = await getCommanderUseCase.execute('Dina Imbuidora de Almas');
        const isCommander = commander.type_line.includes('Legendary Creature')

        const lands = await getBasicLandsUseCase.execute(commander);

        const map = lands.map((el) => {
            return commander.color_identity.includes(el.color_identity[0]);
        })

        const correctLandsForCommander = !map.includes(false)


        expect(correctLandsForCommander).toBe(true)
        expect(commander).toBeDefined()
        expect(isCommander).toBe(true);
    })

    it('Should get correct cards for commander', async () => {
        const commander = await getCommanderUseCase.execute('Dina Imbuidora de Almas');
        const isCommander = commander.type_line.includes('Legendary Creature')

        const cards = await getCardsByCommander.execute(commander, 99);

        const map = cards.map((el) => {
            let correct = false;
            for (let color of commander.color_identity) {
                if (el.color_identity.includes(color)) {
                    correct = true;
                }
            }

            return correct
        })

        const isCorrectColor = !map.includes(false)

        expect(isCorrectColor).toBe(true)
        expect(commander).toBeDefined()
        expect(isCommander).toBe(true);
    })
})