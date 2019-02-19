//importing Modules

var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')
var bodyparser = require('body-parser')

const route = require('./route/routes')

var app = express()

//Connect to mongodb

mongoose.connect('mongodb://localhost:27017/shoppinglist')

//On connect

mongoose.connection.on('connected', ()=>{
    console.log('Mongodb connected to the port 27017')
})

//On connection error
mongoose.connection.on('error',(err)=>{
    console.log(err)
})

const PORT = 3000

//Adding middleware - cors 
app.use(cors())

//Adding bodyparser
app.use(bodyparser.json())

app.use('/api',route)

app.get('/',(req,res)=>{
    res.send('Hello Parth!!!!')
})

app.listen(PORT,()=>{
    console.log('Server has been started at port : '+PORT)
})