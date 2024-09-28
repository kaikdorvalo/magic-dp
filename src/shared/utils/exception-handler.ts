import { HttpException } from "@nestjs/common";
import { InternalErrorException } from "../exceptions/internal-error.exception";

export const httpExceptionHandler = (error: Error) => {
    if (error instanceof HttpException) {
        throw error;
    } else {
        throw new InternalErrorException();
    }
}