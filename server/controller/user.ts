import express from 'express';
import {deleteUserById, getUsers, getUserById, getUserByEmail} from '../models/user';
import mongoose from "mongoose";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        const listUser = users.filter((user)=>{
            if( !user.isAdmin && !user.isAdminRoot ){
                return user
            }
        })
        return res.status(200).json(listUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { expiryDate } = req.body;

        if (!expiryDate) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.expiryDate = expiryDate;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getInfoUser = async (req: express.Request, res: express.Response) => {
    try {
        // const id = req.body.id;
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
