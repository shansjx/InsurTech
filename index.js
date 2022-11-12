
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.send("<h1>Hello world!</h1>");
});

app.listen(3000, function(){
    console.log("App listening to port 3000")
});
