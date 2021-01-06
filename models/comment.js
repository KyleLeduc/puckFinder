const mongoose = require('mongoose');
const Rink = require('./rink');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    // user: 
    // {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // child: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Comment'
    //     }
    // ],
    date: String,
    body: String,
})
