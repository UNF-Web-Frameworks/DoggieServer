import express from 'express';
import jwt from 'jsonwebtoken';

let authMiddleware = express.Router();

let routeArray= [
    {
        route: '/DOG',
        methods: ['POST', 'PUT', 'DELETE'],
        exclude:[]
    },
    {
        route:'/HANDLER',
        methods: ['PUT', 'DELETE', 'GET'],
        exclude: ['/HANDLER/LOGIN']
    }
];
authMiddleware.use((req, res, next) => {
    let route = routeArray.find(route => req.path.toUpperCase().includes(route.route));
    if (route) {
        let method = route.methods.find(method => method === req.method);
        if (method) {
            let exclude = route.exclude.find(exclude => exclude === req.path.toUpperCase());
            if (exclude) {
                next();
            } else {
                let token = req.headers['authorization'];
                if (token) {
                    try
                    {
                        let currUser=jwt.verify(token.replace('Bearer','').replace(' ',''), 'secret');
                        res.locals.user = currUser;
                        next();
                    }
                    catch (e) {
                        res.status(401).json({ message: 'Invalid Token' });
                    }
                }
                res.status(401).json({ message: 'Unauthorized' });
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default authMiddleware;