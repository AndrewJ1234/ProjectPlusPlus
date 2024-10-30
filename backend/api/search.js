import { User } from '../db/User.js';
import { Project } from '../db/Project.js';
import express from "express";

const search = express.Router();

search.get('/', async (req, res) => { // user-directed search with query (/search?name=1&username=0)
    const project = await Project.find(req.query);
    res.send(project);
});


search.post('/', async(req, res) => { // recommended search (any user can search for any other user (change this with sessions))
    const fields = await User.findOne({username: {$eq: req.body["username"]}}, "experience");

    let projects = await Project.find({$or: [ // fuck this stupid fucking code
        {"Python": {$lte: fields["Python"]}}, 
        {"Java": {$lte: fields["Java"]}}, 
        {"C/C++": {$lte: fields["C/C++"]}}, 
        {"Javascript": {$lte: fields["Javascript"]}}, 
        {"Rust": {$lte: fields["Rust"]}}, 
        {"Go": {$lte: fields["Go"]}}
    ]});
    
    // sort projects by euclidean distance
    const languages = ["Python", "Java", "C/C++", "Javascript", "Rust", "Go"];
    projects.sort((a, b) => {

        const diff = languages.map((v, i) => {
            console.log(fields[v]);
        });


        const val1 = Math.sqrt( // map this to above
            (a["experience"]["Python"] - fields["Python"])**2
            + (a["experience"]["Java"] - fields["Java"])**2
            + (a["experience"]["C/C++"] - fields["C/C++"])**2
            + (a["experience"]["Javascript"] - fields["Javascript"])**2
            + (a["experience"]["Rust"] - fields["Rust"])**2
            + (a["experience"]["Go"] - fields["Go"])**2
        );
        const val2 = Math.sqrt(
            (b["experience"]["Python"] - fields["Python"])**2
            + (b["experience"]["Java"] - fields["Java"])**2
            + (b["experience"]["C/C++"] - fields["C/C++"])**2
            + (b["experience"]["Javascript"] - fields["Javascript"])**2
            + (b["experience"]["Rust"] - fields["Rust"])**2
            + (b["experience"]["Go"] - fields["Go"])**2
        );

        //console.log(val1, val2);
        //console.log(b);

        return val1-val2;
    })
    res.send(projects);
})


export { search };