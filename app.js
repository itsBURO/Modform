//importing all the required node modules
const express = require("express");

const bodyParser= require("body-parser");

const mongoose = require("mongoose");

var PORT=   3000 || process.env.PORT;

mongoose.Promise=global.Promise;

//uri for connecting to mongodb locally. Change if you want to use mongodb atlas
const uri = "mongodb://localhost:27017/mydb";

//connecting to mongodb
mongoose.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });
//initializing express in our app 
const app = express();

//no idea what these do, but apparently they fix broken things
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static( "public"));
//declaring new schema for our mongodb database
var newSchema= new mongoose.Schema({
    age:Number,
    gender:String,
    firstPrefType:String,
    firstPrefName:String,
    rating1:Number,
    secondPrefType:String,
    secondPrefName:String,
    rating2:Number,       
    thirdPrefType:String,       
    thirdPrefName:String,       
    rating3:Number,
});

//creating a model based on the schema
const ModData = mongoose.model("ModData",newSchema);


//GET request to get the homepage or home directory
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});


//post request for sending data from form to mongodb

app.post("/",function(req,res){
    //declaring and initializing all the form elements so that we can pass them to mongodb database
    const age = req.body.age;
    const gender = req.body.gender;
    const fpt1 = req.body.firstPrefType1;
    const fpn1 = req.body.firstPrefName1;
    const spt1 = req.body.secondPrefType1;
    const spn1 = req.body.secondPrefName1;
    const tpt1 = req.body.thirdPrefType1;
    const tpn1 = req.body.thirdPrefName1;
    /*declaring a new document based on the model created before and also declaring
    what each value will be*/ 
    const alData = new ModData({
                age:age,
                gender:gender,
                firstPrefType:fpt1,
                firstPrefName:fpn1,
                rating1:5,
                secondPrefType:spt1,
                secondPrefName:spn1,
                rating2:4,       
                thirdPrefType:tpt1,       
                thirdPrefName:tpn1,       
                rating3:3,
                });
            //saving the data to mongodb
            alData.save();
            //sending the html page upon successful data submission
            /* use try and catch here with alData.save() and upon success
            send submit.html or failure.html*/
            res.sendFile(__dirname+ "/submit.html");
            

});

//listening for new connection on the given port

app.listen(PORT,function(){
    console.log("Server running on port 3000")
});


