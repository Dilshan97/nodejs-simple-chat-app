
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class InternalServerError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, data?: {}) {
        super(message, data);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      }
}
export default InternalServerError;