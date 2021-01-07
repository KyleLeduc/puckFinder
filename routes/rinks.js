const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Rink = require('../models/rink');
const { rinkSchema } = require('../schemas.js')


const validateRink = (req, res, next) => {
    const { error } = rinkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


// ********************
// *   Rink Routes    *
// ********************

router.get('/', catchAsync(async (req, res) => {
    const rinks = await Rink.find({});
    res.render('rinks/index', { rinks });
}));

router.get('/new', (req, res) => {
    res.render('rinks/new');
});

router.post('/', validateRink, catchAsync(async(req, res, next) => {
    const rink = new Rink(req.body.rink);
    await rink.save();
    req.flash('success', 'Successfully created a new rink');
    res.redirect(`/rinks/${ rink._id }`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id).populate('reviews');
    if(!rink) {
        req.flash('error', "Sorry! That rink wasn't found");
        return res.redirect('/rinks');
    };
    res.render('rinks/show', { rink });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id);
    if(!rink) {
        req.flash('error', "Sorry! That rink wasn't found");
        return res.redirect('/rinks');
    };
    res.render('rinks/edit', { rink });
}));

router.put('/:id', validateRink, catchAsync(async (req, res) => {
    const { id } = req.params;
    const rink = await Rink.findByIdAndUpdate(id, { ...req.body.rink })
    req.flash('success', 'Successfully updated rink');
    res.redirect(`/rinks/${ id }`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Rink.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the rink');
    res.redirect('/rinks');
}));

module.exports = router;