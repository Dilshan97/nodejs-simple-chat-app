/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    res.status(err.statusCode).json({
        message: err.message,
        data: err.data
    });
};

export default { errorHandler };