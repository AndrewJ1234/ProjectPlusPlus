import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    // required fields
    owner_username: {
        type: String,
        required: "User can't be empty",
    },

    owner_contact: {
        type: String,
        required: "Contact can't be empty",
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