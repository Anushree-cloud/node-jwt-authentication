const Post = require('../models/posts')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getAllPosts = (req, res) => {
    Post.getAll((posts) => {
        currentPost = posts.filter((post) => post.userName === req.user.userName && post.password === req.user.password)
        res.json({
            data: {
                message: 'all posts fetched!',
                data: currentPost
            }
        })
    })
}

exports.login = (req, res) => {
    let user = {
        userName: req.body.userName,
        password: req.body.password
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) throw error
        req.user = user
        next()
    })
}