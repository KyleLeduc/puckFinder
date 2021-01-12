const Rink = require('../models/rink');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const rink = await Rink.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    rink.reviews.push(review);
    await review.save();
    await rink.save();
    req.flash('success', 'Successfully added the review');
    res.redirect(`/rinks/${rink._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Rink.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted the review');
    res.redirect(`/rinks/${id}`);
};