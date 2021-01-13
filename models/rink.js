const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const RinkSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
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

RinkSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Rink', RinkSchema);