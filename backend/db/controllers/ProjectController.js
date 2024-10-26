import {Project} from '../models/Project.js';


const CreateProject = (project) => {
    return Project.create(project);
}


const GetAllProjects = () => {
    return Project.find({});
}


const GetProject = (name) => {
    return Project.find({
        name: {$eq: name},
    });
}


const UpdateProject = (name, fields) => {
    return Project.updateOne({
        name: {$eq: name}
    }, fields)
}


const DeleteProject = (name) => {
    return Project.deleteOne({
        name: {$eq: name}
    })
}


const DeleteAllProjects = () => {
    return Project.deleteMany({})
}


export {
    CreateProject,
    GetAllProjects,
    GetProject,
    UpdateProject,
    DeleteProject,
    DeleteAllProjects,
};