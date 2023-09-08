import express from 'express';

import {getAllUsers, deleteUser, updateUser, getInfoUser} from '../controller/user';
import { isAuthenticated, isOwner } from '../middlewares';
import {getUserByEmail} from "../models/user";
import {adminSearchUser} from "../controller/admin";

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/:id', isAuthenticated,isOwner, getInfoUser);
    router.get('/user/search', adminSearchUser);
    // router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
};
