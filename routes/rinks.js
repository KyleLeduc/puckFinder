const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRink } = require('../middleware.js')

const Rink = require('../models/rink');

// ********************
// *   Rink Routes    *
// ********************

router.get('/', catchAsync(async (req, res) => {
    const rinks = await Rink.find({});
    res.render('rinks/index', { rinks });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('rinks/new');
});

router.post('/', isLoggedIn, validateRink, catchAsync(async(req, res, next) => {
    const rink = new Rink(req.body.rink);
    rink.author = req.user._id;
    await rink.save();
    req.flash('success', 'Successfully created a new rink');
    res.redirect(`/rinks/${ rink._id }`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!rink) {
        req.flash('error', "Sorry! That rink wasn't found");
        return res.redirect('/rinks');
    };
    res.render('rinks/show', { rink });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const rink = await Rink.findById(id);
    if(!rink) {
        req.flash('error', "Sorry! That rink wasn't found");
        return res.redirect('/rinks');
    };
    res.render('rinks/edit', { rink });
}));

router.put('/:id', isLoggedIn, isAuthor, validateRink, catchAsync(async (req, res) => {
    const { id } = req.params;
    const rink = await Rink.findByIdAndUpdate(id, { ...req.body.rink })
    req.flash('success', 'Successfully updated rink');
    res.redirect(`/rinks/${ rink._id }`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Rink.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the rink');
    res.redirect('/rinks');
}));

module.exports = router;