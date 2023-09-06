import {createUser, getUserByEmail, getUserById, getUserIsAdmin, getUsers} from "../models/user";
import * as fs from "fs";
import {authentication, random} from "../helpers/helpers";
import express from "express";

export const initializeAdmin = async () => {
    try {

        const initializeData = fs.readFileSync('./configData.json', 'utf8');
        const adminRoot = JSON.parse(initializeData);
        const { email, password, username, isAdmin,isAdminRoot} = adminRoot[0];
        if (!email || !password || !username) {
            return { message: 'User does not exist' };
        }
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return { message: 'User with this email already exists' };
        }
        const salt = random();
        await createUser({
            email,
            username,
            password,
            isAdmin,
            isAdminRoot,
            authentication: {
                salt,
                password: authentication(salt, password),
            },

        });

        console.log('Data initialization complete');
    } catch (error) {
        console.error('Data initialization error:', error);
    }
};
export const adminSearchUser = async (req: express.Request, res: express.Response) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email);

        if (!user || user.isAdmin || user.isAdminRoot) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const getAllAdmin = async (req: express.Request, res: express.Response) =>{
    try {
        const users = await getUsers();
        const listAdmin = users.filter((user)=>{
            if( user.isAdmin || user.isAdminRoot ){
                return user
            }
        })

        return res.status(200).json(listAdmin);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
