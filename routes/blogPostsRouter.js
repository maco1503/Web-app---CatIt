import express from "express";
import Post from '../models/blogPost.js';
import Category from '../models/blogCategory.js';
//find out why update &del doen't work for categories
const router = express.Router();

router.get('/cat/:id',async (req,res)=>{
    const categories= await Category.find();
        const posts= await Post.find({category:req.params.name});
        res.render('../pages/Categories',{posts:posts,categories:categories[0]});
    
})

router.get('/' , async (req , res)=>{
    try
    {
        const posts = await Post.find({});
        const categories= await Category.find({});
        res.render('../pages/allPostPage' , { posts:posts, categories:categories });
    }
    catch(err)
    {
        res.status(404).send(err);
    }
});

/*
//render new cat page
router.get('/newcat',async(req,res)=>{
    const categories= await Category.find();
    res.render('../pages/allCategories' , { categories:categories });
    
})*/

//create new cat
router.post('/ncat',async(req,res)=>{
    //console.log(7);
    let category=new Category({
        name:req.body.name
    })
    category=await category.save();
    res.redirect('../post');
    
})
//edit&del cat
router.post('/cat/', async (req,res) =>{
    //const metoda = req.body.metoda;
    console.log(req.body.metoda);
    if(req.body.metoda == "update"){
        console.log(7);
        const obj ={
            name:req.body.name
        }
    const categories=await Category.findOneAndUpdate({_id: req.body.id},obj);
    res.redirect('../');
    }
    if(req.body.metoda =="delete"){
        console.log("nema");
        const categories =await Category.findByIdAndDelete({_id: req.body.id});
    res.redirect('../');

    }
});

router.get('/create', async (req,res) =>{

        const posts = await Post.find({});
        const categories= await Category.find();
        res.render('../pages/makePostPage' , { posts:posts, categories:categories });
});



//create post
router.post('/', async (req, res) => {
    //console.log(7);
    //console.log(req.file);
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
        res.render('../pages/postPage' ,{ post:post[0]} );
    }
    catch(err)
    {
        res.status(404).send(err);
    }
} );


//update&del page render
router.get('/single/edit/:id', async (req,res) =>{
    const post = await Post.find({_id:req.params.id});
    //console.log(post[0]);
    res.render('../pages/editPost' , {post:post[0]});

});
//update & delete
router.post('/single/', async (req,res) =>{
    const metoda = req.body.metoda;
    //console.log(req.body.id);
    if(metoda == "patch"){
        console.log(7);
        const obj ={
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            updated : true
        }
    const post = await Post.findOneAndUpdate({_id: req.body.id},obj);
    res.redirect('/post');
    }
    if(metoda =="delete"){
        const post = await Post.findByIdAndDelete({_id: req.body.id});
    res.redirect('/post');
    }
});

export default router;