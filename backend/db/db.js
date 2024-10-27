import mongoose, { mongo } from "mongoose";
import { User } from './models/User.js';
import { Project } from './models/Project.js';
import express from "express";
mongoose.connect('mongodb://127.0.0.1/buildathon');


const db = express.Router();


// User routes
db.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.send(user);
})


db.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
})


db.get('/users/:username', async (req, res) => {
    const user = await User.find({username: {$eq: req.params["username"]}});
    res.send(user);
})


db.put('/users/:username', async (req, res) => { // can update password so info is passed through req.body
    const user = await User.updateOne(req.params["username"], req.body); // visibility
    res.send(user);
})


db.get('/users/:username/delete', async (req, res) => {
    await User.deleteOne({username: {$eq: req.params["username"]}});
    res.redirect('/users');
})

// login function called
db.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email: {$eq: email}, password: {$eq: password}});
        // console.log(user); 
        if (user === null){
            res.status(400).send("User does not exist");
        }
        else{
            res.send({ message: 'Login successful', user }); // Send back user data if needed
        }
        
    } catch (error) {
        res.status(401).send({ message: error.message }); // Unauthorized
    }
});


// Project routes
db.post('/projects', async (req, res) => {
    const project = await Project.create(req.body);
    await User.updateOne({username: req.body["username"]}, {$push: {projects: project["name"]}});
    res.send(project);
})


db.get('/projects', async (req, res) => {
    const projects = await Project.find({});
    res.send(projects);
})


db.get('/projects/:name', async (req, res) => {
    const project = await Project.find({username: {$eq: req.params["name"]}});
    res.send(project);
})


db.put('/projects/:name', async (req, res) => { // can update password so info is passed through req.body
    const project = await Project.updateOne(req.params["name"], req.body); // visibility
    res.send(project);
})


db.get('/projects/:name/delete', async (req, res) => {
    await Project.deleteOne({name: {$eq: req.params["name"]}});
    res.redirect('/projects');
})


// delete all
db.delete('/users', async (req, res) => {
    await User.deleteMany({});
    res.redirect('/users')
})


db.delete('/projects', async (req, res) => {
    await Project.deleteMany({});
    res.redirect('/projects')
})


// populate data
db.get('/users/populate/:amount', async (req, res) => {
    let index = await User.countDocuments({});
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
        })
    }
    await User.insertMany(insert);
    res.redirect('/users');
})

db.get('/projects/populate/:amount', async (req, res) => {
    let index = await Project.countDocuments({});
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
        })
    }
    await Project.insertMany(insert);
    res.redirect('/projects');
})


export { db };