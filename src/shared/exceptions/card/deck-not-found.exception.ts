import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class DeckNotFoundException extends HttpException {
    constructor() {
        super(Errors.DECK_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
}