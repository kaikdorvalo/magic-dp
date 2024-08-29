import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "src/shared/constants/errors.constants";

export class UserNotFoundException extends HttpException {
    constructor() {
        super(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
}