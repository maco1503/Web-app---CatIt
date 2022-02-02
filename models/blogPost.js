import mongoose from "mongoose";

const {Schema, model} = mongoose;

const blogPostSchema = new Schema({
    title: {type:String},
    content: {type:String},
    category: {type:String},
    date: { type: Date, default: Date.now() },
    image:
    {
        data :  {type:Buffer },
        contentType: { type:String,default: 'image/png'}
    }
    
    
});

const Post = model('Post' , blogPostSchema);

export default Post;
