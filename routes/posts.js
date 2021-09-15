const postRouter = require('express').Router()
const Posts = require('../controllers/posts')

postRouter.get('/posts', Posts.getAllPosts)

postRouter.post('/posts', Posts.authenticateToken, Posts.postUser)

postRouter.post('/login', Posts.login)

module.exports = postRouter