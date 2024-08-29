import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "src/shared/constants/errors.constants";

export class EmailAlreadyExists extends HttpException {
    constructor() {
        super(Errors.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
}