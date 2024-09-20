import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../shared/constants/errors.constants";

export class ImcompatibleLandColorException extends HttpException {
    constructor() {
        super(Errors.IMCOMPATIBLE_LAND_COLOR, HttpStatus.BAD_REQUEST)
    }
}