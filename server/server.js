const express = require('express')
const color = require('colors')
const dotenv = require('dotenv').config();
var cors = require('cors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

//  connect to db
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
  res.json({message : 'Welcome to the Support Desk API'})
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)


app.listen(PORT, ()=> console.log('Backend Server running on port:', PORT))