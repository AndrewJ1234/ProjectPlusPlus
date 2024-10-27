import mongoose, { mongo } from "mongoose";
import { User } from './db/models/User.js';
import { Project } from './db/models/Project.js';
import express from "express";

const search = express.Router();

search.get('/', async (req, res) => { // targeted search
    // use req.query in db search
    const project = await Project.find(req.params); // lowkey fucked
    res.send(project);
})


search.get('/:username', async(req, res) => {
    let query = {};
    const fields = User.findOne({username: {$eq: req.query["username"]}})["experience"];
    for([k, v] in fields) {
        query[k] = {"$ge": v};
    }
    let project = await Project.find(query); // need to rank results
    res.send(project);
})


export { search };