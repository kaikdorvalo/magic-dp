import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class ImcompatibleCardColorException extends HttpException {
    constructor() {
        super(Errors.IMCOMPATIBLE_CARD_COLOR, HttpStatus.BAD_REQUEST)
    }
}