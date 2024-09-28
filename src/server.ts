/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import "express-async-errors";
import './express-formatter';
import cors from "cors";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { constants } from "./constants";
import { Server, Socket } from "socket.io";
import ErrorMiddleware from "./middleware/error.middleware";

import connectDB from "./utils/connectDB";
import UsersRoutes from "./routes/user.route";
import GroupsRoutes from "./routes/group.route";

import MessageController from "./controllers/message.controller";
import AuthMiddleware from "./middleware/auth.middleware";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use(constants.API.PREFIX.concat("/ping"), (req, res, next) => {
    res.status(StatusCodes.OK).json({ message: "pong" });
});

app.use(constants.API.PREFIX.concat("/user"), UsersRoutes);
app.use(constants.API.PREFIX.concat("/group"), GroupsRoutes);

app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: "API Endpoint Not Found!" });
});

app.use(ErrorMiddleware.errorHandler);

const start = () => {
    try {
       const server = app.listen(constants.SERVER.PORT, async () => {
            await connectDB();
            console.log(`Server is running on port ${constants.SERVER.PORT}`);
        });

        const io = new Server(server, {
            cors: {
                origin: "*",
            },
        });

        io.use(AuthMiddleware.socketAuthorizer);

        io.on("connection", (socket: Socket) => {

            console.log("New client joined " + socket.id);

            MessageController.sendMessage(socket);

            socket.on("connected", () => console.log("Connected!"));

            socket.on("disconnect", () => console.log("Disconnected!"));
        });


    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();