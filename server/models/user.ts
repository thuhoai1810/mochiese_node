import mongoose from 'mongoose';
import {IUser} from "../type";

// User Config
const ObjectId = new mongoose.Types.ObjectId();
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,  unique: true  },
    avatar: String,
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    isAdmin: { type: Boolean, default: false },
    isAdminRoot: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    expiryDate: { type: Date },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getCountUser = () => UserModel.estimatedDocumentCount();
export const getUserIsAdmin = (isAdmin:boolean) => UserModel.findOne({ isAdmin });
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
