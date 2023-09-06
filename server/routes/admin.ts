import express from 'express';
import {getAllAdmin} from "../controller/admin";
import {isAuthenticated} from "../middlewares";

export default (router: express.Router) => {
    router.get('/admins',isAuthenticated, getAllAdmin);
};
