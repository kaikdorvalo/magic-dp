import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class UserAlreadyExistsException extends HttpException {
    constructor() {
        super(Errors.USER_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }
}