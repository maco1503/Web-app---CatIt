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
    console.log(post);
        //console.log(post[0].image.data.toString("base64"));
    if(post){
        res.send(post);
    }
    else{
        res.status(404).send();
    }
});

//create
router.post('/', upload.single('image'), async (req, res) => {
    
    
    try{
        const imgData = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        const obj ={
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image:{
                data: imgData,
                contentType: 'image/png'
            }
        }
        const post = new Post(obj);
        await post.save();
        await fs.unlinkSync( path.join(__dirname + '/uploads/' + req.file.filename));
        console.log(obj);
        res.send(post); 
    }
    catch(err)
    {   
        console.log(6)
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