import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // unique fields
    username: {
        type: String,
        index: true,
        unique: true,
        required: "Username can't be empty",
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
    
    linkedin: {
        type: String,
        default: "",
        unique: true,
    },

    github: {
        type: String,
        default: "",
        unique: true,
    },
    
    // extra fields
    experience: { // lowkey a problem
        type: Object,
        default: {},
        sparse: true,
    },

    interests: {
        type: Object,
        default: {},
    },

    projects: {
        type: Array,
        default: [],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model("User", UserSchema);

export { User };