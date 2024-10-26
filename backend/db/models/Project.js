import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    // unique fields
    name: {
        type: String,
        unique: true,
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
        required: "Source code can't be empty",
    },

    // optional fields

})

const Project = mongoose.model("Project", ProjectSchema);

export { Project };