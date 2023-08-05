const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
dotenv.config()
// var cors = require('cors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware');
const path = require('path');
const PORT = process.env.PORT || 5000

//  connect to db
connectDB()

const app = express()

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

if (process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname, 'client/build/index.html')));
}else{
  app.get('/', (req,res)=>{
    res.json({message : 'Welcome to the Support Desk API'})
  })
}

app.use(errorHandler)


app.listen(PORT, ()=> console.log('Backend Server running on port:', PORT))