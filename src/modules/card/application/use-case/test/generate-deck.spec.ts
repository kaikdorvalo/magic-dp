import { request, Request } from "express"
import { Model } from "mongoose"
import { ScryfallApi } from "src/modules/card/application/api/scryfall-api"
import { GenerateDeckUseCase } from "src/modules/card/application/use-case/generate-deck.use-case"
import { GetBasicLandsByCommanderUseCase } from "src/modules/card/application/use-case/get-basic-lands-by-commander.use-case"
import { GetCardsByCommanderUseCase } from "src/modules/card/application/use-case/get-cards-by-commander.use-case"
import { GetCommanderUseCase } from "src/modules/card/application/use-case/get-commander.use-case"
import { Card, Deck } from "src/modules/card/domain/schemas/deck.schema"
import { CardService } from "src/modules/card/domain/services/card.service"
import { CardRepositroy } from "src/modules/card/infrastructure/persistence/card.repository.impl"
import { IUser } from "src/modules/user/application/interfaces/user.interface"
import { User } from "src/modules/user/domain/schemas/user.schema"
import { UserRepositoryImpl } from "src/modules/user/infrastructure/persistence/user.repository.impl"
import { CreateDeckDto } from "src/shared/dtos/card/create-deck.dto"

describe('Generate deck test', () => {
    const scryfallApi = new ScryfallApi()

    const cardService = new CardService()
    const getCommanderUseCase = new GetCommanderUseCase(scryfallApi)
    const getBasicLandsUseCase = new GetBasicLandsByCommanderUseCase(scryfallApi)
    const getCardsByCommander = new GetCardsByCommanderUseCase(scryfallApi)

    const cardRepository = new CardRepositroy(new Model<Deck>)
    const userRepository = new UserRepositoryImpl(new Model<User>)


    const generateDeckUseCase = new GenerateDeckUseCase(
        cardService,
        getCommanderUseCase,
        getBasicLandsUseCase,
        getCardsByCommander,
        cardRepository,
        userRepository
    )

    it('Should generate deck', async () => {
        const deckDto: CreateDeckDto = {
            commanderName: "Dina Imbuidora de Almas",
            landsAmount: 30
        }

        const user: IUser = {
            _id: "userId",
            name: "",
            email: "",
            password: ""
        }

        jest.spyOn(userRepository, 'getUserById').mockReturnValue(Promise.resolve(user))
        jest.spyOn(cardRepository, 'saveDeck').mockReturnValue(Promise.resolve(true));

        const deck = await generateDeckUseCase.execute(deckDto, "userId")

        console.log(deck)
    })
})