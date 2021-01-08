const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Rink = require('../models/rink');
const Review = require('../models/review');

const { ReviewSchema } = require('../schemas.js')


const validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


// ********************
// *  Review Routes   *
// ********************

router.post('/', validateReview, catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id);
    const review = new Review(req.body.review);
    rink.reviews.push(review);
    await review.save();
    await rink.save();
    req.flash('success', 'Successfully added the review');
    res.redirect(`/rinks/${rink._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Rink.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted the review');
    res.redirect(`/rinks/${id}`);
}));


module.exports = router;