import * as controller from "./Controller.js";
import express from "express";
const db = express.Router();
db.use(express.json());

db.post('/users', async (req, res) => {
    const user = await controller.CreateUser({
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
    const users = await controller.GetAllUsers();
    res.send(users);
})


db.get('/users/:username', async (req, res) => {
    const user = await controller.GetUser(req.params["username"]);
    res.send(user);
})


db.put('/users/:username', async (req, res) => { // can update password so info is passed through req.body
    const user = await controller.UpdateUser(req.params["username"], req.body); // visibility
    res.send(user);
})


db.get('/users/:username/delete', async (req, res) => {
    await controller.DeleteUser(req.params["username"]);
    res.redirect('/db/users');
})


export { db };