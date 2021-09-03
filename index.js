const express = require('express');
// const mongoose = require("mongoose");
var bodyParser=require("body-parser");

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Tutorial',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true,
    // useFindAndModify: false
}).then(()=>{
    console.log("DB Connected Successfully");
});

// const db = require('./db');
// // Connect to the database
// const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
// const MONGO_PORT = process.env.MONGO_PORT;
// const MONGO_DB = process.env.MONGO_DB;
// const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
// db.connect(DB_URL);

require('dotenv').config()


//user schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
 const User= mongoose.model("User", userSchema)

  const stud = new User({
      username: 'Madison Hyde',
      email: 'xyz@email.com',
      password : 333,
});
stud.save().then(() => console.log("One entry added"));

const stud1 = new User({
    username: 'Madison Hyde 2',
    email: 'xycz@email.com',
    password : 333,
});
stud1.save().then(() => console.log("One entry added"));





app.get('/',(req,res) =>{
    res.send('Hello World');
});

const PORT =process.env.PORT;

app.listen(PORT,() =>
    console.log(`Server running at port ${PORT}`)
);