import express from 'express';
import jwt from 'jsonwebtoken'
import cors from 'cors';
import authMiddleware from './middelwares/authMiddleware';
import dogHandlerRouter from './routes/dogHandler';
import dogRoute from './routes/dogRoute';
import cookieParser from 'cookie-parser';
import * as path from 'path';

let app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use('/handler', dogHandlerRouter);
app.use('/dog', dogRoute);
app.use('/angular',express.static('angular'))
app.use('/angular',(req,res,next)=>{
    res.sendFile(path.resolve('angular','index.html'));
})


app.listen(3000);