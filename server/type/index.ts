export interface IUser extends Document {
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken: string;
    };
    isAdmin: boolean;
    avatar?: string;
    createdAt: Date;
    expiryDate: Date;
}

