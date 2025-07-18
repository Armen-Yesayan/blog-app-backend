import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';
import cors, {CorsOptions} from 'cors';
import dotenv from 'dotenv';
import postRoutes from "./modules/posts/post.routes";
import authRoutes from "./modules/auth/auth.routes";
import {errorHandler} from "./common/middlewares/error.middleware";
import {sequelize} from "./common/configs/db.config";
import path from "path";

dotenv.config();

const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });