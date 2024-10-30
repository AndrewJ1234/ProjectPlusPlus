import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { data } from './api/data.js';
import { db } from './api/db.js';
import { search } from './api/search.js';
import cors from 'cors';


const server = express();
server.use(cors());
mongoose.connect('mongodb://127.0.0.1/buildathon');


    // middleware
// express.json()
server.use(express.json()); // should parse all bodies
// logger
server.use((req, res, next) => {
    console.log(Date.now(), req.path, req.method, req.query, req.params, req.body);
    res.setHeader("Content-Type", "application/json");
    next();
});

    //routes
server.use('/data', data);
server.use('/', db);
server.use('/search', search);

const PORT = process.env.PORT_EXPRESS || 4000;
server.listen(PORT, () => {
    console.log('server running on port', PORT);
});