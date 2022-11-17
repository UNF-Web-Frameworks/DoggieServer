import express from 'express';
import { Dog } from '../models/dog';

let dogRoute = express.Router();

let dogAry:Dog[]=[];

dogRoute.get('/', (req, res) => {
    res.json(dogAry);
});
// Create the rest of the Dog CRUD routes here
dogRoute.post('/', (req, res) => {
    let newDog = new Dog(req.body.name, req.body.breed, req.body.age,req.body.imageUrl);
    dogAry.push(newDog);
    res.json(newDog);
});
dogRoute.put('/:id', (req, res) => {
    let id = +req.params.id;
    let updatedDog = new Dog(req.body.name, req.body.breed, req.body.age);
    dogAry[id] = updatedDog;
    res.json(updatedDog);
});
dogRoute.delete('/:id', (req, res) => {
    let id = +req.params.id;
    dogAry.splice(id, 1);
    res.json('Dog Deleted');
});

dogRoute.get('/:id', (req, res) => {
    let id = +req.params.id;
    res.json(dogAry[id]);
});

export default dogRoute;

