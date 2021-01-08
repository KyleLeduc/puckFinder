const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    // user: 
    // {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    rating: Number,
    body: String,
})

module.exports = mongoose.model('Review', ReviewSchema);