import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class CommanderNotFoundException extends HttpException {
    constructor() {
        super(Errors.COMMANDER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}