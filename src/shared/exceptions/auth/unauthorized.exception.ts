import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "src/shared/constants/errors.constants";

export class UnauthorizedException extends HttpException {
    constructor() {
        super(Errors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
}