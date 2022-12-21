const config = require('./config/index')
const { MONGO_URI, MONGO_DB_NAME, PORT } = config;
const express = require('express')
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const envelopesRouter = require('./routes/envelopesRouter')
const salaryRouter = require('./routes/salaryRouter')
const path = require('path')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'))
app.use(cookieParser())

// Configure sessions
app.use(cookieSession({name: "session", keys: ["arnaudcadev"], maxAge: 24*60*60*100}))

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

// Routes
app.use('/user', userRouter)
app.use('/envelopes', envelopesRouter)
app.use('/salary', salaryRouter)

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

mongoose.connect(db, {
  useNewUrlParser: true,
  retryWrites: true,
  w: "majority"
}, err => {
  if(err) throw err;
  console.log(`Connected to ${MONGO_DB_NAME}, with mongoose`)
})
mongoose.set('strictQuery', false) // not sure about it

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = PORT || 3005
app.listen(port, () => console.log(`Server listening on port: ${port}`))