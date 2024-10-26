import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // required fields
    username: {
        type: String,
        required: "Username can't be empty",
        unique: true,
    },

    password: {
        type: String,
        required: "Password can't be empty",
    },
    
    email: { // validate?
        type: String,
        required: "Email can't be empty",
        unique: true,
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

    createdAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model("User", UserSchema);

export { User };