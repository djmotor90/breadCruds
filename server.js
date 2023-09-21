//Initalize express and include environment variables
    //Purpose: stores and defines environment variables
require('dotenv').config();
    //Purpose: initialize express framework
const express = require('express');
    //Purpose: initialize our ODM to MongoDB
// const mongoose       = require('mongoose');
    //Purpose: overrides methods to allow forms to submit as put, delete, etc, anything other than its usual POST or GET
const methodOverride = require('method-override');
const mongoose = require('mongoose')


const app = express();
    //Initialize the middleware
app.use(express.static('public'));
    //Purpose: put into the directory + views folder
app.set('views', __dirname + '/views');
    //Use the jsx engine and then set
app.set('view engine', 'jsx');
    //create the engine
app.engine('jsx', require('express-react-views').createEngine());
    //set up the middleware for reading urlencoded string
app.use(express.urlencoded({extended: true}));
    //set up method override for using forms with requests other than GET or POST
app.use(methodOverride('_method'));



//Environment Variables
const PORT = process.env.PORT;

//Initialize ROUTERS

//Static Routes First
app.get('/', (request,response) => 
{
    response.send('Entry Page');
});


//Dynamic routes

// breads
const breadsController = require('./controller/breadsController.js')
app.use('/breads', breadsController)

// bakers 
const bakers_controller = require('./controller/bakers_controller.js')
app.use('/bakers', bakers_controller)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


//Connect to your mongodb and listen on port given by env
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('connected to mongo: ', process.env.MONGO_URI))
app.listen(PORT, () => 
{
    console.log(`listening on port ${PORT}`);
});