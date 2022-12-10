
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/* for flash messaging */
const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger');   

const mainRoute = require('./routes/main');
const healthRoute = require('./routes/health');
const wealthRoute = require('./routes/wealth');


// Bring in Handlebars Helpers here
const {formatDate, radioCheck} = require('./helpers/hbs'); 

const app = express();

//sets hbs config
// app.engine('handlebars', exphbs({
//     layoutsDir: __dirname + '/views/layouts',
//     partialsDir: __dirname + '/views/partials/'
// }));
// //set app to use the hbs engine
// app.set('view engine','handlebars');
app.engine('handlebars', exphbs({
    helpers: {
		formatDate: formatDate,
        radioCheck: radioCheck
	},

	defaultLayout: 'index' // Specify default template views/layout/index.handlebar 
}));
app.set('view engine', 'handlebars');

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));

// Creates static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoute); // mainRoute is declared to point to routes/main.js
app.use('/health', healthRoute);
app.use('/wealth', wealthRoute);


const port = 3000;
//app listening to port
app.listen(port, function(){
    console.log(`App listening to port ${port}`)
});
