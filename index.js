import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config';
import postRouter from './routes/blogPostsRouter.js';

const app = express();
const port = 8080;



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/post', postRouter);

app.use(express.static("pages"));




app.listen(port, () =>{
    console.log("merge");
    mongoose.connect(process.env.MONGODB_URL);
});