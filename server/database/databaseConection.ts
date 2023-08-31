import mongoose, { ConnectOptions } from 'mongoose';
const connectDB = async () => {
    mongoose.Promise = Promise;
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('error', (error: Error) => console.log(error));
}

export default connectDB

