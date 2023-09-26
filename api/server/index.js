// Initalize express and include environment variables
require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose')

const app = express();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Environment Variables
const PORT = process.env.PORT;

// Initialize ROUTERS

// Static Routes First
app.get('/', (request,response) => {
    response.send('Entry Page');
});

// Dynamic routes

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

// Connect to your mongodb 
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('connected to mongo: ', process.env.MONGO_URI))

// Export the app for Vercel
module.exports = app;
