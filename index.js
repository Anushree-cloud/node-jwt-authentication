const express = require('express')
const postRouter = require('./routes/posts')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(postRouter)

const PORT = 8030

app.listen(PORT, () => {
    console.log(`server listening to http://localhost:${PORT}`)
})