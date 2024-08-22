import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class InvalidLandsAmountException extends HttpException {
    constructor() {
        super(Errors.INVALID_LANDS_AMOUNT, HttpStatus.BAD_REQUEST)
    }
}