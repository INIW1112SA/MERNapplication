const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();


//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB config
const database = require('./config/keys').mongoURL;

//Connect to MongoDB
mongoose
    .connect(database,{ useNewUrlParser: true })
    .then(()=>console.log("connected to database"))
    .catch(err => console.log(" Db connection failed"));


app.get('/', (req,res) => res.send("Hello fullstack"));

//use routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);
const port = process.env.port || 5000;

app.listen(port, ()=> console.log(`server is listening to ${port}`));