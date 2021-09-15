const posts = require('../database/posts.json')
const fs = require('fs')
const path = require('path')

exports.getAll = (callback) => {
    fs.readFile(path.join(__dirname, '../database/posts.json'), 'utf8', (error, posts) => {
        if(error)
            console.log(error);
        let parseAllPosts = JSON.parse(posts)
        callback(parseAllPosts)
    })
}

exports.getById = (id) => {
    let currentUser = posts.find((user) => {
        return user.id === id
    })
    return currentUser
}