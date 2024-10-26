import "dotenv/config";
import express from "express";
import {db} from './db/db.js';


const server = express();

    // middleware
// express.json()
server.use(express.json()); // should parse all bodies
// logger
server.use((req, res, next) => {
    console.log(Date.now(), req.path, req.method, req.query, req.params, req.body);
    next();
})


    //routes
// db interface
server.use('/db', db);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('server running on port', PORT);
})