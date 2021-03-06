const express = require('express');
const router = express.Router();
const rinks = require('../controllers/rinks');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRink } = require('../middleware.js')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(rinks.index))
    // .post(isLoggedIn, upload.array('image'), validateRink, catchAsync(rinks.createRink));

// router.get('/new', isLoggedIn, rinks.renderNewForm);

router.route('/:id')
    .get(catchAsync(rinks.showRink))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateRink, catchAsync(rinks.updateRink))
    .delete(isLoggedIn, isAuthor, catchAsync(rinks.deleteRink));

router.patch('/:id/checkIn', catchAsync(rinks.checkIn));
router.patch('/:id/checkOut', catchAsync(rinks.checkOut));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(rinks.renderEditForm));

module.exports = router;