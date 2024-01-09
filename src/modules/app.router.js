import { Router } from 'express';
import CommunityRouter from './Community/community.controller.js';
import PostRouter from './Post/post.router.js';
import AuthRouter from './Auth/atuh.router.js';
import connectdb from '../../db/connection.js';

const initapp = (app, express) => {
    const router = Router();

    app.use(express.json());
connectdb();
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "Welcome" });
    });

    app.use('/auth',AuthRouter);
    app.use('/post', PostRouter);
    app.use('/community', CommunityRouter);;
    app.get('*', (req, res) => {
        return res.status(404).json({ message: "Page not found" });
    });

    
};

export default initapp;


