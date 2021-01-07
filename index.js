const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { rinkSchema, reviewSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const morgan = require('morgan');
const Rink = require('./models/rink');
const Review = require('./models/review');

const rinks = require('./routes/rinks')

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


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.use('/rinks', rinks);

app.get('/', (req, res) => {
    res.render('home');
});


// ********************
// *  Review Routes   *
// ********************

app.post('/rinks/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id);
    const review = new Review(req.body.review);
    rink.reviews.push(review);
    await review.save();
    await rink.save();
    res.redirect(`/rinks/${rink._id}`);
}));

app.delete('/rinks/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Rink.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/rinks/${id}`);
}));


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