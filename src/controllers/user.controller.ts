
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service";
import bcrypt from 'bcryptjs';
import User, { IAuthRecord } from "../models/user.model";
import jwt from 'jsonwebtoken';
import NotFoundError from "../middleware/errors/NotFoundError";
import UnauthorizedError from "../middleware/errors/UnauthorizedError";
import ConflictError from "../middleware/errors/ConflictError";
import { Socket } from "socket.io";
import { constants } from "../constants";

const login = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body;

    const dbUser = await UserService.findByPhoneNumber(phoneNumber);

    if (!dbUser) {
        throw new NotFoundError("User not found!");
    }

    const comparePassword = await bcrypt.compare(password, String(dbUser.password));

    if (!comparePassword) {
        throw new UnauthorizedError("Invalid credentials!");
    }

    const tokenPayload: IAuthRecord = {
        _id: dbUser._id,
        phoneNumber: phoneNumber
    };

    const accessToken = jwt.sign(
        tokenPayload,
        String(process.env.JWT_SECRET),
        { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({
        message: "Logged in successfully!",
        payload: accessToken,
    });
};

const register = async (req: Request, res: Response) => {
    const { username, phoneNumber, password } = req.body;

    const dbUser = await UserService.findByPhoneNumber(phoneNumber);

    if (dbUser) {
        throw new ConflictError("User already exists!");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.password = hashPassword;
    user.phoneNumber = phoneNumber;
    user.save();

    res.status(StatusCodes.CREATED).json({
        message: "User created!",
        payload: user
    });
};

const joinOnline = (socket: Socket) => {
    return socket.on(constants.SOCKET.EVENTS.ONLINE, async (callback) => {
        try {
            const auth = socket.handshake.auth;

            const dbUser = await UserService.findById(auth._id);

            if (!dbUser) throw new NotFoundError("User not found!");

            dbUser.online = true;
            await UserService.save(dbUser);

            socket.join(`online_status_${dbUser._id as unknown}`);
        } catch (error: any) {
            if (typeof callback !== "function") {
                console.log(error);
            } else {
                callback(buildSocketIOResponse(false, error.message, null));
            }
        }
    });
};

const leaveOnline = (socket: Socket) => {
    return socket.on(constants.SOCKET.EVENTS.OFFLINE, async (callback) => {
        try {
            const auth = socket.handshake.auth;

            const dbUser = await UserService.findById(auth._id);

            if (!dbUser) throw new NotFoundError("User not found!");

            dbUser.online = false;
            await dbUser.save();

            socket.leave(`online_status_${dbUser._id as unknown}`);
        } catch (error: any) {
            if (typeof callback !== "function") {
                console.log(error);
            } else {
                callback(buildSocketIOResponse(false, error.message, null));
            }
        }
    });
};

export default {
    login,
    register,
    joinOnline,
    leaveOnline
};

function buildSocketIOResponse(arg0: boolean, message: any, arg2: null): any {
    throw new Error("Function not implemented.");
}
