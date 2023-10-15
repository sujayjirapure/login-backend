const express = require('express');
const cors = require('cors');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8080;
const server = express();
server.use(bodyParser.json());
server.use(cors());

dotenv.config()
//post api data
server.post('/log',async(req ,resp) => {

    let user = new User();
    user.username = req.body.username;                   //should match with schema
    user.password = req.body.password;                   //should match with schema
    const doc = await user.save()                        //save to db cmd

    resp.json(doc);
    console.log(req.body);
    console.log("doc data ",doc);
})

//get api daata
server.get('/log',async(req, resp) => {
    const docs = await User.find({});
                                // u can give condition in side {} like - usernsame etc
    resp.json(docs);
})

server.get('/',async(req, resp) => {
    resp.send("api is running");
})

//connect DB
const DBURL = 'mongodb+srv://sujay03:sujay03@cluster0.23hwmxr.mongodb.net/logindata?retryWrites=true&w=majority';

mongoose.connect(DBURL).then(() => {
    console.log('mongooDB is connected...');
}).catch((err) => console.log('MongoDB not connected...'));

//schema
const loginschema = new mongoose.Schema({
   username: String,
   password: String
});

const User = mongoose.model('User' , loginschema);   //model
//       any name          name of db

server.listen(PORT,()=>{
    console.log('server started at',PORT);
})