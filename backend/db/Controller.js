import mongoose, { mongo } from "mongoose";
import {User} from './models/User.js';
import {Project} from './models/Project.js';

mongoose.connect('mongodb://127.0.0.1/buildathon');


const CreateUser = (user) => {
    return User.create(user);
}


const GetAllUsers = () => {
    return User.find({});
}


const GetUser = (username) => {
    return User.find({
        username: {$eq: username},
    });
}


const UpdateUser = (username, fields) => {
    return User.updateOne({
        username: {$eq: username}
    }, fields)
}


const DeleteUser = (username) => {
    return User.deleteOne({
        username: {$eq: username}
    })
}


const DeleteAll = () => {
    return User.deleteMany({})
}


export {
    CreateUser,
    GetAllUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    DeleteAll,
};