const Rink = require('../models/rink');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const rinks = await Rink.find({});
    res.render('rinks/index', { rinks });
};

module.exports.renderNewForm = (req, res) => {
    res.render('rinks/new');
};

module.exports.createRink = async(req, res, next) => {
    const rink = new Rink(req.body.rink);
    rink.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    rink.author = req.user._id;
    await rink.save();
    req.flash('success', 'Successfully created a new rink');
    res.redirect(`/rinks/${ rink._id }`);
};

module.exports.showRink = async (req, res) => {
    const rink = await Rink.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!rink) {
        req.flash('error', "Sorry! That rink wasn't found");
        return res.redirect('/rinks');
    };
    res.render('rinks/show', { rink });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const rink = await Rink.findById(id);
    if(!rink) {
        req.flash('error', "Sorry! That rink wasn't found");
        return res.redirect('/rinks');
    };
    res.render('rinks/edit', { rink });
};

module.exports.updateRink = async (req, res) => {
    const { id } = req.params;
    const rink = await Rink.findByIdAndUpdate(id, { ...req.body.rink })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    rink.images.push(...imgs);
    await rink.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await rink.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    }
    req.flash('success', 'Successfully updated rink');
    res.redirect(`/rinks/${ rink._id }`);
};

module.exports.deleteRink = async (req, res) => {
    const { id } = req.params;
    await Rink.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the rink');
    res.redirect('/rinks');
};