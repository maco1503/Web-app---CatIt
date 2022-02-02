import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import 'dotenv/config';
import postRouter from './routes/blogPosts.js';
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hallo");
})

app.use('/blogPosts', postRouter);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.listen(port, () =>{
    console.log("merge");
    mongoose.connect(process.env.MONGODB_URL);
});