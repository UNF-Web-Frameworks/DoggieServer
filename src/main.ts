import express from 'express';
import jwt from 'jsonwebtoken'
import cors from 'cors';
import authMiddleware from './middelwares/authMiddleware';
import dogHandlerRouter from './routes/dogHandler';
import dogRoute from './routes/dogRoute';

let app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use('/handler', dogHandlerRouter);
app.use('/dog', dogRoute);


app.listen(3000);