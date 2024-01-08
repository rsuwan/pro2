import { Router } from 'express';
import CommunityRouter from './Community/Community.router.js';
import PostRouter from './Post/post.router.js';
import connectdb from '../../db/connection.js';

const initapp = (app, express) => {
    const router = Router();

    app.use(express.json());
connectdb();
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "Welcome" });
    });

    
    app.use('/community', CommunityRouter);
    app.use('/post', PostRouter);;

    app.get('*', (req, res) => {
        return res.status(404).json({ message: "Page not found" });
    });

    
};

export default initapp;


