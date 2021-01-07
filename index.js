const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const morgan = require('morgan');


const rinks = require('./routes/rinks');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/puckFinder', { 
    useNewUrlParser: true,
    useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database Connected");
});

const app = express();


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('common'));




app.use('/rinks', rinks);
app.use('/rinks/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home');
});





// ********************
// *  Error Handling  *
// ********************


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err } );
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});