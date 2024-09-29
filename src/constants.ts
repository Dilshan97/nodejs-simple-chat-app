/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import dotenv from 'dotenv';
dotenv.config();

export const constants = {
    SERVER: {
        PORT: process.env.SERVER_PORT || 4000,
    },
    API: {
        PREFIX: "/api/v1"
    },
    MONGODB_URL: process.env.MONGODB_URL || '',
    MESSAGE: {
        RECEIVERS: {
            USER: "USER",
            GROUP: "GROUP",
        }
    },
    SOCKET: {
        EVENTS: {
            ONLINE: "online",
            OFFLINE: "offline",
            SEND_MESSAGE: "send_message",
            RECEIVE_MESSAGES: "receive_messages"
        }
    }
}