
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));

//sets hbs config
app.engine('handlebars', exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
//set app to use the hbs engine
app.set('view engine','handlebars');

//when user access the root url
app.get("/",function(req,res)
{
    res.render('main', {layout : 'index'});
});


//app listening to port
app.listen(port, function(){
    console.log(`App listening to port ${port}`)
});
