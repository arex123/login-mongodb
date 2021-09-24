const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/Tutorial',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true,
    // useFindAndModify: false
}).then(()=>{
    console.log("DB Connected Successfully");
});
var db=mongoose.connection;


app.use(express.static('public'));

  
var engine = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');



// const userSchema = new mongoose.Schema({
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   })


//  const User= mongoose.model("User", userSchema)
// 
//   const stud = new User({
//       name: 'Madison Hyde',
//       email: 'xyz@email.com',
//       password : 333,
// });
// stud.save().then(() => console.log("One entry added"));



app.get("/",function(req,res){
    res.render("login");
})


app.post('/login', function(req, res) {

    console.log(req.body);

    // db.collection('details').findOne({ name: req.body.name }, function(err, user){
    //     if(err) {
    //       console.log(err);
    //     }
    //     var message;
    //     if(user) {
    //       console.log(user)
    //         message = "user exists";
    //         console.log(message)
    //     } else {
    //         message= "user doesn't exist";
    //         console.log(message)
    //     }
    //     res.json({message: message});
    // });
});


app.post('/register', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
    }
    db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
       
    // res.send("Hello " + name + ", Thank you for subcribing. You email is " + email);
    res.redirect("/welcome");
});

app.get('/welcome',function(req,res){
    
    res.render('welcome.html');

})


// const db = require('./db');
// // Connect to the database
// const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
// const MONGO_PORT = process.env.MONGO_PORT;
// const MONGO_DB = process.env.MONGO_DB;
// const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
// db.connect(DB_URL);

require('dotenv').config()


//user schema
// const userSchema = new mongoose.Schema({
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   })
//  const User= mongoose.model("User", userSchema)

//   const stud = new User({
//       username: 'Madison Hyde',
//       email: 'xyz@email.com',
//       password : 333,
// });
// stud.save().then(() => console.log("One entry added"));

// const stud1 = new User({
//     username: 'Madison Hyde 2',
//     email: 'xycz@email.com',
//     password : 333,
// });
// stud1.save().then(() => console.log("One entry added"));





app.get('/',(req,res) =>{
    // res.send('Hello World');
    // res.set({
    //     'Access-control-Allow-Origin': '*'
    //     });
    // return 
    res.render('index.html');
});

const PORT =process.env.PORT;

app.listen(PORT,() =>
    console.log(`Server running at port ${PORT}`)
);