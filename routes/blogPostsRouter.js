import express from "express";
import Post from '../models/blogPost.js';


const router = express.Router();

router.get('/' , async (req , res)=>{
    try
    {
        const posts = await Post.find({});
        res.render('pages/allPostPage' , { posts:posts })
    }
    catch(err)
    {
        res.status(404).send(err);
    }
});


router.get('/create', async (req,res) =>{
    res.render('pages/makePostPage');
});

/*
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
*/
//create
router.post('/', async (req, res) => {
    console.log(req.file);
    console.log(7);
    try{
        
        const obj ={
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        }
        const post = new Post(obj);
        await post.save(); 
        res.redirect(`/post/single/${post._id}`);
    }
    catch(err)
    {   
        res.status(400).send(err);
    }
});

router.get('/single/:id' , async (req,res) => {
    try
    {   
        const post = await Post.find({_id: req.params.id });
        res.render('pages/postPage' ,{ post:post[0]} );
    }
    catch(err)
    {
        res.status(404).send(err);
    }
} );


//update
router.get('/single/edit/:id', async (req,res) =>{
    const post = await Post.find({_id:req.params.id});

    const obj = 
    {   _id:post[0]._id,
        title:post[0].title,
        content:post[0].content,
        category:post[0].category
    }

    res.render('pages/editPost' , {post:obj});

});


//delete
router.delete('/:id', async (req,res) =>{
    const post = await Post.findOneAndDelete({_id: req.params.id});
    if(post){
        res.send(post);
    }
    else{
        res.status(404).send();
    }
});

export default router;