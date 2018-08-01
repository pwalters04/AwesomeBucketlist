//declared Dependencies
const express=require ('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const config=require('./config/database.js');
const bucketlist=require('./controller/bucketlist.js');



//Initialize our app variable
const app=express();


//local port
const port=4000;

//middleware for CORS
app.use(cors());

//middleware for bodyparsing using Json/urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//static flies dir
app.use(express.static(path.join(__dirname,'public')));

//routes

app.get('/', (req,res) => {
    res.send("Invalid page");
});

//Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/bucketlist',bucketlist);

//connect DB
mongoose.connect(config.database);

//listen To Port
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});