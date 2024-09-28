
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

const login = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body;

    const dbUser = await UserService.findByPhoneNumber(phoneNumber);

    if(!dbUser) {
        throw new NotFoundError("User not found!");
    }

    const comparePassword = await bcrypt.compare(password, String(dbUser.password));

    if(!comparePassword) {
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

    if(dbUser) {
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

export default {
    login,
    register,
};