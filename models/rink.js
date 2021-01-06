const mongoose = require('mongoose');
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
            ref: 'Review'
        }
    ],
});

module.exports = mongoose.model('Rink', rinkSchema);