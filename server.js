if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const envelopesRouter = require('./routes/envelopesRouter')
const salaryRouter = require('./routes/salaryRouter')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(cors())


// Routes

app.use('/user', userRouter)
app.use('/envelopes', envelopesRouter)
app.use('/salary', salaryRouter)

// Database connection 
const URI = process.env.DB_CONNECT;

mongoose.connect(URI, {
  useNewUrlParser: true,
}, err => {
  if(err) throw err;
  console.log('Connected to mongoose')
})



const port = process.env.PORT
app.listen(port, () => console.log(`Server listening on port: ${port}`))