import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';
import connectDB from "./database/databaseConection";

const app = express();
dotenv.config();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT ?? 80;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

connectDB().then()

app.use('/', router());
