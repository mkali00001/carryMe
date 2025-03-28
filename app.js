const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
let expressSession = require('express-session')
let connectFlash = require('connect-flash')
const index = require('./routes/index')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
)

app.use(connectFlash())

app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs")

app.use("/", index)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(3000,()=>{
    console.log("Listening on port 3000!")
})