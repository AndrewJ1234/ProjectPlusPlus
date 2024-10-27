import "dotenv/config";
import express from "express";
import { db } from './db/db.js';
import { search } from './search.js';
import cors from 'cors'

const server = express();
server.use(cors());

    // middleware
// express.json()
server.use(express.json()); // should parse all bodies
// logger
server.use((req, res, next) => {
    console.log(Date.now(), req.path, req.method, req.query, req.params, req.body);
    res.setHeader("Content-Type", "application/json");
    next();
})

    //routes
// db interface
server.use('/', db); //
// post search
server.use('/search', search);

const PORT = process.env.PORT_EXPRESS || 4000;
server.listen(PORT, () => {
    console.log('server running on port', PORT);
})