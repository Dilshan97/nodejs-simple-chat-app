
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { IAuthRecord } from "./models/user.model";

declare module 'express-serve-static-core' {
    interface Request {
        auth: IAuthRecord;
    }
}