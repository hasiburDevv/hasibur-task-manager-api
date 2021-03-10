const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// without middleware: new request => run rute handler

// with middleware: new request => do something => run rute handler

app.use((req, res, next) => {
    if(req.method) {
        res.status(503).send("this site is under maintanance")
    } else {
        next()
    }
})

app.use(userRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

