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

exports.postUser = (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) {
            res.sendStatus(401)
        }
        else {
            res.json({
                message: 'Post Added!',
                user: user
            })
        }
    })
    
}

exports.login = (req, res) => {
    let user = {
        userName: req.body.userName,
        password: req.body.password
    }
    jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, (error, token) => {
        if(error) throw error
        res.json({
            token: token
        })
    })
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(typeof authHeader !== 'undefined') {
        const bearerToken = authHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }
    else {
        res.sendStatus(403)
    }

    
}