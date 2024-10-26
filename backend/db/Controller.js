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

const LoginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid password');
    }
    return user;
};



export {
    CreateUser,
    GetAllUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    DeleteAll,
    LoginUser
};