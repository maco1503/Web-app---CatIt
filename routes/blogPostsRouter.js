import express from "express";
import Post from '../models/blogPost.js';
import Category from '../models/blogCategory.js';

const router = express.Router();

router.get('/cat/:id',async (req,res)=>{
    const categories= await Category.find({_id:req.params.id});
    const posts= await Post.find({category:categories[0].name});
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



//create new cat
router.post('/ncat',async(req,res)=>{

    let category=new Category({
        name:req.body.name
    })
    category=await category.save();
    res.redirect('../post');
    
})
//edit&del cat
router.post('/cat/', async (req,res) =>{

    console.log(req.body.metoda);
    if(req.body.metoda == "update"){
        const oldName = await Category.find({_id:req.body.id})
        const posts = await Post.find({category:oldName[0].name});

        const obj ={
            name:req.body.name
        }

    const categories=await Category.findOneAndUpdate({_id: req.body.id},obj);
    for(let i=0;i<posts.length;i++)
    {
        posts[i].category = req.body.name;
        posts[i]= await posts[i].save();
    }
    res.redirect('../');
    }
    if(req.body.metoda =="delete"){

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
    const categories= await Category.find();

    res.render('../pages/editPost' , {post:post[0], categories:categories});

});
//update & delete
router.post('/single/', async (req,res) =>{
    const metoda = req.body.metoda;
    
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