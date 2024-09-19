import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class WrongNumberOfCardsException extends HttpException {
    constructor() {
        super(Errors.WRONG_NUMBER_OF_CARDS, HttpStatus.BAD_REQUEST)
    }
}