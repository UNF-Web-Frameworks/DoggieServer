import express from 'express';
import { DogHandler } from '../models/dogHandler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

let dogHandlerRouter = express.Router();
let dogHandlerArray: DogHandler[] = [];

dogHandlerRouter.get('/', (req, res) =>
{
    res.json(dogHandlerArray);
});

dogHandlerRouter.post('/', (req, res) =>
{
    bcrypt.genSalt(10, (err, salt) =>
    {
        bcrypt.hash(req.body.password, salt, (err, hash) =>
        {
            let newDogHandler = new DogHandler(req.body.name, req.body.userName, hash);
            dogHandlerArray.push(newDogHandler);
            res.json(newDogHandler);
        });
    });
}
);

dogHandlerRouter.put('/:id', (req, res) =>
{
    let id = +req.params.id;
    if (dogHandlerArray[id])
    {
        bcrypt.genSalt(10, (err, salt) =>
        {
            bcrypt.hash(req.body.password, salt, (err, hash) =>
            {
                let updatedDogHandler = new DogHandler(req.body.name, req.body.userName, hash);
                dogHandlerArray[id] = updatedDogHandler;
                res.json(updatedDogHandler);
            });
        });
    }
    else
    {
        res.status(404).json({ message: 'Not Found' });
    }
});

dogHandlerRouter.delete('/:id', (req, res) =>
{
    let id = +req.params.id;
    dogHandlerArray.splice(id, 1);
    res.json('DogHandler Deleted');
});

dogHandlerRouter.get('/:id', (req, res) =>
{
    let id = +req.params.id;
    res.json(dogHandlerArray[id]);
});

dogHandlerRouter.post('/login', (req, res) =>
{
    let userName = req.body.userName;
    let password = req.body.password;
    let user = dogHandlerArray.find(user => user.userName === userName);
    if (user)
    {
        bcrypt.compare(req.body.password, user.password, (err, result) =>
        {
            if (!err)
            {
                let token = jwt.sign({ userName: user!.userName }, 'secret', { expiresIn: '1h' });
                res.json({ token });
            }
            else
            {
                res.status(401).json({ message: 'Invalid Password' });
            }
        });
    } else
    {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
});

export default dogHandlerRouter;
