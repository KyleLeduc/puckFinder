const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Rink = require('../models/rink');
const { rinkSchema, reviewSchema } = require('../schemas.js')


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
    res.redirect(`/rinks/${ rink._id }`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id).populate('reviews');
    res.render('rinks/show', { rink });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const rink = await Rink.findById(req.params.id);
    res.render('rinks/edit', { rink });
}));

router.put('/:id', validateRink, catchAsync(async (req, res) => {
    const { id } = req.params;
    const rink = await Rink.findByIdAndUpdate(id, { ...req.body.rink })
    res.redirect(`/rinks/${ id }`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Rink.findByIdAndDelete(id);
    res.redirect('/rinks');
}));

module.exports = router;