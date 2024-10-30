import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    // unique fields
    name: {
        type: String,
        index: true,
        unique: true,
        required: "Name can't be empty",
    },

    // required fields
    username: {
        type: String, // match with users
        required: "User can't be empty",
    },

    description: {
        type: String,
        required: "Description can't be empty",
    },

    link: {
        type: String,
        required: "Link can't be empty",
    },

    experience: {
        type: Object,
        default: {"Python": 0, "Java": 0, "C/C++": 0, "Javascript": 0, "Rust": 0, "Go": 0},
    },

});

const Project = mongoose.model("Project", ProjectSchema);

export { Project };