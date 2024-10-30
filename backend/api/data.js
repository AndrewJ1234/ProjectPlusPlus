import { User } from '../db/User.js';
import { Project } from '../db/Project.js';
import express from "express";


// add authentication as middleware
const data = express.Router();


// delete data
data.delete('/users', async (req, res) => {
    await User.deleteMany({});
    res.redirect('/users');
});


data.delete('/projects', async (req, res) => {
    await Project.deleteMany({});
    res.redirect('/projects');
});


// populate data
data.post('/users/:amount', async (req, res) => {
    const index = await User.countDocuments({});
    let insert = [];
    for (let i = index; i < index+Number(req.params["amount"]); i++) {
        insert.push({
            username: String(i),
            email: String(i),
            password: String(i),
            linkedin: String(i),
            github: String(i),
            experience: {
                "Python": Math.floor(Math.random()*10),
                "Java": Math.floor(Math.random()*10),
                "C/C++": Math.floor(Math.random()*10),
                "Javascript": Math.floor(Math.random()*10),
                "Rust": Math.floor(Math.random()*10),
                "Go": Math.floor(Math.random()*10),
            },
        });
    }
    await User.insertMany(insert);
    res.redirect('/users');
});


data.post('/projects/:amount', async (req, res) => {
    const index = await Project.countDocuments({});
    let insert = [];
    for (let i = index; i < index+Number(req.params["amount"]); i++) {
        insert.push({
            name: String(i),
            username: "0", // lol
            description: String(i),
            link: String(i),
            experience: {
                "Python": Math.floor(Math.random()*10),
                "Java": Math.floor(Math.random()*10),
                "C/C++": Math.floor(Math.random()*10),
                "Javascript": Math.floor(Math.random()*10),
                "Rust": Math.floor(Math.random()*10),
                "Go": Math.floor(Math.random()*10),
            },
        });
    }
    await Project.insertMany(insert);
    res.redirect('/projects');
});


export { data };