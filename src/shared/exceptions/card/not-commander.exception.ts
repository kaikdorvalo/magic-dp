import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "src/shared/constants/errors.constants";

export class NotCommanderException extends HttpException {
    constructor() {
        super(Errors.NOT_COMMANDER, HttpStatus.BAD_REQUEST);
    }
}