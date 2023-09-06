import express from 'express';

import authentication from './authentication';
import user from './user';
import admin from "./admin";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    admin(router)

    return router;
};
