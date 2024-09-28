/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from 'express';
import GroupController from '../controllers/group.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
    "/", 
    AuthMiddleware.authorizer,
    GroupController.createGroup
);

export default router;