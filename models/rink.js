const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const rinkSchema = new Schema({
    author: String,
    title: String,
    image: String,
    playerCount: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
});

module.exports = mongoose.model('Rink', rinkSchema);