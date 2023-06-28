const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended:false});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.listen(port,()=>{
    console.log("Server is running on port " + port);
});
