const express = require('express');
const router = express.Router();
const rinks = require('../controllers/rinks');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRink } = require('../middleware.js')


router.route('/')
    .get(catchAsync(rinks.index))
    .post(isLoggedIn, validateRink, catchAsync(rinks.createRink));

router.get('/new', isLoggedIn, rinks.renderNewForm);

router.route('/:id')
    .get(catchAsync(rinks.showRink))
    .put(isLoggedIn, isAuthor, validateRink, catchAsync(rinks.updateRink))
    .delete(isLoggedIn, isAuthor, catchAsync(rinks.deleteRink));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(rinks.renderEditForm));

module.exports = router;