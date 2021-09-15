const postRouter = require('express').Router()
const Posts = require('../controllers/posts')

postRouter.get('/posts', Posts.getAllPosts)

postRouter.post('/login', Posts.login)

module.exports = postRouter