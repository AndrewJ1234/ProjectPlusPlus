import mongoose, { mongo } from "mongoose";
import * as UserController from "./controllers/UserController.js";
import * as ProjectController from "./controllers/ProjectController.js";
import express from "express";

mongoose.connect('mongodb://127.0.0.1/buildathon');

const db = express.Router();
db.use(express.json());


// User routes
db.post('/users', async (req, res) => {
    const user = await UserController.CreateUser({
        username: req.body["username"],
        password: req.body["password"],
        email: req.body["email"],
        linkedin: req.body["linkedin"] || '',
        github: req.body["github"] || '',
        experience: req.body["experience"] || '',
        interests: req.body["interests"] || '',
    });
    res.send(user);
})


db.get('/users', async (req, res) => {
    const users = await UserController.GetAllUsers();
    res.send(users);
})


db.get('/users/:username', async (req, res) => {
    const user = await UserController.GetUser(req.params["username"]);
    res.send(user);
})


db.put('/users/:username', async (req, res) => { // can update password so info is passed through req.body
    const user = await UserController.UpdateUser(req.params["username"], req.body); // visibility
    res.send(user);
})


db.get('/users/:username/delete', async (req, res) => {
    await UserController.DeleteUser(req.params["username"]);
    res.redirect('/db/users');
})

// login function called
db.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await controller.LoginUser(email, password);
        res.send({ message: 'Login successful', user }); // Send back user data if needed
    } catch (error) {
        res.status(401).send({ message: error.message }); // Unauthorized
    }
});

// Project routes
db.post('/projects', async (req, res) => {
    const project = await ProjectController.CreateProject({
        name: req.body["name"],
        owner_username: req.body["username"],
        description: req.body["description"],
        link: req.body["link"],
    });
    res.send(project);
})


db.get('/projects', async (req, res) => {
    const projects = await ProjectController.GetAllProjects();
    res.send(projects);
})


db.get('/projects/:name', async (req, res) => {
    const project = await ProjectController.GetProject(req.params["name"]);
    res.send(project);
})


db.put('/projects/:name', async (req, res) => { // can update password so info is passed through req.body
    const project = await ProjectController.UpdateProject(req.params["name"], req.body); // visibility
    res.send(project);
})


db.get('/projects/:name/delete', async (req, res) => {
    await ProjectController.DeleteProject(req.params["name"]);
    res.redirect('/db/projects');
})


export { db };