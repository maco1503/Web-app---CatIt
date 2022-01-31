import mongoose from "mongoose";

const {Schema, model} = mongoose;

const blogPostSchema = new Schema({
    name: String,
    content: String,
});

const blogPost = model('blogPost' , blogPostSchema);

export default blogPost;