import mongoose from "mongoose";

const {Schema, model} = mongoose;

const blogPostSchema = new Schema({
    title: String,
    content: String,
    category: String,
    /*date: { type: Date, default: Date.now() },
    image:
    {
        data :  {type:Buffer },
        contentType: { type:String,default: 'image/png'}
    }*/
    
    
});

const blogPost = model('blogPost' , blogPostSchema);

export default blogPost;