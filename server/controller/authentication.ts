import express from 'express';

import { getUserByEmail, createUser } from '../models/user';
import {authentication, random, renderId} from '../helpers/helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, isAdmin, expiryDate } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400).json({ message: 'User with this email already exists' });
        }
        const salt = random();
        const newUser = await createUser({
            email,
            username,
            isAdmin,
            password,
            expiryDate,
            authentication: {
                salt,
                password: authentication(salt, password),
            },

        });
        return res.status(200).json(newUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).json({ error: 'Registration failed' });
    }
}

export const changePassword = async (req: express.Request, res: express.Response) =>{
    try {
        const { email, password } = req.body;

    }catch(error){
        console.log(error);
        return res.sendStatus(400).json({ error: 'Change password failed' });
    }
}
