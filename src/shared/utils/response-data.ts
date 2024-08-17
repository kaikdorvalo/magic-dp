import { HttpStatus } from "@nestjs/common";

export class ResponseData {
    status: HttpStatus
    data?: any

    constructor(status: HttpStatus, data?: any,) {
        this.status = status;
        this.data = data;
    }
}