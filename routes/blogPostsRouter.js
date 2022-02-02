import express from "express";
import Post from '../models/blogPost.js';
import fs from 'fs';
import multer from "multer";
import path from 'path';
const __dirname = path.resolve();

const upload = multer({ dest:'uploads/' });

const router = express.Router();


//read all
router.get('/', async (req,res) =>{
    const post = await Post.find({});
    res.send(post);
});
router.get('/createPage' , async(req,res)=>{
    res.render('makePostPage')
} )

//read
router.get('/:id', async (req,res) =>{
    const post = await Post.find({_id: req.params.id});
    if(post){
        res.send(post);
    }
    else{
        res.status(404).send();
    }
});

//create
router.post('/', upload.single('image') , async (req, res) => {
    try
    {   
        //const imgData = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        const obj ={
            title: String,
            content: String,
            category: String,
            date: { type: Date, default: Date.now() },
            image:{
            data: Buffer,
            contentType: String
            }   
        }
        const post = new Post(obj);
        await post.save();
        await fs.unlinkSync( path.join(__dirname + '/uploads/' + req.file.filename));
        res.send(post);
    }
    catch(err)
    {
        //res.send(req.file);
        res.status(400).send(err);
    }
});

//update
router.patch('/:id', async (req,res) =>{
    const post = await Post.findOneAndUpdate({_id: req.params.id},req.body);
    if(post){
        res.send(post);
    }
    else{
        res.status(404).send();
    }
});


//delete
router.get('/:id', async (req,res) =>{
    const post = await Post.findOneAndDelete({_id: req.params.id});
    if(post){
        res.send(post);
    }
    else{
        res.status(404).send();
    }
});

export default router;