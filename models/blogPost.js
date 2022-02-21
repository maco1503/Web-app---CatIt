import mongoose from "mongoose";

const {model, Schema} = mongoose;

const blogPostSchema = new Schema({
    title: {type:String},
    content: {type:String},
    category: {type:String},
    date: { type: Date, default: Date.now() },
    updated : {type:Boolean, default: 0}
    
    
});

const Post = model('Post' , blogPostSchema);

export default Post;
