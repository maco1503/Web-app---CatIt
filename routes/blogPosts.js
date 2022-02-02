import express from "express";
import Post from '../models/blogPost.js';

const router = express.Router();


//read all
router.get('/', async (req,res) =>{
    const post = await Post.find({});
    res.send(post);
});

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
router.post('/', async (req,res) =>{
    const post = new Post(req.body);
    await post.save();
    res.send(post);
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