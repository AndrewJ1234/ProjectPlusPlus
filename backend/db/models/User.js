import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // unique fields
    username: {
        type: String,
        required: "Username can't be empty",
        unique: true,
    },
    
    email: { // validate?
        type: String,
        required: "Email can't be empty",
        unique: true,
    },

    // required fields
    password: {
        type: String,
        required: "Password can't be empty",
    },
    
    // extra fields
    linkedin: {
        type: String,
    },

    github: {
        type: String,
    },

    experience: { // lowkey a problem
        type: Object,
    },

    interests: {
        type: Object,
    },

    projects: {
        type: Object,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model("User", UserSchema);

export { User };