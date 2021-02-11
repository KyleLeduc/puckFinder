const Rink = require('../models/rink.js');

module.exports = async resetPlayerCount => {
    rinks = await Rink.find({});
    for (const rink of rinks) {
        rink.playerCount = 0;
        rink.save();
    }
}