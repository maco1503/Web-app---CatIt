import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from 'multer';
import 'dotenv/config';
import postRouter from './routes/blogPostsRouter.js';

const app = express();
const port = 8080;



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/blogPostsRouter', postRouter);
app.use('/', function(req, res){
    res.render('makePostPage');
});
 

app.get(('/'),(req,res)=>{
    res.send();
});


app.listen(port, () =>{
    console.log("merge");
    mongoose.connect(process.env.MONGODB_URL);
});