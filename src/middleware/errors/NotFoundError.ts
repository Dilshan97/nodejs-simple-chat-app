/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class NotFoundError extends CustomAPIError {
  statusCode: number;
  constructor(message: string, data?: {}) {
    super(message, data);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
