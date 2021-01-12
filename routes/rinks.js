const express = require('express');
const router = express.Router();
const rinks = require('../controllers/rinks');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRink } = require('../middleware.js')

// ********************
// *   Rink Routes    *
// ********************

router.get('/', catchAsync(rinks.index));

router.get('/new', isLoggedIn, rinks.renderNewForm);

router.post('/', isLoggedIn, validateRink, catchAsync(rinks.createRink));

router.get('/:id', catchAsync(rinks.showRink));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(rinks.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateRink, catchAsync(rinks.updateRink));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(rinks.deleteRink));

module.exports = router;