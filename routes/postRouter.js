const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator') 
const config = require('config')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
// /api/auth

router.get('/', auth, async (req, res) => {
    try {
    console.log("owner", req.user.userId );        
       const posts = await Post.find({ owner: req.user.userId })
       res.json(posts)
    } catch (e) {
        res.status(500).json({ message: 'Ошибка'})
    }
}) // /api/auth/register


router.post('/create', auth, async (req, res) => {
    try {
       console.log("create post", req.body.text);
       const {title, text} = req.body       
       const post = new Post({
           title, text, owner: req.user.userId
       })

       await post.save()
       
           console.log("Success")
           return res.status(201).json({ message: 'Создан пост', post})
             
       
    } catch (e) {
        console.log("Ошибка", e);
        res.status(500).json({ message: 'Ошибка'})
    }
}) // /api/post/create

router.get('/:id', auth, async (req, res) => {
    try {
     const post = await Post.findById(req.params.id)
     res.json(post)
    } catch (e) {
        res.status(500).json({ message: 'Ошибка'})
    }
})

module.exports = router