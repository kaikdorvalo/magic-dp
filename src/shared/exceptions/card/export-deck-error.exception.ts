import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class ExportDeckErrorException extends HttpException {
    constructor() {
        super(Errors.EXPORT_DECK_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}