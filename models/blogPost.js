import mongoose from "mongoose";

const {Schema, model} = mongoose;

const blogPostSchema = new Schema({
    name: String,
    content: String,
    date: { type: Date, default: Date.now },
    image:{
        data: Buffer,
        contentType: String
    }
    
    
});

const blogPost = model('blogPost' , blogPostSchema);

export default blogPost;