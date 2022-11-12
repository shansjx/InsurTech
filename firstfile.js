
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.send("<h1>Hello world!</h1>");
})
app.get("/home",function(req,res)
{
    res.send("<h1>Hello universe!</h1>");
})
app.get("/home/earth",function(req,res)
{
    res.send("<h1>Hello earth!</h1>");
})

app.get("/bmi",function(req,res)
{
    res.sendFile(__dirname+"/webpages/bmiCal.html");
})

app.post("/bmiResults",function(req,res)
{
    var bmiCalculated = Number(req.body.txtWeight)/(Number(req.body.txtHeight)*Number(req.body.txtHeight))

    res.send(`<h1>BMIResults!</h1>
    <body> ${req.body.txtName}, your bmi is ${bmiCalculated} </body>`);
})

app.listen(3000, function(){
    console.log("server started on port 3000. hello world")
})
