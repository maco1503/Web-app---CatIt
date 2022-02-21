import mongoose from "mongoose";

const {model, Schema} = mongoose;

const blogCategorySchema = new Schema({
    name: {type:String}
    
    
});

const Category = model('Cat' , blogCategorySchema);

export default Category;
